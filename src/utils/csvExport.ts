import { ALL_EVENTS } from '../data/events';
import { StoryEvent } from '../types/game';

function escapeCsvCell(cell: string | number | undefined | null): string {
  if (cell === undefined || cell === null) return '""';
  const str = String(cell);
  // Double-quote escape
  return `"${str.replace(/"/g, '""')}"`;
}

export function formatEffects(effects: StoryEvent['choices'][0]['attributeEffects']): string {
  const parts: string[] = [];
  if (effects.health) parts.push(`HP: ${effects.health > 0 ? '+' : ''}${effects.health}`);
  if (effects.morale) parts.push(`Tinh thần: ${effects.morale > 0 ? '+' : ''}${effects.morale}`);
  if (effects.reputation) parts.push(`Uy tín: ${effects.reputation > 0 ? '+' : ''}${effects.reputation}`);
  if (effects.money) {
    const formatted = new Intl.NumberFormat('vi-VN').format(effects.money);
    parts.push(`Tiền: ${effects.money > 0 ? '+' : ''}${formatted}đ`);
  }
  return parts.length > 0 ? parts.join(' | ') : 'Không đổi';
}

export function formatRewards(choice: StoryEvent['choices'][0]): string {
  const parts: string[] = [];
  if (choice.inventoryRewardId) parts.push(`Vật phẩm: [${choice.inventoryRewardId}]`);
  if (choice.tipRewardId) parts.push(`Mẹo: [${choice.tipRewardId}]`);
  return parts.length > 0 ? parts.join(', ') : 'Không có';
}

export function generateEventsCsv(events: StoryEvent[] = ALL_EVENTS): string {
  const headers = [
    'STT',
    'Mã tình huống (ID)',
    'Ngày',
    'Tuần',
    'Buổi',
    'Danh mục',
    'Tiêu đề tình huống',
    'Bối cảnh / Diễn biến',
    'Người nói',
    'Vai trò',
    'Lời thoại nhân vật',
    'Bối cảnh nền',
    'Lựa chọn A',
    'Hiệu ứng chỉ số A',
    'Phần thưởng A',
    'Kết quả Lựa chọn A',
    'Lựa chọn B',
    'Hiệu ứng chỉ số B',
    'Phần thưởng B',
    'Kết quả Lựa chọn B',
    'Lựa chọn C (nếu có)',
    'Hiệu ứng chỉ số C',
    'Phần thưởng C',
    'Kết quả Lựa chọn C',
  ];

  const rows = events.map((event, index) => {
    const eventDay = event.day ?? 1;
    const weekNumber = Math.ceil(eventDay / 7);
    const choiceA = event.choices[0];
    const choiceB = event.choices[1];
    const choiceC = event.choices[2];

    return [
      escapeCsvCell(index + 1),
      escapeCsvCell(event.id),
      escapeCsvCell(eventDay),
      escapeCsvCell(`Tuần ${weekNumber}`),
      escapeCsvCell(event.phaseLabel),
      escapeCsvCell(event.category),
      escapeCsvCell(event.title),
      escapeCsvCell(event.narrative),
      escapeCsvCell(event.speaker.name),
      escapeCsvCell(event.speaker.role),
      escapeCsvCell(event.dialogue || ''),
      escapeCsvCell(event.backgroundType),

      // Choice A
      escapeCsvCell(choiceA ? choiceA.text : ''),
      escapeCsvCell(choiceA ? formatEffects(choiceA.attributeEffects) : ''),
      escapeCsvCell(choiceA ? formatRewards(choiceA) : ''),
      escapeCsvCell(choiceA ? choiceA.outcomeText : ''),

      // Choice B
      escapeCsvCell(choiceB ? choiceB.text : ''),
      escapeCsvCell(choiceB ? formatEffects(choiceB.attributeEffects) : ''),
      escapeCsvCell(choiceB ? formatRewards(choiceB) : ''),
      escapeCsvCell(choiceB ? choiceB.outcomeText : ''),

      // Choice C
      escapeCsvCell(choiceC ? choiceC.text : ''),
      escapeCsvCell(choiceC ? formatEffects(choiceC.attributeEffects) : ''),
      escapeCsvCell(choiceC ? formatRewards(choiceC) : ''),
      escapeCsvCell(choiceC ? choiceC.outcomeText : ''),
    ].join(',');
  });

  // UTF-8 BOM (\uFEFF) ensures Excel opens Vietnamese without encoding issues
  return '\uFEFF' + [headers.map(escapeCsvCell).join(','), ...rows].join('\r\n');
}

export function downloadCsvFile(content: string, filename = 'hola_survival_84_tinh_huong.csv'): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
