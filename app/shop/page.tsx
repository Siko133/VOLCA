import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/Productcard";

const products = [
  {
    id: 1,
    name: "VOLCA Shadow Tee",
    description: "Small details. Timeless attitude.",
    price: 600,
    image1: "/images/shirt1.jpeg",
    image2: "/images/shirt1.jpeg",
  },
  {
    id: 2,
    name: "VOLCA Essential Tee",
    description: "Built for everyday legends.",
    price: 600,
    image1: "/images/shirt2.jpeg",
    image2: "/images/shirt2.jpeg",
  },
  {
    id: 3,
    name: "VOLCA Signature Tee",
    description: "Crafted for those who never follow the crowd.",
    price: 600,
    image1: "/images/shirt3.jpeg",
    image2: "/images/shirt3.jpeg",
  },
  {
    id: 4,
    name: "VOLCA Core Tee",
    description: "Minimal look. Maximum presence.",
    price: 600,
    image1: "/images/shirt4.jpeg",
    image2: "/images/shirt4.jpeg",
  },
  {
    id: 5,
    name: "VOLCA Classic Tee",
    description: "Luxury made simple.",
    price: 600,
    image1: "/images/shirt5.jpeg",
    image2: "/images/shirt5.jpeg",
  },
  {
    id: 6,
    name: "VOLCA Oversized Tee",
    description: "Designed for everyday legends.",
    price: 600,
    image1: "/images/shirt6.jpeg",
    image2: "/images/shirt6back.jpeg",
  },
  {
    id: 7,
    name: "VOLCA Premium Tee",
    description: "Streetwear with purpose.",
    price: 600,
    image1: "/images/shirt7.jpeg",
    image2: "/images/shirt7back.jpeg",
  },
  {
    id: 8,
    name: "VOLCA Urban Tee",
    description: "Less noise. More style.",
    price: 600,
    image1: "/images/shirt8.jpeg",
    image2: "/images/shirt8.jpeg",
  },
  {
    id: 9,
    name: "VOLCA Black Edition",
    description: "Made to stand out.",
    price: 600,
    image1: "/images/shirt9.jpeg",
    image2: "/images/shirt9.jpeg",
  },
  {
    id: 10,
    name: "VOLCA Limited Tee",
    description: "Elevate your everyday fit.",
    price: 600,
    image1: "/images/shirt10.jpeg",
    image2: "/images/shirt10.jpeg",
  },
  {
    id: 11,
    name: "VOLCA Icon Tee",
    description: "Wear confidence.",
    price: 600,
    image1: "/images/shirt11.jpeg",
    image2: "/images/shirt11back.jpeg",
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        <div className="text-center mb-14">
          <h1 className="text-5xl font-black tracking-[8px]">
            SHOP
          </h1>

          <p className="text-zinc-400 mt-4">
            Discover the latest VOLCA Collection.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>

      <Footer />
    </main>
  );
}