'use client';

import Button from '@/components/Button/Button';
import Execute from '@/components/Execute/Execute';
import { useAuth } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import { getWorkoutById } from '@/services/fitness/coursesApi';
import { WorkoutType } from '@/types/coursesTypes';
import { getWorkoutProgressData } from '@/utils/getWorkoutProgressData';
import { parseExerciseName } from '@/utils/parseExerciseName';
import { parseWorkoutName } from '@/utils/parseWorkoutName';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type ExerciseProgressType = {
  name: string;
  current: number;
  max: number;
  percent: number;
};

const Workout = () => {
  const { courseId, workoutId } = useParams<{
    courseId: string;
    workoutId: string;
  }>();
  const [workout, setWorkout] = useState<WorkoutType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { courses } = useCourses();
  const { user } = useAuth();

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const response = await getWorkoutById(workoutId);
        setWorkout(response);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Неизвестная ошибка');
        }
      } finally {
        setIsLoading(false);
      }
    };
    getWorkout();
  }, [workoutId]);

  const exerciseProgress: ExerciseProgressType[] = useMemo(() => {
    if (!workout) return [];
    const progressUserData = getWorkoutProgressData(user, courseId, workoutId);
    const progress = workout.exercises.map((exercise, index) => {
      const current = progressUserData[index] ?? 0;
      return {
        name: exercise.name,
        current: current,
        max: exercise.quantity,
        percent: Math.floor((current / exercise.quantity) * 100),
      };
    });
    return progress;
  }, [user, courseId, workoutId, workout]);

  const courseTitle =
    courses.find((course) => course._id === courseId)?.nameRU || 'Unknown';

  return (
    <main className="flex flex-col gap-6 mt-10 lg:mt-15 lg:gap-10 max-w-290 mx-auto px-4 md:px-6 lg:px-8 xl:px-0">
      {isLoading
        ? 'Загрузка урока'
        : error
          ? `Ошибка загрузки урока: ${error}`
          : workout && (
              <>
                <h1 className="text-2xl font-medium leading-[1.1] lg:text-[60px] lg:leading-none">
                  {courseTitle}
                </h1>
                <iframe
                  className="w-full aspect-video rounded-[9px] md:rounded-[30px]"
                  allowFullScreen
                  src={workout.video}
                />
                <div className="flex flex-col gap-10 w-full p-7.5 rounded-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] self-stretch sm:self-start lg:p-10 ">
                  <div className="flex flex-col gap-5">
                    <h2 className="text-[32px] leading-[1.1]">
                      Упражнения тренировки{' '}
                      {parseWorkoutName(workout.name).title}
                    </h2>
                    <div className="grid gap-6 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {exerciseProgress.map((exercise, index) => (
                        <Execute
                          key={index}
                          title={parseExerciseName(exercise.name)}
                          progress={exercise.percent}
                        />
                      ))}
                    </div>
                  </div>
                  <Button className="max-w-80">Обновить свой прогресс</Button>
                </div>
              </>
            )}
    </main>
  );
};

export default Workout;
