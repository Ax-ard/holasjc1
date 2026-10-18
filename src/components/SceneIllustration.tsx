import React from 'react';
import { BackgroundType, DayPhase } from '../types/game';

interface SceneIllustrationProps {
  type: BackgroundType;
  phase: DayPhase;
  className?: string;
}

export const SceneIllustration: React.FC<SceneIllustrationProps> = ({
  type,
  phase,
  className = 'w-full h-64 md:h-80',
}) => {
  // Determine time of day lighting overlay
  const isNight = phase === 'evening';
  const isNoon = phase === 'noon';

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-stone-700/60 shadow-lg select-none ${className}`}>
      {/* Background SVG Canvas */}
      <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          {/* Gradients */}
          <linearGradient id="skyDay" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#f0f9ff" />
          </linearGradient>
          <linearGradient id="skyNoon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          <linearGradient id="skyNight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="60%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="dormWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fae8b4" />
          </linearGradient>
          <linearGradient id="grassField" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="militaryGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3f6212" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
        </defs>

        {/* 1. DORMITORY */}
        {type === 'dorm' && (
          <g>
            {/* Room Walls & Floor */}
            <rect width="800" height="320" fill="url(#dormWall)" />
            <rect y="320" width="800" height="130" fill="#78350f" opacity="0.85" />
            {/* Floor wooden planks */}
            <line x1="0" y1="360" x2="800" y2="360" stroke="#451a03" strokeWidth="2" opacity="0.3" />
            <line x1="0" y1="405" x2="800" y2="405" stroke="#451a03" strokeWidth="2" opacity="0.3" />

            {/* Window with sunlight */}
            <rect x="300" y="40" width="200" height="150" fill="#bae6fd" stroke="#d97706" strokeWidth="6" rx="4" />
            <line x1="400" y1="40" x2="400" y2="190" stroke="#d97706" strokeWidth="4" />
            <line x1="300" y1="115" x2="500" y2="115" stroke="#d97706" strokeWidth="4" />
            {/* Sun rays through window */}
            <polygon points="300,190 220,380 580,380 500,190" fill="#fef08a" opacity="0.15" />

            {/* Left Bunk Bed Frame */}
            <rect x="40" y="100" width="18" height="260" fill="#1e293b" />
            <rect x="240" y="100" width="18" height="260" fill="#1e293b" />
            {/* Bottom Bed Mattress */}
            <rect x="58" y="270" width="182" height="30" fill="#e2e8f0" rx="3" />
            {/* Top Bed Mattress */}
            <rect x="58" y="160" width="182" height="25" fill="#e2e8f0" rx="3" />
            {/* Bed safety rails */}
            <line x1="58" y1="140" x2="240" y2="140" stroke="#334155" strokeWidth="4" />

            {/* FAMOUS FOLDED SQUARE BLANKET ("Chăn con lợn") on Bottom Bed */}
            <rect x="75" y="225" width="75" height="45" fill="#2d5a3f" stroke="#14532d" strokeWidth="2" rx="2" />
            <line x1="75" y1="240" x2="150" y2="240" stroke="#166534" strokeWidth="2" />
            <line x1="112" y1="225" x2="112" y2="270" stroke="#166534" strokeWidth="1.5" />
            {/* White mosquito net folded on top */}
            <rect x="80" y="210" width="65" height="15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" rx="1" />

            {/* Right Locker & Table */}
            <rect x="580" y="120" width="170" height="240" fill="#92400e" rx="4" />
            <line x1="665" y1="120" x2="665" y2="360" stroke="#451a03" strokeWidth="3" />
            <circle cx="650" cy="240" r="4" fill="#fbbf24" />
            <circle cx="680" cy="240" r="4" fill="#fbbf24" />

            {/* Canteen bottles on hook */}
            <rect x="530" y="170" width="30" height="40" rx="6" fill="#166534" />
            <rect x="540" y="160" width="10" height="10" fill="#94a3b8" />
            <line x1="545" y1="150" x2="545" y2="160" stroke="#475569" strokeWidth="2" />

            {/* Slippers under bed */}
            <ellipse cx="100" cy="335" rx="16" ry="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <ellipse cx="130" cy="335" rx="16" ry="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <ellipse cx="170" cy="335" rx="16" ry="6" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
            <ellipse cx="200" cy="335" rx="16" ry="6" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
          </g>
        )}

        {/* 2. PARADE GROUND (Thao trường chào cờ) */}
        {type === 'parade' && (
          <g>
            <rect width="800" height="260" fill={isNight ? 'url(#skyNight)' : isNoon ? 'url(#skyNoon)' : 'url(#skyDay)'} />
            {/* Distant Ba Vi Mountains */}
            <polygon points="-20,260 120,160 280,260" fill="#475569" opacity="0.6" />
            <polygon points="180,260 360,130 520,260" fill="#334155" opacity="0.7" />
            <polygon points="440,260 620,150 780,260" fill="#475569" opacity="0.6" />

            {/* Parade Ground Grass & Track */}
            <rect y="240" width="800" height="210" fill="url(#grassField)" />
            {/* Red Tartan Running Track */}
            <path d="M0,360 Q400,310 800,360 L800,450 L0,450 Z" fill="#b91c1c" />
            <path d="M0,380 Q400,335 800,380" stroke="#ffffff" strokeWidth="3" strokeDasharray="12,12" fill="none" />
            <path d="M0,410 Q400,365 800,410" stroke="#ffffff" strokeWidth="3" strokeDasharray="12,12" fill="none" />

            {/* Grandstand / Flagpole */}
            <rect x="390" y="50" width="6" height="220" fill="#e2e8f0" />
            <polygon points="396,55 460,75 396,95" fill="#dc2626" />
            <polygon points="415,75 418,80 424,80 419,83 421,88 415,85 409,88 411,83 406,80 412,80" fill="#fbbf24" />
            <rect x="365" y="255" width="56" height="15" fill="#cbd5e1" rx="2" />

            {/* White parade markers */}
            <circle cx="200" cy="290" r="5" fill="#ffffff" />
            <circle cx="300" cy="290" r="5" fill="#ffffff" />
            <circle cx="500" cy="290" r="5" fill="#ffffff" />
            <circle cx="600" cy="290" r="5" fill="#ffffff" />
          </g>
        )}

        {/* 3. CANTEEN (Nhà ăn quân sự) */}
        {type === 'canteen' && (
          <g>
            <rect width="800" height="240" fill="#f8fafc" />
            <rect y="240" width="800" height="210" fill="#e2e8f0" />
            {/* Tile grid */}
            <line x1="0" y1="300" x2="800" y2="300" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="370" x2="800" y2="370" stroke="#cbd5e1" strokeWidth="2" />

            {/* Back serving counter */}
            <rect x="80" y="70" width="640" height="130" fill="#0284c7" rx="6" />
            <rect x="100" y="85" width="600" height="60" fill="#38bdf8" opacity="0.6" rx="4" />
            {/* Steam rising */}
            <path d="M220,80 Q225,65 220,50" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.5" />
            <path d="M380,80 Q385,65 380,50" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.5" />
            <path d="M540,80 Q545,65 540,50" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.5" />

            {/* Large Stainless Steel Dining Table in Center */}
            <rect x="120" y="250" width="560" height="110" fill="#94a3b8" rx="6" stroke="#475569" strokeWidth="3" />
            <rect x="135" y="260" width="530" height="70" fill="#cbd5e1" rx="4" />

            {/* Six Inox Meal Trays with 5 compartments */}
            {[160, 250, 340, 430, 520].map((x, idx) => (
              <g key={idx}>
                <rect x={x} y="270" width="70" height="50" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                {/* Rice */}
                <rect x={x + 5} y="275" width="28" height="20" rx="2" fill="#ffffff" />
                {/* Meat */}
                <rect x={x + 37} y="275" width="28" height="10" rx="2" fill="#b45309" />
                {/* Vegetable */}
                <rect x={x + 37} y="287" width="28" height="8" rx="2" fill="#15803d" />
                {/* Soup Bowl */}
                <circle cx={x + 19} cy="308" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              </g>
            ))}

            {/* Wooden Benches */}
            <rect x="100" y="380" width="600" height="30" fill="#78350f" rx="4" />
          </g>
        )}

        {/* 4. LECTURE HALL (Giảng đường lý thuyết) */}
        {type === 'lecture' && (
          <g>
            <rect width="800" height="300" fill="#f1f5f9" />
            <rect y="300" width="800" height="150" fill="#334155" />

            {/* Large Blackboard */}
            <rect x="150" y="40" width="500" height="180" fill="#1e3a2b" stroke="#854d0e" strokeWidth="8" rx="4" />
            {/* Tactical diagram chalk sketch */}
            <circle cx="300" cy="120" r="25" stroke="#fef08a" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <polygon points="450,110 470,120 450,130" fill="#ef4444" />
            <line x1="330" y1="120" x2="445" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />
            {/* Chalk text header */}
            <text x="230" y="75" fill="#ffffff" fontFamily="sans-serif" fontSize="16" fontWeight="bold">BÀI: NGHỆ THUẬT QUÂN SỰ VIỆT NAM</text>

            {/* Speaker Podium */}
            <rect x="350" y="200" width="100" height="120" fill="#78350f" rx="3" stroke="#451a03" strokeWidth="2" />
            <path d="M395,200 L395,185 L405,185" stroke="#94a3b8" strokeWidth="3" fill="none" />
            <circle cx="405" cy="185" r="4" fill="#0f172a" />

            {/* Student Desks in Foreground */}
            <rect x="60" y="340" width="680" height="50" fill="#a16207" rx="4" />
            <rect x="70" y="395" width="660" height="40" fill="#475569" rx="3" />
            {/* Notebooks on desk */}
            <rect x="160" y="348" width="40" height="30" fill="#0284c7" rx="2" />
            <rect x="360" y="348" width="40" height="30" fill="#15803d" rx="2" />
            <rect x="560" y="348" width="40" height="30" fill="#dc2626" rx="2" />
          </g>
        )}

        {/* 5. OUTDOOR TRAINING FIELD (Thao trường dã chiến) */}
        {type === 'outdoor' && (
          <g>
            <rect width="800" height="240" fill={isNight ? 'url(#skyNight)' : 'url(#skyDay)'} />
            {/* Pine forest on hill */}
            {[60, 160, 260, 360, 480, 580, 680].map((x, idx) => (
              <polygon key={idx} points={`${x},240 ${x + 35},120 ${x + 70},240`} fill="#166534" />
            ))}

            {/* Hill / Dirt field */}
            <path d="M0,220 Q200,190 400,230 T800,210 L800,450 L0,450 Z" fill="#b45309" />
            <path d="M0,270 Q300,240 600,280 T800,260 L800,450 L0,450 Z" fill="#78350f" opacity="0.6" />

            {/* Barbed wire obstacle */}
            {[100, 250, 400, 550, 700].map((x, idx) => (
              <g key={idx}>
                <line x1={x} y1="280" x2={x} y2="330" stroke="#334155" strokeWidth="4" />
                <line x1={x + 30} y1="280" x2={x - 10} y2="330" stroke="#334155" strokeWidth="3" />
              </g>
            ))}
            <path d="M50,300 Q400,280 750,300" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,6" fill="none" />
            <path d="M50,320 Q400,300 750,320" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,6" fill="none" />

            {/* Shooting Target (Bia số 4) */}
            <g transform="translate(620, 220)">
              <rect x="0" y="0" width="50" height="65" rx="10" fill="#166534" stroke="#ffffff" strokeWidth="2" />
              <circle cx="25" cy="25" r="14" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="25" cy="25" r="7" fill="#ffffff" />
            </g>
          </g>
        )}

        {/* 6. WASH & LAUNDRY AREA (Khu giặt và sân phơi) */}
        {type === 'wash' && (
          <g>
            <rect width="800" height="260" fill="url(#skyDay)" />
            <rect y="260" width="800" height="190" fill="#64748b" />
            {/* Wet tile floor */}
            <line x1="0" y1="320" x2="800" y2="320" stroke="#475569" strokeWidth="2" />
            <line x1="0" y1="390" x2="800" y2="390" stroke="#475569" strokeWidth="2" />

            {/* Stainless steel wash basins with water taps */}
            <rect x="80" y="200" width="640" height="60" fill="#94a3b8" rx="4" stroke="#334155" strokeWidth="3" />
            {[150, 270, 390, 510, 630].map((x, idx) => (
              <g key={idx}>
                {/* Faucet */}
                <path d={`M${x},170 L${x},185 L${x + 10},185 L${x + 10},195`} stroke="#0284c7" strokeWidth="4" fill="none" />
                {/* Water droplet */}
                <ellipse cx={x + 10} cy="205" rx="2" ry="4" fill="#38bdf8" />
                {/* Plastic basin */}
                <ellipse cx={x} cy="235" rx="35" ry="12" fill={idx % 2 === 0 ? '#ef4444' : '#0284c7'} />
              </g>
            ))}

            {/* Clothesline stretched across with green uniforms */}
            <line x1="40" y1="70" x2="760" y2="70" stroke="#cbd5e1" strokeWidth="3" />
            {/* Hanging green uniforms and white towels */}
            <polygon points="120,70 140,140 180,140 200,70" fill="#2d5a3f" stroke="#166534" strokeWidth="2" />
            <rect x="230" y="70" width="50" height="70" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="310,70 330,140 370,140 390,70" fill="#2d5a3f" stroke="#166534" strokeWidth="2" />
            <rect x="420" y="70" width="50" height="70" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="500,70 520,140 560,140 580,70" fill="#2d5a3f" stroke="#166534" strokeWidth="2" />
            <rect x="610" y="70" width="50" height="70" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
          </g>
        )}

        {/* 7. COURTYARD (Sân trung tâm cây xanh) */}
        {type === 'courtyard' && (
          <g>
            <rect width="800" height="280" fill={isNight ? 'url(#skyNight)' : 'url(#skyDay)'} />
            {/* Campus Brick Buildings */}
            <rect x="40" y="100" width="220" height="180" fill="#f59e0b" stroke="#b45309" strokeWidth="3" rx="4" />
            <rect x="540" y="100" width="220" height="180" fill="#f59e0b" stroke="#b45309" strokeWidth="3" rx="4" />
            {/* Window rows */}
            {[130, 180, 230].map((y, idx) => (
              <g key={idx}>
                <rect x="70" y={y} width="35" height="30" fill="#0284c7" rx="2" />
                <rect x="130" y={y} width="35" height="30" fill="#0284c7" rx="2" />
                <rect x="190" y={y} width="35" height="30" fill="#0284c7" rx="2" />
                <rect x="570" y={y} width="35" height="30" fill="#0284c7" rx="2" />
                <rect x="630" y={y} width="35" height="30" fill="#0284c7" rx="2" />
                <rect x="690" y={y} width="35" height="30" fill="#0284c7" rx="2" />
              </g>
            ))}

            {/* Courtyard Greenery & Pathways */}
            <rect y="270" width="800" height="180" fill="#15803d" />
            {/* Stone Pathway */}
            <polygon points="360,270 440,270 520,450 280,450" fill="#e2e8f0" />

            {/* Big Royal Poinciana / Banyan Tree in Center */}
            <path d="M370,290 Q400,210 390,160 Q420,210 430,290" fill="#78350f" />
            <circle cx="400" cy="130" r="70" fill="#16a34a" opacity="0.9" />
            <circle cx="360" cy="110" r="50" fill="#22c55e" opacity="0.8" />
            <circle cx="440" cy="110" r="50" fill="#15803d" opacity="0.8" />

            {/* Stone bench */}
            <rect x="250" y="320" width="70" height="15" fill="#94a3b8" rx="2" />
            <rect x="260" y="335" width="10" height="15" fill="#475569" />
            <rect x="300" y="335" width="10" height="15" fill="#475569" />
          </g>
        )}

        {/* 8. STUDY ROOM (Phòng tự học tối) */}
        {type === 'study' && (
          <g>
            <rect width="800" height="450" fill="#1e1b4b" />
            {/* Window showing night stars */}
            <rect x="280" y="40" width="240" height="160" fill="#090d16" stroke="#475569" strokeWidth="6" rx="4" />
            {/* Stars */}
            <circle cx="320" cy="70" r="2" fill="#ffffff" />
            <circle cx="380" cy="90" r="2.5" fill="#fef08a" />
            <circle cx="460" cy="60" r="2" fill="#ffffff" />
            <circle cx="420" cy="130" r="1.5" fill="#ffffff" />
            <circle cx="480" cy="110" r="2" fill="#fef08a" />
            <line x1="400" y1="40" x2="400" y2="200" stroke="#475569" strokeWidth="4" />

            {/* Study Tables */}
            <rect x="60" y="270" width="680" height="180" fill="#78350f" rx="6" />

            {/* Desk Lamps glowing */}
            <g transform="translate(180, 180)">
              <rect x="15" y="50" width="10" height="50" fill="#0284c7" />
              <polygon points="0,50 40,50 30,30 10,30" fill="#0284c7" />
              {/* Lamp light cone */}
              <polygon points="5,50 35,50 90,140 -50,140" fill="#fef08a" opacity="0.25" />
            </g>
            <g transform="translate(540, 180)">
              <rect x="15" y="50" width="10" height="50" fill="#15803d" />
              <polygon points="0,50 40,50 30,30 10,30" fill="#15803d" />
              <polygon points="5,50 35,50 90,140 -50,140" fill="#fef08a" opacity="0.25" />
            </g>

            {/* Notebooks and Pens on table */}
            <rect x="160" y="290" width="90" height="60" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" rx="3" />
            <line x1="170" y1="305" x2="240" y2="305" stroke="#94a3b8" strokeWidth="2" />
            <line x1="170" y1="320" x2="230" y2="320" stroke="#94a3b8" strokeWidth="2" />
            <line x1="170" y1="335" x2="220" y2="335" stroke="#94a3b8" strokeWidth="2" />
            <rect x="255" y="295" width="4" height="40" fill="#0284c7" rx="1" />
          </g>
        )}

        {/* 9. CLINIC (Phòng quân y) */}
        {type === 'clinic' && (
          <g>
            <rect width="800" height="280" fill="#f8fafc" />
            <rect y="280" width="800" height="170" fill="#e2e8f0" />

            {/* Red Cross Sign on Wall */}
            <circle cx="400" cy="80" r="30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
            <rect x="390" y="62" width="20" height="36" fill="#ef4444" rx="2" />
            <rect x="382" y="70" width="36" height="20" fill="#ef4444" rx="2" />

            {/* Medicine Cabinet */}
            <rect x="100" y="60" width="160" height="180" fill="#ffffff" stroke="#94a3b8" strokeWidth="4" rx="4" />
            <line x1="100" y1="120" x2="260" y2="120" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="100" y1="180" x2="260" y2="180" stroke="#cbd5e1" strokeWidth="2" />
            {/* Medicine Bottles */}
            <rect x="120" y="90" width="20" height="28" fill="#f59e0b" rx="2" />
            <rect x="150" y="85" width="18" height="33" fill="#0284c7" rx="2" />
            <rect x="180" y="95" width="24" height="23" fill="#15803d" rx="2" />

            {/* Infirmary Bed */}
            <rect x="480" y="220" width="260" height="90" fill="#ffffff" stroke="#64748b" strokeWidth="3" rx="4" />
            <rect x="490" y="200" width="50" height="30" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" rx="4" />
            {/* Blue medical blanket */}
            <rect x="540" y="230" width="190" height="75" fill="#38bdf8" rx="2" />
          </g>
        )}

        {/* 10. EVENING CAMPUS (Đường nội bộ lung linh đèn đêm) */}
        {type === 'evening_campus' && (
          <g>
            <rect width="800" height="260" fill="url(#skyNight)" />
            {/* Stars */}
            <circle cx="100" cy="40" r="2" fill="#ffffff" />
            <circle cx="220" cy="70" r="2.5" fill="#fef08a" />
            <circle cx="340" cy="30" r="1.5" fill="#ffffff" />
            <circle cx="480" cy="80" r="2" fill="#ffffff" />
            <circle cx="620" cy="50" r="2.5" fill="#fef08a" />
            <circle cx="720" cy="90" r="2" fill="#ffffff" />

            {/* Distant trees & silhouettes */}
            <path d="M0,260 Q200,230 400,250 T800,240 L800,450 L0,450 Z" fill="#0f172a" />

            {/* Campus Road */}
            <polygon points="360,250 440,250 560,450 240,450" fill="#1e293b" />
            <line x1="400" y1="260" x2="400" y2="450" stroke="#fef08a" strokeWidth="3" strokeDasharray="16,16" />

            {/* Glowing Street Lamps */}
            {[200, 600].map((x, idx) => (
              <g key={idx}>
                <line x1={x} y1="140" x2={x} y2="320" stroke="#334155" strokeWidth="6" />
                <path d={`M${x - 20},140 L${x + 20},140 L${x + 10},120 L${x - 10},120 Z`} fill="#f59e0b" />
                <circle cx={x} cy="130" r="14" fill="#fbbf24" opacity="0.8" />
                {/* Glow ring */}
                <circle cx={x} cy="130" r="45" fill="#fef08a" opacity="0.2" />
              </g>
            ))}
          </g>
        )}

        {/* Global Lighting Filter Overlay */}
        {isNight && (
          <rect width="800" height="450" fill="#090d16" opacity="0.35" pointerEvents="none" />
        )}
        {isNoon && (
          <rect width="800" height="450" fill="#fef08a" opacity="0.08" pointerEvents="none" />
        )}
      </svg>
    </div>
  );
};
