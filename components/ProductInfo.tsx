"use client";

import { useState } from "react";
import SizeSelector from "./SizeSelector";
import AddToCart from "./AddToCart";

type Props = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
};

export default function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState("L");

  return (
    <div className="mt-14">

      <h1 className="text-4xl font-black leading-tight">
        {product.name}
      </h1>

      <p className="text-3xl font-bold mt-6">
        {product.price} EGP
      </p>

      <p className="text-zinc-400 text-lg leading-8 mt-8">
        {product.description}
      </p>

      <SizeSelector
        selected={selectedSize}
        onSelect={setSelectedSize}
      />

      <AddToCart
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.images[0]}
        size={selectedSize}
      />

      <div className="mt-20 border-t border-zinc-800 pt-12">

        <h2 className="text-2xl font-bold mb-8">
          Product Details
        </h2>

        <div className="space-y-6 text-zinc-400 leading-8">

          <p>Premium oversized streetwear.</p>

          <p>100% Cotton.</p>

          <p>Heavyweight Fabric.</p>

          <p>Designed exclusively by VOLCA.</p>

        </div>

      </div>

    </div>
  );
}