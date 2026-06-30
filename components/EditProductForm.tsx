"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductForm({
  product,
}: {
  product: any;
}) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [color, setColor] = useState(product.color);
  const [description, setDescription] = useState(
    product.description
  );

  const [images, setImages] = useState<string[]>(
    product.images || []
  );

  const [newImages, setNewImages] = useState<File[]>([]);

  const [preview, setPreview] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  function removeOldImage(index: number) {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  function handleNewImages(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(e.target.files || []);

    setNewImages(files);

    setPreview(
      files.map((file) =>
        URL.createObjectURL(file)
      )
    );
  }
  async function handleSave(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", String(price));
    formData.append("color", color);
    formData.append("description", description);

    formData.append(
      "oldImages",
      JSON.stringify(images)
    );

    newImages.forEach((file) => {
      formData.append("images", file);
    });

    const res = await fetch(
      `/api/products/${product.id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to update product");
      return;
    }

    alert("✅ Product Updated");

    router.push("/admin/products");

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSave}
      className="max-w-2xl space-y-6"
    >

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Product Name"
        className="w-full bg-zinc-900 rounded-xl p-4"
      />

      <input
        type="number"
        value={price}
        onChange={(e) =>
          setPrice(Number(e.target.value))
        }
        placeholder="Price"
        className="w-full bg-zinc-900 rounded-xl p-4"
      />

      <input
        value={color}
        onChange={(e) =>
          setColor(e.target.value)
        }
        placeholder="Color"
        className="w-full bg-zinc-900 rounded-xl p-4"
      />

      <textarea
        rows={5}
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Description"
        className="w-full bg-zinc-900 rounded-xl p-4 resize-none"
      />

      <h2 className="text-xl font-bold">
        Current Images
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {images.map((image, index) => (

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
              onClick={() =>
                removeOldImage(index)
              }
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white"
            >
              ✕
            </button>

          </div>

        ))}

      </div>

      <label className="w-full h-56 bg-white rounded-2xl flex flex-col justify-center items-center cursor-pointer">

        <div className="text-6xl text-black">
          +
        </div>

        <p className="text-black font-bold mt-3">
          Upload New Images
        </p>

        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleNewImages}
        />

      </label>

      {preview.length > 0 && (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {preview.map((image, index) => (

            <img
              key={index}
              src={image}
              className="w-full h-40 object-cover rounded-xl"
            />

          ))}

        </div>

      )}

      <button
        disabled={loading}
        className="w-full h-14 rounded-xl bg-white text-black font-bold"
      >
        {loading
          ? "Saving..."
          : "Save Changes"}
      </button>

    </form>
  );
}