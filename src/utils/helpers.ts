export enum BaseExerciseCategory {
  CHEST = 'CHEST',
  BACK = 'BACK',
  ARMS = 'ARMS',
  SHOULDERS = 'SHOULDERS',
  LEGS = 'LEGS',
  HIIT = 'HIIT',
}

export const parseExerciseCategories = (data: string[]): string => {
  const parsedCategory = data.find((category) => {
    return category in BaseExerciseCategory;
  });

  if (parsedCategory) {
    return parsedCategory;
  }

  return '';
};
