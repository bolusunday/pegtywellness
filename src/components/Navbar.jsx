"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Workstation Wellness", href: "/category/workstation-wellness" },
  { name: "Nighttime Optimization", href: "/category/nighttime-optimization" },
  { name: "Body & Motion", href: "/category/body-motion" },
  { name: "Mind & Acoustics", href: "/category/mind-acoustics" },
  { name: "Nutrition & Health", href: "/category/nutrition-health" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-oat/85 backdrop-blur-md border-b border-sage/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo (flex-shrink-0 prevents menu overlap) */}
        <Link
          href="/"
          prefetch={false}
          className="flex-shrink-0 flex items-center gap-2 font-serif text-base sm:text-lg lg:text-xl text-charcoal font-bold tracking-tight whitespace-nowrap"
        >
          <Image
            src="/images/pegty-wellness-logo.png"
            alt="Pegty Wellness"
            width={56}
            height={56}
            className="h-10 w-10 lg:h-12 lg:w-12 object-contain flex-shrink-0"
          />
          <span>Pegty Wellness</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-3 2xl:gap-5 text-xs xl:text-sm font-medium text-charcoal/80">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="inline-block transition-all duration-300 hover:text-sage whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search & Mobile Toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-charcoal/10 focus-within:border-sage focus-within:ring-2 focus-within:ring-sage/20 focus-within:bg-white transition-all shadow-xs w-36 focus-within:w-56">
            <Search className="w-4 h-4 text-charcoal/40 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-xs sm:text-sm ml-2 w-full text-charcoal placeholder:text-charcoal/40"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-full text-charcoal hover:text-sage hover:bg-sage/10 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-oat/95 backdrop-blur-lg border-b border-sage/20 px-6 pt-4 pb-8 space-y-6">
          <div className="flex items-center bg-white px-4 py-2.5 rounded-full border border-charcoal/10 focus-within:border-sage">
            <Search className="w-4 h-4 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-charcoal placeholder:text-charcoal/40"
            />
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={false}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif text-charcoal/90 hover:text-sage hover:translate-x-2 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
