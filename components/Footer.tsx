import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <h2 className="text-5xl md:text-6xl font-black tracking-[12px]">
            VOLCA
          </h2>

          <p className="text-zinc-500 mt-6 text-base leading-8 max-w-xl mx-auto">
            Luxury Streetwear Built For Everyday Legends.
          </p>

        </div>

        <div className="flex justify-center gap-10 mt-14 flex-wrap">

          <Link
            href="https://www.instagram.com/volca930"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition duration-300"
          >
            Instagram
          </Link>

          <Link
            href="https://www.tiktok.com/@volca448"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition duration-300"
          >
            TikTok
          </Link>

          <Link
            href="https://wa.me/201017516709"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition duration-300"
          >
            WhatsApp
          </Link>

        </div>

        <div className="w-full h-px bg-zinc-800 my-14"></div>

        <p className="text-center text-zinc-600 text-sm tracking-wide">
          © 2026 VOLCA. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}