'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import {
  START_DATE, DAY_LABELS, PHASES, SUPPLEMENTS,
  TRAINING_BY_PHASE, SCHEDULE_TRAINING, SCHEDULE_REST, SCHEDULE_SUNDAY,
  getDateObj, formatDateLong, addDays, todayStr,
  getWeekNumber, getPhase, getDayType, isTrainingDay,
  getPeptideList, getScheduleForDay, CAT_COLORS, DayType,
} from '@/lib/program';

import type { DayData, ExerciseData, SetData, WeeklyCheckin, AppState, ActiveTab } from '@/lib/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// ─── constants ──────────────────────────────────────────────────────────────
const MEALS_TRAINING = [
  { key: 'meal1', label: 'Meal 1 — Pre-Workout Breakfast', detail: 'Eggs + rice · 40P/55C/15F' },
  { key: 'meal2', label: 'Meal 2 — Post-Workout Shake', detail: 'Whey isolate 2 scoops + banana · 50P/35C/5F' },
  { key: 'meal3', label: 'Meal 3 — Lunch', detail: 'Chicken + rice + veggies · 50P/50C/15F' },
  { key: 'meal4', label: 'Meal 4 — Afternoon', detail: 'Ground turkey or fish + carbs · 50P/45C/15F' },
  { key: 'meal5', label: 'Meal 5 — Pre-Bed Protein', detail: 'Casein or cottage cheese + PB · 40P/15C/20F' },
];
const MEALS_REST = [
  { key: 'meal1', label: 'Meal 1 — Breakfast', detail: 'Eggs + avocado · Higher fat, lower carb' },
  { key: 'meal2', label: 'Meal 2 — Lunch', detail: 'Lean protein + veggies + fats' },
  { key: 'meal3', label: 'Meal 3 — Afternoon', detail: 'Protein + moderate carbs' },
  { key: 'meal4', label: 'Meal 4 — Dinner', detail: 'Lean protein + veggies' },
  { key: 'meal5', label: 'Meal 5 — Pre-Bed', detail: 'Casein or cottage cheese' },
];

const STORAGE_KEY = 'coachv_state_v2';

function emptyDay(type: DayType): DayData {
  return {
    type,
    weight: '',
    schedule: {},
    training: {},
    meals: {},
    peptides: {},
    supplements: {},
    cardio: { fasted_liss: false, post_hiit: false, liss_duration: '', hiit_duration: '', liss_hr: '', hiit_hr: '' },
    metrics: { sleep_hours: '', energy: '', mood: '', notes: '' },
  };
}

function emptyCheckin(): WeeklyCheckin {
  return {
    avgWeight: '', trainingAdherence: '', nutritionRating: '', peptideAdherence: '',
    giComfort: '', energy: '', sleep: '', mood: '',
    wins: '', struggles: '', questionsForCoach: '',
  };
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { days: {}, weeklyCheckins: {} };
}

