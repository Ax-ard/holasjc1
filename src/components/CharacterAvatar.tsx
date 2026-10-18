import React from 'react';
import { StorySpeaker } from '../types/game';

interface CharacterAvatarProps {
  speaker: StorySpeaker;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ speaker, className = 'w-20 h-20' }) => {
  const { avatarId, mood = 'normal' } = speaker;

  // Render dedicated SVG vector cartoon portraits
  switch (avatarId) {
    case 'commander':
      return (
        <div className={`relative rounded-full overflow-hidden border-2 border-emerald-600 bg-stone-800 shadow-md ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background */}
            <circle cx="50" cy="50" r="48" fill="#1b382b" />
            {/* Shoulders / Uniform */}
            <path d="M15 95 C20 70 30 65 50 65 C70 65 80 70 85 95 Z" fill="#2d5a3f" />
            {/* Collar & Epaulets */}
            <path d="M38 65 L50 78 L62 65" fill="#1e3e2b" stroke="#eab308" strokeWidth="2" />
            <rect x="22" y="70" width="12" height="6" rx="1" fill="#dc2626" />
            <polygon points="28,71 29,74 32,74 30,75 31,78 28,76 25,78 26,75 24,74 27,74" fill="#fbbf24" />
            {/* Neck */}
            <rect x="42" y="52" width="16" height="15" fill="#e0a97a" />
            {/* Head */}
            <ellipse cx="50" cy="44" rx="20" ry="22" fill="#f0be92" />
            {/* Hair */}
            <path d="M30 38 C32 25 45 22 68 25 C72 35 70 42 70 42 C70 42 66 30 50 30 C35 30 31 38 30 38 Z" fill="#1c1917" />
            {/* Military Service Cap */}
            <ellipse cx="50" cy="27" rx="25" ry="12" fill="#2d5a3f" stroke="#166534" strokeWidth="1.5" />
            <path d="M28 27 Q50 14 72 27 L68 33 Q50 24 32 33 Z" fill="#1e3e2b" />
            <ellipse cx="50" cy="28" rx="24" ry="4" fill="#0f172a" opacity="0.8" />
            {/* Cap Badge: Red circular star */}
            <circle cx="50" cy="22" r="5.5" fill="#dc2626" stroke="#fbbf24" strokeWidth="1" />
            <polygon points="50,18 51.5,21.5 55,21.5 52,23.5 53,27 50,25 47,27 48,23.5 45,21.5 48.5,21.5" fill="#fbbf24" />
            {/* Eyes */}
            <ellipse cx="43" cy="44" rx="2.5" ry="3.5" fill="#1c1917" />
            <ellipse cx="57" cy="44" rx="2.5" ry="3.5" fill="#1c1917" />
            {/* Eyebrows (stern / confident) */}
            <path d="M39 39 Q44 38 48 40" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
            <path d="M61 39 Q56 38 52 40" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
            {/* Nose */}
            <path d="M50 44 L49 49 L52 49" stroke="#c28859" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Mouth */}
            {mood === 'smile' ? (
              <path d="M44 54 Q50 60 56 54" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
            ) : (
              <line x1="44" y1="55" x2="56" y2="55" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </div>
      );

    case 'medic':
      return (
        <div className={`relative rounded-full overflow-hidden border-2 border-rose-400 bg-stone-800 shadow-md ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#fdf2f8" />
            {/* White Coat */}
            <path d="M15 95 C20 72 30 68 50 68 C70 68 80 72 85 95 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            {/* Red Cross Badge */}
            <circle cx="68" cy="78" r="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <rect x="66" y="74" width="4" height="8" rx="0.5" fill="#ef4444" />
            <rect x="64" y="76" width="8" height="4" rx="0.5" fill="#ef4444" />
            {/* Neck */}
            <rect x="43" y="54" width="14" height="15" fill="#fbd5b5" />
            {/* Head */}
            <ellipse cx="50" cy="46" rx="19" ry="20" fill="#fde2cd" />
            {/* Hair */}
            <path d="M30 46 C28 28 42 22 68 24 C74 34 72 48 72 52 C68 40 65 34 50 34 C35 34 32 42 30 46 Z" fill="#3f2e24" />
            {/* Eyes */}
            <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#292524" />
            <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#292524" />
            <circle cx="44" cy="45" r="0.8" fill="#ffffff" />
            <circle cx="58" cy="45" r="0.8" fill="#ffffff" />
            {/* Soft Eyebrows */}
            <path d="M39 41 Q43 39 47 41" stroke="#3f2e24" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M61 41 Q57 39 53 41" stroke="#3f2e24" strokeWidth="1.5" strokeLinecap="round" />
            {/* Cheeks */}
            <ellipse cx="38" cy="51" rx="3.5" ry="2" fill="#fca5a5" opacity="0.6" />
            <ellipse cx="62" cy="51" rx="3.5" ry="2" fill="#fca5a5" opacity="0.6" />
            {/* Gentle Smile */}
            <path d="M45 54 Q50 59 55 54" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'an':
      return (
        <div className={`relative rounded-full overflow-hidden border-2 border-emerald-500 bg-stone-800 shadow-md ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#ecfdf5" />
            {/* Green Uniform */}
            <path d="M15 95 C20 72 30 68 50 68 C70 68 80 72 85 95 Z" fill="#366548" />
            <path d="M42 68 L50 80 L58 68" fill="#244430" />
            {/* Neck */}
            <rect x="43" y="55" width="14" height="15" fill="#fcd5b5" />
            {/* Head */}
            <ellipse cx="50" cy="46" rx="19" ry="20" fill="#fde2cd" />
            {/* Short neat hair */}
            <path d="M28 42 C28 26 42 22 72 26 C72 36 68 45 68 45 C65 33 60 30 50 30 C35 30 32 38 28 42 Z" fill="#18181b" />
            {/* Glasses */}
            <rect x="36" y="42" width="12" height="9" rx="2" fill="none" stroke="#0284c7" strokeWidth="2" />
            <rect x="52" y="42" width="12" height="9" rx="2" fill="none" stroke="#0284c7" strokeWidth="2" />
            <line x1="48" y1="46" x2="52" y2="46" stroke="#0284c7" strokeWidth="2" />
            {/* Eyes behind glasses */}
            <circle cx="42" cy="46" r="2.5" fill="#18181b" />
            <circle cx="58" cy="46" r="2.5" fill="#18181b" />
            {/* Smart Eyebrows */}
            <path d="M37 39 L47 38" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            <path d="M63 39 L53 38" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            {/* Confident Smile */}
            <path d="M45 56 Q50 60 55 56" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'huy':
      return (
        <div className={`relative rounded-full overflow-hidden border-2 border-amber-500 bg-stone-800 shadow-md ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#fef3c7" />
            {/* Uniform */}
            <path d="M15 95 C20 72 30 68 50 68 C70 68 80 72 85 95 Z" fill="#366548" />
            {/* Head */}
            <rect x="43" y="55" width="14" height="15" fill="#fcd5b5" />
            <ellipse cx="50" cy="46" rx="20" ry="21" fill="#fde2cd" />
            {/* Messy fun hair */}
            <path d="M26 44 C26 24 38 18 68 20 C76 30 74 44 74 44 C70 32 62 26 50 26 C36 26 30 36 26 44 Z" fill="#451a03" />
            <path d="M46 19 C52 14 58 18 56 24 Z" fill="#451a03" />
            {/* Eyes (one winking or wide cheerful) */}
            {mood === 'worried' ? (
              <>
                <ellipse cx="42" cy="45" rx="3" ry="3.5" fill="#18181b" />
                <ellipse cx="58" cy="45" rx="3" ry="3.5" fill="#18181b" />
                <path d="M38 39 Q42 42 46 40" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
                <path d="M62 39 Q58 42 54 40" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="50" cy="56" rx="3" ry="4" fill="#991b1b" />
              </>
            ) : (
              <>
                <ellipse cx="42" cy="45" rx="3" ry="3" fill="#18181b" />
                {/* Wink right eye */}
                <path d="M54 46 Q58 42 62 46" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M38 40 Q43 37 47 39" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
                <path d="M62 40 Q57 37 53 39" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
                {/* Big Grin */}
                <path d="M42 54 Q50 64 58 54 Z" fill="#dc2626" />
                <path d="M44 54 Q50 58 56 54 Z" fill="#ffffff" />
              </>
            )}
          </svg>
        </div>
      );

    case 'linh':
      return (
        <div className={`relative rounded-full overflow-hidden border-2 border-teal-500 bg-stone-800 shadow-md ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#f0fdfa" />
            {/* Green Uniform */}
            <path d="M15 95 C20 72 30 68 50 68 C70 68 80 72 85 95 Z" fill="#366548" />
            {/* Neck */}
            <rect x="44" y="55" width="12" height="15" fill="#fde2cd" />
            {/* Head */}
            <ellipse cx="50" cy="46" rx="18" ry="19" fill="#fde2cd" />
            {/* Hair with side bangs and ponytail */}
            <path d="M26 48 C26 28 36 20 66 22 C76 30 76 50 76 56 C70 42 66 32 50 32 C35 32 30 40 26 48 Z" fill="#292524" />
            <path d="M72 36 C84 40 82 60 76 66 C78 56 76 46 72 36 Z" fill="#292524" />
            {/* Cute hairpin */}
            <circle cx="36" cy="32" r="3" fill="#f43f5e" />
            {/* Eyes with gentle lashes */}
            <ellipse cx="43" cy="46" rx="2.5" ry="3.5" fill="#292524" />
            <ellipse cx="57" cy="46" rx="2.5" ry="3.5" fill="#292524" />
            <path d="M46 44 L48 43" stroke="#292524" strokeWidth="1" />
            <path d="M60 44 L62 43" stroke="#292524" strokeWidth="1" />
            {/* Cheeks */}
            <circle cx="38" cy="51" r="3" fill="#fb7185" opacity="0.5" />
            <circle cx="62" cy="51" r="3" fill="#fb7185" opacity="0.5" />
            {/* Warm gentle smile */}
            <path d="M45 55 Q50 59 55 55" stroke="#be123c" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'minh':
    default:
      return (
        <div className={`relative rounded-full overflow-hidden border-2 border-emerald-500 bg-stone-800 shadow-md ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#f7fee7" />
            {/* Green Uniform */}
            <path d="M15 95 C20 72 30 68 50 68 C70 68 80 72 85 95 Z" fill="#366548" />
            <path d="M43 68 L50 78 L57 68" fill="#244430" />
            {/* Neck */}
            <rect x="43" y="55" width="14" height="15" fill="#fcd5b5" />
            {/* Head */}
            <ellipse cx="50" cy="46" rx="19" ry="20" fill="#fde2cd" />
            {/* Wavy stylish hair */}
            <path d="M28 42 C28 24 40 18 68 22 C76 30 74 46 74 46 C70 34 64 28 50 28 C36 28 32 36 28 42 Z" fill="#262626" />
            {/* Eyes */}
            <ellipse cx="43" cy="46" rx="2.5" ry="3.5" fill="#171717" />
            <ellipse cx="57" cy="46" rx="2.5" ry="3.5" fill="#171717" />
            {/* Eyebrows */}
            <path d="M39 40 Q43 38 47 40" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
            <path d="M61 40 Q57 38 53 40" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
            {/* Expression */}
            {mood === 'worried' ? (
              <path d="M44 56 Q50 51 56 56" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
            ) : (
              <path d="M44 54 Q50 60 56 54" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
            )}
          </svg>
        </div>
      );
  }
};
