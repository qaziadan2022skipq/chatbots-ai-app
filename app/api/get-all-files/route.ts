import { getAllFiles } from "@/lib/addfiles";
import { getAllAdminFiles } from "@/lib/adminFiles";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const files = await getAllFiles(userId);

    return NextResponse.json({files:files}, { status: 200 });
  } catch (error) {
    console.log("[FILE_SAVE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
