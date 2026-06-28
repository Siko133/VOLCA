import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center text-white">

      <div className="text-center px-6 max-w-4xl">

        {/* Logo */}
        <h1 className="text-7xl md:text-[150px] font-black tracking-[14px] leading-none">
          VOLCA
        </h1>

        {/* Subtitle */}
        <p className="uppercase tracking-[8px] text-zinc-500 text-sm mt-2">
          PREMIUM STREETWEAR
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-28 mb-24">
          <Link href="/shop">
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition duration-300">
              SHOP NOW
            </button>
          </Link>

          <Link href="/shop">
            <button className="border border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition duration-300">
              VIEW COLLECTION
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div className="w-16 h-[2px] bg-zinc-700 mx-auto mb-10"></div>

        {/* Description */}
        <p className="text-sm md:text-base text-zinc-400 leading-7">
          Small details make the biggest difference.
        </p>

        <p className="mt-2 text-xm md:text-sm text-zinc-500">
          Crafted for those who never follow the crowd.
        </p>

      </div>

    </section>
  );
}