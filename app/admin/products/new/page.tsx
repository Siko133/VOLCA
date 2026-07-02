"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");

  const [collections, setCollections] = useState<any[]>([]);
  const [collectionId, setCollectionId] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCollections() {
      const res = await fetch("/api/collections");
      const data = await res.json();

      setCollections(data);
    }

    loadCollections();
  }, []);

  function handleImages(files: FileList | null) {
    if (!files) return;

    setImages((prev) => [
      ...prev,
      ...Array.from(files),
    ]);
  }

  function removeImage(index: number) {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("description", description);
    formData.append("collection_id", collectionId);
    images.forEach((file) => {
      formData.append("images", file);
    });

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
    <main className="min-h-screen bg-black text-white p-5 md:p-8">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-black mb-8">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-white"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-white"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-white"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <select
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="w-full h-14 px-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none focus:border-white"
          >
            <option value="">
              Select Collection
            </option>

            {collections.map((collection) => (
              <option
                key={collection.id}
                value={collection.id}
              >
                {collection.name}
              </option>
            ))}
          </select>

          <textarea
            className="w-full h-40 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none resize-none focus:border-white"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {images.map((file, index) => (

                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden border border-zinc-800"
                >

                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-full aspect-square object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    ✕
                  </button>

                </div>

              ))}

            </div>
          )}

          <label className="w-full h-16 rounded-2xl bg-white text-black flex items-center justify-center gap-3 font-bold cursor-pointer hover:bg-zinc-200 transition">

            <span className="text-2xl">+</span>

            <span>Add Photos</span>

            <input
              hidden
              multiple
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImages(e.target.files)
              }
            />

          </label>

          <button
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Product"}
          </button>

        </form>

      </div>

    </main>
  );
}