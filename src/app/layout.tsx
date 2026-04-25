import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MotionPitch — pixel art for your idea",
  description:
    "Describe your shop in one sentence. Get a custom-named, custom-colored, slowly-rotating pixel-art coffee mug.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
