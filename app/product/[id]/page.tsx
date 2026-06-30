import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import { products } from "@/data/products";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: Props) {
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

        <ProductGallery
          images={product.images}
          name={product.name}
        />

        <ProductInfo product={product} />

      </section>

      <Footer />

    </main>
  );
}