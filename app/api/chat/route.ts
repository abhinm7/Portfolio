import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const prompt = `
    You are "Abhin's Mini Assistant".
    You ONLY answer questions about Abhin M.
    Be short, friendly, and accurate.

    Abhin's Info:
    - Full Stack Developer (React, Next.js, Node.js, MongoDB)
    - Built Microservices Social Media App (GKE, Docker, RabbitMQ)
    - Built Event Registration System: 1000+ users
    - Built AI PDF Summarizer (Next.js + Gemini)
    - Internships: Rooman (Cloud MERN), Skolar (RBAC system)
    - Loves Three.js, animations, clean UI

    User question: ${message}
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
