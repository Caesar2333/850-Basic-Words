import { retext } from "retext";
import retextEnglish from "retext-english";
import retextSimplify from "retext-simplify";
import retextStringify from "retext-stringify";
import { patterns } from "./patterns";
import type { PatternEntry } from "./patterns";

type Change = {
  from: string;
  to: string;
};

type SimplifyResult = {
  original: string;
  simplified: string;
  changes: Change[];
};

// Build pattern lookup once
const patternLookup = new Map<string, string>();
for (const [phrase, entry] of Object.entries(patterns)) {
  const e = entry as PatternEntry;
  if (e.replace && e.replace.length > 0) {
    patternLookup.set(phrase.toLowerCase(), e.replace[0]);
  }
}

// 850 basic words — used to pick the simplest among multiple suggestions
const BASIC_850 = new Set([
  "the", "a", "be", "do", "have", "i", "it", "you", "we", "he", "she", "they",
  "this", "that", "these", "those", "is", "are", "was", "were", "been", "being",
  "am", "in", "on", "at", "to", "for", "with", "by", "from", "of", "about",
  "as", "but", "or", "if", "so", "because", "when", "where", "why", "how",
  "what", "which", "who", "whom", "whose", "not", "no", "yes", "all", "some",
  "any", "many", "much", "few", "little", "each", "every", "both", "most",
  "other", "another", "such", "more", "less", "very", "too", "enough", "also",
  "only", "just", "now", "then", "here", "there", "up", "down", "in", "out",
  "on", "off", "over", "under", "again", "ever", "never", "always", "often",
  "still", "well", "bad", "good", "new", "old", "first", "last", "long",
  "short", "small", "big", "high", "low", "same", "different", "own", "free",
  "right", "true", "sure", "real", "full", "clear", "deep", "hard", "easy",
  "near", "far", "able", "get", "give", "take", "put", "make", "go", "come",
  "see", "know", "think", "want", "find", "use", "tell", "ask", "try", "leave",
  "call", "keep", "let", "begin", "show", "hear", "play", "run", "move", "live",
  "believe", "bring", "happen", "write", "sit", "stand", "lose", "pay", "meet",
  "include", "continue", "set", "learn", "change", "lead", "understand",
  "watch", "follow", "start", "help", "need", "mean", "work", "turn", "open",
  "close", "seem", "talk", "walk", "look", "feel", "hold", "bring", "carry",
  "buy", "sell", "send", "expect", "build", "stay", "fall", "cut", "reach",
  "serve", "wait", "die", "send", "raise", "pass", "pick", "stop", "create",
  "choose", "grow", "share", "speak", "spend", "remember", "love", "hate",
  "like", "wish", "hope", "play", "read", "say", "thing", "person", "time",
  "way", "day", "man", "woman", "child", "world", "hand", "eye", "face",
  "head", "life", "place", "part", "year", "number", "people", "word",
  "water", "house", "side", "country", "group", "family", "city", "air",
  "land", "food", "money", "power", "idea", "order", "book", "name", "end",
  "kind", "line", "force", "light", "story", "state", "boy", "girl",
  "money", "help", "turn", "back", "cause", "point", "fact", "need", "hand",
  "plan", "reason", "result", "change", "question", "course", "effect",
  "problem", "start", "hand", "part", "place", "case", "week", "month",
  "night", "room", "area", "road", "street", "table", "door", "window",
  "bed", "wall", "chair", "fire", "sea", "sun", "moon", "star", "tree",
  "flower", "grass", "animal", "bird", "fish", "horse", "dog", "cat",
  "color", "red", "blue", "green", "white", "black", "yellow", "brown",
  "warm", "cold", "hot", "cool", "clean", "dry", "wet", "soft", "hard",
  "sweet", "sour", "bitter", "salt", "great", "large", "wide", "heavy",
  "simple", "happy", "sad", "glad", "sorry", "angry", "strange", "late",
  "early", "fast", "slow", "dark", "bright", "dear", "poor", "rich",
  "young", "old", "dear", "kind", "good", "bad", "beautiful", "ugly",
  "right", "wrong", "wise", "foolish", "careful", "certain", "common",
  "special", "strong", "weak", "ready", "quiet", "loud", "deep", "wide",
  "thin", "fat", "round", "flat", "sharp", "full", "empty",
  "able", "get", "give", "take", "put", "make", "go", "come",
  "system", "machine", "letter", "note", "law", "rule", "map", "list",
  "card", "letter", "note", "paper", "pen", "pencil",
  "hope", "fear", "joy", "love", "hate", "care", "pain", "pleasure",
  "rest", "work", "play", "sleep", "walk", "talk", "food", "meal",
  "bread", "butter", "milk", "egg", "meat", "fruit", "soup", "cake",
  "salt", "sugar", "oil", "water", "tea", "coffee", "cup", "plate",
  "bottle", "bag", "box", "pot", "pan",
  "army", "ship", "train", "plane", "car", "boat", "wheel", "engine",
  "bell", "clock", "key", "lamp", "book", "picture", "music", "song",
  "door", "window", "wall", "roof", "room", "step", "floor", "board",
  "school", "office", "store", "hospital", "church", "market", "garden",
  "river", "sea", "rain", "snow", "wind", "cloud", "sky", "earth",
  "gold", "silver", "iron", "glass", "wood", "stone", "sand", "dust",
  "color", "form", "move", "value", "note", "sign", "sort", "order",
  "circle", "square", "birth", "death", "health", "knowledge", "art",
  "science", "history", "language", "music", "law", "reason", "sense",
  "truth", "example", "news", "record", "level",
]);

