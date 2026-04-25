"use client";

import { motion, useReducedMotion } from "framer-motion";

export type CoffeeShopProps = {
  businessName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
};

function clampHex(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function shade(hex: string, amount: number): string {
  // amount > 0 lightens, < 0 darkens
  const v = parseInt(hex.replace("#", ""), 16);
  const r = (v >> 16) & 0xff;
  const g = (v >> 8) & 0xff;
  const b = v & 0xff;
  const t = amount > 0 ? 255 : 0;
  const p = Math.abs(amount);
  const nr = clampHex(r + (t - r) * p);
  const ng = clampHex(g + (t - g) * p);
  const nb = clampHex(b + (t - b) * p);
  return `#${((nr << 16) | (ng << 8) | nb).toString(16).padStart(6, "0")}`;
}

export default function CoffeeShop({
  businessName,
  tagline,
  primaryColor,
  accentColor,
}: CoffeeShopProps) {
  const reduce = useReducedMotion();

  const mug = primaryColor;
  const mugLight = shade(mug, 0.18);
  const mugDark = shade(mug, -0.32);
  const mugCorner = shade(mug, -0.65);
  const coffee = accentColor;
  const coffeeDark = shade(coffee, -0.3);
  const coffeeLight = shade(coffee, 0.25);

  // Mug body (pixel-aligned to 12px grid). Center of mug ≈ (400, 312) in viewBox.
  const bodyX = 328;
  const bodyY = 228;
  const bodyW = 144;
  const bodyH = 168;
  // The rotation pivot — center of the mug body, in viewBox units.
  const pivotX = bodyX + bodyW / 2; // 400
  const pivotY = bodyY + bodyH / 2; // 312

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="[perspective:1400px]">
        <svg
          viewBox="0 0 800 600"
          className="block h-[420px] w-[560px] sm:h-[480px] sm:w-[640px]"
          shapeRendering="crispEdges"
          aria-hidden
        >
          {/* Ground shadow — static, behind mug */}
          <ellipse
            cx={pivotX}
            cy={412}
            rx={110}
            ry={10}
            fill="#000"
            opacity={0.55}
          />

          {/* Mug — rotates around its vertical center axis */}
          <motion.g
            style={{
              transformOrigin: `${pivotX}px ${pivotY}px`,
              transformBox: "view-box",
            }}
            animate={
              reduce
                ? undefined
                : { rotateY: [-22, 22, -22] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            {/* Handle outer "C" */}
            <rect x={472} y={252} width={12} height={12} fill={mug} />
            <rect x={484} y={252} width={12} height={12} fill={mug} />
            <rect x={496} y={264} width={12} height={12} fill={mug} />
            <rect x={508} y={276} width={12} height={12} fill={mug} />
            <rect x={508} y={288} width={12} height={12} fill={mugDark} />
            <rect x={508} y={300} width={12} height={12} fill={mugDark} />
            <rect x={496} y={312} width={12} height={12} fill={mugDark} />
            <rect x={484} y={324} width={12} height={12} fill={mugDark} />
            <rect x={472} y={324} width={12} height={12} fill={mugDark} />
            {/* Handle hole shadow */}
            <rect x={484} y={264} width={12} height={12} fill="#0a0a0a" />
            <rect x={484} y={276} width={12} height={12} fill="#0a0a0a" />
            <rect x={484} y={288} width={12} height={12} fill="#0a0a0a" />
            <rect x={484} y={300} width={12} height={12} fill="#0a0a0a" />
            <rect x={484} y={312} width={12} height={12} fill="#0a0a0a" />
            <rect x={496} y={288} width={12} height={12} fill="#0a0a0a" />
            <rect x={496} y={300} width={12} height={12} fill="#0a0a0a" />

            {/* Mug body */}
            <rect x={bodyX} y={bodyY} width={bodyW} height={bodyH} fill={mug} />
            {/* Left highlight column */}
            <rect
              x={bodyX}
              y={bodyY + 12}
              width={12}
              height={bodyH - 24}
              fill={mugLight}
            />
            {/* Right shadow column */}
            <rect
              x={bodyX + bodyW - 24}
              y={bodyY + 12}
              width={24}
              height={bodyH - 24}
              fill={mugDark}
            />
            {/* Bottom shadow row */}
            <rect
              x={bodyX + 12}
              y={bodyY + bodyH - 12}
              width={bodyW - 24}
              height={12}
              fill={mugDark}
            />
            {/* Faux rounded corners */}
            <rect
              x={bodyX}
              y={bodyY + bodyH - 12}
              width={12}
              height={12}
              fill={mugCorner}
            />
            <rect
              x={bodyX + bodyW - 12}
              y={bodyY + bodyH - 12}
              width={12}
              height={12}
              fill={mugCorner}
            />

            {/* Coffee surface */}
            <rect
              x={bodyX + 12}
              y={bodyY}
              width={bodyW - 24}
              height={12}
              fill={coffeeDark}
            />
            <rect
              x={bodyX + 24}
              y={bodyY - 12}
              width={bodyW - 48}
              height={12}
              fill={coffeeDark}
            />
            <rect x={bodyX + 36} y={bodyY} width={24} height={12} fill={coffee} />
            <rect
              x={bodyX + 48}
              y={bodyY - 12}
              width={24}
              height={12}
              fill={coffeeLight}
            />
          </motion.g>

          {/* Steam wisps — share the same viewBox so they always sit above the mug */}
          {[0, 1, 2].map((i) => {
            const x = 364 + i * 36;
            return (
              <motion.g
                key={i}
                initial={{ y: 0, opacity: 0 }}
                animate={
                  reduce
                    ? { y: -40, opacity: 0.5 }
                    : {
                        y: [0, -140],
                        opacity: [0, 0.85, 0.85, 0],
                      }
                }
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 4.2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 1.3,
                        times: [0, 0.2, 0.8, 1],
                      }
                }
              >
                <rect x={x} y={210} width={12} height={12} fill="#f8fafc" />
                <rect x={x + 12} y={198} width={12} height={12} fill="#f8fafc" />
                <rect x={x} y={186} width={12} height={12} fill="#f8fafc" />
                <rect x={x - 12} y={174} width={12} height={12} fill="#f8fafc" />
                <rect x={x} y={162} width={12} height={12} fill="#f8fafc" />
                <rect
                  x={x + 12}
                  y={150}
                  width={12}
                  height={12}
                  fill="#f8fafc"
                />
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="max-w-2xl px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {businessName}
        </h1>
        <p className="mt-3 text-base text-stone-300 sm:text-lg">{tagline}</p>
      </div>
    </div>
  );
}
