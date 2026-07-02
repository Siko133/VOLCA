import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  context: Context
) {
  const { id } = await context.params;

  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  context: Context
) {
  const { id } = await context.params;

  const { error } = await supabaseServer
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
}

export async function PUT(
  req: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const price = Number(formData.get("price"));
    const color = formData.get("color")?.toString() || "";
    const description =
      formData.get("description")?.toString() || "";

    const oldImages = JSON.parse(
      formData.get("images")?.toString() || "[]"
    ) as string[];

    const files = formData.getAll("newImages") as File[];

    const uploaded: string[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const fileName =
        `${Date.now()}-${crypto.randomUUID()}-${file.name}`;

      const { error: uploadError } =
        await supabaseServer.storage
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

      const { data } = supabaseServer.storage
        .from("products")
        .getPublicUrl(fileName);

      uploaded.push(data.publicUrl);
    }

    const { error } = await supabaseServer
      .from("products")
      .update({
        name,
        price,
        color,
        description,
        images: [...oldImages, ...uploaded],
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

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}