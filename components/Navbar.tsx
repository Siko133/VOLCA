"use client";

import Link from "next/link";
import { useCart } from "@/components/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto h-20 px-5 md:px-10 flex items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="text-3xl md:text-5xl font-black tracking-[8px] md:tracking-[10px] hover:opacity-80 transition"
        >
          VOLCA
        </Link>

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
            href="#"
            className="text-sm font-semibold uppercase tracking-[3px] hover:text-zinc-300 transition"
          >
            Collections
          </Link>

          <Link
            href="#"
            className="text-sm font-semibold uppercase tracking-[3px] hover:text-zinc-300 transition"
          >
            About
          </Link>

          <Link
            href="#"
            className="text-sm font-semibold uppercase tracking-[3px] hover:text-zinc-300 transition"
          >
            Contact
          </Link>

        </nav>

        {/* Right Icons */}

        <div className="flex items-center gap-5 text-2xl">

          <button className="hover:scale-110 transition">
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
  );
}