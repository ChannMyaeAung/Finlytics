import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronUp } from "lucide-react";

// Shows a floating button in the bottom-right corner once the user has scrolled
// past a threshold. Clicking it smoothly scrolls back to the top of the page.
// Rendered globally in App.tsx so it's available on every route.
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-emerald-800 text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-700 transition-colors cursor-pointer"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
