import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Dashboard />
      
      {/* Footer Branding */}
      <footer className="py-12 text-center text-gray-600 text-sm border-t border-white/5 mx-6">
        <p>© 2026 Axevora Ecosystem. All Rights Reserved.</p>
        <p className="mt-2 text-accent-secondary/60">Built with 💜 for Axevora Pocket Music Studio</p>
      </footer>
    </div>
  );
}
