import React from 'react';
import { ArrowRight, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { StoryEvent, StoryChoice, GameStep, AttributeState } from '../types/game';
import { SceneIllustration } from './SceneIllustration';
import { CharacterAvatar } from './CharacterAvatar';

interface StoryDialogueProps {
  event: StoryEvent;
  currentStep: GameStep;
  activeChoice?: StoryChoice;
  attributes: AttributeState;
  hasRewardPending: boolean;
  hasTipPending: boolean;
  onSelectChoice: (choice: StoryChoice) => void;
  onContinueFromOutcome: () => void;
}

export const StoryDialogue: React.FC<StoryDialogueProps> = ({
  event,
  currentStep,
  activeChoice,
  attributes,
  onSelectChoice,
  onContinueFromOutcome,
}) => {
  // Format delta badges
  const renderDeltas = (effects: StoryChoice['attributeEffects']) => {
    const badges: React.ReactNode[] = [];
    if (effects.health) {
      badges.push(
        <span
          key="hp"
          className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
            effects.health > 0 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
          }`}
        >
          {effects.health > 0 ? `+${effects.health}` : effects.health} HP
        </span>
      );
    }
    if (effects.morale) {
      badges.push(
        <span
          key="morale"
          className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
            effects.morale > 0 ? 'bg-blue-950/80 text-blue-400 border border-blue-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
          }`}
        >
          {effects.morale > 0 ? `+${effects.morale}` : effects.morale} Tinh thần
        </span>
      );
    }
    if (effects.reputation) {
      badges.push(
        <span
          key="rep"
          className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
            effects.reputation > 0 ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
          }`}
        >
          {effects.reputation > 0 ? `+${effects.reputation}` : effects.reputation} Uy tín
        </span>
      );
    }
    if (effects.money) {
      badges.push(
        <span
          key="money"
          className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
            effects.money > 0 ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
          }`}
        >
          {effects.money > 0 ? `+${Math.abs(effects.money) / 1000}k` : `-${Math.abs(effects.money) / 1000}k`}
        </span>
      );
    }
    return badges;
  };

  return (
    <div className="space-y-4">

      {/* Main Illustration Area */}
      <div className="relative">
        <SceneIllustration type={event.backgroundType} phase={event.phase} />

        {/* Category & Phase Floating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-stone-900/80 backdrop-blur-md border border-stone-700 text-emerald-400 font-bold text-xs shadow-sm">
            {event.category}
          </span>
          {event.isMilestone && (
            <span className="px-2 py-1 rounded-lg bg-amber-950/90 backdrop-blur-md border border-amber-700 text-amber-300 font-bold text-xs flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Cột mốc quan trọng
            </span>
          )}
        </div>
      </div>

      {/* Dialogue & Narrative Box */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-lg relative text-stone-100">
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
          {/* Character Avatar */}
          <div className="shrink-0 flex items-center sm:flex-col gap-3">
            <CharacterAvatar speaker={event.speaker} className="w-16 h-16 sm:w-20 sm:h-20" />
            <div className="sm:text-center">
              <div className="font-extrabold text-sm sm:text-base text-white">
                {event.speaker.name}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                {event.speaker.role}
              </div>
            </div>
          </div>

          {/* Dialogue & Narrative */}
          <div className="flex-1 w-full space-y-3">
            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-amber-300 tracking-tight">
              {event.title}
            </h3>

            {/* Narrative text */}
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {event.narrative}
            </p>

            {/* Spoken Dialogue bubble */}
            {event.dialogue && (
              <div className="relative bg-stone-800/90 border border-stone-700 rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm text-emerald-200 italic font-medium shadow-inner">
                <span className="text-stone-400 not-italic mr-1.5 font-bold">"</span>
                {event.dialogue}
                <span className="text-stone-400 not-italic ml-1.5 font-bold">"</span>
              </div>
            )}
          </div>
        </div>

        {/* OUTCOME NARRATIVE VIEW (Step 2 resolution) */}
        {currentStep === 'choice_outcome' && activeChoice && (() => {
          const isSjcChoice = Boolean(
            activeChoice.isSjcChoice ||
            activeChoice.inventoryRewardId?.startsWith('sjc_') ||
            activeChoice.text.includes('SJC') ||
            activeChoice.text.includes('Túi tote') ||
            activeChoice.text.includes('Bình giữ nhiệt') ||
            activeChoice.text.includes('Xịt chống nắng') ||
            activeChoice.text.includes('Khăn lạnh')
          );

          let sjcIcon = '⚡';
          let sjcTitle = 'Vật phẩm độc quyền SJC';
          if (activeChoice.text.includes('Túi tote')) {
            sjcIcon = '👜';
            sjcTitle = 'Túi tote thần kỳ SJC';
          } else if (activeChoice.text.includes('Bình giữ nhiệt') || activeChoice.text.includes('nước ấm')) {
            sjcIcon = '🥤';
            sjcTitle = 'Bình giữ nhiệt SJC';
          } else if (activeChoice.text.includes('Xịt chống nắng')) {
            sjcIcon = '🧴';
            sjcTitle = 'Xịt chống nắng SJC (SPF 50)';
          } else if (activeChoice.text.includes('Khăn lạnh')) {
            sjcIcon = '🧊';
            sjcTitle = 'Khăn lạnh SJC';
          }

          return (
            <div className="mt-4 pt-4 border-t border-stone-800 animate-in fade-in duration-200">
              {/* SJC Exclusive Item Activation Banner */}
              {isSjcChoice && (
                <div className="bg-gradient-to-r from-blue-950/90 via-indigo-950/90 to-blue-950/90 border-1.5 border-blue-500 rounded-xl p-3.5 mb-3.5 flex items-center gap-3 shadow-[0_0_18px_rgba(0,122,255,0.35)] animate-in zoom-in-95 duration-300">
                  <div className="w-11 h-11 rounded-xl bg-blue-900/60 border border-blue-400 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    <span className="inline-block animate-bounce">{sjcIcon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-black text-amber-300 tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>KÍCH HOẠT THÀNH CÔNG VẬT PHẨM ĐỘC QUYỀN SJC!</span>
                    </div>
                    <div className="text-xs sm:text-sm text-white font-bold mt-0.5">
                      {sjcTitle} — Tối ưu hóa hiệu quả sinh tồn và nâng tầm chỉ số
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-emerald-950/50 border border-emerald-800/80 rounded-xl p-4 mb-4">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>KẾT QUẢ QUYẾT ĐỊNH:</span>
                </div>
                <p className="text-sm text-stone-200 leading-relaxed font-medium">
                  {activeChoice.outcomeText}
                </p>

                {/* Show immediate deltas applied */}
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-stone-400">Thay đổi:</span>
                  {renderDeltas(activeChoice.attributeEffects)}
                </div>
              </div>

              <button
                onClick={onContinueFromOutcome}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer ml-auto"
              >
                <span>Tiếp tục (Xem phần thưởng)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })()}

        {/* DECISION CHOICES LIST (Step 1) */}
        {currentStep === 'situation' && (
          <div className="mt-4 pt-4 border-t border-stone-800">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
              ĐƯA RA LỰA CHỌN CỦA BẠN:
            </div>

            <div className="space-y-2.5">
              {event.choices.map((choice, idx) => {
                // Check if requirements met (e.g. money cost)
                const moneyCost = choice.attributeEffects.money ?? 0;
                const isAffordable = moneyCost >= 0 || attributes.money >= Math.abs(moneyCost);
                const isHealthSufficient =
                  !choice.requirements?.minHealth || attributes.health >= choice.requirements.minHealth;

                const isAvailable = isAffordable && isHealthSufficient;

                const isSjcChoice = Boolean(
                  choice.isSjcChoice ||
                  choice.inventoryRewardId?.startsWith('sjc_') ||
                  choice.text.includes('SJC') ||
                  choice.text.includes('Túi tote') ||
                  choice.text.includes('Bình giữ nhiệt') ||
                  choice.text.includes('Xịt chống nắng') ||
                  choice.text.includes('Khăn lạnh')
                );

                return (
                  <button
                    key={choice.id}
                    disabled={!isAvailable}
                    onClick={() => onSelectChoice(choice)}
                    style={
                      isAvailable && isSjcChoice
                        ? {
                            boxShadow: '0 0 10px rgba(0, 122, 255, 0.45)',
                            border: '1.5px solid #007aff',
                          }
                        : undefined
                    }
                    className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 cursor-pointer relative overflow-hidden group ${
                      !isAvailable
                        ? 'bg-stone-900/50 border-stone-800 text-stone-500 cursor-not-allowed opacity-60'
                        : isSjcChoice
                        ? 'bg-gradient-to-r from-blue-950/60 via-stone-850 to-blue-950/40 hover:from-blue-900/70 hover:to-indigo-950/70 text-stone-100 hover:shadow-[0_0_15px_rgba(0,122,255,0.6)] active:scale-[0.99]'
                        : 'bg-stone-800 hover:bg-stone-750 hover:border-emerald-500 border-stone-700 text-stone-100 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          isSjcChoice
                            ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                            : 'bg-stone-700 text-stone-300'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm font-semibold text-stone-100 leading-snug block">
                          {choice.text}
                        </span>
                        {!isAvailable && (
                          <div className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                            <Lock className="w-3 h-3" />
                            <span>
                              {!isAffordable
                                ? 'Không đủ tiền mặt cho lựa chọn này!'
                                : 'Sức khỏe không đủ để thực hiện!'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SJC Identification Badge on Choice */}
                    {isSjcChoice && isAvailable && (
                      <div className="self-end sm:self-center shrink-0">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-600 text-white border border-blue-400 shadow-sm flex items-center gap-1 tracking-wider uppercase">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>[⚡ VẬT PHẨM SJC]</span>
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
