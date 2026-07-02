"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCollectionPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("/api/collections", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Collection Added ✅");

    router.push("/admin/collections");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-black mb-8">
          Add Collection
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            className="w-full h-14 rounded-xl bg-zinc-900 px-4"
            placeholder="Collection Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="w-full h-14 rounded-xl bg-zinc-900 px-4"
            placeholder="Slug"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value)
            }
          />

          <textarea
            className="w-full h-40 rounded-xl bg-zinc-900 p-4"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="w-48 rounded-xl"
              alt=""
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
          />

          <button
            disabled={loading}
            className="w-full h-14 bg-white text-black rounded-xl font-bold"
          >
            {loading
              ? "Saving..."
              : "Save Collection"}
          </button>

        </form>

      </div>

    </main>
  );
}