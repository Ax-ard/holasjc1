import React, { useState, useEffect, useCallback } from 'react';
import {
  RotateCw,
  Trash2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Info,
  Package,
  Check,
} from 'lucide-react';
import {
  ALL_SUITCASE_ITEMS,
  SUITCASE_GRID_COLS,
  SUITCASE_GRID_ROWS,
  SuitcaseItemDef,
} from '../data/suitcaseItems';
import { SuitcaseItem } from '../types/game';
import { soundManager } from '../utils/audio';

export interface PlacedSuitcaseItem {
  item: SuitcaseItemDef;
  x: number;
  y: number;
  rotated: boolean;
}

interface SuitcasePuzzleProps {
  onStartJourney: (packedItems: SuitcaseItem[]) => void;
}

export const SuitcasePuzzle: React.FC<SuitcasePuzzleProps> = ({ onStartJourney }) => {
  const [placedItems, setPlacedItems] = useState<PlacedSuitcaseItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [currentRotation, setCurrentRotation] = useState<boolean>(false); // false = normal, true = swapped w & h
  const [activeTab, setActiveTab] = useState<'all' | 'required' | 'optional' | 'bulky'>('all');
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);

  // Clear warning after 3 seconds
  useEffect(() => {
    if (warningMessage) {
      const timer = setTimeout(() => setWarningMessage(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [warningMessage]);

  // Keyboard shortcut: Press 'R' to rotate selected item
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setCurrentRotation((prev) => !prev);
        soundManager.playClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedItem = ALL_SUITCASE_ITEMS.find((it) => it.id === selectedItemId);

  // Check if item is already placed
  const isItemPlaced = (id: string) => placedItems.some((p) => p.item.id === id);

  // Calculate required items placed count
  const requiredTotal = ALL_SUITCASE_ITEMS.filter((i) => i.type === 'required').length;
  const requiredPlaced = placedItems.filter((p) => p.item.type === 'required').length;
  const isReady = requiredPlaced >= requiredTotal;

  // Compute occupied grid map
  const gridOccupancy: (string | null)[][] = Array.from({ length: SUITCASE_GRID_ROWS }, () =>
    Array(SUITCASE_GRID_COLS).fill(null)
  );

  placedItems.forEach((placed) => {
    const width = placed.rotated ? placed.item.h : placed.item.w;
    const height = placed.rotated ? placed.item.w : placed.item.h;
    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        const gy = placed.y + dy;
        const gx = placed.x + dx;
        if (gy < SUITCASE_GRID_ROWS && gx < SUITCASE_GRID_COLS) {
          gridOccupancy[gy][gx] = placed.item.id;
        }
      }
    }
  });

  // Check if an item fits at (x, y) with a given rotation
  const canPlaceItem = (
    item: SuitcaseItemDef,
    x: number,
    y: number,
    rotated: boolean,
    ignoreId?: string
  ): boolean => {
    const width = rotated ? item.h : item.w;
    const height = rotated ? item.w : item.h;

    // Check bounds
    if (x < 0 || y < 0 || x + width > SUITCASE_GRID_COLS || y + height > SUITCASE_GRID_ROWS) {
      return false;
    }

    // Check collision with other items
    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        const occ = gridOccupancy[y + dy][x + dx];
        if (occ && occ !== ignoreId) {
          return false;
        }
      }
    }
    return true;
  };

  // Place item at (x, y)
  const placeItem = (item: SuitcaseItemDef, x: number, y: number, rotated: boolean) => {
    if (canPlaceItem(item, x, y, rotated)) {
      setPlacedItems((prev) => [
        ...prev.filter((p) => p.item.id !== item.id),
        { item, x, y, rotated },
      ]);
      setSelectedItemId(null);
      setCurrentRotation(false);
      setWarningMessage(null);
      soundManager.playReward();
    } else {
      soundManager.playWarning();
      setWarningMessage('Chỗ này hơi chật rồi, thử sắp xếp lại nhé!');
    }
  };

  // Remove placed item
  const handleRemovePlaced = (id: string) => {
    setPlacedItems((prev) => prev.filter((p) => p.item.id !== id));
    soundManager.playClick();
  };

  // Clear all items
  const handleClearAll = () => {
    setPlacedItems([]);
    setSelectedItemId(null);
    setCurrentRotation(false);
    setWarningMessage(null);
    soundManager.playClick();
  };

  // Auto-pack suggestion (places the 11 required items perfectly)
  const handleAutoPack = () => {
    const reqs = ALL_SUITCASE_ITEMS.filter((i: SuitcaseItemDef) => i.type === 'required');
    const newPlaced: PlacedSuitcaseItem[] = [];

    const presets: { id: string; x: number; y: number; rotated: boolean }[] = [
      { id: 'req_quan_ao_1', x: 0, y: 0, rotated: false },
      { id: 'req_kem_danh_rang', x: 2, y: 0, rotated: false },
      { id: 'req_dau_goi_mini', x: 3, y: 0, rotated: false },
      { id: 'req_ban_chai', x: 4, y: 0, rotated: false },
      { id: 'req_bot_giat_nho', x: 4, y: 1, rotated: false },
      { id: 'req_giay_the_thao', x: 5, y: 0, rotated: false },
      { id: 'req_khan_tam', x: 5, y: 1, rotated: false },
      { id: 'req_so_tay', x: 7, y: 0, rotated: false },
      { id: 'req_but_viet', x: 7, y: 2, rotated: false },
      { id: 'req_tui_giat', x: 0, y: 2, rotated: false },
      { id: 'req_moc_ao', x: 1, y: 2, rotated: false },
    ];

    presets.forEach((p) => {
      const item = reqs.find((it: SuitcaseItemDef) => it.id === p.id);
      if (item) {
        newPlaced.push({ item, x: p.x, y: p.y, rotated: p.rotated });
      }
    });

    setPlacedItems(newPlaced);
    setSelectedItemId(null);
    setCurrentRotation(false);
    soundManager.playFanfare();
  };

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, item: SuitcaseItemDef) => {
    setSelectedItemId(item.id);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    setHoveredCell({ x, y });
  };

  const handleDrop = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain') || selectedItemId;
    const item = ALL_SUITCASE_ITEMS.find((it: SuitcaseItemDef) => it.id === itemId);
    if (item) {
      placeItem(item, x, y, currentRotation);
    }
    setHoveredCell(null);
  };

  // Filtered items list for the right panel
  const filteredList = ALL_SUITCASE_ITEMS.filter((item: SuitcaseItemDef) => {
    if (activeTab === 'required') return item.type === 'required';
    if (activeTab === 'optional') return item.type === 'optional';
    if (activeTab === 'bulky') return item.type === 'bulky';
    return true;
  });

  const totalOccupiedCells = placedItems.reduce((acc, p) => acc + p.item.w * p.item.h, 0);
  const remainingCells = SUITCASE_GRID_COLS * SUITCASE_GRID_ROWS - totalOccupiedCells;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Title & Banner */}
      <div className="bg-[#FAF7F0] border-2 border-[#D8CEBA] rounded-2xl p-4 sm:p-5 shadow-sm mb-5 text-[#3D4A3E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#6B8264] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Day 0 - Trước ngày lên đường
              </span>
              <span className="text-xs text-[#8C7A6B] font-medium">Hành trang nhập ngũ</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#2D3A2F] mt-1 flex items-center gap-2">
              <span>🧳 HOLA SURVIVAL: XẾP VALI SINH TỒN</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5E51] mt-0.5">
              Kéo thả các vật phẩm vào vali mở nắp. Hãy ưu tiên xếp đủ{' '}
              <strong className="text-[#3E5C38]">11 món bắt buộc</strong> trước khi lên đường đến
              Hòa Lạc!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoPack}
              className="px-3 py-1.5 rounded-xl bg-[#EBE5D8] hover:bg-[#DDD5C5] text-[#4A3D30] text-xs font-semibold flex items-center gap-1.5 border border-[#CFC5B2] transition shadow-sm cursor-pointer"
              title="Tự động xếp nhanh 11 món bắt buộc"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8A7550]" />
              <span>Gợi ý xếp nhanh</span>
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-xl bg-[#F0EBE1] hover:bg-[#E5DFD3] text-[#7A5043] text-xs font-semibold flex items-center gap-1.5 border border-[#D5C9B8] transition shadow-sm cursor-pointer"
              title="Xếp lại từ đầu"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Làm lại</span>
            </button>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="mt-4 pt-3 border-t border-[#E3DAC8] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#4A5D44]">Món bắt buộc:</span>
            <div className="w-32 bg-[#E2DACB] rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isReady ? 'bg-[#588157]' : 'bg-[#8FAD88]'
                }`}
                style={{ width: `${Math.min(100, (requiredPlaced / requiredTotal) * 100)}%` }}
              />
            </div>
            <span className="font-bold text-[#3B4E37]">
              {requiredPlaced}/{requiredTotal} {isReady ? '✅ (Đủ điều kiện)' : ''}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#7C6E5F]">
            <span>
              Ô trống vali: <strong className="text-[#3D4A3E]">{remainingCells}</strong>/
              {SUITCASE_GRID_COLS * SUITCASE_GRID_ROWS} ô
            </span>
            <span>
              Đã xếp: <strong className="text-[#3D4A3E]">{placedItems.length}</strong> món
            </span>
          </div>
        </div>
      </div>

      {/* Warning Alert if collision or out of bounds */}
      {warningMessage && (
        <div className="mb-4 p-3 bg-[#FFF3CD] border border-[#FFE082] rounded-xl text-amber-900 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm animate-bounce">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Main Game Arena: Suitcase on Left/Center, Items Catalog on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT / CENTER: THE TOP-DOWN SUITCASE (7 or 8 columns on large screens) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
          {/* Suitcase Frame */}
          <div className="w-full max-w-[620px] bg-[#CBB89D] border-4 border-[#8B7355] rounded-3xl p-4 sm:p-6 shadow-xl relative">
            {/* Suitcase Leather Straps & Corner Protectors */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5A4632] text-[#F4EFE6] px-5 py-1 rounded-t-xl text-[10px] font-bold tracking-widest uppercase border-t border-x border-[#3D2F22] shadow">
              HOLA TACTICAL SUITCASE
            </div>
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#8B7355] border-2 border-[#5A4632]" />
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#8B7355] border-2 border-[#5A4632]" />
            <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-[#8B7355] border-2 border-[#5A4632]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#8B7355] border-2 border-[#5A4632]" />

            {/* Inner Liner with Grid */}
            <div className="bg-[#EFE9DC] border-2 border-[#B8A686] rounded-2xl p-2 sm:p-3 shadow-inner relative overflow-hidden">
              {/* Subtle military luggage straps watermark */}
              <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center font-black text-6xl text-[#586F55] rotate-[-15deg] select-none">
                HOLA SINH TỒN
              </div>

              {/* The Grid */}
              <div
                className="grid gap-1 sm:gap-1.5 select-none relative"
                style={{
                  gridTemplateColumns: `repeat(${SUITCASE_GRID_COLS}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${SUITCASE_GRID_ROWS}, minmax(0, 1fr))`,
                  aspectRatio: `${SUITCASE_GRID_COLS} / ${SUITCASE_GRID_ROWS}`,
                }}
              >
                {Array.from({ length: SUITCASE_GRID_ROWS }).map((_, r) =>
                  Array.from({ length: SUITCASE_GRID_COLS }).map((_, c) => {
                    const isOccupied = gridOccupancy[r][c] !== null;
                    const isHovered =
                      hoveredCell &&
                      selectedItem &&
                      (() => {
                        const w = currentRotation ? selectedItem.h : selectedItem.w;
                        const h = currentRotation ? selectedItem.w : selectedItem.h;
                        return (
                          c >= hoveredCell.x &&
                          c < hoveredCell.x + w &&
                          r >= hoveredCell.y &&
                          r < hoveredCell.y + h
                        );
                      })();

                    return (
                      <div
                        key={`${r}-${c}`}
                        onDragOver={(e) => handleDragOver(e, c, r)}
                        onDrop={(e) => handleDrop(e, c, r)}
                        onClick={() => {
                          if (selectedItem) {
                            placeItem(selectedItem, c, r, currentRotation);
                          }
                        }}
                        className={`rounded-lg border transition flex items-center justify-center relative cursor-pointer ${
                          isOccupied
                            ? 'border-transparent bg-transparent'
                            : isHovered
                            ? 'border-[#588157] bg-[#D8E6D3]/60'
                            : 'border-[#D9CFBE] bg-[#F7F3EB]/70 hover:bg-[#EFE8DA]'
                        }`}
                        style={{ minHeight: '44px' }}
                      >
                        {!isOccupied && (
                          <span className="text-[10px] text-[#C4B7A0] font-mono select-none">
                            {r + 1},{c + 1}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}

                {/* Placed Items Rendered on Top of Grid */}
                {placedItems.map((placed) => {
                  const width = placed.rotated ? placed.item.h : placed.item.w;
                  const height = placed.rotated ? placed.item.w : placed.item.h;

                  // Styling based on item type
                  let bgStyle = 'bg-[#8CA885] border-[#5E7A57] text-[#1E301B]'; // required
                  if (placed.item.isSjc) {
                    bgStyle = 'bg-blue-100/95 border-blue-600 text-[#0F2A59] ring-2 ring-blue-400 shadow-[0_0_14px_rgba(37,99,235,0.6)] animate-pulse';
                  } else if (placed.item.type === 'optional') {
                    bgStyle = 'bg-[#D9CDB8] border-[#A6957C] text-[#3D3222]';
                  } else if (placed.item.type === 'bulky') {
                    bgStyle = 'bg-[#CF9A87] border-[#9E634F] text-[#401B11]';
                  }

                  return (
                    <div
                      key={placed.item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePlaced(placed.item.id);
                      }}
                      title={
                        placed.item.isSjc
                          ? `${placed.item.name} - [ĐẶC QUYỀN SJC]: Dụng cụ độc quyền mang bản sắc sinh viên Viện Báo chí & Truyền thông - Cứu tinh tại Hola! (Bấm để gỡ ra)`
                          : `${placed.item.name} (${placed.item.typeLabel}) - Bấm để gỡ ra`
                      }
                      className={`absolute rounded-xl border-2 p-1 flex flex-col items-center justify-center shadow-md transition transform hover:scale-[1.03] cursor-pointer group ${bgStyle}`}
                      style={{
                        left: `calc(${(placed.x / SUITCASE_GRID_COLS) * 100}% + 2px)`,
                        top: `calc(${(placed.y / SUITCASE_GRID_ROWS) * 100}% + 2px)`,
                        width: `calc(${(width / SUITCASE_GRID_COLS) * 100}% - 4px)`,
                        height: `calc(${(height / SUITCASE_GRID_ROWS) * 100}% - 4px)`,
                        zIndex: placed.item.isSjc ? 15 : 10,
                      }}
                    >
                      {placed.item.isSjc && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#1E3A8A] text-amber-300 border border-amber-300 text-[7.5px] font-black px-1 rounded shadow-sm whitespace-nowrap z-20 pointer-events-none tracking-wider">
                          [ĐẶC QUYỀN SJC]
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg sm:text-2xl filter drop-shadow-sm">
                          {placed.item.icon || '📦'}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-center leading-tight line-clamp-1 px-1">
                        {placed.item.name}
                      </span>
                      <span className="text-[8px] opacity-75 font-mono">
                        {width}×{height}
                      </span>

                      {/* Click to remove overlay indicator */}
                      <div className="absolute inset-0 bg-red-900/75 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition">
                        <span>✕ Gỡ ra</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Suitcase Bottom Status & Rotation Tip */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#5C4D3E]">
              <div className="flex items-center gap-1.5 font-medium">
                <Info className="w-3.5 h-3.5 text-[#7C6E5F]" />
                <span>
                  Mẹo: Nhấn phím <kbd className="px-1.5 py-0.5 bg-[#EAE2D2] rounded border text-[10px] font-mono font-bold">R</kbd> hoặc nút xoay trên món đồ để đổi chiều (Ngang/Dọc)
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#6E5B4B]">
                Nhấp vào món đồ trong vali để gỡ ra
              </span>
            </div>
          </div>

          {/* Departure CTA Button */}
          <div className="w-full max-w-[620px] mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF7F0] border border-[#DDD2BE] p-3 sm:p-4 rounded-2xl shadow-sm">
            <div>
              <div className="font-bold text-sm text-[#2D3A2F]">
                {isReady ? '🎉 Hành trang đã hoàn tất!' : '⚠️ Chưa đủ đồ bắt buộc'}
              </div>
              <div className="text-xs text-[#706253]">
                {isReady
                  ? 'Bạn đã xếp đủ 11 vật dụng thiết yếu. Sẵn sàng lên xe buýt tới Hòa Lạc!'
                  : `Cần xếp thêm ${requiredTotal - requiredPlaced} món bắt buộc nữa (hoặc bấm lên đường nếu muốn xuất phát luôn).`}
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playFanfare();
                onStartJourney(
                  placedItems.map((p) => ({
                    id: p.item.id,
                    name: p.item.name,
                    icon: p.item.icon || p.item.iconSymbol || '🧳',
                    type: p.item.type,
                    typeLabel: p.item.typeLabel,
                    w: p.item.w,
                    h: p.item.h,
                    description: p.item.description,
                    isSjc: p.item.isSjc,
                    sjcBadge: p.item.sjcBadge,
                  }))
                );
              }}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all transform cursor-pointer ${
                isReady
                  ? 'bg-[#51754E] hover:bg-[#436440] text-white hover:scale-105 animate-pulse'
                  : 'bg-[#8F8171] hover:bg-[#7D6F60] text-white'
              }`}
            >
              <span>LÊN ĐƯỜNG ĐẾN HOLA!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: CATALOG OF ITEMS */}
        <div className="lg:col-span-5 xl:col-span-4 bg-[#FAF7F0] border-2 border-[#D8CEBA] rounded-2xl p-4 shadow-sm flex flex-col h-[650px]">
          {/* Header & Tabs */}
          <div className="pb-3 border-b border-[#E3DAC8]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-sm text-[#2D3A2F] flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#5E7A57]" />
                <span>KHO ĐỒ TẠI NHÀ</span>
              </h2>
              {selectedItem && (
                <button
                  onClick={() => {
                    setCurrentRotation((prev) => !prev);
                    soundManager.playClick();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#EFE8DC] hover:bg-[#E2D8C7] text-xs font-bold text-[#4B3F31] border border-[#D5C9B8] flex items-center gap-1 transition cursor-pointer"
                  title="Xoay hướng vật phẩm (Phím R)"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#6B8264]" />
                  <span>Xoay: {currentRotation ? 'Dọc (R)' : 'Ngang (R)'}</span>
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="grid grid-cols-4 gap-1 text-[11px] font-bold">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-1.5 rounded-lg transition ${
                  activeTab === 'all'
                    ? 'bg-[#5E7A57] text-white shadow-sm'
                    : 'bg-[#EFE8DC] text-[#695B4C] hover:bg-[#E6DDCB]'
                }`}
              >
                Tất cả (31)
              </button>
              <button
                onClick={() => setActiveTab('required')}
                className={`py-1.5 rounded-lg transition ${
                  activeTab === 'required'
                    ? 'bg-[#5E7A57] text-white shadow-sm'
                    : 'bg-[#EFE8DC] text-[#695B4C] hover:bg-[#E6DDCB]'
                }`}
              >
                Bắt buộc (11)
              </button>
              <button
                onClick={() => setActiveTab('optional')}
                className={`py-1.5 rounded-lg transition ${
                  activeTab === 'optional'
                    ? 'bg-[#5E7A57] text-white shadow-sm'
                    : 'bg-[#EFE8DC] text-[#695B4C] hover:bg-[#E6DDCB]'
                }`}
              >
                Tùy chọn (15)
              </button>
              <button
                onClick={() => setActiveTab('bulky')}
                className={`py-1.5 rounded-lg transition ${
                  activeTab === 'bulky'
                    ? 'bg-[#5E7A57] text-white shadow-sm'
                    : 'bg-[#EFE8DC] text-[#695B4C] hover:bg-[#E6DDCB]'
                }`}
              >
                Cân nhắc (5)
              </button>
            </div>
          </div>

          {/* Selected Item Preview Box */}
          {selectedItem && (
            <div
              className={`my-2 p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                selectedItem.isSjc
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] ring-1 ring-blue-400'
                  : 'bg-[#F0EBE1] border border-[#D8CEBA]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl filter drop-shadow-sm">{selectedItem.icon || '📦'}</span>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-[#2D3A2F]">{selectedItem.name}</span>
                    {selectedItem.isSjc && (
                      <span className="bg-[#1E3A8A] text-amber-300 border border-amber-300 text-[8px] font-black px-1.5 py-0.2 rounded shadow-xs tracking-wider uppercase flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                        [ĐẶC QUYỀN SJC]
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#556957] font-medium">
                    {selectedItem.isSjc ? (
                      <span className="text-blue-900 font-semibold italic">
                        Dụng cụ độc quyền mang bản sắc sinh viên Viện Báo chí & Truyền thông - Cứu tinh tại Hola!
                      </span>
                    ) : (
                      <>
                        Kích thước:{' '}
                        <strong>
                          {currentRotation ? selectedItem.h : selectedItem.w}×
                          {currentRotation ? selectedItem.w : selectedItem.h} ô
                        </strong>{' '}
                        • Nhấp vào ô vali để đặt
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentRotation((prev) => !prev);
                  soundManager.playClick();
                }}
                className={`p-1.5 rounded-lg transition ${
                  selectedItem.isSjc
                    ? 'bg-blue-200 hover:bg-blue-300 text-blue-900 border border-blue-400'
                    : 'bg-[#E2DACB] hover:bg-[#D5CCBC] text-[#4A3D30]'
                }`}
                title="Xoay vật phẩm (R)"
              >
                <RotateCw className="w-4 h-4 text-[#1E3A8A]" />
              </button>
            </div>
          )}

          {/* Items Scrollable List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2 mt-2">
            {filteredList.map((item) => {
              const placed = isItemPlaced(item.id);
              const isSelected = selectedItemId === item.id;

              // Color badge
              let badgeColor = 'bg-[#8CA885] text-[#1E301B]'; // required
              if (item.isSjc) badgeColor = 'bg-[#1E3A8A] text-amber-300 border border-amber-300';
              else if (item.type === 'optional') badgeColor = 'bg-[#D9CDB8] text-[#3D3222]';
              else if (item.type === 'bulky') badgeColor = 'bg-[#CF9A87] text-[#401B11]';

              // Card styling with neon blue glow for SJC
              let cardStyle = 'bg-white border-[#E2D9C8] hover:bg-[#F7F4EC] hover:border-[#CFC4B0] cursor-grab shadow-xs';
              if (placed) {
                cardStyle = 'bg-[#E8E2D5]/50 border-[#D5CCBC] opacity-60 cursor-default';
              } else if (item.isSjc) {
                cardStyle = isSelected
                  ? 'bg-blue-100/90 border-blue-600 ring-2 ring-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.7)] animate-pulse cursor-grab'
                  : 'bg-blue-50/70 border-blue-300 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:ring-2 hover:ring-blue-400 cursor-grab';
              } else if (isSelected) {
                cardStyle = 'bg-[#E3EBDD] border-[#6B8264] shadow-sm cursor-grab ring-2 ring-[#6B8264]/40';
              }

              return (
                <div
                  key={item.id}
                  draggable={!placed}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onClick={() => {
                    if (!placed) {
                      setSelectedItemId(item.id);
                      soundManager.playClick();
                    }
                  }}
                  title={
                    item.isSjc
                      ? `${item.name} - [ĐẶC QUYỀN SJC]: Dụng cụ độc quyền mang bản sắc sinh viên Viện Báo chí & Truyền thông - Cứu tinh tại Hola!`
                      : `${item.name} - ${item.description}`
                  }
                  className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 select-none relative ${cardStyle}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl shrink-0 filter drop-shadow-xs">{item.icon || '📦'}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-xs text-[#2D3A2F] truncate">
                          {item.name}
                        </span>
                        {item.isSjc ? (
                          <span
                            className={`text-[8.5px] font-black px-1.5 py-0.2 rounded shadow-xs uppercase tracking-wider flex items-center gap-0.5 ${badgeColor}`}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                            [ĐẶC QUYỀN SJC]
                          </span>
                        ) : (
                          <span
                            className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${badgeColor}`}
                          >
                            {item.typeLabel}
                          </span>
                        )}
                      </div>
                      <p className={`text-[10px] truncate mt-0.5 ${item.isSjc ? 'text-blue-900 font-medium' : 'text-[#786A5B]'}`}>
                        {item.isSjc
                          ? 'Dụng cụ độc quyền mang bản sắc sinh viên Viện Báo chí & Truyền thông - Cứu tinh tại Hola!'
                          : item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      item.isSjc
                        ? 'bg-blue-100 text-blue-950 border-blue-300 font-bold'
                        : 'text-[#7D6E5E] bg-[#EFE8DC] border-[#DFD6C6]'
                    }`}>
                      {item.w}×{item.h}
                    </span>
                    {placed ? (
                      <span className="text-emerald-700 bg-emerald-100 p-1 rounded-full text-xs" title="Đã xếp vào vali">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItemId(item.id);
                          setCurrentRotation((prev) => !prev);
                          soundManager.playClick();
                        }}
                        className={`p-1 rounded transition ${
                          item.isSjc
                            ? 'bg-blue-200 hover:bg-blue-300 text-blue-950 border border-blue-400'
                            : 'bg-[#EFE8DC] hover:bg-[#E2D8C7] text-[#5C4D3E]'
                        }`}
                        title="Xoay (R)"
                      >
                        <RotateCw className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
