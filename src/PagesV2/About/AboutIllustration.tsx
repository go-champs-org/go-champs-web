import React from 'react';

const AboutIllustration: React.FC = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
    >
      {/* Trophy Base */}
      <rect
        x="150"
        y="420"
        width="100"
        height="60"
        fill="var(--theme-v2-textSecondary)"
      />
      <rect x="120" y="380" width="160" height="40" fill="#D4AF37" />

      {/* Trophy Cup */}
      <path
        d="M 140 380 L 130 340 L 160 320 L 240 320 L 270 340 L 260 380 Z"
        fill="#FFD700"
      />
      <ellipse cx="200" cy="320" rx="45" ry="15" fill="#FFC700" />

      {/* Trophy Handles */}
      <path
        d="M 130 360 Q 100 360 100 340 Q 100 320 130 330"
        fill="none"
        stroke="#FFD700"
        strokeWidth="8"
      />
      <path
        d="M 270 360 Q 300 360 300 340 Q 300 320 270 330"
        fill="none"
        stroke="#FFD700"
        strokeWidth="8"
      />

      {/* Basketball Player - Body */}
      <ellipse
        cx="200"
        cy="220"
        rx="40"
        ry="45"
        fill="var(--theme-v2-textSecondary)"
      />

      {/* Jersey - Number 1 */}
      <rect
        x="170"
        y="200"
        width="60"
        height="50"
        fill="var(--theme-v2-primary)"
      />
      <text
        x="200"
        y="235"
        fontSize="28"
        fontWeight="bold"
        fill="var(--theme-v2-accent)"
        textAnchor="middle"
      >
        1
      </text>

      {/* Arms */}
      <line
        x1="165"
        y1="210"
        x2="120"
        y2="240"
        stroke="var(--theme-v2-textSecondary)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <line
        x1="235"
        y1="210"
        x2="280"
        y2="240"
        stroke="var(--theme-v2-textSecondary)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Left Hand holding basketball */}
      <circle cx="120" cy="250" r="12" fill="var(--theme-v2-textSecondary)" />

      {/* Basketball */}
      <circle cx="120" cy="280" r="25" fill="#FF6B35" />
      <line
        x1="95"
        y1="280"
        x2="145"
        y2="280"
        stroke="#1D1D1B"
        strokeWidth="2"
      />
      <line
        x1="120"
        y1="255"
        x2="120"
        y2="305"
        stroke="#1D1D1B"
        strokeWidth="2"
      />
      <path
        d="M 105 265 Q 120 275 135 265"
        fill="none"
        stroke="#1D1D1B"
        strokeWidth="2"
      />
      <path
        d="M 105 295 Q 120 285 135 295"
        fill="none"
        stroke="#1D1D1B"
        strokeWidth="2"
      />

      {/* Right Hand */}
      <circle cx="280" cy="250" r="12" fill="var(--theme-v2-textSecondary)" />

      {/* Legs */}
      <line
        x1="190"
        y1="260"
        x2="180"
        y2="340"
        stroke="var(--theme-v2-textSecondary)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <line
        x1="210"
        y1="260"
        x2="220"
        y2="340"
        stroke="var(--theme-v2-textSecondary)"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Shoes */}
      <ellipse cx="180" cy="345" rx="18" ry="12" fill="#1D1D1B" />
      <ellipse cx="220" cy="345" rx="18" ry="12" fill="#1D1D1B" />

      {/* Head */}
      <circle cx="200" cy="160" r="35" fill="var(--theme-v2-textSecondary)" />

      {/* Hair/Ponytail */}
      <path
        d="M 220 140 Q 240 130 250 145 Q 240 150 235 155"
        fill="var(--theme-v2-text)"
      />

      {/* Face - Eyes */}
      <circle cx="190" cy="160" r="4" fill="var(--theme-v2-text)" />
      <circle cx="210" cy="160" r="4" fill="var(--theme-v2-text)" />

      {/* Face - Smile */}
      <path
        d="M 185 170 Q 200 178 215 170"
        fill="none"
        stroke="var(--theme-v2-text)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Decorative elements - Stars around the player */}
      <text x="80" y="150" fontSize="24" fill="var(--theme-v2-accent)">
        ⭐
      </text>
      <text x="300" y="180" fontSize="20" fill="var(--theme-v2-accent)">
        ⭐
      </text>
      <text x="260" y="100" fontSize="18" fill="var(--theme-v2-accent)">
        ⭐
      </text>
    </svg>
  );
};

export default AboutIllustration;
