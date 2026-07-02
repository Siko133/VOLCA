import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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

    // حذف الصور من Supabase Storage فقط
    if (product?.images?.length) {
      const storageFiles = product.images
        .filter(
          (url: string) =>
            url &&
            url.includes("/storage/v1/object/public/products/")
        )
        .map((url: string) =>
          decodeURIComponent(
            url.split("/storage/v1/object/public/products/")[1]
          )
        );

      if (storageFiles.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("products")
          .remove(storageFiles);

        if (storageError) {
          console.error(storageError);
        }
      }
    }

    // حذف المنتج من قاعدة البيانات
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
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