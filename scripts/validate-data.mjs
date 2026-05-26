import { readFileSync } from "node:fs";

const validCategoryIds = new Set([
  "operations",
  "things",
  "people",
  "qualities",
  "time-place",
  "function-words",
]);

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const sourceWords = readFileSync("basic-english-850.txt", "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const basicWords = readJson("src/data/basic-850.json");
const categories = readJson("src/data/categories.json");

assert(sourceWords.length === 850, `Expected source to contain 850 words, found ${sourceWords.length}.`);
assert(basicWords.length === 850, `Expected basic-850.json to contain 850 words, found ${basicWords.length}.`);

const sourceSet = new Set(sourceWords);
const outputSet = new Set(basicWords.map((entry) => entry.word));

assert(sourceSet.size === 850, "Expected source words to be unique.");
assert(outputSet.size === 850, "Expected basic-850.json words to be unique.");

for (const word of sourceWords) {
  assert(outputSet.has(word), `Missing word in basic-850.json: ${word}`);
}

for (const entry of basicWords) {
  assert(typeof entry.word === "string" && entry.word.length > 0, "Every entry needs a word.");
  assert(validCategoryIds.has(entry.category), `Invalid category for ${entry.word}: ${entry.category}`);
  assert(typeof entry.zh === "string", `Expected zh to be a string for ${entry.word}.`);
  assert(typeof entry.simpleMeaning === "string", `Expected simpleMeaning to be a string for ${entry.word}.`);
  assert(Array.isArray(entry.examples), `Expected examples to be an array for ${entry.word}.`);
  assert(Array.isArray(entry.patterns), `Expected patterns to be an array for ${entry.word}.`);
  assert(Array.isArray(entry.tags), `Expected tags to be an array for ${entry.word}.`);
}

assert(categories.length === validCategoryIds.size, "Expected one category entry for each category id.");

for (const category of categories) {
  assert(validCategoryIds.has(category.id), `Invalid category id: ${category.id}`);
  assert(typeof category.name === "string" && category.name.length > 0, `Missing name for ${category.id}.`);
  assert(typeof category.zh === "string", `Missing zh for ${category.id}.`);
  assert(
    typeof category.description === "string" && category.description.length > 0,
    `Missing description for ${category.id}.`,
  );
}

console.log("Data validation passed: 850 source words match src/data/basic-850.json.");
