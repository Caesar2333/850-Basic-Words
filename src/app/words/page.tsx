"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import basicWords from "@/data/basic-850.json";
import categories from "@/data/categories.json";
import { WordCard } from "@/components/words/WordCard";
import type { BasicWord, WordCategory, WordCategoryId } from "@/types/content";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE = 24;
const words = basicWords as BasicWord[];
const wordCategories = categories as WordCategory[];
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type CategoryFilter = "all" | WordCategoryId;
type LetterFilter = "all" | string;
type SortMode = "az" | "za" | "category";

function getCategoryCount(categoryId: CategoryFilter) {
  if (categoryId === "all") return words.length;
  return words.filter((word) => word.category === categoryId).length;
}

function getCategory(categoryId: WordCategoryId) {
  return wordCategories.find((c) => c.id === categoryId) ?? wordCategories[0];
}

function getSearchText(word: BasicWord) {
  return [word.word, word.zh, word.simpleMeaning, word.patterns.join(" "), word.tags.join(" ")].join(" ").toLowerCase();
}

function sortWords(items: BasicWord[], sortMode: SortMode) {
  return [...items].sort((a, b) => {
    if (sortMode === "za") return b.word.localeCompare(a.word);
    if (sortMode === "category") return a.category.localeCompare(b.category) || a.word.localeCompare(b.word);
    return a.word.localeCompare(b.word);
  });
}

