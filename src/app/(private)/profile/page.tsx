'use client';

import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import WorkoutList from '@/components/WorkoutList/WorkoutList';
import { useAuth } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import { resetCourseProgress } from '@/services/fitness/coursesApi';
import { CourseType } from '@/types/coursesTypes';
import { useEffect, useState } from 'react';

const Main = () => {
  const { user, refreshUserData } = useAuth();
  const { courses } = useCourses();
  const [addedCourses, setAddedCourses] = useState<CourseType[] | null>(null);
  const [shownWorkouts, setShownWorkouts] = useState<string | null>(null);
  useEffect(() => {
    if (user?.selectedCourses && courses) {
      setAddedCourses(
        courses.filter((course) => user.selectedCourses.includes(course._id)),
      );
    }
  }, [user?.selectedCourses, courses]);

  const calcProgress = (courseId: string): number => {
    if (!courses || !user) return 0;
    const numberOfWorkouts = courses.find((course) => course._id === courseId)
      ?.workouts.length;
    if (!numberOfWorkouts) return 0;
    const courseProgress = user.courseProgress.find(
      (course) => course.courseId === courseId,
    );
    if (!courseProgress) return 0;
    if (courseProgress.courseCompleted) return 100;
    const workoutsProgress = courseProgress.workoutsProgress;
    const completedWorkouts = workoutsProgress.filter(
      (workout) => workout.workoutCompleted,
    ).length;
    const progress = Math.round((completedWorkouts / numberOfWorkouts) * 100);
    return progress;
  };

  const handleCourseSelect = async (courseId: string) => {
    const progress = calcProgress(courseId);
    if (progress < 100) {
      setShownWorkouts(courseId);
    } else {
      await resetCourseProgress(courseId);
      await refreshUserData();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShownWorkouts(null);
    }
  };

  return (
    <>
      {shownWorkouts && (
        <ModalWrapper onClick={handleOverlayClick}>
          <WorkoutList courseId={shownWorkouts} />
        </ModalWrapper>
      )}
      <main className="px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 mt-10 mx-auto max-w-290 lg:mt-15 lg:gap-10">
          <h2 className="text-black text-[24px] font-semibold leading-[1.1] lg:text-[40px] lg:leading-none">
            Профиль
          </h2>
          <div className="p-7.5 rounded-[30px] bg-white shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] flex flex-col gap-7.5 w-full md:flex-row md:gap-8.25">
            <img
              src="/images/profile-photo.png"
              alt="Profile Photo"
              className="h-35.25 rounded-[20px] mx-auto md:h-49.25 md:mx-0"
            />
            <div className="flex flex-col gap-5 md:gap-7.5">
              <h2 className="text-black text-[24px] font-medium leading-[1.1] md:text-[32px] ">
                {user?.name}
              </h2>
              <p className="text-black text-[16px] font-normal leading-[1.1] md:mb-3.5 md:text-[18px]">
                Логин: {user?.email}
              </p>
              <Button variant="secondary" className="md:w-35">
                Выйти
              </Button>
            </div>
          </div>
          <h2 className="text-black text-[24px] font-semibold leading-[1.1] lg:text-[40px] lg:leading-none lg:mt-5">
            Мои курсы
          </h2>
          <div className="flex gap-6 md:gap-10 flex-wrap justify-start">
            {!addedCourses || addedCourses.length === 0 ? (
              <p>У Вас нет добавленных курсов</p>
            ) : (
              addedCourses
                .sort((a, b) => a.order - b.order)
                .map((course) => (
                  <Card
                    key={course._id}
                    variant="profile"
                    nameRU={course.nameRU}
                    durationInDays={course.durationInDays.toString()}
                    difficulty={course.difficulty}
                    dailyDurationInMinutes={course.dailyDurationInMinutes}
                    order={course.order}
                    id={course._id}
                    courseActionState="added"
                    progress={calcProgress(course._id)}
                    courseButton={() => handleCourseSelect(course._id)}
                  />
                ))
            )}
          </div>
          <Button className="ml-auto md:hidden">Наверх ↑</Button>
        </div>
      </main>
    </>
  );
};

export default Main;
