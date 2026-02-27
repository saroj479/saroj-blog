/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher, ThemeToggle } from ".";
import { Container } from "./Container";
import { Logo } from "./Logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background will-change-transform">
      <Container className="flex items-center justify-between py-1">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-x-4 md:flex">
          <ul>
            <li>
              <Link
                href={`/blogs`}
                className="animation tracking-wide underline-offset-0 hover:text-accent1 hover:underline hover:underline-offset-4"
              >
                Blogs
              </Link>
            </li>
          </ul>
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="https://milkywaymarket.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Shop
          </a>
          <Link href="/buy-me-a-coffee">
            <button className="rounded bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-500">
              Buy Me a Coffee
            </button>
          </Link>
        </nav>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex size-10 items-center justify-center rounded-lg transition hover:bg-secondary-10 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </Container>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="border-t bg-background border-secondary-10 md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="animation rounded-lg px-3 py-2 font-medium tracking-wide hover:text-accent1 hover:bg-secondary-5"
            >
              Blogs
            </Link>
            <div className="flex items-center gap-3 px-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <a
              href="https://milkywaymarket.shop/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Shop
            </a>
            <Link
              href="/buy-me-a-coffee"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-yellow-400 px-4 py-2 text-center font-semibold text-black transition hover:bg-yellow-500"
            >
              Buy Me a Coffee
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
};
