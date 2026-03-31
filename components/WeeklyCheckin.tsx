'use client';

import { useState } from 'react';
import { addDays, getDayType, isTrainingDay, getWeekNumber, START_DATE } from '@/lib/program';
import { AppState, WeeklyCheckin as WCI } from '@/lib/types';

interface Props {
  currentDate: string;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

function emptyCheckin(): WCI {
  return {
    avgWeight: '', trainingAdherence: '', nutritionRating: '', peptideAdherence: '',
    giComfort: '', energy: '', sleep: '', mood: '',
    wins: '', struggles: '', questionsForCoach: '',
  };
}

export default function WeeklyCheckin({ currentDate, appState, setAppState }: Props) {
  const currentWeek = getWeekNumber(currentDate);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const ci: WCI = appState.weeklyCheckins[selectedWeek] ?? emptyCheckin();

  function updateCI(key: keyof WCI, val: string) {
    setAppState(prev => ({
      ...prev,
      weeklyCheckins: {
        ...prev.weeklyCheckins,
        [selectedWeek]: { ...(prev.weeklyCheckins[selectedWeek] ?? emptyCheckin()), [key]: val },
      },
    }));
  }

  // Auto-calc stats for selected week
  let weights: number[] = [], trainDone = 0, totalTrainDays = 0;
  for (let i = 0; i < 7; i++) {
    const d = addDays(START_DATE, (selectedWeek - 1) * 7 + i);
    const dd = appState.days[d];
    const type = getDayType(d);
    if (isTrainingDay(type)) {
      totalTrainDays++;
      if (dd) {
        const hasWork = Object.values(dd.training).some(ex => ex.sets?.some(s => s.done));
        if (hasWork) trainDone++;
      }
    }
    if (dd?.weight) weights.push(parseFloat(dd.weight));
  }
  const avgW = weights.length ? (weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1) : '—';

  function NumberInput({ label, val, field }: { label: string; val: string; field: keyof WCI }) {
    return (
      <div>
        <label className="metric-label">{label}</label>
        <input
          type="number"
          min="1"
          max="10"
          inputMode="numeric"
          className="metric-input"
          value={val}
          placeholder="1-10"
          onChange={e => updateCI(field, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="content">
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, color: 'var(--red)', marginBottom: 16 }}>
        WEEKLY CHECK-IN
      </div>

      {/* Week selector */}
      <div className="week-selector">
        {Array.from({ length: 12 }, (_, i) => i + 1).map(w => (
          <button
            key={w}
            className={`week-pill${w === selectedWeek ? ' active' : ''}`}
            onClick={() => setSelectedWeek(w)}
          >
            WK {w}
          </button>
        ))}
      </div>

      {/* Auto stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card gold">
          <div className="stat-value">{avgW}</div>
          <div className="stat-label">Avg Weight</div>
        </div>
        <div className="stat-card green">
          <div className="stat-value">{trainDone}/{totalTrainDays}</div>
          <div className="stat-label">Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{weights.length}</div>
          <div className="stat-label">Days Logged</div>
        </div>
      </div>

      {/* Self-assessment */}
      <div className="checkin-section">
        <h3>Self-Assessment</h3>
        <div className="metric-row">
          <NumberInput label="Nutrition (1-10)" val={ci.nutritionRating} field="nutritionRating" />
          <NumberInput label="Peptide Adherence" val={ci.peptideAdherence} field="peptideAdherence" />
          <NumberInput label="GI Comfort (1-10)" val={ci.giComfort} field="giComfort" />
        </div>
        <div className="metric-row">
          <NumberInput label="Energy (1-10)" val={ci.energy} field="energy" />
          <NumberInput label="Sleep Quality" val={ci.sleep} field="sleep" />
          <NumberInput label="Mood (1-10)" val={ci.mood} field="mood" />
        </div>
      </div>

      {/* Notes */}
      <div className="checkin-section">
        <h3>Notes for Coach V</h3>
        <div style={{ marginBottom: 12 }}>
          <label className="metric-label">Wins This Week</label>
          <textarea
            className="metric-input"
            placeholder="What went well?"
            value={ci.wins}
            onChange={e => updateCI('wins', e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label className="metric-label">Struggles / Obstacles</label>
          <textarea
            className="metric-input"
            placeholder="What was hard? Be honest."
            value={ci.struggles}
            onChange={e => updateCI('struggles', e.target.value)}
          />
        </div>
        <div>
          <label className="metric-label">Questions for Coach V</label>
          <textarea
            className="metric-input"
            placeholder="Anything you need me to address?"
            value={ci.questionsForCoach}
            onChange={e => updateCI('questionsForCoach', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
