export type DayPhase = 'morning' | 'noon' | 'afternoon' | 'evening';

export interface AttributeState {
  health: number;      // 0 - 100
  morale: number;      // 0 - 100
  reputation: number;  // 0 - 100
  money: number;       // VND (>= 0)
}

export interface AttributeDeltas {
  health?: number;
  morale?: number;
  reputation?: number;
  money?: number;
}

export type ItemCategory =
  | 'personal'
  | 'hygiene'
  | 'food'
  | 'study'
  | 'medicine'
  | 'memory'
  | 'military'
  | 'special';

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  category: ItemCategory;
  categoryLabel: string;
  description: string;
  source: string;
  quantity: number;
  usable?: boolean;
  useText?: string;
  useEffects?: AttributeDeltas;
  isSjc?: boolean;
  isSJCItem?: boolean;
  sjcBadge?: string;
}

export type HandbookCategory =
  | 'discipline'
  | 'health'
  | 'hygiene_food'
  | 'money'
  | 'items'
  | 'social'
  | 'mindset'
  | 'study';

export interface HandbookTip {
  id: string;
  title: string;
  category: HandbookCategory;
  categoryLabel: string;
  categoryIcon: string;
  explanation: string;
  recommendedAction: string;
  sourceSituation: string;
  dayUnlocked?: number;
}

export interface StoryChoiceRequirement {
  minHealth?: number;
  minMorale?: number;
  minReputation?: number;
  minMoney?: number;
  requiredItemId?: string;
}

export interface StoryChoice {
  id: string;
  text: string;
  attributeEffects: AttributeDeltas;
  inventoryRewardId?: string;
  tipRewardId?: string;
  outcomeText: string;
  requirements?: StoryChoiceRequirement;
  unmetRequirementText?: string;
  isSjcChoice?: boolean;
  sjcItemIcon?: string;
  sjcItemName?: string;
}

export interface StorySpeaker {
  name: string;
  role: string;
  avatarId: 'minh' | 'an' | 'huy' | 'linh' | 'commander' | 'medic' | 'roommate' | 'narrator';
  mood?: 'normal' | 'smile' | 'worried' | 'stern' | 'laugh';
}

export type BackgroundType =
  | 'dorm'
  | 'parade'
  | 'canteen'
  | 'lecture'
  | 'outdoor'
  | 'wash'
  | 'courtyard'
  | 'study'
  | 'clinic'
  | 'evening_campus';

export interface StoryEvent {
  id: string;
  day?: number; // 1-7 or optional for pool events
  phase: DayPhase; // morning, afternoon, evening
  phaseLabel: string; // Sáng, Chiều, Tối
  category: string;
  topic?: string;
  title: string;
  narrative: string;
  speaker: StorySpeaker;
  dialogue?: string;
  backgroundType: BackgroundType;
  choices: StoryChoice[];
  isMilestone?: boolean;
  isFixedSchedule?: boolean;
  fixedDay?: number;
  fixedPhase?: DayPhase;
  fixedTimeText?: string;
  isSjc?: boolean;
  sjcBadge?: string;
}

export interface RandomPopupEvent {
  id: string;
  title: string;
  description: string;
  attributeEffects: AttributeDeltas;
  icon: string;
  category?: 'sjc_random_popup' | string;
  isSjc?: boolean;
  sjcBadge?: string;
}

export type SuitcaseItemType = 'required' | 'optional' | 'bulky';

export interface SuitcaseItem {
  id: string;
  name: string;
  icon: string;
  type: SuitcaseItemType;
  typeLabel: string;
  w: number; // width in grid cells (1-3)
  h: number; // height in grid cells (1-3)
  description?: string;
  usable?: boolean;
  useText?: string;
  useEffects?: AttributeDeltas;
  isSjc?: boolean;
  isSJCItem?: boolean;
  sjcBadge?: string;
}

export interface PlacedSuitcaseItem {
  item: SuitcaseItem;
  x: number; // grid col (0-indexed)
  y: number; // grid row (0-indexed)
  rotated: boolean;
}

export interface DailyLog {
  day: number;
  dayTitle: string;
  attributeDeltas: AttributeDeltas;
  itemsGained: string[];
  tipsUnlocked: string[];
  summaryNote: string;
}

export type Gender = 'nam' | 'nu';

export interface PlayerProfile {
  name: string;
  gender: Gender;
}

export type GameStep =
  | 'character_setup'
  | 'day_0_puzzle'
  | 'post_puzzle_gift'
  | 'situation'
  | 'choice_outcome'
  | 'reward_display'
  | 'tip_display'
  | 'random_popup'
  | 'day_summary'
  | 'ending';

export type EndingType = 'A' | 'B' | 'C' | 'D' | 'E';

export interface EndingData {
  type: EndingType;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  quote: string;
}

export interface GameSaveState {
  version: number;
  playerProfile?: PlayerProfile;
  currentDay: number; // 0 for puzzle, 1-7 for main game
  currentPhase: DayPhase;
  phaseSituationIndex: number;
  totalPhaseSituations: number;
  step: GameStep;
  currentEventId: string;
  activeChoiceId?: string;
  attributes: AttributeState;
  inventory: InventoryItem[];
  unlockedTipIds: string[];
  bookmarkedTipIds: string[];
  completedEventIds: string[];
  choiceHistory: { eventId: string; choiceId: string; day: number }[];
  dailyLogs: Record<number, DailyLog>;
  currentDayTempDeltas: AttributeDeltas;
  currentDayTempItems: string[];
  currentDayTempTips: string[];
  randomEventTriggeredCount?: number;
  seenRandomEventIds?: string[];
  hasTriggeredMilitaryDuty?: boolean;
  hasTriggeredSJCRandomPopup?: boolean;
  sjcPopupTriggered?: boolean;
  sjcSituationsTriggeredCount?: number;
  remainingSjcPoolIds?: string[];
  hasTriggeredSJCEvent?: boolean;
  usedSituationIds?: string[];
  isSoundEnabled: boolean;
  lastSavedAt: number;
}
