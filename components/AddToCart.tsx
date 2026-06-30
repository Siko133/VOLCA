"use client";

import { useState } from "react";
import { useCart } from "@/components/context/CartContext";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
};

export default function AddToCart({
  id,
  name,
  price,
  image,
  size,
}: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id,
      name,
      price,
      image,
      size,
      quantity: 1,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="mt-10">

      <button
        onClick={handleAdd}
        className="w-full h-16 rounded-full bg-white text-black text-lg font-bold transition-all duration-300 hover:bg-zinc-200 active:scale-95"
      >
        {added ? "✓ Added To Cart" : "Add To Cart"}
      </button>

    </div>
  );
}