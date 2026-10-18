import React from 'react';

interface ItemCartoonSpriteProps {
  symbol: string;
  className?: string;
}

export const ItemCartoonSprite: React.FC<ItemCartoonSpriteProps> = ({
  symbol,
  className = 'w-10 h-10',
}) => {
  switch (symbol) {
    case 'outfit1':
      // Folded military green outfit set 1
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base folded shirt */}
          <rect x="8" y="10" width="48" height="44" rx="6" fill="#587A54" stroke="#3A5236" strokeWidth="2.5" />
          {/* Collar folds */}
          <path d="M22 10L32 24L42 10" stroke="#3A5236" strokeWidth="2.5" strokeLinecap="round" fill="#71946D" />
          <path d="M32 24V48" stroke="#3A5236" strokeWidth="2" strokeDasharray="3 3" />
          {/* Buttons */}
          <circle cx="32" cy="30" r="2" fill="#EAE5D9" />
          <circle cx="32" cy="38" r="2" fill="#EAE5D9" />
          <circle cx="32" cy="46" r="2" fill="#EAE5D9" />
          {/* Chest pocket */}
          <rect x="37" y="24" width="12" height="14" rx="2" fill="#4C6B48" stroke="#3A5236" strokeWidth="1.5" />
          {/* Folded edge stitch */}
          <line x1="12" y1="50" x2="52" y2="50" stroke="#3A5236" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );

    case 'outfit2':
      // Folded blue navy polo & jeans outfit set 2
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="10" width="48" height="44" rx="6" fill="#4B6B78" stroke="#2D4650" strokeWidth="2.5" />
          <path d="M20 10L32 22L44 10" fill="#678A98" stroke="#2D4650" strokeWidth="2.5" />
          {/* Folded trousers peeking below */}
          <rect x="12" y="38" width="40" height="12" rx="3" fill="#35495E" stroke="#2D4650" strokeWidth="1.5" />
          {/* Buttons */}
          <circle cx="32" cy="27" r="2" fill="#F0EBE1" />
          <circle cx="32" cy="34" r="2" fill="#F0EBE1" />
        </svg>
      );

    case 'shoes':
      // Pair of sneakers top-down
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left shoe */}
          <rect x="11" y="8" width="18" height="48" rx="9" fill="#5A7352" stroke="#394D33" strokeWidth="2.5" />
          <rect x="13" y="12" width="14" height="12" rx="6" fill="#F5F3EC" stroke="#394D33" strokeWidth="1.5" />
          <line x1="15" y1="28" x2="25" y2="28" stroke="#F5F3EC" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="34" x2="25" y2="34" stroke="#F5F3EC" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="40" x2="25" y2="40" stroke="#F5F3EC" strokeWidth="2" strokeLinecap="round" />
          {/* Right shoe */}
          <rect x="35" y="8" width="18" height="48" rx="9" fill="#5A7352" stroke="#394D33" strokeWidth="2.5" />
          <rect x="37" y="12" width="14" height="12" rx="6" fill="#F5F3EC" stroke="#394D33" strokeWidth="1.5" />
          <line x1="39" y1="28" x2="49" y2="28" stroke="#F5F3EC" strokeWidth="2" strokeLinecap="round" />
          <line x1="39" y1="34" x2="49" y2="34" stroke="#F5F3EC" strokeWidth="2" strokeLinecap="round" />
          <line x1="39" y1="40" x2="49" y2="40" stroke="#F5F3EC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'toothpaste':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cap */}
          <rect x="26" y="8" width="12" height="8" rx="2" fill="#EAE5D9" stroke="#4A5E48" strokeWidth="2" />
          {/* Tube body */}
          <path d="M22 16H42L46 54H18L22 16Z" fill="#F7FAF6" stroke="#4A5E48" strokeWidth="2.5" />
          {/* Stripe */}
          <path d="M20 32H44L45 42H19L20 32Z" fill="#588157" />
          {/* Mint leaf emblem */}
          <circle cx="32" cy="37" r="3" fill="#D8EAD6" />
        </svg>
      );

    case 'toothbrush':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Handle */}
          <rect x="28" y="24" width="8" height="34" rx="4" fill="#6DA596" stroke="#3F6B60" strokeWidth="2" />
          {/* Neck */}
          <rect x="29" y="14" width="6" height="12" rx="2" fill="#88C2B3" stroke="#3F6B60" strokeWidth="1.5" />
          {/* Bristles head */}
          <rect x="26" y="6" width="12" height="10" rx="3" fill="#E8F4F1" stroke="#3F6B60" strokeWidth="2" />
          <line x1="28" y1="8" x2="36" y2="8" stroke="#5EA494" strokeWidth="1.5" />
          <line x1="28" y1="11" x2="36" y2="11" stroke="#5EA494" strokeWidth="1.5" />
          <line x1="28" y1="14" x2="36" y2="14" stroke="#5EA494" strokeWidth="1.5" />
        </svg>
      );

    case 'notebook':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Book cover */}
          <rect x="14" y="8" width="36" height="48" rx="4" fill="#3D5A38" stroke="#253A22" strokeWidth="2.5" />
          {/* Spine */}
          <rect x="14" y="8" width="8" height="48" rx="2" fill="#2E442B" />
          {/* Label badge */}
          <rect x="26" y="18" width="20" height="14" rx="2" fill="#FAF6EE" stroke="#253A22" strokeWidth="1.5" />
          <line x1="29" y1="23" x2="43" y2="23" stroke="#8C7A6B" strokeWidth="1.5" />
          <line x1="29" y1="27" x2="39" y2="27" stroke="#8C7A6B" strokeWidth="1.5" />
          {/* Ribbon */}
          <path d="M30 48V56L33 53L36 56V48H30Z" fill="#C25953" />
        </svg>
      );

    case 'pens':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pen 1 */}
          <rect x="22" y="10" width="6" height="42" rx="3" fill="#3B7080" stroke="#224550" strokeWidth="2" />
          <polygon points="22,10 28,10 25,4" fill="#224550" />
          <rect x="23" y="14" width="4" height="8" rx="1" fill="#ECE7DD" />
          <rect x="20" y="16" width="3" height="12" rx="1" fill="#C2B8A3" />
          {/* Pen 2 */}
          <rect x="36" y="14" width="6" height="42" rx="3" fill="#758A6D" stroke="#465440" strokeWidth="2" />
          <polygon points="36,14 42,14 39,8" fill="#465440" />
          <rect x="37" y="18" width="4" height="8" rx="1" fill="#ECE7DD" />
          <rect x="34" y="20" width="3" height="12" rx="1" fill="#C2B8A3" />
        </svg>
      );

    case 'hangers':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Swivel Hook */}
          <path d="M32 16C32 11 36 10 37 13C38 16 35 18 32 20V24" stroke="#7A6856" strokeWidth="2.5" strokeLinecap="round" />
          {/* Triangle Hanger */}
          <polygon points="32,24 8,46 56,46" fill="#DFD2C0" stroke="#7A6856" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Crossbar */}
          <line x1="12" y1="46" x2="52" y2="46" stroke="#7A6856" strokeWidth="3" />
          {/* Clips */}
          <rect x="18" y="46" width="4" height="8" rx="1" fill="#A8947C" />
          <rect x="42" y="46" width="4" height="8" rx="1" fill="#A8947C" />
        </svg>
      );

    case 'towel':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rolled or folded towel */}
          <rect x="10" y="16" width="44" height="32" rx="6" fill="#84A89B" stroke="#4C6B60" strokeWidth="2.5" />
          {/* Soft stripe folds */}
          <line x1="10" y1="24" x2="54" y2="24" stroke="#688F81" strokeWidth="2" />
          <line x1="10" y1="32" x2="54" y2="32" stroke="#688F81" strokeWidth="2" />
          <line x1="10" y1="40" x2="54" y2="40" stroke="#688F81" strokeWidth="2" />
          {/* Stitch edge */}
          <rect x="46" y="16" width="8" height="32" rx="3" fill="#9CC0B4" stroke="#4C6B60" strokeWidth="1.5" />
        </svg>
      );

    case 'shampoo':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pump Cap */}
          <rect x="27" y="6" width="10" height="6" rx="2" fill="#EAE5D9" stroke="#465842" strokeWidth="1.5" />
          <rect x="29" y="12" width="6" height="4" fill="#B0A694" />
          {/* Bottle body */}
          <rect x="18" y="16" width="28" height="42" rx="6" fill="#93B8A5" stroke="#465842" strokeWidth="2.5" />
          {/* Label */}
          <rect x="22" y="26" width="20" height="20" rx="3" fill="#F4F8F5" stroke="#465842" strokeWidth="1.5" />
          <circle cx="32" cy="36" r="4" fill="#69947E" />
        </svg>
      );

    case 'laundry_bag':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bag mesh shape */}
          <rect x="14" y="12" width="36" height="44" rx="7" fill="#8FA690" stroke="#4D634E" strokeWidth="2.5" />
          {/* Zipper top */}
          <line x1="18" y1="18" x2="46" y2="18" stroke="#334433" strokeWidth="2.5" strokeDasharray="3 2" />
          <circle cx="44" cy="18" r="2.5" fill="#E8E2D5" />
          {/* Mesh pattern dots */}
          <circle cx="24" cy="28" r="1.5" fill="#6D856E" />
          <circle cx="32" cy="28" r="1.5" fill="#6D856E" />
          <circle cx="40" cy="28" r="1.5" fill="#6D856E" />
          <circle cx="28" cy="36" r="1.5" fill="#6D856E" />
          <circle cx="36" cy="36" r="1.5" fill="#6D856E" />
          <circle cx="24" cy="44" r="1.5" fill="#6D856E" />
          <circle cx="32" cy="44" r="1.5" fill="#6D856E" />
          <circle cx="40" cy="44" r="1.5" fill="#6D856E" />
        </svg>
      );

    case 'detergent_small':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sachet pack */}
          <rect x="16" y="10" width="32" height="44" rx="4" fill="#E65100" stroke="#933300" strokeWidth="2" />
          <rect x="18" y="14" width="28" height="36" rx="2" fill="#FF7043" />
          {/* Bubbles */}
          <circle cx="32" cy="28" r="7" fill="#FFFFFF" />
          <circle cx="32" cy="28" r="5" fill="#29B6F6" />
          <circle cx="24" cy="40" r="3" fill="#FFFFFF" opacity="0.8" />
          <circle cx="40" cy="38" r="2.5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case 'hand_fan':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fan head */}
          <circle cx="32" cy="22" r="16" fill="#FCE4EC" stroke="#C2185B" strokeWidth="2.5" />
          {/* Blades */}
          <circle cx="32" cy="22" r="4" fill="#F06292" />
          <path d="M32 22C32 15 36 12 39 15C42 18 36 22 32 22Z" fill="#F06292" />
          <path d="M32 22C25 22 22 26 25 29C28 32 32 26 32 22Z" fill="#F06292" />
          <path d="M32 22C32 29 28 32 25 29C22 26 28 22 32 22Z" fill="#F06292" />
          {/* Handle */}
          <rect x="28" y="38" width="8" height="20" rx="4" fill="#FCE4EC" stroke="#C2185B" strokeWidth="2" />
          <circle cx="32" cy="46" r="2" fill="#C2185B" />
        </svg>
      );

    case 'bowl_chopsticks':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bowl top view */}
          <circle cx="32" cy="34" r="22" fill="#F5F5F0" stroke="#7A6B56" strokeWidth="2.5" />
          <circle cx="32" cy="34" r="16" fill="#E8E4DA" stroke="#A89B85" strokeWidth="1.5" />
          {/* Chopsticks across */}
          <line x1="8" y1="18" x2="52" y2="40" stroke="#8D6E63" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="15" x2="56" y2="37" stroke="#8D6E63" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'blanket_pillow':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Folded blanket */}
          <rect x="8" y="10" width="48" height="34" rx="6" fill="#7E9F8B" stroke="#4F6D5B" strokeWidth="2.5" />
          <line x1="8" y1="22" x2="56" y2="22" stroke="#4F6D5B" strokeWidth="2" />
          {/* Compact pillow on top */}
          <rect x="14" y="28" width="36" height="26" rx="8" fill="#F4EAD4" stroke="#9A8264" strokeWidth="2" />
          <circle cx="32" cy="41" r="2" fill="#BAA487" />
        </svg>
      );

    case 'snack':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,12 52,10 48,54 16,52" fill="#FFB74D" stroke="#E65100" strokeWidth="2.5" />
          <polygon points="16,20 48,18 45,34 19,35" fill="#FFE082" />
          <circle cx="32" cy="27" r="4" fill="#FF7043" />
        </svg>
      );

    case 'detergent_big':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="14" width="40" height="42" rx="6" fill="#0288D1" stroke="#01579B" strokeWidth="2.5" />
          {/* Handle */}
          <rect x="22" y="6" width="20" height="10" rx="3" fill="#E1F5FE" stroke="#01579B" strokeWidth="2" />
          {/* Logo badge */}
          <circle cx="32" cy="35" r="10" fill="#FFFFFF" />
          <circle cx="32" cy="35" r="7" fill="#E65100" />
        </svg>
      );

    case 'a4_paper':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Paper ream shadow & stack */}
          <rect x="12" y="12" width="40" height="46" rx="2" fill="#ECEAE4" stroke="#8C857B" strokeWidth="2" />
          <rect x="14" y="8" width="40" height="46" rx="2" fill="#FFFFFF" stroke="#8C857B" strokeWidth="2" />
          {/* Packaging band */}
          <rect x="14" y="24" width="40" height="14" fill="#3949AB" />
          <line x1="20" y1="31" x2="48" y2="31" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'noodles':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Red square pack */}
          <rect x="10" y="10" width="44" height="44" rx="5" fill="#D32F2F" stroke="#7B1FA2" strokeWidth="2.5" />
          <rect x="14" y="14" width="36" height="36" rx="3" fill="#E53935" />
          <circle cx="32" cy="32" r="10" fill="#FFEB3B" />
          {/* Shrimp icon */}
          <path d="M28 32C28 29 33 28 35 31C37 34 32 36 30 34" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'kettle':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Kettle body from above */}
          <circle cx="32" cy="32" r="20" fill="#CFD8DC" stroke="#455A64" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="12" fill="#90A4AE" stroke="#455A64" strokeWidth="1.5" />
          {/* Handle */}
          <rect x="27" y="48" width="10" height="12" rx="3" fill="#263238" />
          {/* Spout */}
          <polygon points="32,8 26,14 38,14" fill="#455A64" />
        </svg>
      );

    case 'bedside_fan':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="28" r="18" fill="#E0F2F1" stroke="#00796B" strokeWidth="2.5" />
          <circle cx="32" cy="28" r="4" fill="#004D40" />
          <path d="M32 28C32 18 38 18 38 24C38 28 32 28 32 28Z" fill="#26A69A" />
          <path d="M32 28C22 28 22 34 28 34C32 34 32 28 32 28Z" fill="#26A69A" />
          <path d="M32 28C32 38 26 38 26 32C26 28 32 28 32 28Z" fill="#26A69A" />
          {/* Clamp base */}
          <rect x="22" y="48" width="20" height="10" rx="3" fill="#37474F" stroke="#263238" strokeWidth="1.5" />
        </svg>
      );

    case 'water_bottle':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bottle body */}
          <rect x="20" y="16" width="24" height="42" rx="8" fill="#80CBC4" stroke="#00695C" strokeWidth="2.5" />
          {/* Cap */}
          <rect x="24" y="6" width="16" height="10" rx="3" fill="#004D40" stroke="#00251A" strokeWidth="1.5" />
          <rect x="28" y="4" width="8" height="4" rx="2" fill="#B2DFDB" />
          {/* Water level lines */}
          <line x1="24" y1="26" x2="32" y2="26" stroke="#E0F2F1" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="34" x2="30" y2="34" stroke="#E0F2F1" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="42" x2="32" y2="42" stroke="#E0F2F1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'umbrella':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Folded sleeve */}
          <rect x="22" y="10" width="20" height="42" rx="5" fill="#3E523A" stroke="#243321" strokeWidth="2.5" />
          {/* Strap band */}
          <rect x="22" y="26" width="20" height="6" fill="#243321" />
          <circle cx="32" cy="29" r="1.5" fill="#C5BAA8" />
          {/* Handle */}
          <rect x="26" y="52" width="12" height="6" rx="2" fill="#1C1C1C" />
        </svg>
      );

    case 'first_aid':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Red pouch */}
          <rect x="10" y="14" width="44" height="36" rx="6" fill="#E53935" stroke="#B71C1C" strokeWidth="2.5" />
          {/* White cross */}
          <rect x="28" y="22" width="8" height="20" rx="1.5" fill="#FFFFFF" />
          <rect x="22" y="28" width="20" height="8" rx="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'flashlight':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lens head */}
          <rect x="20" y="8" width="24" height="12" rx="3" fill="#37474F" stroke="#212121" strokeWidth="2" />
          <circle cx="32" cy="14" r="5" fill="#FFEE58" />
          {/* Handle */}
          <rect x="24" y="20" width="16" height="36" rx="4" fill="#455A64" stroke="#212121" strokeWidth="2" />
          <line x1="24" y1="28" x2="40" y2="28" stroke="#263238" strokeWidth="1.5" />
          <line x1="24" y1="36" x2="40" y2="36" stroke="#263238" strokeWidth="1.5" />
          <line x1="24" y1="44" x2="40" y2="44" stroke="#263238" strokeWidth="1.5" />
        </svg>
      );

    case 'charger':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Adapter brick */}
          <rect x="16" y="14" width="20" height="24" rx="4" fill="#FAFAFA" stroke="#9E9E9E" strokeWidth="2" />
          {/* Prongs */}
          <rect x="20" y="8" width="3" height="6" fill="#9E9E9E" />
          <rect x="29" y="8" width="3" height="6" fill="#9E9E9E" />
          {/* Cable roll */}
          <circle cx="42" cy="36" r="12" stroke="#BDBDBD" strokeWidth="3" fill="none" />
          <circle cx="42" cy="36" r="6" stroke="#BDBDBD" strokeWidth="2" fill="none" />
        </svg>
      );

    case 'stationery':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clear pouch */}
          <rect x="12" y="12" width="40" height="40" rx="5" fill="#FFF8E1" stroke="#FFA000" strokeWidth="2.5" />
          {/* Ruler inside */}
          <line x1="16" y1="18" x2="48" y2="18" stroke="#FFB300" strokeWidth="4" />
          <line x1="20" y1="16" x2="20" y2="20" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="28" y1="16" x2="28" y2="20" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="36" y1="16" x2="36" y2="20" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="44" y1="16" x2="44" y2="20" stroke="#FFFFFF" strokeWidth="1" />
          {/* Scissors & marker */}
          <line x1="20" y1="42" x2="38" y2="24" stroke="#D32F2F" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="46" x2="44" y2="28" stroke="#1976D2" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'teddy_bear':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <circle cx="20" cy="18" r="7" fill="#8D6E63" stroke="#4E342E" strokeWidth="2" />
          <circle cx="20" cy="18" r="3.5" fill="#D7CCC8" />
          <circle cx="44" cy="18" r="7" fill="#8D6E63" stroke="#4E342E" strokeWidth="2" />
          <circle cx="44" cy="18" r="3.5" fill="#D7CCC8" />
          {/* Head */}
          <circle cx="32" cy="28" r="16" fill="#A1887F" stroke="#4E342E" strokeWidth="2.5" />
          {/* Snout */}
          <ellipse cx="32" cy="32" rx="6" ry="4.5" fill="#D7CCC8" stroke="#4E342E" strokeWidth="1.5" />
          <circle cx="32" cy="30" r="2" fill="#3E2723" />
          {/* Eyes */}
          <circle cx="26" cy="25" r="2" fill="#3E2723" />
          <circle cx="38" cy="25" r="2" fill="#3E2723" />
          {/* Body */}
          <ellipse cx="32" cy="48" rx="14" ry="12" fill="#8D6E63" stroke="#4E342E" strokeWidth="2" />
          <ellipse cx="32" cy="48" rx="8" ry="7" fill="#D7CCC8" />
        </svg>
      );

    case 'extra_shoes':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shoe box with multiple shoes */}
          <rect x="8" y="10" width="48" height="44" rx="4" fill="#BCAAA4" stroke="#5D4037" strokeWidth="2.5" />
          {/* Shoes inside */}
          <ellipse cx="22" cy="26" rx="8" ry="12" fill="#3E2723" />
          <ellipse cx="42" cy="26" rx="8" ry="12" fill="#3E2723" />
          <ellipse cx="22" cy="44" rx="7" ry="6" fill="#D84315" />
          <ellipse cx="42" cy="44" rx="7" ry="6" fill="#D84315" />
        </svg>
      );

    case 'body_pillow':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Long cylindrical pillow */}
          <rect x="12" y="12" width="40" height="40" rx="18" fill="#F8BBD0" stroke="#C2185B" strokeWidth="2.5" />
          <ellipse cx="22" cy="32" rx="4" ry="12" stroke="#E91E63" strokeWidth="1.5" fill="none" />
          <ellipse cx="42" cy="32" rx="4" ry="12" stroke="#E91E63" strokeWidth="1.5" fill="none" />
          <line x1="16" y1="32" x2="48" y2="32" stroke="#F06292" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case 'giant_snack':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Huge party pack */}
          <polygon points="8,8 56,6 50,58 14,56" fill="#F4511E" stroke="#BF360C" strokeWidth="2.5" />
          <polygon points="14,18 50,16 46,38 18,40" fill="#FFB74D" />
          <circle cx="32" cy="28" r="6" fill="#FFFFFF" />
          <text x="27" y="32" fontSize="9" fontWeight="bold" fill="#BF360C">MAX</text>
        </svg>
      );

    case 'fashion_bulky':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Giant straw sunhat */}
          <circle cx="32" cy="32" r="22" fill="#FFE082" stroke="#FF8F00" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="10" fill="#FFCA28" stroke="#FF8F00" strokeWidth="1.5" />
          {/* Ribbon */}
          <circle cx="32" cy="32" r="11" stroke="#E91E63" strokeWidth="2" fill="none" />
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center font-bold text-lg ${className}`}>
          📦
        </div>
      );
  }
};
