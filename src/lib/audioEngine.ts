import { addXP } from "./progression";

export class AudioEngine {
  private static instance: AudioEngine;
  private synth: any = null;
  private drumSynth: any = null;
  private snareSynth: any = null;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  private async ensureInitialized() {
    if (this.initialized) return;
    if (typeof window === "undefined") return;

    try {
      const T = await import('tone');
      // Some bundlers put everything in .default, others in the root
      const Tone: any = T.default || T;
      
      const startFn = Tone.start || (Tone as any).start;
      if (typeof startFn === 'function') {
        await startFn();
      }
      
      const lib = Tone;
      if (lib.PolySynth) {
        this.synth = new lib.PolySynth(lib.Synth || (lib as any).Synth).toDestination();
        this.drumSynth = new lib.MembraneSynth().toDestination();
        this.snareSynth = new lib.NoiseSynth({
          noise: { type: "white" },
          envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
        }).toDestination();

        if (this.synth) {
          this.synth.set({
            oscillator: { type: "triangle" },
            envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 }
          });
        }
        this.initialized = true;
        console.log("Audio Engine Successfully Initialized");
      } else {
        throw new Error("Tone.PolySynth not found in module");
      }
    } catch (error) {
      console.error("Audio Engine init failed:", error);
    }
  }

  public async playNote(note: string) {
    try {
      await this.ensureInitialized();
      if (this.synth) {
        this.synth.triggerAttackRelease(note, "8n");
      }
    } catch (e) {
      console.warn("PlayNote failed", e);
    }
  }

  public async playDrum(type: 'kick' | 'snare' | 'hihat') {
    try {
      await this.ensureInitialized();
      const T = await import('tone');
      const Tone: any = T.default || T;
      const NoiseSynth = Tone.NoiseSynth;
      
      if (type === 'kick' && this.drumSynth) this.drumSynth.triggerAttackRelease("C1", "8n");
      else if (type === 'snare' && this.snareSynth) this.snareSynth.triggerAttackRelease("16n");
      else if (type === 'hihat' && NoiseSynth) {
        const hihat = new NoiseSynth({
          envelope: { attack: 0.001, decay: 0.01, sustain: 0 }
        }).toDestination();
        hihat.triggerAttackRelease("16n");
      }
    } catch (e) {
      console.warn("PlayDrum failed", e);
    }
  }

  public setVolume(value: number) {
    if (this.synth) {
      this.synth.volume.value = value;
    }
  }
}
