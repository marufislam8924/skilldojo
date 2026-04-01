"use client";

import Link from "next/link";
import { useState } from "react";
import StudentNavAction from "./StudentNavAction";

const navItems = [
  { href: "/hiragana", label: "Hiragana" },
  { href: "/katakana", label: "Katakana" },
  { href: "/vocab", label: "Vocabulary" },
  { href: "/grammar", label: "Grammar" },
  { href: "/conversation", label: "Conversation" },
  { href: "/quiz", label: "Quiz" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-[var(--border)] bg-[rgba(250,247,242,0.93)] backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="font-black text-xl tracking-tight text-[var(--ink)]">
            Skill<span className="text-[var(--red)]">Dojo</span> 道場
          </Link>

          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-semibold text-[var(--ink)] hover:text-[var(--red)]"
              >
                {item.label}
              </Link>
            ))}
            <StudentNavAction
              className="inline-flex items-center rounded-lg border border-[var(--ink)] px-4 py-2 text-base font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              signInLabel="Sign In"
              dashboardLabel="My Progress"
            />
          </div>

          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-white"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-[var(--border)] pb-3">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-base font-semibold text-[var(--ink)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <StudentNavAction
                className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--ink)] px-4 py-3 text-base font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
                signInLabel="Sign In"
                dashboardLabel="My Progress"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}