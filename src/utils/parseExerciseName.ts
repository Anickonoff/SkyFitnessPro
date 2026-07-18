export const parseExerciseName = (name: string): string => {
  const parts = name.split('(');
  return parts[0];
};
