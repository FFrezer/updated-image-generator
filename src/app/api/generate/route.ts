import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const key = process.env.UNSPLASH_ACCESS_KEY;

    if (!key) {
      console.error("Unsplash key missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        prompt
      )}&client_id=${key}`
    );

    if (!response.ok) {
      console.error("Unsplash API error:", response.status);
      return NextResponse.json(
        { error: "Image provider failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (!data?.urls?.regular) {
      return NextResponse.json(
        { error: "No image returned." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.urls.regular,
    });

  } catch (error) {
    console.error("Server error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}