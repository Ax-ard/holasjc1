import React from 'react';
import { X, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { DailyLog } from '../types/game';

interface DailyLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: Record<number, DailyLog>;
  currentDay: number;
}

export const DailyLogModal: React.FC<DailyLogModalProps> = ({
  isOpen,
  onClose,
  logs,
  currentDay,
}) => {
  if (!isOpen) return null;

  const pastDays = Object.values(logs).sort((a, b) => b.day - a.day);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col text-stone-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">NHẬT KÝ CHIẾN DỊCH (ĐẾN NGÀY {currentDay})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {pastDays.length === 0 ? (
            <div className="text-center py-12 text-xs text-stone-500">
              Bạn đang ở ngày đầu tiên. Hoàn thành ngày hôm nay để xem nhật ký tổng kết!
            </div>
          ) : (
            pastDays.map((log) => (
              <div
                key={log.day}
                className="bg-stone-800/80 border border-stone-700/80 rounded-xl p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    NGÀY {log.day.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {log.dayTitle}
                  </span>
                </div>

                <div className="text-xs text-stone-300 italic">
                  "{log.summaryNote}"
                </div>

                <div className="flex items-center gap-4 text-[11px] text-stone-400 pt-1 border-t border-stone-700/60">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>+{log.tipsUnlocked.length} mẹo sinh tồn</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+{log.itemsGained.length} vật phẩm</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
