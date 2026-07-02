import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET Collection
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// UPDATE Collection
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const body = await req.json();

  const { error } = await supabaseServer
    .from("collections")
    .update({
      name: body.name,
      slug: body.slug,
      description: body.description,
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
}

// DELETE Collection
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const { error } = await supabaseServer
    .from("collections")
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