"use client";

type Props = {
  selected: string;
  onSelect: (size: string) => void;
};

const sizes = ["M", "L", "XL", "2XL"];

export default function SizeSelector({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="mt-10">

      <h3 className="text-lg font-semibold mb-5">
        Select Size
      </h3>

      <div className="grid grid-cols-4 gap-4">

        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`h-14 rounded-xl border font-semibold text-lg transition-all duration-300 ${
              selected === size
                ? "bg-white text-black border-white"
                : "bg-zinc-900 text-white border-zinc-700 hover:border-white"
            }`}
          >
            {size}
          </button>
        ))}

      </div>

      <p className="mt-5 text-zinc-400 text-sm">
        Selected Size:
        <span className="font-bold text-white ml-2">
          {selected}
        </span>
      </p>

    </div>
  );
}