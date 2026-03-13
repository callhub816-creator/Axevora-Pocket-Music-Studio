"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Languages, Lightbulb } from "lucide-react";
import { useState } from "react";
import { THEORY_DATA, Language } from "@/lib/theoryData";

export default function AIGuru() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('english');
  const [currentTopic, setCurrentTopic] = useState(0);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-panel w-80 md:w-96 p-6 mb-4 shadow-2xl border-t-4 border-accent-primary"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-accent-primary" />
                </div>
                <h3 className="font-bold">Axevora Guru</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 mb-6">
              {(['english', 'hindi', 'marathi'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-xs px-2 py-1 rounded-md transition-all ${
                    lang === l ? "bg-accent-primary text-white" : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <motion.div
                key={`${lang}-${currentTopic}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 p-4 rounded-xl"
              >
                <h4 className="text-accent-secondary font-bold mb-2">
                  {THEORY_DATA[lang][currentTopic].title}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {THEORY_DATA[lang][currentTopic].content}
                </p>
                <div className="flex items-start gap-2 bg-accent-primary/10 p-3 rounded-lg border border-accent-primary/20">
                  <Lightbulb className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-accent-primary italic">
                    {THEORY_DATA[lang][currentTopic].tip}
                  </p>
                </div>
              </motion.div>

              <div className="flex justify-between">
                <button
                  disabled={currentTopic === 0}
                  onClick={() => setCurrentTopic(prev => prev - 1)}
                  className="text-xs text-gray-500 hover:text-white disabled:opacity-0"
                >
                  Previous
                </button>
                <button
                  disabled={currentTopic === THEORY_DATA[lang].length - 1}
                  onClick={() => setCurrentTopic(prev => prev + 1)}
                  className="text-xs text-accent-secondary font-bold hover:underline disabled:opacity-0"
                >
                  Next Lesson
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -10, 0],
          boxShadow: ["0 0 20px rgba(139, 92, 246, 0.2)", "0 0 40px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(139, 92, 246, 0.2)"]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-music rounded-full flex items-center justify-center shadow-xl neon-button relative group"
      >
        <MessageSquare className="text-white w-8 h-8 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-secondary rounded-full border-2 border-[#050505] animate-pulse" />
      </motion.button>
    </div>
  );
}
