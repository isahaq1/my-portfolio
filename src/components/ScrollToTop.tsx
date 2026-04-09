"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-8 right-8 z-[100]"
        >
          <MagneticButton strength={0.5}>
            <button
              onClick={scrollToTop}
              className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#0a0a20]/80 backdrop-blur-xl border border-white/10 text-white shadow-2xl transition-all hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-indigo-500/30 group"
              aria-label="Scroll to top"
            >
              <ChevronUp size={24} className="transition-transform group-hover:-translate-y-1" />
              
              {/* Outer glow aura */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
