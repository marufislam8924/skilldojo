"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import StudentNavAction from "./StudentNavAction";

const navLinks = [
  { href: "/hiragana", label: "Hiragana" },
  { href: "/katakana", label: "Katakana" },
  { href: "/vocab", label: "Vocabulary" },
  { href: "/grammar", label: "Grammar" },
  { href: "/conversation", label: "Conversation" },
  { href: "/quiz", label: "Quiz" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* Close mobile menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Shrink on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={`w-full sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "bg-[rgba(250,247,242,0.97)] shadow-sm" : "bg-[rgba(250,247,242,0.93)]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-[padding] duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="shrink-0 font-black text-xl tracking-tight text-[var(--ink)]"
          >
            Skill<span className="text-[var(--red)]">Dojo</span> 道場
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-5 text-sm font-semibold text-[var(--ink)]">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-[var(--red)]"
                    : "hover:text-[var(--red)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <StudentNavAction
              className="ml-2 inline-flex items-center rounded-lg bg-[var(--red)] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#c4261e]"
              signInLabel="Sign In"
              dashboardLabel="My Progress"
            />
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--ink)] hover:bg-[var(--soft)] transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--paper)]">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 text-base font-semibold rounded-lg transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-[var(--red)] bg-[var(--red)]/5"
                    : "text-[var(--ink)] hover:bg-[var(--soft)] active:bg-[var(--soft)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="px-4 pt-3 pb-2">
              <StudentNavAction
                className="flex w-full items-center justify-center rounded-xl bg-[var(--red)] px-4 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#c4261e]"
                signInLabel="Sign In"
                dashboardLabel="My Progress"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}