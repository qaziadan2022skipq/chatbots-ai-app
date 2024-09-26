import { checkProUser } from "@/lib/proUsers";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const assistant_id = process.env.ASSISTANT3_ID || "";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { threadId, userMessage, fileId } = body;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User id is required", { status: 400 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is Invalid", { status: 500 });
    }
    if (!userMessage) {
      return new NextResponse("User Message is required", { status: 400 });
    }
    if (!threadId) {
      return new NextResponse("Thread id is required", { status: 400 });
    }

    const isPro = await checkProUser(userId);
    if (!isPro) {
      return new NextResponse("Pro user is required", { status: 403 });
    }

    let message: OpenAI.Beta.Threads.Messages.Message;

    if (fileId.length > 0) {
      message = await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: userMessage,
        attachments: [
          { file_id: fileId, tools: [{ type: "code_interpreter" }] },
        ],
      });
    } else {
      message = await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: userMessage,
      });
    }

    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistant_id,
      instructions:
        "Please address the user as Jane Doe. The user has a premium account.",
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const bot_message = messages.data[0];

      console.log(`${bot_message}`);
      return NextResponse.json(bot_message.content[0], { status: 200 });
    } else {
      console.log(run.status);
    }
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
