#!/usr/bin/env python3
# Anthropic University helper, created by Patrick King. Unofficial; not affiliated with Anthropic.
# Standard library only, so it runs in Claude Code, the desktop app sandbox, and chat code execution.
# Reads the bundled banks in ../data and prints JSON (or export text) to stdout.
"""Anthropic University data helper.

usage:
  au.py catalog
  au.py info <track-or-lane>
  au.py sample <track-or-lane> [--n N | --official] [--domain ID]... [--difficulty easy|medium|hard]
                               [--exclude ID,ID] [--seed S] [--with-answers]
  au.py cards <track-or-lane> [--domain ID]... [--limit N] [--seed S]
  au.py grade <track-or-lane> QID=ANSWER [QID=ANSWER ...]
  au.py find <track-or-lane> "text"
  au.py export <track-or-lane> [--format quizlet|anki|markdown] [--source cards|questions]
                               [--domain ID]... [--ids ID,ID] [--out FILE]

Ids: exam ids (developer-foundations) or lane ids (claude-code); loose names like "dev",
"architect pro", or "mcp" are resolved. For lanes, --domain filters by module id (m1, m2, ...).
`sample` omits keys and explanations unless --with-answers; score with `grade`.
"""
import json, os, random, re, sys
from typing import NoReturn

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.normpath(os.path.join(HERE, "..", "data"))
KEYS = "ABCDEF"
ALIASES = {
    "associate": "associate-foundations", "as": "associate-foundations",
    "developer": "developer-foundations", "dev": "developer-foundations", "dv": "developer-foundations",
    "architect": "architect-foundations", "architect foundations": "architect-foundations",
    "ar": "architect-foundations", "af": "architect-foundations",
    "architect pro": "architect-professional", "architect professional": "architect-professional",
    "ap": "architect-professional", "pro": "architect-professional",
    "api": "claude-api-fundamentals", "prompting": "prompt-engineering", "prompts": "prompt-engineering",
    "code": "claude-code", "claude code": "claude-code", "mcp": "mcp-and-integrations",
    "agents": "building-agents", "essentials": "claude-essentials", "work": "claude-for-work",
    "admin": "enterprise-administration", "desktop": "desktop-deployment",
    "industry": "industry-solutions", "delivery": "partner-delivery-adoption",
    "solutioning": "partner-enterprise-solutioning", "foundation models": "partner-foundation-models",
}


def die(msg) -> NoReturn:
    print(json.dumps({"error": msg}), file=sys.stderr)
    sys.exit(2)


def catalog():
    with open(os.path.join(DATA, "catalog.json")) as f:
        return json.load(f)


def resolve(name):
    cat = catalog()
    exams = [e["examId"] for e in cat.get("exams", [])]
    lanes = [l["laneId"] for l in cat.get("lanes", [])]
    key = name.strip().lower().replace("_", "-")
    key = ALIASES.get(key, ALIASES.get(key.replace("-", " "), key))
    if key in exams:
        return "exam", key
    if key in lanes:
        return "lane", key
    hits = [x for x in exams + lanes if key in x]
    if len(hits) == 1:
        return ("exam" if hits[0] in exams else "lane"), hits[0]
    die("unknown track or lane '%s'. Known: %s" % (name, ", ".join(exams + lanes)))


def load(name):
    kind, id_ = resolve(name)
    path = os.path.join(DATA, id_ + ".json") if kind == "exam" else os.path.join(DATA, "lanes", id_ + ".json")
    with open(path) as f:
        d = json.load(f)
    d["_kind"], d["_id"] = kind, id_
    if kind == "lane":  # present modules as domains so every command treats both the same way
        d["domains"] = [{"id": m["id"], "name": m["title"], "weight": 1.0 / max(1, len(d["modules"]))}
                        for m in d["modules"]]
        for item in d["questions"] + d.get("cards", []):
            item["domain"] = item.get("module") or item.get("domain")
    return d


def keys_of(q):
    return [k for k in KEYS if k in q["options"]]


def answer_set(q):
    a = q["answer"]
    return sorted(a) if isinstance(a, list) else [a]


def norm_answer(s):
    return sorted(set(ch for ch in s.upper() if ch in KEYS))


def public(q, with_answers=False):
    out = {k: q[k] for k in ("id", "domain", "studyArea", "scenario", "difficulty", "stem") if q.get(k)}
    out["options"] = {k: q["options"][k] for k in keys_of(q)}
    if isinstance(q["answer"], list):
        out["select"] = q.get("select", len(q["answer"]))
    if with_answers:
        for k in ("answer", "explanationCorrect", "explanationDistractor", "reference"):
            if q.get(k):
                out[k] = q[k]
    return out


def largest_remainder(weights, n):
    total = sum(weights.values()) or 1
    raw = {k: n * w / total for k, w in weights.items()}
    base = {k: int(v) for k, v in raw.items()}
    short = n - sum(base.values())
    for k in sorted(raw, key=lambda k: raw[k] - base[k], reverse=True)[:short]:
        base[k] += 1
    return base


