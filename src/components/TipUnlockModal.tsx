import React from 'react';
import { BookOpen, Check, ArrowRight } from 'lucide-react';
import { HandbookTip } from '../types/game';

interface TipUnlockModalProps {
  tip: HandbookTip;
  onContinue: () => void;
  onOpenHandbook: () => void;
}

export const TipUnlockModal: React.FC<TipUnlockModalProps> = ({
  tip,
  onContinue,
  onOpenHandbook,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border-2 border-amber-500/80 rounded-2xl max-w-lg w-full p-6 text-stone-100 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center">
          {/* Step 4 kicker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>BƯỚC 4: MỞ KHÓA MẸO SINH TỒN MỚI</span>
          </div>

          <div className="w-16 h-16 mx-auto my-2 rounded-2xl bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-3xl shadow-inner">
            {tip.categoryIcon}
          </div>

          <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            {tip.categoryLabel}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{tip.title}</h3>

          <div className="text-xs text-stone-400 mb-4">
            <span>Kinh nghiệm từ: </span>
            <span className="text-stone-300 font-medium italic">"{tip.sourceSituation}"</span>
          </div>

          <div className="space-y-3 text-left mb-6">
            <div className="bg-stone-800/90 border border-stone-700/80 rounded-xl p-3.5">
              <div className="text-xs font-bold text-stone-300 uppercase tracking-wide mb-1">
                Giải thích thực tế:
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">{tip.explanation}</p>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3.5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Hành động khuyến nghị:</span>
              </div>
              <p className="text-sm text-emerald-200 leading-relaxed font-medium">
                {tip.recommendedAction}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onOpenHandbook}
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Xem Sổ tay sinh tồn</span>
            </button>
            <button
              onClick={onContinue}
              className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Tiếp tục ngày sinh tồn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
