export const parseExerciseName = (name: string): string => {
  const parts = name.split('(');
  return parts[0];
};

export const parseExerciseQuestion = (name: string): string => {
  const modifiedText =
    name.charAt(0).toLowerCase() + parseExerciseName(name.slice(1));
  return `Сколько раз вы сделали ${modifiedText}?`;
};
