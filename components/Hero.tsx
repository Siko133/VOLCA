import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center text-white">

      <div className="text-center px-6 max-w-5xl">

        {/* Top Text */}

        <p className="uppercase tracking-[8px] text-zinc-500 text-xs md:text-sm mb-8">
          PREMIUM STREETWEAR
        </p>

        {/* Logo */}

        <h1 className="text-7xl md:text-[170px] font-black tracking-[16px] leading-none mb-20">
          VOLCA
        </h1>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-center gap-5">

          <Link href="/shop">
            <button className="w-60 h-14 rounded-full bg-white text-black font-bold text-sm tracking-[2px] hover:scale-105 transition duration-300">
              SHOP NOW
            </button>
          </Link>

          <Link href="/shop">
            <button className="w-60 h-14 rounded-full border border-white font-bold text-sm tracking-[2px] hover:bg-white hover:text-black transition duration-300">
              VIEW COLLECTION
            </button>
          </Link>

        </div>

        {/* Description */}

        <div className="mt-20 space-y-3">

          <div className="w-20 h-[1px] bg-zinc-700 mx-auto mb-8"></div>

          <p className="text-zinc-400 text-sm md:text-base leading-8">
            Small details make the biggest difference.
          </p>

          <p className="text-zinc-500 text-sm leading-7">
            Crafted for those who never follow the crowd.
          </p>

        </div>

      </div>

    </section>
  );
}