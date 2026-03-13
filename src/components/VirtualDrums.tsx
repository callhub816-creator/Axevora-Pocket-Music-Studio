"use client";

import { motion } from "framer-motion";
import { AudioEngine } from "@/lib/audioEngine";
import { useEffect } from "react";
import { addXP } from "@/lib/progression";

const DRUMS = [
  { name: "Kick", key: "SPACE", type: "kick" as const, color: "from-purple-600 to-purple-900" },
  { name: "Snare", key: "X", type: "snare" as const, color: "from-cyan-600 to-cyan-900" },
  { name: "Hi-Hat", key: "C", type: "hihat" as const, color: "from-blue-600 to-blue-900" },
];

export default function VirtualDrums({ onBack }: { onBack?: () => void }) {
  const playDrum = (type: 'kick' | 'snare' | 'hihat') => {
    AudioEngine.getInstance().playDrum(type);
    addXP(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") playDrum('kick');
      if (e.key.toLowerCase() === 'x') playDrum('snare');
      if (e.key.toLowerCase() === 'c') playDrum('hihat');
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-4xl">
      <div className="flex gap-8 justify-center items-end h-80">
        {DRUMS.map((drum) => (
          <motion.button
            key={drum.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => playDrum(drum.type)}
            className={`
              w-48 h-48 rounded-full bg-gradient-to-b ${drum.color}
              border-4 border-white/20 shadow-2xl flex flex-col items-center justify-center gap-2
              relative group
            `}
          >
            <div className="absolute inset-2 border-2 border-white/10 rounded-full pointer-events-none" />
            <span className="font-black text-xl tracking-tighter uppercase">{drum.name}</span>
            <span className="bg-black/30 px-3 py-1 rounded-full text-[10px] font-bold">{drum.key}</span>
          </motion.button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-gray-500 text-sm">
          Use <span className="text-accent-primary font-bold">Spacebar</span> for Kick, <span className="text-accent-secondary font-bold">X</span> for Snare, and <span className="text-accent-secondary font-bold">C</span> for Hi-Hat.
        </p>
      </div>
    </div>
  );
}
