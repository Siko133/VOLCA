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

    console.log("Deleting Product:", id);

    const { data: product, error: findError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    console.log("PRODUCT =", product);
    console.log("FIND ERROR =", findError);

    if (findError) {
      return NextResponse.json(
        { error: findError.message },
        { status: 500 }
      );
    }

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    console.log("DELETE ERROR =", deleteError);

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
    console.error(err);

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