"use client";

import { motion } from "framer-motion";
import { AudioEngine } from "@/lib/audioEngine";
import { useEffect } from "react";
import { addXP } from "@/lib/progression";

const PIANO_KEYS = [
  { note: "C4", key: "A", color: "white" },
  { note: "C#4", key: "W", color: "black" },
  { note: "D4", key: "S", color: "white" },
  { note: "D#4", key: "E", color: "black" },
  { note: "E4", key: "D", color: "white" },
  { note: "F4", key: "F", color: "white" },
  { note: "F#4", key: "T", color: "black" },
  { note: "G4", key: "G", color: "white" },
  { note: "G#4", key: "Y", color: "black" },
  { note: "A4", key: "H", color: "white" },
  { note: "A#4", key: "U", color: "black" },
  { note: "B4", key: "J", color: "white" },
  { note: "C5", key: "K", color: "white" },
];

export default function VirtualPiano({ onBack }: { onBack?: () => void }) {
  const playNote = (note: string) => {
    AudioEngine.getInstance().playNote(note);
    addXP(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyData = PIANO_KEYS.find(k => k.key === e.key.toUpperCase());
      if (keyData) playNote(keyData.note);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      <div className="flex justify-center items-start h-64 bg-black/40 p-4 rounded-3xl border border-white/10 shadow-inner relative overflow-hidden">
        {PIANO_KEYS.map((key, idx) => (
          <motion.button
            key={key.note}
            whileTap={{ scaleY: 0.95, opacity: 0.8 }}
            onClick={() => playNote(key.note)}
            className={`
              relative transition-all duration-75 rounded-b-lg border border-gray-400/20
              ${key.color === 'white' 
                ? 'w-14 h-56 bg-white z-10 shadow-md hover:bg-gray-100' 
                : 'w-10 h-32 bg-zinc-900 -mx-5 z-20 shadow-xl border-zinc-700 hover:bg-zinc-800'
              }
            `}
          >
            <span className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold ${key.color === 'white' ? 'text-gray-400' : 'text-gray-600'}`}>
              {key.key}
            </span>
          </motion.button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-gray-500 text-sm">Use keys <span className="text-accent-primary">A S D F G H J K</span> for white keys and <span className="text-accent-secondary">W E T Y U</span> for black keys.</p>
      </div>
    </div>
  );
}
