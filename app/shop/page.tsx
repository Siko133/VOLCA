"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/Productcard";
import { supabase } from "@/lib/supabase";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setProducts(data || []);
    }

    getProducts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-black tracking-[8px]">
            SHOP
          </h1>

          <p className="text-zinc-400 mt-4">
            Discover the latest VOLCA Collection.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}