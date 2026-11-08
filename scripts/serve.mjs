#!/usr/bin/env node
/**
 * Local preview server for the static web app in docs/.
 *
 * Usage: node scripts/serve.mjs            (http://localhost:4106)
 *        PORT=8080 node scripts/serve.mjs
 *
 * Node stdlib only. Serves files under docs/ and nothing outside it.
 */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DOCS = join(dirname(fileURLToPath(import.meta.url)), "..", "docs");
const PORT = Number(process.env.PORT) || 4106;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let path = normalize(join(DOCS, decodeURIComponent(url.pathname)));
    if (path !== DOCS && !path.startsWith(DOCS + sep)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    if ((await stat(path).catch(() => null))?.isDirectory()) path = join(path, "index.html");
    const body = await readFile(path);
    res.writeHead(200, { "Content-Type": TYPES[extname(path)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
  }
}).listen(PORT, () => console.log(`Serving docs/ at http://localhost:${PORT}/`));
