"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useCallback } from "react";
import { Shuffle } from "lucide-react";
import basicWords from "@/data/basic-850.json";
import type { BasicWord } from "@/types/content";

const words = basicWords as BasicWord[];

type LessonWord = {
  word: string;
  zh: string;
  example: string;
  translation: string;
  pattern: string;
  patternZh: string;
};

function pickRandomWords(): LessonWord[] {
  const pool = [...words];
  const picked: LessonWord[] = [];

  for (let i = 0; i < 10; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const w = pool.splice(idx, 1)[0];

    picked.push({
      word: w.word,
      zh: w.zh,
      example: w.examples[0] ?? "",
      translation: w.exampleTranslation ?? "",
      pattern: w.patterns[0] ?? "basic",
      patternZh: w.patternZh?.[0] ?? "",
    });
  }

  return picked;
}

export default function DailyPage() {
  const [currentWords, setCurrentWords] = useState<LessonWord[]>(pickRandomWords);
  const [flippedWords, setFlippedWords] = useState<Set<string>>(new Set());

  const shuffle = useCallback(() => {
    setCurrentWords(pickRandomWords());
    setFlippedWords(new Set());
  }, []);

  function toggleWord(word: string) {
    setFlippedWords((current) => {
      const next = new Set(current);
      if (next.has(word)) {
        next.delete(word);
      } else {
        next.add(word);
      }
      return next;
    });
  }

  const knownCount = useMemo(
    () => currentWords.filter((w) => flippedWords.has(w.word)).length,
    [currentWords, flippedWords],
  );

  return (
    <main className="bg-canvas-ice relative">
      {/* Dust motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-1 rounded-full bg-forest-dew/20"
            style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0, 0.4, 0] }}
            transition={{ duration: 5+Math.random()*6, repeat: Infinity, delay: Math.random()*4, ease: "easeInOut" }}
          />
        ))}
      </div>
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="max-w-4xl">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Daily 10 / Random
            </p>
            <h1 className="mt-5 text-balance text-[53px] font-bold leading-[1.05] text-adaline-ink max-sm:text-5xl">
              Daily 10 Words
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-[1.43] text-adaline-ink/75">
              Random words from the 850 set. Tap to review, shuffle for a fresh batch.
            </p>
          </div>

          <aside className="rounded-lg border border-stone-moss bg-forest-dew/35 p-6">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Progress
            </p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-stone-moss">
              <motion.div
                className="h-full rounded-full bg-valley-green"
                animate={{ width: `${(knownCount / 10) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            <p className="mt-1 font-fragmentmono text-xs text-valley-green/50">
              {knownCount} / 10
            </p>
            <p className="mt-3 text-sm leading-[1.43] text-adaline-ink/75">
              Words you&apos;ve tapped to review.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-stone-moss px-6 py-8 sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-[28px] font-bold leading-tight text-adaline-ink">
                Today&apos;s words
              </h2>
              <p className="mt-3 text-sm leading-[1.43] text-adaline-ink/75">
                Tap a card to reveal meaning, example, and translation. Tap again to flip back.
              </p>
            </div>
            <button
              type="button"
              onClick={shuffle}
              aria-label="Shuffle words"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-moss bg-canvas-ice text-adaline-ink/60 transition-colors hover:border-valley-green hover:text-valley-green active:scale-[0.94]"
            >
              <Shuffle size={18} />
            </button>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            >
            {currentWords.map((entry) => {
              const flipped = flippedWords.has(entry.word);

              return (
                <motion.button
                  key={entry.word}
                  type="button"
                  aria-label={`${entry.word} word card`}
                  aria-pressed={flipped}
                  data-daily-card="true"
                  data-flipped={flipped ? "true" : "false"}
                  onClick={() => toggleWord(entry.word)}
                  className="group relative h-[240px] w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-valley-green focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-ice"
                  whileHover={{ rotate: [0, -0.8, 0.8, 0], transition: { duration: 0.35 } }}
                  whileTap={{ scale: 0.98 }}
                  style={{ perspective: 800 }}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: {
                      opacity: 1, y: 0,
                      transition: { type: "spring", stiffness: 70, damping: 15, mass: 1.1 },
                    },
                    exit: { opacity: 0, scale: 0.8, y: -16, transition: { duration: 0.2 } },
                  }}
                >
                  <motion.div
                    className="size-full"
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 110, damping: 16, mass: 1.1 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border border-mist-gray bg-canvas-ice p-5" style={{ backfaceVisibility: "hidden" }}>
                      <span className="text-3xl font-bold uppercase leading-none text-adaline-ink">
                        {entry.word}
                      </span>
                      <span className="text-sm text-adaline-ink/45">tap me</span>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-between rounded-lg border-2 border-valley-green/70 bg-canvas-ice p-4" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-xl font-bold uppercase leading-none text-adaline-ink">
                            {entry.word}
                          </span>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className="rounded-[20px] bg-forest-dew px-3 py-1 text-xs font-bold leading-none text-valley-green">
                              seen
                            </span>
                            <span className="text-[11px] text-adaline-ink/45">tap back</span>
                          </div>
                        </div>
                        <span className="mt-4 block text-sm leading-5 text-adaline-ink/75">
                          {entry.zh}
                        </span>
                        <span className="mt-3 block rounded bg-forest-dew/30 px-3 py-2 text-sm leading-5 text-adaline-ink">
                          {entry.example}
                        </span>
                        <span className="mt-3 block text-xs leading-4 text-adaline-ink/65">
                          {entry.translation}
                        </span>
                      </div>
                      <span className="w-fit rounded-[20px] bg-forest-dew px-3 py-1 text-xs text-valley-green">
                        {entry.pattern}{entry.patternZh ? ` · ${entry.patternZh}` : ""}
                      </span>
                    </div>
                  </motion.div>
                </motion.button>
              );
            })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
