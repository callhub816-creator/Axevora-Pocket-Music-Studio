"use client";

import { motion } from "framer-motion";
import { AudioEngine } from "@/lib/audioEngine";
import { addXP } from "@/lib/progression";

const CHORDS = [
  { name: "C Major", notes: ["C3", "E3", "G3", "C4", "E4"] },
  { name: "G Major", notes: ["G3", "B3", "D4", "G4", "B4"] },
  { name: "A Minor", notes: ["A3", "C4", "E4", "A4", "C5"] },
  { name: "F Major", notes: ["F3", "A3", "C4", "F4", "A4"] },
];

export default function VirtualGuitar({ onBack }: { onBack?: () => void }) {
  const strumChord = (notes: string[]) => {
    const audio = AudioEngine.getInstance();
    notes.forEach((note, i) => {
      setTimeout(() => audio.playNote(note), i * 30); // Strum effect
    });
    addXP(1);
  };

  return (
    <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-4xl px-2 md:px-0">
      <div className="w-full h-64 md:h-48 bg-amber-900/40 rounded-3xl border-4 md:border-8 border-amber-900/60 flex flex-col justify-around p-4 relative shadow-2xl overflow-hidden">
         {/* Strings */}
         {[1, 2, 3, 4, 5, 6].map((s) => (
           <div key={s} className="w-full h-[2px] bg-gradient-to-r from-gray-400 to-gray-200 shadow-sm" />
         ))}
         
         {/* Chords */}
         <div className="absolute inset-0 flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-0 md:justify-around p-2 md:p-0 z-20">
           {CHORDS.map((chord) => (
             <motion.button
               key={chord.name}
               whileHover={{ scale: 1.1, y: -5 }}
               whileTap={{ scale: 0.9 }}
               onClick={() => strumChord(chord.notes)}
               className="glass-panel px-3 py-2 md:px-6 md:py-4 border-2 border-white/20 hover:border-accent-secondary"
             >
               <span className="font-bold text-sm md:text-lg">{chord.name}</span>
             </motion.button>
           ))}
         </div>
      </div>
      <div className="text-center">
        <p className="text-gray-500 text-sm">Click a chord to <span className="text-accent-secondary font-bold">Strum</span> the virtual guitar.</p>
      </div>
    </div>
  );
}
