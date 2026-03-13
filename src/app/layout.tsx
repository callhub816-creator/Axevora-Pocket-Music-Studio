import type { Metadata } from "next";
import "../styles/globals.css";
import AIGuru from "@/components/AIGuru";

export const metadata: Metadata = {
  title: "Axevora Pocket Music Studio",
  description: "Gamified music learning in your pocket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen relative overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/20 blur-[150px] rounded-full" />
          
          {children}
          
          <AIGuru />
        </main>
      </body>
    </html>
  );
}
