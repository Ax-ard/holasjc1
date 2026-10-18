import { StoryEvent, PlayerProfile, StoryChoice } from '../types/game';

/**
 * Maps pronouns, dialogues, roommate NPCs, and summer context according to the player's profile:
 * - Room is strictly single-gender (14 people / 7 bunk beds):
 *   + Nữ: pronouns "bạn - mình / chị - em", roommate NPCs strictly Female (Linh, Mai, Trang, Thảo, Ngọc)
 *   + Nam: pronouns "ông - tôi / anh - em", roommate NPCs strictly Male (Minh, Huy, Hoàng, Tuấn, Đức)
 * - Night guard duty:
 *   + Nữ: Gác đêm trong nhà (hành lang, cầu thang mỗi tầng tòa D2)
 *   + Nam: Gác cổng doanh trại
 * - Public spaces (sân chào cờ, bãi tập thao trường, nhà ăn mâm 6 người, giảng đường):
 *   + Mixed interactions with fellow students and authority figures remain natural.
 * - Summer Military Season context:
 *   + Warm/hot days, evening summer breezes, fans, hydration, water heater safety.
 */

export const FEMALE_ROOMMATES_POOL = [
  'Linh',
  'Mai',
  'Trang',
  'Thảo',
  'Ngọc',
  'Lan',
  'Hương',
  'Phương',
  'Hà',
  'Vy',
  'Trâm',
  'Hân',
  'Quỳnh',
];

export const MALE_ROOMMATES_POOL = [
  'Minh',
  'Huy',
  'Hoàng',
  'Tuấn',
  'Đức',
  'Nam',
  'Long',
  'Dũng',
  'Phong',
  'Kiên',
  'Quân',
  'Đạt',
  'Tùng',
];

export function initRoommates(gender: 'nam' | 'nu'): string[] {
  const pool = gender === 'nu' ? [...FEMALE_ROOMMATES_POOL] : [...MALE_ROOMMATES_POOL];
  // 13 roommates for a 14-person room (7 bunk beds)
  const roster: string[] = [];
  while (roster.length < 13 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    roster.push(pool.splice(idx, 1)[0]);
  }
  return roster;
}

function transformText(text: string, isFemale: boolean, isDormOrRoommateContext: boolean): string {
  if (!text) return text;
  let result = text;

  // 1. Summer Military Season Adaptations (applies to all)
  result = result
    .replace(/đêm lạnh Hòa Lạc/gi, 'đêm hè Hòa Lạc')
    .replace(/trong đêm lạnh/gi, 'trong đêm hè')
    .replace(/sương lạnh cóng buốt/gi, 'gió đồi hè mát mẻ')
    .replace(/sương lạnh/gi, 'gió đồi mùa hè')
    .replace(/se lạnh/gi, 'mát mẻ')
    .replace(/giá lạnh/gi, 'oi bức')
    .replace(/rét căm căm/gi, 'nắng gắt oi bức');

  if (isFemale) {
    // 2. Female Player Adjustments
    // Night guard duty
    result = result
      .replace(/gác cổng doanh trại/gi, 'gác đêm trong nhà tại cầu thang D2')
      .replace(/bốt gác ngoài cổng/gi, 'vị trí trực gác cầu thang và hành lang trong nhà')
      .replace(/bốt gác cổng doanh trại/gi, 'vị trí trực gác cầu thang trong nhà')
      .replace(/gác cổng/gi, 'gác cầu thang trong nhà');

    // Roommate name normalization (strictly female in room/arrival contexts)
    result = result
      .replace(/\bcùng Minh\b/g, 'cùng Linh')
      .replace(/\bvới Minh\b/g, 'với Linh')
      .replace(/\bbạn Minh\b/g, 'bạn Linh')
      .replace(/\bông Minh\b/g, 'bạn Linh')
      .replace(/\bthằng Minh\b/g, 'bạn Linh');

    if (isDormOrRoommateContext) {
      result = result
        .replace(/\bMinh\b/g, 'Linh')
        .replace(/\bHuy\b/g, 'Mai')
        .replace(/\bHoàng\b/g, 'Trang')
        .replace(/\bTuấn\b/g, 'Thảo')
        .replace(/\bĐức\b/g, 'Ngọc');
    }

    // Pronouns
    result = result
      .replace(/\bông ơi\b/gi, 'cậu ơi')
      .replace(/\bông - tôi\b/gi, 'bạn - mình')
      .replace(/\bông\b/gi, 'bạn')
      .replace(/\banh em\b/gi, 'chị em')
      .replace(/\bchàng trai\b/gi, 'cô gái')
      .replace(/\bchú em\b/gi, 'em gái')
      .replace(/\bcác bác\b/gi, 'các bạn');
  } else {
    // 3. Male Player Adjustments
    // Night guard duty
    result = result
      .replace(/gác đêm trong nhà tại cầu thang tầng 2\/3 D2/gi, 'gác cổng doanh trại')
      .replace(/gác đêm trong nhà tại cầu thang/gi, 'gác cổng doanh trại')
      .replace(/gác đêm trong nhà/gi, 'gác cổng doanh trại')
      .replace(/vị trí trực gác hành lang và cầu thang trong nhà/gi, 'bốt gác ngoài cổng')
      .replace(/gác cầu thang trong nhà/gi, 'gác cổng doanh trại');

    // Roommate name normalization (strictly male in room/arrival contexts)
    result = result
      .replace(/\bcùng Linh\b/g, 'cùng Minh')
      .replace(/\bvới Linh\b/g, 'với Minh')
      .replace(/\bbạn Linh\b/g, 'bạn Minh')
      .replace(/\bcô Linh\b/g, 'bạn Minh');

    if (isDormOrRoommateContext) {
      result = result
        .replace(/\bLinh\b/g, 'Minh')
        .replace(/\bMai\b/g, 'Huy')
        .replace(/\bTrang\b/g, 'Hoàng')
        .replace(/\bThảo\b/g, 'Tuấn')
        .replace(/\bNgọc\b/g, 'Đức');
    }

    // Pronouns
    result = result
      .replace(/\bchị em\b/gi, 'anh em')
      .replace(/\bcô gái\b/gi, 'chàng trai')
      .replace(/\bem gái\b/gi, 'chú em');
  }

  return result;
}

