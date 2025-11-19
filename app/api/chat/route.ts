import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT } from "./prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const prompt = `${PROMPT}

User question: ${message}
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text =
      result?.response?.text() ||
      "Sorry, I couldn’t generate a response.";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("GEMINI ERROR:", error);

    // Friendly fallback (important)
    return NextResponse.json(
      {
        text:
          "⚠️ The AI server is currently busy or unavailable. Please try again in a moment.",
      },
      { status: 200 }
    );
  }
}
