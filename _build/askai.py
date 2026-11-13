"""ask-ai.html: the HTML twin of /ask-ai.md, for assistants that read web pages more reliably than raw Markdown.
Built from ask-ai.md so the two never drift. Deliberately an orphan: nothing on the site links to it; the Ask AI
prompt and the sitemap point to it."""
import html as H
from common import *

SRC = open(f"{ROOT}/ask-ai.md", encoding="utf-8").read()


def inline(s):
    s = H.escape(s, quote=False)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![*\w])\*(?!\s)(.+?)\*(?!\w)", r"<em>\1</em>", s)
    s = re.sub(r"(https?://[^\s<)]+[^\s<).,;:])", r'<a href="\1">\1</a>', s)
    s = re.sub(r"\b([\w.+-]+@slopmop\.lol)\b", r'<a href="mailto:\1">\1</a>', s)
    return s


def md_to_html(md):
    out, para, stack = [], [], []  # stack of open list tags, one per indent level

    def flush():
        if para:
            out.append(f"<p>{inline(' '.join(para))}</p>"); para.clear()

    def close_lists(depth=0):
        while len(stack) > depth:
            out.append(f"</li></{stack.pop()}>")

    for line in md.splitlines():
        m = re.match(r"^(\s*)([-*]|\d+\.)\s+(.*)$", line)
        if m:
            flush()
            depth = len(m.group(1)) // 3 + 1
            tag = "ol" if m.group(2)[0].isdigit() else "ul"
            if depth > len(stack):
                out.append(f"<{tag}><li>"); stack.append(tag)
            else:
                close_lists(depth)
                out.append("</li><li>")
            out.append(inline(m.group(3)))
            continue
        if not line.strip():
            flush(); close_lists(); continue
        close_lists()
        h = re.match(r"^(#{1,3})\s+(.*)$", line)
        if h:
            flush(); n = len(h.group(1))
            out.append(f"<h{n}>{inline(h.group(2))}</h{n}>"); continue
        if line.startswith("> "):
            flush(); out.append(f'<p class="lede">{inline(line[2:])}</p>'); continue
        para.append(line.strip())
    flush(); close_lists()
    return "\n".join(out)


body = md_to_html(SRC)
title = "Slop Mop in brief: what it is, how it works, who it's for"
desc = re.search(r"^> (.*)$", SRC, re.M).group(1)
ld = {"@context": "https://schema.org", "@type": "WebPage", "name": title, "url": "https://slopmop.lol/ask-ai",
      "description": desc, "about": {"@type": "SoftwareApplication", "name": "Slop Mop", "url": "https://slopmop.lol/"},
      "publisher": {"@type": "Organization", "name": "Artimovo LLC", "url": "https://artimovo.com"}}
h = head(title, desc, "ask-ai", ld=ld)
main = f"""<section class="section flush">
  <div class="wrap">
    <article class="prose ask-brief">
{body}
    </article>
  </div>
</section>
"""
write("ask-ai.html", page_shell(h, "", main, islands=False))
