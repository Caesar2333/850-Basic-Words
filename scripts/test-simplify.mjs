import { retext } from "retext";
import retextEnglish from "retext-english";
import retextSimplify from "retext-simplify";
import retextStringify from "retext-stringify";
import fs from "fs";

// Read our generated patterns file
const patternsCode = fs.readFileSync("src/lib/simplify/patterns.ts", "utf-8");
const match = patternsCode.match(/export const patterns: Record<string, PatternEntry> = (\{[\s\S]*\});/);
const patterns = eval(`(${match[1]})`);

function tryStem(word) {
  const lower = word.toLowerCase();
  const candidates = [];
  const rules = [
    [/ingly$/g, s => s.slice(0, -5)], [/edly$/g, s => s.slice(0, -4)],
    [/ation$/g, s => s.slice(0, -5)], [/ition$/g, s => s.slice(0, -5)],
    [/ction$/g, s => s.slice(0, -5)], [/tion$/g, s => s.slice(0, -4)],
    [/sion$/g, s => s.slice(0, -4)], [/ment$/g, s => s.slice(0, -4)],
    [/ness$/g, s => s.slice(0, -4)], [/fully$/g, s => s.slice(0, -5)],
    [/ously$/g, s => s.slice(0, -5) + "ous"],
    [/tively$/g, s => s.slice(0, -7) + "tive"],
    [/tional$/g, s => s.slice(0, -6) + "tion"],
    [/ably$/g, s => s.slice(0, -4) + "able"],
    [/less$/g, s => s.slice(0, -4)], [/able$/g, s => s.slice(0, -4)],
    [/ing$/g, s => s.slice(0, -3)], [/al$/g, s => s.slice(0, -3)],
    [/ed$/g, s => s.slice(0, -2)], [/er$/g, s => s.slice(0, -2)],
    [/es$/g, s => s.slice(0, -2)], [/ly$/g, s => s.slice(0, -2)],
    [/s$/g, s => s.slice(0, -1)],
  ];
  for (const [regex, transform] of rules) {
    if (regex.test(lower) && lower.length >= 5) {
      const stemmed = transform(lower);
      if (stemmed !== lower && stemmed.length >= 2) candidates.push(stemmed);
    }
  }
  return candidates;
}

// Build lookup
const lookup = new Map();
for (const [phrase, entry] of Object.entries(patterns)) {
  if (entry.replace?.length > 0) {
    lookup.set(phrase.toLowerCase(), entry.replace[0]);
  }
}

const texts = [
  "The system encountered an unexpected error during initialization.",
  "Please confirm whether you require additional assistance.",
  "We need to investigate the cause of the issue.",
  "The government must allocate sufficient resources to facilitate the implementation of educational reforms.",
  "I will utilize the available resources to maximize productivity.",
  "I am attempting to complete the assignment.",
  "The company is utilizing various methodologies to achieve its objectives.",
];

for (const text of texts) {
  console.log("\n=== Input:", text);

  // Messages from retext-simplify
  const file = await retext()
    .use(retextEnglish)
    .use(retextSimplify)
    .use(retextStringify)
    .process(text);

  for (const msg of file.messages) {
    console.log(`  MSG: "${msg.actual}" → "${msg.expected[0]}"`);
    lookup.set(msg.actual.toLowerCase(), msg.expected[0]);
  }

  let result = text;
  const applied = new Set();

  // Multi-word replacements first
  const multi = [...lookup.entries()].filter(([k]) => k.includes(" ")).sort(([a],[b]) => b.length - a.length);
  for (const [phrase, replacement] of multi) {
    const re = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "gi");
    if (re.test(result)) {
      result = result.replace(re, replacement);
      applied.add(phrase);
      console.log(`  MW: "${phrase}" → "${replacement}"`);
    }
  }

  // Single-word replacements
  for (const [phrase, replacement] of lookup.entries()) {
    if (phrase.includes(" ") || applied.has(phrase)) continue;
    const re = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "gi");
    if (re.test(result)) {
      result = result.replace(re, match => {
        if (match === match.toUpperCase()) return replacement.toUpperCase();
        if (match[0] === match[0].toUpperCase())
          return replacement[0].toUpperCase() + replacement.slice(1);
        return replacement;
      });
      applied.add(phrase);
    }
  }

  // Stem fallback
  const wr = /[a-zA-Z]+/g;
  let m;
  while ((m = wr.exec(result)) !== null) {
    const word = m[0], lower = word.toLowerCase();
    if (applied.has(lower)) continue;
    for (const stemmed of tryStem(word)) {
      if (lookup.has(stemmed)) {
        const replacement = lookup.get(stemmed);
        result = result.replace(new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "g"), () => replacement);
        applied.add(lower);
        console.log(`  STEM: "${word}" → "${replacement}" (stem: ${stemmed})`);
        break;
      }
    }
  }

  console.log("  =>", result);
}
