import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "./Productcard";

export default function FeaturedProducts() {
  return (
    <section className="bg-black text-white py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">

          <p className="uppercase tracking-[8px] text-zinc-500 text-sm">
            NEW COLLECTION
          </p>

          <h2 className="text-5xl md:text-6xl font-black mt-6">
            Featured Products
          </h2>

          <p className="text-zinc-400 mt-6 max-w-2xl mx-auto leading-8">
            Discover our newest oversized streetwear pieces,
            designed for everyday legends.
          </p>

        </div>

        {/* Products */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">

          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

        {/* Button */}

        <div className="flex justify-center mt-20">

          <Link href="/shop">

            <button className="px-10 h-14 rounded-full border border-white hover:bg-white hover:text-black transition font-bold tracking-[2px]">
              VIEW ALL PRODUCTS
            </button>

          </Link>

        </div>

      </div>
    </section>
  );
}