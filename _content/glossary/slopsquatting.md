---
{
  "title": "Slopsquatting",
  "seo_title": "Slopsquatting: malware in AI-invented packages",
  "description": "Slopsquatting is registering software package names that AI coding tools invent, so developers who trust the advice install malware. Origin and defence.",
  "summary": "Registering software package names that AI coding tools make up, so developers who trust the suggestion install the attacker's code.",
  "updated": "2026-10-18",
  "keyword": "slopsquatting",
  "term": "Slopsquatting",
  "aliases": [],
  "punchline": "Malware waiting at the address AI made up.",
  "kind": "ai",
  "first_seen": "2025",
  "coined_by": "Seth Larson",
  "sensitivity": "",
  "related": [
    "/glossary/hallucination/",
    "/glossary/vibe-coding/",
    "/glossary/ai-slop/",
    "/glossary/ai-slap/",
    "/glossary/botshit/"
  ],
  "sources": [
    {"title": "Slopsquatting", "publisher": "Wikipedia", "url": "https://en.wikipedia.org/wiki/Slopsquatting", "date": ""}
  ]
}
---
## What slopsquatting means

Slopsquatting is a software supply-chain attack that relies on AI coding tools making things up. When a chatbot or coding assistant writes code, it sometimes recommends a package (a reusable library you install with a command such as `pip install` or `npm install`) that doesn't exist. The name looks plausible, so a developer copies the command. Normally that just fails with an error.

The attack is to get there first. Someone registers the made-up name on a public package registry and puts their own code inside it. The next developer who trusts the same suggestion installs the attacker's package instead of getting an error.

The name blends "slop", as in [AI slop](/glossary/ai-slop/), with "typosquatting", the older trick of registering misspellings of popular package or domain names.

## Where slopsquatting came from

The risk was shown before it had a name. In 2023 security researcher Bar Lanyado noticed that AI models kept recommending a package called "huggingface-cli", which wasn't the real package name. He uploaded an empty package under that name to test the idea. According to [Wikipedia's account](https://en.wikipedia.org/wiki/Slopsquatting), it was downloaded more than 30,000 times in three months.

Seth Larson, Developer-in-Residence and security researcher at the Python Software Foundation, coined "slopsquatting" in April 2025, and Andrew Nesbitt popularised it on Mastodon. A study published in 2025, "We Have a Package for You!", tested code-generating models and found that 19.7% of the packages they recommended didn't exist, with open-source models inventing names far more often than proprietary ones. The researchers counted over 205,000 unique hallucinated package names.

Feross Aboukhadijeh, chief executive of the security firm Socket, has warned that developers who are [vibe coding](/glossary/vibe-coding/), accepting AI-written code without reviewing it, are especially exposed, as are AI tools that install packages themselves. As of July 2026, Wikipedia's entry says there had been no reported case of slopsquatting used in a real attack.

## Examples

:::example
A developer asks an assistant for code to parse an unusual file format. The answer includes `pip install fastparse-xmltools`, a name that sounds right and doesn't exist. If someone has registered it with malicious code, running that one line is enough.
:::
:::example
A team's AI agent is allowed to install whatever dependencies it decides it needs. It picks a hallucinated package without any human seeing the name.
:::

The usual defences are plain: check that a package exists, is maintained and is the one you meant before installing it; pin versions with lock files and hashes; and use a dependency scanner.

## How Slop Mop sees it

Slopsquatting is a security problem in code, which is outside what Slop Mop judges. Slop Mop reads the writing in posts, articles and email, not code, and it isn't a security tool, so the defences above are the ones that count. For the confident, empty AI-written posts about coding tools, [How it works](/how-it-works.html) explains what it checks. [Add Slop Mop to your browser](/) and it folds those for you.
