import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // جلب صور المنتج
    const { data: product, error: findError } = await supabase
      .from("products")
      .select("images")
      .eq("id", id)
      .single();

    if (findError) {
      return NextResponse.json(
        { error: findError.message },
        { status: 404 }
      );
    }

    // حذف الصور من Storage
    if (product?.images?.length) {
      const files = product.images
        .map((url: string) => {
          try {
            return decodeURIComponent(
              url.split("/storage/v1/object/public/products/")[1]
            );
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (files.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("products")
          .remove(files as string[]);

        if (storageError) {
          console.error("Storage Error:", storageError.message);
        }
      }
    }

    // حذف المنتج من قاعدة البيانات
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
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message ?? "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}