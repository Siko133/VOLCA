"use client";

import { useState } from "react";

type Product = {
  name: string;
  description: string;
  price: number;
  image1: string;
  image2: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="max-w-[240px] mx-auto bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-white transition-all duration-300 hover:scale-[1.03]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={hover ? product.image2 : product.image1}
        alt={product.name}
        className="w-full h-[260px] object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">
          {product.name}
        </h2>

        <p className="text-zinc-400 text-sm mt-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">
            {product.price} EGP
          </span>

          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}