export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-8">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-3xl font-black tracking-[8px] text-white">
          VOLCA
        </h2>

        <p className="text-zinc-500 mt-4">
          Luxury Streetwear Built For Everyday Legends.
        </p>

        <div className="flex justify-center gap-8 mt-6 text-zinc-400">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Contact</a>
        </div>

        <p className="mt-8 text-sm text-zinc-600">
          © 2026 VOLCA. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}