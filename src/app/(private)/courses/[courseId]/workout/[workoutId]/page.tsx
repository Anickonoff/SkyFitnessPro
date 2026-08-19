import WorkoutContent from '@/components/WorkoutContent/WorkoutContent';
import { getCourseById } from '@/services/fitness/coursesApi';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type WorkoutProps = {
  params: Promise<{ courseId: string; workoutId: string }>;
};

export const generateMetadata = async ({
  params,
}: WorkoutProps): Promise<Metadata> => {
  const { courseId } = await params;
  try {
    const course = await getCourseById(courseId);
    return {
      title: `${course.nameRU} - Тренировка - SkyFitnessPro`,
      description: `Тренировка курса ${course.nameRU}`,
    };
  } catch {
    return {
      title: 'Тренировка - SkyFitnessPro',
    };
  }
};

export const Workout = async ({ params }: WorkoutProps) => {
  const { courseId, workoutId } = await params;

  let course;

  try {
    course = await getCourseById(courseId);
  } catch (err) {
    console.error('Ошибка загрузки курса в page.tsx:', err);
    notFound();
  }

  const workoutExistsInCourse = course?.workouts.some((id) => id === workoutId);

  if (!workoutExistsInCourse) {
    notFound();
  }

  const courseTitle = course?.nameRU ?? 'Неизвестный курс';

  return (
    <main className="flex flex-col gap-6 mt-10 lg:mt-15 lg:gap-10 max-w-290 mx-auto px-4 md:px-6 lg:px-8 xl:px-0">
      <h1 className="text-2xl font-medium leading-[1.1] lg:text-[60px] lg:leading-none">
        {courseTitle}
      </h1>
      <WorkoutContent courseId={courseId} workoutId={workoutId} />
    </main>
  );
};

export default Workout;
