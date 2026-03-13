export type Language = 'english' | 'hindi' | 'marathi';

export const THEORY_DATA: Record<Language, { title: string; content: string; tip: string }[]> = {
  english: [
    { title: "What is a Note?", content: "A note is a sound with a specific pitch. In music, we use letters A, B, C, D, E, F, G.", tip: "Start with C Major - it's the easiest!" },
    { title: "Rhythm Basics", content: "Rhythm is the heartbeat of music. It's about when you play the notes.", tip: "Tap your foot while playing to stay on beat." }
  ],
  hindi: [
    { title: "सुर (Note) क्या है?", content: "सुर एक विशिष्ट पिच वाली आवाज़ है। संगीत में हम सा, रे, गा, मा, पा, धा, नी का उपयोग करते हैं।", tip: "सा (C) से शुरू करें - यह सबसे सरल है!" },
    { title: "ताल (Rhythm) क्या है?", content: "ताल संगीत की धड़कन है। यह इस बारे में है कि आप सुर कब बजाते हैं।", tip: "बीट पर बने रहने के लिए बजाते समय अपना पैर थपथपाएं।" }
  ],
  marathi: [
    { title: "स्वर (Note) म्हणजे काय?", content: "स्वर म्हणजे एका विशिष्ट पट्टीतील आवाज. संगीतात आपण सा, रे, ग, म, प, ध, नी वापरतो.", tip: "सा (C) पासून सुरुवात करा - हे सर्वात सोपे आहे!" },
    { title: "लय (Rhythm) म्हणजे काय?", content: "लय म्हणजे संगीताचे ठोके. तुम्ही स्वर कधी वाजवता हे लय ठरवते.", tip: "तालावर राहण्यासाठी वाजवताना आपला पाय टॅप करा." }
  ]
};

export const GURU_RESPONSES = {
  success: ["Brilliant!", "Zabardast!", "Lay bhari!", "Keep it up!", "Vaah!"],
  retry: ["Try again!", "Phir se koshish karo!", "Punha prayatna kara!", "You are close!", "Thoda aur dhyan do."]
};
