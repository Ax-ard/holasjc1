import React from 'react';
import { Heart, Smile, Star, Wallet, AlertCircle } from 'lucide-react';
import { AttributeState } from '../types/game';

interface StatusPanelProps {
  attributes: AttributeState;
  className?: string;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ attributes, className = '' }) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const getHealthBadge = (hp: number) => {
    if (hp >= 70) return { label: 'Khỏe mạnh', color: 'text-emerald-400', bar: 'bg-emerald-500' };
    if (hp >= 40) return { label: 'Hơi mỏi', color: 'text-amber-400', bar: 'bg-amber-500' };
    return { label: 'Kiệt sức!', color: 'text-rose-400', bar: 'bg-rose-500' };
  };

  const getMoraleBadge = (morale: number) => {
    if (morale >= 70) return { label: 'Hào hứng', color: 'text-blue-400', bar: 'bg-blue-500' };
    if (morale >= 40) return { label: 'Ổn định', color: 'text-sky-400', bar: 'bg-sky-500' };
    return { label: 'Căng thẳng', color: 'text-rose-400', bar: 'bg-rose-500' };
  };

  const getReputationBadge = (rep: number) => {
    if (rep >= 70) return { label: 'Gương mẫu', color: 'text-amber-300', bar: 'bg-amber-400' };
    if (rep >= 45) return { label: 'Đạt chuẩn', color: 'text-stone-300', bar: 'bg-stone-400' };
    return { label: 'Cần chú ý', color: 'text-orange-400', bar: 'bg-orange-500' };
  };

  const hpInfo = getHealthBadge(attributes.health);
  const moraleInfo = getMoraleBadge(attributes.morale);
  const repInfo = getReputationBadge(attributes.reputation);

  return (
    <div className={`bg-stone-900/90 border border-stone-800 rounded-xl p-3 sm:p-4 text-stone-200 shadow-sm ${className}`}>
      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2.5 flex items-center justify-between">
        <span>CHỈ SỐ BẢN THÂN</span>
        {attributes.health < 35 && (
          <span className="flex items-center gap-1 text-rose-400 font-semibold lowercase">
            <AlertCircle className="w-3.5 h-3.5" />
            cần nghỉ ngơi!
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* 1. SỨC KHỎE */}
        <div className="bg-stone-800/80 border border-stone-700/60 rounded-lg p-2.5 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Sức khỏe</span>
            </div>
            <span className="font-mono text-xs font-bold text-white tabular-nums">
              {attributes.health}
              <span className="text-stone-500 font-normal">/100</span>
            </span>
          </div>
          <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800 mb-1">
            <div
              className={`h-full rounded-full transition-all duration-300 ${hpInfo.bar}`}
              style={{ width: `${Math.min(100, Math.max(0, attributes.health))}%` }}
            />
          </div>
          <div className="text-[10px] text-right font-medium">
            <span className={hpInfo.color}>{hpInfo.label}</span>
          </div>
        </div>

        {/* 2. TINH THẦN */}
        <div className="bg-stone-800/80 border border-stone-700/60 rounded-lg p-2.5 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-300">
              <Smile className="w-4 h-4 text-blue-400" />
              <span>Tinh thần</span>
            </div>
            <span className="font-mono text-xs font-bold text-white tabular-nums">
              {attributes.morale}
              <span className="text-stone-500 font-normal">/100</span>
            </span>
          </div>
          <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800 mb-1">
            <div
              className={`h-full rounded-full transition-all duration-300 ${moraleInfo.bar}`}
              style={{ width: `${Math.min(100, Math.max(0, attributes.morale))}%` }}
            />
          </div>
          <div className="text-[10px] text-right font-medium">
            <span className={moraleInfo.color}>{moraleInfo.label}</span>
          </div>
        </div>

        {/* 3. UY TÍN */}
        <div className="bg-stone-800/80 border border-stone-700/60 rounded-lg p-2.5 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Uy tín</span>
            </div>
            <span className="font-mono text-xs font-bold text-white tabular-nums">
              {attributes.reputation}
              <span className="text-stone-500 font-normal">/100</span>
            </span>
          </div>
          <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800 mb-1">
            <div
              className={`h-full rounded-full transition-all duration-300 ${repInfo.bar}`}
              style={{ width: `${Math.min(100, Math.max(0, attributes.reputation))}%` }}
            />
          </div>
          <div className="text-[10px] text-right font-medium">
            <span className={repInfo.color}>{repInfo.label}</span>
          </div>
        </div>

        {/* 4. TIỀN / TÀI NGUYÊN */}
        <div className="bg-stone-800/80 border border-stone-700/60 rounded-lg p-2.5 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Tiền mặt</span>
            </div>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-mono text-sm sm:text-base font-bold text-emerald-400 tabular-nums">
              {formatMoney(attributes.money)}
            </span>
            <span className="text-[10px] text-stone-400">
              {attributes.money < 50000 ? (
                <span className="text-rose-400 font-semibold">Sắp cạn!</span>
              ) : (
                'Ngân sách an toàn'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