def weighted_sample(d, pool, n, rng):
    by = {}
    for q in pool:
        by.setdefault(q["domain"], []).append(q)
    weights = {x["id"]: x.get("weight", 0) for x in d["domains"] if x["id"] in by}
    want = largest_remainder(weights, n)
    picked = []
    for dom, k in want.items():
        items = by[dom][:]
        rng.shuffle(items)
        picked += items[:k]
    if len(picked) < n:
        rest = [q for q in pool if q not in picked]
        rng.shuffle(rest)
        picked += rest[: n - len(picked)]
    return picked[:n]


def arg_list(args, flag):
    vals = []
    while flag in args:
        i = args.index(flag)
        vals += [v for v in args[i + 1].split(",") if v]
        del args[i:i + 2]
    return vals


def arg_val(args, flag, default=None):
    if flag in args:
        i = args.index(flag)
        v = args[i + 1]
        del args[i:i + 2]
        return v
    return default


def arg_flag(args, flag):
    if flag in args:
        args.remove(flag)
        return True
    return False


def cmd_catalog(args):
    print(json.dumps(catalog(), indent=2, ensure_ascii=False))


def cmd_info(args):
    d = load(args[0])
    out = {"id": d["_id"], "kind": d["_kind"], "title": d.get("title"),
           "questions": len(d["questions"]), "cards": len(d.get("cards", [])),
           "selectN": sum(isinstance(q["answer"], list) for q in d["questions"])}
    counts = {}
    for q in d["questions"]:
        counts[q["domain"]] = counts.get(q["domain"], 0) + 1
    out["domains"] = [{"id": x["id"], "name": x["name"], "weight": round(x.get("weight", 0), 3),
                       "questions": counts.get(x["id"], 0)} for x in d["domains"]]
    for k in ("official", "meta", "scenarios", "summary", "level", "prerequisites",
              "relatedCertifications", "officialResources"):
        if d.get(k):
            out[k] = d[k]
    print(json.dumps(out, indent=2, ensure_ascii=False))


def cmd_sample(args):
    name = args.pop(0)
    d = load(name)
    doms = arg_list(args, "--domain")
    excl = set(arg_list(args, "--exclude"))
    diff = arg_val(args, "--difficulty")
    seed = arg_val(args, "--seed")
    n = arg_val(args, "--n")
    official = arg_flag(args, "--official")
    with_answers = arg_flag(args, "--with-answers")
    rng = random.Random(seed)
    pool = [q for q in d["questions"] if q["id"] not in excl
            and (not doms or q["domain"] in doms) and (not diff or q.get("difficulty") == diff)]
    scenarios = None
    if official:
        n = (d.get("official") or {}).get("items") or 20
        if d.get("scenarios"):
            names = [s["name"] for s in d["scenarios"]]
            rng.shuffle(names)
            scenarios = names[:4]
            pool = [q for q in pool if q.get("scenario") in scenarios]
    n = min(int(n or 10), len(pool))
    picked = weighted_sample(d, pool, n, rng) if not doms else rng.sample(pool, n)
    if scenarios:
        picked.sort(key=lambda q: scenarios.index(q["scenario"]))
    else:
        rng.shuffle(picked)
    out = {"id": d["_id"], "count": len(picked), "seed": seed, "scenarios": scenarios,
           "questions": [public(q, with_answers) for q in picked]}
    print(json.dumps(out, indent=2, ensure_ascii=False))


def cmd_cards(args):
    name = args.pop(0)
    d = load(name)
    doms = arg_list(args, "--domain")
    limit = int(arg_val(args, "--limit", "0") or 0)
    rng = random.Random(arg_val(args, "--seed"))
    cards = [c for c in d.get("cards", []) if not doms or c.get("domain") in doms]
    rng.shuffle(cards)
    if limit:
        cards = cards[:limit]
    print(json.dumps({"id": d["_id"], "count": len(cards), "cards": cards}, indent=2, ensure_ascii=False))


