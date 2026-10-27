import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  threshold?: number;
}

export function ScrollToTop({ threshold = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      id="scroll-to-top-button"
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      title="Scroll to top"
      className={`fixed bottom-6 right-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white/95 backdrop-blur-xs border border-gray-200/90 text-[#334155] hover:text-[#0284c7] hover:border-[#0284c7]/60 hover:bg-[#f0f9ff] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7]/40 active:scale-95 transition-all duration-300 cursor-pointer group ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
