import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background image — CSS background-image, no JS hydration needed */}
      <div
        className="absolute inset-0 bg-[#576a78] bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />

      {/* Subtle bottom gradient for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1d08]/80 via-[#0a1d08]/20 to-transparent" />

      {/* Navigation */}
      <nav className="relative z-10 flex h-14 items-center justify-between px-8 sm:px-16">
        <div className="mx-auto flex h-full w-full max-w-[1360px] items-center justify-between">
          <span className="text-lg tracking-tight text-white">
            850 English OS
          </span>
          <div className="flex items-center gap-8">
          <Link
            href="/words"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white hover:underline decoration-1 underline-offset-4 decoration-white/30"
          >
            Words
          </Link>
          <Link
            href="/daily"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white hover:underline decoration-1 underline-offset-4 decoration-white/30"
          >
            Daily
          </Link>
          <Link
            href="/patterns"
            className="text-sm tracking-tight text-white/70 transition-colors hover:text-white hover:underline decoration-1 underline-offset-4 decoration-white/30"
          >
            Patterns
          </Link>
          <Link
            href="/words"
            className="inline-flex items-center rounded-[20px] bg-amber-seed px-6 py-2 text-sm font-medium tracking-tight text-white transition-transform duration-150 ease-out will-change-transform hover:scale-[1.02] active:scale-[0.96]"
          >
            Start learning
          </Link>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div
          className="mb-8"
          style={{ animation: 'hero-fade-up 0.5s cubic-bezier(0.2, 0, 0, 1) both' }}
        >
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1">
            <span className="text-xs tracking-wide text-white/60">
              ✦&nbsp; Based on Basic English 850
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{ animation: 'hero-fade-up 0.5s cubic-bezier(0.2, 0, 0, 1) both', animationDelay: '100ms' }}
        >
          <h1 className="text-balance text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl">
            Learn English with
          </h1>
          <h1 className="text-balance text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl">
            850 Essential Words
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70"
          style={{ animation: 'hero-fade-up 0.5s cubic-bezier(0.2, 0, 0, 1) both', animationDelay: '200ms' }}
        >
          A simple English system that helps you say more
          <br />
          with fewer words.
        </p>

        {/* CTA */}
        <div
          className="mt-10"
          style={{ animation: 'hero-fade-up 0.5s cubic-bezier(0.2, 0, 0, 1) both', animationDelay: '300ms' }}
        >
          <Link
            href="/words"
            className="inline-flex items-center justify-center rounded-full bg-amber-seed px-8 py-3.5 text-sm font-medium tracking-tight text-white transition-transform duration-150 ease-out will-change-transform hover:scale-[1.02] active:scale-[0.96]"
          >
            Explore 850 words
          </Link>
        </div>
      </div>
    </div>
  );
}
