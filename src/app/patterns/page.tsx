"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import patterns from "@/data/patterns.json";
import type { PatternEntry } from "@/types/content";

const patternEntries = patterns as PatternEntry[];

function getBadgeLabel(phrase: string): string {
  const particle = phrase.split(" ").slice(1).join(" ");
  if (["up", "down", "in", "out", "on", "off", "away", "back", "forward", "through", "over"].includes(particle)) {
    return "v + particle";
  }
  if (["ready", "better", "well", "clear", "sure", "able", "more"].includes(particle)) {
    return "v + adj";
  }
  return "expression";
}

export default function PatternsPage() {
  const [selectedWord, setSelectedWord] = useState(patternEntries[0]?.word ?? "");
  const selectedEntry = useMemo(
    () => patternEntries.find((entry) => entry.word === selectedWord) ?? patternEntries[0],
    [selectedWord],
  );

  return (
    <main className="bg-canvas-ice">
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="max-w-4xl">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Power Patterns
            </p>
            <h1 className="mt-5 text-balance text-[53px] font-bold leading-[1.05] text-adaline-ink max-sm:text-5xl">
              Power Patterns
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-[1.43] text-adaline-ink/75">
              Use simple words to build many meanings.
            </p>
          </div>

          <aside className="rounded-lg border border-stone-moss bg-forest-dew/35 p-6">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Core idea
            </p>
            <p className="mt-3 text-2xl font-bold leading-[1.3] text-adaline-ink">
              Expression grows when simple words combine.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-stone-moss px-6 py-3 sm:px-10">
        <nav aria-label="Pattern words" className="mx-auto flex max-w-[1360px] gap-1.5 overflow-x-auto">
          {patternEntries.map((entry) => {
            const active = entry.word === selectedEntry.word;

            return (
              <button
                key={entry.word}
                type="button"
                onClick={() => setSelectedWord(entry.word)}
                className={[
                  "inline-flex min-w-max rounded-[20px] border px-5 py-3 text-sm font-bold uppercase transition-[background-color,border-color,color,transform] active:scale-[0.96]",
                  active
                    ? "border-valley-green bg-valley-green text-canvas-ice"
                    : "border-stone-moss bg-canvas-ice text-adaline-ink hover:border-valley-green",
                ].join(" ")}
              >
                {entry.word}
              </button>
            );
          })}
        </nav>
      </section>

      <section className="border-b border-stone-moss px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEntry.word}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <h2 className="text-7xl font-bold uppercase leading-none text-adaline-ink max-sm:text-6xl">
                {selectedEntry.word}
              </h2>
              <p className="mt-5 text-lg leading-[1.43] text-adaline-ink/75 text-pretty">
                {selectedEntry.coreMeaning}
              </p>
              <p className="mt-2 text-base leading-[1.43] text-adaline-ink/60 text-pretty">
                {selectedEntry.zh}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedEntry.examples.map((example) => (
                  <span
                    key={example}
                    className="rounded-[8px] bg-forest-dew/35 px-4 py-2 text-sm leading-5 text-adaline-ink"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
            Patterns
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEntry.word}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <h2 className="mt-3 text-[22px] font-bold text-adaline-ink">
                {selectedEntry.word} &times; particles &mdash; common combinations
              </h2>

              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {selectedEntry.patterns.map((pattern) => (
                  <motion.article
                    key={pattern.phrase}
                    className="flex flex-col gap-3 rounded-lg border border-mist-gray bg-canvas-ice p-5"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-2xl font-bold text-adaline-ink">{pattern.phrase}</h3>
                      <span className="mt-1 rounded-[20px] bg-forest-dew px-3 py-1 text-xs text-valley-green">
                        {getBadgeLabel(pattern.phrase)}
                      </span>
                    </div>

                    <p className="text-sm text-adaline-ink/75 text-pretty">
                      {pattern.zh}
                    </p>

                    <div className="rounded-[4px] border-l-[3px] border-valley-green bg-forest-dew/30 px-4 py-3 text-sm leading-[1.43] text-adaline-ink">
                      {pattern.examples[0]}
                    </div>

                    <p className="text-xs text-adaline-ink/40">
                      {pattern.collocation}
                    </p>

                    {pattern.antonym ? (
                      <div className="flex items-center gap-1.5 text-xs text-adaline-ink/60">
                        <span className="text-valley-green">&ang;</span>
                        <span>{pattern.antonym}</span>
                      </div>
                    ) : null}
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
            Simple replacements
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEntry.word}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <h2 className="mt-3 text-[22px] font-bold text-adaline-ink">
                Advanced words &rarr; simple words with {selectedEntry.word}
              </h2>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {selectedEntry.advancedReplacements.map((replacement) => (
                  <div
                    key={`${replacement.advanced}-${replacement.simple}`}
                    className="flex items-center gap-3 rounded-lg border border-stone-moss bg-canvas-ice px-5 py-4 text-sm"
                  >
                    <span className="flex-1 text-adaline-ink/60">{replacement.advanced}</span>
                    <span className="rounded-[20px] bg-valley-green px-2.5 py-1 text-xs font-bold text-canvas-ice">
                      &rarr;
                    </span>
                    <span className="flex-1 font-bold text-adaline-ink">{replacement.simple}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
