export interface SetData {
  weight: string;
  reps: string;
  done: boolean;
}

export interface ExerciseData {
  sets: SetData[];
}

export interface CardioData {
  fasted_liss: boolean;
  post_hiit: boolean;
  liss_duration: string;
  hiit_duration: string;
  liss_hr: string;
  hiit_hr: string;
}

export interface DayMetrics {
  sleep_hours: string;
  energy: string;
  mood: string;
  notes: string;
}

export interface DayData {
  type: string;
  weight: string;
  schedule: Record<string, boolean>;
  training: Record<string, ExerciseData>;
  meals: Record<string, boolean>;
  peptides: Record<string, boolean>;
  supplements: Record<string, boolean>;
  cardio: CardioData;
  metrics: DayMetrics;
}

export interface WeeklyCheckin {
  avgWeight: string;
  trainingAdherence: string;
  nutritionRating: string;
  peptideAdherence: string;
  giComfort: string;
  energy: string;
  sleep: string;
  mood: string;
  wins: string;
  struggles: string;
  questionsForCoach: string;
}

export interface AppState {
  days: Record<string, DayData>;
  weeklyCheckins: Record<number, WeeklyCheckin>;
}

export type ActiveTab = 'daily' | 'checkin' | 'dashboard' | 'shopping';
