import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const color = formData.get("color") as string;
    const description = formData.get("description") as string;

    const files = formData.getAll("images") as File[];

    const imageUrls: string[] = [];

    for (const file of files) {
      if (file.size === 0) continue;

      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, Buffer.from(await file.arrayBuffer()), {
          contentType: file.type,
        });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrls.push(data.publicUrl);
    }

    const { error } = await supabase.from("products").insert({
      name,
      price,
      color,
      description,
      images: imageUrls,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}