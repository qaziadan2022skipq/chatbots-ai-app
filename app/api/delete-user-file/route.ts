import { deleteFiles } from "@/lib/addfiles";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }
    const url = new URL(request.url);
    const fileId = url.searchParams.get("id");

    if (!fileId) {
      return new NextResponse("Entry FILE_ID is required", { status: 400 });
    }

    const file = await deleteFiles(fileId);

    return NextResponse.json({ file }, { status: 200 });
  } catch (error) {
    console.log("[FILE_DELETION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
