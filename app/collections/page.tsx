export const dynamic = "force-dynamic";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

export default async function CollectionsPage() {
  const { data: collections } = await supabaseServer
    .from("collections")
    .select("*")
    .order("id");

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Collections
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {collections?.map((collection) => (

            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-white transition"
            >

              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {collection.name}
                </h2>

                <p className="text-zinc-400 mt-3">
                  {collection.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}