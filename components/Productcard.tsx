"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  id: number
  name: string;
  description: string;
  price: number;
  images: string[];
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(false);

  const nextImage = () => {
    if (product.images.length <= 1) return;

    setFade(true);

    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
      setFade(false);
    }, 180);
  };

  return (
  
  <Link href={`/product/${product.id}`}>
    <div className="max-w-[240px] mx-auto bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-white transition-all duration-300 hover:shadow-2xl">

      {/* Product Image */}
      <div
        onClick={nextImage}
        className="relative cursor-pointer overflow-hidden"
      >
        <img
          src={product.images[currentImage]}
          alt={product.name}
          draggable={false}
          className={`w-full h-[260px] object-cover select-none transition-all duration-300 ${
            fade
              ? "opacity-0 scale-95"
              : "opacity-100 scale-100"
          }`}
        />

        {/* Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">

            {product.images.map((_, index) => (
              <div
                key={index}
                className={`rounded-full transition-all duration-300 ${
                  currentImage === index
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/40"
                }`}
              />
            ))}

          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">

        <h2 className="text-lg font-bold">
          {product.name}
        </h2>

        <p className="text-zinc-400 text-sm mt-2 min-h-[42px] leading-6">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-xl font-bold">
            {product.price} EGP
          </span>

          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition">
            Add
          </button>

        </div>

      </div>

    </div>
    </Link>
  );
}