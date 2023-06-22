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

export interface UserWorkout {
    title: string
    category: WorkoutCategory
    exercises: string[]
}

export const initialUserWorkout: UserWorkout = {
    title: '',
    category: WorkoutCategory.CHEST,
    exercises: [],
}

export interface WorkoutData {
    category: WorkoutCategory
    length: number
};

export const initialWorkoutData: WorkoutData = {
    category: WorkoutCategory.CHEST,
    length: 4,
};
