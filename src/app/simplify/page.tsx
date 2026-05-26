"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import rewriteExamples from "@/data/rewrite-examples.json";
import type { RewriteExample } from "@/types/content";

const examples = rewriteExamples as RewriteExample[];

export default function SimplifyPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    simplified: string;
    changes: { from: string; to: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSimplify = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.06 } },
  };
  const cardVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.2, 0, 0, 1] as const },
    },
  };

  return (
    <main className="bg-canvas-ice">
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="max-w-4xl">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Rewrite
            </p>
            <h1 className="mt-5 text-balance text-[53px] font-bold leading-[1.05] text-adaline-ink max-sm:text-5xl">
              Simple English Rewrite
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-[1.43] text-adaline-ink/75 text-pretty">
              Turn complex English into clear English.
            </p>
          </div>

          <aside className="rounded-lg border border-stone-moss bg-forest-dew/35 p-6">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              How it works
            </p>
            <p className="mt-3 text-2xl font-bold leading-snug text-adaline-ink">
              No AI.
            </p>
            <p className="mt-3 text-sm leading-6 text-adaline-ink/70 text-pretty">
              Just word lookup + sentence splitting. It&apos;s not perfect, but
              people will understand.
            </p>
          </aside>
        </div>
      </section>

      {/* Input */}
      <section className="border-y border-stone-moss bg-canvas-ice px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
                Simplify
              </p>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight text-adaline-ink">
                Paste a complex sentence.
              </h2>
              <p className="mt-4 text-pretty text-sm leading-6 text-adaline-ink/70">
                The tool will replace hard words with simple ones and split long
                sentences.
              </p>
            </div>

            <div className="rounded-lg border border-mist-gray bg-canvas-ice p-6">
              <label
                htmlFor="rewrite-input"
                className="font-fragmentmono text-xs font-bold uppercase text-valley-green"
              >
                Paste a sentence here
              </label>
              <textarea
                id="rewrite-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                placeholder="Paste a sentence here..."
                className="mt-4 w-full resize-none rounded-lg border border-stone-moss bg-forest-dew/25 p-4 text-base leading-7 text-adaline-ink placeholder:text-adaline-ink/45"
              />
              <button
                type="button"
                onClick={handleSimplify}
                disabled={loading || !input.trim()}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-[20px] bg-amber-seed px-6 py-3 text-sm font-bold text-canvas-ice transition-[background-color,transform] hover:bg-amber-seed/90 active:scale-[0.97] disabled:opacity-70"
              >
                {loading ? "Rewriting..." : "Rewrite in Simple English"}
              </button>

              {error && (
                <p className="mt-4 text-sm leading-6 text-red-500">{error}</p>
              )}

              {result && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-md bg-forest-dew/25 p-5">
                    <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
                      Simple English
                    </p>
                    <p className="mt-4 text-balance text-base leading-7 text-adaline-ink">
                      {result.simplified}
                    </p>
                  </div>

                  {result.changes.length > 0 && (
                    <div>
                      <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
                        Changes made
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {result.changes.map((c) => (
                          <span
                            key={c.from + c.to}
                            className="rounded-[20px] border border-stone-moss px-3 py-1 font-fragmentmono text-sm text-valley-green"
                          >
                            {c.from} &rarr; {c.to}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="max-w-2xl">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Examples
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight text-adaline-ink">
              Complex words become basic words.
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="mt-10 grid gap-5"
          >
            {examples.map((example) => (
              <motion.article
                key={example.original}
                variants={cardVariants}
                className="rounded-lg border border-mist-gray bg-canvas-ice p-6"
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-md bg-forest-dew/25 p-5">
                    <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
                      Original
                    </p>
                    <p className="mt-4 text-pretty text-base leading-7 text-adaline-ink">
                      {example.original}
                    </p>
                  </div>

                  <div className="rounded-md bg-canvas-ice p-5 shadow-[rgba(99,143,61,0.1)_0_0_0_1px]">
                    <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
                      Simple English
                    </p>
                    <p className="mt-4 text-pretty text-base font-bold leading-7 text-adaline-ink">
                      {example.simple}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <p className="text-sm leading-6 text-adaline-ink/70 text-pretty">
                    {example.why}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {example.keyWords.map((word) => (
                      <span
                        key={word}
                        className="rounded-[20px] border border-stone-moss px-3 py-1 font-fragmentmono text-sm text-valley-green"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
