export enum WorkoutCategory {
  CHEST = 'CHEST',
  BACK = 'BACK',
  ARMS = 'ARMS',
  SHOULDERS = 'SHOULDERS',
  LEGS = 'LEGS',
  PUSH = 'PUSH',
  PULL = 'PULL',
  UPPER = 'UPPER',
  LOWER = 'LOWER',
  FULL_BODY = 'FULL_BODY',
  HIIT = 'HIIT',
};

export interface WorkoutData {
  category: WorkoutCategory
  length: number
};

export const initialWorkoutData: WorkoutData = {
  category: WorkoutCategory.CHEST,
  length: 4,
};
