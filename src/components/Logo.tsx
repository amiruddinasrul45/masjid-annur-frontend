/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string; // Additional Tailwind size or container classes
  showText?: boolean; // Whether to show "masjid AN-NUR" text on the right
  variant?: 'light' | 'dark' | 'white'; // Style variants
  iconOnly?: boolean; // Show only the dome icon
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-10',
  showText = true,
  variant = 'light',
  iconOnly = false
}) => {
  // Color configuration based on variants
  const isWhite = variant === 'white';
  const greenColor = isWhite ? '#FFFFFF' : '#006C35'; // Deep emerald green
  const goldColor = isWhite ? '#FFFFFF' : '#D6AB1E';  // Warm golden-yellow
  const textTitleColor = isWhite ? '#FFFFFF' : '#111827'; // Dark charcoal

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Hand-Crafted SVG Emblem */}
      <svg
        id="masjid-annur-emblem"
        viewBox="0 0 160 160"
        className="h-full w-auto aspect-square overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. CRESCENT MOON & STAR AT TOP */}
        <g id="star-crescent">
          {/* Crescent Moon */}
          <path
            d="M 80, 23 C 86,23 91,20 93.5,15 C 84,14 74,21 74,31.5 C 74,40 81.5,46.5 89,45 C 82.5,44 79.5,39 79.5,35.5 C 79.5,31 82.5,27.5 86.5,27 C 88,26.5 89.5,27 90,27.5 C 88,28.5 87.5,30 87.5,31.5 C 87.5,36.5 91.5,40.5 96.5,40.5 C 97.5,40.5 98,40 98.5,39.5 C 95,44.5 88.5,48.5 80,48.5 C 69.5,48.5 61,40 61,29.5 C 61,19 69.5,10.5 80,10.5 C 82,10.5 84,11 86,12 C 78,13.5 73,19.5 73,26 C 73,32.5 78,37.5 84.5,37.5 C 89,37.5 92.5,34.5 93,30.5 C 85,33.5 80,29 80,23 Z"
            fill={greenColor}
          />
          {/* Five-Pointed Star */}
          <polygon
            points="80,14 82,18 86.5,18 83,21.5 84.5,26 80,23 75.5,26 77,21.5 73.5,18 78,18"
            fill={greenColor}
          />
        </g>

        {/* 2. MAIN GREEN DOME (KUBAH) */}
        <path
          id="dome-silhouette"
          d="M 80,31.5 
             C 80,31.5 90,44 105,53
             C 120,62 129,76 131,92
             C 131,102 126,104 116,105
             C 107,106 103,111 103,115
             L 57,115
             C 57,111 53,106 44,105
             C 34,104 29,102 29,92
             C 31,76 40,62 55,53
             C 70,44 80,31.5 80,31.5 Z"
          fill={greenColor}
        />

        {/* 3. INNER WHITE DOME EMBLEMS / REFLECTION */}
        <path
          id="inner-dome-cutout"
          d="M 80,72
             C 80,72 85,82 95,87
             C 105,92 109,98 109,104
             L 51,104
             C 51,98 55,92 65,87
             C 75,82 80,72 80,72 Z"
          fill="#FFFFFF"
        />

        {/* 4. YELLOW/GOLD PERSPECTIVE FOLD STAR BASE */}
        <path
          id="gold-star-base"
          d="M 80,160 
             L 60,115 
             L 45,125 
             L 48,103 
             L 21,114 
             L 3,115 
             L 50,91
             C 50,91 60,105 80,105
             C 100,105 110,91 110,91
             L 157,115
             L 139,114
             L 112,103
             L 115,125 
             L 100,115 
             Z"
          fill={goldColor}
        />
        <path
          id="gold-star-shading"
          d="M 80,160 L 80,105 L 100,115 L 115,125 L 112,103 L 139,114 L 157,115 Z"
          fill="rgba(0,0,0,0.08)"
        />
      </svg>

      {/* 5. TYPOGRAPHY (MASJID AN-NUR) */}
      {showText && !iconOnly && (
        <div className="flex flex-col select-none leading-none">
          <span
            className="font-sans font-semibold text-[11px] tracking-widest uppercase text-slate-500"
          >
            Masjid
          </span>
          <span
            className="font-sans font-bold text-lg md:text-xl tracking-tight uppercase"
            style={{ color: greenColor }}
          >
            An-Nur
          </span>
        </div>
      )}
    </div>
  );
};
