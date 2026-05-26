import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const patternsPath = path.resolve(__dirname, "../node_modules/retext-simplify/lib/patterns.js");
const outputPath = path.resolve(__dirname, "../src/lib/simplify/patterns.ts");

const code = fs.readFileSync(patternsPath, "utf-8");

// Extract the patterns object: `export const patterns = { ... };`
const startIdx = code.indexOf("= {");
if (startIdx === -1) { console.error("Could not find patterns object"); process.exit(1); }

let objStr = code.slice(startIdx + 2); // starts with `{`
let depth = 0;
let endIdx = 0;
for (let i = 0; i < objStr.length; i++) {
  if (objStr[i] === "{") depth++;
  if (objStr[i] === "}") depth--;
  if (depth === 0) { endIdx = i + 1; break; }
}

const objCode = objStr.slice(0, endIdx);

// Convert to TypeScript: the object literal is valid TS as-is
const ts = `// Auto-generated from retext-simplify/lib/patterns.js
// Do not edit directly. Run \`npm run build:patterns\` to regenerate.

export type PatternEntry = {
  replace: readonly string[];
  omit?: true;
};

export const patterns: Record<string, PatternEntry> = ${objCode};
`;

fs.writeFileSync(outputPath, ts, "utf-8");
const count = objCode.match(/replace:/g)?.length || 0;
console.log(`Generated ${outputPath} with ${count} pattern entries`);
