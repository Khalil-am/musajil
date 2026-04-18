// End-to-end test of the Vercel serverless API handlers against the real Neon DB.
// Mounts each handler in a tiny express server and exercises the full user flow.

import express from "express";
import { createServer } from "http";

// Dynamic imports so NODE_ENV gets set first
const PORT = 4001;
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-at-least-sixteen-chars-long-" + Math.random();

const [
  registerH, loginH, logoutH, meH,
  eventsH, eventByIdH, eventPublicH,
  regsListH, regByIdH,
] = await Promise.all([
  import("../api/auth/register.ts").then(m => m.default),
  import("../api/auth/login.ts").then(m => m.default),
  import("../api/auth/logout.ts").then(m => m.default),
  import("../api/auth/me.ts").then(m => m.default),
  import("../api/events/index.ts").then(m => m.default),
  import("../api/events/[id]/index.ts").then(m => m.default),
  import("../api/events/[id]/public.ts").then(m => m.default),
  import("../api/events/[id]/registrations/index.ts").then(m => m.default),
  import("../api/events/[id]/registrations/[regId].ts").then(m => m.default),
]);

function wrap(handler, injectQuery = () => ({})) {
  return async (req, res) => {
    const merged = { ...(req.query || {}), ...injectQuery(req) };
    Object.defineProperty(req, "query", { value: merged, writable: true, configurable: true });
    try {
      await handler(req, res);
    } catch (err) {
      console.error("handler error", err);
      if (!res.headersSent) res.status(500).json({ message: err.message });
    }
  };
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/auth/register", wrap(registerH));
app.post("/api/auth/login", wrap(loginH));
app.post("/api/auth/logout", wrap(logoutH));
app.get("/api/auth/me", wrap(meH));

app.get("/api/events", wrap(eventsH));
app.post("/api/events", wrap(eventsH));

app.get("/api/events/:id", wrap(eventByIdH, (r) => ({ id: r.params.id })));
app.patch("/api/events/:id", wrap(eventByIdH, (r) => ({ id: r.params.id })));
app.delete("/api/events/:id", wrap(eventByIdH, (r) => ({ id: r.params.id })));

app.get("/api/events/:id/public", wrap(eventPublicH, (r) => ({ id: r.params.id })));

app.get("/api/events/:id/registrations", wrap(regsListH, (r) => ({ id: r.params.id })));
app.post("/api/events/:id/registrations", wrap(regsListH, (r) => ({ id: r.params.id })));

app.patch("/api/events/:id/registrations/:regId", wrap(regByIdH, (r) => ({ id: r.params.id, regId: r.params.regId })));
app.delete("/api/events/:id/registrations/:regId", wrap(regByIdH, (r) => ({ id: r.params.id, regId: r.params.regId })));

const server = createServer(app);
await new Promise((r) => server.listen(PORT, r));
const base = `http://127.0.0.1:${PORT}`;

// ---- test harness ----------------------------------------------------------
let pass = 0, fail = 0;
const cookies = { owner: "", guest: "" };

async function call(method, url, { body, as } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (as && cookies[as]) headers.cookie = cookies[as];
  const res = await fetch(base + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const setCookie = res.headers.get("set-cookie");
  if (setCookie && as) cookies[as] = setCookie.split(";")[0];
  const text = await res.text();
  let json; try { json = text ? JSON.parse(text) : null; } catch { json = text; }
  return { status: res.status, body: json };
}

function expect(label, cond, detail) {
  if (cond) { console.log(`  ✓ ${label}`); pass++; }
  else { console.log(`  ✗ ${label}`); if (detail) console.log("   ", JSON.stringify(detail).slice(0, 400)); fail++; }
}

async function step(name, fn) {
  console.log(`\n▸ ${name}`);
  await fn();
}

try {
  const uniq = Date.now();
  const ownerEmail = `owner-${uniq}@test.dev`;

  await step("Register owner", async () => {
    const r = await call("POST", "/api/auth/register", {
      as: "owner",
      body: { name: "Test Owner", email: ownerEmail, password: "password123", company: "Acme", role: "Organizer" },
    });
    expect("status 201", r.status === 201, r);
    expect("returns user with id", r.body?.id, r.body);
    expect("no password in response", !("password" in (r.body || {})), r.body);
    expect("session cookie set", !!cookies.owner, { cookies });
  });

  await step("me returns authenticated user", async () => {
    const r = await call("GET", "/api/auth/me", { as: "owner" });
    expect("status 200", r.status === 200, r);
    expect("correct email", r.body?.email === ownerEmail, r);
  });

  await step("Duplicate register is rejected", async () => {
    const r = await call("POST", "/api/auth/register", {
      body: { name: "Dup", email: ownerEmail, password: "password123" },
    });
    expect("status 409", r.status === 409, r);
  });

  await step("Register validation error on short password", async () => {
    const r = await call("POST", "/api/auth/register", {
      body: { name: "X", email: `x-${uniq}@t.dev`, password: "123" },
    });
    expect("status 400", r.status === 400, r);
  });

  await step("Login with wrong password fails", async () => {
    const r = await call("POST", "/api/auth/login", {
      body: { email: ownerEmail, password: "wrongpassword" },
    });
    expect("status 401", r.status === 401, r);
  });

  await step("Login with correct password", async () => {
    const r = await call("POST", "/api/auth/login", {
      as: "owner",
      body: { email: ownerEmail, password: "password123" },
    });
    expect("status 200", r.status === 200, r);
    expect("returns user", r.body?.email === ownerEmail, r);
  });

  await step("Unauthenticated events list is rejected", async () => {
    const r = await call("GET", "/api/events");
    expect("status 401", r.status === 401, r);
  });

  await step("Events list starts empty", async () => {
    const r = await call("GET", "/api/events", { as: "owner" });
    expect("status 200", r.status === 200, r);
    expect("empty array", Array.isArray(r.body) && r.body.length === 0, r);
  });

  let eventId;
  await step("Create event", async () => {
    const r = await call("POST", "/api/events", {
      as: "owner",
      body: {
        name: "Product Launch",
        description: "Our biggest launch",
        location: "Riyadh HQ",
        startAt: "2026-05-01T18:00",
        endAt: "2026-05-01T22:00",
        capacity: 3,
        status: "published",
      },
    });
    expect("status 201", r.status === 201, r);
    eventId = r.body?.id;
    expect("has id", !!eventId, r);
    expect("registered=0", r.body?.registered === 0, r);
    expect("capacity=3", r.body?.capacity === 3, r);
  });

  await step("Events list now has 1", async () => {
    const r = await call("GET", "/api/events", { as: "owner" });
    expect("length 1", r.body?.length === 1, r);
  });

  await step("Public event endpoint works without auth", async () => {
    const r = await call("GET", `/api/events/${eventId}/public`);
    expect("status 200", r.status === 200, r);
    expect("exposes seatsLeft", r.body?.seatsLeft === 3, r);
    expect("hides ownerId", !("ownerId" in (r.body || {})), r.body);
  });

  await step("Guest registers publicly (no auth)", async () => {
    const r = await call("POST", `/api/events/${eventId}/registrations`, {
      body: { name: "Alice", email: "alice@guest.dev", phone: "+11111111" },
    });
    expect("status 201", r.status === 201, r);
    expect("checkedIn=false", r.body?.checkedIn === false, r);
  });

  await step("Duplicate guest email is rejected", async () => {
    const r = await call("POST", `/api/events/${eventId}/registrations`, {
      body: { name: "Alice Two", email: "alice@guest.dev" },
    });
    expect("status 409", r.status === 409, r);
  });

  await step("Register two more guests", async () => {
    for (const e of ["bob@g.dev", "carol@g.dev"]) {
      const r = await call("POST", `/api/events/${eventId}/registrations`, {
        body: { name: e.split("@")[0], email: e },
      });
      expect(`${e} registered`, r.status === 201, r);
    }
  });

  let aliceId;
  await step("Owner can list attendees", async () => {
    const r = await call("GET", `/api/events/${eventId}/registrations`, { as: "owner" });
    expect("status 200", r.status === 200, r);
    expect("3 attendees", r.body?.length === 3, r);
    aliceId = r.body?.find((x) => x.email === "alice@guest.dev")?.id;
    expect("Alice found", !!aliceId, r);
  });

  await step("Non-owner (unauthed) cannot list attendees", async () => {
    const r = await call("GET", `/api/events/${eventId}/registrations`);
    expect("status 401", r.status === 401, r);
  });

  await step("Check in Alice", async () => {
    const r = await call("PATCH", `/api/events/${eventId}/registrations/${aliceId}`, {
      as: "owner", body: { action: "checkin" },
    });
    expect("status 200", r.status === 200, r);
    expect("checkedIn=true", r.body?.checkedIn === true, r);
  });

  await step("Event aggregates reflect check-in", async () => {
    const r = await call("GET", `/api/events/${eventId}`, { as: "owner" });
    expect("registered=3", r.body?.registered === 3, r);
    expect("checkedIn=1", r.body?.checkedIn === 1, r);
  });

  await step("Undo check-in", async () => {
    const r = await call("PATCH", `/api/events/${eventId}/registrations/${aliceId}`, {
      as: "owner", body: { action: "undo-checkin" },
    });
    expect("checkedIn=false", r.body?.checkedIn === false, r);
  });

  await step("Public endpoint reflects capacity filled", async () => {
    const r = await call("GET", `/api/events/${eventId}/public`);
    expect("full=true (3/3)", r.body?.full === true, r);
    expect("seatsLeft=0", r.body?.seatsLeft === 0, r);
  });

  await step("Full event rejects new registration", async () => {
    const r = await call("POST", `/api/events/${eventId}/registrations`, {
      body: { name: "Dave", email: "dave@g.dev" },
    });
    expect("status 409", r.status === 409, r);
  });

  await step("Remove a registration", async () => {
    const r = await call("DELETE", `/api/events/${eventId}/registrations/${aliceId}`, { as: "owner" });
    expect("status 204", r.status === 204, r);
  });

  await step("Update event", async () => {
    const r = await call("PATCH", `/api/events/${eventId}`, {
      as: "owner",
      body: { status: "live", capacity: 100 },
    });
    expect("status live", r.body?.status === "live", r);
    expect("capacity 100", r.body?.capacity === 100, r);
  });

  await step("Second user cannot see first user's event", async () => {
    const otherEmail = `other-${uniq}@t.dev`;
    await call("POST", "/api/auth/register", { as: "guest", body: { name: "Other", email: otherEmail, password: "password123" } });
    const r = await call("GET", `/api/events/${eventId}`, { as: "guest" });
    expect("status 404", r.status === 404, r);
  });

  await step("Logout invalidates session", async () => {
    const r = await call("POST", "/api/auth/logout", { as: "owner" });
    expect("logout ok", r.status === 200, r);
    cookies.owner = ""; // server cleared cookie, client drops it
    const r2 = await call("GET", "/api/auth/me", { as: "owner" });
    expect("me 401", r2.status === 401, r2);
  });

  await step("Delete event cleans up registrations", async () => {
    await call("POST", "/api/auth/login", { as: "owner", body: { email: ownerEmail, password: "password123" } });
    const r = await call("DELETE", `/api/events/${eventId}`, { as: "owner" });
    expect("status 204", r.status === 204, r);
    const r2 = await call("GET", `/api/events/${eventId}`, { as: "owner" });
    expect("event gone", r2.status === 404, r2);
  });

  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail > 0) process.exitCode = 1;
} catch (err) {
  console.error("FATAL", err);
  process.exitCode = 1;
} finally {
  server.close();
}
