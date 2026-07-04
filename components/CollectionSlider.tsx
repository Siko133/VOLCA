"use client";

import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

export default function CollectionSlider({
  images,
  alt,
}: Props) {
  const [current, setCurrent] = useState(0);

  function nextImage(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (images.length <= 1) return;

    setCurrent((prev) => (prev + 1) % images.length);
  }

  return (
    <div
      onClick={nextImage}
      className="relative cursor-pointer"
    >
      <img
        src={images[current]}
        alt={alt}
        className="w-full h-80 object-cover transition-all duration-300"
      />

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition ${
                current === index
                  ? "bg-white"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}