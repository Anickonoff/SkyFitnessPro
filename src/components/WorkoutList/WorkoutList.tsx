import { useAuth } from '@/hooks/useAuth';
import Button from '../Button/Button';
import { getAllWorkoutsByCourseId } from '@/services/fitness/coursesApi';
import { useEffect, useMemo, useState } from 'react';
import { WorkoutType } from '@/types/coursesTypes';
import { useCourses } from '@/hooks/useCourses';
import { parseWorkoutName } from '@/utils/parseWorkoutName';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type WorkoutListProps = {
  courseId: string;
};

const WorkoutList = ({ courseId }: WorkoutListProps) => {
  const { user } = useAuth();
  const { courses } = useCourses();
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const newWorkouts = await getAllWorkoutsByCourseId(courseId);
        setWorkouts(orderWorkoutsByCourse(newWorkouts));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Неизвестная ошибка');
        }
      } finally {
        setIsLoading(false);
      }
    };
    getWorkouts();
  }, [courseId]);

  const orderWorkoutsByCourse = (workouts: WorkoutType[]) => {
    const listWokroutIds = courses.find(
      (course) => course._id === courseId,
    )?.workouts;
    if (!listWokroutIds) return [];
    const workoutsMap = new Map(
      workouts.map((workout) => [workout._id, workout]),
    );
    const sortedWorkouts: WorkoutType[] = [];
    listWokroutIds.forEach((workoutId) => {
      const workout = workoutsMap.get(workoutId);
      if (workout) {
        sortedWorkouts.push(workout);
      }
    });
    return sortedWorkouts;
  };

  const completedWorkoutIds = useMemo(() => {
    if (!user) return new Set<string>();
    const courseProgress = user.courseProgress.find(
      (course) => course.courseId === courseId,
    );
    if (!courseProgress) return new Set();
    return new Set(
      courseProgress.workoutsProgress
        .filter((w) => w.workoutCompleted)
        .map((w) => w.workoutId),
    );
  }, [user, courseId]);

  const firstIncompleteWorkoutId = useMemo(() => {
    return workouts.find((workout) => !completedWorkoutIds.has(workout._id))
      ?._id;
  }, [workouts, completedWorkoutIds]);

  const goToWorkout = (id: string) => {
    router.push(`/courses/${courseId}/workout/${id}`);
  };

  const handleBtnClick = () => {
    goToWorkout(firstIncompleteWorkoutId ?? workouts[0]._id);
  };

  return (
    <div className="w-full max-w-115 p-7.5 flex flex-col gap-8.5 md:p-10 md:gap-12 rounded-[30px] items-start shadow=[0_4px_67px_-12px_rgba(0,0,0,0.13] bg-white">
      <h1 className=" text-[32px] leading-[1.1] text-black md:text-center min-w-0 w-full">
        Выберите тренировку
      </h1>
      <div className="flex flex-col gap-8.5 items-center  min-w-0 w-full">
        <div className="pr-5 flex flex-col gap-2.5 max-h-84 md:max-h-90 w-full overflow-auto scrollbar-thumb-black scrollbar-thin scrollbar-gutter-stable">
          {isLoading
            ? 'Загрузка списка уроков'
            : error
              ? `Ошибка загрузки списка уроков: ${error}`
              : workouts.map((workout) => {
                  const parsedName = parseWorkoutName(workout.name);
                  return (
                    <Link
                      key={workout._id}
                      className="flex flex-row gap-2.5 pb-2.5 border-b-[#C4c4c4] border-b items-center min-h-13.75 md:min-h-16 w-full"
                      href={`/courses/${courseId}/workout/${workout._id}`}
                    >
                      <img
                        src={
                          completedWorkoutIds.has(workout._id)
                            ? '/images/Check-in-Circle.svg'
                            : '/images/Check-out-Circle.svg'
                        }
                      />
                      <div className="flex flex-col gap-2.5 justify-center items-start ">
                        <p className="text-lg leading-[1.1] md:text-2xl ">
                          {parsedName.title}
                        </p>
                        {parsedName.subtitle && (
                          <p className="text-sm leading-[1.1] md:text-lg ">
                            {parsedName.subtitle}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
        </div>
        <Button onClick={handleBtnClick}>Начать</Button>
      </div>
    </div>
  );
};

export default WorkoutList;
