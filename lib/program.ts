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
  { time: '7:00 AM', cat: 'WAKE', action: 'Alarm. Get up.', detail: 'Weigh yourself. Log it.' },
  { time: '7:05 AM', cat: 'INJECTION', action: 'AM Peptides', detail: 'CJC-1295 100mcg + Ipa 100mcg + BPC-157 250mcg + MOTS-C 10mg (M/W/F)' },
  { time: '7:10 AM', cat: 'SUPPLEMENTS', action: 'AM Supps', detail: 'Probiotic, LMNT #1, Vitamin D3+K2' },
  { time: '7:15 AM', cat: 'CARDIO', action: 'Fasted LISS', detail: '25-40 min incline walk. Zone 2.' },
  { time: '8:00 AM', cat: 'MEAL', action: 'Meal 1 — Pre-Workout', detail: 'Eggs + rice. 40P/55C/15F.' },
  { time: '8:30 AM', cat: 'SUPPLEMENTS', action: 'Pre-Workout', detail: 'Caffeine 200-300mg + Citrulline 6-8g. 30 min before training.' },
  { time: '9:00 AM', cat: 'TRAINING', action: 'Training Session', detail: 'Follow the program. Log every set.' },
  { time: '10:30 AM', cat: 'SUPPLEMENTS', action: 'Post-Workout Supps', detail: 'Creatine 5g + EAAs during workout.' },
  { time: '11:00 AM', cat: 'MEAL', action: 'Meal 2 — Post-Workout Shake', detail: 'Whey isolate 2 scoops + banana. 50P/35C/5F.' },
  { time: '1:30 PM', cat: 'MEAL', action: 'Meal 3 — Lunch', detail: 'Chicken + rice + veggies. 50P/50C/15F.' },
  { time: '2:00 PM', cat: 'RECOVERY', action: 'Post-Lunch Walk', detail: '10 min. Non-negotiable.' },
  { time: '5:00 PM', cat: 'MEAL', action: 'Meal 4 — Afternoon', detail: 'Ground turkey or fish + carbs + veggies. 50P/45C/15F.' },
  { time: '9:00 PM', cat: 'MEAL', action: 'Meal 5 — Pre-Bed', detail: 'Casein or cottage cheese + PB. 40P/15C/20F.' },
  { time: '9:30 PM', cat: 'SUPPLEMENTS', action: 'PM Supps', detail: 'Magnesium 400mg, L-Theanine 200mg, Psyllium husk 1 tbsp.' },
  { time: '10:00 PM', cat: 'INJECTION', action: 'PM Peptides', detail: 'Tesamorelin 2mg + CJC/Ipa 100/100mcg + BPC-157 250mcg (2hr fasted).' },
  { time: '10:30 PM', cat: 'RECOVERY', action: 'Wind Down', detail: 'Phone away. Room 65-68°F.' },
  { time: '10:45 PM', cat: 'SLEEP', action: 'Lights Out', detail: '7.5-8.5 hours. Non-negotiable.' },
];

export const SCHEDULE_REST: ScheduleItem[] = [
  { time: '7:00 AM', cat: 'WAKE', action: 'Alarm. Rest day.', detail: 'Weigh yourself. Log it.' },
  { time: '7:05 AM', cat: 'INJECTION', action: 'AM Peptides', detail: 'CJC-1295 100mcg + Ipa 100mcg + BPC-157 250mcg (if on-day).' },
  { time: '7:10 AM', cat: 'SUPPLEMENTS', action: 'AM Supps', detail: 'Probiotic, LMNT #1, Vitamin D3+K2.' },
  { time: '7:30 AM', cat: 'MEAL', action: 'Meal 1', detail: 'Eggs + avocado. Higher fat, lower carb.' },
  { time: '9:00 AM', cat: 'CARDIO', action: 'Outdoor Walk', detail: '30-40 min. Easy pace. Get sun.' },
  { time: '10:00 AM', cat: 'RECOVERY', action: 'Foam Roll + Stretch', detail: '15 min foam rolling, dynamic stretching.' },
  { time: '12:00 PM', cat: 'MEAL', action: 'Meal 2 — Lunch', detail: 'Lean protein + veggies + fats.' },
  { time: '3:00 PM', cat: 'MEAL', action: 'Meal 3 — Afternoon', detail: 'Protein + moderate carbs.' },
  { time: '5:00 PM', cat: 'RECOVERY', action: 'Sauna (if available)', detail: '15-20 min. Hydrate with LMNT.' },
  { time: '7:00 PM', cat: 'MEAL', action: 'Meal 4 — Dinner', detail: 'Lean protein + veggies.' },
  { time: '8:30 PM', cat: 'MEAL', action: 'Meal 5 — Pre-Bed', detail: 'Casein or cottage cheese.' },
  { time: '8:30 PM', cat: 'SUPPLEMENTS', action: 'PM Supps', detail: 'Magnesium, L-Theanine, Psyllium husk.' },
  { time: '9:00 PM', cat: 'INJECTION', action: 'PM Peptides', detail: 'Tesamorelin 2mg + CJC/Ipa + BPC-157.' },
  { time: '9:45 PM', cat: 'SLEEP', action: 'Lights Out', detail: 'Sleep.' },
];

