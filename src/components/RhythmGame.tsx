"use client";

import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import { AudioEngine } from '@/lib/audioEngine';
import { addXP } from '@/lib/progression';

class RhythmScene extends Phaser.Scene {
    private notes: Phaser.GameObjects.Rectangle[] = [];
    private score: number = 0;
    private combo: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private comboText!: Phaser.GameObjects.Text;
    private speed: number = 250;
    private lanes: number[] = [100, 200, 300, 400];
    private nextNoteTime: number = 0;

    constructor() {
        super('RhythmScene');
    }

    create() {
        const { width, height } = this.scale;

        // Draw Lanes with gradients (simulated with rectangles)
        this.lanes.forEach(x => {
            const lane = this.add.rectangle(x, height / 2, 60, height, 0xffffff, 0.03);
            this.add.line(0, 0, x - 30, 0, x - 30, height, 0x333333).setOrigin(0);
            this.add.line(0, 0, x + 30, 0, x + 30, height, 0x333333).setOrigin(0);
        });

        // Hit Zone Line (Neon style)
        const hitZone = this.add.rectangle(width/2, height - 100, width, 4, 0x8b5cf6);
        this.tweens.add({
            targets: hitZone,
            alpha: 0.5,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.scoreText = this.add.text(20, 20, 'Score: 0', { 
            fontSize: '28px', 
            color: '#a855f7',
            fontStyle: 'bold',
            fontFamily: 'Inter'
        });

        this.comboText = this.add.text(width - 20, 20, '', { 
            fontSize: '32px', 
            color: '#06b6d4',
            fontStyle: 'black',
            fontFamily: 'Inter'
        }).setOrigin(1, 0);

        // Input Handling
        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            this.checkHit(event.key.toLowerCase());
        });
    }

    update(time: number, delta: number) {
        // Spawn Notes
        if (time > this.nextNoteTime) {
            this.spawnNote();
            this.nextNoteTime = time + Phaser.Math.Between(800, 1500);
        }

        // Move Notes
        for(let i = this.notes.length - 1; i >= 0; i--) {
            const note = this.notes[i];
            note.y += (this.speed * delta) / 1000;

            // Missed Note
            if (note.y > this.scale.height) {
                note.destroy();
                this.notes.splice(i, 1);
                this.score = Math.max(0, this.score - 5);
                this.combo = 0;
                this.updateUI();
            }
        }
    }

    spawnNote() {
        const laneX = this.lanes[Phaser.Math.Between(0, this.lanes.length - 1)];
        const note = this.add.rectangle(laneX, -20, 50, 15, 0x06b6d4);
        this.notes.push(note);
        
        // Add a glow/trail effect? Later.
    }

    updateUI() {
        this.scoreText.setText(`Score: ${this.score}`);
        this.comboText.setText(this.combo > 1 ? `${this.combo}x COMBO` : '');
        if (this.combo > 1) {
            this.comboText.setScale(1.2);
            this.tweens.add({ targets: this.comboText, scale: 1, duration: 100 });
        }
    }

    checkHit(key: string) {
        const keyMap: { [key: string]: { x: number, note: string } } = { 
            'a': { x: 100, note: 'C4' }, 
            's': { x: 200, note: 'E4' }, 
            'd': { x: 300, note: 'G4' }, 
            'f': { x: 400, note: 'B4' } 
        };
        const lane = keyMap[key];

        if (!lane) return;

        const hitZoneY = this.scale.height - 100;
        const tolerance = 50;

        for (let i = 0; i < this.notes.length; i++) {
            const note = this.notes[i];
            if (note.x === lane.x && Math.abs(note.y - hitZoneY) < tolerance) {
                this.notes.splice(i, 1);
                note.destroy();
                
                this.combo++;
                this.score += 10 + (this.combo * 2);
                this.updateUI();
                
                // Add XP (Critical for progression)
                addXP(2);

                // Play Sound (Secondary, might fail)
                try {
                    AudioEngine.getInstance().playNote(lane.note);
                } catch (e) {
                    console.warn("Audio feedback failed");
                }

                // Hit effect (Burst)
                const flare = this.add.circle(lane.x, hitZoneY, 15, 0x06b6d4, 0.8);
                this.tweens.add({
                    targets: flare,
                    scale: 6,
                    alpha: 0,
                    duration: 200,
                    onComplete: () => flare.destroy()
                });
                
                return; // Hit first note in lane
            }
        }
        
        // Missed hit (if key pressed but no note)
        this.combo = 0;
        this.updateUI();
    }
}

const RhythmGame: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const gameContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gameContainer.current) return;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: gameContainer.current,
            width: 500,
            height: 600,
            backgroundColor: '#0a0a0a',
            scene: RhythmScene,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            physics: {
                default: 'arcade'
            }
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-6 relative">
            {onBack && (
                <button 
                    onClick={onBack}
                    className="absolute -top-12 right-0 glass-panel px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all"
                >
                    QUIT GAME
                </button>
            )}
            <div className="glass-panel p-4 overflow-hidden border-2 border-accent-primary/30">
                <div ref={gameContainer} className="rounded-xl overflow-hidden shadow-2xl" />
            </div>
            <div className="flex gap-4 text-center">
                {['A', 'S', 'D', 'F'].map(key => (
                    <div key={key} className="w-12 h-12 glass-panel flex items-center justify-center font-bold text-accent-secondary border-b-4 border-accent-secondary/50">
                        {key}
                    </div>
                ))}
            </div>
            <p className="text-gray-500 text-sm">Use your keyboard (A, S, D, F) to hit the notes!</p>
        </div>
    );
};

export default RhythmGame;
