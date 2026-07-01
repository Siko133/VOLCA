"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("description", description);

    if (images) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Product Added Successfully ✅");

    router.push("/admin/products");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-5"
      >
        <input
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <textarea
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 h-40"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <button
          disabled={loading}
          className="bg-white text-black px-8 py-4 rounded-xl font-bold"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </main>
  );
}