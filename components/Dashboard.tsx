'use client';

import { useMemo } from 'react';
import { getDayType, isTrainingDay, getWeekNumber, getPhase, PHASES } from '@/lib/program';
import { AppState } from '@/lib/types';

interface Props {
  appState: AppState;
  currentDate: string;
}

function WeightChart({ weights }: { weights: { date: string; weight: number }[] }) {
  if (weights.length < 2) {
    return (
      <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
        Log at least 2 days to see your weight trend
      </div>
    );
  }

  const W = 320, H = 140, PAD = { t: 10, r: 16, b: 28, l: 36 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const vals = weights.map(w => w.weight);
  const minV = Math.min(...vals, 220) - 2;
  const maxV = Math.max(...vals) + 2;
  const range = maxV - minV;

  function px(i: number) {
    return PAD.l + (i / (weights.length - 1)) * innerW;
  }
  function py(v: number) {
    return PAD.t + innerH - ((v - minV) / range) * innerH;
  }

  const points = weights.map((w, i) => `${px(i)},${py(w.weight)}`).join(' ');
  const targetY = py(220);

  // X labels: show up to 6 evenly spaced
  const labelIdxs = weights.length <= 6
    ? weights.map((_, i) => i)
    : [0, Math.floor(weights.length * 0.25), Math.floor(weights.length * 0.5), Math.floor(weights.length * 0.75), weights.length - 1];

  // Y gridlines
  const yTicks = 4;
  const yGridLines = Array.from({ length: yTicks + 1 }, (_, i) => minV + (range / yTicks) * i);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      {/* Grid lines */}
      {yGridLines.map((v, i) => (
        <g key={i}>
          <line x1={PAD.l} y1={py(v)} x2={W - PAD.r} y2={py(v)} stroke="#2d3748" strokeWidth="1" />
          <text x={PAD.l - 4} y={py(v) + 4} textAnchor="end" fill="#718096" fontSize="9">{v.toFixed(0)}</text>
        </g>
      ))}

      {/* Target line 220 */}
      <line x1={PAD.l} y1={targetY} x2={W - PAD.r} y2={targetY}
        stroke="#38a169" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={W - PAD.r + 2} y={targetY + 4} fill="#38a169" fontSize="9">220</text>

      {/* Area fill */}
      <polygon
        points={`${PAD.l},${PAD.t + innerH} ${points} ${W - PAD.r},${PAD.t + innerH}`}
        fill="rgba(229,62,62,0.08)"
      />

      {/* Line */}
      <polyline points={points} fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinejoin="round" />

      {/* Dots */}
      {weights.map((w, i) => (
        <circle key={i} cx={px(i)} cy={py(w.weight)} r="3" fill="#e53e3e" />
      ))}

      {/* X labels */}
      {labelIdxs.map(i => {
        const d = weights[i].date;
        const [, m, day] = d.split('-');
        return (
          <text key={i} x={px(i)} y={H - 4} textAnchor="middle" fill="#718096" fontSize="9">
            {parseInt(m)}/{parseInt(day)}
          </text>
        );
      })}
    </svg>
  );
}

