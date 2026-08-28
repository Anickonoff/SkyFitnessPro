'use client';

import { useAuth } from '@/hooks/useAuth';
import {
  getWorkoutById,
  resetWorkoutProgress,
} from '@/services/fitness/coursesApi';
import { ExerciseProgressType, WorkoutType } from '@/types/coursesTypes';
import { getWorkoutProgressData } from '@/utils/getWorkoutProgressData';
import { useEffect, useMemo, useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import ExerciseModal from '@/components/ExerciseModal/ExerciseModal';
import { parseWorkoutName } from '@/utils/parseWorkoutName';
import Execute from '@/components/Execute/Execute';
import Button from '@/components/Button/Button';
import { toast } from 'sonner';

type WorkoutContentProps = {
  courseId: string;
  workoutId: string;
};

const WorkoutContent = ({ courseId, workoutId }: WorkoutContentProps) => {
  const [workout, setWorkout] = useState<WorkoutType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { user, refreshUserData } = useAuth();
  const [shownProgressForm, setShownProgressForm] = useState<boolean>(false);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await getWorkoutById(workoutId);
        setWorkout(response);
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
        percent: exercise.quantity
          ? Math.floor((current / exercise.quantity) * 100)
          : 100,
        id: exercise._id,
      };
    });
    return progress;
  }, [user, courseId, workoutId, workout]);

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
      try {
        await resetWorkoutProgress(courseId, workoutId);
        await refreshUserData();
        toast.success('Прогресс тренировки сброшен');
      } catch (error) {
        toast.error('Не удалось сбросить прогресс тренировки.');
      }
    } else {
      setShownProgressForm(true);
    }
  };

  if (isLoading) {
    return <p>Загрузка урока...</p>;
  }
  if (error) {
    return <p>Ошибка загрузки урока: {error}</p>;
  }
  if (!workout) {
    return null;
  }

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
      <iframe
        className="w-full aspect-video rounded-[9px] md:rounded-[30px]"
        allowFullScreen
        src={workout.video}
      />
      <div className="flex flex-col gap-10 w-full p-7.5 rounded-[30px] shadow-card self-stretch sm:self-start lg:p-10 ">
        <div className="flex flex-col gap-5">
          <h2 className="text-[32px] leading-[1.1]">
            Упражнения тренировки {parseWorkoutName(workout.name).title}
          </h2>
          {exerciseProgress.length === 0 && (
            <p className="text-2xl text-center">
              Для данной тренировки нет упражнений
            </p>
          )}
          <div className="grid gap-6 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {exerciseProgress.map((exercise) => (
              <Execute
                key={exercise.id}
                title={exercise.name}
                progress={exercise.percent}
              />
            ))}
          </div>
        </div>
        <Button className="max-w-80" onClick={handleBtnClick}>
          {isCompleted ? 'Сбросить свой прогресс' : 'Обновить свой прогресс'}
        </Button>
      </div>
    </>
  );
};

export default WorkoutContent;
