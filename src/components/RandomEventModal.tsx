import React from 'react';
import { Zap, ArrowRight, Heart, Smile, Star, Wallet } from 'lucide-react';
import { RandomPopupEvent } from '../types/game';

interface RandomEventModalProps {
  event: RandomPopupEvent;
  onDismiss: () => void;
}

export const RandomEventModal: React.FC<RandomEventModalProps> = ({ event, onDismiss }) => {
  const { title, description, attributeEffects, icon } = event;

  const renderDeltas = () => {
    const badges: React.ReactNode[] = [];
    if (attributeEffects.health) {
      const isPositive = attributeEffects.health > 0;
      badges.push(
        <div
          key="hp"
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold ${
            isPositive
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80'
              : 'bg-rose-950/80 text-rose-300 border-rose-700/80'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>{isPositive ? `+${attributeEffects.health}` : attributeEffects.health} Sức khỏe</span>
        </div>
      );
    }
    if (attributeEffects.morale) {
      const isPositive = attributeEffects.morale > 0;
      badges.push(
        <div
          key="morale"
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold ${
            isPositive
              ? 'bg-blue-950/80 text-blue-300 border-blue-700/80'
              : 'bg-rose-950/80 text-rose-300 border-rose-700/80'
          }`}
        >
          <Smile className="w-3.5 h-3.5" />
          <span>{isPositive ? `+${attributeEffects.morale}` : attributeEffects.morale} Tinh thần</span>
        </div>
      );
    }
    if (attributeEffects.reputation) {
      const isPositive = attributeEffects.reputation > 0;
      badges.push(
        <div
          key="rep"
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold ${
            isPositive
              ? 'bg-amber-950/80 text-amber-300 border-amber-700/80'
              : 'bg-rose-950/80 text-rose-300 border-rose-700/80'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>{isPositive ? `+${attributeEffects.reputation}` : attributeEffects.reputation} Uy tín</span>
        </div>
      );
    }
    if (attributeEffects.money) {
      const isPositive = attributeEffects.money > 0;
      const formatted = new Intl.NumberFormat('vi-VN').format(Math.abs(attributeEffects.money));
      badges.push(
        <div
          key="money"
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold ${
            isPositive
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80'
              : 'bg-rose-950/80 text-rose-300 border-rose-700/80'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>{isPositive ? `+${formatted}đ` : `-${formatted}đ`}</span>
        </div>
      );
    }
    return badges;
  };

  const isSjc = Boolean(event.isSjc);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`bg-stone-900 border-2 rounded-3xl max-w-md w-full p-6 text-stone-100 shadow-2xl relative overflow-hidden transition-all ${
          isSjc
            ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.35)]'
            : 'border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.25)]'
        }`}
      >
        {/* Glow Background Effect */}
        <div
          className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
            isSjc ? 'bg-blue-500/30' : 'bg-amber-500/20'
          }`}
        />

        {/* Header Alert Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm animate-pulse ${
              isSjc
                ? 'bg-blue-950 border border-blue-500 text-blue-300'
                : 'bg-amber-950 border border-amber-600/80 text-amber-300'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isSjc ? 'text-blue-400' : 'text-amber-400'}`} />
            <span>Sự kiện bất ngờ tại Hòa Lạc!</span>
          </div>
          {isSjc && (
            <span className="px-2.5 py-0.5 rounded-full bg-blue-900 text-amber-300 border border-blue-600 font-extrabold text-[10px] tracking-wider shadow-sm">
              ✨ [ĐẶC QUYỀN SJC]
            </span>
          )}
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-3.5 mb-3">
          <div
            className={`w-16 h-16 rounded-2xl bg-stone-800 border-2 flex items-center justify-center text-3xl shadow-inner shrink-0 ${
              isSjc ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-amber-500/60'
            }`}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-black text-white leading-tight">
              {title}
            </h3>
            <span className={`text-[11px] font-medium ${isSjc ? 'text-blue-400' : 'text-amber-400/90'}`}>
              {isSjc ? 'Viện Báo chí & Truyền thông SJC' : 'Tình huống phát sinh ngẫu nhiên'}
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-850 p-3.5 rounded-2xl border border-stone-800 mb-4">
          {description}
        </p>

        {/* Attribute Impacts */}
        <div className="mb-5">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
            Tác động trực tiếp:
          </div>
          <div className="flex flex-wrap gap-2">
            {renderDeltas()}
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer ${
            isSjc
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30'
              : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 shadow-amber-600/20'
          }`}
        >
          <span>ĐÃ HIỂU & TIẾP TỤC</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