function pickBestReplacement(suggestions: readonly string[]): string {
  if (suggestions.length === 1) return suggestions[0];
  // Prefer the suggestion in the 850 word list
  for (const s of suggestions) {
    const words = s.toLowerCase().split(/\s+/);
    if (words.every((w) => BASIC_850.has(w))) return s;
  }
  return suggestions[0];
}

function tryStem(word: string): string[] {
  const lower = word.toLowerCase();
  const candidates: string[] = [];

  const rules: [RegExp, (s: string) => string][] = [
    [/ingly$/g, (s) => s.slice(0, -5)],
    [/edly$/g, (s) => s.slice(0, -4) + "e"],
    [/ation$/g, (s) => s.slice(0, -5)],
    [/ition$/g, (s) => s.slice(0, -5)],
    [/ction$/g, (s) => s.slice(0, -5)],
    [/tion$/g, (s) => s.slice(0, -4)],
    [/sion$/g, (s) => s.slice(0, -4)],
    [/ment$/g, (s) => s.slice(0, -4)],
    [/ness$/g, (s) => s.slice(0, -4)],
    [/fully$/g, (s) => s.slice(0, -5)],
    [/ously$/g, (s) => s.slice(0, -5) + "ous"],
    [/tively$/g, (s) => s.slice(0, -7) + "tive"],
    [/tional$/g, (s) => s.slice(0, -6) + "tion"],
    [/ably$/g, (s) => s.slice(0, -4) + "able"],
    [/less$/g, (s) => s.slice(0, -4)],
    [/able$/g, (s) => s.slice(0, -4)],
    [/ing$/g, (s) => s.slice(0, -3)],
    [/al$/g, (s) => s.slice(0, -3)],
    [/ed$/g, (s) => s.slice(0, -2)],
    [/er$/g, (s) => s.slice(0, -2)],
    [/es$/g, (s) => s.slice(0, -2)],
    [/ly$/g, (s) => s.slice(0, -2)],
    [/s$/g, (s) => s.slice(0, -1)],
  ];

  for (const [regex, transform] of rules) {
    if (regex.test(lower) && lower.length >= 5) {
      const stemmed = transform(lower);
      if (stemmed !== lower && stemmed.length >= 2) {
        candidates.push(stemmed);
      }
    }
  }

  return candidates;
}

