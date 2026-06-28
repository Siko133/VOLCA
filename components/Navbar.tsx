import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">

        <Link
          href="/"
          className="text-4xl font-black tracking-[10px]"
        >
          VOLCA
        </Link>

        <div className="hidden md:flex gap-10 text-sm uppercase tracking-widest">

          <Link href="/">Home</Link>

          <Link href="/shop">Shop</Link>

          <Link href="#">Collections</Link>

          <Link href="#">About</Link>

          <Link href="#">Contact</Link>

        </div>

        <div className="flex gap-6 text-2xl">

          <button>🔍</button>

          <button>🛒</button>

        </div>

      </div>

    </nav>
  );
}