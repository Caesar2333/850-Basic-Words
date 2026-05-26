export type WordCategoryId =
  | "operations"
  | "things"
  | "people"
  | "qualities"
  | "time-place"
  | "function-words";

export type BasicWord = {
  word: string;
  category: WordCategoryId;
  zh: string;
  simpleMeaning: string;
  examples: string[];
  exampleTranslation?: string;
  patterns: string[];
  patternZh?: string[];
  tags: string[];
};

export type WordCategory = {
  id: WordCategoryId;
  name: string;
  zh: string;
  description: string;
};

export type DailyPractice = {
  type: "choice" | "fill-blank" | "rewrite";
  question: string;
  answer: string;
};

export type DailyLesson = {
  day: number;
  title: string;
  words: string[];
  practice: DailyPractice[];
};

export type PowerPattern = {
  phrase: string;
  zh: string;
  literalBreakdown: string;
  usageScenarios: string[];
  examples: string[];
  collocation: string;
  antonym: string;
};

export type AdvancedReplacement = {
  advanced: string;
  simple: string;
};

export type PatternEntry = {
  word: string;
  coreMeaning: string;
  zh: string;
  examples: string[];
  patterns: PowerPattern[];
  advancedReplacements: AdvancedReplacement[];
};

export type RewriteExample = {
  original: string;
  simple: string;
  why: string;
  keyWords: string[];
};
