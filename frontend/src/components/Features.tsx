import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Brain, Database, Zap, FileText, TrendingUp, Bot, Cpu } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Semantic Search",
    description: "Hybrid vector search finds the most relevant past solutions to current problems",
    color: "text-blue-600",
  },
  {
    icon: Brain,
    title: "LLM-Powered Generation",
    description: "When no solution exists, AI researches and drafts potential fixes",
    color: "text-purple-600",
  },
  {
    icon: Database,
    title: "Verified Solutions",
    description: "Store and retrieve verified fixes with optional documentation links",
    color: "text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Self-Learning Knowledge Base",
    description: "System becomes smarter with each new problem and resolution",
    color: "text-orange-600",
  },
  {
    icon: Zap,
    title: "FastAPI Backend",
    description: "Built with Python, FastAPI, and Qdrant for high performance",
    color: "text-cyan-600",
  },
  {
    icon: FileText,
    title: "Comprehensive API",
    description: "RESTful endpoints for integration with existing systems",
    color: "text-indigo-600",
  },
];

export const HeroFeatures = () => (
  <section className="container mx-auto px-4 py-8">
    <div className="text-center max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
          <Cpu className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="font-semibold text-slate-800 mb-2">Semantic Search</h3>
          <p className="text-slate-600 text-sm">
            Hybrid vector search finds the most relevant solutions
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all">
          <Bot className="w-8 h-8 text-cyan-600 mb-4" />
          <h3 className="font-semibold text-slate-800 mb-2">LLM Generation</h3>
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

export const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-8 bg-white/30 backdrop-blur-sm">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Key Features</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Advanced AI capabilities designed to revolutionize troubleshooting workflows
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-slate-100 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-slate-800">{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
