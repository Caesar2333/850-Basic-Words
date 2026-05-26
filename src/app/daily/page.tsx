"use client";

import { useMemo, useState } from "react";
import basicWords from "@/data/basic-850.json";
import dailyLessons from "@/data/daily-lessons.json";
import type { BasicWord, DailyLesson } from "@/types/content";

const words = basicWords as BasicWord[];
const lessons = dailyLessons as DailyLesson[];

type LessonWord = {
  word: string;
  zh: string;
  example: string;
  translation: string;
  pattern: string;
};

const dailyDetails: Record<string, Pick<LessonWord, "translation" | "pattern">> = {
  get: { translation: "我收到了你的消息。", pattern: "get ready" },
  make: { translation: "让它简单一点。", pattern: "make sure" },
  take: { translation: "慢慢来，不用急。", pattern: "take care" },
  give: { translation: "给我一分钟。", pattern: "give up" },
  put: { translation: "把它放在这里。", pattern: "put on" },
  go: { translation: "跟我一起走。", pattern: "go on" },
  come: { translation: "来这里。", pattern: "come back" },
  have: { translation: "祝你今天愉快。", pattern: "have to" },
  be: { translation: "说清楚一点。", pattern: "be ready" },
  do: { translation: "尽你最大的努力。", pattern: "do well" },
};

function getLessonWords(lesson: DailyLesson): LessonWord[] {
  return lesson.words.map((word) => {
    const source = words.find((entry) => entry.word === word);
    const details = dailyDetails[word];

    return {
      word,
      zh: source?.zh ?? "",
      example: source?.examples[0] ?? "",
      translation: details?.translation ?? "中文翻译待补充。",
      pattern: details?.pattern ?? source?.patterns[0] ?? "basic",
    };
  });
}

export default function DailyPage() {
  const lesson = lessons[0];
  const lessonWords = useMemo(() => getLessonWords(lesson), [lesson]);
  const [flippedWords, setFlippedWords] = useState<Set<string>>(new Set());

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

  return (
    <main className="bg-canvas-ice">
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
          <div className="max-w-4xl">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Day {lesson.day}
            </p>
            <h1 className="mt-5 text-balance text-[53px] font-bold leading-[1.05] text-adaline-ink max-sm:text-5xl">
              Daily 10 Words
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-[1.43] text-adaline-ink/75">
              Learn 10 words at a time. Small steps, real progress.
            </p>
          </div>

          <aside className="rounded-lg border border-stone-moss bg-forest-dew/35 p-6">
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Today
            </p>
            <p className="mt-3 text-2xl font-bold leading-[1.3] text-adaline-ink">
              {lesson.title}
            </p>
            <p className="mt-3 text-sm leading-[1.43] text-adaline-ink/75">
              10 action words to build your first simple sentences.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-stone-moss px-6 py-8 sm:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-6">
            <h2 className="text-[28px] font-bold leading-tight text-adaline-ink">
              Today's words - tap each card to flip
            </h2>
            <p className="mt-3 text-sm leading-[1.43] text-adaline-ink/75">
              Tap a card to reveal meaning, example, and translation. Tap again to flip back.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {lessonWords.map((entry) => {
              const flipped = flippedWords.has(entry.word);

              return (
                <button
                  key={entry.word}
                  type="button"
                  aria-label={`${entry.word} word card`}
                  aria-pressed={flipped}
                  data-daily-card="true"
                  data-flipped={flipped ? "true" : "false"}
                  onClick={() => toggleWord(entry.word)}
                  className="h-[200px] rounded-xl text-left outline-none transition-transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-valley-green focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-ice"
                >
                  {flipped ? (
                    <span className="flex h-full flex-col justify-between rounded-xl border-2 border-valley-green bg-canvas-ice p-4">
                      <span>
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-xl font-bold uppercase leading-none text-adaline-ink">
                            {entry.word}
                          </span>
                          <span className="rounded-[20px] bg-forest-dew px-3 py-1 text-xs font-bold leading-none text-valley-green">
                            seen
                          </span>
                        </span>
                        <span className="mt-4 block text-sm leading-5 text-adaline-ink/75">
                          {entry.zh}
                        </span>
                        <span className="mt-3 block rounded bg-forest-dew/30 px-3 py-2 text-sm leading-5 text-adaline-ink">
                          {entry.example}
                        </span>
                        <span className="mt-3 block text-xs leading-4 text-adaline-ink/65">
                          {entry.translation}
                        </span>
                      </span>
                      <span className="flex items-center justify-between gap-2">
                        <span className="rounded-[20px] bg-forest-dew px-3 py-1 text-xs text-valley-green">
                          {entry.pattern}
                        </span>
                        <span className="text-xs text-adaline-ink/45">tap back</span>
                      </span>
                    </span>
                  ) : (
                    <span className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-mist-gray bg-canvas-ice p-5">
                      <span className="text-3xl font-bold uppercase leading-none text-adaline-ink">
                        {entry.word}
                      </span>
                      <span className="text-sm text-adaline-ink/45">tap me</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[400px_1fr] lg:items-center">
          <div>
            <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
              Practice preview
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-[1.15] text-adaline-ink">
              Static exercises, visible answers.
            </h2>
            <p className="mt-4 text-sm leading-[1.43] text-adaline-ink/75">
              This MVP shows how practice will look without recording answers or completion state.
            </p>
          </div>

          <div className="grid gap-4">
            {lesson.practice.map((practice) => (
              <article
                key={`${practice.type}-${practice.question}`}
                className="rounded-lg border border-stone-moss bg-canvas-ice p-6"
              >
                <p className="font-fragmentmono text-xs font-bold uppercase text-valley-green">
                  {practice.type}
                </p>
                <p className="mt-4 text-lg leading-8 text-adaline-ink">
                  {practice.question}
                </p>
                <p className="mt-4 rounded bg-forest-dew/35 p-3 text-sm font-bold text-adaline-ink">
                  Answer: {practice.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
