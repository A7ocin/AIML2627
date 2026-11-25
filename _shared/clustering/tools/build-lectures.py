"""Build the five published clustering decks, handouts and course entries.

Requires latex2mathml. Run with Python from any directory.
"""

from functools import lru_cache
from html import escape, unescape
from importlib import import_module
from json import dumps, loads
from pathlib import Path
import re
from unicodedata import lookup, name

from latex2mathml.converter import convert

LECTURES = import_module("lecture-content").LECTURES
EXAMPLES_MODULE = import_module("lecture-examples")
EXAMPLES = EXAMPLES_MODULE.examples()
COURSE = Path(__file__).resolve().parents[3]
SHARED = "../_shared/clustering"
TITLE = "Clustering and principal components"
QUESTION_PARTS = [
    ("L07-C01", "L07-C02", "L07-C03", "L07-C04", "L07-O01"),
    ("L07-C05", "L07-C06"),
    ("L07-C07", "L07-O03"),
    ("L07-C08", "L07-O02"),
    ("L07-C09", "L07-C10"),
]
SWEEP_SLIDERS = {
    "mean", "assignment", "merge-count", "cut", "projection", "minmax",
    "outlier", "standardize", "small-eigenvalue",
}
TAKEAWAYS = (
    ["Assign points to centroids and recompute the means.",
     "Explain why distortion falls as more centroids are allowed.",
     "Use an elbow or mean silhouette to compare useful values of K."],
    ["Calculate a posterior from weighted component densities.",
     "Interpret each parameter update as a weighted calculation.",
     "Describe what the E-step holds fixed and what the M-step changes."],
    ["Build a dendrogram by repeatedly joining a closest pair.",
     "Read the partition that a horizontal cut selects.",
     "Explain how the linkage rule can change the next merge."],
    ["Calculate a score along a principal direction.",
     "Connect an eigenvalue to the variance that its component captures.",
     "Use retained scores for reconstruction or visualization."],
    ["Distinguish range scaling, variance scaling and whitening.",
     "Explain how whitening uses the PCA directions and eigenvalues.",
     "Apply the same fitted transformation to new observations."],
)
READING = (
    "G. James et al., <cite>An Introduction to Statistical Learning with Applications in Python</cite>, chapter 12.",
    "C. M. Bishop, <cite>Pattern Recognition and Machine Learning</cite>, chapters 9 and 12.",
)


def folder(part):
    return f"{part + 14:02d}_Clustering_Part_{part}"


def title(part):
    return f"{TITLE} · Part {part}"


def write(path, content):
    target = COURSE / path
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists() or target.read_text(encoding="utf-8") != content:
        target.write_text(content, encoding="utf-8", newline="\n")


def styled_math_letter(match):
    variant, entity = match.groups()
    character = unescape(entity)
    alphabet = "BOLD ITALIC" if variant == "bold-italic" else variant.upper()
    letter = name(character).removeprefix("LATIN ").removeprefix("GREEK ").replace(" LETTER ", " ")
    special = {("script", "L"): "ℒ", ("double-struck", "P"): "ℙ", ("double-struck", "R"): "ℝ"}
    styled = special.get((variant, character))
    if styled is None:
        styled = lookup(f"MATHEMATICAL {alphabet} {letter}")
    return f'<mi>{styled}</mi>'


@lru_cache
def math(source, display="inline"):
    # Native Chromium MathML ignores linebreak="newline" inside an mrow.
    # A one-column MathML table preserves the authored equation rows.
    source = source.replace(r"\begin{gathered}", r"\begin{matrix}")
    source = source.replace(r"\end{gathered}", r"\end{matrix}")
    source = source.replace(r"\begin{aligned}", r"\begin{array}{rl}")
    source = source.replace(r"\end{aligned}", r"\end{array}")
    for op in ("min", "max"):
        marker = rf"\operatorname*{{arg{op}}}_{{"
        while marker in source:
            start = source.index(marker)
            i = start + len(marker)
            end, depth = i, 1
            while depth:
                character = source[end]
                if character in "{}" and source[end-1] != "\\":
                    depth += 1 if character == "{" else -1
                end += 1
            source = source[:start] + rf"\underset{{{source[i:end-1]}}}{{\mathrm{{arg\,{op}}}}}\;" + source[end:]
    source = source.replace(r"\ln p", r"\ln\,p")
    rendered = convert(source, display=display)
    # Encode styled alphabet letters as glyphs so native MathML renders them
    # consistently, including browsers that support only the normal variant.
    rendered = re.sub(r'<mi mathvariant="(bold-italic|double-struck|script)">([^<]+)</mi>',
                      styled_math_letter, rendered)
    rendered = rendered.replace('<mi>&#x0007E;</mi>', '<mo>∼</mo>')
    if "<mtext>\\" in rendered or "<mi>\\" in rendered:
        raise ValueError(f"Unrendered math command in {source}")
    return rendered


