"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import StudentNavAction from "./StudentNavAction";

const navItems = [
  { href: "/hiragana", label: "Hiragana", kana: "あ" },
  { href: "/katakana", label: "Katakana", kana: "ア" },
  { href: "/vocab", label: "Vocabulary", kana: "語" },
  { href: "/grammar", label: "Grammar", kana: "文" },
  { href: "/conversation", label: "Conversation", kana: "話" },
  { href: "/quiz", label: "Quiz", kana: "試" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  /* Shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Animated underline indicator for active link */
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    const activeLink = navRef.current.querySelector("[data-active='true']");
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      indicatorRef.current.style.width = `${linkRect.width}px`;
      indicatorRef.current.style.left = `${linkRect.left - navRect.left}px`;
      indicatorRef.current.style.opacity = "1";
    } else {
      indicatorRef.current.style.opacity = "0";
    }
  }, [pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(250,247,242,0.97)] shadow-sm py-0"
          : "bg-[rgba(250,247,242,0.93)] py-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
          {/* Logo */}
          <Link
            href="/"
            className="group font-black text-xl tracking-tight text-[var(--ink)] transition-transform duration-200 hover:scale-105"
          >
            Skill<span className="text-[var(--red)] transition-colors duration-200 group-hover:text-[#ff453a]">Dojo</span>{" "}
            <span className="inline-block transition-transform duration-300 group-hover:rotate-12">道場</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 relative" ref={navRef}>
            {/* Sliding active indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-[2px] bg-[var(--red)] rounded-full transition-all duration-300 ease-out"
              style={{ opacity: 0 }}
            />
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group ${
                    active
                      ? "text-[var(--red)]"
                      : "text-[var(--ink)] hover:text-[var(--red)] hover:bg-[var(--red)]/5"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    className={`absolute -top-1 -right-1 text-[10px] leading-none opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:-translate-y-0.5 ${
                      active ? "opacity-60" : ""
                    }`}
                  >
                    {item.kana}
                  </span>
                </Link>
              );
            })}
            <div className="ml-3">
              <StudentNavAction
                className="inline-flex items-center rounded-lg bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--red)] hover:shadow-md hover:shadow-[var(--red)]/20 hover:scale-[1.03] active:scale-[0.98]"
                signInLabel="Sign In"
                dashboardLabel="My Progress"
              />
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-white transition-all duration-200 hover:border-[var(--red)] hover:shadow-sm active:scale-95"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-out ${
                  open ? "top-[9px] rotate-45" : "top-[3px] rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] h-[2px] w-5 bg-current rounded-full transition-all duration-200 ${
                  open ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-out ${
                  open ? "top-[9px] -rotate-45" : "top-[15px] rotate-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[var(--nav-h,57px)] bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed top-[var(--nav-h,57px)] right-0 h-[calc(100dvh-var(--nav-h,57px))] w-[min(320px,85vw)] bg-[var(--paper)] z-50 md:hidden border-l border-[var(--border)] shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-5 pt-4 pb-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[var(--red)]/10 text-[var(--red)]"
                      : "text-[var(--ink)] hover:bg-[var(--soft)] active:scale-[0.98]"
                  }`}
                  style={{
                    transitionDelay: open ? `${i * 40}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateX(0)" : "translateX(20px)",
                    transition: `opacity 300ms ${i * 40}ms, transform 300ms ${i * 40}ms, background-color 200ms, color 200ms`,
                  }}
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--soft)] text-lg">
                    {item.kana}
                  </span>
                  <span>{item.label}</span>
                  {active && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[var(--red)]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-[var(--border)]">
            <StudentNavAction
              className="flex w-full items-center justify-center rounded-xl bg-[var(--ink)] px-4 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[var(--red)] hover:shadow-lg hover:shadow-[var(--red)]/20 active:scale-[0.98]"
              signInLabel="Sign In"
              dashboardLabel="My Progress"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}