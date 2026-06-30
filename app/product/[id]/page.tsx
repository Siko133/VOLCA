import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import SizeSelector from "@/components/SizeSelector";
import AddToCart from "@/components/AddToCart";
import { products } from "@/data/products";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-black text-white min-h-screen">

      <Navbar />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24">

        {/* Product Image */}

        <ProductGallery
          images={product.images}
          name={product.name}
        />

        {/* Product Info */}

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

          <SizeSelector />

          <AddToCart />

        </div>

        {/* Product Details */}

        <div className="mt-20 border-t border-zinc-800 pt-12">

          <h2 className="text-2xl font-bold mb-8">
            Product Details
          </h2>

          <div className="space-y-6 text-zinc-400 leading-8">

            <p>
              Premium oversized streetwear
              designed for everyday legends.
            </p>

            <p>
              Heavyweight 100% Cotton.
            </p>

            <p>
              Soft premium feel with
              oversized fit.
            </p>

            <p>
              Designed exclusively by VOLCA.
            </p>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}