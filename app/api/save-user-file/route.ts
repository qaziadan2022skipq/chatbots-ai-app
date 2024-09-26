import { addFiles } from "@/lib/addfiles";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { url, filename } = body;
     console.log("fileUrl", url, "filename", filename)
    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    await addFiles(userId, url, filename);
    return new NextResponse("Report saved successfully", { status: 200 });
  } catch (error) {
    console.log("[FILE_SAVE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
