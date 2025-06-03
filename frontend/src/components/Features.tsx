import {
  Bot,
  Brain,
  Cloud,
  Code,
  Database,
  Search,
  Zap,
  MessageCircle,
} from "lucide-react";

const techStack = [
  {
    icon: Cloud,
    title: "Cloud",
    items: ["Google Cloud Platform", "Google Cloud Run", "Docker"],
    color: "text-blue-600",
  },
  {
    icon: Brain,
    title: "AI Tools",
    items: ["Google Gemini", "GPT Researcher", "Vector Embeddings"],
    color: "text-purple-600",
  },
  {
    icon: Database,
    title: "Data Storage",
    items: ["Google Firestore"],
    color: "text-green-600",
  },
  {
    icon: Zap,
    title: "Backend",
    items: ["Python", "FastAPI"],
    color: "text-orange-600",
  },
  {
    icon: Code,
    title: "Frontend",
    items: ["React", "Typescript"],
    color: "text-cyan-600",
  },
];

export const HeroFeatures = () => (
  <section className="container mx-auto px-4 py-8 space-y-12">
    {/* Key Features Flow */}
    <div className="text-center max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-14 relative">
        {/* Step 1 */}
        <div className="relative">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <h3 className="font-semibold text-slate-800">Submit Issue</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Describe the problem and/or upload a photo
            </p>
          </div>
          <div className="hidden md:flex absolute -right-9 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 justify-center items-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M5 12h14m-4 -4l4 4l-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="w-8 h-8 text-purple-600 flex-shrink-0" />
              <h3 className="font-semibold text-slate-800">Smart Search</h3>
            </div>
            <p className="text-slate-600 text-sm">
              System searches for similar past solutions
            </p>
          </div>
          <div className="hidden md:flex absolute -right-9 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 justify-center items-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M5 12h14m-4 -4l4 4l-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bot className="w-8 h-8 text-green-600 flex-shrink-0" />
              <h3 className="font-semibold text-slate-800">AI Analysis</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Research agent produces solutions using Google Gemini
            </p>
          </div>
          <div className="hidden md:flex absolute -right-9 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 justify-center items-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M5 12h14m-4 -4l4 4l-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Step 4 */}
        <div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Database className="w-8 h-8 text-cyan-600 flex-shrink-0" />
              <h3 className="font-semibold text-slate-800">Knowledge Growth</h3>
            </div>
            <p className="text-slate-600 text-sm">
              Solution is saved to enhance future recommendations
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Tech Stack */}
    <div className="text-center max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Tech Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {techStack.map((tech) => (
          <div
            key={tech.title}
            className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <tech.icon className={`w-8 h-8 ${tech.color} flex-shrink-0`} />
              <h3 className="font-semibold text-slate-800">{tech.title}</h3>
            </div>
            <ul className="text-slate-600 text-sm space-y-2 text-left">
              {tech.items.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);
