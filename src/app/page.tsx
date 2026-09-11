"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InputBox } from "@/components/InputBox";
import CoffeeShop from "@/templates/coffee-shop";
import type { GeneratedHero } from "@/lib/gemini";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "result"; hero: GeneratedHero };

export default function Home() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(prompt: string) {
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      const hero = (await res.json()) as GeneratedHero;
      setState({ kind: "result", hero });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }

  function reset() {
    setState({ kind: "idle" });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-black px-6 py-6 text-white">
      <AnimatePresence mode="wait">
        {state.kind === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex w-full justify-center"
          >
            <InputBox onSubmit={handleSubmit} />
          </motion.div>
        )}

        {state.kind === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-5 text-stone-400"
          >
            <div className="h-1 w-40 overflow-hidden rounded-full bg-stone-800">
              <motion.div
                className="h-full w-1/3 rounded-full bg-stone-300"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.3em]">Brewing your pitch</p>
          </motion.div>
        )}

        {state.kind === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="max-w-md text-center text-red-400">{state.message}</p>
            <button
              onClick={reset}
              className="rounded-lg border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:border-stone-500"
            >
              Try again
            </button>
          </motion.div>
        )}

        {state.kind === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <CoffeeShop {...state.hero} />
            <button
              onClick={reset}
              className="rounded-lg border border-stone-700 px-4 py-2 text-xs uppercase tracking-[0.2em] text-stone-400 transition hover:border-stone-500 hover:text-stone-200"
            >
              New pitch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
