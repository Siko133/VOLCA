"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCollectionPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadCollection();
  }, []);

  async function loadCollection() {
    const res = await fetch(`/api/collections/${params.id}`);
    const data = await res.json();

    setName(data.name);
    setSlug(data.slug);
    setDescription(data.description || "");

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/collections/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug,
        description,
      }),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    alert("Collection Updated ✅");

    router.push("/admin/collections");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-black mb-8">
          Edit Collection
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 border border-zinc-800"
            placeholder="Collection Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 border border-zinc-800"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <textarea
            className="w-full h-40 p-5 rounded-xl bg-zinc-900 border border-zinc-800"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="w-full h-14 rounded-xl bg-white text-black font-bold"
          >
            Save Changes
          </button>

        </form>

      </div>

    </main>
  );
}