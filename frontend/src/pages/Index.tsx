import { Features, HeroFeatures } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { KnowledgeBase } from "@/components/KnowledgeBase";
import { LiveChat } from "@/components/LiveChat";
import { ProblemSubmission } from "@/components/ProblemSubmission";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* <Header /> */}
      <Hero />
      <ProblemSubmission />
      <HeroFeatures />
      <KnowledgeBase />
      <Features />
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Index;
