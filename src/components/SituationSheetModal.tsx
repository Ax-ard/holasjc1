import React, { useState, useMemo } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  FileSpreadsheet,
  Edit3,
  Save,
  RotateCcw,
} from 'lucide-react';
import { StoryEvent } from '../types/game';
import { ALL_EVENTS } from '../data/events';
import { formatEffects, formatRewards, downloadCsvFile, generateEventsCsv } from '../utils/csvExport';

interface SituationSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateEvent?: (updatedEvent: StoryEvent) => void;
}

export const SituationSheetModal: React.FC<SituationSheetModalProps> = ({
  isOpen,
  onClose,
  onUpdateEvent,
}) => {
  const [eventsData, setEventsData] = useState<StoryEvent[]>(ALL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [selectedPhase, setSelectedPhase] = useState<string | 'all'>('all');
  const [copied, setCopied] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<StoryEvent | null>(null);

  // Filter events
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const eventDay = event.day ?? 1;
      const week = Math.ceil(eventDay / 7);
      if (selectedWeek !== 'all' && week !== selectedWeek) return false;
      if (selectedDay !== 'all' && eventDay !== selectedDay) return false;
      if (selectedPhase !== 'all' && event.phaseLabel !== selectedPhase) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = event.title.toLowerCase().includes(q);
        const inNarrative = event.narrative.toLowerCase().includes(q);
        const inDialogue = (event.dialogue || '').toLowerCase().includes(q);
        const inSpeaker = event.speaker.name.toLowerCase().includes(q);
        const inChoices = event.choices.some(
          (c) => c.text.toLowerCase().includes(q) || c.outcomeText.toLowerCase().includes(q)
        );
        return inTitle || inNarrative || inDialogue || inSpeaker || inChoices;
      }
      return true;
    });
  }, [eventsData, selectedWeek, selectedDay, selectedPhase, searchQuery]);

  if (!isOpen) return null;

  // Handle CSV Download
  const handleDownloadCsv = () => {
    const csvContent = generateEventsCsv(eventsData);
    downloadCsvFile(csvContent, 'hola_survival_84_tinh_huong.csv');
  };

  // Handle Copy TSV for Google Sheets pasting
  const handleCopyForGoogleSheets = () => {
    const headers = [
      'STT',
      'Mã ID',
      'Ngày',
      'Tuần',
      'Buổi',
      'Danh mục',
      'Tiêu đề',
      'Mô tả bối cảnh',
      'Người nói',
      'Lời thoại',
      'Lựa chọn A',
      'Hiệu ứng A',
      'Kết quả A',
      'Lựa chọn B',
      'Hiệu ứng B',
      'Kết quả B',
      'Lựa chọn C',
      'Hiệu ứng C',
      'Kết quả C',
    ];

    const rows = filteredEvents.map((e, idx) => {
      const cA = e.choices[0];
      const cB = e.choices[1];
      const cC = e.choices[2];
      return [
        idx + 1,
        e.id,
        e.day ?? 1,
        `Tuần ${Math.ceil((e.day ?? 1) / 7)}`,
        e.phaseLabel,
        e.category,
        e.title,
        e.narrative.replace(/\r?\n/g, ' '),
        `${e.speaker.name} (${e.speaker.role})`,
        (e.dialogue || '').replace(/\r?\n/g, ' '),
        cA ? cA.text : '',
        cA ? formatEffects(cA.attributeEffects) : '',
        cA ? cA.outcomeText : '',
        cB ? cB.text : '',
        cB ? formatEffects(cB.attributeEffects) : '',
        cB ? cB.outcomeText : '',
        cC ? cC.text : '',
        cC ? formatEffects(cC.attributeEffects) : '',
        cC ? cC.outcomeText : '',
      ].join('\t');
    });

    const tsvContent = [headers.join('\t'), ...rows].join('\n');
    navigator.clipboard.writeText(tsvContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Start editing an event
  const startEditing = (event: StoryEvent) => {
    setEditingEventId(event.id);
    setEditForm(JSON.parse(JSON.stringify(event)));
  };

  // Save edited event
  const handleSaveEdit = () => {
    if (!editForm) return;
    setEventsData((prev) =>
      prev.map((e) => (e.id === editForm.id ? editForm : e))
    );
    if (onUpdateEvent) {
      onUpdateEvent(editForm);
    }
    setEditingEventId(null);
    setEditForm(null);
  };

  // Reset to original data
  const handleResetToDefault = () => {
    if (window.confirm('Khôi phục toàn bộ 84 tình huống về dữ liệu gốc?')) {
      setEventsData(ALL_EVENTS);
      setEditingEventId(null);
      setEditForm(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-700/80 rounded-2xl w-full max-w-[96vw] h-[92vh] flex flex-col text-stone-100 shadow-2xl overflow-hidden">
        {/* Top Excel Ribbon Bar */}
        <div className="bg-stone-850 border-b border-stone-800 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-600/60 flex items-center justify-center text-emerald-300 shadow-sm">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  BẢNG TỔNG HỢP 84 TÌNH HUỐNG (SHEET VIEW / EXCEL)
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  84 TÌNH HUỐNG
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Hiển thị dưới dạng bảng tính. Hỗ trợ xem, lọc, sửa đổi và xuất file Excel (.CSV) để chỉnh sửa trong Google Sheets hoặc Microsoft Excel.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyForGoogleSheets}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sao chép toàn bộ bảng để dán vào Google Sheets (Ctrl + V)"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'Đã sao chép!' : 'Copy vào Google Sheets'}</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
              title="Tải file CSV tiếng Việt chuẩn UTF-8 BOM mở bằng Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file Excel (.CSV)</span>
            </button>

            <button
              onClick={handleResetToDefault}
              className="p-1.5 rounded-lg text-stone-400 hover:text-amber-400 hover:bg-stone-800 transition-colors"
              title="Khôi phục dữ liệu gốc"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer ml-1"
              aria-label="Đóng bảng tính"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-stone-900 border-b border-stone-800 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative w-56 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
              <input
                type="text"
                placeholder="Tìm từ khóa, lời thoại, tiêu đề..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Filter by Week */}
            <div className="flex items-center gap-1">
              <span className="text-stone-400 text-[11px] font-medium flex items-center gap-1">
                <Filter className="w-3 h-3" /> Tuần:
              </span>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="bg-stone-800 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tất cả (4 Tuần)</option>
                <option value={1}>Tuần 1 (Ngày 1–7)</option>
                <option value={2}>Tuần 2 (Ngày 8–14)</option>
                <option value={3}>Tuần 3 (Ngày 15–21)</option>
                <option value={4}>Tuần 4 (Ngày 22–28)</option>
              </select>
            </div>

            {/* Filter by Day */}
            <div className="flex items-center gap-1">
              <span className="text-stone-400 text-[11px] font-medium">Ngày:</span>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="bg-stone-800 border border-stone-700 rounded-lg px-2 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 max-w-[110px]"
              >
                <option value="all">Tất cả 28 ngày</option>
                {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Ngày {d < 10 ? `0${d}` : d}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Phase */}
            <div className="flex items-center gap-1">
              <span className="text-stone-400 text-[11px] font-medium">Buổi:</span>
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="bg-stone-800 border border-stone-700 rounded-lg px-2 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tất cả các buổi</option>
                <option value="Sáng">Sáng</option>
                <option value="Trưa">Trưa</option>
                <option value="Tối">Tối</option>
              </select>
            </div>
          </div>

          <div className="text-stone-400 font-mono text-[11px]">
            Hiển thị: <span className="font-bold text-emerald-400">{filteredEvents.length}</span> / {eventsData.length} tình huống
          </div>
        </div>

        {/* Spreadsheet Data Grid */}
        <div className="flex-1 overflow-auto bg-stone-950 font-sans">
          <table className="w-full border-collapse text-left text-xs whitespace-normal">
            <thead className="sticky top-0 z-20 bg-stone-850 border-b border-stone-700 text-stone-300 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-2.5 border-r border-stone-700 w-12 text-center">STT</th>
                <th className="p-2.5 border-r border-stone-700 w-16 text-center">Mã ID</th>
                <th className="p-2.5 border-r border-stone-700 w-16 text-center">Ngày</th>
                <th className="p-2.5 border-r border-stone-700 w-16 text-center">Buổi</th>
                <th className="p-2.5 border-r border-stone-700 min-w-[130px]">Danh mục</th>
                <th className="p-2.5 border-r border-stone-700 min-w-[180px]">Tiêu đề tình huống</th>
                <th className="p-2.5 border-r border-stone-700 min-w-[280px]">Bối cảnh / Diễn biến</th>
                <th className="p-2.5 border-r border-stone-700 min-w-[110px]">Người nói</th>
                <th className="p-2.5 border-r border-stone-700 min-w-[200px]">Lời thoại</th>
                <th className="p-2.5 border-r border-stone-700 min-w-[280px]">Lựa chọn A & Hiệu ứng</th>
                <th className="p-2.5 border-r border-stone-700 min-w-[280px]">Lựa chọn B & Hiệu ứng</th>
                <th className="p-2.5 border-r border-stone-700 min-w-[240px]">Lựa chọn C (nếu có)</th>
                <th className="p-2.5 w-20 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-200">
              {filteredEvents.map((event, idx) => {
                const choiceA = event.choices[0];
                const choiceB = event.choices[1];
                const choiceC = event.choices[2];

                return (
                  <tr
                    key={event.id}
                    className="hover:bg-stone-900/80 transition-colors group"
                  >
                    {/* STT */}
                    <td className="p-2.5 border-r border-stone-800 text-center font-mono text-stone-400">
                      {idx + 1}
                    </td>

                    {/* ID */}
                    <td className="p-2.5 border-r border-stone-800 text-center font-mono text-emerald-400 font-bold">
                      {event.id}
                    </td>

                    {/* Ngày */}
                    <td className="p-2.5 border-r border-stone-800 text-center font-bold">
                      <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-mono">
                        D{event.day}
                      </span>
                    </td>

                    {/* Buổi */}
                    <td className="p-2.5 border-r border-stone-800 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-950/60 text-amber-300 border border-amber-900/60">
                        {event.phaseLabel}
                      </span>
                    </td>

                    {/* Danh mục */}
                    <td className="p-2.5 border-r border-stone-800 font-medium text-emerald-300">
                      {event.category}
                    </td>

                    {/* Tiêu đề */}
                    <td className="p-2.5 border-r border-stone-800 font-bold text-white">
                      {event.title}
                    </td>

                    {/* Mô tả */}
                    <td className="p-2.5 border-r border-stone-800 text-stone-300 leading-relaxed max-w-sm">
                      {event.narrative}
                    </td>

                    {/* Người nói */}
                    <td className="p-2.5 border-r border-stone-800">
                      <div className="font-semibold text-white">{event.speaker.name}</div>
                      <div className="text-[10px] text-stone-400">{event.speaker.role}</div>
                    </td>

                    {/* Lời thoại */}
                    <td className="p-2.5 border-r border-stone-800 italic text-emerald-200/90 leading-relaxed">
                      {event.dialogue ? `"${event.dialogue}"` : '—'}
                    </td>

                    {/* Choice A */}
                    <td className="p-2.5 border-r border-stone-800 text-xs">
                      {choiceA ? (
                        <div className="space-y-1">
                          <div className="font-semibold text-stone-100">
                            A. {choiceA.text}
                          </div>
                          <div className="text-[10px] font-mono text-amber-400">
                            {formatEffects(choiceA.attributeEffects)}
                          </div>
                          <div className="text-[11px] text-stone-400 italic line-clamp-2">
                            ➜ {choiceA.outcomeText}
                          </div>
                          {formatRewards(choiceA) !== 'Không có' && (
                            <div className="text-[10px] text-emerald-400 font-medium">
                              🎁 {formatRewards(choiceA)}
                            </div>
                          )}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Choice B */}
                    <td className="p-2.5 border-r border-stone-800 text-xs">
                      {choiceB ? (
                        <div className="space-y-1">
                          <div className="font-semibold text-stone-100">
                            B. {choiceB.text}
                          </div>
                          <div className="text-[10px] font-mono text-amber-400">
                            {formatEffects(choiceB.attributeEffects)}
                          </div>
                          <div className="text-[11px] text-stone-400 italic line-clamp-2">
                            ➜ {choiceB.outcomeText}
                          </div>
                          {formatRewards(choiceB) !== 'Không có' && (
                            <div className="text-[10px] text-emerald-400 font-medium">
                              🎁 {formatRewards(choiceB)}
                            </div>
                          )}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Choice C */}
                    <td className="p-2.5 border-r border-stone-800 text-xs">
                      {choiceC ? (
                        <div className="space-y-1">
                          <div className="font-semibold text-stone-100">
                            C. {choiceC.text}
                          </div>
                          <div className="text-[10px] font-mono text-amber-400">
                            {formatEffects(choiceC.attributeEffects)}
                          </div>
                          <div className="text-[11px] text-stone-400 italic line-clamp-2">
                            ➜ {choiceC.outcomeText}
                          </div>
                          {formatRewards(choiceC) !== 'Không có' && (
                            <div className="text-[10px] text-emerald-400 font-medium">
                              🎁 {formatRewards(choiceC)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-stone-500">—</span>
                      )}
                    </td>

                    {/* Edit Action */}
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => startEditing(event)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                        title="Chỉnh sửa chi tiết tình huống này"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Editor when editing an event */}
        {editingEventId && editForm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col text-stone-100 shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-850">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-white text-sm">
                    CHỈNH SỬA TÌNH HUỐNG: {editForm.id} (NGÀY {editForm.day} - {editForm.phaseLabel})
                  </h3>
                </div>
                <button
                  onClick={() => setEditingEventId(null)}
                  className="p-1 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Tiêu đề tình huống:</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Danh mục:</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Mô tả / Bối cảnh:</label>
                  <textarea
                    rows={3}
                    value={editForm.narrative}
                    onChange={(e) => setEditForm({ ...editForm, narrative: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-300 mb-1">Tên người nói:</label>
                    <input
                      type="text"
                      value={editForm.speaker.name}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          speaker: { ...editForm.speaker, name: e.target.value },
                        })
                      }
                      className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-300 mb-1">Vai trò:</label>
                    <input
                      type="text"
                      value={editForm.speaker.role}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          speaker: { ...editForm.speaker, role: e.target.value },
                        })
                      }
                      className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Lời thoại:</label>
                  <input
                    type="text"
                    value={editForm.dialogue || ''}
                    onChange={(e) => setEditForm({ ...editForm, dialogue: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2 text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Choices Edit */}
                <div className="space-y-3 pt-2 border-t border-stone-800">
                  <div className="font-bold text-amber-400">Các lựa chọn quyết định:</div>
                  {editForm.choices.map((choice, cIdx) => (
                    <div key={choice.id} className="bg-stone-800/80 border border-stone-700 rounded-xl p-3 space-y-2">
                      <div className="font-bold text-stone-200">
                        Lựa chọn {String.fromCharCode(65 + cIdx)}:
                      </div>
                      <input
                        type="text"
                        value={choice.text}
                        onChange={(e) => {
                          const newChoices = [...editForm.choices];
                          newChoices[cIdx] = { ...newChoices[cIdx], text: e.target.value };
                          setEditForm({ ...editForm, choices: newChoices });
                        }}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-stone-100"
                      />
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-0.5">Kết quả diễn biến:</label>
                        <textarea
                          rows={2}
                          value={choice.outcomeText}
                          onChange={(e) => {
                            const newChoices = [...editForm.choices];
                            newChoices[cIdx] = { ...newChoices[cIdx], outcomeText: e.target.value };
                            setEditForm({ ...editForm, choices: newChoices });
                          }}
                          className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-stone-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editor Footer */}
              <div className="p-3 border-t border-stone-800 bg-stone-850 flex justify-end gap-2">
                <button
                  onClick={() => setEditingEventId(null)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
