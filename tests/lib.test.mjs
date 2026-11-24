/**
 * Offline tests for the pure helpers in docs/lib.js: markdown rendering, link safety,
 * score scaling and domain-weighted exam sampling.
 *
 * Run: node --test tests/lib.test.mjs
 */

import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";

const lib = createRequire(import.meta.url)("../docs/lib.js");

test("escapeHtml escapes markup and tolerates null", () => {
  assert.equal(lib.escapeHtml('<a href="x">&\'</a>'), "&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;");
  assert.equal(lib.escapeHtml(null), "");
  assert.equal(lib.escapeHtml(undefined), "");
});

test("isSafeUrl allows web, mailto, relative and anchors only", () => {
  for (const ok of ["https://example.com", "http://example.com", "mailto:a@b.c", "#top", "/x", "./x", "../x", "page.html"]) {
    assert.ok(lib.isSafeUrl(ok), ok);
  }
  for (const bad of ["javascript:alert(1)", "JaVaScRiPt:alert(1)", "data:text/html,x", "vbscript:x"]) {
    assert.ok(!lib.isSafeUrl(bad), bad);
  }
});

test("mdInline renders code, bold, italic and links, and escapes the rest", () => {
  assert.equal(lib.mdInline("`a<b` and **bold** and *it*"), "<code>a&lt;b</code> and <strong>bold</strong> and <em>it</em>");
  assert.equal(lib.mdInline("<script>x</script>"), "&lt;script&gt;x&lt;/script&gt;");
  assert.match(lib.mdInline("[docs](https://example.com)"), /<a href="https:\/\/example.com" target="_blank" rel="noopener">docs<\/a>/);
});

test("mdInline drops links with unsafe schemes but keeps the text", () => {
  const out = lib.mdInline("[click](javascript:alert(1))");
  assert.ok(!out.includes("<a"), out);
  assert.ok(out.includes("click"));
});

test("mdInline leaves markdown inside code spans alone", () => {
  assert.equal(lib.mdInline("`**x**`"), "<code>**x**</code>");
});

test("renderMarkdown handles headings, lists, quotes, code fences, tables and rules", () => {
  const html = lib.renderMarkdown([
    "# Title", "", "para one", "continues", "", "- a", "- b", "", "1. x", "2. y", "",
    "> quoted", "", "```", "<raw>", "```", "", "| H1 | H2 |", "| --- | --- |", "| c1 | c2 |", "", "---",
  ].join("\n"));
  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /<p>para one continues<\/p>/);
  assert.match(html, /<ul><li>a<\/li><li>b<\/li><\/ul>/);
  assert.match(html, /<ol><li>x<\/li><li>y<\/li><\/ol>/);
  assert.match(html, /<blockquote>quoted<\/blockquote>/);
  assert.match(html, /<pre><code>&lt;raw&gt;<\/code><\/pre>/);
  assert.match(html, /<table><thead><tr><th>H1<\/th><th>H2<\/th><\/tr><\/thead><tbody><tr><td>c1<\/td><td>c2<\/td><\/tr><\/tbody><\/table>/);
  assert.match(html, /<hr>/);
});

test("renderMarkdown accepts empty and CRLF input", () => {
  assert.equal(lib.renderMarkdown(""), "");
  assert.equal(lib.renderMarkdown(null), "");
  assert.match(lib.renderMarkdown("# A\r\n\r\ntext"), /<h1>A<\/h1>\n<p>text<\/p>/);
});

test("scaledScore maps the correct fraction onto the scale", () => {
  const meta = { scaleMin: 100, scaleMax: 1000, passScaled: 720 };
  assert.deepEqual(lib.scaledScore(0, 100, meta), { scaled: 100, pass: false });
  assert.deepEqual(lib.scaledScore(100, 100, meta), { scaled: 1000, pass: true });
  assert.deepEqual(lib.scaledScore(69, 100, meta), { scaled: 721, pass: true });
  assert.deepEqual(lib.scaledScore(68, 100, meta), { scaled: 712, pass: false });
  assert.deepEqual(lib.scaledScore(0, 0, meta), { scaled: 100, pass: false });
});

function fakeExam() {
  const domains = [{ id: "a", weight: 0.5 }, { id: "b", weight: 0.3 }, { id: "c", weight: 0.2 }];
  const questions = [];
  for (const d of domains) for (let i = 0; i < 20; i++) questions.push({ id: `${d.id}${i}`, domain: d.id });
  return { domains, questions };
}

test("sampleByDomain returns n unique questions following domain weights", () => {
  const exam = fakeExam();
  const picked = lib.sampleByDomain(exam, 20);
  assert.equal(picked.length, 20);
  assert.equal(new Set(picked.map((q) => q.id)).size, 20);
  const count = (d) => picked.filter((q) => q.domain === d).length;
  assert.equal(count("a"), 10);
  assert.equal(count("b"), 6);
  assert.equal(count("c"), 4);
});

test("sampleByDomain returns every question when n covers the bank", () => {
  const exam = fakeExam();
  const picked = lib.sampleByDomain(exam, 500);
  assert.equal(picked.length, exam.questions.length);
  assert.equal(new Set(picked.map((q) => q.id)).size, exam.questions.length);
});

test("sampleByDomain fills the gap when a domain has too few questions", () => {
  const exam = fakeExam();
  exam.questions = exam.questions.filter((q) => q.domain !== "a" || q.id === "a0");
  const picked = lib.sampleByDomain(exam, 20);
  assert.equal(picked.length, 20);
  assert.equal(new Set(picked.map((q) => q.id)).size, 20);
});

test("shuffle returns a permutation and leaves the input alone", () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8];
  const copy = input.slice();
  const out = lib.shuffle(input);
  assert.deepEqual(input, copy);
  assert.deepEqual(out.slice().sort(), copy);
});
