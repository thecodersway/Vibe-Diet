import { DailyProgress, Meal } from './types';

export const mockDailyProgress: DailyProgress = {
  remainingFuel: 1240,
  goalFuel: 2200,
  eatenFuel: 960,
  vibeName: 'Main Character Energy',
  waterCurrent: 1.2,
  waterTarget: 2.5,
  burnedKcal: 320,
  macros: [
    {
      name: 'Protein',
      current: 45,
      target: 140,
      unit: 'g',
      color: '#C2FF1A', // Lime green
    },
    {
      name: 'Carbs',
      current: 120,
      target: 250,
      unit: 'g',
      color: '#A855F7', // Purple
    },
    {
      name: 'Fats',
      current: 30,
      target: 70,
      unit: 'g',
      color: '#F43F5E', // Coral/salmon red
    },
  ],
};

export const mockMeals: Meal[] = [
  {
    id: '1',
    time: '9:00 AM',
    type: 'Breakfast',
    name: 'Breakfast',
    description: 'Avocado toast, 2 scrambled eggs, black coffee.',
    kcal: 420,
    isCompleted: true,
  },
  {
    id: '2',
    time: '1:30 PM',
    type: 'Lunch',
    isCompleted: false,
  },
];