export async function simplify(text: string): Promise<SimplifyResult> {
  const changes: Change[] = [];

  // Step 1: parse and detect complex words
  const file = await retext()
    .use(retextEnglish)
    .use(retextSimplify)
    .use(retextStringify)
    .process(text);

  // Build lookup from messages + patterns
  const lookup = new Map<string, string>(patternLookup);
  const msgPhrases = new Set<string>();

  for (const msg of file.messages) {
    const m = msg as any;
    if (m.actual && m.expected?.length > 0) {
      lookup.set(m.actual.toLowerCase(), pickBestReplacement(m.expected));
      msgPhrases.add(m.actual.toLowerCase());
    }
  }

  let result = text;
  const applied = new Set<string>();

  // Step 2: replace multi-word phrases first (descending by length)
  const multiEntries = [...lookup.entries()]
    .filter(([key]) => key.includes(" "))
    .sort(([a], [b]) => b.split(/\s+/).length - a.split(/\s+/).length);

  for (const [phrase, replacement] of multiEntries) {
    if (applied.has(phrase)) continue;
    const regex = new RegExp(`\\b${escapeRegex(phrase)}\\b`, "gi");
    if (regex.test(result)) {
      result = result.replace(regex, replacement as string);
      applied.add(phrase);
      changes.push({ from: phrase, to: replacement as string });
    }
  }

  // Step 3: replace single words
  for (const [phrase, replacement] of lookup.entries()) {
    if (phrase.includes(" ") || applied.has(phrase)) continue;
    const regex = new RegExp(`\\b${escapeRegex(phrase)}\\b`, "gi");
    if (regex.test(result)) {
      result = result.replace(regex, (match) => {
        if (match === match.toUpperCase()) return (replacement as string).toUpperCase();
        if (match[0] === match[0].toUpperCase())
          return (replacement as string).charAt(0).toUpperCase() + (replacement as string).slice(1);
        return replacement as string;
      });
      applied.add(phrase);
      changes.push({ from: phrase, to: replacement as string });
    }
  }

  // Step 4: stem fallback with tense preservation
  const wordRegex = /[a-zA-Z]+/g;
  let m;
  while ((m = wordRegex.exec(result)) !== null) {
    const word = m[0];
    const lower = word.toLowerCase();
    if (applied.has(lower)) continue;

    const stems = tryStem(word);
    for (const stemmed of stems) {
      if (lookup.has(stemmed)) {
        const replacement = lookup.get(stemmed) as string;
        let finalReplacement: string;

        if (word.endsWith("ing")) {
          // Preserve present participle: add "ing" to replacement
          const repLower = replacement.toLowerCase();
          if (repLower.endsWith("e")) finalReplacement = repLower.slice(0, -1) + "ing";
          else finalReplacement = repLower + "ing";
        } else if (word.endsWith("ed")) {
          // Preserve past tense: add "ed" or use "d"
          const repLower = replacement.toLowerCase();
          if (repLower.endsWith("e")) finalReplacement = repLower + "d";
          else finalReplacement = repLower + "ed";
        } else if (word.endsWith("es") || word.endsWith("s")) {
          // Preserve third person
          if (replacement.toLowerCase() === word.slice(0, -1).toLowerCase()) {
            finalReplacement = replacement; // already matches
          } else if (!word.endsWith("ss") && !word.endsWith("sh") && !word.endsWith("ch")) {
            finalReplacement = replacement;
          } else {
            finalReplacement = replacement;
          }
        } else {
          finalReplacement = replacement;
        }

        // Preserve case
        if (word === word.toUpperCase()) finalReplacement = finalReplacement.toUpperCase();
        else if (word[0] === word[0].toUpperCase())
          finalReplacement = finalReplacement.charAt(0).toUpperCase() + finalReplacement.slice(1);

        const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, "g");
        result = result.replace(regex, () => finalReplacement);
        applied.add(lower);
        changes.push({ from: word, to: finalReplacement });
        break;
      }
    }
  }

  // Step 5: split long sentences
  const afterSplit = splitLongSentences(result);
  if (afterSplit !== result) {
    changes.push({ from: "long sentence", to: "short sentences" });
    result = afterSplit;
  }

  return { original: text, simplified: result, changes };
}

function splitLongSentences(text: string): string {
  let result = text;

  const conjunctions = [
    { word: "because", prefix: "This is because " },
    { word: "although", prefix: "Although " },
    { word: "unless", prefix: "Unless " },
    { word: "whereas", prefix: "Whereas " },
  ];

  for (const { word, prefix } of conjunctions) {
    const regex = new RegExp(`[,;]\\s*${word}\\s+(.+?)([.!?]|$)`, "mi");
    const match = result.match(regex);
    if (match) {
      const before = result.slice(0, match.index).trim().replace(/[,;]\s*$/, "");
      const clause = match[1].trim();
      if (before.split(/\s+/).length >= 3 && clause.split(/\s+/).length >= 2) {
        result = `${before}. ${prefix}${clause}${match[2]}`;
        break;
      }
    }
  }

  const wm = result.match(/[,;]\s*(which|that)\s+(.+?)([.!?]|$)/mi);
  if (wm) {
    const before = (wm.input || result).slice(0, wm.index).trim().replace(/[,;]\s*$/, "");
    const clause = wm[2].trim();
    if (before.split(/\s+/).length >= 4 && clause.split(/\s+/).length >= 2) {
      result = `${before}. It ${wm[1]} ${clause}${wm[3]}`;
    }
  }

  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
