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

    console.log("Deleting product:", id);

    // جلب صور المنتج
    const { data: product, error: findError } = await supabase
      .from("products")
      .select("images")
      .eq("id", id)
      .single();

    if (findError) {
      console.error("Find Error:", findError);

      return NextResponse.json(
        { error: findError.message },
        { status: 404 }
      );
    }

    console.log("Product:", product);

    // حذف الصور من Storage
    if (product?.images?.length) {
      const files = product.images
        .map((url: string) => {
          const index = url.indexOf("/storage/v1/object/public/products/");

          if (index === -1) return null;

          return decodeURIComponent(
            url.substring(
              index + "/storage/v1/object/public/products/".length
            )
          );
        })
        .filter(Boolean);

      console.log("Files To Delete:", files);

      if (files.length > 0) {
        const { data, error: storageError } =
          await supabase.storage
            .from("products")
            .remove(files as string[]);

        console.log("Storage Response:", data);

        if (storageError) {
          console.error("Storage Error:", storageError);
        }
      }
    }

    // حذف المنتج
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Database Delete Error:", deleteError);

      return NextResponse.json(
        { error: deleteError.message },
        { status: 500 }
      );
    }

    console.log("Product Deleted Successfully");

    return NextResponse.json({
      success: true,
    });

  } catch (err: any) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      {
        error: String(err),
        message: err?.message,
        stack: err?.stack,
      },
      {
        status: 500,
      }
    );
  }
}