export function adaptEventForPlayer(event: StoryEvent, profile?: PlayerProfile): StoryEvent {
  if (!profile) return event;

  const isFemale = profile.gender === 'nu';

  // Identify dorm/roommate internal context
  const isDormContext =
    event.backgroundType === 'dorm' ||
    event.backgroundType === 'wash' ||
    event.category.toLowerCase().includes('phòng') ||
    event.category.toLowerCase().includes('nội vụ') ||
    event.category.toLowerCase().includes('nề nếp') ||
    (event.topic && (
      event.topic.includes('dorm') ||
      event.topic.includes('bed') ||
      event.topic.includes('roommate') ||
      event.topic.includes('hygiene') ||
      event.topic.includes('toilet') ||
      event.topic.includes('water_heater')
    )) ||
    (event.speaker && (
      event.speaker.role.toLowerCase().includes('cùng phòng') ||
      event.speaker.role.toLowerCase().includes('phòng 14') ||
      event.speaker.avatarId === 'roommate'
    ));

  let adaptedSpeaker = { ...event.speaker };

  // Roommate Speaker Adaptation
  const isRoommateSpeaker =
    adaptedSpeaker.role.toLowerCase().includes('cùng phòng') ||
    adaptedSpeaker.role.toLowerCase().includes('phòng 14') ||
    adaptedSpeaker.avatarId === 'roommate' ||
    (isDormContext && (adaptedSpeaker.avatarId === 'minh' || adaptedSpeaker.avatarId === 'huy' || adaptedSpeaker.avatarId === 'linh'));

  if (isRoommateSpeaker) {
    if (isFemale) {
      adaptedSpeaker = {
        name: adaptedSpeaker.name === 'Minh' || adaptedSpeaker.name === 'Huy' || adaptedSpeaker.name === 'Bạn cùng phòng' ? 'Linh' : adaptedSpeaker.name,
        role: 'Bạn cùng phòng',
        avatarId: 'linh',
        mood: adaptedSpeaker.mood,
      };
    } else {
      adaptedSpeaker = {
        name: adaptedSpeaker.name === 'Linh' || adaptedSpeaker.name === 'Mai' || adaptedSpeaker.name === 'Bạn cùng phòng' ? 'Minh' : adaptedSpeaker.name,
        role: 'Bạn cùng phòng',
        avatarId: 'minh',
        mood: adaptedSpeaker.mood,
      };
    }
  } else {
    // Strip any lingering gender tags from roles for a clean UI
    adaptedSpeaker.role = adaptedSpeaker.role
      .replace(/\s*\((Nữ|Nam|Bạn cùng phòng - Nữ|Bạn cùng phòng - Nam)\)/gi, '')
      .trim();
  }

  const adaptedTitle = transformText(event.title, isFemale, isDormContext);
  const adaptedNarrative = transformText(event.narrative, isFemale, isDormContext);
  const adaptedDialogue = event.dialogue ? transformText(event.dialogue, isFemale, isDormContext) : undefined;

  const adaptedChoices: StoryChoice[] = event.choices.map((choice) => {
    return {
      ...choice,
      text: transformText(choice.text, isFemale, isDormContext),
      outcomeText: transformText(choice.outcomeText, isFemale, isDormContext),
    };
  });

  return {
    ...event,
    title: adaptedTitle,
    narrative: adaptedNarrative,
    dialogue: adaptedDialogue,
    speaker: adaptedSpeaker,
    choices: adaptedChoices,
  };
}
