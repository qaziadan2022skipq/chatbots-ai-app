import { NextResponse } from "next/server";
import OpenAI from "openai/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // process file as FormData
    const uploadedFile: File | null = formData.get("file") as unknown as File; // retrieve the single file from FormData
    
    if(!uploadedFile){
        console.log("error")
    }

    // upload using the file stream
    const file = await openai.files.create({
      file: uploadedFile,
      purpose: "assistants",
    });

    return NextResponse.json({fileId:file.id, message: "File successfully uploaded"}, { status: 200 });
  } catch (error) {
    console.log("[THREAD_CREATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
