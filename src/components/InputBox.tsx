"use client";

import { useState, type FormEvent } from "react";

export function InputBox({
  onSubmit,
  disabled,
}: {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  function handle(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length < 3 || disabled) return;
    onSubmit(trimmed);
  }

  return (
    <form onSubmit={handle} className="w-full max-w-2xl">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.4em] text-stone-600">
        MotionPitch · pixel art for your idea
      </p>
      <label
        htmlFor="idea"
        className="block text-center text-xs uppercase tracking-[0.3em] text-stone-500"
      >
        Describe your shop
      </label>
      <div className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-stone-700/80 bg-stone-900/60 px-5 py-4 backdrop-blur transition focus-within:border-stone-400">
        <input
          id="idea"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="A coffee shop in Portland"
          disabled={disabled}
          autoFocus
          className="flex-1 bg-transparent text-lg text-white placeholder:text-stone-600 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || value.trim().length < 3}
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-stone-900 transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Pitch it
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-stone-600">
        One sentence. We'll brew you a mug.
      </p>
    </form>
  );
}