export default function WordsPage() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [letterFilter, setLetterFilter] = useState<LetterFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("az");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  function resetVisibleCount() { setVisibleCount(PAGE_SIZE); }
  function updateQuery(value: string) { setQuery(value); resetVisibleCount(); }
  function updateCategory(value: CategoryFilter) { setCategoryFilter(value); resetVisibleCount(); }
  function updateLetter(value: LetterFilter) { setLetterFilter(value); resetVisibleCount(); }
  function updateSort(value: SortMode) { setSortMode(value); resetVisibleCount(); }
  function clearFilters() { setQuery(""); setCategoryFilter("all"); setLetterFilter("all"); setSortMode("az"); resetVisibleCount(); }

  const filteredWords = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortWords(
      words.filter((word) => {
        const mq = q ? getSearchText(word).includes(q) : true;
        const mc = categoryFilter === "all" || word.category === categoryFilter;
        const ml = letterFilter === "all" || word.word.toUpperCase().startsWith(letterFilter);
        return mq && mc && ml;
      }),
      sortMode,
    );
  }, [categoryFilter, letterFilter, query, sortMode]);

  const visibleWords = filteredWords.slice(0, visibleCount);
  const shownCount = visibleWords.length;
  const hasMore = visibleCount < filteredWords.length;
  const filtersActive = query || categoryFilter !== "all" || letterFilter !== "all" || sortMode !== "az";

  const sectionStagger = {
    initial: {},
    animate: { transition: { staggerChildren: 0.08 } },
  };
  const sectionFadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.2, 0, 0, 1] as const } },
  };
  const cardGridStagger = {
    initial: {},
    animate: { transition: { staggerChildren: 0.03 } },
  };
  const cardFadeUp = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.2, 0, 0, 1] as const } },
  };

  return (
    <main className="bg-canvas-ice">
      <motion.div
        variants={sectionStagger}
        initial="initial"
        animate="animate"
      >
      {/* HERO */}
      <motion.section variants={sectionFadeUp} className="px-6 py-12 sm:px-10 lg:py-16">
        <div className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[1fr_480px] lg:items-end">
          <div>
            <p className="font-fragmentmono text-xs font-bold uppercase tracking-normal text-valley-green">
              850 Words
            </p>
            <h1 className="mt-5 text-balance text-[53px] font-bold leading-[1.05] text-adaline-ink max-sm:text-5xl">
              850 Basic Words
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-[1.43] text-adaline-ink/75">
              The core words for building simple English expression.
            </p>
          </div>

          <div className="flex rounded-lg border border-stone-moss bg-forest-dew/25">
            {[
              ["Total Words", words.length],
              ["Categories", wordCategories.length],
              ["Showing", `${shownCount} / ${filteredWords.length}`],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={["flex-1 p-5", index > 0 ? "border-l border-stone-moss" : "", index === 2 ? "min-w-fit" : ""].join(" ")}
              >
                <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">{label}</p>
                <p className="mt-1 text-nowrap text-[30px] font-bold leading-none text-adaline-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FILTER BAR */}
      <motion.section variants={sectionFadeUp} className="border-y border-stone-moss bg-canvas-ice px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-4">
          {/* Row 1: Search + Sort */}
          <div className="flex items-center gap-4">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-lg border border-stone-moss bg-canvas-ice px-5 focus-within:border-valley-green">
              <span className="text-xs font-bold uppercase text-valley-green">Search</span>
              <input
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
                aria-label="Search words"
                placeholder="Search words, Chinese meaning, or phrases..."
                className="min-h-10 flex-1 bg-transparent text-sm text-adaline-ink outline-none placeholder:text-adaline-ink/45"
              />
            </label>

            <div className="flex items-center gap-3">
              <span className="text-sm text-adaline-ink/75">Sort by</span>
              <Select value={sortMode} onValueChange={(value) => updateSort(value as SortMode)}>
                <SelectTrigger className="data-[size=default]:h-12 w-[120px] rounded-lg border-stone-moss bg-canvas-ice px-4 text-sm font-bold text-adaline-ink aria-expanded:rounded-b-none aria-expanded:border-b-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="min-w-[120px] border-stone-moss bg-canvas-ice p-1 ring-0 shadow-[0_4px_12px_rgba(10,29,8,0.1)]">
                  <SelectItem value="az" className="rounded-md px-3 py-2 text-sm text-adaline-ink focus:bg-forest-dew focus:text-adaline-ink">A → Z</SelectItem>
                  <SelectItem value="za" className="rounded-md px-3 py-2 text-sm text-adaline-ink focus:bg-forest-dew focus:text-adaline-ink">Z → A</SelectItem>
                  <SelectItem value="category" className="rounded-md px-3 py-2 text-sm text-adaline-ink focus:bg-forest-dew focus:text-adaline-ink">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => updateCategory("all")}
              className={[
                "inline-flex min-w-max items-center gap-2 rounded-[20px] border px-5 py-2 text-sm transition-colors active:scale-[0.96]",
                categoryFilter === "all"
                  ? "border-valley-green bg-valley-green text-canvas-ice"
                  : "border-stone-moss bg-canvas-ice text-adaline-ink hover:border-valley-green",
              ].join(" ")}
            >
              <span>All</span>
              <span className="font-fragmentmono text-xs">{words.length}</span>
            </button>

            {wordCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => updateCategory(cat.id)}
                className={[
                  "inline-flex min-w-max items-center gap-2 rounded-[20px] border px-5 py-2 text-sm transition-colors active:scale-[0.96]",
                  categoryFilter === cat.id
                    ? "border-valley-green bg-valley-green text-canvas-ice"
                    : "border-stone-moss bg-canvas-ice text-adaline-ink hover:border-valley-green",
                ].join(" ")}
              >
                <span>{cat.name}</span>
                <span className="font-fragmentmono text-xs">{getCategoryCount(cat.id)}</span>
              </button>
            ))}
          </div>

          {/* Row 3: Letter strip */}
          <div className="flex gap-2 overflow-x-auto rounded-lg border border-stone-moss bg-canvas-ice p-2">
            <button
              type="button"
              onClick={() => updateLetter("all")}
              className={[
                "inline-flex min-h-10 min-w-10 items-center justify-center rounded-[10px] px-3 text-sm transition-colors active:scale-[0.96]",
                letterFilter === "all"
                  ? "bg-forest-dew text-valley-green"
                  : "text-adaline-ink hover:bg-forest-dew/45",
              ].join(" ")}
            >
              All
            </button>
            {letters.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => updateLetter(letter)}
                className={[
                  "inline-flex min-h-10 min-w-10 items-center justify-center rounded-[10px] px-3 text-sm transition-colors active:scale-[0.96]",
                  letterFilter === letter
                    ? "bg-forest-dew text-valley-green"
                    : "text-adaline-ink hover:bg-forest-dew/45",
                ].join(" ")}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CARDS */}
      <motion.section variants={sectionFadeUp} className="px-6 pt-10 pb-16 sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-adaline-ink/75">
              Showing <span className="tabular-nums">{shownCount} of {filteredWords.length}</span> words
            </p>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!filtersActive}
              className="text-sm font-bold text-valley-green underline-offset-4 hover:underline disabled:text-adaline-ink/35 transition-[colors,transform] active:scale-[0.96]"
            >
              Clear filters
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${categoryFilter}|${letterFilter}|${query}|${sortMode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              {visibleWords.length > 0 ? (
                <motion.div
                  variants={cardGridStagger}
                  initial="initial"
                  animate="animate"
                >
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {visibleWords.map((word) => (
                        <motion.div key={word.word} variants={cardFadeUp}>
                          <WordCard
                            word={word}
                            category={getCategory(word.category)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={cardGridStagger}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div variants={cardFadeUp} className="rounded-lg border border-stone-moss bg-forest-dew/25 p-8">
                    <h2 className="text-2xl font-bold text-adaline-ink">No words found</h2>
                    <p className="mt-3 text-pretty text-sm leading-6 text-adaline-ink/70">
                      Try a different search term, category, or first letter.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {hasMore ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-[20px] bg-amber-seed px-12 py-4 text-base font-bold text-canvas-ice transition-[opacity,transform] hover:opacity-90 active:scale-[0.96]"
              >
                Load more
              </button>
              <p className="text-sm text-adaline-ink/65">
                Loading fewer cards at a time keeps the page responsive.
              </p>
            </div>
          ) : null}
        </div>
      </motion.section>
      </motion.div>
    </main>
  );
}
