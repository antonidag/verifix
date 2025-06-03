import epical from "@/assets/epical-logo.svg";

export const Hero = () => {
  return (
    <section className="container mx-auto px-4 pt-16 md:pt-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-cyan-800 bg-clip-text text-transparent">
          AI-Powered Troubleshooter
        </h1>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-lg">
          <span>Powered by</span>
          <img src={epical} alt="Epical logo" className="h-12" />
        </div>
      </div>
    </section>
  );
};
