export const parseExerciseQuestion = (name: string): string => {
  const modifiedText = name.charAt(0).toLowerCase() + name.slice(1);
  return `Сколько раз вы сделали ${modifiedText}?`;
};
