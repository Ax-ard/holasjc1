import React from 'react';
import { Sparkles, ArrowRight, Backpack } from 'lucide-react';
import { InventoryItem } from '../types/game';

interface RewardModalProps {
  item: InventoryItem;
  onContinue: () => void;
  onOpenInventory: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  item,
  onContinue,
  onOpenInventory,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border-2 border-emerald-500/80 rounded-2xl max-w-md w-full p-6 text-stone-100 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center">
          {/* Step 3 kicker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BƯỚC 3: NHẬN VẬT PHẨM MỚI</span>
          </div>

          <div className="w-20 h-20 mx-auto my-3 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-4xl shadow-inner">
            {item.icon}
          </div>

          <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
          <p className="text-xs text-emerald-400 font-medium mb-3">
            {item.categoryLabel} · Nguồn: {item.source}
          </p>

          <div className="bg-stone-800/80 border border-stone-700/80 rounded-xl p-3.5 text-stone-300 text-sm text-left mb-5 leading-relaxed">
            {item.description}
            {item.usable && (
              <div className="mt-2 pt-2 border-t border-stone-700 text-xs text-amber-300 flex items-center gap-1">
                <span>✨ Có thể sử dụng trong túi đồ để phục hồi chỉ số!</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onOpenInventory}
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Backpack className="w-4 h-4 text-emerald-400" />
              <span>Xem túi đồ</span>
            </button>
            <button
              onClick={onContinue}
              className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Xem mẹo sinh tồn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
