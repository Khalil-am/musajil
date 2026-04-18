import { readFileSync, writeFileSync } from "fs";
import { globSync } from "fs";
import { readdirSync, statSync } from "fs";
import { join } from "path";

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (p.endsWith(".ts")) out.push(p);
  }
  return out;
}

const files = [...walk("api"), ...walk("lib"), ...walk("shared")];

// Match relative imports without file extensions, add ".js"
// imports like: from "../../lib/db"  →  from "../../lib/db.js"
// imports like: from "./db"           →  from "./db.js"
// Skip imports that already have an extension or are node_modules-style
const importRe = /(from\s+["'])(\.{1,2}\/[^"']+?)(["'])/g;

let totalChanges = 0;
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const out = src.replace(importRe, (m, pre, path, post) => {
    if (/\.(js|ts|mjs|cjs|json)$/.test(path)) return m;
    totalChanges++;
    return `${pre}${path}.js${post}`;
  });
  if (out !== src) {
    writeFileSync(f, out);
    console.log("fixed", f);
  }
}
console.log(`total fixes: ${totalChanges}`);
