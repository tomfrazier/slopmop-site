"""Turn the rendered /media page into the press kit's document (DOCX, PDF and plain text).

The document is built from media.html itself, so the press kit always says what
the page says. Needs beautifulsoup4 and pandoc; the PDF also needs LibreOffice
(soffice). Called from build.py when it writes the zip.
"""
import copy
import os
import subprocess
import tempfile
from urllib.parse import urljoin

from bs4 import BeautifulSoup

SITE = "https://slopmop.lol/"
INK = "16181A"
FONT = "Archivo"

# What the zip holds, described at the end of the document.
KIT_FILES = [
    ("Slop Mop press kit.pdf / .docx / .txt", "this document, as PDF, editable Word and plain text"),
    ("video/slop-mop-product-video.mp4", "the product video, 50 seconds with sound, 1080p"),
    ("logos/", "wordmarks for light and dark backgrounds (SVG and PNG), the mop mark (SVG and PNG) and the 512px app icon"),
    ("images/", "the share card, the State of Slop October 2026 headline graphic and the media kit card, all 1200x630 PNG"),
]
SKIP_SECTIONS = {"assets"}


def _clean(sec, soup):
    for el in sec.select("button, svg, video, img, .mk-video, .mk-tbd, .mk-row, .ask-ai-btn, .mk-headshot, .mk-copy"):
        el.decompose()
    for b in sec.select(".badge"):
        b.replace_with("(%s)" % b.get_text(strip=True))
    # At-a-glance rows become a two-column table.
    for kv in sec.select(".kv"):
        table = soup.new_tag("table")
        for row in kv.find_all("div", recursive=False):
            k, v = row.select_one(".k"), row.select_one(".v")
            if not (k and v):
                continue
            tr = soup.new_tag("tr")
            th, td = soup.new_tag("th"), soup.new_tag("td")
            th.string = k.get_text(strip=True)
            for child in list(v.contents):
                td.append(child)
            tr.append(th)
            tr.append(td)
            table.append(tr)
        kv.replace_with(table)
    # Stat tiles become a list: the figure, its label, then its note.
    for stats in sec.select(".sos-stats"):
        ul = soup.new_tag("ul")
        for st in stats.select(".sos-stat"):
            li = soup.new_tag("li")
            strong = soup.new_tag("strong")
            strong.string = st.b.get_text(strip=True)
            li.append(strong)
            li.append(" %s" % st.select_one(".mono").get_text(strip=True))
            if st.small:
                li.append(" (%s)" % st.small.get_text(strip=True))
            ul.append(li)
        stats.replace_with(ul)
    # Quotes become block quotes with their attribution underneath.
    for fig in sec.select("figure.mk-quote"):
        bq = soup.new_tag("blockquote")
        p = soup.new_tag("p")
        p.string = "“%s”" % fig.blockquote.get_text(" ", strip=True)
        bq.append(p)
        on = fig.select_one("figcaption .mono")
        att = soup.new_tag("p")
        em = soup.new_tag("em")
        em.string = "Tom Frazier, founder of Slop Mop and Artimovo, %s" % (on.get_text(strip=True) if on else "")
        att.append(em)
        bq.append(att)
        fig.replace_with(bq)
    # FAQ items become a heading and its answer.
    for d in sec.select("details"):
        q = d.summary
        h = soup.new_tag("h4")
        h.string = q.get_text(strip=True)
        q.decompose()
        div = soup.new_tag("div")
        for child in list(d.select_one(".a").contents if d.select_one(".a") else d.contents):
            div.append(child)
        d.replace_with(h)
        h.insert_after(div)
    for a in sec.find_all("a", href=True):
        href = a["href"]
        if not href.startswith(("http", "mailto:", "#")):
            a["href"] = urljoin(SITE, href)
        a.attrs = {"href": a["href"]}
    for el in sec.find_all(True):
        for attr in ("class", "style", "id", "target", "rel", "data-theme"):
            el.attrs.pop(attr, None)
    return sec


