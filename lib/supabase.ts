import { createClient } from '@supabase/supabase-js';
import { AppState, DayData, WeeklyCheckin } from './types';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

// ── Daily logs ───────────────────────────────────────────────

export async function fetchAllDailyLogs(): Promise<Record<string, DayData>> {
  const { data, error } = await supabase
    .from('coachv_daily_logs')
    .select('date, data');
  if (error || !data) return {};
  const result: Record<string, DayData> = {};
  for (const row of data) result[row.date] = row.data as DayData;
  return result;
}

export async function upsertDayLog(date: string, dayData: DayData): Promise<void> {
  await supabase
    .from('coachv_daily_logs')
    .upsert({ date, data: dayData, updated_at: new Date().toISOString() });
}

// ── Weekly check-ins ─────────────────────────────────────────

export async function fetchAllCheckins(): Promise<Record<number, WeeklyCheckin>> {
  const { data, error } = await supabase
    .from('coachv_weekly_checkins')
    .select('week_number, data');
  if (error || !data) return {};
  const result: Record<number, WeeklyCheckin> = {};
  for (const row of data) result[row.week_number] = row.data as WeeklyCheckin;
  return result;
}

export async function upsertCheckin(weekNumber: number, ciData: WeeklyCheckin): Promise<void> {
  await supabase
    .from('coachv_weekly_checkins')
    .upsert({ week_number: weekNumber, data: ciData, updated_at: new Date().toISOString() });
}

// ── Full state sync ──────────────────────────────────────────

export async function loadRemoteState(): Promise<Partial<AppState>> {
  const [days, weeklyCheckins] = await Promise.all([
    fetchAllDailyLogs(),
    fetchAllCheckins(),
  ]);
  return { days, weeklyCheckins };
}
