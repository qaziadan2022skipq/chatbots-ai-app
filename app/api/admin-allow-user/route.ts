import { getAllFiles } from "@/lib/addfiles";
import { allowUser } from "@/lib/proUsers";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;
    await allowUser(userId)
    return NextResponse.json({message:"user allowed to use website"}, { status: 200 });
  } catch (error) {
    console.log("[FILE_SAVE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
