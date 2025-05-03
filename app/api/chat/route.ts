import { NextRequest, NextResponse } from "next/server";
import { generateResponse } from "@/lib/generateResponse";

export async function POST(req: NextRequest) {
  try {
    console.log("Received request at /api/chat");

    const body = await req.json();
    console.log("Request body:", body);

    const { message } = body;
    if (!message) {
      console.log("Error: Message is missing");
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    console.log("Generating response for:", message);
    const response = await generateResponse(message);
    console.log("Generated response:", response);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}