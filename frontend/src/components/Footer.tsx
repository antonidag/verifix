import { Zap, Github, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Verifix</h3>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              AI-powered troubleshooting assistant built for the Google AI
              Hackathon. Helping technicians solve problems faster with
              intelligent solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Made for</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Google AI Hackathon
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  API Documentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Installation Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  User Manual
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Technology</h4>
            <ul className="space-y-2 text-slate-300">
              <li>FastAPI</li>
              <li>Python 3.11</li>
              <li>Qdrant Vector DB</li>
              <li>Ollama LLM</li>
              <li>React Frontend</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 Verifix. Built for Google AI Hackathon.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-500">
              FastAPI Backend Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
