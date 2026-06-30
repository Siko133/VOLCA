"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (images.length <= 1) return;

    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full">

      {/* Main Image */}

      <div
        onClick={nextImage}
        className="relative w-full aspect-square bg-[#f6f6f6] rounded-xl overflow-hidden cursor-pointer"
      >
        <Image
          src={images[currentImage]}
          alt={name}
          fill
          priority
          className="object-contain p-6"
        />
      </div>

      {/* Dots */}

      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentImage === index
                  ? "bg-white"
                  : "bg-zinc-600"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}