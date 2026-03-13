"use client";

export interface UserStats {
  xp: number;
  level: number;
  unlockedStages: number[];
}

export const PROGRESSION_KEY = "axevora_user_stats";

export const getStats = (): UserStats => {
  if (typeof window === "undefined") return { xp: 0, level: 1, unlockedStages: [1] };
  const saved = localStorage.getItem(PROGRESSION_KEY);
  return saved ? JSON.parse(saved) : { xp: 0, level: 1, unlockedStages: [1] };
};

export const saveStats = (stats: UserStats) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROGRESSION_KEY, JSON.stringify(stats));
    window.dispatchEvent(new CustomEvent('xpUpdated'));
  }
};

export const addXP = (amount: number) => {
  const stats = getStats();
  stats.xp += amount;
  
  // Level up logic (Example: 100 XP per level)
  const newLevel = Math.floor(stats.xp / 100) + 1;
  if (newLevel > stats.level) {
    stats.level = newLevel;
    // Unlock new stages based on level
    if (newLevel >= 2 && !stats.unlockedStages.includes(2)) stats.unlockedStages.push(2);
    if (newLevel >= 3 && !stats.unlockedStages.includes(3)) stats.unlockedStages.push(3);
    if (newLevel >= 4 && !stats.unlockedStages.includes(4)) stats.unlockedStages.push(4);
  }
  
  saveStats(stats);
  return stats;
};
