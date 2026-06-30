import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminProducts() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("id");

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-black">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-white text-black px-6 py-3 rounded-xl font-bold"
        >
          + Add Product
        </Link>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden"
          >
            <img
              src={product.images[0]}
              className="w-full h-72 object-cover"
            />

            <div className="p-5">

              <h2 className="font-bold text-xl">
                {product.name}
              </h2>

              <p className="text-zinc-400 mt-2">
                {product.price} EGP
              </p>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}
