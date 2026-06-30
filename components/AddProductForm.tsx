"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = Array.from(e.target.files || []);

    setFiles(selected);

    setPreview(
      selected.map((file) => URL.createObjectURL(file))
    );
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("description", description);

    files.forEach((file) => {
      formData.append("images", file);
    });

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to add product");
      return;
    }

    alert("✅ Product Added Successfully");

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className="w-full bg-zinc-900 rounded-xl p-4"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="w-full bg-zinc-900 rounded-xl p-4"
      />

      <input
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Color"
        className="w-full bg-zinc-900 rounded-xl p-4"
      />

      <textarea
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full bg-zinc-900 rounded-xl p-4 resize-none"
      />

      <label className="w-full h-64 bg-white rounded-2xl flex flex-col items-center justify-center cursor-pointer">

        <div className="text-7xl text-black">
          +
        </div>

        <p className="text-black font-bold mt-3">
          Upload Product Images
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={handleImages}
        />

      </label>

      {preview.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {preview.map((image, index) => (
            <div
              key={index}
              className="relative"
            >
              <img
                src={image}
                className="w-full h-40 object-cover rounded-xl"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white"
              >
                ✕
              </button>

            </div>
          ))}

        </div>
      )}

      <button
        disabled={loading}
        className="w-full h-14 rounded-xl bg-white text-black font-bold"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>

    </form>
  );
}