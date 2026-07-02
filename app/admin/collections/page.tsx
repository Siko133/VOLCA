"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Collection = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    loadCollections();
  }, []);

  async function loadCollections() {
    const res = await fetch("/api/collections");
    const data = await res.json();
    setCollections(data);
  }

  async function deleteCollection(id: number) {
  if (!confirm("Delete this collection?")) return;

  const res = await fetch(`/api/collections?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  console.log(data);

  if (!res.ok) {
    alert(data.error);
    return;
  }

  loadCollections();
}

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-black">
            Collections
          </h1>

          <p className="text-zinc-400 mt-2">
            {collections.length} Collections
          </p>

        </div>

        <Link
          href="/admin/collections/new"
          className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition"
        >
          + Add Collection
        </Link>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {collections.map((collection) => (

          <div
            key={collection.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
          >

            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {collection.name}
              </h2>

              <p className="text-zinc-400 mt-3">
                {collection.description}
              </p>

              <p className="text-sm mt-4 text-zinc-500">
                /{collection.slug}
              </p>

              <div className="flex gap-3 mt-6">

                 <Link
                href={`/admin/collections/${collection.id}/edit`}
                 className="flex-1 text-center bg-white text-black py-3 rounded-xl font-bold hover:bg-zinc-200"
                 >
                   Edit
                 </Link>
                <button
                  onClick={() =>
                    deleteCollection(collection.id)
                  }
                  className="flex-1 h-11 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}