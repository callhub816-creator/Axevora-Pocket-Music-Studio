export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: "Easy" | "Medium" | "Pro";
  notes: { time: number; note: string; lane: number }[];
}

export const SONGS: Song[] = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle",
    artist: "Classic",
    difficulty: "Easy",
    notes: [
      { time: 1000, note: "C4", lane: 1 },
      { time: 2000, note: "C4", lane: 1 },
      { time: 3000, note: "G4", lane: 3 },
      { time: 4000, note: "G4", lane: 3 },
      { time: 5000, note: "A4", lane: 4 },
      { time: 6000, note: "A4", lane: 4 },
      { time: 7000, note: "G4", lane: 3 },
    ]
  },
  {
    id: "axevora_vibe",
    title: "Axevora Vibe",
    artist: "AI Gen",
    difficulty: "Medium",
    notes: [
      { time: 500, note: "D4", lane: 2 },
      { time: 1000, note: "F4", lane: 4 },
      { time: 1500, note: "G4", lane: 3 },
      { time: 2000, note: "A4", lane: 4 },
    ]
  }
];
