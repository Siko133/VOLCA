import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CollectionPage({
  params,
}: Props) {
  const { slug } = await params;

  const { data: collection } = await supabaseServer
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!collection) {
    notFound();
  }

  const { data: products } = await supabaseServer
    .from("products")
    .select("*")
    .eq("collection_id", collection.id)
    .order("id");

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-3">
          {collection.name}
        </h1>

        <p className="text-zinc-400 mb-10">
          {collection.description}
        </p>

        {products && products.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (

              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-white transition"
              >

                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="p-6">

                  <h2 className="text-xl font-bold">
                    {product.name}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {product.price} EGP
                  </p>

                </div>

              </Link>

            ))}

          </div>

        ) : (

          <div className="text-center text-zinc-500 text-xl mt-20">
            No products in this collection.
          </div>

        )}

      </div>

    </main>
  );
}