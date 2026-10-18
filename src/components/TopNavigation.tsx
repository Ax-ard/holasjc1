import React from 'react';
import { BookOpen, Backpack, Volume2, VolumeX, RotateCcw, Calendar } from 'lucide-react';
import { DayPhase, PlayerProfile } from '../types/game';

interface TopNavigationProps {
  currentDay: number;
  phase: DayPhase;
  phaseLabel: string;
  playerProfile?: PlayerProfile;
  unlockedTipsCount: number;
  totalTipsCount: number;
  inventoryCount: number;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHandbook: () => void;
  onOpenInventory: () => void;
  onOpenDailyLog: () => void;
  onConfirmRestart: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  currentDay,
  phaseLabel,
  playerProfile,
  unlockedTipsCount,
  totalTipsCount,
  inventoryCount,
  isSoundEnabled,
  onToggleSound,
  onOpenHandbook,
  onOpenInventory,
  onOpenDailyLog,
  onConfirmRestart,
}) => {
  const isDayZero = currentDay === 0;
  const progressPercent = isDayZero ? 0 : Math.min(100, Math.round((currentDay / 7) * 100));

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 px-3 py-2.5 sm:px-6 sm:py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 border border-emerald-500/40 flex items-center justify-center font-bold text-white shadow-sm text-sm">
              HL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white uppercase">
                  HOLA SURVIVAL
                </span>
                <span className="text-xs text-emerald-400 font-semibold tracking-wider bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                  7 NGÀY SINH TỒN
                </span>
                {playerProfile && (
                  <span
                    className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${
                      playerProfile.gender === 'nu'
                        ? 'bg-rose-950/70 text-rose-300 border-rose-800/60'
                        : 'bg-blue-950/70 text-blue-300 border-blue-800/60'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{playerProfile.name}</span>
                    <span className="text-[10px] opacity-75 uppercase">
                      ({playerProfile.gender === 'nu' ? 'Nữ' : 'Nam'})
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Mobile buttons */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              aria-label={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>
            <button
              onClick={onConfirmRestart}
              className="p-2 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
              title="Chơi lại từ đầu"
              aria-label="Chơi lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day & Progress Tracker */}
        <div className="flex-1 max-w-md mx-auto w-full px-1 sm:px-4">
          <div className="flex items-center justify-between text-xs font-medium mb-1">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold tracking-wider text-sm">
                {isDayZero ? 'DAY 0: XẾP VALI' : `NGÀY ${currentDay.toString().padStart(2, '0')} / 07`}
              </span>
              <span className="text-stone-400">·</span>
              <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-amber-300 font-semibold text-[11px]">
                {isDayZero ? 'Tại nhà' : phaseLabel}
              </span>
            </div>
            <span className="text-stone-400 font-mono text-[11px]">
              {isDayZero ? 'Khởi động' : `${progressPercent}%`}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden border border-stone-700/60 p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${isDayZero ? 10 : progressPercent}%` }}
            />
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={onOpenHandbook}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700/80 text-xs font-semibold text-stone-200 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>SỔ TAY</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
              {unlockedTipsCount}/{totalTipsCount}
            </span>
          </button>

          <button
            onClick={onOpenInventory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700/80 text-xs font-semibold text-stone-200 transition-colors cursor-pointer"
          >
            <Backpack className="w-3.5 h-3.5 text-emerald-400" />
            <span>TÚI ĐỒ</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
              {inventoryCount}
            </span>
          </button>

          <button
            onClick={onOpenDailyLog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700/80 text-xs font-semibold text-stone-300 transition-colors cursor-pointer"
            title="Nhật ký các ngày trước"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>NHẬT KÝ</span>
          </button>

          <div className="hidden md:flex items-center gap-1 pl-1 border-l border-stone-800">
            <button
              onClick={onToggleSound}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              aria-label={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>
            <button
              onClick={onConfirmRestart}
              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
              title="Chơi lại chiến dịch"
              aria-label="Chơi lại chiến dịch"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
