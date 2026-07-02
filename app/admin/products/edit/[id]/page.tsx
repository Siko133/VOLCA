"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ImageManager from "@/components/admin/ImageManager";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");

  const [collections, setCollections] = useState<any[]>([]);
  const [collectionId, setCollectionId] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      router.push("/admin/products");
      return;
    }

    setName(data.name);
    setPrice(String(data.price));
    setColor(data.color);
    setDescription(data.description);

    setCollectionId(
      data.collection_id
        ? String(data.collection_id)
        : ""
    );

    setImages(data.images || []);

    const res = await fetch("/api/collections");
    const collections = await res.json();

    setCollections(collections);

    setLoading(false);
  }
  function handleSelectImages(files: FileList | null) {
    if (!files) return;

    setNewImages((prev) => [
      ...prev,
      ...Array.from(files),
    ]);
  }

  function handleDeleteImage(image: string) {
    setImages((prev) =>
      prev.filter((img) => img !== image)
    );
  }

  function handleDeleteNewImage(index: number) {
    setNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  async function saveProduct() {
    setSaving(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("description", description);
    formData.append("collection_id", collectionId);

    formData.append(
      "images",
      JSON.stringify(images)
    );

    newImages.forEach((file) => {
      formData.append("newImages", file);
    });

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    setSaving(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Product Updated Successfully ✅");

    router.push("/admin/products");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-black mb-8">
          Edit Product
        </h1>

        <div className="space-y-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-5">
              Product Images
            </h2>

            <ImageManager
              images={images}
              newImages={newImages}
              onDeleteImage={handleDeleteImage}
              onDeleteNewImage={handleDeleteNewImage}
              onSelectImages={handleSelectImages}
            />

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="w-full h-14 px-5 rounded-xl bg-zinc-950 border border-zinc-700 outline-none"
            />

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-14 px-5 rounded-xl bg-zinc-950 border border-zinc-700 outline-none"
            />

            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color"
              className="w-full h-14 px-5 rounded-xl bg-zinc-950 border border-zinc-700 outline-none"
            />

            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              className="w-full h-14 px-5 rounded-xl bg-zinc-950 border border-zinc-700 outline-none"
            >
              <option value="">
                No Collection
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full h-44 p-5 rounded-xl bg-zinc-950 border border-zinc-700 outline-none resize-none"
            />

            <button
              onClick={saveProduct}
              disabled={saving}
              className="w-full h-14 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 disabled:opacity-50 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}