def build_html(media_html, updated, inline_urls=False):
    """The document as HTML. inline_urls spells each link's address out, for the plain-text copy."""
    soup = BeautifulSoup(media_html, "html.parser")
    lede = soup.select_one("main .page-head .lede")
    parts = [
        "<p><strong>Read only the posts worth your time</strong></p>",
        "<p>%s</p>" % (lede.get_text(" ", strip=True).replace("This page has", "This kit has") if lede else ""),
        '<p>Updated %s. Online at <a href="https://slopmop.lol/media">slopmop.lol/media</a>. '
        'Press contact: <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a>.</p>' % updated,
    ]
    for sec in soup.select("main .prose > section[id]"):
        if sec["id"] in SKIP_SECTIONS:
            continue
        parts.append(str(_clean(copy.copy(sec), soup)))
    parts.append("<h2>What's in this kit</h2><ul>%s</ul>" % "".join(
        "<li><strong>%s</strong>: %s</li>" % (f, d) for f, d in KIT_FILES))
    parts.append("<p>Use the logos as they are: don't rotate, recolor or outline the mop. Write the name as Slop Mop, two words. "
                 "Credit Tom Frazier's headshots “Courtesy of Tom Frazier.” Hi-res headshots: "
                 '<a href="https://www.tomfrazier.com/media-kit/">tomfrazier.com/media-kit</a>.</p>')
    out = BeautifulSoup("\n".join(parts), "html.parser")
    if inline_urls:
        for a in out.find_all("a", href=True):
            url = a["href"].replace("mailto:", "")
            text = a.get_text(strip=True)
            if url.rstrip("/").split("//")[-1] != text.rstrip("/") and url != text:
                a.append(" (%s)" % url)
    return '<html><head><meta charset="utf-8"><title>Slop Mop press kit</title></head><body>%s</body></html>' % out


def _reference_docx(path):
    """Pandoc's default styles, set in the brand's type and ink."""
    from docx import Document
    from docx.shared import Pt, RGBColor
    with open(path, "wb") as f:
        f.write(subprocess.run(["pandoc", "--print-default-data-file", "reference.docx"], check=True, capture_output=True).stdout)
    doc = Document(path)
    sizes = {"Title": 26, "Heading 1": 22, "Heading 2": 15, "Heading 3": 12, "Heading 4": 10.5}
    for st in doc.styles:
        if st.type != 1 or st.font is None:
            continue
        st.font.name = FONT
        st.font.color.rgb = RGBColor.from_string(INK)
        if st.name in sizes:
            st.font.size = Pt(sizes[st.name])
            st.font.bold = True
        elif st.name in ("Normal", "Body Text", "First Paragraph", "Compact", "Block Text"):
            st.font.size = Pt(10.5)
    doc.save(path)


def write(media_html, out_dir, updated, name="Slop Mop press kit"):
    """Write <name>.docx, .pdf and .txt to out_dir and return their paths."""
    with tempfile.TemporaryDirectory() as tmp:
        html_path = os.path.join(tmp, "kit.html")
        open(html_path, "w", encoding="utf-8").write(build_html(media_html, updated))
        txt_src = os.path.join(tmp, "kit-txt.html")
        open(txt_src, "w", encoding="utf-8").write(build_html(media_html, updated, inline_urls=True))
        ref = os.path.join(tmp, "reference.docx")
        _reference_docx(ref)
        docx = os.path.join(out_dir, name + ".docx")
        txt = os.path.join(out_dir, name + ".txt")
        subprocess.run(["pandoc", html_path, "-f", "html", "-t", "docx", "--reference-doc", ref, "-o", docx], check=True)
        subprocess.run(["pandoc", txt_src, "-f", "html", "-t", "plain", "--wrap=none", "-o", txt], check=True)
        subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", out_dir, docx],
                       check=True, capture_output=True, env=dict(os.environ, HOME=tmp))
    return docx, os.path.join(out_dir, name + ".pdf"), txt
