---
{
  "title": "Can slop detection be wrong? False positives explained",
  "seo_title": "Slop detection false positives: when filters err · Slop Mop",
  "description": "Any filter that judges writing will sometimes fold a good post. How slop detection false positives happen, how Slop Mop limits them, and what you can do.",
  "summary": "Every slop filter gets some calls wrong. Where false positives come from, how calibration and one-spike cuts limit them, and how your vote fixes them.",
  "updated": "2026-10-18",
  "keyword": "slop detection false positives",
  "minutes": 6,
  "order": 3,
  "related": ["/learn/ai-detector-vs-writing-quality/", "/patterns/stiff-phrasing/", "/patterns/scroll-stopper/", "/compare/slop-mop-vs-keyword-filters/", "/glossary/ai-suspicion/"],
  "sources": [
    {"title": "GPT detectors are biased against non-native English writers", "publisher": "arXiv (later Patterns, Cell Press)", "url": "https://arxiv.org/abs/2304.02819", "date": "2023-04-06"}
  ]
}
---
Yes. Any system that judges writing will sometimes fold a post that deserved to be read. The useful questions are how often, which posts are most at risk, and how quickly a mistake can be undone. This page covers all three.

## Where slop detection false positives come from

A false positive is a good post scored as slop. It usually happens for one of four reasons:

- **One strong habit in an otherwise good post.** A writer who opens with a dramatic line but then gives real numbers. The hook is a [scroll-stopper](/patterns/scroll-stopper/); the rest isn't slop.
- **A formal style.** Academic, legal and second-language writing often uses the hedges and transitions that look like [stiff phrasing](/patterns/stiff-phrasing/). The research on [AI detectors and non-native writers](https://arxiv.org/abs/2304.02819) shows how badly tools that read surface style can treat careful, plain English.
- **Short posts.** A two-line post with one link can be the most useful thing in your feed, and there's little text to judge.
- **Context the text doesn't carry.** An in-joke between colleagues, or a post that only makes sense with the image under it.

Keyword filters are especially prone to the first and third; the [comparison with keyword and mute filters](/compare/slop-mop-vs-keyword-filters/) shows a good post a word list would have hidden.

## How Slop Mop limits false positives

Slop Mop's scoring is built with these failure modes in mind. [How it works](/how-it-works.html) describes it in full; the parts that matter here:

1. **One spike isn't enough.** When only one of the [nine tells](/patterns/) stands out, the score is cut. Slop usually shows several tells at once.
2. **Unsure answers count for less.** The model behind it is designed for calibrated decisions: it says how sure it is about each tell, and shaky answers carry less weight. If it isn't sure about the post overall, the verdict is "Not sure" and the post is left alone.
3. **Counter-signals pull the score down.** A post that sounds like one particular person, is useful to readers or gets real replies has part of its score taken off.
4. **Authorship can only help.** If a post reads as typed by a person, the score is softened a little. Being AI-assisted never raises it.

:::example
A researcher posts: "Our preprint is out. We find a modest effect (d = 0.21) that did not replicate in the second sample; we discuss possible reasons in section 4." It has hedges, but also a number, an honest limitation and a pointer. Usefulness and the one-spike cut keep it out of the slop band.
:::

## When a false positive happens anyway

You get the last word:

- **Highlight mode** hides nothing. Likely slop gets a red or yellow mop, and you decide. It's the safer setting for feeds where you can't afford to miss anything.
- **Hide mode** folds likely slop into a one-line strip. One click reopens it.
- **Sensitivity** has three levels: Mild, Moderate and Aggressive. If good posts are folding, step down a level.
- **Your vote overrides the model** in your own feed. Vote No on a post it got wrong, and that post's text is kept so the miss can be reviewed.

Slop Mop never deletes, reports, mutes or blocks anything, so a wrong call costs you a click, not a post you'll never see.

## Living with slop detection false positives

No filter gets everything right, and one that never folds a good post will fold very little slop. The trade-off you choose is the sensitivity setting. Most people start on Moderate in Hide mode, check what got folded for a week, and adjust. The glossary entry on [AI suspicion](/glossary/ai-suspicion/) is a reminder that people make the same mistake by gut feeling, without a vote to undo it.

When you're ready to try it on your own feeds, [add Slop Mop to your browser](/) and start in Highlight mode if you'd like to check its calls first.