function saveState(s: AppState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

// ─── helpers ─────────────────────────────────────────────────────────────────
function clamp(val: string, min: number, max: number): string {
  const n = parseFloat(val);
  if (isNaN(n)) return val;
  return String(Math.min(max, Math.max(min, n)));
}

function pct(a: number, b: number) {
  return b === 0 ? 0 : Math.round((a / b) * 100);
}

// ─── sub-components ──────────────────────────────────────────────────────────
function Section({ title, badge, defaultOpen = true, children }: {
  title: string; badge?: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`section${open ? '' : ' section-collapsed'}`}>
      <div className="section-header" onClick={() => setOpen(o => !o)}>
        <h2>{title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {badge}
          <span style={{ color: 'var(--text-muted)', fontSize: 18, lineHeight: 1 }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      <div className="section-body">{children}</div>
    </div>
  );
}

function CheckItem({ checked, onChange, time, name, detail, color }: {
  checked: boolean; onChange: (v: boolean) => void;
  time?: string; name: string; detail?: string; color?: string;
}) {
  return (
    <div className={`check-item${checked ? ' checked' : ''}`}>
      <input type="checkbox" className="check-box" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {time && <div className="item-time" style={{ color: color || 'var(--text-dim)' }}>{time}</div>}
        <div className="item-name">{name}</div>
        {detail && <div className="item-detail">{detail}</div>}
      </div>
    </div>
  );
}

function NumberRating({ label, value, onChange, min = 1, max = 10 }: {
  label: string; value: string; onChange: (v: string) => void; min?: number; max?: number;
}) {
  return (
    <div>
      <label className="metric-label">{label}</label>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(n => (
          <button
            key={n}
            onClick={() => onChange(String(n))}
            style={{
              width: 38, height: 38, border: '1px solid var(--border)',
              borderRadius: 6, fontWeight: 700, fontSize: 14,
              background: value === String(n) ? 'var(--red)' : 'var(--bg)',
              color: value === String(n) ? '#fff' : 'var(--text-dim)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >{n}</button>
        ))}
      </div>
    </div>
  );
}

// ─── main ────────────────────────────────────────────────────────────────────
export default function CoachVApp() {
  const [state, setState] = useState<AppState>({ days: {}, weeklyCheckins: {} });
  const [currentDate, setCurrentDate] = useState(todayStr());
  const [activeTab, setActiveTab] = useState<ActiveTab>('daily');
  const [checkinWeek, setCheckinWeek] = useState(1);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // load from localStorage on mount
  useEffect(() => {
    setState(loadState());
    const today = todayStr();
    setCurrentDate(today);
    setCheckinWeek(getWeekNumber(today));
  }, []);

  // auto-save with debounce
  const scheduleSave = useCallback((newState: AppState) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveState(newState), 400);
  }, []);

  function mutate(fn: (draft: AppState) => void) {
    setState(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as AppState;
      fn(next);
      scheduleSave(next);
      return next;
    });
  }

  // ── derived ──
  const dayType = getDayType(currentDate);
  const week = getWeekNumber(currentDate);
  const phaseNum = getPhase(week);
  const phase = PHASES[phaseNum - 1];
  const training = isTrainingDay(dayType) ? (TRAINING_BY_PHASE[phaseNum]?.[dayType] ?? []) : [];
  const meals = isTrainingDay(dayType) ? MEALS_TRAINING : MEALS_REST;
  const peptides = getPeptideList(currentDate);

  const dayKey = currentDate;
  const dayData: DayData = state.days[dayKey] ?? emptyDay(dayType);

  function updateDay(fn: (d: DayData) => void) {
    mutate(s => {
      if (!s.days[dayKey]) s.days[dayKey] = emptyDay(dayType);
      fn(s.days[dayKey]);
    });
  }

  function updateCheckin(fn: (c: WeeklyCheckin) => void) {
    mutate(s => {
      if (!s.weeklyCheckins[checkinWeek]) s.weeklyCheckins[checkinWeek] = emptyCheckin();
      fn(s.weeklyCheckins[checkinWeek]);
    });
  }

  const checkinData: WeeklyCheckin = state.weeklyCheckins[checkinWeek] ?? emptyCheckin();

  // ── completion stats for day ──
  const mealsDone = meals.filter(m => dayData.meals[m.key]).length;
  const peptidesDone = peptides.filter(p => dayData.peptides[p.key]).length;
  const suppsDone = SUPPLEMENTS.filter((_, i) => dayData.supplements[`supp_${i}`]).length;
  const trainingDone = training.reduce((acc, ex) => {
    const exData = dayData.training[ex.name];
    if (!exData) return acc;
    return acc + exData.sets.filter(s => s.done).length;
  }, 0);
  const trainingTotal = training.reduce((a, ex) => a + ex.sets, 0);

  // ── navigation ──
  function goDay(n: number) {
    setCurrentDate(d => addDays(d, n));
  }

  const isBeforeStart = getDateObj(currentDate) < getDateObj(START_DATE);
  const isAfterEnd = getDateObj(currentDate) > getDateObj(addDays(START_DATE, 83));

  // ── export ──
  function exportForCoach() {
    const blob = new Blob([JSON.stringify({ meta: { name: 'Dylan', height: "6'5\"", startWeight: 235, goalWeight: 220, goalBF: '10%', program: '12-Week Recomposition', exported: new Date().toISOString() }, state }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coach-v-export-${todayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── weight chart data ──
  const weightEntries = Object.entries(state.days)
    .filter(([, d]) => d.weight && !isNaN(parseFloat(d.weight)))
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-30);

  const chartData = {
    labels: weightEntries.map(([k]) => {
      const [, m, d] = k.split('-');
      return `${m}/${d}`;
    }),
    datasets: [{
      label: 'Weight (lbs)',
      data: weightEntries.map(([, d]) => parseFloat(d.weight)),
      borderColor: '#e53e3e',
      backgroundColor: 'rgba(229,62,62,0.1)',
      tension: 0.3,
      fill: true,
      pointBackgroundColor: '#e53e3e',
      pointRadius: 4,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false }, tooltip: { mode: 'index' as const, intersect: false } },
    scales: {
      x: { ticks: { color: '#718096', font: { size: 10 } }, grid: { color: '#2d3748' } },
      y: { ticks: { color: '#718096', font: { size: 10 } }, grid: { color: '#2d3748' } },
    },
  };

  // ── progress stats ──
  const allDays = Object.entries(state.days);
  const trainingDays = allDays.filter(([k]) => isTrainingDay(getDayType(k)));
  const trainedCount = trainingDays.filter(([, d]) => {
    const exKeys = Object.keys(d.training);
    return exKeys.length > 0 && Object.values(d.training).some(ex => ex.sets.some(s => s.done));
  }).length;
  const weights = allDays.filter(([, d]) => d.weight).map(([, d]) => parseFloat(d.weight)).filter(n => !isNaN(n));
  const latestWeight = weights.length ? weights[weights.length - 1] : 235;
  const lowestWeight = weights.length ? Math.min(...weights) : 235;
  const totalTrainingDaysInProgram = 84 * (5 / 7); // approx
  const programPct = Math.round((getDateObj(currentDate).getTime() - getDateObj(START_DATE).getTime()) / (84 * 24 * 3600 * 1000) * 100);

  // ─── render ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div className="app-header">
        <div>
          <h1>COACH V</h1>
          <div className="subtitle">12-WK RECOMP · DYLAN</div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexDirection: 'column', alignItems: 'flex-end' }}>
          <span className="badge-phase">WK {week}</span>
          <span className="badge-week">{phase.name.replace('PHASE 1: ', 'P1: ').replace('PHASE 2: ', 'P2: ').replace('PHASE 3: ', 'P3: ')}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="app-nav">
        {(['daily', 'checkin', 'dashboard'] as ActiveTab[]).map(tab => (
          <button key={tab} className={`nav-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'daily' ? '📋 DAILY' : tab === 'checkin' ? '📊 CHECK-IN' : '📈 DASHBOARD'}
          </button>
        ))}
      </div>

      {/* ── DAILY TAB ── */}
      {activeTab === 'daily' && (
        <>
          {/* Day nav */}
          <div className="day-nav">
            <button className="day-nav-btn" onClick={() => goDay(-1)}>‹</button>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div className="day-label">{formatDateLong(currentDate)}</div>
              <div className="day-type">{DAY_LABELS[dayType]}</div>
              {currentDate !== todayStr() && (
                <button className="today-btn" onClick={() => setCurrentDate(todayStr())}>TODAY</button>
              )}
            </div>
            <button className="day-nav-btn" onClick={() => goDay(1)}>›</button>
          </div>

          {/* Phase macros */}
          <div style={{ padding: '8px 12px 0' }}>
            <div className="macro-card">
              <div className="macro-item"><div className="macro-val">{phase.calories}</div><div className="macro-lbl">KCAL</div></div>
              <div className="macro-item"><div className="macro-val">{phase.protein}g</div><div className="macro-lbl">PROTEIN</div></div>
              <div className="macro-item"><div className="macro-val">{phase.carbs}g</div><div className="macro-lbl">CARBS</div></div>
              <div className="macro-item"><div className="macro-val">{phase.fat}g</div><div className="macro-lbl">FAT</div></div>
            </div>
          </div>

          <div className="content">
            {/* Morning weight */}
            <Section title="⚖️ MORNING WEIGHT">
              <label className="metric-label">Weight (lbs)</label>
              <input
                type="number" step="0.1" placeholder="e.g. 234.5"
                className="metric-input" style={{ maxWidth: 160 }}
                value={dayData.weight}
                onChange={e => updateDay(d => { d.weight = e.target.value; })}
              />
              {dayData.weight && (
                <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                  {parseFloat(dayData.weight) < 235
                    ? <span style={{ color: 'var(--green)' }}>↓ {(235 - parseFloat(dayData.weight)).toFixed(1)} lbs from start</span>
                    : <span style={{ color: 'var(--red)' }}>↑ {(parseFloat(dayData.weight) - 235).toFixed(1)} lbs from start</span>
                  }
                  {' · '}<span style={{ color: 'var(--text-muted)' }}>{(220 - parseFloat(dayData.weight)).toFixed(1)} lbs to goal</span>
                </div>
              )}
            </Section>

            {/* Training */}
            {isTrainingDay(dayType) && training.length > 0 && (
              <Section
                title="🏋️ TRAINING"
                badge={<span className="completion">{trainingDone}/{trainingTotal} sets</span>}
              >
                {training.map(ex => {
                  const exData: ExerciseData = dayData.training[ex.name] ?? {
                    sets: Array.from({ length: ex.sets }, () => ({ weight: '', reps: '', done: false })),
                  };
                  function updEx(fn: (e: ExerciseData) => void) {
                    updateDay(d => {
                      if (!d.training[ex.name]) {
                        d.training[ex.name] = { sets: Array.from({ length: ex.sets }, () => ({ weight: '', reps: '', done: false })) };
                      }
                      fn(d.training[ex.name]);
                    });
                  }
                  return (
                    <div key={ex.name} className="exercise-block">
                      <div className="exercise-name">{ex.name}</div>
                      <div className="exercise-meta">{ex.sets}×{ex.reps} · Tempo {ex.tempo} · Rest {ex.rest} · RPE {ex.rpe}</div>
                      {ex.notes && <div className="exercise-notes">💡 {ex.notes}</div>}
                      <div style={{ marginTop: 8 }}>
                        <div className="set-row" style={{ marginBottom: 4 }}>
                          <div className="set-label" />
                          <div style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>LBS</div>
                          <div style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>REPS</div>
                          <div style={{ width: 28 }} />
                        </div>
                        {exData.sets.map((set, si) => (
                          <div key={si} className="set-row">
                            <div className="set-label">SET {si + 1}</div>
                            <input
                              type="number" className="set-input" placeholder="0"
                              value={set.weight}
                              onChange={e => updEx(ex => { ex.sets[si].weight = e.target.value; })}
                            />
                            <input
                              type="number" className="set-input" placeholder="0"
                              value={set.reps}
                              onChange={e => updEx(ex => { ex.sets[si].reps = e.target.value; })}
                            />
                            <input
                              type="checkbox" className="set-check"
                              checked={set.done}
                              onChange={e => updEx(ex => { ex.sets[si].done = e.target.checked; })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </Section>
            )}

            {/* Meals */}
            <Section
              title="🍽️ NUTRITION"
              badge={<span className="completion">{mealsDone}/5 meals</span>}
            >
              {meals.map(m => (
                <CheckItem
                  key={m.key}
                  checked={!!dayData.meals[m.key]}
                  onChange={v => updateDay(d => { d.meals[m.key] = v; })}
                  name={m.label}
                  detail={m.detail}
                />
              ))}
            </Section>

            {/* Peptides */}
            <Section
              title="💉 PEPTIDES"
              badge={<span className="completion">{peptidesDone}/{peptides.length}</span>}
              defaultOpen={false}
            >
              {peptides.map(p => (
                <CheckItem
                  key={p.key}
                  checked={!!dayData.peptides[p.key]}
                  onChange={v => updateDay(d => { d.peptides[p.key] = v; })}
                  name={p.label}
                  color="var(--red)"
                />
              ))}
            </Section>

            {/* Supplements */}
            <Section
              title="💊 SUPPLEMENTS"
              badge={<span className="completion">{suppsDone}/{SUPPLEMENTS.length}</span>}
              defaultOpen={false}
            >
              {SUPPLEMENTS.map((s, i) => (
                <CheckItem
                  key={i}
                  checked={!!dayData.supplements[`supp_${i}`]}
                  onChange={v => updateDay(d => { d.supplements[`supp_${i}`] = v; })}
                  name={s}
                  color="var(--gold)"
                />
              ))}
            </Section>

            {/* Cardio */}
            <Section title="🏃 CARDIO" defaultOpen={false}>
              <div className="check-item">
                <input type="checkbox" className="check-box"
                  checked={dayData.cardio.fasted_liss}
                  onChange={e => updateDay(d => { d.cardio.fasted_liss = e.target.checked; })}
                />
                <div style={{ flex: 1 }}>
                  <div className="item-name">Fasted LISS — Incline Walk</div>
                  <div className="item-detail">Zone 2 · Target: 25-40 min · HR 110-130</div>
                  <div className="cardio-detail">
                    <div>
                      <label className="metric-label">DURATION (min)</label>
                      <input type="number" className="metric-input" placeholder="30"
                        value={dayData.cardio.liss_duration}
                        onChange={e => updateDay(d => { d.cardio.liss_duration = e.target.value; })}
                      />
                    </div>
                    <div>
                      <label className="metric-label">AVG HR (bpm)</label>
                      <input type="number" className="metric-input" placeholder="120"
                        value={dayData.cardio.liss_hr}
                        onChange={e => updateDay(d => { d.cardio.liss_hr = e.target.value; })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {isTrainingDay(dayType) && (
                <div className="check-item">
                  <input type="checkbox" className="check-box"
                    checked={dayData.cardio.post_hiit}
                    onChange={e => updateDay(d => { d.cardio.post_hiit = e.target.checked; })}
                  />
                  <div style={{ flex: 1 }}>
                    <div className="item-name">Post-Workout HIIT</div>
                    <div className="item-detail">10-15 min · Sprint intervals · HR 160-175</div>
                    <div className="cardio-detail">
                      <div>
                        <label className="metric-label">DURATION (min)</label>
                        <input type="number" className="metric-input" placeholder="12"
                          value={dayData.cardio.hiit_duration}
                          onChange={e => updateDay(d => { d.cardio.hiit_duration = e.target.value; })}
                        />
                      </div>
                      <div>
                        <label className="metric-label">AVG HR (bpm)</label>
                        <input type="number" className="metric-input" placeholder="165"
                          value={dayData.cardio.hiit_hr}
                          onChange={e => updateDay(d => { d.cardio.hiit_hr = e.target.value; })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Section>

            {/* End of Day */}
            <Section title="🌙 END OF DAY" defaultOpen={false}>
              <div className="metric-row two" style={{ marginBottom: 16 }}>
                <div>
                  <label className="metric-label">SLEEP (hrs)</label>
                  <input type="number" step="0.5" className="metric-input" placeholder="8.0"
                    value={dayData.metrics.sleep_hours}
                    onChange={e => updateDay(d => { d.metrics.sleep_hours = e.target.value; })}
                  />
                </div>
                <div />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <NumberRating label="ENERGY (1-10)" value={dayData.metrics.energy}
                  onChange={v => updateDay(d => { d.metrics.energy = v; })} />
                <NumberRating label="MOOD (1-10)" value={dayData.metrics.mood}
                  onChange={v => updateDay(d => { d.metrics.mood = v; })} />
              </div>
              <div style={{ marginTop: 16 }}>
                <label className="metric-label">DAILY NOTES</label>
                <textarea className="metric-input" placeholder="How did today go? Any wins, struggles, or observations..."
                  value={dayData.metrics.notes}
                  onChange={e => updateDay(d => { d.metrics.notes = e.target.value; })}
                />
              </div>
            </Section>

            {/* Export */}
            <div style={{ padding: '4px 0 16px' }}>
              <button className="btn btn-red" style={{ width: '100%' }} onClick={exportForCoach}>
                📤 EXPORT FOR COACH
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── CHECK-IN TAB ── */}
      {activeTab === 'checkin' && (
        <div className="content" style={{ paddingTop: 16 }}>
          {/* Week selector */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>Select Week</div>
            <div className="week-selector">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(w => (
                <button key={w} className={`week-pill${checkinWeek === w ? ' active' : ''}`} onClick={() => setCheckinWeek(w)}>
                  WK {w}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Week {checkinWeek} — {PHASES[getPhase(checkinWeek) - 1].name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
              Complete your weekly self-assessment. Submit to Coach V every Sunday evening.
            </div>
          </div>

          <div className="checkin-section">
            <h3>BODY METRICS</h3>
            <div className="metric-row two">
              <div>
                <label className="metric-label">7-Day Avg Weight (lbs)</label>
                <input type="number" step="0.1" className="metric-input" placeholder="235.0"
                  value={checkinData.avgWeight}
                  onChange={e => updateCheckin(c => { c.avgWeight = e.target.value; })}
                />
              </div>
              <div />
            </div>
          </div>

          <div className="checkin-section">
            <h3>ADHERENCE RATINGS</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <NumberRating label="Training Adherence" value={checkinData.trainingAdherence}
                onChange={v => updateCheckin(c => { c.trainingAdherence = v; })} />
              <NumberRating label="Nutrition Rating" value={checkinData.nutritionRating}
                onChange={v => updateCheckin(c => { c.nutritionRating = v; })} />
              <NumberRating label="Peptide Adherence" value={checkinData.peptideAdherence}
                onChange={v => updateCheckin(c => { c.peptideAdherence = v; })} />
            </div>
          </div>

          <div className="checkin-section">
            <h3>WELLBEING</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <NumberRating label="GI Comfort (1=bad, 10=great)" value={checkinData.giComfort}
                onChange={v => updateCheckin(c => { c.giComfort = v; })} />
              <NumberRating label="Average Energy" value={checkinData.energy}
                onChange={v => updateCheckin(c => { c.energy = v; })} />
              <NumberRating label="Sleep Quality" value={checkinData.sleep}
                onChange={v => updateCheckin(c => { c.sleep = v; })} />
              <NumberRating label="Overall Mood" value={checkinData.mood}
                onChange={v => updateCheckin(c => { c.mood = v; })} />
            </div>
          </div>

          <div className="checkin-section">
            <h3>COACH NOTES</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label className="metric-label">Wins This Week</label>
                <textarea className="metric-input" placeholder="What went well? PRs hit, habits locked in, feeling changes..."
                  value={checkinData.wins}
                  onChange={e => updateCheckin(c => { c.wins = e.target.value; })}
                />
              </div>
              <div>
                <label className="metric-label">Struggles / Issues</label>
                <textarea className="metric-input" placeholder="Missed sessions, GI issues, low energy days, travel..."
                  value={checkinData.struggles}
                  onChange={e => updateCheckin(c => { c.struggles = e.target.value; })}
                />
              </div>
              <div>
                <label className="metric-label">Questions for Coach V</label>
                <textarea className="metric-input" placeholder="Anything you want to discuss or adjust..."
                  value={checkinData.questionsForCoach}
                  onChange={e => updateCheckin(c => { c.questionsForCoach = e.target.value; })}
                />
              </div>
            </div>
          </div>

          <button className="btn btn-red" style={{ width: '100%', marginBottom: 16 }} onClick={exportForCoach}>
            📤 EXPORT CHECK-IN FOR COACH
          </button>
        </div>
      )}

      {/* ── DASHBOARD TAB ── */}
      {activeTab === 'dashboard' && (
        <div className="content" style={{ paddingTop: 16 }}>
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card red">
              <div className="stat-value">{latestWeight}</div>
              <div className="stat-label">Current lbs</div>
            </div>
            <div className="stat-card green">
              <div className="stat-value">{(235 - lowestWeight).toFixed(1)}</div>
              <div className="stat-label">lbs Lost</div>
            </div>
            <div className="stat-card gold">
              <div className="stat-value">{220 - latestWeight > 0 ? (220 - latestWeight).toFixed(1) : '0'}</div>
              <div className="stat-label">lbs to Goal</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{week}</div>
              <div className="stat-label">Week</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{trainedCount}</div>
              <div className="stat-label">Sessions</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{Math.max(0, Math.min(100, programPct))}%</div>
              <div className="stat-label">Complete</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="chart-box" style={{ marginBottom: 12 }}>
            <h3>PROGRAM PROGRESS — WK {week}/12</h3>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, pct(week - 1, 12) + Math.round(pct(getDateObj(currentDate).getDay(), 7) / 12)))}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'var(--text-muted)' }}>
              <span>FOUNDATION</span><span>INTENSIFICATION</span><span>SHRED</span>
            </div>
          </div>

          {/* Weight chart */}
          <div className="chart-box">
            <h3>WEIGHT TREND (last 30 days)</h3>
            {weightEntries.length >= 2 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: 13 }}>
                Log your morning weight for {2 - weightEntries.length} more day{weightEntries.length === 1 ? '' : 's'} to see the chart.
              </div>
            )}
          </div>

          {/* Phase info */}
          {PHASES.map((ph, i) => (
            <div key={i} className="chart-box" style={{ marginBottom: 12 }}>
              <h3 style={{ color: phaseNum === i + 1 ? 'var(--red)' : undefined }}>
                {phaseNum === i + 1 ? '▶ ' : ''}{ph.name} — WK {ph.weeks[0]}-{ph.weeks[ph.weeks.length - 1]}
              </h3>
              <div className="macro-card" style={{ marginBottom: 0 }}>
                <div className="macro-item"><div className="macro-val">{ph.calories}</div><div className="macro-lbl">KCAL</div></div>
                <div className="macro-item"><div className="macro-val">{ph.protein}g</div><div className="macro-lbl">PROTEIN</div></div>
                <div className="macro-item"><div className="macro-val">{ph.carbs}g</div><div className="macro-lbl">CARBS</div></div>
                <div className="macro-item"><div className="macro-val">{ph.fat}g</div><div className="macro-lbl">FAT</div></div>
              </div>
            </div>
          ))}

          <button className="btn btn-outline" style={{ width: '100%', marginBottom: 16 }} onClick={exportForCoach}>
            📤 EXPORT ALL DATA FOR COACH
          </button>
        </div>
      )}
    </div>
  );
}
