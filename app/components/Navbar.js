"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef(null);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--paper)]/[0.97] shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-xl"
          : "border-transparent bg-[var(--paper)]/[0.93] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-1.5 no-underline"
          >
            <span className="text-xl font-black tracking-tight text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--ink)]/80">
              Skill
              <span className="text-[var(--red)]">Dojo</span>
            </span>
            <span className="text-lg opacity-60 transition-opacity duration-200 group-hover:opacity-80">
              道場
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-lg px-3 py-2 text-[13px] font-semibold tracking-wide no-underline transition-all duration-200 ${
                  isActive(l.href)
                    ? "bg-[var(--red)]/[0.08] text-[var(--red)]"
                    : "text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--ink)]"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* ── Divider ── */}
            <div className="mx-2 h-5 w-px bg-[var(--border)]" />

            {/* ── CTA ── */}
            <StudentNavAction
              className="inline-flex items-center rounded-lg bg-[var(--red)] px-4 py-2 text-[13px] font-semibold text-white no-underline shadow-sm transition-all duration-200 hover:bg-[#c4261e] hover:shadow-md active:scale-[0.97]"
              signInLabel="Sign In"
              dashboardLabel="My Progress"
            />
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--soft)] active:bg-[var(--border)] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="relative h-5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-[9px] rotate-45" : "top-[3px]"
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-[9px] -rotate-45" : "top-[15px]"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* ── Mobile slide-out panel ── */}
      <div
        ref={menuRef}
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-[var(--paper)] shadow-[-8px_0_30px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-5">
          <span className="text-sm font-bold tracking-wide text-[var(--muted)] uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition-colors duration-200 hover:bg-[var(--soft)] hover:text-[var(--ink)]"
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Panel links */}
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center rounded-xl px-4 py-3 text-[15px] font-semibold no-underline transition-all duration-200 ${
                isActive(l.href)
                  ? "bg-[var(--red)]/[0.08] text-[var(--red)]"
                  : "text-[var(--ink)] hover:bg-[var(--soft)] active:bg-[var(--border)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Panel CTA */}
        <div className="border-t border-[var(--border)] p-4">
          <StudentNavAction
            className="flex w-full items-center justify-center rounded-xl bg-[var(--red)] px-4 py-3 text-[15px] font-semibold text-white no-underline shadow-sm transition-all duration-200 hover:bg-[#c4261e] hover:shadow-md active:scale-[0.97]"
            signInLabel="Sign In"
            dashboardLabel="My Progress"
          />
        </div>
      </div>
    </nav>
  );
}