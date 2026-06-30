"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    setProducts(data || []);
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function deleteProduct(id: number) {
    const ok = confirm("Delete this product?");

    if (!ok) return;

    setLoading(true);

    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));

    alert("✅ Product Deleted");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-black">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-white text-black px-6 py-3 rounded-xl font-bold"
        >
          + Add Product
        </Link>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
          >

            <img
              src={product.images?.[0]}
              className="w-full h-72 object-cover"
            />

            <div className="p-5">

              <h2 className="font-bold text-xl">
                {product.name}
              </h2>

              <p className="text-zinc-400 mt-2">
                {product.price} EGP
              </p>

              <div className="flex gap-3 mt-5">

                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
                >
                  Edit
                </button>

                <button
                  disabled={loading}
                  onClick={() => deleteProduct(product.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}