export const SCHEDULE_SUNDAY: ScheduleItem[] = [
  { time: '7:00 AM', cat: 'WAKE', action: 'Sunday. Weigh in.', detail: 'Weigh yourself. Log 7-day average.' },
  { time: '7:05 AM', cat: 'INJECTION', action: 'AM Peptides', detail: 'CJC/Ipa + BPC-157 (if on-day).' },
  { time: '7:30 AM', cat: 'MEAL', action: 'Meal 1', detail: 'Eggs + oats or rice.' },
  { time: '9:00 AM', cat: 'CARDIO', action: 'Walk', detail: '30-40 min outdoor walk.' },
  { time: '11:00 AM', cat: 'PREP', action: 'Meal Prep', detail: 'Cook protein, prep carbs, portion meals for the week.' },
  { time: '12:30 PM', cat: 'MEAL', action: 'Meal 2 — Lunch', detail: 'Protein + carbs + veggies.' },
  { time: '3:00 PM', cat: 'MEAL', action: 'Meal 3', detail: 'Protein + moderate carbs.' },
  { time: '5:00 PM', cat: 'INJECTION', action: 'Retatrutide Injection', detail: 'Retatrutide dose (Sunday evening). Rotate injection site.' },
  { time: '5:00 PM', cat: 'INJECTION', action: 'TB-500', detail: 'TB-500 (Sun + Thu). 5mg wk1-4, 2.5mg wk5-12.' },
  { time: '7:00 PM', cat: 'MEAL', action: 'Meal 4 — Dinner', detail: 'Light. Avoid high-fat post-Reta.' },
  { time: '8:00 PM', cat: 'CHECKIN', action: 'Weekly Check-In', detail: 'Submit weight avg, photos, adherence, measurements.' },
  { time: '8:30 PM', cat: 'MEAL', action: 'Meal 5 — Pre-Bed', detail: 'Casein. Keep it light (Reta GI).' },
  { time: '9:00 PM', cat: 'INJECTION', action: 'PM Peptides', detail: 'Tesamorelin + CJC/Ipa + BPC-157.' },
  { time: '9:45 PM', cat: 'SLEEP', action: 'Lights Out', detail: 'Early bed. Big week ahead.' },
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
  list.push({ key: 'am_bpc', label: 'AM — BPC-157 (250mcg)' });
  if ([1, 3, 5].includes(dow)) {
    list.push({ key: 'am_motsc', label: 'AM — MOTS-C (10mg)' });
  }
  list.push({ key: 'pm_tesa', label: 'PM — Tesamorelin (2mg)' });
  if (dow !== 0 && dow !== 6) {
    list.push({ key: 'pm_cjc_ipa', label: 'PM — CJC-1295 + Ipamorelin (100/100mcg)' });
  }
  list.push({ key: 'pm_bpc', label: 'PM — BPC-157 (250mcg)' });
  if (dow === 0) list.push({ key: 'reta', label: 'Retatrutide (weekly dose)' });
  if (dow === 0 || dow === 4) list.push({ key: 'tb500', label: 'TB-500' });
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
