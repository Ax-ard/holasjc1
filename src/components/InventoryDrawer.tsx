import React, { useState } from 'react';
import { X, Backpack, Sparkles, CheckCircle2 } from 'lucide-react';
import { InventoryItem, ItemCategory } from '../types/game';

interface InventoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  onUseItem: (item: InventoryItem) => void;
}

const CATEGORIES: { id: ItemCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'personal', label: 'Đồ cá nhân' },
  { id: 'hygiene', label: 'Đồ vệ sinh' },
  { id: 'food', label: 'Đồ ăn & uống' },
  { id: 'study', label: 'Học tập' },
  { id: 'memory', label: 'Kỷ niệm' },
  { id: 'special', label: 'Đặc biệt' },
];

export const InventoryDrawer: React.FC<InventoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUseItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [activeItem, setActiveItem] = useState<InventoryItem | null>(null);

  if (!isOpen) return null;

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border-l border-stone-800 w-full max-w-xl h-full flex flex-col text-stone-100 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Backpack className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">TÚI ĐỒ QUÂN TƯ TRANG</h2>
              <div className="text-xs text-emerald-400 font-mono">
                {items.length} vật phẩm đang sở hữu
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Đóng túi đồ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="p-4 border-b border-stone-800 bg-stone-900/60 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 text-stone-500 text-xs">
              Chưa có vật phẩm nào trong danh mục này.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`bg-stone-800/80 border rounded-xl p-3.5 cursor-pointer transition-all hover:bg-stone-800 flex flex-col justify-between ${
                    activeItem?.id === item.id
                      ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                      : 'border-stone-700/80 hover:border-stone-600'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-stone-900/80 border border-stone-700 flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300">
                        x{item.quantity}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-0.5">{item.name}</h4>
                    <span className="text-[10px] text-emerald-400 font-medium block mb-2">
                      {item.categoryLabel}
                    </span>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.usable && (
                    <div className="mt-3 pt-2 border-t border-stone-700/60 flex items-center justify-between text-[11px] text-amber-300">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Có thể dùng</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUseItem(item);
                        }}
                        className="px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px] transition-colors cursor-pointer"
                      >
                        Dùng
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Item Detail Footer / Sheet */}
        {activeItem && (
          <div className="p-4 border-t border-stone-800 bg-stone-850 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeItem.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{activeItem.name}</h4>
                  <div className="text-[11px] text-stone-400">
                    Nguồn: <span className="text-stone-300">{activeItem.source}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="text-stone-400 hover:text-white text-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
            <p className="text-xs text-stone-300 mb-3">{activeItem.description}</p>

            {activeItem.usable && (
              <button
                onClick={() => {
                  onUseItem(activeItem);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeItem.useText ?? 'Sử dụng vật phẩm này'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
