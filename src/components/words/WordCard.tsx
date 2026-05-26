import { BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BasicWord, WordCategory } from "@/types/content";

type WordCardProps = {
  word: BasicWord;
  category: WordCategory;
};

export function WordCard({ word, category }: WordCardProps) {
  const example = word.examples[0];
  const collocations = word.patterns.slice(0, 3);
  const collocationTranslations = word.patternZh?.slice(0, 3) ?? [];

  return (
    <motion.article
      data-word-card="true"
      className="flex min-h-[239px] flex-col gap-3 rounded-lg border border-mist-gray bg-canvas-ice p-6"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[30px] font-bold leading-none text-adaline-ink">
          {word.word}
        </h3>
        <span className="rounded-[20px] bg-forest-dew px-3 py-1 text-right text-xs leading-none text-valley-green">
          {category.name}
        </span>
      </div>

      <p className="text-sm leading-5 text-adaline-ink/75">
        {word.zh || "中文释义待补充"}
      </p>

      <div className="rounded-[4px] border-l-[3px] border-valley-green bg-forest-dew/[0.19] px-4 py-3 text-sm leading-[1.43] text-adaline-ink">
        {example ?? "Example to be added from data."}
      </div>

      {word.exampleTranslation ? (
        <p className="flex items-start gap-1.5 text-[13px] leading-[1.43] text-adaline-ink/60">
          <BookOpen className="mt-0.5 size-3.5 shrink-0" />
          <span>{word.exampleTranslation}</span>
        </p>
      ) : null}

      {collocations.length > 0 && (
        <>
          <div className="h-px bg-stone-moss" />
          <p className="font-fragmentmono text-[11px] font-bold uppercase text-valley-green">
            Collocations
          </p>
          <div className="flex flex-col gap-2">
            {collocations.map((phrase, i) => (
              <div key={phrase} className="flex items-center gap-2">
                <span className="rounded-xl bg-forest-dew/50 px-2.5 py-1 text-xs text-adaline-ink/75">
                  {phrase}
                </span>
                <ArrowRight className="size-2.5 shrink-0 text-adaline-ink/40" />
                <span className="text-[13px] text-adaline-ink/75">
                  {collocationTranslations[i] ?? ""}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.article>
  );
}
