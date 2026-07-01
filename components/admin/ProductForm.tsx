"use client";

import { useState } from "react";

type ProductFormProps = {
  initialData?: {
    name: string;
    price: number;
    color: string;
    description: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
};

export default function ProductForm({
  initialData,
  onSubmit,
  loading = false,
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(
    initialData?.price?.toString() || ""
  );
  const [color, setColor] = useState(initialData?.color || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [images, setImages] = useState<FileList | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

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

    await onSubmit(formData);
  }

  return (
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
  );
}