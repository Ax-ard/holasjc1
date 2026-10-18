import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  AttributeState,
  AttributeDeltas,
  GameStep,
  StoryChoice,
  InventoryItem,
  DailyLog,
  GameSaveState,
  StoryEvent,
  SuitcaseItem,
  RandomPopupEvent,
  PlayerProfile,
} from './types/game';
import { INITIAL_ITEMS, ISSUED_DAY1_ITEMS, ITEMS_MAP, SJC_EXCLUSIVE_ITEMS } from './data/items';
import { HANDBOOK_TIPS, TIPS_MAP } from './data/tips';
import { ALL_EVENTS } from './data/events';
import { generateDailyEvents, generateDaySituations, RANDOM_POPUP_EVENTS, SJC_POPUP_EVENTS } from './data/eventsData';
import { soundManager } from './utils/audio';
import { adaptEventForPlayer } from './utils/dialogueGenderAdapter';

import { TopNavigation } from './components/TopNavigation';
import { StatusPanel } from './components/StatusPanel';
import { StoryDialogue } from './components/StoryDialogue';
import { SuitcasePuzzle } from './components/SuitcasePuzzle';
import { RewardModal } from './components/RewardModal';
import { TipUnlockModal } from './components/TipUnlockModal';
import { DailySummaryModal } from './components/DailySummaryModal';
import { HandbookDrawer } from './components/HandbookDrawer';
import { InventoryDrawer } from './components/InventoryDrawer';
import { DailyLogModal } from './components/DailyLogModal';
import { EndingScreen } from './components/EndingScreen';
import { RandomEventModal } from './components/RandomEventModal';
import { CharacterSetupScreen } from './components/CharacterSetupScreen';
import { PostPuzzleGiftModal } from './components/PostPuzzleGiftModal';

const SAVE_KEY = 'hola_survival_save_v2';

const INITIAL_ATTRIBUTES: AttributeState = {
  health: 80,
  morale: 75,
  reputation: 50,
  money: 300000,
};

// Synchronously load saved state once before initial render
function getInitialSavedCampaign(): Partial<GameSaveState> | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed: GameSaveState = JSON.parse(saved);
      if (parsed.version === 2) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

const initialSaved = getInitialSavedCampaign();

