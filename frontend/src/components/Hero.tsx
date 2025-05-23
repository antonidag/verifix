import { Link } from "react-router-dom";
import { ArrowRight, Bot, Cpu, Database, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-2xl shadow-lg animate-pulse">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-cyan-800 bg-clip-text text-transparent">
          AI-Powered Troubleshooting Assistant
        </h1>

        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          Help technicians and site managers solve problems faster with semantic
          search, LLM-powered solutions, and a self-learning knowledge base.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <a href="/#submit">
              Submit Problem
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-slate-300 hover:bg-slate-50"
          >
            <Link to="/api-docs">View API Docs</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
            <Cpu className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-slate-800 mb-2">
              Semantic Search
            </h3>
            <p className="text-slate-600 text-sm">
              Hybrid vector search finds the most relevant solutions
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
            <Bot className="w-8 h-8 text-cyan-600 mb-4" />
            <h3 className="font-semibold text-slate-800 mb-2">
              LLM Generation
            </h3>
            <p className="text-slate-600 text-sm">
              AI researches and drafts solutions when none exist
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
            <Database className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-slate-800 mb-2">Self-Learning</h3>
            <p className="text-slate-600 text-sm">
              Knowledge base grows smarter with each resolution
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
