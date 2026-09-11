import { NextResponse } from "next/server";
import { generateHero } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt =
    typeof body === "object" && body !== null && "prompt" in body
      ? (body as { prompt: unknown }).prompt
      : undefined;

  if (typeof prompt !== "string" || prompt.trim().length < 3) {
    return NextResponse.json(
      { error: "Prompt must be at least 3 characters" },
      { status: 400 },
    );
  }

  try {
    const hero = await generateHero(prompt.trim().slice(0, 500));
    return NextResponse.json(hero);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    console.error("[/api/generate]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
