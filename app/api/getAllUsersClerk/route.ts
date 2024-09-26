import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const client = clerkClient()

export async function GET(req: Request) {

  try {
    const users = await client.users.getUserList();
    return NextResponse.json({ users : users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
