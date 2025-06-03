import epical from "@/assets/epical-logo.svg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const headerPadding = useTransform(scrollY, [0, 200], ["20rem", "1rem"]);
  const titleScale = useTransform(scrollY, [0, 100], [1.2, 1]);

  return (
    <motion.section
      ref={ref}
      className="container mx-auto px-4 flex items-center justify-center"
      style={{ paddingTop: "40vh", paddingBottom: headerPadding }}
    >
      <motion.div className="text-center max-w-4xl">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-cyan-800 bg-clip-text text-transparent"
          style={{ scale: titleScale }}
        >
          AI-Powered Troubleshooter
        </motion.h1>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-lg">
          <span>Powered by</span>
          <img src={epical} alt="Epical logo" className="h-12" />
        </div>
      </motion.div>
    </motion.section>
  );
};
