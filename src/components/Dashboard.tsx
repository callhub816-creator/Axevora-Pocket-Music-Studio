"use client";

import { motion } from "framer-motion";
import { Music, Play, Layout, Users, Settings, Zap, ArrowLeft, Trophy, Star } from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AudioEngine } from "@/lib/audioEngine";
import { getStats, UserStats } from "@/lib/progression";

const RhythmGame = dynamic(() => import("./RhythmGame"), { ssr: false });
const VirtualPiano = dynamic(() => import("./VirtualPiano"), { ssr: false });
const VirtualDrums = dynamic(() => import("./VirtualDrums"), { ssr: false });
const VirtualGuitar = dynamic(() => import("./VirtualGuitar"), { ssr: false });

const STAGES = [
  { id: 1, title: "Rhythm Tap", icon: Zap, status: "Active", level: "Beginner", description: "Master the timing by hitting the flowing notes." },
  { id: 2, title: "Piano Studio", icon: Music, status: "Active", level: "Stage 1", description: "Learn your first notes on the virtual piano." },
  { id: 3, title: "Beat Lab", icon: Play, status: "Active", level: "Stage 2", description: "Experiment with drums and rhythm patterns." },
  { id: 4, title: "Guitar Fret", icon: Layout, status: "Active", level: "Stage 3", description: "Learn basic chords on the virtual guitar." },
];

export default function Dashboard() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const updateStats = () => setStats(getStats());
    updateStats();
    
    window.addEventListener('xpUpdated', updateStats);
    return () => window.removeEventListener('xpUpdated', updateStats);
  }, [activeStage]);

  const startStage = (id: number) => {
    const stage = STAGES.find(s => s.id === id);
    if (stage) {
      setActiveStage(id);
      AudioEngine.getInstance().playNote("G4");
    }
  };

  const renderActiveStage = () => {
    const props = { onBack: () => setActiveStage(null) };
    switch (activeStage) {
      case 1: return <RhythmGame {...props} />;
      case 2: return <VirtualPiano {...props} />;
      case 3: return <VirtualDrums {...props} />;
      case 4: return <VirtualGuitar {...props} />;
      default: return null;
    }
  };

  const getStageTitle = () => {
    return STAGES.find(s => s.id === activeStage)?.title || "Stage";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10">
      {/* Header */}
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6 md:gap-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setActiveStage(null)}
        >
          <div className="w-10 h-10 bg-gradient-music rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Music className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Axevora <span className="text-accent-primary">Pocket</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Studio Engine v0.1</span>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-6">
          {stats && (
            <div className="hidden md:flex items-center gap-4 px-4 py-2 glass-panel border-accent-primary/20">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold">LVL {stats.level}</span>
              </div>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent-primary" 
                  style={{ width: `${stats.xp % 100}%` }} 
                />
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent-secondary fill-current" />
                <span className="text-sm text-gray-300 font-medium">{stats.xp} XP</span>
              </div>
            </div>
          )}
          
          <div className="flex gap-4">
            <button className="p-2 glass-panel hover:bg-white/10 transition-colors">
              <Users className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 glass-panel hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </nav>

      {activeStage ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="w-full flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6 md:gap-0">
            <button 
              onClick={() => setActiveStage(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <div className="p-2 glass-panel group-hover:bg-accent-primary/20 group-hover:text-accent-primary">
                <ArrowLeft className="w-5 h-5" />
              </div>
              Back to Studio
            </button>
            <div className="text-left md:text-right w-full md:w-auto">
              <h2 className="text-4xl font-black">{getStageTitle()}</h2>
              <p className="text-gray-500 italic text-sm">Axevora Pocket Session</p>
            </div>
          </div>
          <div className="w-full py-6 md:py-12 flex justify-center min-h-[400px] md:min-h-[500px] overflow-x-auto">
            {renderActiveStage()}
          </div>
        </motion.div>
      ) : (
        <>
          {/* Main Hero */}
          <section className="mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-10 relative overflow-hidden group border-r-4 border-accent-secondary"
            >
              <div className="relative z-10">
                <span className="text-accent-secondary font-medium tracking-widest text-sm uppercase mb-4 block">
                  Interactive Studio
                </span>
                <h2 className="text-4xl md:text-5xl font-black mb-6 max-w-2xl leading-tight">
                  No Instrument? <span className="text-gradient">No Problem.</span>
                </h2>
                <p className="text-gray-500 text-lg mb-8 max-w-xl">
                  Axevora Pocket puts a full orchestra in your browser. Start with the Rhythm Game or jump into the Virtual Studio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startStage(1)}
                    className="bg-gradient-music px-8 py-4 rounded-2xl font-bold flex items-center gap-3 neon-button shadow-2xl shadow-purple-500/30"
                  >
                    <Play className="fill-current" /> Start Training
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-panel px-8 py-4 rounded-2xl font-bold text-gray-300 hover:text-white transition-all"
                  >
                    Watch Tutorial
                  </motion.button>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute right-[-2%] bottom-[-5%] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                 <Zap className="w-80 h-80 text-accent-secondary transform -rotate-12" />
              </div>
            </motion.div>
          </section>

          {/* Stage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAGES.map((stage) => {
              const isUnlocked = stats?.unlockedStages.includes(stage.id) || stage.id === 1;
              const nextStage = stage.id === 1 ? null : STAGES.find(s => s.id === stage.id);
              const progress = stats ? (stats.xp / (stage.id * 100)) * 100 : 0;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={isUnlocked ? { y: -5, scale: 1.02 } : {}}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: stage.id * 0.1 }}
                  onClick={() => isUnlocked && startStage(stage.id)}
                  className={`glass-panel p-6 cursor-pointer transition-all border-l-4 relative overflow-hidden ${
                    isUnlocked 
                      ? "border-accent-primary hover:border-l-8 hover:bg-white/5 shadow-lg hover:shadow-purple-500/10" 
                      : "border-gray-800 opacity-60 grayscale cursor-not-allowed"
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-lg ${isUnlocked ? "bg-accent-primary/20 text-accent-primary" : "bg-gray-800 text-gray-500"}`}>
                      <stage.icon className={`w-6 h-6 ${isUnlocked ? "animate-pulse-slow" : ""}`} />
                    </div>
                    {isUnlocked ? (
                       <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/10 text-green-500 font-bold uppercase">Ready</span>
                    ) : (
                       <span className="text-[10px] px-2 py-1 rounded-full bg-gray-800 text-gray-500 font-bold uppercase">Locked</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{stage.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{stage.level}</p>
                  
                  {!isUnlocked && stats && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                        <span>Unlock Progress</span>
                        <span>{Math.min(100, Math.floor((stats.xp / (stage.id * 80)) * 100))}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent-secondary transition-all duration-500" 
                          style={{ width: `${Math.min(100, (stats.xp / (stage.id * 80)) * 100)}%` }} 
                        />
                      </div>
                    </div>
                  )}
                  
                  {isUnlocked && (
                    <p className="text-gray-600 text-xs leading-relaxed mt-4">{stage.description}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
