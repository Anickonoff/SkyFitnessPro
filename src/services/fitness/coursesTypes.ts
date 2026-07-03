export type courseType = {
  _id: string;
  nameRu: string;
  nameEn: string;
  description: string;
  direction: string[];
  dailyDurationInMinutes: { from: number; to: number };
  fitting: string[];
  order: number;
  difficulty: string;
  durationInDays: number;
  workouts: string[];
  __v: number;
};

export type workoutType = {
  _id: string;
  name: string;
  video: string;
  exercises: { name: string; quantity: number; _id: string }[];
  __v: number;
};
