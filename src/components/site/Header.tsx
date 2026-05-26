"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/words", label: "Words" },
  { href: "/daily", label: "Daily" },
  { href: "/patterns", label: "Patterns" },
  { href: "/simplify", label: "Rewrite" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-stone-moss bg-canvas-ice px-6 sm:px-10">
      <div className="mx-auto flex h-full max-w-6xl flex-row items-center justify-between">
        <Link
          href="/"
          className="inline-flex w-fit items-center rounded-[20px] text-lg font-bold text-adaline-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-valley-green"
        >
          850 English OS
        </Link>

        <nav aria-label="Main navigation" className="-mx-2 overflow-x-auto px-2">
          <ul className="flex min-w-max items-center gap-2">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "inline-flex rounded-[20px] border px-5 py-2 text-sm transition-colors",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-valley-green",
                      active
                        ? "border-forest-dew bg-forest-dew text-valley-green"
                        : "border-transparent text-adaline-ink hover:border-stone-moss hover:text-valley-green",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
