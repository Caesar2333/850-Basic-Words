import Link from "next/link";
import rewriteExamples from "@/data/rewrite-examples.json";

const principles = [
  {
    title: "Fewer words, more expression",
    body: "Use a smaller core vocabulary to say more real things.",
  },
  {
    title: "Basic words are powerful",
    body: "Words like get, make, take, and put carry more meaning than many advanced words.",
  },
  {
    title: "Learn by using, not memorizing",
    body: "See how words combine, build sentences, and express useful situations.",
  },
];

const modules = [
  {
    title: "850 Words",
    body: "Browse the full Basic English word set.",
    href: "/words",
  },
  {
    title: "Daily 10 Words",
    body: "Learn 10 words at a time with less pressure.",
    href: "/daily",
  },
  {
    title: "Power Patterns",
    body: "Study useful combinations built from get, make, take, and put.",
    href: "/patterns",
  },
  {
    title: "Simple Rewrite",
    body: "Turn complex English into simple English.",
    href: "/simplify",
  },
];

export default function Home() {
  const rewriteExample = rewriteExamples[0];

  return (
    <main>
      <section className="px-6 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="flex flex-col gap-7">
            <p className="font-fragmentmono text-sm uppercase text-valley-green">
              850 English OS
            </p>
            <div className="flex max-w-3xl flex-col gap-5">
              <h1 className="text-balance text-5xl font-bold leading-[1.05] text-adaline-ink sm:text-6xl">
                Learn English with 850 essential words.
              </h1>
              <p className="max-w-2xl text-pretty text-lg leading-8 text-adaline-ink/75">
                A simple English system that helps you say more with fewer
                words.
              </p>
              <p className="max-w-2xl text-pretty text-base leading-7 text-adaline-ink/65">
                用 850 个基础词，建立你的英语表达系统。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/words"
                className="inline-flex min-h-11 items-center justify-center rounded-[20px] bg-amber-seed px-6 py-3 text-sm font-bold text-canvas-ice transition-transform active:scale-[0.96]"
              >
                Start with 850 Words
              </Link>
              <Link
                href="/patterns"
                className="inline-flex min-h-11 items-center justify-center rounded-[20px] border border-stone-moss px-6 py-3 text-sm font-bold text-adaline-ink transition-colors hover:border-valley-green hover:text-valley-green"
              >
                See Power Patterns
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-stone-moss bg-forest-dew/35 p-6 shadow-[rgba(99,143,61,0.1)_0_0_0_1px]">
            <p className="font-fragmentmono text-sm uppercase text-valley-green">
              Product idea
            </p>
            <p className="mt-5 text-pretty text-2xl font-bold leading-snug text-adaline-ink">
              Not more words. More ways to use the words you already know.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-stone-moss bg-canvas-ice px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="rounded-lg border border-mist-gray bg-canvas-ice p-6"
            >
              <p className="font-fragmentmono text-sm text-valley-green">
                0{index + 1}
              </p>
              <h2 className="mt-5 text-xl font-bold text-adaline-ink">
                {principle.title}
              </h2>
              <p className="mt-4 text-pretty text-sm leading-6 text-adaline-ink/70">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-fragmentmono text-sm uppercase text-valley-green">
              Core modules
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight text-adaline-ink">
              Four entry points for building a simple English system.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className="group flex min-h-56 flex-col justify-between rounded-lg border border-mist-gray bg-canvas-ice p-6 transition-colors hover:border-valley-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-valley-green"
              >
                <span>
                  <span className="text-xl font-bold text-adaline-ink">
                    {module.title}
                  </span>
                  <span className="mt-4 block text-pretty text-sm leading-6 text-adaline-ink/70">
                    {module.body}
                  </span>
                </span>
                <span className="text-sm font-bold text-valley-green">
                  Open module
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-lg border border-stone-moss bg-forest-dew/25 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-fragmentmono text-sm uppercase text-valley-green">
              Rewrite example
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-adaline-ink">
              The goal is not to sound advanced. The goal is to be clear.
            </h2>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg bg-canvas-ice p-5 shadow-[rgba(99,143,61,0.1)_0_0_0_1px]">
              <p className="font-fragmentmono text-sm uppercase text-valley-green">
                Original
              </p>
              <p className="mt-3 text-pretty text-base leading-7 text-adaline-ink">
                {rewriteExample.original}
              </p>
            </div>
            <div className="rounded-lg bg-canvas-ice p-5 shadow-[rgba(99,143,61,0.1)_0_0_0_1px]">
              <p className="font-fragmentmono text-sm uppercase text-valley-green">
                Simple English
              </p>
              <p className="mt-3 text-pretty text-base leading-7 text-adaline-ink">
                {rewriteExample.simple}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
