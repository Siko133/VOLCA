import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const price = Number(formData.get("price"));
    const color = formData.get("color")?.toString() || "";
    const description =
      formData.get("description")?.toString() || "";

    const files = formData.getAll("images") as File[];

    const imageUrls: string[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const fileName =
        `${Date.now()}-${Math.random()}-${file.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("products")
          .upload(
            fileName,
            Buffer.from(await file.arrayBuffer()),
            {
              contentType: file.type,
            }
          );

      if (uploadError) {
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrls.push(data.publicUrl);
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        price,
        color,
        description,
        images: imageUrls,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}