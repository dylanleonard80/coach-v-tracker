'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  todayStr, addDays, formatDateLong,
  getWeekNumber, getPhase, getDayType, isTrainingDay,
  PHASES, START_DATE,
} from '@/lib/program';
import { AppState, ActiveTab, DayData, WeeklyCheckin as WCI } from '@/lib/types';
import { loadRemoteState, upsertDayLog, upsertCheckin } from '@/lib/supabase';
import DailyView from './DailyView';
import WeeklyCheckin from './WeeklyCheckin';
import Dashboard from './Dashboard';

const STORAGE_KEY = 'coachv_state';
const SYNC_DEBOUNCE_MS = 1500;

function emptyDay(dateStr: string): DayData {
  return {
    type: getDayType(dateStr),
    weight: '',
    schedule: {},
    training: {},
    meals: { meal1: false, meal2: false, meal3: false, meal4: false, meal5: false },
    peptides: {},
    supplements: {},
    cardio: { fasted_liss: false, post_hiit: false, liss_duration: '', hiit_duration: '', liss_hr: '', hiit_hr: '' },
    metrics: { sleep_hours: '', energy: '', mood: '', notes: '' },
  };
}

function loadLocalState(): AppState {
  if (typeof window === 'undefined') return { days: {}, weeklyCheckins: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { days: {}, weeklyCheckins: {} };
}

function saveLocalState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

// Merge remote into local — remote wins on a per-day basis for simplicity
function mergeStates(local: AppState, remote: Partial<AppState>): AppState {
  return {
    days: { ...local.days, ...(remote.days ?? {}) },
    weeklyCheckins: { ...local.weeklyCheckins, ...(remote.weeklyCheckins ?? {}) },
  };
}

export default function CoachVApp() {
  const [currentDate, setCurrentDate] = useState(todayStr);
  const [tab, setTab] = useState<ActiveTab>('daily');
  const [appState, setAppState] = useState<AppState>({ days: {}, weeklyCheckins: {} });
  const [loaded, setLoaded] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');

  // Debounce timers: date → timer id
  const dayTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const checkinTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  // Boot: load localStorage first, then merge remote
  useEffect(() => {
    const local = loadLocalState();
    setAppState(local);
    setLoaded(true);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    // Fetch remote and merge in
    setSyncStatus('syncing');
    loadRemoteState()
      .then(remote => {
        setAppState(prev => {
          const merged = mergeStates(prev, remote);
          saveLocalState(merged);
          return merged;
        });
        setSyncStatus('idle');
      })
      .catch(() => setSyncStatus('error'));
  }, []);

  // Persist locally on every state change after initial load
  useEffect(() => {
    if (loaded) saveLocalState(appState);
  }, [appState, loaded]);

  const getDay = useCallback((dateStr: string): DayData => {
    return appState.days[dateStr] ?? emptyDay(dateStr);
  }, [appState.days]);

  const updateDay = useCallback((dateStr: string, updater: (d: DayData) => DayData) => {
    setAppState(prev => {
      const existing = prev.days[dateStr] ?? emptyDay(dateStr);
      const updated = updater(existing);
      // Debounced Supabase sync
      clearTimeout(dayTimers.current[dateStr]);
      dayTimers.current[dateStr] = setTimeout(() => {
        upsertDayLog(dateStr, updated).catch(() => {});
      }, SYNC_DEBOUNCE_MS);
      return { ...prev, days: { ...prev.days, [dateStr]: updated } };
    });
  }, []);

  const updateCheckin = useCallback((weekNum: number, ci: WCI) => {
    setAppState(prev => {
      clearTimeout(checkinTimers.current[weekNum]);
      checkinTimers.current[weekNum] = setTimeout(() => {
        upsertCheckin(weekNum, ci).catch(() => {});
      }, SYNC_DEBOUNCE_MS);
      return { ...prev, weeklyCheckins: { ...prev.weeklyCheckins, [weekNum]: ci } };
    });
  }, []);

  const week = getWeekNumber(currentDate);
  const phase = getPhase(week);
  const phaseData = PHASES[phase - 1];

  function handleSaveForCoach() {
    const data = JSON.stringify({
      ...appState,
      exportedAt: new Date().toISOString(),
      client: 'Dylan',
      week,
      phase,
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CoachV_Week${week}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
  }

  function handleLoadData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          if (parsed.days || parsed.weeklyCheckins) {
            setAppState({ days: parsed.days ?? {}, weeklyCheckins: parsed.weeklyCheckins ?? {} });
          }
        } catch {}
      };
      reader.readAsText(file);
    };
    input.click();
  }

  if (!loaded) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'var(--text-muted)', letterSpacing: '2px', fontSize: 12 }}>LOADING...</span>
      </div>
    );
  }

  const today = todayStr();
  const isToday = currentDate === today;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <header className="app-header">
        <div>
          <h1>COACH V</h1>
          <div className="subtitle">12-WEEK RECOMPOSITION</div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {syncStatus === 'syncing' && (
            <span style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: 1 }}>SYNCING</span>
          )}
          {syncStatus === 'error' && (
            <span style={{ fontSize: 9, color: 'var(--red)', letterSpacing: 1 }}>OFFLINE</span>
          )}
          <span className="badge-phase">P{phase}</span>
          <span className="badge-week">WK {week}</span>
        </div>
      </header>

      {/* Nav */}
      <nav className="app-nav">
        <button className={`nav-btn${tab === 'daily' ? ' active' : ''}`} onClick={() => setTab('daily')}>DAILY</button>
        <button className={`nav-btn${tab === 'checkin' ? ' active' : ''}`} onClick={() => setTab('checkin')}>CHECK-IN</button>
        <button className={`nav-btn${tab === 'dashboard' ? ' active' : ''}`} onClick={() => setTab('dashboard')}>DASHBOARD</button>
      </nav>

      {/* Day navigator */}
      {tab === 'daily' && (
        <div className="day-nav">
          <button className="day-nav-btn" onClick={() => setCurrentDate(d => addDays(d, -1))}>←</button>
          <div style={{ textAlign: 'center' }}>
            <div className="day-label">{formatDateLong(currentDate)}</div>
            <div className="day-type">
              {(() => {
                const t = getDayType(currentDate);
                if (t === 'sunday') return 'SUNDAY — PREP & RECHARGE';
                if (t === 'rest') return 'REST DAY — ACTIVE RECOVERY';
                return t.replace(/_/g, ' / ').toUpperCase();
              })()}
            </div>
            {!isToday && (
              <button className="today-btn" onClick={() => setCurrentDate(today)}>TODAY</button>
            )}
          </div>
          <button className="day-nav-btn" onClick={() => setCurrentDate(d => addDays(d, 1))}>→</button>
        </div>
      )}

      {/* Phase macro bar */}
      {tab === 'daily' && (
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '8px 16px' }}>
          <div className="macro-card" style={{ margin: 0 }}>
            <div className="macro-item"><div className="macro-val">{phaseData.calories}</div><div className="macro-lbl">kcal</div></div>
            <div className="macro-item"><div className="macro-val">{phaseData.protein}g</div><div className="macro-lbl">protein</div></div>
            <div className="macro-item"><div className="macro-val">{phaseData.carbs}g</div><div className="macro-lbl">carbs</div></div>
            <div className="macro-item"><div className="macro-val">{phaseData.fat}g</div><div className="macro-lbl">fat</div></div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main>
        {tab === 'daily' && (
          <DailyView
            dateStr={currentDate}
            dayData={getDay(currentDate)}
            updateDay={updateDay}
            phase={phase}
          />
        )}
        {tab === 'checkin' && (
          <WeeklyCheckin
            currentDate={currentDate}
            appState={appState}
            updateCheckin={updateCheckin}
          />
        )}
        {tab === 'dashboard' && (
          <Dashboard appState={appState} currentDate={currentDate} />
        )}
      </main>

      {/* Save bar */}
      <div className="save-bar">
        <button
          className="btn btn-red"
          onClick={handleSaveForCoach}
          style={saveFlash ? { background: 'var(--green)' } : {}}
        >
          {saveFlash ? '✓ SAVED' : 'EXPORT FOR COACH V'}
        </button>
        <button className="btn btn-outline" onClick={handleLoadData}>LOAD DATA</button>
      </div>
    </div>
  );
}
