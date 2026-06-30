"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const color = formData.get("color") as string;
  const description = formData.get("description") as string;

  const files = formData.getAll("images") as File[];

  const imageUrls: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(
        fileName,
        Buffer.from(await file.arrayBuffer()),
        {
          contentType: file.type,
        }
      );

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    imageUrls.push(data.publicUrl);
  }

  const { error } = await supabase
    .from("products")
    .insert({
      name,
      price,
      color,
      description,
      images: imageUrls,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
}