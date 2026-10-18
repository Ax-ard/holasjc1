import React from 'react';
import { Sparkles, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { InventoryItem } from '../types/game';
import { soundManager } from '../utils/audio';

interface PostPuzzleGiftModalProps {
  giftItems: InventoryItem[];
  onClaimAndProceed?: () => void;
  onReceiveAndDepart?: () => void;
}

export const PostPuzzleGiftModal: React.FC<PostPuzzleGiftModalProps> = ({
  giftItems,
  onClaimAndProceed,
  onReceiveAndDepart,
}) => {
  const handleProceed = onReceiveAndDepart || onClaimAndProceed || (() => {});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative max-w-xl w-full bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-blue-500 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(37,99,235,0.35)] overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Badge */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-400 text-blue-300 text-xs font-black tracking-wider uppercase shadow-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>ĐẶC QUYỀN SINH VIÊN BÁO CHÍ</span>
          </div>
        </div>

        {/* Title & Narrative */}
        <div className="text-center mb-5">
          <div className="inline-block p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-2">
            <Gift className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-amber-300 tracking-tight uppercase">
            QUÀ TẶNG TÂN BINH TỪ VIỆN BÁO CHÍ & TRUYỀN THÔNG (SJC)
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed px-2">
            Hành trang sinh tồn độc quyền tiếp sức cho sinh viên Báo chí vững vàng vượt qua 7 ngày rèn luyện tại Hòa Lạc!
          </p>
        </div>

        {/* 4 SJC Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">
          {giftItems.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-stone-800/90 border border-blue-500/40 hover:border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)] flex items-start gap-3 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/50 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xs sm:text-sm text-white truncate">
                    {item.name}
                  </span>
                </div>
                <div className="inline-block px-1.5 py-0.2 rounded text-[10px] font-black bg-blue-600/30 border border-blue-500/40 text-blue-300 mt-0.5">
                  [ĐẶC QUYỀN SJC]
                </div>
                <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-3 mb-5 flex items-center gap-2.5 text-xs text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            Toàn bộ 4 vật phẩm SJC sẽ được tự động đồng bộ vào <strong>Túi đồ (Inventory)</strong> sẵn sàng trợ lực cho bạn suốt 7 ngày!
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundManager.playFanfare();
            handleProceed();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-blue-600 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all cursor-pointer active:scale-[0.99]"
        >
          <span>NHẬN QUÀ & LÊN ĐƯỜNG ĐẾN HOLA!</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