export default function Dashboard({ appState, currentDate }: Props) {
  const week = getWeekNumber(currentDate);
  const phase = getPhase(week);
  const phaseData = PHASES[phase - 1];

  const stats = useMemo(() => {
    const allDates = Object.keys(appState.days).sort();
    const weightEntries: { date: string; weight: number }[] = [];
    let trainDone = 0, trainExpected = 0;
    let mealsDone = 0, mealsExpected = 0;
    let pepDone = 0, pepExpected = 0;

    allDates.forEach(d => {
      const dd = appState.days[d];
      if (dd.weight) weightEntries.push({ date: d, weight: parseFloat(dd.weight) });
      const type = getDayType(d);
      if (isTrainingDay(type)) {
        trainExpected++;
        const hasWork = Object.values(dd.training).some(ex => ex.sets?.some(s => s.done));
        if (hasWork) trainDone++;
      }
      mealsExpected += 5;
      mealsDone += Object.values(dd.meals).filter(Boolean).length;
      const pepCount = Object.keys(dd.peptides).length;
      const pepChecked = Object.values(dd.peptides).filter(Boolean).length;
      pepExpected += pepCount;
      pepDone += pepChecked;
    });

    const currentWeight = weightEntries.length ? weightEntries[weightEntries.length - 1].weight : 235;
    const lostSoFar = (235 - currentWeight).toFixed(1);
    const toGoal = Math.max(0, currentWeight - 220).toFixed(1);
    const progressPct = Math.min(100, Math.max(0, Math.round(((235 - currentWeight) / 15) * 100)));
    const trainPct = trainExpected ? Math.round((trainDone / trainExpected) * 100) : 0;
    const mealPct = mealsExpected ? Math.round((mealsDone / mealsExpected) * 100) : 0;

    return { weightEntries, currentWeight, lostSoFar, toGoal, progressPct, trainDone, trainExpected, trainPct, mealsDone, mealsExpected, mealPct, daysLogged: allDates.length };
  }, [appState]);

  return (
    <div className="content">
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, color: 'var(--red)', marginBottom: 16 }}>
        PROGRESS DASHBOARD
      </div>

      {/* Stats grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.currentWeight}</div>
          <div className="stat-label">Current (lbs)</div>
        </div>
        <div className={`stat-card ${parseFloat(stats.lostSoFar) > 0 ? 'green' : 'red'}`}>
          <div className="stat-value">{parseFloat(stats.lostSoFar) > 0 ? '-' : ''}{Math.abs(parseFloat(stats.lostSoFar))}</div>
          <div className="stat-label">lbs lost</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-value">WK {week}</div>
          <div className="stat-label">Phase {phase}/3</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.daysLogged}</div>
          <div className="stat-label">Days Logged</div>
        </div>
        <div className={`stat-card ${stats.trainPct >= 80 ? 'green' : 'red'}`}>
          <div className="stat-value">{stats.trainPct}%</div>
          <div className="stat-label">Training</div>
        </div>
        <div className={`stat-card ${stats.mealPct >= 80 ? 'green' : 'red'}`}>
          <div className="stat-value">{stats.mealPct}%</div>
          <div className="stat-label">Nutrition</div>
        </div>
      </div>

      {/* Goal progress */}
      <div className="chart-box">
        <h3>Goal Progress — 235 → 220 lbs</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Start: 235 lbs</span>
          <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>{stats.progressPct}% there</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Goal: 220 lbs</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${stats.progressPct}%` }} />
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
          {stats.toGoal} lbs to goal
        </div>
      </div>

      {/* Weight chart */}
      <div className="chart-box">
        <h3>Weight Trend</h3>
        <WeightChart weights={stats.weightEntries} />
      </div>

      {/* Phase info */}
      <div className="chart-box">
        <h3>{phaseData.name}</h3>
        <div className="macro-card" style={{ margin: 0, border: 'none', padding: 0 }}>
          <div className="macro-item"><div className="macro-val">{phaseData.calories}</div><div className="macro-lbl">kcal/day</div></div>
          <div className="macro-item"><div className="macro-val">{phaseData.protein}g</div><div className="macro-lbl">protein</div></div>
          <div className="macro-item"><div className="macro-val">{phaseData.carbs}g</div><div className="macro-lbl">carbs</div></div>
          <div className="macro-item"><div className="macro-val">{phaseData.fat}g</div><div className="macro-lbl">fat</div></div>
        </div>
      </div>

      {/* Adherence breakdown */}
      <div className="chart-box">
        <h3>Adherence Breakdown</h3>
        {[
          { label: 'Training Sessions', done: stats.trainDone, total: stats.trainExpected },
          { label: 'Meals Hit', done: stats.mealsDone, total: stats.mealsExpected },
        ].map(({ label, done, total }) => {
          const pct = total ? Math.round((done / total) * 100) : 0;
          return (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: pct >= 80 ? 'var(--green)' : 'var(--red)' }}>
                  {done}/{total} ({pct}%)
                </span>
              </div>
              <div className="progress-track" style={{ height: 10 }}>
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
