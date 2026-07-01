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

    // نجيب بيانات المنتج
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
    if (product.images?.length) {
      const files = product.images.map((url: string) => {
        const fileName = url.split("/products/")[1];
        return fileName;
      });

      await supabase.storage
        .from("products")
        .remove(files);
    }

    // حذف المنتج من الجدول
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
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}