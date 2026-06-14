export interface Macro {
  name: 'Protein' | 'Carbs' | 'Fats';
  current: number;
  target: number;
  unit: string;
  color: string;
}

export interface Meal {
  id: string;
  time: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  name?: string;
  description?: string;
  kcal?: number;
  isCompleted: boolean;
}

export interface DailyProgress {
  remainingFuel: number;
  goalFuel: number;
  eatenFuel: number;
  macros: Macro[];
  waterCurrent: number;
  waterTarget: number;
  burnedKcal: number;
  vibeName: string;
}
