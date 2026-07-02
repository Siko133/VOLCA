import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  req: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const price = Number(formData.get("price") || 0);
    const color = formData.get("color")?.toString() || "";
    const description = formData.get("description")?.toString() || "";

    const oldImages = JSON.parse(
      formData.get("images")?.toString() || "[]"
    ) as string[];

    const newFiles = formData.getAll("newImages") as File[];

    const uploadedImages: string[] = [];

    for (const file of newFiles) {
      if (!file || file.size === 0) continue;

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

      uploadedImages.push(data.publicUrl);
    }

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
        color,
        description,
        images: [...oldImages, ...uploadedImages],
      })
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

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}