import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import EditProductForm from "@/components/EditProductForm";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-black mb-10">
        Edit Product
      </h1>

      <EditProductForm product={product} />
    </main>
  );
}