def cmd_grade(args):
    name = args.pop(0)
    d = load(name)
    byid = {q["id"]: q for q in d["questions"]}
    names = {x["id"]: x["name"] for x in d["domains"]}
    results, per = [], {}
    for pair in args:
        if "=" not in pair:
            die("expected QID=ANSWER, got '%s'" % pair)
        qid, ans = pair.split("=", 1)
        q = byid.get(qid.strip())
        if not q:
            die("no question '%s' in %s" % (qid, d["_id"]))
        given = norm_answer(ans)
        key = answer_set(q)
        ok = given == key
        results.append({"id": q["id"], "domain": q["domain"], "studyArea": q.get("studyArea"),
                        "given": given, "key": key, "correct": ok,
                        "keyText": {k: q["options"][k] for k in key},
                        "explanationCorrect": q.get("explanationCorrect"),
                        "explanationDistractor": q.get("explanationDistractor"),
                        "reference": q.get("reference")})
        t = per.setdefault(q["domain"], [0, 0])
        t[0] += ok
        t[1] += 1
    correct = sum(r["correct"] for r in results)
    total = len(results)
    out = {"id": d["_id"], "correct": correct, "total": total, "results": results,
           "byDomain": [{"id": k, "name": names.get(k, k), "correct": v[0], "total": v[1]}
                        for k, v in per.items()]}
    meta = d.get("meta") or {}
    if total and d["_kind"] == "exam":
        lo, hi = meta.get("scaleMin", 100), meta.get("scaleMax", 1000)
        scaled = round(lo + (correct / total) * (hi - lo))
        out["scaled"] = scaled
        out["passScaled"] = meta.get("passScaled", 720)
        out["pass"] = scaled >= out["passScaled"]
        out["note"] = "Approximate and unofficial; the real exam uses its own scaling."
    elif total:
        out["percent"] = round(100 * correct / total)
        out["complete"] = out["percent"] >= 70
    print(json.dumps(out, indent=2, ensure_ascii=False))


def cmd_find(args):
    d = load(args[0])
    words = [w for w in re.findall(r"\w+", " ".join(args[1:]).lower()) if len(w) >= 3]
    if not words:
        die("find needs at least one search word of 3+ letters")

    def score(text):
        text = text.lower()
        return sum(w in text for w in words)

    qs = [(score(q["stem"] + " " + " ".join(q["options"].values())), q) for q in d["questions"]]
    cs = [(score(c["front"] + " " + c["back"]), c) for c in d.get("cards", [])]
    qs = sorted((x for x in qs if x[0]), key=lambda x: -x[0])[:5]
    cs = sorted((x for x in cs if x[0]), key=lambda x: -x[0])[:5]
    print(json.dumps({"id": d["_id"],
                      "matches": [dict(public(q, True), score=n) for n, q in qs],
                      "cards": [dict(c, score=n) for n, c in cs]},
                     indent=2, ensure_ascii=False))


def clean(s, sep=" / "):
    return re.sub(r"\s*\n\s*", sep, str(s)).replace("\t", " ").strip()


def cmd_export(args):
    name = args.pop(0)
    d = load(name)
    fmt = arg_val(args, "--format", "quizlet")
    src = arg_val(args, "--source", "cards")
    doms = arg_list(args, "--domain")
    ids = set(arg_list(args, "--ids"))
    out_path = arg_val(args, "--out")
    rows = []
    if src == "cards":
        for c in d.get("cards", []):
            if (not doms or c.get("domain") in doms) and (not ids or c.get("front") in ids):
                rows.append((c["front"], c["back"], c.get("domain") or ""))
    else:
        for q in d["questions"]:
            if (doms and q["domain"] not in doms) or (ids and q["id"] not in ids):
                continue
            opts = " ".join("%s) %s" % (k, q["options"][k]) for k in keys_of(q))
            sel = " (Select %d)" % len(q["answer"]) if isinstance(q["answer"], list) else ""
            front = "%s%s %s" % (q["stem"], sel, opts)
            back = "%s: %s" % ("/".join(answer_set(q)), q.get("explanationCorrect", ""))
            rows.append((front, back, q["domain"]))
    about = ("About this deck", "Unofficial Anthropic University study set, created by Patrick King. "
             "Not affiliated with Anthropic.", "about")
    rows.append(about)
    if fmt == "quizlet":
        text = "\n".join("%s\t%s" % (clean(a), clean(b)) for a, b, _ in rows)
    elif fmt == "anki":
        q = lambda s: '"' + clean(s, " <br> ").replace('"', '""') + '"'
        lines = ["#separator:Comma", "#html:true", "#tags column:3"]
        lines += ["%s,%s,%s" % (q(a), q(b), q("au::%s::%s" % (d["_id"], t))) for a, b, t in rows]
        text = "\n".join(lines)
    elif fmt == "markdown":
        text = "# %s (%s)\n\n" % (d.get("title", d["_id"]), src) + "\n".join(
            "- **%s** — %s" % (clean(a), clean(b)) for a, b, _ in rows)
    else:
        die("format must be quizlet, anki, or markdown")
    if out_path:
        with open(out_path, "w") as f:
            f.write(text + "\n")
        print(json.dumps({"written": out_path, "items": len(rows) - 1}))
    else:
        print(text)


def main():
    args = sys.argv[1:]
    if not args or args[0] in ("-h", "--help", "help"):
        print(__doc__)
        return
    cmd = args.pop(0)
    fn = {"catalog": cmd_catalog, "info": cmd_info, "sample": cmd_sample, "cards": cmd_cards,
          "grade": cmd_grade, "find": cmd_find, "export": cmd_export}.get(cmd)
    if not fn:
        die("unknown command '%s' (see --help)" % cmd)
    if cmd != "catalog" and not args:
        die("'%s' needs a track or lane id" % cmd)
    fn(args)


if __name__ == "__main__":
    main()
