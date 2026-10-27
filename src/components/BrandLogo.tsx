import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  animated = true,
}) => {
  const sizeMap = {
    sm: {
      container: 'w-8 h-8 rounded-xl',
      svg: 'w-5 h-5',
      text: 'text-sm',
      sub: 'text-[9px]',
    },
    md: {
      container: 'w-9 h-9 rounded-xl',
      svg: 'w-5.5 h-5.5',
      text: 'text-sm',
      sub: 'text-[10px]',
    },
    lg: {
      container: 'w-11 h-11 rounded-2xl',
      svg: 'w-7 h-7',
      text: 'text-base',
      sub: 'text-xs',
    },
    xl: {
      container: 'w-14 h-14 rounded-2xl',
      svg: 'w-9 h-9',
      text: 'text-lg',
      sub: 'text-xs',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric Tech Emblem */}
      <div
        className={`relative ${currentSize.container} bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#090d16] p-[1.5px] shadow-sm rounded-xl transition-all duration-300 border border-white/10 ${
          animated
            ? 'group-hover:border-[#0284c7]/80 group-hover:shadow-[0_0_18px_rgba(2,132,199,0.4)] group-hover:scale-105'
            : ''
        }`}
      >
        <div className="w-full h-full bg-[#0b1120] rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Ambient Cyber Glow */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#38bdf8]/25 rounded-full blur-xs pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-[#0284c7]/30 rounded-full blur-xs pointer-events-none" />

          {/* Precision 3D Prism & Monogram Vector */}
          <svg
            className={`${currentSize.svg} relative z-10`}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Primary Cyan & Blue Gradients */}
              <linearGradient id="logo-cyan-grad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>

              <linearGradient id="logo-top-facet" x1="12" y1="8" x2="36" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.08" />
              </linearGradient>

              <linearGradient id="logo-p-stem" x1="16" y1="12" x2="16" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              <linearGradient id="logo-spark" x1="32" y1="8" x2="40" y2="16" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>

            {/* Isometric Outer Tech Hexagon Prism */}
            <path
              d="M24 6L40 15V33L24 42L8 33V15L24 6Z"
              stroke="#334155"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="url(#logo-top-facet)"
            />

            {/* Inner Isometric Planes */}
            <path
              d="M24 6L40 15L24 24L8 15L24 6Z"
              fill="url(#logo-top-facet)"
              stroke="#0284C7"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <path
              d="M24 24V42M24 24L40 15M24 24L8 15"
              stroke="#1E293B"
              strokeWidth="1.5"
            />

            {/* Futuristic "P" Code Core Monogram */}
            {/* P Vertical Stem */}
            <rect
              x="16"
              y="13"
              width="4"
              height="22"
              rx="2"
              fill="url(#logo-p-stem)"
            />

            {/* P Curved Loop with Cyan Pulse */}
            <path
              d="M20 13H27C31.4183 13 34.5 16.0817 34.5 20.5C34.5 24.9183 31.4183 28 27 28H20"
              stroke="url(#logo-cyan-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dynamic Code Terminal Arrow (>) */}
            <path
              d="M25 20.5L28.5 23.5L25 26.5"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Orbiting Quantum Star Point */}
            <circle cx="37" cy="11" r="2.25" fill="url(#logo-spark)" />
            <circle cx="37" cy="11" r="4.5" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" strokeDasharray="2 2" />
          </svg>
        </div>
      </div>

      {/* Typography: Clean Wordmark */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-bold text-[#0f172a] ${currentSize.text} tracking-tight font-sans leading-none`}
            >
              Pranav Gawande
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
            <span
              className={`font-mono font-medium text-[#64748b] ${currentSize.sub} tracking-wider uppercase leading-none`}
            >
              Full-Stack Developer
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
