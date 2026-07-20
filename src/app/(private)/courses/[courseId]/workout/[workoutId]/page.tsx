'use client';

import Button from '@/components/Button/Button';
import Execute from '@/components/Execute/Execute';
import ExerciseModal from '@/components/ExerciseModal/ExerciseModal';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import { useAuth } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import {
  getWorkoutById,
  resetWorkoutProgress,
} from '@/services/fitness/coursesApi';
import { ExerciseProgressType, WorkoutType } from '@/types/coursesTypes';
import { getWorkoutProgressData } from '@/utils/getWorkoutProgressData';
import { parseExerciseName } from '@/utils/parseExerciseName';
import { parseWorkoutName } from '@/utils/parseWorkoutName';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const Workout = () => {
  const { courseId, workoutId } = useParams<{
    courseId: string;
    workoutId: string;
  }>();
  const [workout, setWorkout] = useState<WorkoutType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { courses } = useCourses();
  const { user, refreshUserData } = useAuth();
  const [shownProgressForm, setShownProgressForm] = useState<boolean>(false);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        setIsLoading(true);
        const response = await getWorkoutById(workoutId);
        setWorkout(response);
        setError('');
      } catch (error) {
        console.error(error);
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
        id: exercise._id,
      };
    });
    return progress;
  }, [user, courseId, workoutId, workout]);

  const courseTitle =
    courses.find((course) => course._id === courseId)?.nameRU || 'Unknown';

  const isWorkoutCompleted = (exercises: ExerciseProgressType[]) => {
    return exercises.every((exercise) => exercise.current >= exercise.max);
  };

  const isCompleted = useMemo(
    () => isWorkoutCompleted(exerciseProgress),
    [exerciseProgress],
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShownProgressForm(false);
    }
  };

  const handleBtnClick = async () => {
    if (isCompleted) {
      await resetWorkoutProgress(courseId, workoutId);
      await refreshUserData();
    } else {
      setShownProgressForm(true);
    }
  };

  return (
    <>
      {shownProgressForm && (
        <ModalWrapper onClick={handleOverlayClick}>
          <ExerciseModal
            courseId={courseId}
            workoutId={workoutId}
            exercises={exerciseProgress}
          />
        </ModalWrapper>
      )}
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
                      {exerciseProgress.length === 0 && (
                        <p className="text-2xl text-center">
                          Для данной тренировки нет упражнений
                        </p>
                      )}
                      <div className="grid gap-6 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {exerciseProgress.map((exercise, index) => (
                          <Execute
                            key={exercise.id}
                            title={parseExerciseName(exercise.name)}
                            progress={exercise.percent}
                          />
                        ))}
                      </div>
                    </div>
                    <Button className="max-w-80" onClick={handleBtnClick}>
                      {isCompleted
                        ? 'Сбросить свой прогресс'
                        : 'Обновить свой прогресс'}
                    </Button>
                  </div>
                </>
              )}
      </main>
    </>
  );
};

export default Workout;
