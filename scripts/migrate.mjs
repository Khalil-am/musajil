import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL not set");

const pool = new Pool({ connectionString: url });

const before = await pool.query(`
  select table_name from information_schema.tables
  where table_schema = 'public' order by table_name
`);
console.log("before:", before.rows.map((r) => r.table_name));

const statements = [
  `drop table if exists registrations cascade`,
  `drop table if exists events cascade`,
  `drop table if exists notifications cascade`,
  `drop table if exists payments cascade`,
  `drop table if exists orders cascade`,
  `drop table if exists carts cascade`,
  `drop table if exists addresses cascade`,
  `drop table if exists product_tags cascade`,
  `drop table if exists product_variant_values cascade`,
  `drop table if exists product_variants cascade`,
  `drop table if exists stocks cascade`,
  `drop table if exists variants cascade`,
  `drop table if exists products cascade`,
  `drop table if exists subcategories cascade`,
  `drop table if exists categories cascade`,
  `drop table if exists tags cascade`,
  `drop table if exists stores cascade`,
  `drop table if exists customers cascade`,
  `drop table if exists users cascade`,
  `create extension if not exists pgcrypto`,
  `create table users (
    id varchar primary key default gen_random_uuid(),
    email text not null unique,
    password text not null,
    name text not null,
    company text,
    role text,
    created_at timestamp not null default now()
  )`,
  `create table events (
    id varchar primary key default gen_random_uuid(),
    owner_id varchar not null references users(id) on delete cascade,
    name text not null,
    description text,
    location text,
    start_at timestamp not null,
    end_at timestamp,
    capacity integer not null default 100,
    status text not null default 'draft',
    created_at timestamp not null default now()
  )`,
  `create table registrations (
    id varchar primary key default gen_random_uuid(),
    event_id varchar not null references events(id) on delete cascade,
    name text not null,
    email text not null,
    phone text,
    checked_in boolean not null default false,
    checked_in_at timestamp,
    created_at timestamp not null default now()
  )`,
  `create unique index registrations_event_email_idx on registrations (event_id, email)`,
];

for (const stmt of statements) {
  process.stdout.write(".");
  await pool.query(stmt);
}
console.log("\nmigration complete");

const after = await pool.query(`
  select table_name from information_schema.tables
  where table_schema = 'public' order by table_name
`);
console.log("after:", after.rows.map((r) => r.table_name));

await pool.end();
