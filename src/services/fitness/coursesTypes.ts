export type CourseType = {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  dailyDurationInMinutes: { from: number; to: number };
  fitting: string[];
  order: number;
  difficulty: string;
  durationInDays: number;
  workouts: string[];
  __v: number;
};

export type WorkoutType = {
  _id: string;
  name: string;
  video: string;
  exercises: { name: string; quantity: number; _id: string }[];
  __v: number;
};
