import Link from "next/link";

const footerLinks = [
  { href: "/", label: "About" },
  { href: "/words", label: "Words" },
  { href: "/patterns", label: "Patterns" },
  { href: "/simplify", label: "Rewrite" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-moss bg-canvas-ice">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-xl">
          <p className="text-base font-bold text-adaline-ink">850 English OS</p>
          <p className="mt-3 text-sm leading-6 text-adaline-ink/70">
            Learn more with fewer words.
          </p>
          <p className="mt-2 text-sm leading-6 text-adaline-ink/70">
            Based on the classic Basic English 850-word concept.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-4 text-sm text-adaline-ink/75">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-[20px] hover:text-valley-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-valley-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-adaline-ink/60">© 2026 850 English OS</p>
        </div>
      </div>
    </footer>
  );
}
