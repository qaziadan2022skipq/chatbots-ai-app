import { deleteAdminFiles } from "@/lib/adminFiles";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileId } = body;
     
    await deleteAdminFiles(fileId);
    return new NextResponse("File deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[FILE_DELETION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
