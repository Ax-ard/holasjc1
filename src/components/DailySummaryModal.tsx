import React from 'react';
import { Calendar, Heart, Smile, Star, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import { AttributeDeltas } from '../types/game';

interface DailySummaryModalProps {
  day: number;
  weekTitle: string;
  deltas: AttributeDeltas;
  newItems: string[];
  newTips: string[];
  onNextDay: () => void;
}

export const DailySummaryModal: React.FC<DailySummaryModalProps> = ({
  day,
  weekTitle,
  deltas,
  newItems,
  newTips,
  onNextDay,
}) => {
  const formatMoneyDelta = (amount?: number) => {
    if (!amount) return '0đ';
    const sign = amount > 0 ? '+' : '';
    return `${sign}${new Intl.NumberFormat('vi-VN').format(amount)}đ`;
  };

  const formatDelta = (val?: number) => {
    if (!val) return '0';
    return val > 0 ? `+${val}` : `${val}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-stone-900 border-2 border-emerald-600/80 rounded-2xl max-w-lg w-full p-6 text-stone-100 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>TỔNG KẾT NGÀY {day.toString().padStart(2, '0')} / 28</span>
          </div>

          <h3 className="text-2xl font-black text-white tracking-tight">
            NGÀY {day} HOÀN TẤT!
          </h3>
          <p className="text-xs text-emerald-400 font-medium mt-1">
            {weekTitle}
          </p>
        </div>

        {/* Attribute deltas grid */}
        <div className="bg-stone-800/80 border border-stone-700/80 rounded-xl p-4 mb-4">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
            Biến động chỉ số hôm nay:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Health */}
            <div className="bg-stone-900/90 rounded-lg p-2 text-center border border-stone-800">
              <div className="flex items-center justify-center gap-1 text-[11px] text-rose-400 mb-0.5 font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>Sức khỏe</span>
              </div>
              <div className={`font-mono text-sm font-bold ${(deltas.health ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatDelta(deltas.health)}
              </div>
            </div>

            {/* Morale */}
            <div className="bg-stone-900/90 rounded-lg p-2 text-center border border-stone-800">
              <div className="flex items-center justify-center gap-1 text-[11px] text-blue-400 mb-0.5 font-semibold">
                <Smile className="w-3.5 h-3.5" />
                <span>Tinh thần</span>
              </div>
              <div className={`font-mono text-sm font-bold ${(deltas.morale ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatDelta(deltas.morale)}
              </div>
            </div>

            {/* Reputation */}
            <div className="bg-stone-900/90 rounded-lg p-2 text-center border border-stone-800">
              <div className="flex items-center justify-center gap-1 text-[11px] text-amber-400 mb-0.5 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>Uy tín</span>
              </div>
              <div className={`font-mono text-sm font-bold ${(deltas.reputation ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatDelta(deltas.reputation)}
              </div>
            </div>

            {/* Money */}
            <div className="bg-stone-900/90 rounded-lg p-2 text-center border border-stone-800">
              <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-400 mb-0.5 font-semibold">
                <Wallet className="w-3.5 h-3.5" />
                <span>Tài chính</span>
              </div>
              <div className={`font-mono text-sm font-bold ${(deltas.money ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatMoneyDelta(deltas.money)}
              </div>
            </div>
          </div>
        </div>

        {/* Badges / Gains list */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-stone-800/60 border border-stone-700/60 text-stone-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Mẹo sinh tồn mới mở khóa:</span>
            </span>
            <span className="font-bold text-amber-300 font-mono">
              +{newTips.length} mẹo
            </span>
          </div>

          <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-stone-800/60 border border-stone-700/60 text-stone-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Vật phẩm mới thu thập:</span>
            </span>
            <span className="font-bold text-emerald-300 font-mono">
              +{newItems.length} món
            </span>
          </div>
        </div>

        {/* Motivational note */}
        <p className="text-xs text-center text-stone-400 italic mb-6">
          "Kỷ luật là sức mạnh của quân đội. Mỗi ngày qua đi là một ngày bạn bản lĩnh hơn!"
        </p>

        {/* Big Action Button */}
        <button
          onClick={onNextDay}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 hover:shadow-emerald-600/50 transition-all cursor-pointer"
        >
          <span>SANG NGÀY TIẾP THEO (NGÀY {(day + 1).toString().padStart(2, '0')})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
