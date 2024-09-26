import { addFiles } from "@/lib/addfiles";
import { addAdminFiles } from "@/lib/adminFiles";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, filename } = body;
     console.log("fileUrl", url, "filename", filename)
     
    await addAdminFiles("admin", url, filename);

    console.log("File saved");
    return new NextResponse("Report saved successfully", { status: 200 });
  } catch (error) {
    console.log("[FILE_SAVE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
