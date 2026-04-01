// ============================================================
// COACH V — 12-WEEK RECOMPOSITION PROGRAM DATA
// Dylan | 6'5" | Start: 235 lbs | Goal: 220 lbs @ 10% BF
// Program Start: March 31, 2026
// ============================================================

export const START_DATE = '2026-03-31';

export type DayType = 'push' | 'pull' | 'legs_quads' | 'shoulders_arms' | 'legs_posterior' | 'rest' | 'sunday';

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  tempo: string;
  rest: string;
  rpe: string;
  notes: string;
}

export interface ScheduleItem {
  time: string;
  cat: string;
  action: string;
  detail: string;
  notes?: string[];
}

export interface Phase {
  name: string;
  weeks: number[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// DOW: 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
export const DOW_TO_TYPE: Record<number, DayType> = {
  0: 'sunday',
  1: 'push',
  2: 'pull',
  3: 'legs_quads',
  4: 'shoulders_arms',
  5: 'legs_posterior',
  6: 'rest',
};

export const DAY_LABELS: Record<DayType, string> = {
  push: 'PUSH DAY — CHEST / SHOULDERS / TRICEPS',
  pull: 'PULL DAY — BACK / BICEPS / REAR DELTS',
  legs_quads: 'LEG DAY — QUADS FOCUSED',
  shoulders_arms: 'SHOULDERS & ARMS',
  legs_posterior: 'LEG DAY — POSTERIOR CHAIN',
  rest: 'REST DAY — ACTIVE RECOVERY',
  sunday: 'SUNDAY — PREP & RECHARGE',
};

export const PHASES: Phase[] = [
  { name: 'PHASE 1: FOUNDATION', weeks: [1,2,3,4], calories: 2650, protein: 265, carbs: 230, fat: 80 },
  { name: 'PHASE 2: INTENSIFICATION', weeks: [5,6,7,8], calories: 2450, protein: 265, carbs: 195, fat: 75 },
  { name: 'PHASE 3: SHRED', weeks: [9,10,11,12], calories: 2250, protein: 265, carbs: 160, fat: 70 },
];

// ============================================================
// TRAINING — Phase 1 (Weeks 1-4)
// ============================================================
const PHASE1: Record<string, Exercise[]> = {
  push: [
    { name: 'Barbell Bench Press', sets: 4, reps: '8-10', tempo: '3-1-1-0', rest: '2:30', rpe: '7-8', notes: 'Full ROM. Build to working weight.' },
    { name: 'Incline DB Press (30°)', sets: 3, reps: '10-12', tempo: '3-0-1-0', rest: '2:00', rpe: '8', notes: 'Squeeze at top. No elbow flare.' },
    { name: 'Cable Fly (mid)', sets: 3, reps: '12-15', tempo: '2-0-1-2', rest: '1:30', rpe: '8', notes: 'Peak contraction 2 sec hold.' },
    { name: 'Seated DB Shoulder Press', sets: 3, reps: '10-12', tempo: '2-0-1-0', rest: '2:00', rpe: '8', notes: 'Full lockout. Control it.' },
    { name: 'Lateral Raise (cable)', sets: 3, reps: '15', tempo: '2-0-1-1', rest: '1:00', rpe: '8-9', notes: 'Slight lean away. Pinky up.' },
    { name: 'Rope Pushdown', sets: 3, reps: '12-15', tempo: '2-0-1-1', rest: '1:00', rpe: '8', notes: 'Spread rope at bottom. Squeeze.' },
    { name: 'Overhead Tricep Extension (cable)', sets: 3, reps: '12-15', tempo: '2-0-1-0', rest: '1:00', rpe: '8', notes: 'Stretch at bottom. Elbows tight.' },
  ],
  pull: [
    { name: 'Barbell Row (overhand)', sets: 4, reps: '8-10', tempo: '2-0-1-1', rest: '2:30', rpe: '7-8', notes: 'Chest to bar. No momentum.' },
    { name: 'Weighted Pull-Up', sets: 3, reps: '8-10', tempo: '3-0-1-0', rest: '2:00', rpe: '8', notes: 'Full dead hang. Controlled.' },
    { name: 'Seated Cable Row (close grip)', sets: 3, reps: '10-12', tempo: '2-0-1-2', rest: '1:30', rpe: '8', notes: 'Squeeze scaps. 2 sec hold.' },
    { name: 'Face Pull', sets: 3, reps: '15-20', tempo: '2-0-1-2', rest: '1:00', rpe: '7-8', notes: 'External rotate at top.' },
    { name: 'DB Curl (standing)', sets: 3, reps: '10-12', tempo: '2-0-1-0', rest: '1:00', rpe: '8', notes: 'Supinate hard at top.' },
    { name: 'Hammer Curl (incline)', sets: 3, reps: '12', tempo: '3-0-1-0', rest: '1:00', rpe: '8', notes: 'Slow eccentric. No swing.' },
    { name: 'Reverse Fly (rear delt machine)', sets: 3, reps: '15', tempo: '2-0-1-1', rest: '1:00', rpe: '8', notes: 'Squeeze at contraction.' },
  ],
  legs_quads: [
    { name: 'Barbell Back Squat', sets: 4, reps: '8-10', tempo: '3-1-1-0', rest: '3:00', rpe: '7-8', notes: 'Below parallel. Brace hard.' },
    { name: 'Leg Press', sets: 3, reps: '10-12', tempo: '3-0-1-0', rest: '2:00', rpe: '8', notes: 'Feet mid-platform. Full ROM.' },
    { name: 'Walking Lunge (DB)', sets: 3, reps: '12/leg', tempo: '2-0-1-0', rest: '1:30', rpe: '8', notes: 'Long stride. Upright torso.' },
    { name: 'Leg Extension', sets: 3, reps: '12-15', tempo: '2-0-1-2', rest: '1:00', rpe: '8-9', notes: 'Squeeze at top 2 sec.' },
    { name: 'Calf Raise (seated)', sets: 4, reps: '15', tempo: '2-1-1-2', rest: '1:00', rpe: '8', notes: 'Full stretch at bottom.' },
    { name: 'Hanging Leg Raise', sets: 3, reps: '12-15', tempo: '2-0-1-0', rest: '1:00', rpe: '8', notes: 'Control the swing. Slow.' },
  ],
  shoulders_arms: [
    { name: 'Standing OHP (barbell)', sets: 4, reps: '8-10', tempo: '2-0-1-0', rest: '2:30', rpe: '7-8', notes: 'Strict. No leg drive.' },
    { name: 'Arnold Press', sets: 3, reps: '10-12', tempo: '2-0-1-0', rest: '2:00', rpe: '8', notes: 'Full rotation. Controlled.' },
    { name: 'Lateral Raise (DB)', sets: 4, reps: '12-15', tempo: '2-0-1-1', rest: '1:00', rpe: '8-9', notes: 'Controlled. No shrugging.' },
    { name: 'Barbell Curl', sets: 3, reps: '10-12', tempo: '2-0-1-0', rest: '1:30', rpe: '8', notes: 'Strict. No back swing.' },
    { name: 'Close-Grip Bench', sets: 3, reps: '10-12', tempo: '3-0-1-0', rest: '2:00', rpe: '8', notes: 'Elbows tucked. Tricep focus.' },
    { name: 'Incline DB Curl', sets: 3, reps: '12', tempo: '3-0-1-0', rest: '1:00', rpe: '8', notes: 'Max stretch at bottom.' },
    { name: 'Skull Crusher', sets: 3, reps: '12', tempo: '3-0-1-0', rest: '1:00', rpe: '8', notes: 'Lower to forehead. Controlled.' },
  ],
  legs_posterior: [
    { name: 'Romanian Deadlift', sets: 4, reps: '8-10', tempo: '3-1-1-0', rest: '2:30', rpe: '7-8', notes: 'Hinge. Feel the stretch.' },
    { name: 'Bulgarian Split Squat', sets: 3, reps: '10/leg', tempo: '3-0-1-0', rest: '2:00', rpe: '8', notes: 'Lean slightly forward for glutes.' },
    { name: 'Lying Leg Curl', sets: 3, reps: '10-12', tempo: '3-0-1-1', rest: '1:30', rpe: '8', notes: 'Squeeze at top.' },
    { name: 'Hip Thrust (barbell)', sets: 3, reps: '10-12', tempo: '2-0-1-2', rest: '2:00', rpe: '8', notes: 'Full lockout. 2 sec squeeze.' },
    { name: 'Standing Calf Raise', sets: 4, reps: '12-15', tempo: '2-1-1-2', rest: '1:00', rpe: '8', notes: 'Slow. Full range.' },
    { name: 'Cable Crunch', sets: 3, reps: '15', tempo: '2-0-1-1', rest: '1:00', rpe: '8', notes: 'Curl down. Squeeze abs.' },
  ],
};

// Phase 2 — progressive overload (heavier, fewer reps)
const PHASE2: Record<string, Exercise[]> = {
  push: [
    { name: 'Barbell Bench Press', sets: 5, reps: '6-8', tempo: '3-1-1-0', rest: '3:00', rpe: '8-9', notes: 'PR attempt weeks 7-8. Stay tight.' },
    { name: 'Incline DB Press (30°)', sets: 4, reps: '8-10', tempo: '3-0-1-0', rest: '2:00', rpe: '8-9', notes: 'Add 2.5 lbs each week.' },
    { name: 'Cable Fly (mid)', sets: 3, reps: '10-12', tempo: '2-0-1-2', rest: '1:30', rpe: '9', notes: 'Heavy. Peak contraction squeeze.' },
    { name: 'DB Shoulder Press', sets: 4, reps: '8-10', tempo: '2-0-1-0', rest: '2:00', rpe: '8-9', notes: 'Strict form, progressive load.' },
    { name: 'Lateral Raise (cable)', sets: 4, reps: '12-15', tempo: '2-0-1-1', rest: '1:00', rpe: '9', notes: 'Drop set on last set.' },
    { name: 'Rope Pushdown', sets: 3, reps: '10-12', tempo: '2-0-1-1', rest: '1:00', rpe: '9', notes: 'Increase load weekly.' },
    { name: 'Overhead Tricep Extension (cable)', sets: 3, reps: '10-12', tempo: '2-0-1-0', rest: '1:00', rpe: '9', notes: 'Full stretch. Max load.' },
  ],
  pull: [
    { name: 'Barbell Row (overhand)', sets: 5, reps: '6-8', tempo: '2-0-1-1', rest: '3:00', rpe: '8-9', notes: 'Explosive pull. Control eccentric.' },
    { name: 'Weighted Pull-Up', sets: 4, reps: '6-8', tempo: '3-0-1-0', rest: '2:30', rpe: '9', notes: 'Add weight each session.' },
    { name: 'Seated Cable Row (close grip)', sets: 3, reps: '8-10', tempo: '2-0-1-2', rest: '1:30', rpe: '9', notes: 'Heavy. Full scapular retraction.' },
    { name: 'Face Pull', sets: 3, reps: '12-15', tempo: '2-0-1-2', rest: '1:00', rpe: '8', notes: 'Shoulder health. Don\'t skip.' },
    { name: 'DB Curl (standing)', sets: 4, reps: '8-10', tempo: '2-0-1-0', rest: '1:30', rpe: '9', notes: 'Supinate hard. Squeeze peak.' },
    { name: 'Hammer Curl (incline)', sets: 3, reps: '10', tempo: '3-0-1-0', rest: '1:00', rpe: '9', notes: 'Add 2.5 lbs weekly.' },
    { name: 'Reverse Fly (rear delt)', sets: 3, reps: '12-15', tempo: '2-0-1-1', rest: '1:00', rpe: '9', notes: 'Controlled. No momentum.' },
  ],
  legs_quads: [
    { name: 'Barbell Back Squat', sets: 5, reps: '6-8', tempo: '3-1-1-0', rest: '3:30', rpe: '8-9', notes: 'Intensity phase. Brace hard. PR attempts.' },
    { name: 'Leg Press', sets: 4, reps: '8-10', tempo: '3-0-1-0', rest: '2:00', rpe: '9', notes: 'Heavy sets. Controlled lower.' },
    { name: 'Walking Lunge (DB)', sets: 4, reps: '10/leg', tempo: '2-0-1-0', rest: '1:30', rpe: '9', notes: 'Heavier DBs this phase.' },
    { name: 'Leg Extension (drop set)', sets: 3, reps: '10-12', tempo: '2-0-1-2', rest: '1:30', rpe: '9-10', notes: 'Drop set final set. Burn.' },
    { name: 'Calf Raise (seated)', sets: 4, reps: '12', tempo: '2-1-1-2', rest: '1:00', rpe: '9', notes: 'Add load weekly.' },
    { name: 'Hanging Leg Raise', sets: 3, reps: '10-12', tempo: '2-0-1-0', rest: '1:00', rpe: '9', notes: 'Weighted if possible.' },
  ],
  shoulders_arms: [
    { name: 'Standing OHP (barbell)', sets: 5, reps: '6-8', tempo: '2-0-1-0', rest: '3:00', rpe: '8-9', notes: 'PR phase. Strict form.' },
    { name: 'Arnold Press', sets: 3, reps: '8-10', tempo: '2-0-1-0', rest: '2:00', rpe: '9', notes: 'Heavy. Full rotation.' },
    { name: 'Lateral Raise (cable)', sets: 4, reps: '10-12', tempo: '2-0-1-1', rest: '1:00', rpe: '9-10', notes: 'Drop set last set.' },
    { name: 'Barbell Curl', sets: 4, reps: '8-10', tempo: '2-0-1-0', rest: '1:30', rpe: '9', notes: 'Add 2.5 lbs each week.' },
    { name: 'Close-Grip Bench', sets: 4, reps: '8-10', tempo: '3-0-1-0', rest: '2:00', rpe: '9', notes: 'Increase load. Tight elbows.' },
    { name: 'Incline DB Curl', sets: 3, reps: '10', tempo: '3-0-1-0', rest: '1:00', rpe: '9', notes: 'Max load. Controlled.' },
    { name: 'Skull Crusher', sets: 3, reps: '10', tempo: '3-0-1-0', rest: '1:00', rpe: '9', notes: 'Heavier this phase.' },
  ],
  legs_posterior: [
    { name: 'Romanian Deadlift', sets: 5, reps: '6-8', tempo: '3-1-1-0', rest: '3:00', rpe: '8-9', notes: 'Heavy RDLs. Max hamstring stretch.' },
    { name: 'Bulgarian Split Squat', sets: 4, reps: '8/leg', tempo: '3-0-1-0', rest: '2:00', rpe: '9', notes: 'Heavy DBs. Slow eccentric.' },
    { name: 'Lying Leg Curl', sets: 4, reps: '8-10', tempo: '3-0-1-1', rest: '1:30', rpe: '9', notes: 'Add load weekly.' },
    { name: 'Hip Thrust (barbell)', sets: 4, reps: '8-10', tempo: '2-0-1-2', rest: '2:00', rpe: '9', notes: 'Heavy. 2 sec squeeze at top.' },
    { name: 'Standing Calf Raise', sets: 4, reps: '10-12', tempo: '2-1-1-2', rest: '1:00', rpe: '9', notes: 'Heavy. Full range.' },
    { name: 'Cable Crunch', sets: 3, reps: '12-15', tempo: '2-0-1-1', rest: '1:00', rpe: '9', notes: 'Heavy cable. Squeeze hard.' },
  ],
};

// Phase 3 — shred (volume back up, intensity stays, metabolic focus)
const PHASE3: Record<string, Exercise[]> = {
  push: [
    { name: 'Barbell Bench Press', sets: 4, reps: '8-10', tempo: '3-1-1-0', rest: '2:00', rpe: '8', notes: 'Maintain strength. Short rest.' },
    { name: 'Incline DB Press (30°)', sets: 3, reps: '10-12', tempo: '3-0-1-0', rest: '1:30', rpe: '8', notes: 'Keep load from Phase 2.' },
    { name: 'Cable Fly (high-to-low)', sets: 3, reps: '12-15', tempo: '2-0-1-2', rest: '1:00', rpe: '9', notes: 'Pump. Squeeze hard.' },
    { name: 'DB Shoulder Press (superset)', sets: 3, reps: '10-12', tempo: '2-0-1-0', rest: '1:00', rpe: '8', notes: 'Superset with laterals.' },
    { name: 'Lateral Raise (DB superset)', sets: 3, reps: '15-20', tempo: '1-0-1-0', rest: '1:00', rpe: '9-10', notes: 'Light, high rep, metabolic.' },
    { name: 'Tricep Tri-set: Pushdown', sets: 3, reps: '15', tempo: '2-0-1-0', rest: '0:30', rpe: '9', notes: 'Tri-set: Pushdown → OH Ext → Dips.' },
    { name: 'Overhead Ext + Dips', sets: 3, reps: '15/AMRAP', tempo: '2-0-1-0', rest: '2:00', rpe: '9-10', notes: 'AMRAP dips at end. Burn it out.' },
  ],
  pull: [
    { name: 'Barbell Row', sets: 4, reps: '8-10', tempo: '2-0-1-1', rest: '2:00', rpe: '8', notes: 'Maintain Phase 2 load.' },
    { name: 'Pull-Up (bodyweight)', sets: 3, reps: 'AMRAP', tempo: '2-0-1-0', rest: '1:30', rpe: '9-10', notes: 'Max reps each set.' },
    { name: 'Seated Cable Row', sets: 3, reps: '12-15', tempo: '2-0-1-2', rest: '1:00', rpe: '9', notes: 'Shorter rest. Keep squeezing.' },
    { name: 'Face Pull', sets: 3, reps: '20', tempo: '1-0-1-2', rest: '0:45', rpe: '8', notes: 'High rep. Shoulder health.' },
    { name: 'DB Curl (21s)', sets: 3, reps: '21', tempo: 'varies', rest: '1:30', rpe: '9', notes: '7 bottom half, 7 top half, 7 full.' },
    { name: 'Hammer Curl', sets: 3, reps: '12-15', tempo: '2-0-1-0', rest: '1:00', rpe: '9', notes: 'Controlled. Shred phase pump.' },
    { name: 'Rear Delt Fly', sets: 3, reps: '15-20', tempo: '2-0-1-1', rest: '0:45', rpe: '9', notes: 'High rep. No momentum.' },
  ],
  legs_quads: [
    { name: 'Barbell Back Squat', sets: 4, reps: '10-12', tempo: '3-0-1-0', rest: '2:00', rpe: '8', notes: 'Slightly lighter, more reps, metabolic.' },
    { name: 'Leg Press (high foot)', sets: 4, reps: '12-15', tempo: '2-0-1-0', rest: '1:30', rpe: '9', notes: 'More glute activation.' },
    { name: 'Reverse Lunge (DB)', sets: 3, reps: '12/leg', tempo: '2-0-1-0', rest: '1:00', rpe: '9', notes: 'Control. Shorter rest.' },
    { name: 'Leg Extension (drop set)', sets: 3, reps: '15 + drop', tempo: '2-0-1-2', rest: '1:00', rpe: '9-10', notes: 'Burn it. 2 drops.' },
    { name: 'Calf Raise (superset)', sets: 4, reps: '20', tempo: '1-1-1-1', rest: '0:30', rpe: '9', notes: 'Superset seated + standing.' },
    { name: 'Ab Circuit', sets: 3, reps: 'circuit', tempo: '-', rest: '1:00', rpe: '9', notes: 'Leg raise + crunch + plank 45s.' },
  ],
  shoulders_arms: [
    { name: 'DB Shoulder Press', sets: 4, reps: '10-12', tempo: '2-0-1-0', rest: '1:30', rpe: '8', notes: 'Maintain Phase 2 strength.' },
    { name: 'Lateral Raise (3x rest-pause)', sets: 4, reps: '10+5+5', tempo: '2-0-1-1', rest: '1:30', rpe: '9-10', notes: 'Rest-pause: 10 reps, 15s, 5, 15s, 5.' },
    { name: 'Rear Delt Machine', sets: 3, reps: '15-20', tempo: '2-0-1-1', rest: '0:45', rpe: '9', notes: 'High rep for shred phase.' },
    { name: 'Barbell Curl', sets: 3, reps: '10-12', tempo: '2-0-1-0', rest: '1:00', rpe: '8-9', notes: 'Maintain load.' },
    { name: 'Incline DB Curl', sets: 3, reps: '12-15', tempo: '3-0-1-0', rest: '1:00', rpe: '9', notes: 'Full stretch. Slow.' },
    { name: 'Skull Crusher', sets: 3, reps: '12-15', tempo: '3-0-1-0', rest: '1:00', rpe: '9', notes: 'Maintain load, more reps.' },
    { name: 'Rope Pushdown (burnout)', sets: 2, reps: '20-25', tempo: '1-0-1-1', rest: '0:45', rpe: '10', notes: 'Finisher. Squeeze every rep.' },
  ],
  legs_posterior: [
    { name: 'Romanian Deadlift', sets: 4, reps: '10-12', tempo: '3-0-1-0', rest: '2:00', rpe: '8', notes: 'Moderate load, metabolic pace.' },
    { name: 'Bulgarian Split Squat', sets: 3, reps: '12/leg', tempo: '2-0-1-0', rest: '1:30', rpe: '9', notes: 'Shorter rest shred phase.' },
    { name: 'Lying Leg Curl', sets: 3, reps: '12-15', tempo: '2-0-1-1', rest: '1:00', rpe: '9', notes: 'Controlled. Squeeze.' },
    { name: 'Hip Thrust', sets: 3, reps: '12-15', tempo: '2-0-1-2', rest: '1:30', rpe: '9', notes: 'Heavy still. Squeeze at top.' },
    { name: 'Standing Calf Raise', sets: 4, reps: '15-20', tempo: '1-1-1-1', rest: '0:30', rpe: '9', notes: 'High rep shred burnout.' },
    { name: 'Cable Crunch', sets: 3, reps: '15-20', tempo: '2-0-1-1', rest: '0:45', rpe: '9', notes: 'Heavy. Abs are a muscle.' },
  ],
};

export const TRAINING_BY_PHASE: Record<number, Record<string, Exercise[]>> = {
  1: PHASE1,
  2: PHASE2,
  3: PHASE3,
};

// ============================================================
// DAILY SCHEDULES
// ============================================================
export const SCHEDULE_TRAINING: ScheduleItem[] = [
  {
    time: '7:00 AM', cat: 'WAKE', action: 'Alarm. Get up.', detail: 'Weigh yourself. Log it.',
    notes: [
      'Weigh on empty bladder — before food, water, or coffee.',
      'Same time, same conditions every day for accurate comparison.',
      'Single readings mean nothing. Your 7-day average is the signal.',
      'Log it in the app immediately so you don\'t forget.',
    ],
  },
  {
    time: '7:05 AM', cat: 'INJECTION', action: 'AM Peptides', detail: 'CJC-1295 100mcg + Ipa 100mcg + BPC-157/TB-500 Blend + MOTS-C ~1.7mg (M/W/F)',
    notes: [
      'Subcutaneous injection. Rotate sites daily (belly, thigh, glute) to prevent lipodystrophy.',
      'Must be fully fasted — insulin blunts GH release completely.',
      'CJC-1295 100mcg + Ipamorelin 100mcg — synergize for a stronger, more natural GH pulse.',
      'BPC-157/TB-500 Blend — every morning. Covers gut repair, connective tissue healing, and systemic recovery.',
      'MOTS-C ~1.7mg — Mon/Wed/Fri only (5mg/week total). Mitochondrial biogenesis and metabolic optimization.',
      'Can all go in one syringe if volumes allow.',
    ],
  },
  {
    time: '7:10 AM', cat: 'SUPPLEMENTS', action: 'AM Supps', detail: 'Probiotic, LMNT #1, Vitamin D3+K2',
    notes: [
      'Probiotic 50B+ CFU — take on empty stomach before any food for best colonization.',
      'LMNT — 1 packet in water. Replaces sodium, potassium, and magnesium lost overnight.',
      'Vitamin D3 5000 IU + K2 200mcg — always together. K2 directs calcium to bone, keeps it out of arteries.',
      'Take all three before cardio.',
    ],
  },
  {
    time: '7:15 AM', cat: 'CARDIO', action: 'Fasted LISS', detail: '25-40 min incline walk. Zone 2.',
    notes: [
      'Incline treadmill 10-15% grade, or outdoor walk with hills.',
      'Target HR: 125-145 bpm — Zone 2 for your size.',
      'Fasted state forces fat oxidation. This is the entire point.',
      'Water and LMNT only. No food, no pre-workout.',
      'Weeks 1-4: 25-30 min. Weeks 5-8: 30-35 min. Weeks 9-12: 35-40 min.',
    ],
  },
  {
    time: '8:00 AM', cat: 'MEAL', action: 'Meal 1 — Pre-Workout', detail: 'Eggs + rice. 40P/55C/15F.',
    notes: [
      'Whole eggs 3-4 (or add whites to hit protein) + white rice 150g cooked.',
      'Eat within 45 min of finishing LISS — glycogen window is open.',
      'White rice over brown here — faster digestion, quicker glycogen refuel before training.',
      'Goal: 40g protein / 55g carbs / 15g fat.',
      'Optional: add hot sauce, soy sauce, or salsa for flavor.',
    ],
  },
  {
    time: '8:30 AM', cat: 'SUPPLEMENTS', action: 'Pre-Workout', detail: 'Caffeine 200-300mg + Citrulline 6-8g. 30 min before training.',
    notes: [
      'Caffeine 200-300mg — 2 cups coffee, or 1 pill + 1 cup.',
      'Citrulline malate 6-8g — improves blood flow, pump, and endurance. Take 30 min before lifting.',
      'No additional stimulants or pre-workout blends with synephrine, yohimbine, etc.',
      'If training after 4pm, cap caffeine at 200mg. After 5pm, skip it entirely — it will tank your sleep.',
    ],
  },
  {
    time: '9:00 AM', cat: 'TRAINING', action: 'Training Session', detail: 'Follow the program. Log every set.',
    notes: [
      'Log every set: weight used, reps completed, and subjective RPE.',
      'Progressive overload is the entire mechanism. If you don\'t track, you can\'t progress.',
      'Missed reps = do not increase weight next session.',
      'Crushed it at RPE 7 or below = increase weight next session.',
      'Rest times are prescribed — respect them. Early fatigue means the rest was too short.',
    ],
  },
  {
    time: '10:30 AM', cat: 'SUPPLEMENTS', action: 'Post-Workout Supps', detail: 'Creatine 5g + EAAs during workout.',
    notes: [
      'Creatine monohydrate 5g — mix in water or add to your shake. Timing is flexible, post-workout is fine.',
      'No loading phase needed. 5g/day consistent is all you need.',
      'EAAs 10-15g — sip during the session if training exceeds 60 min to blunt catabolism.',
      'Skip the fancy flavored creatine — plain monohydrate is clinically identical.',
    ],
  },
  {
    time: '11:00 AM', cat: 'MEAL', action: 'Meal 2 — Post-Workout Shake', detail: 'Whey isolate 2 scoops + banana. 50P/35C/5F.',
    notes: [
      'Whey isolate (not concentrate) — faster absorption, less fat, less GI stress.',
      '2 scoops in water + 1 medium banana. Blend or shake.',
      'Get this in within 30-60 min post-training — the speed of this meal matters.',
      'This is your most anabolic window. Don\'t replace it with real food.',
      'Goal: 50g protein / 35g carbs / 5g fat.',
    ],
  },
  {
    time: '1:30 PM', cat: 'MEAL', action: 'Meal 3 — Lunch', detail: 'Chicken + rice + veggies. 50P/50C/15F.',
    notes: [
      'Chicken breast or thigh 200-220g cooked (batch prepped from Sunday).',
      'White rice 150g cooked.',
      'Veggies: broccoli, zucchini, green beans, or mixed greens.',
      'Largest carb meal of the day — muscles are still absorbing glycogen from training.',
      'Goal: 50g protein / 50g carbs / 15g fat.',
    ],
  },
  {
    time: '2:00 PM', cat: 'RECOVERY', action: 'Post-Lunch Walk', detail: '10 min. Non-negotiable.',
    notes: [
      '10-15 min walk immediately after eating.',
      'Blunts blood sugar spike from the carb-heavy lunch.',
      'Improves insulin sensitivity over time — peer-reviewed data backs this.',
      'Easy pace. This is not a workout, it\'s digestion support.',
    ],
  },
  {
    time: '5:00 PM', cat: 'MEAL', action: 'Meal 4 — Afternoon', detail: 'Ground turkey or fish + carbs + veggies. 50P/45C/15F.',
    notes: [
      'Protein: ground turkey 93/7, salmon, tilapia, shrimp, or white fish.',
      'Carbs: rice (smaller portion than lunch), sweet potato, or fruit.',
      'Veggies: whatever you have — volume and fiber.',
      'Start pulling carbs down vs. Meal 3. Insulin sensitivity decreases in the evening.',
      'No liquid carbs — juice, sports drinks, sweetened anything.',
      'Goal: 50g protein / 45g carbs / 15g fat.',
    ],
  },
  {
    time: '9:00 PM', cat: 'MEAL', action: 'Meal 5 — Pre-Bed', detail: 'Casein or cottage cheese + PB. 40P/15C/20F.',
    notes: [
      'Option A: 1 scoop casein protein in water.',
      'Option B: 1 cup cottage cheese + 1 tbsp natural peanut butter.',
      'Casein digests over 6-8 hours — feeds muscles through the night.',
      'Low glycemic. No blood sugar spike before sleep.',
      'Directly supports the GH pulse triggered by your PM peptides.',
      'Goal: 40g protein / 15g carbs / 20g fat.',
    ],
  },
  {
    time: '9:30 PM', cat: 'SUPPLEMENTS', action: 'PM Supps', detail: 'Magnesium 400mg, L-Theanine 200mg, Psyllium husk 1 tbsp.',
    notes: [
      'Magnesium Glycinate 400mg — improves deep sleep, reduces muscle cramping, supports testosterone.',
      'L-Theanine 200mg — calms the nervous system without sedation. Pairs well with the magnesium.',
      'Psyllium Husk 1 tbsp in water — gut health, regularity, and improves next-day insulin sensitivity.',
      'Take 20-30 min before your PM injection window.',
    ],
  },
  {
    time: '10:00 PM', cat: 'INJECTION', action: 'PM Peptides', detail: 'Tesamorelin 2mg + CJC/Ipa 100/100mcg + BPC-157/TB-500 Blend (2hr fasted).',
    notes: [
      'Must be 2+ hours fasted — insulin completely blocks GH release.',
      'Inject Tesamorelin first. It\'s sensitive to agitation — reconstitute gently, no shaking.',
      'Wait 5-10 min, then CJC/Ipa 100/100mcg + BPC-157/TB-500 Blend in one syringe.',
      'Tesamorelin directly targets visceral fat and amplifies GH output.',
      'This PM window + slow-wave sleep = 80% of your daily GH release. Protect it.',
    ],
  },
  {
    time: '10:30 PM', cat: 'RECOVERY', action: 'Wind Down', detail: 'Phone away. Room 65-68°F.',
    notes: [
      'Phone in another room, or grayscale + night shift mode at minimum.',
      'Set room to 65-68°F — core temp must drop 1-2°F to enter deep sleep.',
      'Blue light suppresses melatonin. Screen time at 10pm directly delays sleep onset.',
      'Blackout curtains if possible. Even ambient light disrupts sleep architecture.',
    ],
  },
  {
    time: '10:45 PM', cat: 'SLEEP', action: 'Lights Out', detail: '7.5-8.5 hours. Non-negotiable.',
    notes: [
      '80% of daily GH release happens during slow-wave sleep.',
      'Cutting sleep by 90 min measurably reduces testosterone and increases cortisol.',
      'Muscle repair, glycogen synthesis, and memory consolidation all require 7.5+ hours.',
      'If results are stalling and you\'re sleeping under 7 hours, sleep is the first fix.',
    ],
  },
];

export const SCHEDULE_REST: ScheduleItem[] = [
  {
    time: '7:00 AM', cat: 'WAKE', action: 'Alarm. Rest day.', detail: 'Weigh yourself. Log it.',
    notes: [
      'Same drill as training days — empty bladder, same time, before eating.',
      'Rest days often show lower scale weight due to less glycogen and water retention.',
      'Don\'t read into single readings. Track the 7-day trend.',
    ],
  },
  {
    time: '7:05 AM', cat: 'INJECTION', action: 'AM Peptides', detail: 'CJC-1295 100mcg + Ipa 100mcg + BPC-157/TB-500 Blend.',
    notes: [
      'CJC/Ipa every weekday (Mon-Fri). Skip on weekends.',
      'BPC-157/TB-500 Blend every day — rest days are when the repair work actually happens. Don\'t skip it.',
      'MOTS-C Mon/Wed/Fri only — check day before injecting.',
      'Fasted injection. Rotate sites.',
    ],
  },
  {
    time: '7:10 AM', cat: 'SUPPLEMENTS', action: 'AM Supps', detail: 'Probiotic, LMNT #1, Vitamin D3+K2.',
    notes: [
      'Probiotic 50B+ CFU — empty stomach before food.',
      'LMNT 1 packet in water.',
      'Vitamin D3 5000 IU + K2 200mcg.',
      'Same every day. Supplements don\'t take rest days.',
    ],
  },
  {
    time: '7:30 AM', cat: 'MEAL', action: 'Meal 1', detail: 'Eggs + avocado. Higher fat, lower carb.',
    notes: [
      'Whole eggs 3-4 + half avocado.',
      'Carbs are reduced on rest days — you\'re not fueling a training session.',
      'Higher fat this morning supports hormone production and keeps you full longer.',
      'No rice, oats, or toast at this meal.',
    ],
  },
  {
    time: '9:00 AM', cat: 'CARDIO', action: 'Outdoor Walk', detail: '30-40 min. Easy pace. Get sun.',
    notes: [
      'Get outside — sunlight in the AM anchors your circadian rhythm.',
      'Easy conversational pace only. HR should stay under 120.',
      'This is active recovery, not a workout. No hills, no incline protocol.',
      'Direct sunlight helps melatonin timing, which means better sleep tonight.',
    ],
  },
  {
    time: '10:00 AM', cat: 'RECOVERY', action: 'Foam Roll + Stretch', detail: '15 min foam rolling, dynamic stretching.',
    notes: [
      'Focus on what you trained yesterday: quads, hamstrings, glutes, thoracic spine, hip flexors.',
      'Foam roll slowly — 30-60 sec per spot. Move through tension, don\'t just sit on it.',
      'Follow with dynamic stretches: leg swings, hip circles, shoulder circles.',
      'This directly reduces DOMS and improves performance in tomorrow\'s session.',
    ],
  },
  {
    time: '12:00 PM', cat: 'MEAL', action: 'Meal 2 — Lunch', detail: 'Lean protein + veggies + fats.',
    notes: [
      'Protein: chicken breast or fish 200g cooked.',
      'Veggies: leafy greens, broccoli, cucumbers, or mixed salad.',
      'Fat: olive oil drizzle, avocado, or handful of nuts.',
      'Lower carbs today — body doesn\'t need glycogen replenishment on a rest day.',
    ],
  },
  {
    time: '3:00 PM', cat: 'MEAL', action: 'Meal 3 — Afternoon', detail: 'Protein + moderate carbs.',
    notes: [
      'Protein stays the same every day regardless of training status.',
      'Reintroduce some carbs here if energy is low: sweet potato, fruit, or small rice portion.',
      'Keep it moderate — you\'re not in a post-workout glycogen replenishment window.',
    ],
  },
  {
    time: '5:00 PM', cat: 'RECOVERY', action: 'Sauna (if available)', detail: '15-20 min. Hydrate with LMNT.',
    notes: [
      '15-20 min at 170-190°F.',
      'Sauna 3-4x/week is shown to increase GH output by 2-5x in research.',
      'Drink LMNT before and after — you lose 500-800ml of fluid per session.',
      'Cool down slowly. Don\'t go directly from sauna to cold plunge on a hard training week.',
    ],
  },
  {
    time: '7:00 PM', cat: 'MEAL', action: 'Meal 4 — Dinner', detail: 'Lean protein + veggies.',
    notes: [
      'Protein: ground turkey, salmon, shrimp, or white fish.',
      'Veggies: whatever you have — prioritize fiber and micronutrients.',
      'Keep fat moderate. No need to chase carbs tonight.',
    ],
  },
  {
    time: '8:30 PM', cat: 'MEAL', action: 'Meal 5 — Pre-Bed', detail: 'Casein or cottage cheese.',
    notes: [
      'Option A: 1 scoop casein in water.',
      'Option B: 1 cup cottage cheese (skip PB if keeping calories tight on rest days).',
      'Slow-digesting protein is just as critical on rest days — this is when repair happens.',
    ],
  },
  {
    time: '8:30 PM', cat: 'SUPPLEMENTS', action: 'PM Supps', detail: 'Magnesium 400mg, L-Theanine 200mg, Psyllium husk 1 tbsp.',
    notes: [
      'Magnesium Glycinate 400mg.',
      'L-Theanine 200mg.',
      'Psyllium Husk 1 tbsp in water.',
      'Same every day. Consistency is the whole point.',
    ],
  },
  {
    time: '9:00 PM', cat: 'INJECTION', action: 'PM Peptides', detail: 'Tesamorelin 2mg + CJC/Ipa + BPC-157/TB-500 Blend.',
    notes: [
      '2+ hours fasted — non-negotiable.',
      'Rest days are prime time for the Tesamorelin + GH combo. No training competing for resources.',
      'Inject Tesamorelin first, wait 5-10 min.',
      'Then CJC/Ipa + BPC-157/TB-500 Blend in one syringe.',
    ],
  },
  {
    time: '9:45 PM', cat: 'SLEEP', action: 'Lights Out', detail: 'Sleep.',
    notes: [
      'Earlier bedtime on rest days if possible.',
      'Recovery and adaptation from yesterday\'s training happens during sleep — that\'s the whole point of a rest day.',
      '7.5 hours minimum.',
    ],
  },
];

export const SCHEDULE_SUNDAY: ScheduleItem[] = [
  {
    time: '7:00 AM', cat: 'WAKE', action: 'Sunday. Weigh in.', detail: 'Weigh yourself. Log 7-day average.',
    notes: [
      'Sunday weigh-in is the weekly anchor.',
      'Log today\'s weight and calculate the 7-day average — that\'s what we track, not single readings.',
      'Expect day-to-day variability. The trend line over weeks is the truth.',
    ],
  },
  {
    time: '7:05 AM', cat: 'INJECTION', action: 'AM Peptides', detail: 'BPC-157/TB-500 Blend (daily). No CJC/Ipa or MOTS-C on Sundays.',
    notes: [
      'BPC-157/TB-500 Blend — every day including Sunday.',
      'CJC/Ipa is weekdays only (Mon-Fri). Skip today.',
      'MOTS-C is Mon/Wed/Fri only. Skip today.',
      'Fasted injection. Rotate sites.',
    ],
  },
  {
    time: '7:30 AM', cat: 'MEAL', action: 'Meal 1', detail: 'Eggs + oats or rice.',
    notes: [
      'Eggs 3-4 + oats 50g dry, or a small portion of rice.',
      'Moderate carbs — Sunday is a lighter activity day.',
      'Fuel yourself without overdoing it before meal prep.',
    ],
  },
  {
    time: '9:00 AM', cat: 'CARDIO', action: 'Walk', detail: '30-40 min outdoor walk.',
    notes: [
      'Outdoor only if possible. Morning sun is a free performance tool.',
      'Easy pace — HR under 120. Mental reset as much as physical.',
      'Sets your circadian rhythm for the week ahead.',
    ],
  },
  {
    time: '11:00 AM', cat: 'PREP', action: 'Meal Prep', detail: 'Cook protein, prep carbs, portion meals for the week.',
    notes: [
      'Batch cook 1.5-2kg chicken breast or turkey.',
      'Cook 1-2kg white rice.',
      'Wash and prep veggies.',
      'Portion into containers for Mon-Fri.',
      '90 min of work Sunday = no decision fatigue or macro misses all week.',
      'No prep = no compliance. This is non-negotiable.',
    ],
  },
  {
    time: '12:30 PM', cat: 'MEAL', action: 'Meal 2 — Lunch', detail: 'Protein + carbs + veggies.',
    notes: [
      'First meal straight from your prep.',
      'Chicken or turkey + rice + veggies.',
      'Sunday is not a cheat day. Stay on protocol.',
    ],
  },
  {
    time: '3:00 PM', cat: 'MEAL', action: 'Meal 3', detail: 'Protein + moderate carbs.',
    notes: [
      'Protein constant — same as every day.',
      'Moderate carbs: small rice portion, sweet potato, or fruit.',
      'Veggies for volume and fiber.',
    ],
  },
  {
    time: '5:00 PM', cat: 'INJECTION', action: 'Retatrutide Injection', detail: 'Weekly Retatrutide dose. Rotate injection site.',
    notes: [
      'Weekly injection, always Sunday evening.',
      'Rotate between belly, thigh, and glute to prevent site irritation.',
      'Reta causes mild GI effects (nausea, reduced appetite) for 12-24 hrs.',
      'Timing it Sunday puts the peak side effect window on Sunday night — not a workday.',
      'BPC-157/TB-500 Blend covers connective tissue repair and is in your AM injection.',
    ],
  },
  {
    time: '7:00 PM', cat: 'MEAL', action: 'Meal 4 — Dinner', detail: 'Light. Avoid high-fat post-Reta.',
    notes: [
      'Keep it lean and light post-Retatrutide.',
      'Reta slows gastric emptying — high-fat meals on top increase nausea risk.',
      'Lean protein (chicken, fish) + veggies.',
      'Skip olive oil drizzle and any added fats tonight.',
    ],
  },
  {
    time: '8:00 PM', cat: 'CHECKIN', action: 'Weekly Check-In', detail: 'Submit weight avg, photos, adherence, measurements.',
    notes: [
      '7-day weight average — log in the app.',
      'Adherence score for the week (honest estimate %).',
      'Notes for Coach V: energy, digestion, sleep quality, any issues.',
      'Photos every 2 weeks — same lighting, same poses, same time of day.',
      'Measurements (waist, chest, arms) monthly.',
      'This data is how the program gets adjusted. Don\'t skip it.',
    ],
  },
  {
    time: '8:30 PM', cat: 'MEAL', action: 'Meal 5 — Pre-Bed', detail: 'Casein. Keep it light (Reta GI).',
    notes: [
      'Casein protein 1 scoop in water.',
      'If Reta GI is still active, keep it liquid only.',
      'If feeling totally fine, 1 cup cottage cheese is okay.',
      'Keep it small tonight.',
    ],
  },
  {
    time: '9:00 PM', cat: 'INJECTION', action: 'PM Peptides', detail: 'Tesamorelin 2mg + BPC-157/TB-500 Blend. (No CJC/Ipa Sundays.)',
    notes: [
      '2+ hours fasted.',
      'Tesamorelin first — reconstitute gently, no shaking.',
      'Wait 5-10 min, then BPC-157/TB-500 Blend.',
      'No CJC/Ipa on Sundays.',
      'Tesa + Reta work synergistically on fat loss through different mechanisms. Intentional combination.',
    ],
  },
  {
    time: '9:45 PM', cat: 'SLEEP', action: 'Lights Out', detail: 'Early bed. Big week ahead.',
    notes: [
      'Earlier bedtime tonight if possible.',
      'Sleep debt going into Monday cascades all week — energy, training performance, recovery, and hunger regulation all suffer.',
      '7.5 hours minimum. 8.5 is better.',
    ],
  },
];

export const SUPPLEMENTS = [
  'Creatine 5g (post-workout)',
  'Whey Isolate 2 scoops (post-workout)',
  'Omega-3 3g EPA/DHA (with meal)',
  'Vitamin D3 5000 IU + K2 200mcg',
  'Magnesium Glycinate 400mg (bed)',
  'L-Theanine 200mg (bed)',
  'LMNT Electrolytes (2-3 packets)',
  'Probiotic 50B+ CFU (AM empty stomach)',
  'Digestive Enzymes (meals 3 & 4)',
  'Psyllium Husk 1 tbsp (bed)',
  'Pre-workout Caffeine + Citrulline',
  'Intra-workout EAAs 10-15g',
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function getDateObj(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateLong(dateStr: string): string {
  return getDateObj(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

export function addDays(dateStr: string, n: number): string {
  const d = getDateObj(dateStr);
  d.setDate(d.getDate() + n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getWeekNumber(dateStr: string): number {
  const start = getDateObj(START_DATE);
  const current = getDateObj(dateStr);
  const diff = Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(12, Math.floor(diff / 7) + 1));
}

export function getPhase(week: number): number {
  return week <= 4 ? 1 : week <= 8 ? 2 : 3;
}

export function getDayType(dateStr: string): DayType {
  const dow = getDateObj(dateStr).getDay();
  return DOW_TO_TYPE[dow];
}

export function isTrainingDay(type: DayType): boolean {
  return !['rest', 'sunday'].includes(type);
}

export function getPeptideList(dateStr: string): Array<{ key: string; label: string }> {
  const dow = getDateObj(dateStr).getDay();
  const list: Array<{ key: string; label: string }> = [];
  // CJC/Ipa 5on/2off — off Sat(6) and Sun(0)
  if (dow !== 0 && dow !== 6) {
    list.push({ key: 'am_cjc_ipa', label: 'AM — CJC-1295 + Ipamorelin (100/100mcg)' });
  }
  list.push({ key: 'am_bpc', label: 'AM — BPC-157/TB-500 Blend' });
  if ([1, 3, 5].includes(dow)) {
    list.push({ key: 'am_motsc', label: 'AM — MOTS-C (~1.7mg | 5mg/wk total)' });
  }
  list.push({ key: 'pm_tesa', label: 'PM — Tesamorelin (2mg)' });
  if (dow !== 0 && dow !== 6) {
    list.push({ key: 'pm_cjc_ipa', label: 'PM — CJC-1295 + Ipamorelin (100/100mcg)' });
  }
  list.push({ key: 'pm_bpc', label: 'PM — BPC-157/TB-500 Blend' });
  if (dow === 0) list.push({ key: 'reta', label: 'Retatrutide (weekly dose)' });
  return list;
}

export function getScheduleForDay(type: DayType): ScheduleItem[] {
  if (type === 'sunday') return SCHEDULE_SUNDAY;
  if (isTrainingDay(type)) return SCHEDULE_TRAINING;
  return SCHEDULE_REST;
}

// ============================================================
// SHOPPING LIST — Phase-aware weekly grocery list
// ============================================================
export interface ShoppingItem {
  name: string;
  qty: string;
  cost: string;
  notes: string;
}

export interface ShoppingCategory {
  category: string;
  items: ShoppingItem[];
}

const SHOPPING_PHASE1: ShoppingCategory[] = [
  {
    category: 'PROTEIN — MEAT & FISH',
    items: [
      { name: 'Chicken breast (boneless, skinless)', qty: '4 lbs', cost: '$16-22', notes: 'Lunch/dinner protein' },
      { name: 'Egg whites (carton, liquid)', qty: '1 carton (32 oz)', cost: '$5-6', notes: 'Supplement whole eggs' },
      { name: '96% lean ground beef', qty: '2 lbs', cost: '$14-16', notes: 'Two meals across the week' },
      { name: '93% lean ground turkey', qty: '2 lbs', cost: '$10-12', notes: 'Wed + Sun dinners' },
      { name: 'Tilapia fillets', qty: '1 lb (2 fillets)', cost: '$8-10', notes: 'Bake Sunday' },
      { name: 'Cod fillets', qty: '1 lb (2 fillets)', cost: '$10-12', notes: 'Bake Wednesday' },
      { name: 'Salmon fillet', qty: '8 oz (1 fillet)', cost: '$8-10', notes: 'Thursday dinner. Fresh.' },
      { name: 'Shrimp (peeled, deveined)', qty: '8 oz', cost: '$6-8', notes: 'Wednesday dinner' },
      { name: 'Flank steak', qty: '8 oz', cost: '$8-10', notes: 'Thursday lunch. Grill Wed night.' },
      { name: 'Sirloin steak', qty: '8 oz', cost: '$8-10', notes: 'Saturday dinner. Cook fresh.' },
      { name: 'Smoked salmon', qty: '6 oz', cost: '$8-10', notes: 'Sunday breakfast' },
      { name: 'Whole eggs (large)', qty: '3 dozen (36)', cost: '$12-15', notes: 'Training day breakfast + weekends. Buy bulk.' },
    ],
  },
  {
    category: 'PROTEIN — DAIRY & SUPPLEMENTS',
    items: [
      { name: 'Whey isolate protein', qty: '1 tub (ongoing)', cost: '$50-60/mo', notes: 'Momentous or Transparent Labs' },
      { name: 'Casein protein', qty: '1 tub (ongoing)', cost: '$40-50/mo', notes: 'Before-bed protein' },
      { name: 'Low-fat cottage cheese (2%)', qty: '64 oz (2 large tubs)', cost: '$10-12', notes: '5 servings/week. Staple.' },
      { name: 'Greek yogurt (0% fat, plain)', qty: '6 oz container', cost: '$2', notes: 'Friday Meal 5 only' },
      { name: 'EAA powder (intra-workout)', qty: '1 tub (ongoing)', cost: '$35-40/mo', notes: 'Kion or Transparent Labs' },
    ],
  },
  {
    category: 'CARBS — GRAINS & STARCHES',
    items: [
      { name: 'White jasmine rice (dry)', qty: '3 lbs', cost: '$4-5', notes: 'Cook 8+ cups per batch' },
      { name: 'Old-fashioned oats', qty: '1 canister', cost: '$4-5', notes: 'Post-workout shakes. Lasts 2+ wks.' },
      { name: 'Sweet potatoes', qty: '3 lbs (4-5 medium)', cost: '$4-5', notes: 'Bake whole Sunday' },
      { name: 'White potatoes', qty: '2 lbs (2-3 medium)', cost: '$3-4', notes: 'Bake alongside sweets' },
      { name: 'Ezekiel bread (frozen)', qty: '1 loaf', cost: '$5-6', notes: 'Sat + Sun breakfasts' },
      { name: 'Rice cakes (plain)', qty: '1 pack', cost: '$3-4', notes: 'Wednesday post-workout' },
      { name: 'Cyclic dextrin', qty: '1 bag (ongoing)', cost: '$30-35/mo', notes: 'Intra-workout carbs on leg days' },
    ],
  },
  {
    category: 'FRUITS',
    items: [
      { name: 'Bananas', qty: '5-6', cost: '$2-3', notes: 'Post-workout shakes + snacks' },
      { name: 'Frozen blueberries', qty: '1 bag (16 oz)', cost: '$4-5', notes: 'Tuesday shake' },
      { name: 'Frozen mango chunks', qty: '1 bag (16 oz)', cost: '$4-5', notes: 'Friday shake' },
      { name: 'Apples (large)', qty: '1-2', cost: '$2', notes: 'Saturday Meal 3' },
    ],
  },
  {
    category: 'VEGETABLES',
    items: [
      { name: 'Broccoli (fresh or frozen)', qty: '2 lbs', cost: '$4-5', notes: 'Steam in bulk. Multiple meals.' },
      { name: 'Green beans (fresh or frozen)', qty: '1 lb', cost: '$3-4', notes: 'Tues + Fri meals' },
      { name: 'Asparagus', qty: '1 bunch', cost: '$4-5', notes: 'Tues + Sun meals' },
      { name: 'Mixed greens (pre-washed)', qty: '2 bags (10 oz ea)', cost: '$6-8', notes: 'Salads for Meal 4' },
      { name: 'Bell peppers (mixed)', qty: '3-4', cost: '$4-5', notes: 'Roast in bulk. Wed + Sun.' },
      { name: 'Zucchini', qty: '2 medium', cost: '$2-3', notes: 'Friday dinner' },
      { name: 'Spinach (fresh)', qty: '1 bag (10 oz)', cost: '$3-4', notes: 'Thursday dinner sauté' },
      { name: 'Mixed frozen vegetables', qty: '1 bag (16 oz)', cost: '$3-4', notes: 'Saturday lunch' },
    ],
  },
  {
    category: 'FATS & OILS',
    items: [
      { name: 'Extra virgin olive oil', qty: '1 bottle (ongoing)', cost: '$8-10', notes: 'Cooking + dressings' },
      { name: 'Coconut oil', qty: '1 jar (ongoing)', cost: '$6-8', notes: 'Lasts a month' },
      { name: 'Natural almond butter', qty: '1 jar (16 oz)', cost: '$8-10', notes: 'Meal 5 staple. No sugar added.' },
      { name: 'Natural peanut butter', qty: '1 jar (16 oz)', cost: '$5-7', notes: 'Alternate with almond butter' },
      { name: 'Avocados', qty: '2', cost: '$3-4', notes: 'Tues + Sun. Buy firm.' },
      { name: 'Butter (grass-fed)', qty: '1 stick', cost: '$3-4', notes: 'Minimal use. Tues + Thurs.' },
      { name: 'Balsamic vinaigrette', qty: '1 bottle (ongoing)', cost: '$4-5', notes: 'Salad dressing' },
    ],
  },
  {
    category: 'CONDIMENTS & MISC',
    items: [
      { name: 'Honey', qty: '1 bottle (ongoing)', cost: '$5-6', notes: 'Tuesday shake' },
      { name: 'Strawberry jam', qty: '1 jar (ongoing)', cost: '$4-5', notes: 'Wed post-workout rice cakes' },
      { name: 'Salt, pepper, garlic powder, paprika', qty: 'Pantry staples', cost: '—', notes: 'Season everything' },
      { name: 'Cooking spray (avocado oil)', qty: '1 can', cost: '$5-6', notes: 'Eggs + quick pan meals' },
    ],
  },
  {
    category: 'SUPPLEMENTS (Monthly Restock)',
    items: [
      { name: 'Creatine monohydrate (Creapure)', qty: '1 tub', cost: '$25-30/mo', notes: '5g daily' },
      { name: 'LMNT electrolyte packets', qty: '1 box (30 ct)', cost: '$35-40/mo', notes: '2-3/day. Non-negotiable.' },
      { name: 'Omega-3 fish oil (Nordic Naturals)', qty: '1 bottle', cost: '$25-30/mo', notes: '3g EPA/DHA daily' },
      { name: 'Vitamin D3 + K2 (Thorne)', qty: '1 bottle', cost: '$15-20/mo', notes: '5,000 IU D3 + 200mcg K2' },
      { name: 'Magnesium Glycinate (400mg)', qty: '1 bottle', cost: '$15-18/mo', notes: 'Before bed. Sleep quality.' },
      { name: 'L-Theanine (200mg)', qty: '1 bottle', cost: '$12-15/mo', notes: 'Before bed. Stacks with Mag.' },
      { name: 'Probiotic (Seed DS-01)', qty: '1 bottle', cost: '$50/mo', notes: 'Morning, empty stomach' },
      { name: 'Digestive enzymes (NOW Super Enzymes)', qty: '1 bottle', cost: '$12-15/mo', notes: 'With Meals 3 & 4' },
      { name: 'Psyllium husk', qty: '1 canister', cost: '$10-12/mo', notes: '1 tbsp before bed' },
      { name: 'L-Citrulline (bulk)', qty: '1 bag', cost: '$20-25/mo', notes: '6-8g pre-workout' },
      { name: 'Pre-workout (Gorilla Mode)', qty: '1 tub', cost: '$40-50/mo', notes: 'Or black coffee + citrulline' },
    ],
  },
];

export const SHOPPING_BY_PHASE: Record<number, ShoppingCategory[]> = {
  1: SHOPPING_PHASE1,
  2: SHOPPING_PHASE1, // Same base list — adjustments in Phase 2/3 TBD
  3: SHOPPING_PHASE1,
};

export const WEEKLY_COST_ESTIMATE = { food: '$150-200', supplements: '$260-320/mo' };

export const CAT_COLORS: Record<string, string> = {
  WAKE: '#a0aec0',
  INJECTION: '#e53e3e',
  SUPPLEMENTS: '#d69e2e',
  CARDIO: '#38a169',
  MEAL: '#4299e1',
  TRAINING: '#e53e3e',
  RECOVERY: '#9f7aea',
  SLEEP: '#667eea',
  PREP: '#ed8936',
  CHECKIN: '#e53e3e',
};