def prose(value):
    return "".join(math(piece) if index % 2 else escape(piece)
                   for index, piece in enumerate(value.split("$")))


def equation(value):
    return f'<div class="lesson-formula">{math(value, "block")}</div>' if value else ""


def render_lead(lead):
    if lead.startswith("1. "):
        steps = re.split(r"(?:^| )\d+\. ", lead)[1:]
        return '<ol class="lesson-steps">' + ''.join(f'<li>{prose(step)}</li>' for step in steps) + '</ol>'
    return f'<p class="lesson-lead">{prose(lead)}</p>'


def parse(raw):
    chapter = ""
    slides = []
    for row in raw.strip().splitlines():
        if row.startswith("@"):
            chapter = row[1:]
            continue
        key, heading, lead, detail, *extras = row.split(" | ")
        assert chapter and len(extras) <= 1, row
        slides.append(dict(key=key, title=heading, lead=lead, detail=detail,
                           topic=chapter, extra=extras[0] if extras else ""))
    return slides


def example_markup(key, handout=False):
    if key == "variance-proof":
        label = "Derivation step"
        views = [(name, name, detail, equation(formula))
                 for name, formula, detail in EXAMPLES_MODULE.PROOF]
    else:
        label, views = EXAMPLES[key]
    slider = key in SWEEP_SLIDERS
    if slider:
        control = (f'<input type="range" min="0" max="{len(views)-1}" step="1" value="0" data-choice>'
                   f'<output data-choice-output>{escape(views[0][0])}</output>')
    else:
        choices = "".join(f'<option value="{i}">{escape(item[0])}</option>' for i, item in enumerate(views))
        control = f'<select data-choice>{choices}</select>'
    panels = []
    for index, (_, heading, detail, visual) in enumerate(views):
        if key == "variance-proof":
            heading = f"{index + 1}. {heading}"
        panels.append(
            f'<div class="example-panel{" with-visual" if visual else ""}{" proof-panel" if key == "variance-proof" else ""}"'
            f' data-view data-value="{escape(views[index][0], quote=True)}"{" hidden" if index else ""}>'
            f'<div class="example-copy"><h3>{escape(heading)}</h3><p>{escape(detail)}</p></div>{visual}</div>'
        )
    print_steps = ""
    if handout and key == "variance-proof":
        print_steps = '<ol class="print-proof">' + "".join(
            f'<li><strong>{escape(name)}</strong>{visual}<p>{escape(detail)}</p></li>'
            for name, _, detail, visual in views
        ) + "</ol>"
    return (f'<div class="lesson-example" data-example="{key}" data-no-slide-wheel>'
            f'<div class="example-toolbar"><label>{escape(label)} {control}</label>'
            '<button type="button" data-prev disabled>Back</button><button type="button" data-next>Next</button></div>'
            f'<div aria-live="polite">{"".join(panels)}</div></div>{print_steps}')


def lab_markup(key):
    kind, _, source = key.partition(":")
    return f'<div class="rg-widget" data-kind="{kind}" data-source="{source}"></div>'


def header(label, styles):
    links = "".join(f'<link rel="stylesheet" href="{link}">' for link in styles)
    return ('<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{escape(label)}</title>{links}</head>')


def scripts(*paths):
    return "".join(f'<script src="{path}"></script>' for path in paths)


def section(key, topic, heading, body, classes="", note=""):
    return (f'<section id="{key}" data-slide="{key}" class="{classes}">'
            f'<div class="slide-body"><header class="lesson-heading">'
            f'<span class="kicker">{escape(topic)}</span><h2>{prose(heading)}</h2></header>{body}</div>'
            f'{f"""<aside class="notes">{prose(note)}</aside>""" if note else ""}</section>')


def course_links(part, handout=False):
    filename, companion = ("handout.html", "index.html") if handout else ("index.html", "handout.html")
    previous = (f'../{folder(part-1)}/{filename}', LECTURES[part-2][0]) if part > 1 else (
        f"../15_Classification_Part_5/{filename}", "Classification · Part 5")
    next_link = (f'../{folder(part+1)}/{filename}', LECTURES[part][0]) if part < 5 else (
        "../index.html", "Course home")
    links = [
        ("Previous lecture", *previous),
        ("Read the handout" if not handout else "Open the slides", companion, "This lecture"),
        ("Next lecture" if part < 5 else "All lectures", *next_link),
    ]
    return '<nav class="lesson-links" aria-label="Continue the course">' + "".join(
        f'<a href="{url}"><span>{label}</span><strong>{escape(name)}</strong></a>'
        for label, url, name in links
    ) + '</nav>'


