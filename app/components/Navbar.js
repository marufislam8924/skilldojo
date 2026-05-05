"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import StudentNavAction from "./StudentNavAction";
import { getContinueLesson, getGamificationStats } from "../lib/studentProgress";
import { trackEvent } from "../lib/analytics";

const navLinks = [
  { href: "/hiragana", label: "Hiragana", icon: "あ" },
  { href: "/katakana", label: "Katakana", icon: "カ" },
  { href: "/vocab", label: "Vocabulary", icon: "語" },
  { href: "/grammar", label: "Grammar", icon: "文" },
  { href: "/blog", label: "Blog", icon: "✍️" },
  { href: "/conversation", label: "Conversation", icon: "話" },
  { href: "/quiz", label: "Quiz", icon: "✓" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [streak, setStreak] = useState(0);
  const [continueInfo, setContinueInfo] = useState(null);
  const pathname = usePathname();
  const panelRef = useRef(null);
  const hamburgerRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  /* Close on route change */
  useEffect(() => {
    close();
  }, [pathname, close]);

  /* Shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const refreshStats = () => {
      const stats = getGamificationStats();
      setStreak(stats.currentStreak || 0);
      setContinueInfo(getContinueLesson());
    };

    refreshStats();
    window.addEventListener("skilldojo-progress-changed", refreshStats);
    return () => window.removeEventListener("skilldojo-progress-changed", refreshStats);
  }, []);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            : "border-transparent backdrop-blur-md"
        }`}
        style={{
          backgroundColor: scrolled
            ? "rgba(250, 247, 242, 0.97)"
            : "rgba(250, 247, 242, 0.93)",
        }}
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
              <span className="text-xl font-black tracking-tight text-[var(--ink)] transition-colors duration-200">
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
                      ? "text-[var(--red)]"
                      : "text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--ink)]"
                  }`}
                  style={
                    isActive(l.href)
                      ? { backgroundColor: "rgba(230, 51, 41, 0.08)" }
                      : undefined
                  }
                >
                  {l.label}
                </Link>
              ))}

              <div className="mx-2 h-5 w-px bg-[var(--border)]" />

              <div className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
                <span aria-hidden="true">🔥</span>
                <span>{streak}</span>
              </div>

              {continueInfo ? (
                <Link
                  href={continueInfo.href}
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "navbar_continue_learning",
                      target: continueInfo.href,
                    })
                  }
                  className="inline-flex items-center rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-[13px] font-semibold text-emerald-800 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-100"
                >
                  Continue Learning
                </Link>
              ) : null}

              <Link
                href="/hiragana/1"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_name: "navbar_start_learning_now",
                    target: "/hiragana/1",
                  })
                }
                className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-semibold text-white no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Start Learning Now
              </Link>

              <StudentNavAction
                className="inline-flex items-center rounded-lg bg-[var(--red)] px-4 py-2 text-[13px] font-semibold text-white no-underline shadow-sm transition-all duration-200 hover:bg-[#c4261e] hover:shadow-md active:scale-[0.97]"
                signInLabel="Sign In"
                dashboardLabel="My Progress"
              />
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[var(--ink)] transition-colors duration-200 hover:bg-[var(--soft)] active:bg-[var(--border)] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <div className="relative h-5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                    open ? "top-[9px] rotate-45" : "top-[3px]"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[9px] block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                    open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                    open ? "top-[9px] -rotate-45" : "top-[15px]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/25 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={close}
      />

      {/* ── Mobile slide-out panel ── */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed right-0 top-0 z-[70] flex h-full w-[280px] max-w-[85vw] flex-col shadow-[-8px_0_30px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--paper)" }}
      >
        {/* Panel header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border)] px-5">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-[var(--ink)]">
              Skill<span className="text-[var(--red)]">Dojo</span>
            </span>
            <div className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-700">
              🔥 {streak}
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition-colors duration-200 hover:bg-[var(--soft)] hover:text-[var(--ink)]"
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Panel links */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold no-underline transition-all duration-200 ${
                isActive(l.href)
                  ? "text-[var(--red)]"
                  : "text-[var(--ink)] hover:bg-[var(--soft)] active:bg-[var(--border)]"
              }`}
              style={{
                ...(isActive(l.href)
                  ? { backgroundColor: "rgba(230, 51, 41, 0.08)" }
                  : {}),
                transitionDelay: open ? `${50 + i * 30}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(12px)",
                transitionProperty: "opacity, transform, background-color",
                transitionDuration: "250ms",
                transitionTimingFunction: "ease-out",
              }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
                style={{
                  backgroundColor: isActive(l.href)
                    ? "rgba(230, 51, 41, 0.1)"
                    : "var(--soft)",
                }}
              >
                {l.icon}
              </span>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Panel CTA */}
        <div className="shrink-0 border-t border-[var(--border)] p-4">
          {continueInfo ? (
            <Link
              href={continueInfo.href}
              onClick={() => {
                close();
                trackEvent("cta_click", {
                  cta_name: "mobile_nav_continue_learning",
                  target: continueInfo.href,
                });
              }}
              className="mb-2 flex w-full items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-[15px] font-semibold text-emerald-800 no-underline transition-all duration-200 hover:bg-emerald-100"
            >
              Continue Learning
            </Link>
          ) : null}

          <Link
            href="/hiragana/1"
            onClick={() => {
              close();
              trackEvent("cta_click", {
                cta_name: "mobile_nav_start_learning_now",
                target: "/hiragana/1",
              });
            }}
            className="mb-2 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-[15px] font-semibold text-white no-underline shadow-sm transition-all duration-200 hover:bg-slate-800"
          >
            Start Learning Now
          </Link>

          <StudentNavAction
            className="flex w-full items-center justify-center rounded-xl bg-[var(--red)] px-4 py-3 text-[15px] font-semibold text-white no-underline shadow-sm transition-all duration-200 hover:bg-[#c4261e] hover:shadow-md active:scale-[0.97]"
            signInLabel="Sign In"
            dashboardLabel="My Progress"
          />
        </div>
      </div>
    </>
  );
}