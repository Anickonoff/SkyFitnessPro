import { User } from '@/context/AuthProvider';

export const getWorkoutProgressData = (
  user: User | null,
  courseId: string,
  workoutId: string,
) => {
  return (
    user?.courseProgress
      ?.find((courseProgress) => courseProgress.courseId === courseId)
      ?.workoutsProgress?.find(
        (workoutProgress) => workoutProgress.workoutId === workoutId,
      )?.progressData || []
  );
};