def migration(part, handout=False):
    """Keep external links to topics moved out of the two former packs working."""
    if part > 2:
        return ""
    old = [
        "unlabeled data-lab meaning centroids objective assign update source-animation kmeans-lab initialization limits "
        "choose-k elbow-source elbow silhouette silhouette-reading selection-lab silhouette-lab soft gaussian mixture "
        "posterior likelihood em mstep gmm-lab em-limits em-kmeans",
        "hierarchical dendrogram-source cut linkage hierarchy-lab hierarchy-limits pca-intro aligned-lab rotated-lab "
        "center variance eigen pca-lab reconstruct applications scale-source scaling preprocessing-lab whitening workflow "
        "practice answers summary references",
    ]
    positions = {slide['key']: (i, slide['key']) for i, lecture in enumerate(LECTURES, 1)
                 for slide in parse(lecture[3])}
    positions.update(limits=(1, "initialization"), answers=(5, "practice"), references=(5, "part-references"),
                     elbow=(1, "elbow-source"), alternation=(1, "objective"))
    mapping = {}
    prefix = "chapter-" if handout else "/"
    page = "handout.html" if handout else "index.html"
    for key in old[part-1].split():
        dest, anchor = positions[key]
        if dest != part or anchor != key:
            mapping[prefix + key] = f"../{folder(dest)}/{page}#{prefix}{anchor}"
    if not handout:
        for i, ids in enumerate(QUESTION_PARTS, 1):
            if i == part:
                continue
            for question in ids:
                mapping[f"/wooclap-{question.lower()}"] = f"../{folder(i)}/index.html#/wooclap-{question}"
    return ('<script>(()=>{const paths=' + dumps(mapping, ensure_ascii=False) +
            ';const path=paths[location.hash.slice(1).toLowerCase()]'
            ';if(path){const target=new URL(path,location.href);target.search=location.search;location.replace(target)}})();</script>')


def render_deck(part, title_text, intro, topics, slides):
    styles = [f"{SHARED}/lib/reveal/{name}.min.css" for name in ["reset", "reveal"]]
    styles += [f"{SHARED}/css/{name}.css" for name in
               ["theme-base", "search", "regression", "classification", "classification2", "clustering"]]
    styles += ["../wooclap/slides-wooclap.css?v=1", "../course-parts.css?v=9",
               f"{SHARED}/css/lectures.css"]
    lecture = part + 15
    label = f"AIML · Lecture {lecture} · Clustering · Part {part}"
    topics_html = "".join(f'<div><strong>{escape(t)}</strong></div>' for t in topics)
    cover = (f'<section class="part-cover clustering-cover" id="part-cover" data-slide="part-cover">'
             '<div class="part-shell">'
             f'<span class="kicker">Artificial Intelligence and Machine Learning · Lecture {lecture} of 20</span>'
             f'<p class="part-label">{title(part)}</p>'
             f'<h1>{escape(title_text)}</h1><p class="part-intro">{escape(intro)}</p>'
             f'<div class="part-topics">{topics_html}</div></div></section>')
    out = [header(f"{title(part)} · Lecture {lecture} · AIML", styles),
           f'<body data-lecture-label="{label}" data-clustering-deck><a class="course-home-button" href="../index.html">⌂ Course home</a>',
           migration(part), '<div class="reveal"><div class="slides">', cover]
    roadmap = '<ol class="lesson-list">' + ''.join(f'<li>{escape(t)}</li>' for t in TAKEAWAYS[part-1]) + '</ol>'
    out.append(section("part-roadmap", title(part), "What we will learn", roadmap, "clustering-slide"))
    for slide in slides:
        key, heading, lead, detail, topic, extra = [slide[x] for x in ("key","title","lead","detail","topic","extra")]
        content = render_lead(lead)
        if extra.startswith("@"):
            content += lab_markup(extra[1:])
            classes = "lab-slide clustering-slide"
        elif extra.startswith("%"):
            content += example_markup(extra[1:])
            classes = "clustering-slide example-slide"
        elif extra:
            content += equation(extra)
            content += f'<p class="lesson-note">{prose(detail)}</p>'
            classes = "clustering-slide theory-slide"
        else:
            content += f'<p class="lesson-note">{prose(detail)}</p>'
            classes = "clustering-slide story-slide"
        out.append(section(key, topic, heading, content, classes, detail))
    if part == 5:
        out.append(section("part-references", "Further reading", "Textbook chapters on clustering and PCA",
                           '<ul class="lesson-list">' + ''.join(f'<li>{item}</li>' for item in READING) + '</ul>',
                           "clustering-slide"))
    out.append(section("part-takeaways", title(part), "What to remember", roadmap, "clustering-slide"))
    out.append(section("course-navigation", title(part), "Continue the course", course_links(part), "clustering-slide"))
    out.append('</div></div><div class="lesson-tag"></div>')
    out.append('<nav class="deck-nav" aria-label="Slide navigation">'
               '<button data-nav="prev" aria-label="Previous slide">←</button>'
               '<button data-nav="overview" aria-label="Slide overview">Overview</button>'
               '<button data-nav="next" aria-label="Next slide">→</button></nav>')
    out.append(scripts(f"{SHARED}/lib/reveal/reveal.min.js", f"{SHARED}/js/lecture-examples.js",
                       f"{SHARED}/lib/plotly.min.js",
                       *(f"{SHARED}/js/{name}.js" for name in
                         ("course-data","models","engine","visuals","widgets")),
                       "../wooclap/slides-data.js?v=4", "../wooclap/slides-wooclap.js?v=1",
                       "../course-parts.js?v=8", f"{SHARED}/js/deck.js"))
    out.append("</body></html>\n")
    return "\n".join(out)


