---
{
  "title": "Vibe coding",
  "seo_title": "Vibe coding: meaning, origin and limits · Slop Mop",
  "description": "Vibe coding is building software by prompting an AI without reading the code it writes. Where Andrej Karpathy's 2025 term came from and how it stretched.",
  "summary": "Building software by describing what you want to an AI and accepting the code without reading it. Collins Word of the Year 2025.",
  "updated": "2026-10-18",
  "term": "Vibe coding",
  "aliases": ["vibe-coding", "vibecoding"],
  "punchline": "Programming without reading the code.",
  "kind": "ai",
  "first_seen": "2025",
  "coined_by": "Andrej Karpathy",
  "sensitivity": "",
  "related": [
    "/glossary/promptatory/",
    "/glossary/vibe-revenue/",
    "/glossary/meat-proxy/",
    "/glossary/workslop/",
    "/for/developers/"
  ],
  "sources": [
    {
      "title": "There's a new kind of coding I call \"vibe coding\"",
      "publisher": "Andrej Karpathy on X",
      "url": "https://x.com/karpathy/status/1886192184808149383",
      "date": "2025-02-02"
    },
    {
      "title": "Not all AI-assisted programming is vibe coding (but vibe coding rocks)",
      "publisher": "Simon Willison's Weblog",
      "url": "https://simonwillison.net/2025/Mar/19/vibe-coding/",
      "date": "2025-03-19"
    },
    {
      "title": "'Vibe coding' named Collins Dictionary's Word of the Year",
      "publisher": "CNN (via KVIA)",
      "url": "https://kvia.com/news/business-technology/cnn-business-consumer/2025/11/06/vibe-coding-named-collins-dictionarys-word-of-the-year/",
      "date": "2025-11-06"
    }
  ]
}
---
## What it means

Vibe coding is building software by telling an AI model what you want in plain language and accepting what it writes without reading the code. If something breaks, you paste the error back in and ask for a fix. You judge the result by whether it seems to work.

That's the original, narrow meaning. In everyday use the phrase has stretched to cover almost any programming done with AI help, including careful work where a developer reviews every change. Those two things carry very different risks, so it's worth knowing which one someone means.

## Where it came from

The term was coined by Andrej Karpathy, an AI researcher who was a founding member of OpenAI and later led AI at Tesla, in a post on X on 2 February 2025. He described a new kind of coding where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists", and said it worked well enough for throwaway weekend projects.

The phrase spread fast. On 19 March 2025 the developer Simon Willison argued that it was being applied to all AI-assisted programming, which he said blurred an important line. His definition: building software with an AI model without reviewing the code it writes. If you've reviewed, tested and understood the code, he wrote, that's software development with AI help.

On 6 November 2025 Collins Dictionary named "vibe coding" its Word of the Year, defining it as "the use of artificial intelligence prompted by natural language to assist with the writing of computer code". Collins's lexicographers said usage had risen sharply since its first appearance in February. Note that Collins chose the broad sense.

## Examples

Both are invented.

:::example
**Vibe coding, original sense.** A teacher builds a quiz app for her class over a weekend by describing it to an AI tool. She never opens the source files. It works for her 28 students, and if it breaks she'll ask for a new one.
:::
:::example
**AI-assisted development, often also called vibe coding.** A developer asks an AI tool to draft a payment retry function, reads it line by line, rewrites the error handling, adds tests and gets it reviewed by a colleague before merging.
:::

The first is a reasonable trade for a disposable tool. The second is ordinary engineering with a faster first draft.

## The criticism

Most of the criticism is aimed at the original sense being used where it doesn't belong. Code nobody has read can hide security holes, leak data or fail in ways that only show up under real use, and someone has to maintain it later. Karpathy himself framed it as suited to throwaway projects.

The other complaint is about the stretched meaning. Calling all AI-assisted programming vibe coding makes careful work sound careless, and makes careless work sound normal. When the debate gets heated, it often helps to ask: did anyone read the code?

The loop of asking the tool to fix its own fixes has its own informal name, [promptatory](/glossary/promptatory/).

## How Slop Mop sees it

Vibe coding is about code, which is outside what Slop Mop judges. Posts about vibe coding on LinkedIn, where Slop Mop is live, are scored like any other post: on whether the writing is specific and useful.
