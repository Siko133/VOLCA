import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const color = formData.get("color") as string;
    const description = formData.get("description") as string;

    const files = formData.getAll("images") as File[];

    const images: string[] = [];

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
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      images.push(data.publicUrl);
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        price,
        color,
        description,
        images,
      })
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      product: data,
    });

  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const { data: product, error: findError } = await supabase
      .from("products")
      .select("images")
      .eq("id", id)
      .single();

    if (findError) {
      return NextResponse.json(
        { error: findError.message },
        { status: 500 }
      );
    }

    if (product?.images) {
      for (const image of product.images) {
        const fileName = image.split("/").pop();

        if (fileName) {
          await supabase.storage
            .from("products")
            .remove([fileName]);
        }
      }
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}