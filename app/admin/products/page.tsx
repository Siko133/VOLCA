"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  price: number;
  color: string;
  description: string;
  images: string[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setProducts(data as Product[]);
    }
  }

  async function deleteProduct(id: number) {
    const ok = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!ok) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );

    alert("Product Deleted Successfully ✅");
  }

  return (
    <main className="min-h-screen bg-black text-white p-5 md:p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-3xl md:text-4xl font-black">
            Products
          </h1>

          <p className="text-zinc-400 mt-1">
            {products.length} Products
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-3 h-12 md:h-14 px-8 rounded-2xl bg-white text-black font-bold text-sm md:text-base hover:bg-zinc-200 active:scale-95 transition"
        >
          <span className="text-2xl leading-none">
            +
          </span>

          <span>
            Add Product
          </span>

        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
          >

            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-72 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {product.name}
              </h2>

              <p className="text-zinc-400 mt-2">
                {product.color}
              </p>

              <p className="text-2xl font-bold mt-4">
                {product.price} EGP
              </p>

              <div className="flex gap-3 mt-6">

                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-xl font-semibold transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
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