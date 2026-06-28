import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-8xl font-bold tracking-widest">
        VOLCA
      </h1>

      <p className="mt-6 text-xl text-gray-400">
        Premium Streetwear
      </p>

      <Link href="/shop">
        <button className="mt-10 px-10 py-4 bg-white text-black rounded-full font-bold">
          SHOP NOW
        </button>
      </Link>
    </main>
  );
}