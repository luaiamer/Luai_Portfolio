"use client";

import { useEffect, useState } from "react";
import { brand, nav } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "bg-black/60 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 md:h-20 md:px-8 xl:px-10">
          <a
            href="#"
            className="flex shrink-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d1a0d] font-mono text-sm font-medium text-accent">
              {">_"}
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold tracking-tight text-text">
                {brand.name}
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-text-dim">
                {brand.subLabel}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-bg-elevated/80 px-2 py-1.5 backdrop-blur-md md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={brand.hireMe.href}
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_var(--accent-glow)] transition-[box-shadow] hover:shadow-[0_0_40px_var(--accent-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
            >
              {brand.hireMe.label}
            </a>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-elevated text-text md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 bg-current transition-transform ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition-transform ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Outside header so backdrop-filter doesn't trap position:fixed */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-16 z-40 bg-bg/95 backdrop-blur-lg transition-[opacity,visibility] duration-300 md:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-6 px-6">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-text transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-4">
            <a
              href={brand.hireMe.href}
              onClick={() => setOpen(false)}
              className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_30px_var(--accent-glow)]"
            >
              {brand.hireMe.label}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
