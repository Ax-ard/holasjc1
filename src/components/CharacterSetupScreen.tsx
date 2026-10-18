import React, { useState } from 'react';
import { User, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

export interface PlayerProfile {
  name: string;
  gender: 'nam' | 'nu';
}

interface CharacterSetupScreenProps {
  onConfirmProfile?: (profile: PlayerProfile) => void;
  onComplete?: (profile: PlayerProfile) => void;
}

export const CharacterSetupScreen: React.FC<CharacterSetupScreenProps> = ({
  onConfirmProfile,
  onComplete,
}) => {
  const [name, setName] = useState<string>('Nguyễn Hoài An');
  const [gender, setGender] = useState<'nam' | 'nu'>('nu');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Vui lòng nhập tên nhân vật của bạn!');
      soundManager.playWarning();
      return;
    }
    soundManager.playFanfare();
    const handler = onComplete || onConfirmProfile;
    if (handler) {
      handler({ name: trimmed, gender });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="max-w-xl w-full bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Tag */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/60 text-blue-400 font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            HỌC VIỆN BÁO CHÍ & TRUYỀN THÔNG (SJC)
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight uppercase">
            HỒ SƠ TÂN BINH HÒA LẠC
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1.5">
            Khóa học Giáo dục Quốc phòng & An ninh 7 Ngày Sinh Tồn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Character Name */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Họ và tên tân binh:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Nhập họ và tên của bạn..."
              maxLength={30}
              className="w-full bg-stone-800 border border-stone-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition-all"
            />
            {error && <p className="text-xs text-rose-400 mt-1.5 font-medium">{error}</p>}
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Chọn giới tính nhân vật:</span>
            </label>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {/* Option Nữ */}
              <button
                type="button"
                onClick={() => {
                  setGender('nu');
                  soundManager.playClick();
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between items-center text-center gap-3 ${
                  gender === 'nu'
                    ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/50 shadow-lg shadow-rose-950/50'
                    : 'bg-stone-800/80 border-stone-700 hover:border-stone-600 text-stone-400'
                }`}
              >
                <div className="text-4xl sm:text-5xl my-1">👩‍✈️</div>
                <div className="font-extrabold text-white text-sm sm:text-base tracking-wide">NỮ CHIẾN SĨ</div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-colors ${
                    gender === 'nu' ? 'bg-rose-500 text-white' : 'bg-stone-700 text-stone-400'
                  }`}
                >
                  {gender === 'nu' ? 'ĐÃ CHỌN' : 'CHỌN'}
                </span>
              </button>

              {/* Option Nam */}
              <button
                type="button"
                onClick={() => {
                  setGender('nam');
                  soundManager.playClick();
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between items-center text-center gap-3 ${
                  gender === 'nam'
                    ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/50 shadow-lg shadow-blue-950/50'
                    : 'bg-stone-800/80 border-stone-700 hover:border-stone-600 text-stone-400'
                }`}
              >
                <div className="text-4xl sm:text-5xl my-1">👨‍✈️</div>
                <div className="font-extrabold text-white text-sm sm:text-base tracking-wide">NAM CHIẾN SĨ</div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-colors ${
                    gender === 'nam' ? 'bg-blue-500 text-white' : 'bg-stone-700 text-stone-400'
                  }`}
                >
                  {gender === 'nam' ? 'ĐÃ CHỌN' : 'CHỌN'}
                </span>
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition-all cursor-pointer active:scale-[0.99]"
          >
            <span>BẮT ĐẦU XẾP VALI HÀNH TRANG (DAY 0)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
