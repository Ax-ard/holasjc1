import React, { useState } from 'react';
import { X, Search, Bookmark, BookmarkCheck, BookOpen, Check } from 'lucide-react';
import { HandbookCategory, HandbookTip } from '../types/game';
import { HANDBOOK_TIPS } from '../data/tips';

interface HandbookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedTipIds: string[];
  bookmarkedTipIds: string[];
  onToggleBookmark: (tipId: string) => void;
}

const CATEGORIES: { id: HandbookCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất cả', icon: '📖' },
  { id: 'discipline', label: 'Nề nếp', icon: '🛏️' },
  { id: 'health', label: 'Sức khỏe', icon: '🩹' },
  { id: 'hygiene_food', label: 'Ăn uống & Vệ sinh', icon: '🍲' },
  { id: 'money', label: 'Tiền bạc', icon: '💵' },
  { id: 'items', label: 'Đồ dùng', icon: '🎒' },
  { id: 'social', label: 'Giao tiếp', icon: '🤝' },
  { id: 'mindset', label: 'Tinh thần', icon: '🌱' },
  { id: 'study', label: 'Học tập', icon: '📚' },
];

export const HandbookDrawer: React.FC<HandbookDrawerProps> = ({
  isOpen,
  onClose,
  unlockedTipIds,
  bookmarkedTipIds,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HandbookCategory | 'all'>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  if (!isOpen) return null;

  const unlockedSet = new Set(unlockedTipIds);
  const bookmarkedSet = new Set(bookmarkedTipIds);

  const filteredTips = HANDBOOK_TIPS.filter((tip) => {
    // category filter
    if (selectedCategory !== 'all' && tip.category !== selectedCategory) {
      return false;
    }
    // bookmark filter
    if (onlyBookmarked && !bookmarkedSet.has(tip.id)) {
      return false;
    }
    // search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = tip.title.toLowerCase().includes(q);
      const matchExpl = tip.explanation.toLowerCase().includes(q);
      const matchAction = tip.recommendedAction.toLowerCase().includes(q);
      return matchTitle || matchExpl || matchAction;
    }
    return true;
  });

  const unlockedCount = HANDBOOK_TIPS.filter((t) => unlockedSet.has(t.id)).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border-l border-stone-800 w-full max-w-xl h-full flex flex-col text-stone-100 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 border border-amber-800 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">SỔ TAY SINH TỒN HOLA</h2>
              <div className="text-xs text-amber-400 font-mono">
                ĐÃ MỞ KHÓA: {unlockedCount} / {HANDBOOK_TIPS.length} MẸO ({Math.round((unlockedCount / HANDBOOK_TIPS.length) * 100)}%)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Đóng sổ tay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-stone-800 space-y-3 bg-stone-900/60">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
              <input
                type="text"
                placeholder="Tìm kiếm mẹo sinh tồn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                onlyBookmarked
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'bg-stone-800 text-stone-300 border border-stone-700 hover:bg-stone-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đã lưu</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-stone-800/80 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tips Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredTips.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              Không tìm thấy mẹo nào phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            filteredTips.map((tip) => {
              const isUnlocked = unlockedSet.has(tip.id);
              const isBookmarked = bookmarkedSet.has(tip.id);

              if (!isUnlocked) {
                return (
                  <div
                    key={tip.id}
                    className="bg-stone-900/40 border border-dashed border-stone-800 rounded-xl p-4 text-stone-500 select-none"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg opacity-40">🔒</span>
                      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        {tip.categoryLabel}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-stone-600 mb-1">
                      Mẹo sinh tồn chưa mở khóa
                    </div>
                    <div className="text-xs text-stone-600 italic">
                      Gợi ý: Tham gia trải nghiệm các tình huống tại HOLA để khám phá bí quyết này!
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={tip.id}
                  className="bg-stone-800/70 border border-stone-700/80 rounded-xl p-4 hover:border-amber-600/50 transition-all text-stone-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tip.categoryIcon}</span>
                      <div>
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                          {tip.categoryLabel}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {tip.title}
                        </h4>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleBookmark(tip.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                      title={isBookmarked ? 'Bỏ lưu' : 'Lưu mẹo yêu thích'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-stone-300 mb-3 leading-relaxed">
                    {tip.explanation}
                  </p>

                  <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-lg p-2.5 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-300 font-medium">
                      <strong className="text-emerald-200">Hành động: </strong>
                      {tip.recommendedAction}
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-stone-500 italic text-right">
                    Kinh nghiệm từ: {tip.sourceSituation}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
