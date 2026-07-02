"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/context/CartContext";
import SearchModal from "@/components/SearchModal";

export default function Navbar() {
  const { totalItems } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto h-20 px-5 md:px-10 flex items-center justify-between">

          {/* Left */}

          <div className="flex items-center gap-5 relative">

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl hover:text-zinc-300 transition"
            >
              ☰
            </button>

            {menuOpen && (
  <div className="absolute top-14 left-0 w-64 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">

    <Link
      href="/"
      onClick={() => setMenuOpen(false)}
      className="block px-5 py-4 hover:bg-zinc-800 transition"
    >
      Home
    </Link>

    <Link
      href="/shop"
      onClick={() => setMenuOpen(false)}
      className="block px-5 py-4 hover:bg-zinc-800 transition"
    >
      Shop
    </Link>

    <Link
      href="/collections"
      onClick={() => setMenuOpen(false)}
      className="block px-5 py-4 hover:bg-zinc-800 transition"
    >
      Collections
    </Link>

    <Link
      href="/about"
      onClick={() => setMenuOpen(false)}
      className="block px-5 py-4 hover:bg-zinc-800 transition"
    >
      About
    </Link>

    <a
      href="https://wa.me/201017516709"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => setMenuOpen(false)}
      className="block px-5 py-4 hover:bg-zinc-800 transition"
    >
      Contact
    </a>

    <div className="border-t border-zinc-800" />

    <Link
      href="/login"
      onClick={() => setMenuOpen(false)}
      className="block px-5 py-4 hover:bg-zinc-800 transition"
    >
      👤 Admin Login
    </Link>

  </div>
)}

            <Link
              href="/"
              className="text-3xl md:text-5xl font-black tracking-[8px] md:tracking-[10px] hover:opacity-80 transition"
            >
              VOLCA
            </Link>

          </div>

          {/* Desktop Menu */}

          <nav className="hidden md:flex items-center gap-12">

            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[3px] hover:text-zinc-300 transition"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="text-sm font-semibold uppercase tracking-[3px] hover:text-zinc-300 transition"
            >
              Shop
            </Link>

            <Link
              href="/collections"  
              className="text-sm font-semibold uppercase tracking-[3px] hover:text-zinc-300 transition"
            >
              Collections
            </Link>

            <Link
              href="/about"
              className="text-sm font-semibold uppercase tracking-[3px] hover:text-zinc-300 transition"
            >
              About
            </Link>

            <a
              href="https://wa.me/201017516709"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold uppercase tracking-[3px] hover:text-zinc-300 transition"
            >
              Contact
            </a>

          </nav>

          {/* Right Icons */}

          <div className="flex items-center gap-5 text-2xl">

            <button
              onClick={() => setSearchOpen(true)}
              className="hover:scale-110 transition"
            >
              🔍
            </button>

            <Link
              href="/cart"
              className="relative hover:scale-110 transition"
            >
              🛒

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-black text-[11px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

          </div>

        </div>
      </header>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}