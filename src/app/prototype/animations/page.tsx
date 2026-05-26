"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Mock data ──────────────────────────────────────────────────────────────
const WORDS = [
  { word: "get", zh: "得到、拿到、变得", example: "I got your message.", trans: "我收到了你的消息。" },
  { word: "make", zh: "做、制作、使", example: "She made a cake.", trans: "她做了一个蛋糕。" },
  { word: "take", zh: "拿、带、花费", example: "Take your time.", trans: "慢慢来。" },
  { word: "put", zh: "放、放置", example: "Put it on the table.", trans: "把它放在桌子上。" },
  { word: "give", zh: "给、给予", example: "Give me a hand.", trans: "帮我一下。" },
  { word: "go", zh: "去、走", example: "Let's go home.", trans: "我们回家吧。" },
  { word: "come", zh: "来、到来", example: "Come here please.", trans: "请过来。" },
  { word: "have", zh: "有、拥有", example: "I have a question.", trans: "我有个问题。" },
];

type CardData = (typeof WORDS)[number];

// ── Variant D: Ghibli — Warm Whimsy, Hand-drawn ────────────────────────────
// Warm amber/cream tones. Cards feel like paper. Wobble, ink lines, organic.
function VariantD({ words, onReset }: { words: CardData[]; onReset: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [shuffled, setShuffled] = useState(() => [...words].sort(() => Math.random() - 0.5));
  const toggle = (i: number) => setFlipped((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const handleReset = () => { setFlipped(new Set()); setShuffled([...words].sort(() => Math.random() - 0.5)); onReset(); };

  return (
    <div className="relative min-h-screen bg-[#fcf6ec]">
      {/* Warm ambient dust motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(212, 163, 115, ${0.1 + Math.random() * 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -30 - Math.random() * 40, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-serif text-xs italic tracking-[0.1em] text-[#8b6914]/50"
        >
          Variant D · Studio Ghibli
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-4 font-serif text-5xl font-normal leading-[1.15] tracking-tight text-[#3e2c1a]"
        >
          Today&apos;s Words
        </motion.h1>

        {/* Progress — ink brush stroke */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="h-2 flex-1 overflow-hidden rounded-sm" style={{ background: "#e8dcc8" }}>
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, #d4a373, #8b6914)", borderRadius: 2 }}
              initial={{ width: "0%" }}
              animate={{ width: `${(flipped.size / shuffled.length) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
          <span className="font-serif text-xs italic text-[#8b6914]/50">{flipped.size} / {shuffled.length}</span>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {shuffled.map((entry, i) => {
            const isFlipped = flipped.has(i);
            return (
              <motion.button
                key={entry.word}
                variants={{
                  hidden: { opacity: 0, y: 30, rotate: -2 },
                  visible: {
                    opacity: 1, y: 0, rotate: 0,
                    transition: { type: "spring", stiffness: 60, damping: 14, mass: 1.2 },
                  },
                }}
                onClick={() => toggle(i)}
                className="group relative h-52 w-full cursor-pointer text-left outline-none"
                style={{ perspective: 800 }}
                whileHover={{ rotate: [0, -1, 1, 0], transition: { duration: 0.4 } }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="size-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1.1 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front — paper card */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 shadow-lg"
                    style={{
                      backfaceVisibility: "hidden",
                      background: "#faf3e8",
                      borderRadius: 2,
                      border: "1px solid #e8dcc8",
                      boxShadow: "2px 3px 12px rgba(62,44,26,0.08), inset 0 0 40px rgba(250,243,232,0.5)",
                    }}
                  >
                    {/* Decorative ink corner */}
                    <div className="absolute left-2 top-2 text-[#d4a373]/20 text-lg leading-none">✦</div>
                    <span className="font-serif text-3xl font-normal uppercase tracking-[0.04em] text-[#3e2c1a]">
                      {entry.word}
                    </span>
                    <motion.span
                      className="text-xs italic tracking-[0.08em] text-[#8b6914]/40"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      — tap —
                    </motion.span>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between p-5 shadow-lg"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "#faf3e8",
                      borderRadius: 2,
                      border: "1px solid #d4a373",
                      boxShadow: "2px 3px 16px rgba(212,163,115,0.15)",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-normal uppercase tracking-[0.03em] text-[#3e2c1a]">{entry.word}</span>
                        <span className="rounded-sm border border-[#d4a373]/30 px-2 py-0.5 font-serif text-[10px] italic text-[#8b6914]/60">seen</span>
                      </div>
                      <span className="mt-3 block font-serif text-sm leading-relaxed text-[#3e2c1a]/70">{entry.zh}</span>
                      <div className="relative mt-4 border-l-2 border-[#d4a373] pl-3">
                        <span className="block font-serif text-sm italic leading-relaxed text-[#3e2c1a]/80">{entry.example}</span>
                        <span className="mt-1 block font-serif text-xs text-[#8b6914]/50">{entry.trans}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, #d4a373/40, transparent)" }} />
                      <span className="ml-3 font-serif text-[10px] italic text-[#8b6914]/30">tap back</span>
                    </div>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={handleReset}
            className="cursor-pointer border border-[#d4a373]/40 px-8 py-2.5 font-serif text-sm italic tracking-[0.05em] text-[#8b6914]/60 transition-all hover:border-[#d4a373] hover:text-[#8b6914]"
            style={{ borderRadius: 2 }}
          >
            Shuffle
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Variant G: Adaline Design System x Ghibli Animation ────────────────────
// Adaline colors, typography, spacing + Ghibli's organic wobble, dust motes, ink-brush progress.
function VariantG({ words, onReset }: { words: CardData[]; onReset: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [shuffled, setShuffled] = useState(() => [...words].sort(() => Math.random() - 0.5));
  const toggle = (i: number) => setFlipped((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const handleReset = () => { setFlipped(new Set()); setShuffled([...words].sort(() => Math.random() - 0.5)); onReset(); };

  return (
    <div className="relative min-h-screen bg-canvas-ice">
      {/* Floating dust motes — in Forest Dew */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(215, 232, 181, ${0.15 + Math.random() * 0.25})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20 - Math.random() * 30, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: 5 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-fragmentmono text-xs font-bold uppercase tracking-[0.02em] text-valley-green/60"
        >
          Variant G · Adaline + Ghibli
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-adaline-ink"
        >
          Today&apos;s words
        </motion.h1>

        {/* Progress — ink-wash style in Valley Green */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-moss">
            <motion.div
              className="h-full rounded-full bg-valley-green"
              initial={{ width: "0%" }}
              animate={{ width: `${(flipped.size / shuffled.length) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
          <span className="font-fragmentmono text-xs font-bold text-valley-green/50">
            {flipped.size} / {shuffled.length}
          </span>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {shuffled.map((entry, i) => {
            const isFlipped = flipped.has(i);
            return (
              <motion.button
                key={entry.word}
                variants={{
                  hidden: { opacity: 0, y: 28, rotate: -1.5 },
                  visible: {
                    opacity: 1, y: 0, rotate: 0,
                    transition: { type: "spring", stiffness: 70, damping: 15, mass: 1.1 },
                  },
                }}
                onClick={() => toggle(i)}
                className="group relative h-52 w-full cursor-pointer text-left outline-none"
                style={{ perspective: 800 }}
                whileHover={{ rotate: [0, -0.8, 0.8, 0], transition: { duration: 0.35 } }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="size-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 110, damping: 16, mass: 1.1 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front — Adaline card */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border border-mist-gray bg-canvas-ice p-5"
                    style={{
                      backfaceVisibility: "hidden",
                      boxShadow: "rgba(99, 143, 61, 0.06) 0px 0px 0px 1px",
                    }}
                  >
                    <span className="text-3xl font-bold uppercase leading-none tracking-[-0.04em] text-adaline-ink">
                      {entry.word}
                    </span>
                    <span className="text-xs text-adaline-ink/35">tap me</span>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between rounded-lg border-2 border-valley-green/70 bg-canvas-ice p-4"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      boxShadow: "rgba(99, 143, 61, 0.1) 0px 0px 0px 1px",
                    }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xl font-bold uppercase leading-none tracking-[-0.04em] text-adaline-ink">
                          {entry.word}
                        </span>
                        <span className="rounded-[20px] bg-forest-dew px-3 py-1 text-xs font-bold leading-none text-valley-green">
                          seen
                        </span>
                      </div>
                      <span className="mt-4 block text-sm leading-5 text-adaline-ink/75">{entry.zh}</span>
                      <span className="mt-3 block rounded bg-forest-dew/30 px-3 py-2 text-sm leading-5 text-adaline-ink">
                        {entry.example}
                      </span>
                      <span className="mt-2 block text-xs text-adaline-ink/65">{entry.trans}</span>
                    </div>
                    <span className="self-end text-xs text-adaline-ink/45">tap back</span>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={handleReset}
            className="cursor-pointer rounded-[20px] border border-stone-moss bg-canvas-ice px-8 py-2.5 text-sm text-adaline-ink/60 transition-colors hover:border-valley-green hover:text-valley-green"
          >
            Shuffle words
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Variant E: Cyberpunk 2077 (Neon Hologram) ──────────────────────────────
// Dark, neon glow, holographic construct, glitch effects, scan lines.
function VariantE({ words, onReset }: { words: CardData[]; onReset: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [shuffled, setShuffled] = useState(() => [...words].sort(() => Math.random() - 0.5));
  const toggle = (i: number) => setFlipped((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const handleReset = () => { setFlipped(new Set()); setShuffled([...words].sort(() => Math.random() - 0.5)); onReset(); };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07060f]">
      {/* Grid overlay */}
      <svg className="pointer-events-none absolute inset-0 size-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-e" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-e)" />
      </svg>
      {/* Scan line overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00f0ff 2px, #00f0ff 4px)" }} />
      {/* Floating neon orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 -top-20 size-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #ff00aa 0%, transparent 70%)" }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 size-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)" }}
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#00f0ff]/60"
        >
          // Variant E · Cyberpunk 2077
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-6xl font-black leading-[0.9] tracking-[-0.04em] text-white"
          style={{ textShadow: "0 0 30px rgba(0,240,255,0.3), 0 0 60px rgba(0,240,255,0.1)" }}
        >
          TODAY&apos;S<br />WORDS
        </motion.h1>

        {/* Progress — neon bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="h-1 flex-1 overflow-hidden bg-white/5" style={{ boxShadow: "inset 0 0 4px rgba(0,240,255,0.1)" }}>
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, #ff00aa, #7b2fff, #00f0ff)", boxShadow: "0 0 8px rgba(0,240,255,0.4)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${(flipped.size / shuffled.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
            />
          </div>
          <motion.span
            key={flipped.size}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs font-bold text-[#00f0ff]/80"
          >
            {flipped.size}/{shuffled.length}
          </motion.span>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {shuffled.map((entry, i) => {
            const isFlipped = flipped.has(i);
            return (
              <motion.button
                key={entry.word}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, filter: "blur(6px)" },
                  visible: {
                    opacity: 1, scale: 1, filter: "blur(0px)",
                    transition: { type: "spring", stiffness: 200, damping: 12 },
                  },
                }}
                onClick={() => toggle(i)}
                className="group relative h-52 w-full cursor-pointer text-left outline-none"
                style={{ perspective: 800 }}
                whileHover={{
                  boxShadow: "0 0 20px rgba(0,240,255,0.15)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.94 }}
              >
                <motion.div
                  className="size-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 250, damping: 14 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front — holographic panel */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5"
                    style={{
                      backfaceVisibility: "hidden",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                      border: "1px solid rgba(0,240,255,0.2)",
                      borderRadius: 4,
                      boxShadow: "0 0 15px rgba(0,240,255,0.05), inset 0 0 30px rgba(0,240,255,0.03)",
                    }}
                  >
                    <span className="text-4xl font-black uppercase tracking-[-0.03em] text-white" style={{ textShadow: "0 0 15px rgba(0,240,255,0.4)" }}>
                      {entry.word}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00f0ff]/40">&gt; ACCESS</span>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between p-4"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "linear-gradient(135deg, rgba(10,6,25,0.95) 0%, rgba(20,10,40,0.95) 100%)",
                      border: "1px solid rgba(255,0,170,0.3)",
                      borderRadius: 4,
                      boxShadow: "0 0 20px rgba(255,0,170,0.1), inset 0 0 30px rgba(255,0,170,0.03)",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-base font-bold uppercase tracking-[0.05em] text-white" style={{ textShadow: "0 0 8px rgba(0,240,255,0.3)" }}>
                          {entry.word}
                        </span>
                        <span className="rounded-none border border-[#00f0ff]/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[#00f0ff]/60">DECODED</span>
                      </div>
                      <span className="mt-3 block font-mono text-xs leading-relaxed text-[#7b2fff]/80">{entry.zh}</span>
                      <div className="relative mt-3 border-l border-[#ff00aa]/40 pl-3">
                        <span className="block font-mono text-xs leading-relaxed text-white/70">{entry.example}</span>
                        <span className="mt-1 block font-mono text-[10px] text-white/40">{entry.trans}</span>
                      </div>
                    </div>
                    <span className="self-end font-mono text-[9px] uppercase tracking-[0.15em] text-[#ff00aa]/40">&gt; RETURN</span>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <motion.button
            onClick={handleReset}
            whileHover={{ borderColor: "rgba(0,240,255,0.6)", color: "#00f0ff" }}
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer border border-[#00f0ff]/30 px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#00f0ff]/60 transition-colors"
            style={{ borderRadius: 2 }}
          >
            [ Reboot ]
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Variant F: Apple Vision Pro — Spatial Glass ────────────────────────────
// Glassmorphism, depth layering, frosted backdrop, premium polish.
function VariantF({ words, onReset }: { words: CardData[]; onReset: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [shuffled, setShuffled] = useState(() => [...words].sort(() => Math.random() - 0.5));
  const toggle = (i: number) => setFlipped((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const handleReset = () => { setFlipped(new Set()); setShuffled([...words].sort(() => Math.random() - 0.5)); onReset(); };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f2f5 0%, #e8ecf0 50%, #dce0e8 100%)" }}>
      {/* Depth backdrop — soft glowing rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/3 top-1/4 size-[400px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 top-2/3 size-[350px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], y: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400/80"
        >
          Variant F · Vision Pro
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 text-center text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-gray-800"
        >
          Today&apos;s words
        </motion.h1>

        {/* Progress — pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-10 flex max-w-md items-center gap-4"
        >
          <span className="font-mono text-[11px] font-medium tabular-nums tracking-tight text-gray-400">{flipped.size}/{shuffled.length}</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/60 shadow-inner">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #06b6d4)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${(flipped.size / shuffled.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {shuffled.map((entry, i) => {
            const isFlipped = flipped.has(i);
            return (
              <motion.button
                key={entry.word}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.95 },
                  visible: {
                    opacity: 1, y: 0, scale: 1,
                    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                onClick={() => toggle(i)}
                className="group relative h-52 w-full cursor-pointer text-left outline-none"
                style={{ perspective: 1000 }}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Glass card shadow layer */}
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-500"
                  style={{
                    background: "rgba(255,255,255,0.5)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.7)",
                  }}
                />
                <motion.div
                  className="relative size-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl p-5"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-3xl font-bold uppercase tracking-tight text-gray-800">
                      {entry.word}
                    </span>
                    <span className="text-[11px] font-medium tracking-wider text-gray-400/70">tap to reveal</span>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between rounded-2xl p-5"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-base font-bold uppercase tracking-tight text-gray-800">{entry.word}</span>
                        <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-500">seen</span>
                      </div>
                      <span className="mt-2 block text-sm leading-snug text-gray-600/80">{entry.zh}</span>
                      <div className="mt-3 rounded-xl bg-white/60 px-3 py-2.5 shadow-sm">
                        <span className="block text-sm leading-snug text-gray-700">{entry.example}</span>
                        <span className="mt-1 block text-xs text-gray-400">{entry.trans}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium tracking-wider text-gray-400/50">tap again</span>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={handleReset}
            className="cursor-pointer rounded-full border border-gray-300/60 bg-white/70 px-8 py-2.5 text-sm font-medium tracking-tight text-gray-500 shadow-sm backdrop-blur-sm transition-all hover:border-gray-400/60 hover:text-gray-700"
          >
            Shuffle
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Switcher bar ───────────────────────────────────────────────────────────
const VARIANTS = [
  { key: "D", name: "Ghibli — Hand-drawn (original)" },
  { key: "G", name: "Ghibli Anims × Adaline Design" },
  { key: "E", name: "Cyberpunk 2077 — Neon Hologram" },
  { key: "F", name: "Vision Pro — Spatial Glass" },
];

function PrototypeSwitcher({ current, onChange }: { current: string; onChange: (key: string) => void }) {
  const idx = VARIANTS.findIndex((v) => v.key === current);
  const prev = () => onChange(VARIANTS[(idx - 1 + VARIANTS.length) % VARIANTS.length].key);
  const next = () => onChange(VARIANTS[(idx + 1) % VARIANTS.length].key);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA" || (e.target as HTMLElement).isContentEditable) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-4 rounded-full border border-white/20 bg-[#0a1d08]/90 px-5 py-2.5 shadow-2xl backdrop-blur-md">
        <button onClick={prev} className="cursor-pointer text-white/60 transition-colors hover:text-white" aria-label="Previous variant">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span className="min-w-[260px] text-center text-sm font-medium tracking-tight text-white">
          <span className="text-white/40">{current} —</span> {VARIANTS.find((v) => v.key === current)?.name}
        </span>
        <button onClick={next} className="cursor-pointer text-white/60 transition-colors hover:text-white" aria-label="Next variant">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function AnimationsPrototypePage() {
  const [variant, setVariant] = useState("D");
  const [resetKey, setResetKey] = useState(0);
  const handleReset = useCallback(() => setResetKey((k) => k + 1), []);

  return (
    <>
      {variant === "D" && <VariantD key={`D-${resetKey}`} words={WORDS} onReset={handleReset} />}
      {variant === "E" && <VariantE key={`E-${resetKey}`} words={WORDS} onReset={handleReset} />}
      {variant === "F" && <VariantF key={`F-${resetKey}`} words={WORDS} onReset={handleReset} />}
      {variant === "G" && <VariantG key={`G-${resetKey}`} words={WORDS} onReset={handleReset} />}
      <PrototypeSwitcher current={variant} onChange={setVariant} />
    </>
  );
}
