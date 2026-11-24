/* Anthropic University - pure helpers shared by the web app and the offline tests.
   Vanilla ES5, no dependencies. Loaded before app.js; exposes window.AULib
   (and module.exports under Node). */
(function (root) {
"use strict";

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* Only http(s), mailto, relative and in-page links are allowed in study guides. */
function isSafeUrl(u) {
  var s = String(u).trim();
  if (/^(https?:|mailto:|#|\/|\.\/|\.\.\/)/i.test(s)) return true;
  return !/^[a-z][a-z0-9+.-]*:/i.test(s);
}

// ---- markdown (compact, covers our study-guide subset) ------------------
var CODE_OPEN = "@@AUCODE", CODE_CLOSE = "AUCODE@@";
function mdInline(s) {
  s = String(s == null ? "" : s);
  var codes = [];
  s = s.replace(/`([^`]+)`/g, function (_, c) {
    codes.push(c);
    return CODE_OPEN + (codes.length - 1) + CODE_CLOSE;
  });
  s = escapeHtml(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, t, u) {
    if (!isSafeUrl(u)) return t;
    return '<a href="' + u + '" target="_blank" rel="noopener">' + t + "</a>";
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  s = s.replace(new RegExp(CODE_OPEN + "(\\d+)" + CODE_CLOSE, "g"), function (_, i) {
    return "<code>" + escapeHtml(codes[+i]) + "</code>";
  });
  return s;
}
function renderMarkdown(md) {
  var lines = String(md || "").replace(/\r\n/g, "\n").split("\n");
  var out = [], i = 0;
  function flushList(type, items) {
    out.push("<" + type + ">" + items.map(function (t) {
      return "<li>" + mdInline(t) + "</li>";
    }).join("") + "</" + type + ">");
  }
  while (i < lines.length) {
    var line = lines[i];
    if (/^```/.test(line)) {
      var buf = []; i++;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      out.push("<pre><code>" + escapeHtml(buf.join("\n")) + "</code></pre>");
      continue;
    }
    var h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      var lvl = h[1].length;
      out.push("<h" + lvl + ">" + mdInline(h[2]) + "</h" + lvl + ">");
      i++;
      continue;
    }
    if (/^\s*>/.test(line)) {
      var q = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        q.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      out.push("<blockquote>" + mdInline(q.join(" ")) + "</blockquote>");
      continue;
    }
    if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|?[\s:\-|]+\|?\s*$/.test(lines[i + 1])) {
      var rows = [];
      while (i < lines.length && /\|/.test(lines[i]) && lines[i].trim()) {
        rows.push(lines[i]);
        i++;
      }
      var cells = function (r) {
        return r.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(function (c) { return c.trim(); });
      };
      var head = cells(rows[0]);
      var body = rows.slice(2).map(cells);
      var t = "<table><thead><tr>" + head.map(function (c) {
        return "<th>" + mdInline(c) + "</th>";
      }).join("") + "</tr></thead><tbody>";
      t += body.map(function (r) {
        return "<tr>" + r.map(function (c) {
          return "<td>" + mdInline(c) + "</td>";
        }).join("") + "</tr>";
      }).join("");
      out.push(t + "</tbody></table>");
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      var ul = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        ul.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      flushList("ul", ul);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      var ol = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        ol.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      flushList("ol", ol);
      continue;
    }
    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
    if (!line.trim()) { i++; continue; }
    var para = [line]; i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\s*[-*]\s|\s*\d+\.\s|\s*>|\s*\|)/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    out.push("<p>" + mdInline(para.join(" ")) + "</p>");
  }
  return out.join("\n");
}

/* Approximate scaled score: linear map of the correct fraction onto the exam scale. */
function scaledScore(correct, total, meta) {
  var frac = total > 0 ? correct / total : 0;
  var scaled = Math.round(meta.scaleMin + frac * (meta.scaleMax - meta.scaleMin));
  return { scaled: scaled, pass: scaled >= meta.passScaled };
}

/* Pick n questions, spread across domains by weight, then fill from the rest. */
function sampleByDomain(exam, n) {
  var qs = exam.questions || [];
  if (n >= qs.length) return shuffle(qs);
  var byDomain = {};
  qs.forEach(function (q) { (byDomain[q.domain] = byDomain[q.domain] || []).push(q); });
  var picked = [];
  (exam.domains || []).forEach(function (d) {
    var pool = shuffle(byDomain[d.id] || []);
    var want = Math.max(1, Math.round((d.weight || (1 / (exam.domains.length || 1))) * n));
    picked = picked.concat(pool.slice(0, want));
  });
  if (picked.length < n) {
    var remaining = shuffle(qs.filter(function (q) { return picked.indexOf(q) === -1; }));
    picked = picked.concat(remaining.slice(0, n - picked.length));
  }
  return shuffle(picked.slice(0, n));
}

var api = {
  escapeHtml: escapeHtml, shuffle: shuffle, isSafeUrl: isSafeUrl, mdInline: mdInline,
  renderMarkdown: renderMarkdown, scaledScore: scaledScore, sampleByDomain: sampleByDomain
};
if (typeof module !== "undefined" && module.exports) module.exports = api;
root.AULib = api;
})(typeof window !== "undefined" ? window : globalThis);
