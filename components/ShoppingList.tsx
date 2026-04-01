'use client';

import { useState, useEffect } from 'react';
import {
  SHOPPING_BY_PHASE,
  WEEKLY_COST_ESTIMATE,
  ShoppingCategory,
} from '@/lib/program';

const STORAGE_KEY = 'coachv_shopping';

interface CheckedState {
  [phaseKey: string]: Record<string, boolean>;
}

function loadChecked(): CheckedState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveChecked(state: CheckedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function itemKey(catIdx: number, itemIdx: number) {
  return `${catIdx}-${itemIdx}`;
}

export default function ShoppingList({ phase }: { phase: number }) {
  const [checked, setChecked] = useState<CheckedState>({});
  const [collapsedCats, setCollapsedCats] = useState<Record<number, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setChecked(loadChecked());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveChecked(checked);
  }, [checked, loaded]);

  const phaseKey = `phase${phase}`;
  const phaseChecked = checked[phaseKey] ?? {};
  const categories: ShoppingCategory[] = SHOPPING_BY_PHASE[phase] ?? [];

  function toggle(key: string) {
    setChecked(prev => {
      const pc = prev[phaseKey] ?? {};
      return { ...prev, [phaseKey]: { ...pc, [key]: !pc[key] } };
    });
  }

  function clearAll() {
    setChecked(prev => ({ ...prev, [phaseKey]: {} }));
  }

  function toggleCat(idx: number) {
    setCollapsedCats(prev => ({ ...prev, [idx]: !prev[idx] }));
  }

  // Counts
  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(phaseChecked).filter(Boolean).length;

  function catCompletion(catIdx: number, cat: ShoppingCategory) {
    const done = cat.items.filter((_, i) => phaseChecked[itemKey(catIdx, i)]).length;
    return { done, total: cat.items.length };
  }

  if (!loaded) return null;

  return (
    <div className="content">
      {/* Summary header */}
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, color: 'var(--text)' }}>
              WEEKLY GROCERY LIST
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
              Phase {phase} — Shop Sunday morning before meal prep
            </div>
          </div>
          <button
            onClick={clearAll}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontSize: 10,
              fontWeight: 700,
              padding: '6px 10px',
              borderRadius: 4,
              cursor: 'pointer',
              letterSpacing: 0.5,
              fontFamily: 'inherit',
            }}
          >
            RESET
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="progress-track" style={{ flex: 1, height: 14 }}>
            <div
              className="progress-fill"
              style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }}
            />
          </div>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: checkedCount === totalItems ? 'var(--green)' : 'var(--text-dim)',
            minWidth: 48,
            textAlign: 'right' as const,
          }}>
            {checkedCount}/{totalItems}
          </span>
        </div>

        {/* Cost estimate */}
        <div style={{
          display: 'flex',
          gap: 16,
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{ flex: 1, textAlign: 'center' as const }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--gold)' }}>{WEEKLY_COST_ESTIMATE.food}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 0.5, marginTop: 2 }}>Weekly Food</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' as const }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--gold)' }}>{WEEKLY_COST_ESTIMATE.supplements}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 0.5, marginTop: 2 }}>Supplements</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat, catIdx) => {
        const { done, total } = catCompletion(catIdx, cat);
        const collapsed = collapsedCats[catIdx];
        const allDone = done === total;

        return (
          <div key={catIdx} className={`section${collapsed ? ' section-collapsed' : ''}`}>
            <div className="section-header" onClick={() => toggleCat(catIdx)}>
              <h2 style={{ color: allDone ? 'var(--green)' : undefined }}>{cat.category}</h2>
              <span className="completion" style={{ color: allDone ? 'var(--green)' : 'var(--text-muted)' }}>
                {done}/{total}
              </span>
            </div>
            <div className="section-body" style={{ padding: 0 }}>
              {cat.items.map((item, itemIdx) => {
                const key = itemKey(catIdx, itemIdx);
                const isChecked = !!phaseChecked[key];
                return (
                  <div
                    key={key}
                    className={`check-item${isChecked ? ' checked' : ''}`}
                    style={{ padding: '11px 16px', cursor: 'pointer' }}
                    onClick={() => toggle(key)}
                  >
                    <input
                      type="checkbox"
                      className="check-box"
                      checked={isChecked}
                      onChange={() => toggle(key)}
                      onClick={e => e.stopPropagation()}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="item-name">{item.name}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 3 }}>
                        <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>{item.qty}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.cost}</span>
                      </div>
                      {item.notes && (
                        <div className="item-detail">{item.notes}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