def render_handout(part, title_text, intro, slides):
    styles = [f"{SHARED}/css/lectures.css"]
    contents = []
    chapters = []
    previous = None
    for slide in slides:
        key, heading, lead, detail, topic, extra = [slide[x] for x in ("key","title","lead","detail","topic","extra")]
        if topic != previous:
            contents.append([topic, []])
            previous = topic
        contents[-1][1].append((key, heading))
        if extra.startswith("@"):
            printable = {
                "data-lab":"04-data-lab", "source-animation":"10-source-animation", "kmeans-lab":"11-kmeans-lab",
                "elbow-source":"15-elbow-source", "selection-lab":"19-selection-lab",
                "gmm-lab":"28-gmm-lab", "dendrogram-source":"32-dendrogram-source",
                "hierarchy-lab":"35-hierarchy-lab", "aligned-lab":"38-aligned-lab",
                "rotated-lab":"39-rotated-lab", "pca-lab":"43-pca-lab", "scale-source":"46-scale-source",
                "preprocessing-lab":"48-preprocessing-lab",
            }
            image = (f'<img class="print-plot" src="{SHARED}/_review/{printable[key]}.png" '
                     f'alt="Static preview of the plot on this slide">' if key in printable else "")
            body = ('<div class="handout-lab"><button type="button" data-show-lab '
                    f'data-src="index.html?example={key}">Load interactive plot</button> '
                    f'<a href="index.html#/{key}">Open on its slide</a>{image}</div>')
        elif extra.startswith("%"):
            body = example_markup(extra[1:], handout=True)
        else:
            body = equation(extra)
        chapters.append(f'<section class="chapter" id="chapter-{key}" data-source-slide="{key}">'
                        f'<span class="chapter-topic">{escape(topic)}</span><h2>{prose(heading)}</h2>'
                        f'{render_lead(lead)}{body}<p>{prose(detail)}</p></section>')
    if part == 5:
        chapters.append('<section class="chapter" id="chapter-part-references"><h2>Further reading</h2><ul>'
                        + "".join(f'<li>{item}</li>' for item in READING) + '</ul></section>')
        contents.append(("Further reading", [("part-references", "Textbook chapters")]))
    nav = '<nav class="handout-contents" aria-label="Contents"><h2>In this handout</h2>'
    for topic, links in contents:
        nav += f'<p>{escape(topic)}</p><ul>' + ''.join(
            f'<li><a href="#chapter-{key}">{prose(text)}</a></li>' for key, text in links) + '</ul>'
    nav += '</nav>'
    return '\n'.join([
        header(f"{title(part)} · Full-text handout", styles),
        '<body class="clustering-handout"><a class="skip-link" href="#reading">Skip to the handout</a>',
        migration(part, handout=True),
        '<header class="handout-top"><a href="../index.html">Course home</a>',
        f'<span>{title(part)}</span><a href="index.html">Open slides</a></header>',
        '<div class="handout-page">', nav, '<main id="reading">',
        '<header class="handout-hero">',
        f'<p class="chapter-topic">Lecture {part+15} of 20</p><p>{title(part)}</p>',
        f'<h1>{escape(title_text)}</h1><p>{escape(intro)}</p></header>',
        *chapters, '<section class="chapter"><h2>What to remember</h2><ul>',
        *(f'<li>{escape(t)}</li>' for t in TAKEAWAYS[part-1]),
        '</ul></section>', course_links(part, handout=True), '</main></div>',
        scripts(f"{SHARED}/js/lecture-examples.js"), '</body></html>\n',
    ])