export default function App() {
  // Character Setup & Profile
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(
    () => initialSaved?.playerProfile ?? null
  );

  // Campaign State (Day 0 = Suitcase Puzzle, Days 1-7 = Survival Story)
  const [currentDay, setCurrentDay] = useState<number>(
    () => initialSaved?.currentDay ?? 0
  );
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(
    () => initialSaved?.phaseSituationIndex ?? 0
  );
  const [daySituations, setDaySituations] = useState<StoryEvent[]>(() => {
    if (initialSaved && initialSaved.currentDay && initialSaved.currentDay >= 1 && initialSaved.currentDay <= 7) {
      return generateDailyEvents(initialSaved.currentDay, new Set(initialSaved.completedEventIds ?? []), {
        hasTriggeredMilitaryDuty: initialSaved.hasTriggeredMilitaryDuty ?? false,
        sjcSituationsTriggeredCount: initialSaved.sjcSituationsTriggeredCount ?? 0,
      });
    }
    return [];
  });
  const [step, setStep] = useState<GameStep>(() => {
    if (initialSaved?.playerProfile && initialSaved?.step) {
      return initialSaved.step;
    }
    return 'character_setup';
  });
  const [activeChoice, setActiveChoice] = useState<StoryChoice | undefined>(undefined);

  const [attributes, setAttributes] = useState<AttributeState>(
    () => initialSaved?.attributes ?? INITIAL_ATTRIBUTES
  );
  const [inventory, setInventory] = useState<InventoryItem[]>(
    () => initialSaved?.inventory ?? []
  );
  const [unlockedTipIds, setUnlockedTipIds] = useState<string[]>(
    () => initialSaved?.unlockedTipIds ?? ['tip_chuan_bi_tu_toi_hom_truoc']
  );
  const [bookmarkedTipIds, setBookmarkedTipIds] = useState<string[]>(
    () => initialSaved?.bookmarkedTipIds ?? []
  );
  const [completedEventIds, setCompletedEventIds] = useState<string[]>(
    () => initialSaved?.completedEventIds ?? []
  );
  const [choiceHistory, setChoiceHistory] = useState<{ eventId: string; choiceId: string; day: number }[]>(
    () => initialSaved?.choiceHistory ?? []
  );
  const [dailyLogs, setDailyLogs] = useState<Record<number, DailyLog>>(
    () => initialSaved?.dailyLogs ?? {}
  );

  // Temporary storage for Day 0 packed items before SJC Welcome Gift modal
  const [tempPackedItems, setTempPackedItems] = useState<SuitcaseItem[]>([]);

  // Mandatory Random Popup Event Tracking
  const [randomEventTriggeredCount, setRandomEventTriggeredCount] = useState<number>(
    () => initialSaved?.randomEventTriggeredCount ?? 0
  );
  const [seenRandomEventIds, setSeenRandomEventIds] = useState<string[]>(
    () => initialSaved?.seenRandomEventIds ?? []
  );
  const [activeRandomEvent, setActiveRandomEvent] = useState<RandomPopupEvent | null>(null);

  // Mandatory Trigger Enforcement State
  const [hasTriggeredMilitaryDuty, setHasTriggeredMilitaryDuty] = useState<boolean>(
    () => initialSaved?.hasTriggeredMilitaryDuty ?? false
  );
  const [hasTriggeredSJCRandomPopup, setHasTriggeredSJCRandomPopup] = useState<boolean>(
    () => initialSaved?.hasTriggeredSJCRandomPopup ?? false
  );

  // SJC Special Event Tracking
  const [hasTriggeredSJCEvent, setHasTriggeredSJCEvent] = useState<boolean>(
    () => initialSaved?.hasTriggeredSJCEvent ?? false
  );
  const [sjcSituationsTriggeredCount, setSjcSituationsTriggeredCount] = useState<number>(
    () => initialSaved?.sjcSituationsTriggeredCount ?? 0
  );

  // Daily temp tracking
  const [dayDeltas, setDayDeltas] = useState<AttributeDeltas>(
    () => initialSaved?.currentDayTempDeltas ?? {}
  );
  const [dayItems, setDayItems] = useState<string[]>(
    () => initialSaved?.currentDayTempItems ?? []
  );
  const [dayTips, setDayTips] = useState<string[]>(
    () => initialSaved?.currentDayTempTips ?? []
  );

  // Active Modals & Drawers
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isDailyLogOpen, setIsDailyLogOpen] = useState(false);
  const [isRestartConfirmOpen, setIsRestartConfirmOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(
    () => initialSaved?.isSoundEnabled ?? true
  );

  // Sync sound manager on mount & change
  useEffect(() => {
    soundManager.setEnabled(isSoundEnabled);
  }, [isSoundEnabled]);

  // Pending rewards from current step
  const [pendingRewardItem, setPendingRewardItem] = useState<InventoryItem | null>(null);
  const [pendingTipId, setPendingTipId] = useState<string | null>(null);

  // Keep refs in sync for stable generator callbacks
  const hasTriggeredMilitaryDutyRef = useRef(hasTriggeredMilitaryDuty);
  hasTriggeredMilitaryDutyRef.current = hasTriggeredMilitaryDuty;

  const sjcSituationsTriggeredCountRef = useRef(sjcSituationsTriggeredCount);
  sjcSituationsTriggeredCountRef.current = sjcSituationsTriggeredCount;

  // Initialize or generate situations for the day using anti-repeat, topic diversity, Day 5 duty & SJC guarantee
  const setupDayEvents = useCallback((day: number, seenIds: string[] = []) => {
    if (day >= 1 && day <= 7) {
      let dutyTriggered = false;
      let sjcTriggered = false;

      const events = generateDailyEvents(day, new Set(seenIds), {
        hasTriggeredMilitaryDuty: hasTriggeredMilitaryDutyRef.current,
        onMilitaryDutyTriggered: () => {
          dutyTriggered = true;
        },
        sjcSituationsTriggeredCount: sjcSituationsTriggeredCountRef.current,
        onSjcTriggered: () => {
          sjcTriggered = true;
        },
      });

      setDaySituations(events);

      if (dutyTriggered && !hasTriggeredMilitaryDutyRef.current) {
        hasTriggeredMilitaryDutyRef.current = true;
        setHasTriggeredMilitaryDuty(true);
      }
      if (sjcTriggered) {
        sjcSituationsTriggeredCountRef.current += 1;
        setHasTriggeredSJCEvent(true);
        setSjcSituationsTriggeredCount((prev) => prev + 1);
      }
      return events;
    }
    return [];
  }, []);

  // Current Story Event (for days 1-7)
  const baseCurrentEvent: StoryEvent =
    daySituations[currentPhaseIndex] ||
    daySituations[0] ||
    ALL_EVENTS[0];

  const currentEvent = useMemo(() => {
    return adaptEventForPlayer(baseCurrentEvent, playerProfile || undefined);
  }, [baseCurrentEvent, playerProfile]);

  // Save game state to localStorage
  const saveCampaign = useCallback(
    (overrideState?: Partial<GameSaveState>) => {
      try {
        const saveData: GameSaveState = {
          version: 2,
          playerProfile: playerProfile ?? undefined,
          currentDay,
          currentPhase: currentEvent?.phase || 'morning',
          phaseSituationIndex: currentPhaseIndex,
          totalPhaseSituations: daySituations.length,
          step,
          currentEventId: currentEvent?.id ?? '',
          activeChoiceId: activeChoice?.id,
          attributes,
          inventory,
          unlockedTipIds,
          bookmarkedTipIds,
          completedEventIds,
          choiceHistory,
          dailyLogs,
          currentDayTempDeltas: dayDeltas,
          currentDayTempItems: dayItems,
          currentDayTempTips: dayTips,
          randomEventTriggeredCount,
          seenRandomEventIds,
          hasTriggeredMilitaryDuty,
          hasTriggeredSJCRandomPopup,
          hasTriggeredSJCEvent,
          sjcSituationsTriggeredCount,
          isSoundEnabled,
          lastSavedAt: Date.now(),
          ...overrideState,
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      } catch {}
    },
    [
      playerProfile,
      currentDay,
      currentPhaseIndex,
      daySituations.length,
      currentEvent,
      step,
      activeChoice,
      attributes,
      inventory,
      unlockedTipIds,
      bookmarkedTipIds,
      completedEventIds,
      choiceHistory,
      dailyLogs,
      dayDeltas,
      dayItems,
      dayTips,
      randomEventTriggeredCount,
      seenRandomEventIds,
      hasTriggeredMilitaryDuty,
      hasTriggeredSJCRandomPopup,
      hasTriggeredSJCEvent,
      sjcSituationsTriggeredCount,
      isSoundEnabled,
    ]
  );

  // Auto-save whenever relevant game state changes (skip on initial mount)
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    if (!playerProfile) return;
    saveCampaign();
  }, [
    playerProfile,
    currentDay,
    currentPhaseIndex,
    step,
    attributes,
    inventory,
    unlockedTipIds,
    hasTriggeredMilitaryDuty,
    hasTriggeredSJCRandomPopup,
    hasTriggeredSJCEvent,
    sjcSituationsTriggeredCount,
  ]);

  // Random Popup Event Trigger Mechanism:
  // - Days 2-6: Natural 35% probability.
  // - Enforcement (Requirement 2): If entering Day 6 (or afternoon Day 6) and hasTriggeredSJCRandomPopup === false,
  //   the system MUST randomly draw 1 of the 3 SJC cards to display immediately.
  const checkAndTriggerRandomEvent = useCallback(
    (targetDay: number, triggerCount: number, seenIds: string[], forceSjcFallback = false) => {
      if (targetDay < 1 || targetDay > 7) return;

      const isSjcFallbackTrigger = forceSjcFallback || (targetDay === 6 && !hasTriggeredSJCRandomPopup);

      if (isSjcFallbackTrigger) {
        const availableSjc = SJC_POPUP_EVENTS.filter((e) => !seenIds.includes(e.id));
        const pool = availableSjc.length > 0 ? availableSjc : SJC_POPUP_EVENTS;
        const picked = pool[Math.floor(Math.random() * pool.length)];

        setAttributes((prev) => ({
          health: Math.min(100, Math.max(0, prev.health + (picked.attributeEffects.health ?? 0))),
          morale: Math.min(100, Math.max(0, prev.morale + (picked.attributeEffects.morale ?? 0))),
          reputation: Math.min(100, Math.max(0, prev.reputation + (picked.attributeEffects.reputation ?? 0))),
          money: Math.max(0, prev.money + (picked.attributeEffects.money ?? 0)),
        }));

        setDayDeltas((prev) => ({
          health: (prev.health ?? 0) + (picked.attributeEffects.health ?? 0),
          morale: (prev.morale ?? 0) + (picked.attributeEffects.morale ?? 0),
          reputation: (prev.reputation ?? 0) + (picked.attributeEffects.reputation ?? 0),
          money: (prev.money ?? 0) + (picked.attributeEffects.money ?? 0),
        }));

        soundManager.playReward();
        setActiveRandomEvent(picked);
        setRandomEventTriggeredCount((prev) => prev + 1);
        setSeenRandomEventIds((prev) => [...prev, picked.id]);
        setHasTriggeredSJCRandomPopup(true);
        return;
      }

      // Natural probability trigger: Days 2 to 6, 35% chance (up to 3 total popups)
      const shouldTrigger = targetDay >= 2 && targetDay <= 6 && triggerCount < 3 && Math.random() < 0.35;

      if (shouldTrigger) {
        const availableEvents = RANDOM_POPUP_EVENTS.filter((e) => !seenIds.includes(e.id));
        if (availableEvents.length > 0) {
          const picked = availableEvents[Math.floor(Math.random() * availableEvents.length)];

          setAttributes((prev) => ({
            health: Math.min(100, Math.max(0, prev.health + (picked.attributeEffects.health ?? 0))),
            morale: Math.min(100, Math.max(0, prev.morale + (picked.attributeEffects.morale ?? 0))),
            reputation: Math.min(100, Math.max(0, prev.reputation + (picked.attributeEffects.reputation ?? 0))),
            money: Math.max(0, prev.money + (picked.attributeEffects.money ?? 0)),
          }));

          setDayDeltas((prev) => ({
            health: (prev.health ?? 0) + (picked.attributeEffects.health ?? 0),
            morale: (prev.morale ?? 0) + (picked.attributeEffects.morale ?? 0),
            reputation: (prev.reputation ?? 0) + (picked.attributeEffects.reputation ?? 0),
            money: (prev.money ?? 0) + (picked.attributeEffects.money ?? 0),
          }));

          soundManager.playWarning();
          setActiveRandomEvent(picked);
          setRandomEventTriggeredCount((prev) => prev + 1);
          setSeenRandomEventIds((prev) => [...prev, picked.id]);

          if (picked.isSjc || picked.category === 'sjc_random_popup') {
            setHasTriggeredSJCRandomPopup(true);
          }
        }
      }
    },
    [hasTriggeredSJCRandomPopup]
  );

  // Sound toggle handler
  const handleToggleSound = () => {
    const nextSound = !isSoundEnabled;
    setIsSoundEnabled(nextSound);
    soundManager.setEnabled(nextSound);
    if (nextSound) {
      soundManager.playClick();
    }
  };

  // DAY 0: Finish Packing Suitcase -> Transition to SJC Welcome Gift modal
  const handleStartJourney = (packedItems: SuitcaseItem[]) => {
    setTempPackedItems(packedItems);
    soundManager.playReward();
    setStep('post_puzzle_gift');
  };

  // Claim SJC Welcome Package & Depart to Day 1
  const handleClaimSjcGiftsAndDepart = () => {
    const packedInventory: InventoryItem[] = tempPackedItems.map((pItem) => ({
      id: pItem.id,
      name: pItem.name,
      icon: pItem.icon,
      category: 'personal',
      categoryLabel: pItem.typeLabel,
      description: pItem.description || `Đã chuẩn bị trong vali cá nhân mang lên Hòa Lạc.`,
      source: 'Xếp trong vali Day 0',
      quantity: 1,
      usable: pItem.usable,
      useText: pItem.useText,
      useEffects: pItem.useEffects,
      isSJCItem: pItem.isSJCItem,
    }));

    // Merge with 4 SJC exclusive items
    const finalInventory: InventoryItem[] = [...packedInventory];
    for (const sjcItem of SJC_EXCLUSIVE_ITEMS) {
      if (!finalInventory.some((it) => it.id === sjcItem.id)) {
        finalInventory.push({ ...sjcItem, isSJCItem: true });
      }
    }

    setInventory(finalInventory);
    setCurrentDay(1);
    setCurrentPhaseIndex(0);
    setupDayEvents(1, completedEventIds);
    setStep('situation');
    setActiveChoice(undefined);
    soundManager.playFanfare();
  };

  // Player selects a choice (Deltas applied and revealed on outcome screen)
  const handleSelectChoice = (choice: StoryChoice) => {
    soundManager.playSelect();
    setActiveChoice(choice);

    // Apply attribute deltas
    const newHealth = Math.min(100, Math.max(0, attributes.health + (choice.attributeEffects.health ?? 0)));
    const newMorale = Math.min(100, Math.max(0, attributes.morale + (choice.attributeEffects.morale ?? 0)));
    const newReputation = Math.min(100, Math.max(0, attributes.reputation + (choice.attributeEffects.reputation ?? 0)));
    const newMoney = Math.max(0, attributes.money + (choice.attributeEffects.money ?? 0));

    const nextAttributes: AttributeState = {
      health: newHealth,
      morale: newMorale,
      reputation: newReputation,
      money: newMoney,
    };
    setAttributes(nextAttributes);

    // Update day temp deltas
    setDayDeltas((prev) => ({
      health: (prev.health ?? 0) + (choice.attributeEffects.health ?? 0),
      morale: (prev.morale ?? 0) + (choice.attributeEffects.morale ?? 0),
      reputation: (prev.reputation ?? 0) + (choice.attributeEffects.reputation ?? 0),
      money: (prev.money ?? 0) + (choice.attributeEffects.money ?? 0),
    }));

    // Record choice history & mark situation as completed/seen
    setChoiceHistory((prev) => [
      ...prev,
      { eventId: currentEvent.id, choiceId: choice.id, day: currentDay },
    ]);
    setCompletedEventIds((prev) =>
      prev.includes(currentEvent.id) ? prev : [...prev, currentEvent.id]
    );

    // Day 1 Morning event: Automatically append the 5 standard issued items
    if (currentEvent.id === 'd1_fixed_morning') {
      setInventory((prev) => {
        const hasIssued = prev.some((it) => it.id === 'quan_phuc_da_chien');
        if (hasIssued) return prev;
        return [...prev, ...ISSUED_DAY1_ITEMS];
      });
      setDayItems((prev) => [
        ...prev,
        '2 Bộ quân phục dã chiến',
        '1 Ghế nhựa/ghế gấp',
        '1 Mũ cối (đã dán sẵn tên cá nhân)',
        '1 Bộ bát đũa cá nhân',
        'Giáo trình/sách học tập',
      ]);
    }

    // Check rewards
    if (choice.inventoryRewardId && ITEMS_MAP.has(choice.inventoryRewardId)) {
      const rewardItem = ITEMS_MAP.get(choice.inventoryRewardId)!;
      setPendingRewardItem(rewardItem);
    } else {
      setPendingRewardItem(null);
    }

    if (choice.tipRewardId && TIPS_MAP.has(choice.tipRewardId)) {
      setPendingTipId(choice.tipRewardId);
    } else {
      setPendingTipId(null);
    }

    if (
      choice.isSjcChoice ||
      choice.inventoryRewardId?.startsWith('sjc_') ||
      currentEvent.isSjc ||
      currentEvent.id.includes('sjc') ||
      currentEvent.category === 'sjc_item_event'
    ) {
      setHasTriggeredSJCEvent(true);
      setSjcSituationsTriggeredCount((prev) => prev + 1);
    }

    // Track military duty triggers
    if (
      currentEvent.category === 'military_duty' ||
      currentEvent.topic === 'duty_team' ||
      currentEvent.topic === 'night_guard' ||
      currentEvent.topic === 'area_cleaning' ||
      currentEvent.topic === 'mess_hall_duty'
    ) {
      setHasTriggeredMilitaryDuty(true);
    }

    // Switch to choice outcome narrative view where deltas are revealed
    setStep('choice_outcome');
  };

  // Transition from outcome narrative
  const handleContinueFromOutcome = () => {
    soundManager.playClick();

    if (pendingRewardItem) {
      soundManager.playReward();
      setInventory((prev) => {
        const existing = prev.find((i) => i.id === pendingRewardItem.id);
        if (existing) {
          return prev.map((i) =>
            i.id === pendingRewardItem.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...pendingRewardItem, quantity: 1 }];
      });
      setDayItems((prev) => [...prev, pendingRewardItem.name]);
      setStep('reward_display');
      return;
    }

    if (pendingTipId) {
      soundManager.playTipUnlock();
      setUnlockedTipIds((prev) => (prev.includes(pendingTipId) ? prev : [...prev, pendingTipId]));
      const tip = TIPS_MAP.get(pendingTipId);
      if (tip) {
        setDayTips((prev) => [...prev, tip.title]);
      }
      setStep('tip_display');
      return;
    }

    advanceToNextEvent();
  };

  // Continue from Reward Modal
  const handleContinueFromReward = () => {
    soundManager.playClick();
    setPendingRewardItem(null);

    if (pendingTipId) {
      soundManager.playTipUnlock();
      setUnlockedTipIds((prev) => (prev.includes(pendingTipId) ? prev : [...prev, pendingTipId]));
      const tip = TIPS_MAP.get(pendingTipId);
      if (tip) {
        setDayTips((prev) => [...prev, tip.title]);
      }
      setStep('tip_display');
    } else {
      advanceToNextEvent();
    }
  };

  // Continue from Tip Unlock Modal
  const handleContinueFromTip = () => {
    soundManager.playClick();
    setPendingTipId(null);
    advanceToNextEvent();
  };

  // Advance event logic
  const advanceToNextEvent = () => {
    const totalToday = daySituations.length;
    if (currentPhaseIndex < totalToday - 1) {
      // Next situation in the same day (Sequential Sáng -> Chiều -> Tối)
      const nextIndex = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextIndex);
      setActiveChoice(undefined);
      setStep('situation');

      // Requirement 2 Fallback: If entering afternoon on Day 6 and SJC random popup hasn't fired yet
      const nextSituation = daySituations[nextIndex];
      if (currentDay === 6 && !hasTriggeredSJCRandomPopup && nextSituation?.phase === 'afternoon') {
        checkAndTriggerRandomEvent(6, randomEventTriggeredCount, seenRandomEventIds, true);
      }
    } else {
      // All situations of today completed!
      if (currentDay >= 7) {
        // Finale reached after Day 7!
        soundManager.playVictoryFanfare();
        setStep('ending');
      } else {
        // Show daily summary
        soundManager.playDayTransition();
        setStep('day_summary');
      }
    }
  };

  // Advance to next day from DailySummaryModal
  const handleNextDay = () => {
    soundManager.playDayTransition();

    const completedLog: DailyLog = {
      day: currentDay,
      dayTitle: currentEvent.title,
      attributeDeltas: dayDeltas,
      itemsGained: dayItems,
      tipsUnlocked: dayTips,
      summaryNote: `Hoàn thành xuất sắc các tình huống Ngày ${currentDay} tại Hòa Lạc.`,
    };

    setDailyLogs((prev) => ({
      ...prev,
      [currentDay]: completedLog,
    }));

    // Reset daily counters and advance to next day
    setDayDeltas({});
    setDayItems([]);
    setDayTips([]);
    const nextDay = currentDay + 1;
    setCurrentDay(nextDay);
    setCurrentPhaseIndex(0);
    setupDayEvents(nextDay, completedEventIds);
    setActiveChoice(undefined);
    setStep('situation');

    // Check mandatory random popup event trigger on entering new day
    checkAndTriggerRandomEvent(nextDay, randomEventTriggeredCount, seenRandomEventIds);
  };

  // Use inventory item
  const handleUseItem = (item: InventoryItem) => {
    if (!item.usable) return;
    soundManager.playReward();

    if (item.useEffects) {
      setAttributes((prev) => ({
        health: Math.min(100, Math.max(0, prev.health + (item.useEffects?.health ?? 0))),
        morale: Math.min(100, Math.max(0, prev.morale + (item.useEffects?.morale ?? 0))),
        reputation: Math.min(100, Math.max(0, prev.reputation + (item.useEffects?.reputation ?? 0))),
        money: Math.max(0, prev.money + (item.useEffects?.money ?? 0)),
      }));
    }

    setInventory((prev) =>
      prev
        .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  // Toggle bookmark in handbook
  const handleToggleBookmark = (tipId: string) => {
    soundManager.playClick();
    setBookmarkedTipIds((prev) =>
      prev.includes(tipId) ? prev.filter((id) => id !== tipId) : [...prev, tipId]
    );
  };

  // Character setup completion
  const handleCompleteCharacterSetup = (profile: PlayerProfile) => {
    setPlayerProfile(profile);
    setCurrentDay(0);
    setStep('day_0_puzzle');
    soundManager.playFanfare();
  };

  // Restart campaign completely -> Resets back to Character Setup
  const handleRestartCampaign = () => {
    soundManager.playClick();
    localStorage.removeItem(SAVE_KEY);
    setPlayerProfile(null);
    setCurrentDay(0);
    setCurrentPhaseIndex(0);
    setDaySituations([]);
    setStep('character_setup');
    setActiveChoice(undefined);
    setAttributes(INITIAL_ATTRIBUTES);
    setInventory([]);
    setUnlockedTipIds(['tip_chuan_bi_tu_toi_hom_truoc']);
    setBookmarkedTipIds([]);
    setCompletedEventIds([]);
    setChoiceHistory([]);
    setDailyLogs({});
    setDayDeltas({});
    setDayItems([]);
    setDayTips([]);
    setRandomEventTriggeredCount(0);
    setSeenRandomEventIds([]);
    setHasTriggeredMilitaryDuty(false);
    setHasTriggeredSJCRandomPopup(false);
    setHasTriggeredSJCEvent(false);
    setSjcSituationsTriggeredCount(0);
    setActiveRandomEvent(null);
    setIsRestartConfirmOpen(false);
  };

  // If character is not created yet or in character_setup step
  if (step === 'character_setup' || !playerProfile) {
    return <CharacterSetupScreen onComplete={handleCompleteCharacterSetup} />;
  }

  // If final ending is reached
  if (step === 'ending') {
    return (
      <EndingScreen
        attributes={attributes}
        unlockedTipsCount={unlockedTipIds.length}
        totalTipsCount={HANDBOOK_TIPS.length}
        inventoryCount={inventory.length}
        onRestart={handleRestartCampaign}
      />
    );
  }

  const tipObj = pendingTipId ? TIPS_MAP.get(pendingTipId) : undefined;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Header Navigation */}
      <TopNavigation
        currentDay={currentDay}
        phase={currentEvent?.phase || 'morning'}
        phaseLabel={currentDay === 0 ? 'Tại nhà' : currentEvent?.phaseLabel || 'Sáng'}
        playerProfile={playerProfile}
        unlockedTipsCount={unlockedTipIds.length}
        totalTipsCount={HANDBOOK_TIPS.length}
        inventoryCount={inventory.length}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
        onOpenHandbook={() => setIsHandbookOpen(true)}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenDailyLog={() => setIsDailyLogOpen(true)}
        onConfirmRestart={() => setIsRestartConfirmOpen(true)}
      />

      {/* Main Content Area */}
      {currentDay === 0 ? (
        /* DAY 0: 2D TOP-DOWN SUITCASE PACKING PUZZLE & SJC WELCOME PACKAGE MODAL */
        <main className="flex-1 w-full p-2 sm:p-4">
          <SuitcasePuzzle onStartJourney={handleStartJourney} />
          {step === 'post_puzzle_gift' && (
            <PostPuzzleGiftModal
              giftItems={SJC_EXCLUSIVE_ITEMS}
              onReceiveAndDepart={handleClaimSjcGiftsAndDepart}
            />
          )}
        </main>
      ) : (
        /* DAYS 1 TO 7: MAIN SURVIVAL EXPERIENCE */
        <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 md:p-6 space-y-4">
          {/* Day & Phase Banner */}
          <div className="bg-gradient-to-r from-emerald-950/70 via-stone-900 to-emerald-950/70 border border-emerald-800/40 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs">
            <div>
              <span className="font-extrabold text-emerald-400 uppercase tracking-wide">
                NGÀY {currentDay}/07: {currentEvent?.phaseLabel?.toUpperCase() || 'SÁNG'} HÒA LẠC
              </span>
              <span className="text-stone-400 hidden sm:inline ml-2">
                — {currentEvent?.title || 'Hoạt động quân sự'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-stone-300 font-mono text-[11px] font-bold bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-700 shrink-0">
                Tình huống {currentPhaseIndex + 1}/{daySituations.length || 1}
              </span>
            </div>
          </div>

          {/* Status Panel (Health, Morale, Reputation, Money) */}
          <StatusPanel attributes={attributes} />

          {/* Story & Decision Scene */}
          <StoryDialogue
            event={currentEvent}
            currentStep={step}
            activeChoice={activeChoice}
            attributes={attributes}
            hasRewardPending={!!pendingRewardItem}
            hasTipPending={!!pendingTipId}
            onSelectChoice={handleSelectChoice}
            onContinueFromOutcome={handleContinueFromOutcome}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-800/80 py-3 text-center text-[11px] text-stone-500">
        HOLA SURVIVAL · Game mô phỏng 7 ngày rèn luyện quân sự sinh viên Hòa Lạc · Tự động lưu tiến độ
      </footer>

      {/* MANDATORY RANDOM EVENT POPUP MODAL */}
      {activeRandomEvent && (
        <RandomEventModal
          event={activeRandomEvent}
          onDismiss={() => setActiveRandomEvent(null)}
        />
      )}

      {/* MODAL 1: Reward Modal */}
      {step === 'reward_display' && pendingRewardItem && (
        <RewardModal
          item={pendingRewardItem}
          onContinue={handleContinueFromReward}
          onOpenInventory={() => setIsInventoryOpen(true)}
        />
      )}

      {/* MODAL 2: Tip Unlock Modal */}
      {step === 'tip_display' && tipObj && (
        <TipUnlockModal
          tip={tipObj}
          onContinue={handleContinueFromTip}
          onOpenHandbook={() => setIsHandbookOpen(true)}
        />
      )}

      {/* MODAL 3: Daily Summary Modal (End of Day) */}
      {step === 'day_summary' && (
        <DailySummaryModal
          day={currentDay}
          weekTitle={`Ngày ${currentDay} / 7`}
          deltas={dayDeltas}
          newItems={dayItems}
          newTips={dayTips}
          onNextDay={handleNextDay}
        />
      )}

      {/* DRAWER 1: Survival Handbook */}
      <HandbookDrawer
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
        unlockedTipIds={unlockedTipIds}
        bookmarkedTipIds={bookmarkedTipIds}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* DRAWER 2: Inventory */}
      <InventoryDrawer
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        items={inventory}
        onUseItem={handleUseItem}
      />

      {/* MODAL 4: Past Daily Logs */}
      <DailyLogModal
        isOpen={isDailyLogOpen}
        onClose={() => setIsDailyLogOpen(false)}
        logs={dailyLogs}
        currentDay={currentDay}
      />

      {/* MODAL 5: Restart Confirmation Dialog */}
      {isRestartConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-sm w-full p-6 text-stone-100 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Chơi lại chiến dịch từ đầu?</h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-5">
              Bạn có chắc chắn muốn bắt đầu lại từ Day 0 (Xếp vali sinh tồn)? Tiến độ hiện tại sẽ được đặt lại.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setIsRestartConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-300 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleRestartCampaign}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Xác nhận chơi lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
