import rewriteExamples from "@/data/rewrite-examples.json";
import type { RewriteExample } from "@/types/content";

const examples = rewriteExamples as RewriteExample[];

export default function SimplifyPage() {
  return (
    <main>
      <section className="px-6 py-16 sm:px-10 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-fragmentmono text-sm uppercase text-valley-green">
              Rewrite
            </p>
            <h1 className="mt-5 text-balance text-5xl font-bold leading-[1.05] text-adaline-ink sm:text-6xl">
              Simple English Rewrite
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-adaline-ink/75">
              Turn complex English into clear English.
            </p>
          </div>

          <aside className="rounded-lg border border-stone-moss bg-forest-dew/35 p-6">
            <p className="font-fragmentmono text-sm uppercase text-valley-green">
              MVP mode
            </p>
            <p className="mt-3 text-2xl font-bold leading-snug text-adaline-ink">
              Static examples only. No AI API is connected.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-stone-moss bg-canvas-ice px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-fragmentmono text-sm uppercase text-valley-green">
              Future input
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight text-adaline-ink">
              Try the shape of the tool without sending anything.
            </h2>
            <p className="mt-4 text-pretty text-sm leading-6 text-adaline-ink/70">
              This disabled area shows the planned rewrite flow while keeping
              the first version fully static.
            </p>
          </div>

          <div className="rounded-lg border border-mist-gray bg-canvas-ice p-6">
            <label
              htmlFor="rewrite-preview"
              className="font-fragmentmono text-sm uppercase text-valley-green"
            >
              Paste a sentence here
            </label>
            <textarea
              id="rewrite-preview"
              disabled
              rows={5}
              placeholder="Paste a sentence here..."
              className="mt-4 w-full resize-none rounded-lg border border-stone-moss bg-forest-dew/25 p-4 text-base leading-7 text-adaline-ink placeholder:text-adaline-ink/45"
            />
            <button
              type="button"
              disabled
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-[20px] bg-amber-seed px-6 py-3 text-sm font-bold text-canvas-ice opacity-70"
            >
              Rewrite in Simple English
            </button>
            <p className="mt-4 text-sm leading-6 text-adaline-ink/65">
              AI rewrite is coming in a future version.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-fragmentmono text-sm uppercase text-valley-green">
              Examples
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight text-adaline-ink">
              Complex words become basic words.
            </h2>
          </div>

          <div className="mt-10 grid gap-5">
            {examples.map((example) => (
              <article
                key={example.original}
                className="rounded-lg border border-mist-gray bg-canvas-ice p-6"
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-lg bg-forest-dew/25 p-5">
                    <p className="font-fragmentmono text-sm uppercase text-valley-green">
                      Original
                    </p>
                    <p className="mt-4 text-pretty text-base leading-7 text-adaline-ink">
                      {example.original}
                    </p>
                  </div>

                  <div className="rounded-lg bg-canvas-ice p-5 shadow-[rgba(99,143,61,0.1)_0_0_0_1px]">
                    <p className="font-fragmentmono text-sm uppercase text-valley-green">
                      Simple English
                    </p>
                    <p className="mt-4 text-pretty text-base font-bold leading-7 text-adaline-ink">
                      {example.simple}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <p className="text-sm leading-6 text-adaline-ink/70">
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
