"use client";

import { useState } from "react";

export default function AddToCart() {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="mt-10">

      <button
        onClick={handleAdd}
        className="
          w-full
          h-16
          rounded-full
          bg-white
          text-black
          text-lg
          font-bold
          transition-all
          duration-300
          hover:bg-zinc-200
          active:scale-95
        "
      >
        {added ? "✓ Added To Cart" : "Add To Cart"}
      </button>

    </div>
  );
}