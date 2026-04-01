'use client';

import { useState } from 'react';
import {
  getDayType, isTrainingDay, getPeptideList, getScheduleForDay,
  TRAINING_BY_PHASE, SUPPLEMENTS, CAT_COLORS, Exercise,
} from '@/lib/program';
import { DayData, ExerciseData, SetData } from '@/lib/types';

interface Props {
  dateStr: string;
  dayData: DayData;
  updateDay: (dateStr: string, updater: (d: DayData) => DayData) => void;
  phase: number;
}

function Section({
  title,
  completion,
  children,
  defaultCollapsed = false,
}: {
  title: string;
  completion?: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  return (
    <div className={`section${collapsed ? ' section-collapsed' : ''}`}>
      <div className="section-header" onClick={() => setCollapsed(c => !c)}>
        <h2>{title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {completion && <span className="completion">{completion}</span>}
          <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>{collapsed ? '▸' : '▾'}</span>
        </div>
      </div>
      <div className="section-body">{children}</div>
    </div>
  );
}

export default function DailyView({ dateStr, dayData, updateDay, phase }: Props) {
  const type = getDayType(dateStr);
  const schedule = getScheduleForDay(type);
  const peptideList = getPeptideList(dateStr);
  const exercises: Exercise[] = isTrainingDay(type)
    ? (TRAINING_BY_PHASE[phase]?.[type] ?? TRAINING_BY_PHASE[1][type] ?? [])
    : [];

  const [expandedSchedule, setExpandedSchedule] = useState<Set<number>>(new Set());

  function set<K extends keyof DayData>(key: K, val: DayData[K]) {
    updateDay(dateStr, d => ({ ...d, [key]: val }));
  }

  const schedChecked = schedule.filter((_, i) => dayData.schedule['s' + i]).length;
  const mealsDone = Object.values(dayData.meals).filter(Boolean).length;
  const pepDone = peptideList.filter(p => dayData.peptides[p.key]).length;
  const suppDone = SUPPLEMENTS.filter((_, i) => dayData.supplements['s' + i]).length;
  const cardioDone = (dayData.cardio.fasted_liss ? 1 : 0) + (dayData.cardio.post_hiit ? 1 : 0);
  const exDone = exercises.filter((_, i) => {
    const ex = dayData.training['e' + i];
    return ex?.sets?.some(s => s.done);
  }).length;

  return (
    <div className="content">
      {/* Morning Weight */}
      <Section title="Morning Weight" completion={dayData.weight ? '✓ ' + dayData.weight + ' lbs' : ''}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label className="metric-label">Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              inputMode="decimal"
              className="metric-input"
              value={dayData.weight}
              placeholder="e.g. 234.5"
              onChange={e => set('weight', e.target.value)}
            />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label className="metric-label">Goal: 220 lbs</label>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', paddingBottom: 10 }}>
              {dayData.weight
                ? `${(parseFloat(dayData.weight) - 220).toFixed(1)} lbs to go`
                : 'Start: 235 lbs'}
            </div>
          </div>
        </div>
      </Section>

      {/* Daily Schedule */}
      <Section title="Daily Schedule" completion={`${schedChecked}/${schedule.length}`} defaultCollapsed={schedChecked === schedule.length}>
        {schedule.map((item, i) => {
          const checked = dayData.schedule['s' + i] ?? false;
          const expanded = expandedSchedule.has(i);
          return (
            <div key={i} className={`check-item${checked ? ' checked' : ''}`}>
              <input
                type="checkbox"
                className="check-box"
                checked={checked}
                onChange={e => set('schedule', { ...dayData.schedule, ['s' + i]: e.target.checked })}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => setExpandedSchedule(prev => {
                    const next = new Set(prev);
                    next.has(i) ? next.delete(i) : next.add(i);
                    return next;
                  })}
                >
                  <div style={{ flex: 1 }}>
                    <div className="item-time" style={{ color: CAT_COLORS[item.cat] ?? 'var(--text-muted)' }}>
                      {item.time} — {item.cat}
                    </div>
                    <div className="item-name">{item.action}</div>
                    {!expanded && <div className="item-detail">{item.detail}</div>}
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: 13, paddingLeft: 8, paddingTop: 2, flexShrink: 0 }}>
                    {expanded ? '▾' : '▸'}
                  </span>
                </div>
                {expanded && (
                  <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid var(--border)' }}>
                    <div className="item-detail" style={{ marginBottom: item.notes ? 6 : 0 }}>{item.detail}</div>
                    {item.notes && (
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.notes}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Section>

      {/* Training */}
      {isTrainingDay(type) && (
        <Section title="Training Log" completion={`${exDone}/${exercises.length} exercises`}>
          {exercises.map((ex, ei) => {
            const exData: ExerciseData = dayData.training['e' + ei] ?? {
              sets: Array.from({ length: ex.sets }, (): SetData => ({ weight: '', reps: '', done: false })),
            };
            const updateEx = (updater: (d: ExerciseData) => ExerciseData) => {
              set('training', { ...dayData.training, ['e' + ei]: updater(exData) });
            };
            return (
              <div key={ei} className="exercise-block">
                <div className="exercise-name">{ex.name}</div>
                <div className="exercise-meta">{ex.sets} × {ex.reps} | Tempo: {ex.tempo} | Rest: {ex.rest} | RPE: {ex.rpe}</div>
                <div className="exercise-notes">{ex.notes}</div>
                {Array.from({ length: ex.sets }).map((_, si) => {
                  const s: SetData = exData.sets[si] ?? { weight: '', reps: '', done: false };
                  const updateSet = (field: keyof SetData, val: string | boolean) => {
                    const newSets = [...exData.sets];
                    newSets[si] = { ...s, [field]: val };
                    updateEx(d => ({ ...d, sets: newSets }));
                  };
                  return (
                    <div key={si} className="set-row">
                      <span className="set-label">Set {si + 1}</span>
                      <input
                        type="number"
                        inputMode="decimal"
                        className="set-input"
                        placeholder="lbs"
                        value={s.weight}
                        onChange={e => updateSet('weight', e.target.value)}
                      />
                      <input
                        type="number"
                        inputMode="numeric"
                        className="set-input"
                        placeholder="reps"
                        value={s.reps}
                        onChange={e => updateSet('reps', e.target.value)}
                      />
                      <input
                        type="checkbox"
                        className="set-check"
                        checked={s.done}
                        onChange={e => updateSet('done', e.target.checked)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Section>
      )}

      {/* Meals */}
      <Section title="Meals" completion={`${mealsDone}/5`}>
        {[
          'Meal 1 — Pre-Workout / Breakfast',
          'Meal 2 — Post-Workout Shake',
          'Meal 3 — Lunch',
          'Meal 4 — Afternoon',
          'Meal 5 — Pre-Bed Protein',
        ].map((name, i) => {
          const key = 'meal' + (i + 1);
          const checked = dayData.meals[key] ?? false;
          return (
            <div key={i} className={`check-item${checked ? ' checked' : ''}`}>
              <input
                type="checkbox"
                className="check-box"
                checked={checked}
                onChange={e => set('meals', { ...dayData.meals, [key]: e.target.checked })}
              />
              <div style={{ flex: 1 }}>
                <div className="item-name">{name}</div>
              </div>
            </div>
          );
        })}
      </Section>

      {/* Peptides */}
      <Section title="Peptide Injections" completion={`${pepDone}/${peptideList.length}`}>
        {peptideList.map(p => {
          const checked = dayData.peptides[p.key] ?? false;
          return (
            <div key={p.key} className={`check-item${checked ? ' checked' : ''}`}>
              <input
                type="checkbox"
                className="check-box"
                checked={checked}
                onChange={e => set('peptides', { ...dayData.peptides, [p.key]: e.target.checked })}
              />
              <div style={{ flex: 1 }}>
                <div className="item-name">{p.label}</div>
              </div>
            </div>
          );
        })}
      </Section>

      {/* Supplements */}
      <Section title="Supplements" completion={`${suppDone}/${SUPPLEMENTS.length}`} defaultCollapsed>
        {SUPPLEMENTS.map((s, i) => {
          const checked = dayData.supplements['s' + i] ?? false;
          return (
            <div key={i} className={`check-item${checked ? ' checked' : ''}`}>
              <input
                type="checkbox"
                className="check-box"
                checked={checked}
                onChange={e => set('supplements', { ...dayData.supplements, ['s' + i]: e.target.checked })}
              />
              <div style={{ flex: 1 }}>
                <div className="item-name">{s}</div>
              </div>
            </div>
          );
        })}
      </Section>

      {/* Cardio */}
      <Section title="Cardio" completion={`${cardioDone} done`}>
        {/* Fasted LISS */}
        <div className={`check-item${dayData.cardio.fasted_liss ? ' checked' : ''}`}>
          <input
            type="checkbox"
            className="check-box"
            checked={dayData.cardio.fasted_liss}
            onChange={e => set('cardio', { ...dayData.cardio, fasted_liss: e.target.checked })}
          />
          <div style={{ flex: 1 }}>
            <div className="item-name">Fasted AM LISS</div>
            <div className="cardio-detail">
              <div>
                <label className="metric-label">Duration (min)</label>
                <input type="number" inputMode="numeric" className="metric-input" value={dayData.cardio.liss_duration} placeholder="25"
                  onChange={e => set('cardio', { ...dayData.cardio, liss_duration: e.target.value })} />
              </div>
              <div>
                <label className="metric-label">Avg HR</label>
                <input type="number" inputMode="numeric" className="metric-input" value={dayData.cardio.liss_hr} placeholder="130"
                  onChange={e => set('cardio', { ...dayData.cardio, liss_hr: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
        {/* Post HIIT */}
        <div className={`check-item${dayData.cardio.post_hiit ? ' checked' : ''}`}>
          <input
            type="checkbox"
            className="check-box"
            checked={dayData.cardio.post_hiit}
            onChange={e => set('cardio', { ...dayData.cardio, post_hiit: e.target.checked })}
          />
          <div style={{ flex: 1 }}>
            <div className="item-name">Post-Workout HIIT</div>
            <div className="cardio-detail">
              <div>
                <label className="metric-label">Duration (min)</label>
                <input type="number" inputMode="numeric" className="metric-input" value={dayData.cardio.hiit_duration} placeholder="15"
                  onChange={e => set('cardio', { ...dayData.cardio, hiit_duration: e.target.value })} />
              </div>
              <div>
                <label className="metric-label">Avg HR</label>
                <input type="number" inputMode="numeric" className="metric-input" value={dayData.cardio.hiit_hr} placeholder="160"
                  onChange={e => set('cardio', { ...dayData.cardio, hiit_hr: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* End of Day */}
      <Section title="End of Day">
        <div className="metric-row">
          <div>
            <label className="metric-label">Sleep (hrs)</label>
            <input type="number" step="0.5" inputMode="decimal" className="metric-input" value={dayData.metrics.sleep_hours} placeholder="8"
              onChange={e => set('metrics', { ...dayData.metrics, sleep_hours: e.target.value })} />
          </div>
          <div>
            <label className="metric-label">Energy (1-10)</label>
            <input type="number" min="1" max="10" inputMode="numeric" className="metric-input" value={dayData.metrics.energy} placeholder="7"
              onChange={e => set('metrics', { ...dayData.metrics, energy: e.target.value })} />
          </div>
          <div>
            <label className="metric-label">Mood (1-10)</label>
            <input type="number" min="1" max="10" inputMode="numeric" className="metric-input" value={dayData.metrics.mood} placeholder="7"
              onChange={e => set('metrics', { ...dayData.metrics, mood: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="metric-label">Notes for Coach V</label>
          <textarea
            className="metric-input"
            placeholder="How'd you feel today? Anything I should know?"
            value={dayData.metrics.notes}
            onChange={e => set('metrics', { ...dayData.metrics, notes: e.target.value })}
          />
        </div>
      </Section>
    </div>
  );
}
