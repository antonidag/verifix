import { HeroFeatures } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { KnowledgeBase } from "@/components/KnowledgeBase";
import { ProblemSubmission } from "@/components/ProblemSubmission";
import { DevelopersOverlay } from "@/components/DevelopersOverlay";
import { motion, useScroll, useTransform } from "framer-motion";

const Index = () => {
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Hero />

      <motion.div style={{ opacity: contentOpacity }}>
        <HeroFeatures />
        <ProblemSubmission />
        <KnowledgeBase />
      </motion.div>

      <Footer />
      <DevelopersOverlay />
    </div>
  );
};

export default Index;
