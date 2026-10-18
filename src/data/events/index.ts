import { StoryEvent } from '../../types/game';
import { WEEK_1_EVENTS } from './week1';
import { WEEK_2_EVENTS } from './week2';
import { WEEK_3_EVENTS } from './week3';
import { WEEK_4_EVENTS } from './week4';

export const ALL_EVENTS: StoryEvent[] = [
  ...WEEK_1_EVENTS,
  ...WEEK_2_EVENTS,
  ...WEEK_3_EVENTS,
  ...WEEK_4_EVENTS,
];

export const EVENTS_MAP = new Map<string, StoryEvent>(
  ALL_EVENTS.map((event) => [event.id, event])
);

export function getEventsForDay(day: number): StoryEvent[] {
  return ALL_EVENTS.filter((e) => e.day === day);
}

export function getEventByDayAndIndex(day: number, phaseIndex: number): StoryEvent | undefined {
  const dayEvents = getEventsForDay(day);
  return dayEvents[phaseIndex];
}

export function getWeekTheme(day: number): { weekNumber: number; title: string; subtitle: string } {
  if (day <= 7) {
    return {
      weekNumber: 1,
      title: 'Tuần 1: Làm quen và thích nghi',
      subtitle: 'Bước chân đầu tiên vào môi trường quân ngũ Hòa Lạc',
    };
  }
  if (day <= 14) {
    return {
      weekNumber: 2,
      title: 'Tuần 2: Vào guồng kỷ luật',
      subtitle: 'Rèn luyện nếp sống thép, làm quen với vũ khí và thao trường',
    };
  }
  if (day <= 21) {
    return {
      weekNumber: 3,
      title: 'Tuần 3: Thử thách và trưởng thành',
      subtitle: 'Vượt qua giới hạn bản thân, gắn kết tình đồng đội keo sơn',
    };
  }
  return {
    weekNumber: 4,
    title: 'Tuần 4: Về đích',
    subtitle: 'Chinh phục kỳ thi, tỏa sáng đêm lửa trại và chia tay Hòa Lạc',
  };
}
