import { GoogleGenAI, Type } from "@google/genai";

export type GeneratedHero = {
  businessName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
};

const HEX = /^#[0-9a-fA-F]{6}$/;

function safeHex(value: unknown, fallback: string): string {
  return typeof value === "string" && HEX.test(value) ? value : fallback;
}

function safeStr(value: unknown, fallback: string, max: number): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (trimmed.length === 0) return fallback;
  return trimmed.slice(0, max);
}

export async function generateHero(prompt: string): Promise<GeneratedHero> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a brand strategist for a one-page landing site whose hero is an animated pixel-art coffee mug.

The user describes their business in one sentence:
"""${prompt}"""

Invent:
- businessName: 1-3 words, memorable, evocative.
- tagline: one sentence, 6-14 words.
- primaryColor: hex color for the ceramic mug body. Pick something warm and brand-appropriate (creams, terracottas, sage, navy ceramics — feel free to be creative; it does NOT need to be brown). Avoid pure black or pure white.
- accentColor: hex color for the coffee/liquid in the mug. Should be a deep, contrasting color that reads as a beverage (rich browns, espressos, deep teals for matcha, etc).

Return JSON only.`,
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          businessName: { type: Type.STRING },
          tagline: { type: Type.STRING },
          primaryColor: {
            type: Type.STRING,
            description: "Hex color like #D4A574",
          },
          accentColor: {
            type: Type.STRING,
            description: "Hex color like #3E2723",
          },
        },
        required: ["businessName", "tagline", "primaryColor", "accentColor"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }

  const obj = raw as Record<string, unknown>;
  return {
    businessName: safeStr(obj.businessName, "Untitled Co.", 40),
    tagline: safeStr(obj.tagline, "Made with care, served with intent.", 140),
    primaryColor: safeHex(obj.primaryColor, "#D4A574"),
    accentColor: safeHex(obj.accentColor, "#3E2723"),
  };
}
