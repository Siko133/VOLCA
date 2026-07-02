import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("collections")
    .select("*")
    .order("id");

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
    const slug = formData.get("slug")?.toString() || "";
    const description =
      formData.get("description")?.toString() || "";

    const file = formData.get("image") as File | null;

    let image = "";

    if (file && file.size > 0) {
      const fileName = `${Date.now()}-${crypto.randomUUID()}-${file.name}`;

      const { error: uploadError } =
        await supabaseServer.storage
          .from("collections")
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
        .from("collections")
        .getPublicUrl(fileName);

      image = data.publicUrl;
    }

    const { data, error } = await supabaseServer
      .from("collections")
      .insert({
        name,
        slug,
        description,
        image,
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Collection id is required" },
        { status: 400 }
      );
    }

    // فصل المنتجات عن الكولكشن
    const { error: updateError } = await supabaseServer
      .from("products")
      .update({ collection_id: null })
      .eq("collection_id", Number(id));

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    // حذف الكولكشن
    const { error: deleteError } = await supabaseServer
      .from("collections")
      .delete()
      .eq("id", Number(id));

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
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