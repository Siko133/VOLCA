import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const color = formData.get("color") as string;
    const description = formData.get("description") as string;

    const oldImages = JSON.parse(
      (formData.get("images") as string) || "[]"
    ) as string[];

    const newFiles = formData.getAll("newImages") as File[];

    const uploadedImages: string[] = [];

    for (const file of newFiles) {
      if (file.size === 0) continue;

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
          {
            error: error.message,
          },
          {
            status: 500,
          }
        );
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      uploadedImages.push(data.publicUrl);
    }

    const images = [
      ...oldImages,
      ...uploadedImages,
    ];
    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
        color,
        description,
        images,
      })
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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