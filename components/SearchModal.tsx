"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
};

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!open) return;

    async function load() {
      const { data } = await supabase
        .from("products")
        .select("id,name")
        .ilike("name", `%${search}%`);

      setProducts(data || []);
    }

    load();
  }, [search, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[999] flex justify-center items-start pt-32">

      <div className="w-full max-w-2xl px-6">

        <input
          autoFocus
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-16 rounded-xl bg-zinc-900 border border-zinc-700 px-6 text-white text-lg"
        />

        <div className="mt-6 bg-zinc-900 rounded-xl">

          {products.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              onClick={onClose}
              className="block px-6 py-4 border-b border-zinc-800 hover:bg-zinc-800"
            >
              {item.name}
            </Link>
          ))}

          {products.length === 0 && (
            <p className="text-zinc-500 p-6">
              No products found.
            </p>
          )}

        </div>

        <button
          onClick={onClose}
          className="mt-6 text-zinc-400 hover:text-white"
        >
          ✕ Close
        </button>

      </div>

    </div>
  );
}
