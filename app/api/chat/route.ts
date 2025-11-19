import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT } from "./prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Combine system prompt + user input
    const prompt = `${PROMPT}\n\nUser question: ${message}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text() || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong with Gemini." },
      { status: 500 }
    );
  }
}
