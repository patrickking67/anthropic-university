/**
 * The web app must still boot when browser storage is blocked.
 *
 * Runs docs/data/index.js and docs/app.js in a node:vm context with a minimal fake DOM, once with
 * `localStorage` itself throwing on access (blocked site data) and once with getItem/setItem
 * throwing (private mode, quota). Checks that the four track cards render and the theme toggle
 * still cycles in memory.
 *
 * Offline, Node stdlib only. Run: node --test tests/storage-blocked.test.mjs
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const DOCS = join(dirname(fileURLToPath(import.meta.url)), "..", "docs");

class FakeNode {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.childNodes = [];
    this.attributes = {};
    this.dataset = {};
    this.listeners = {};
    this.className = "";
    this.innerHTML = "";
    this._text = "";
  }
  get firstChild() { return this.childNodes[0] || null; }
  get textContent() {
    return this._text + this.innerHTML.replace(/<[^>]*>/g, "") + this.childNodes.map((c) => c.textContent).join("");
  }
  set textContent(v) { this._text = String(v); this.childNodes = []; }
  appendChild(c) { this.childNodes.push(c); return c; }
  removeChild(c) { this.childNodes = this.childNodes.filter((x) => x !== c); return c; }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) { return k in this.attributes ? this.attributes[k] : null; }
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  removeEventListener(type, fn) { this.listeners[type] = (this.listeners[type] || []).filter((f) => f !== fn); }
  click() { for (const fn of this.listeners.click || []) fn({ target: this, preventDefault() {} }); }
  findAll(pred, out = []) {
    for (const c of this.childNodes) {
      if (pred(c)) out.push(c);
      if (c.findAll) c.findAll(pred, out);
    }
    return out;
  }
}

function textNode(s) {
  return { textContent: String(s), childNodes: [] };
}

function bootApp(storage) {
  const app = new FakeNode("div");
  const toggle = new FakeNode("button");
  toggle.title = "Theme: auto";
  const byId = { app, "theme-toggle": toggle };
  const head = new FakeNode("head");
  const errors = [];

  const ctx = {
    console,
    setTimeout,
    clearTimeout,
    location: { hash: "" },
    addEventListener() {},
    removeEventListener() {},
    scrollTo() {},
  };
  ctx.window = ctx;

  ctx.document = {
    documentElement: new FakeNode("html"),
    head,
    getElementById: (id) => byId[id] || null,
    createElement: (tag) => new FakeNode(tag),
    createElementNS: (_ns, tag) => new FakeNode(tag),
    createTextNode: textNode,
  };
  // Load data scripts the way the browser would, then fire onload.
  head.appendChild = (s) => {
    setTimeout(() => {
      try {
        vm.runInContext(readFileSync(join(DOCS, s.src), "utf8"), ctx, { filename: s.src });
        s.onload && s.onload();
      } catch (e) {
        errors.push(e);
        s.onerror && s.onerror(e);
      }
    }, 0);
    return s;
  };

  vm.createContext(ctx);
  // Define the getter from inside the context so a throw surfaces as-is, like a browser's
  // SecurityError. A getter on the outer object surfaces as a ReferenceError instead.
  ctx.__storage = storage;
  vm.runInContext('Object.defineProperty(globalThis, "localStorage", { get: __storage, configurable: true })', ctx);
  delete ctx.__storage;
  vm.runInContext(readFileSync(join(DOCS, "data", "index.js"), "utf8"), ctx, { filename: "data/index.js" });
  vm.runInContext(readFileSync(join(DOCS, "app.js"), "utf8"), ctx, { filename: "app.js" });
  return { ctx, app, toggle, errors };
}

async function waitFor(fn, ms = 2000) {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > ms) return false;
    await new Promise((r) => setTimeout(r, 5));
  }
  return true;
}

function blocked() {
  const e = new Error("The operation is insecure.");
  e.name = "SecurityError";
  throw e;
}

const scenarios = {
  "localStorage access throws": blocked,
  "getItem and setItem throw": () => ({ getItem: blocked, setItem: blocked, removeItem: blocked }),
};

for (const [name, storage] of Object.entries(scenarios)) {
  test(`web app boots when ${name}`, async () => {
    const rejections = [];
    const onRejection = (e) => rejections.push(e);
    process.on("unhandledRejection", onRejection);
    try {
      const { ctx, app, toggle, errors } = bootApp(storage);
      const catalog = ctx.AU.index;
      assert.equal(catalog.length, 4, "catalog lists four tracks");

      const isCard = (n) => n.tagName === "ARTICLE" && n.className === "track-card";
      const rendered = await waitFor(() => app.findAll(isCard).length === catalog.length);
      assert.deepEqual(errors, [], "data scripts load without errors");
      assert.deepEqual(rejections, [], "no unhandled rejections");
      assert.ok(rendered, `expected ${catalog.length} track cards, got ${app.findAll(isCard).length}`);

      const text = app.textContent;
      for (const c of catalog) assert.ok(text.includes(c.shortTitle || c.title), `card for ${c.examId}`);

      const html = ctx.document.documentElement;
      assert.equal(html.getAttribute("data-theme"), "auto");
      toggle.click();
      assert.equal(html.getAttribute("data-theme"), "light");
      assert.equal(toggle.title, "Theme: light");
      toggle.click();
      assert.equal(html.getAttribute("data-theme"), "dark");
    } finally {
      process.off("unhandledRejection", onRejection);
    }
  });
}
