import { ParsedWorkoutName } from '@/types/otherTypes';

export const parseWorkoutName = (name: string): ParsedWorkoutName => {
  const parts = name.split(' / ');
  const title = parts[0];
  const subtitle = parts.length === 4 ? `${parts[1]} / ${parts[2]}` : null;
  return { title, subtitle };
};
