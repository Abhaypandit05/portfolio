import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that detects when an element enters the viewport.
 * Returns [ref, isVisible] — attach the ref to your element.
 */
export function useInView(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Only trigger once
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
