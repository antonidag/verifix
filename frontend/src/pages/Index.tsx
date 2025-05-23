import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSubmission } from "@/components/ProblemSubmission";
import { Features } from "@/components/Features";
import { KnowledgeBase } from "@/components/KnowledgeBase";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Header />
      <Hero />
      <ProblemSubmission />
      <Features />
      <KnowledgeBase />
      <Footer />
    </div>
  );
};

export default Index;
