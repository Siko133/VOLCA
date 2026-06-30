import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { products } from "../data/products";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const STORAGE_URL =
  `${process.env.SUPABASE_URL}/storage/v1/object/public/products`;

const formattedProducts = products.map((product) => ({
  ...product,
  images: product.images.map((image) => {
    const fileName = image.replace("/images/", "");
    return `${STORAGE_URL}/${fileName}`;
  }),
}));

async function seed() {
  await supabase.from("products").delete().neq("id", 0);

  const { error } = await supabase
    .from("products")
    .insert(formattedProducts);

  if (error) {
    console.error(error);
  } else {
    console.log("✅ Products Updated Successfully");
  }
}

seed();