import AddProductForm from "@/components/AddProductForm";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-black mb-10">
        Add Product
      </h1>

      <AddProductForm />

    </main>
  );
}