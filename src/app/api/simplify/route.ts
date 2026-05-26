import { NextRequest, NextResponse } from "next/server";
import { simplify } from "@/lib/simplify";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Please provide a text to simplify." },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: "Text is too long. Maximum 5000 characters." },
        { status: 400 }
      );
    }

    const result = await simplify(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Simplify error:", error);
    return NextResponse.json(
      { error: "Failed to simplify text. Please try again." },
      { status: 500 }
    );
  }
}
