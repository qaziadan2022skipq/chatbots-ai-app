import { getAllFiles } from "@/lib/addfiles";
import { getAllAdminFiles } from "@/lib/adminFiles";
import { checkProUser } from "@/lib/proUsers";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const proUser = await checkProUser(userId)

    if(!proUser){
      return NextResponse.json({message: "You dont have access to files"}, { status: 403 });
    }
    
    const files = await getAllAdminFiles(userId);
    return NextResponse.json({files:files}, { status: 200 });

  } catch (error) {
    console.log("[FILE_SAVE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
