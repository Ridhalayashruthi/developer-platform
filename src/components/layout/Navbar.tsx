"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Interview", href: "/interview" },
  { name: "Roadmaps", href: "/roadmaps" },
  { name: "AI", href: "/ai" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090D16]/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav aria-label="Primary Navigation" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition ${
                      isActive(item.href)
                        ? "text-violet-400"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-slate-300 hover:border-violet-500 hover:text-white transition"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden border-t border-slate-800 py-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-violet-950/60 text-violet-300 border border-violet-700/50"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}