def records():
    result = []
    for part, (subtitle, intro, topics, raw) in enumerate(LECTURES, 1):
        slides = parse(raw)
        path = folder(part)
        write(Path(path) / "index.html", render_deck(part, subtitle, intro, topics, slides))
        write(Path(path) / "handout.html", render_handout(part, subtitle, intro, slides))
        write(Path(path) / "availability.js", "// Presence marker used by the course landing page.\n")
        result.append(dict(number=part+15, pack=path, source="07_Clustering", half=part, part=part,
                           title=title(part), subtitle=subtitle, topics=topics, intro=intro,
                           takeaways=TAKEAWAYS[part-1], source_slides=[s['key'] for s in slides], recap=[],
                           questions=list(QUESTION_PARTS[part-1]), slides=len(slides)+4+(part==5),
                           chapters=len(slides)+1+(part==5),
                           labs=sum(s["extra"].startswith(("@", "%")) for s in slides)))
    return result


def update_course(entries):
    pos = Path("course-structure.json")
    structure = loads((COURSE / pos).read_text(encoding="utf-8"))
    structure["lectures"] = [l for l in structure["lectures"] if l["number"] < 16] + entries
    structure["interactive_examples"] = sum(l["labs"] for l in structure["lectures"])
    write(pos, dumps(structure, ensure_ascii=False, indent=2) + "\n")

    pos = Path("course-structure.md")
    doc = (COURSE / pos).read_text(encoding="utf-8")
    doc = re.sub(r"\b\d+-lecture structure", "20-lecture structure", doc, count=1)
    rows = "".join(
        f'| {l["number"]} | [{l["title"]}]({l["pack"]}/index.html) | {l["subtitle"]} | '
        f'{l["slides"]} | {len(l["questions"])} | {l["labs"]} |\n' for l in entries)
    doc = re.sub(r"(?m)(?:^\| (?:16|17|18|19|20) \|[^\n]*\n)+", lambda _: rows, doc, count=1)
    write(pos, doc)

    pos = Path("index.html")
    index = (COURSE / pos).read_text(encoding="utf-8")
    cards = []
    for l in entries:
        topics = " · ".join(map(escape, l["topics"]))
        n, path = l["number"], l["pack"]
        cards.append(
            f'<article class="lecture-card" id="lecture-{n}"><div class="lecture-meta"><span>Lecture {n}</span>'
            f'<span>{l["slides"]} slides + {len(l["questions"])} questions · {l["labs"]} interactive examples</span></div>'
            f'<h3>{escape(l["title"])}</h3><p>{escape(l["subtitle"])}</p><div class="topics">{topics}</div>'
            f'<div class="lecture-actions"><a class="primary" href="{path}/index.html">Open slides ↗</a>'
            f'<a href="{path}/handout.html">Read handout →</a></div></article>')
    index = re.sub(r'(?:<article class="lecture-card" id="lecture-(?:16|17|18|19|20)">.*?</article>)+',
                   lambda _: "".join(cards), index, count=1)
    index = re.sub(r'<strong>\d+</strong> (lectures|full-text handouts|question slides|interactive examples)</span>',
                   lambda m: f'<strong>{dict(lectures=len(structure["lectures"]), **{"full-text handouts":len(structure["lectures"]), "question slides":sum(len(l["questions"]) for l in structure["lectures"]), "interactive examples":structure["interactive_examples"]})[m[1]]}</strong> {m[1]}</span>',
                   index, count=4)
    write(pos, index)

    pos = Path("wooclap/question-bank.json")
    raw = (COURSE / pos).read_text(encoding="utf-8")
    bank = loads(raw)
    bank["lectures"] = [l for l in bank["lectures"] if l["number"] < 16] + [
        {key:l[key] for key in ("number", "pack", "title", "subtitle")} for l in entries
    ]
    bank["organization"] = ("20 lectures. Classification and clustering each have five parts. "
                            "Original question IDs are stable identifiers and do not encode the current lecture numbers.")
    for l in entries:
        for q in bank["questions"]:
            if q["id"] in l["questions"]:
                q.update(lecture=l["number"], pack=l["pack"])
    write(pos, dumps(bank, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    entries = records()
    update_course(entries)
    for item in entries:
        print(f'{item["pack"]}: {item["slides"]} slides + {len(item["questions"])} questions, {item["labs"]} examples')
