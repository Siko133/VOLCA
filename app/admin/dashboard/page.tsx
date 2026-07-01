"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
      }
    }

    checkUser();
  }, [router, supabase]);

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <header className="border-b border-zinc-800 px-8 py-6 flex justify-between items-center">

        <h1 className="text-3xl font-black">
          VOLCA Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl font-bold transition"
        >
          Logout
        </button>

      </header>

      <section className="max-w-7xl mx-auto p-8">

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            href="/admin/products"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-white hover:scale-[1.02] transition cursor-pointer"
          >
            <h2 className="text-xl font-bold">Products</h2>
            <p className="text-zinc-400 mt-2">
              Manage all products.
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-white hover:scale-[1.02] transition cursor-pointer"
          >
            <h2 className="text-xl font-bold">Orders</h2>
            <p className="text-zinc-400 mt-2">
              Coming Soon
            </p>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-white hover:scale-[1.02] transition cursor-pointer"
          >
            <h2 className="text-xl font-bold">Analytics</h2>
            <p className="text-zinc-400 mt-2">
              Coming Soon
            </p>
          </Link>

        </div>

      </section>

    </main>
  );
}