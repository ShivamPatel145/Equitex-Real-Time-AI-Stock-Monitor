import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();
    const prompt = messages[messages.length - 1].content;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction =
      "You are a knowledgeable financial assistant for the Equitex platform. " +
      "Help the user understand the stock market, Indian stocks, and financial concepts. " +
      "Keep your answers concise, professional, and helpful. Format your responses in Markdown.";

    const fullPrompt = `${systemInstruction}\n\nUser: ${prompt}\nAssistant:`;

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
