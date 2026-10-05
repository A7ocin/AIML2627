from pathlib import Path
from html import escape
import json, math as pymath
ROOT=Path(__file__).resolve().parents[1]
slides=[]
def add(id,kicker,title,body,notes='',cls=''):slides.append(dict(id=id,kicker=kicker,title=title,body=body,notes=notes,cls=cls))
def card(label,text,tone='neural'):return f'<div class="card card-{tone}"><span class="label">{label}</span>{text}</div>'
def cols(*items):return '<div class="cols">'+''.join('<div class="col">'+i+'</div>' for i in items)+'</div>'
def bullets(*items):return '<ul class="tight">'+''.join('<li>'+i+'</li>' for i in items)+'</ul>'
def note(t):return '<p class="takeaway">'+t+'</p>'
def math(t):return '<div class="formula">'+t+'</div>'
def diagram(k):return f'<div class="static-diagram" data-diagram="{k}"></div>'
def table(headers,rows):return '<table class="comparison"><thead><tr>'+''.join('<th>'+h+'</th>' for h in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+v+'</td>' for v in row)+'</tr>' for row in rows)+'</tbody></table>'
def lab(id,title,kind,prompt,notes,source=''):add(id,'Interactive lab · Clustering',title,f'<p class="lab-prompt">{prompt}</p><div class="rg-widget" data-kind="{kind}" data-source="{source}"></div>',notes,'lab-slide')

exec((ROOT/'tools/content.py').read_text(encoding='utf8'))

html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lesson 7 — Clustering · AIML</title>'+''.join(f'<link rel="stylesheet" href="{f}">' for f in ['lib/reveal/reset.min.css','lib/reveal/reveal.min.css','css/theme-base.css','css/search.css','css/regression.css','css/classification.css','css/classification2.css','css/clustering.css'])+'</head><body><div class="reveal"><div class="slides">'
for s in slides:html+=f'<section id="{s["id"]}" data-slide="{s["id"]}" class="{s["cls"]}"><span class="kicker">{s["kicker"]}</span><div class="slide-body"><h2>{s["title"]}</h2>{s["body"]}</div><aside class="notes">{escape(s["notes"])}</aside></section>'
html+='</div></div><div class="lesson-tag">AIML · Lesson 7 — Clustering</div><nav class="deck-nav" aria-label="Slide navigation"><button data-nav="prev" aria-label="Previous slide">←</button><button data-nav="overview">Overview</button><button data-nav="next" aria-label="Next slide">→</button></nav>'+''.join(f'<script src="{f}"></script>' for f in ['lib/reveal/reveal.min.js','lib/plotly.min.js','js/course-data.js','js/models.js','js/engine.js','js/visuals.js','js/widgets.js','js/deck.js'])+'</body></html>'
(ROOT/'index.html').write_text(html,encoding='utf-8')
(ROOT/'notes/slide-notes.md').write_text('# Lesson 7 — Clustering\n\n'+''.join(f'## {i}. {s["title"]}\n\n{s["notes"] or "Explain the displayed relationship and connect it to the preceding example."}\n\n' for i,s in enumerate(slides,1)),encoding='utf-8')
(ROOT/'notes/slide-manifest.json').write_text(json.dumps([{k:v for k,v in s.items() if k!='body'} for s in slides],ensure_ascii=False,indent=2),encoding='utf-8')
print('Built',len(slides),'slides.')
