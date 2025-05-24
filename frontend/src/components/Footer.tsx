import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2025 Verifix. Built for Google AI Hackathon.</p>
          <a
            href="https://github.com/antonidag/verifix"
            className="text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
