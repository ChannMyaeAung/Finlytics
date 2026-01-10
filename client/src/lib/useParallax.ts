import {
  type MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

type UseParallaxReturn<T extends HTMLElement> = {
  ref: MutableRefObject<T | null>;
  offset: number;
};

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.15
): UseParallaxReturn<T> {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > windowHeight) {
        return;
      }

      const progress = (windowHeight - rect.top) / (windowHeight + rect.height || 1);
      setOffset((progress - 0.5) * speed * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}
