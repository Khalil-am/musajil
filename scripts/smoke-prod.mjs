// Smoke test the production deployment end-to-end.
const base = process.env.BASE_URL || "https://musajil-rho.vercel.app";

let pass = 0, fail = 0;
let cookie = "";

async function call(method, path, { body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && cookie) headers.cookie = cookie;
  const res = await fetch(base + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    redirect: "manual",
  });
  const setCookie = res.headers.get("set-cookie");
  if (setCookie && auth) cookie = setCookie.split(";")[0];
  const text = await res.text();
  let json; try { json = text ? JSON.parse(text) : null; } catch { json = text; }
  return { status: res.status, body: json };
}

function expect(label, cond, detail) {
  if (cond) { console.log(`  ✓ ${label}`); pass++; }
  else { console.log(`  ✗ ${label}`); if (detail) console.log("   ", JSON.stringify(detail).slice(0, 400)); fail++; }
}

console.log(`Smoke testing ${base}\n`);

const uniq = Date.now();
const email = `smoke-${uniq}@test.dev`;

// 1. Landing page
{
  const r = await fetch(base + "/");
  const html = await r.text();
  console.log("▸ Landing page");
  expect("200 OK", r.status === 200, { status: r.status });
  expect("has Musajil brand", html.includes("Musajil") || html.includes("musajil"), { len: html.length });
}

// 2. Auth flow
console.log("\n▸ Register");
const r1 = await call("POST", "/api/auth/register", {
  auth: true,
  body: { name: "Smoke User", email, password: "password123", company: "Acme" },
});
expect("status 201", r1.status === 201, r1);
expect("has user id", !!r1.body?.id, r1);
expect("cookie received", !!cookie, { cookie });

console.log("\n▸ me");
const r2 = await call("GET", "/api/auth/me", { auth: true });
expect("status 200", r2.status === 200, r2);
expect("correct email", r2.body?.email === email, r2);

// 3. Events
console.log("\n▸ Create event");
const r3 = await call("POST", "/api/events", {
  auth: true,
  body: {
    name: "Production Smoke Event",
    description: "Created during post-deploy smoke test",
    location: "The Cloud",
    startAt: "2026-06-01T18:00",
    endAt: "2026-06-01T22:00",
    capacity: 2,
    status: "published",
  },
});
expect("status 201", r3.status === 201, r3);
const eventId = r3.body?.id;
expect("has id", !!eventId, r3);

console.log("\n▸ List events");
const r4 = await call("GET", "/api/events", { auth: true });
expect("status 200", r4.status === 200, r4);
expect("includes the new event", r4.body?.some?.((e) => e.id === eventId), r4);

// 4. Public guest flow
console.log("\n▸ Public event fetch (no auth)");
const r5 = await call("GET", `/api/events/${eventId}/public`);
expect("status 200", r5.status === 200, r5);
expect("seatsLeft=2", r5.body?.seatsLeft === 2, r5);
expect("ownerId hidden", !("ownerId" in (r5.body || {})), r5.body);

console.log("\n▸ Guest self-registration");
const r6 = await call("POST", `/api/events/${eventId}/registrations`, {
  body: { name: "Guest One", email: `g1-${uniq}@test.dev` },
});
expect("status 201", r6.status === 201, r6);
const regId = r6.body?.id;

console.log("\n▸ Second guest");
const r7 = await call("POST", `/api/events/${eventId}/registrations`, {
  body: { name: "Guest Two", email: `g2-${uniq}@test.dev` },
});
expect("status 201", r7.status === 201, r7);

console.log("\n▸ Third guest rejected (capacity=2)");
const r8 = await call("POST", `/api/events/${eventId}/registrations`, {
  body: { name: "Guest Three", email: `g3-${uniq}@test.dev` },
});
expect("status 409", r8.status === 409, r8);

// 5. Owner actions
console.log("\n▸ Owner lists attendees");
const r9 = await call("GET", `/api/events/${eventId}/registrations`, { auth: true });
expect("status 200", r9.status === 200, r9);
expect("2 attendees", r9.body?.length === 2, r9);

console.log("\n▸ Check-in guest");
const r10 = await call("PATCH", `/api/events/${eventId}/registrations/${regId}`, {
  auth: true, body: { action: "checkin" },
});
expect("status 200", r10.status === 200, r10);
expect("checkedIn=true", r10.body?.checkedIn === true, r10);

console.log("\n▸ Aggregates reflect check-in");
const r11 = await call("GET", `/api/events/${eventId}`, { auth: true });
expect("registered=2", r11.body?.registered === 2, r11);
expect("checkedIn=1", r11.body?.checkedIn === 1, r11);

// 6. Cleanup
console.log("\n▸ Delete event");
const r12 = await call("DELETE", `/api/events/${eventId}`, { auth: true });
expect("status 204", r12.status === 204, r12);

console.log("\n▸ Logout");
const r13 = await call("POST", "/api/auth/logout", { auth: true });
expect("status 200", r13.status === 200, r13);

console.log(`\n${pass} passed, ${fail} failed on ${base}`);
if (fail > 0) process.exit(1);
