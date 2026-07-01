"use client";

import Image from "next/image";
import { useMemo } from "react";

type ImageManagerProps = {
  images: string[];
  newImages: File[];
  onDeleteImage: (image: string) => void;
  onDeleteNewImage: (index: number) => void;
  onSelectImages: (files: FileList | null) => void;
};

export default function ImageManager({
  images,
  newImages,
  onDeleteImage,
  onDeleteNewImage,
  onSelectImages,
}: ImageManagerProps) {
  const previews = useMemo(() => {
    return newImages.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [newImages]);

  return (
    <div className="space-y-6">

      {(images.length > 0 || previews.length > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {images.map((image) => (
            <div
              key={image}
              className="relative overflow-hidden rounded-2xl border border-zinc-800 group"
            >
              <Image
                src={image}
                alt=""
                width={500}
                height={500}
                className="w-full aspect-square object-cover"
              />

              <button
                type="button"
                onClick={() => onDeleteImage(image)}
                className="absolute top-2 right-2 w-9 h-9 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>

            </div>
          ))}

          {previews.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border-2 border-green-500 group"
            >
              <Image
                src={item.url}
                alt=""
                width={500}
                height={500}
                className="w-full aspect-square object-cover"
              />

              <span className="absolute left-2 top-2 bg-green-600 text-xs px-2 py-1 rounded">
                NEW
              </span>

              <button
                type="button"
                onClick={() => onDeleteNewImage(index)}
                className="absolute top-2 right-2 w-9 h-9 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>

            </div>
          ))}

        </div>
      )}

      <label className="flex items-center justify-center h-36 rounded-2xl border-2 border-dashed border-zinc-700 hover:border-white cursor-pointer transition">

        <div className="text-center">

          <p className="text-4xl">
            📷
          </p>

          <p className="mt-2 font-bold">
            Add Images
          </p>

          <p className="text-zinc-500 text-sm">
            JPG • PNG • WEBP
          </p>

        </div>

        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => onSelectImages(e.target.files)}
        />

      </label>

    </div>
  );
}