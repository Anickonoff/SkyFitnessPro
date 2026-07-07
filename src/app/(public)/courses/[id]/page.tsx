'use client';

import Button from '@/components/Button/Button';
import { courseBgs, courseCovers } from '@/constants/courseCovers';
import { useCourses } from '@/hooks/useCourses';
import { CourseType } from '@/services/fitness/coursesTypes';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const coursePage = () => {
  const id = useParams<{ id: string }>();
  const { isCoursesLoading, getCourseById } = useCourses();
  const [course, setCourse] = useState<CourseType | undefined>(undefined);
  useEffect(() => {
    if (!isCoursesLoading) {
      const courseById = getCourseById(id.id);
      setCourse(courseById);
    }
  }, [isCoursesLoading, id.id, getCourseById]);

  return (
    <main>
      {isCoursesLoading ? (
        <p>Загрузка информации о курсе</p>
      ) : (
        course && (
          <div className="px-4 md:px-6 lg:px-8 xl:p-0 flex flex-col gap-15 max-w-290 mx-auto mt-10 md:mt-15">
            <div
              className={`relative w-full h-97.25 md:h-77.5 rounded-[30px] md:p-10 ${courseBgs[course.order]} bg-no-repeat md:bg-right overflow-hidden`}
            >
              <h1 className="text-white text-6xl font-medium leading-[1.1] hidden md:block">
                {course.nameRU}
              </h1>
              <img
                src={`/images/${courseCovers[course.order]}-card.png`}
                className="md:hidden absolute left-1/2 bottom-0 -translate-x-1/2 max-w-none"
              />
            </div>
            <div>
              <h2 className="text-black text-[40px] font-semibold leading-[1.1]">
                Подойдёт для вас, если:
              </h2>
              <div className="flex flex-col md:flex-row gap-4.25 mt-10">
                {course.fitting.map((fit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6.25 p-5 rounded-[28px] bg-[linear-gradient(116deg,#151720_34.98%,#1E212E_91.5%)]"
                  >
                    <p className="text-[75px] font-medium leading-[101.25px] text-accent lining-nums proportional-nums">
                      {index + 1}
                    </p>
                    <p className="min-w-0 text-white text-2xl font-normal leading-[1.1] ">
                      {fit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-black text-[40px] font-semibold leading-[1.1]">
                Направления
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8.5 mt-10 bg-accent rounded-[28px] p-7.5">
                {course.directions.map((direction, index) => (
                  <div key={index} className="flex flex-row gap-2 items-center">
                    <img
                      src="/images/direction-Icon.svg"
                      className="w-6.5 h-6.5"
                      alt=""
                    />
                    <p className="font-[18px] leading-[1.1] md:text-2xl">
                      {direction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
      <div className="relative -mt-25 lg:mt-25.5 mb-8 lg:mb-12 w-full">
        <div className="block relative lg:hidden w-full  h-84 md:h-70">
          {/* <img
            src="/images/new-way-line.svg"
            className="absolute top-14 -right-15 h-82.5 sm:h-112.5 md:h-125 z-10 max-w-none"
          />
          <img
            className="h-84 sm:h-112.5 md:h-125 absolute top-4 -right-12"
            src="/images/new-way.png"
          /> */}
          <img
            className="w-93.75 absolute right-0 top-0"
            src="/images/new-way_mobile.png"
          />
        </div>
        <div className="px-4 md:px-6 lg:px-8">
          <div className="p-7.5 md:p-10 -mt-20 md:mt-0 bg-white rounded-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] max-w-290 mx-auto md:min-h-121.5 relative overflow-hidden md:overflow-visible">
            <div className="flex flex-col gap-7 w-full max-w-125 md:w-109.25 relative z-30">
              <h2 className="text-[32px] font-medium leading-[1.1] text-black md:text-6xl">
                Начните путь к&nbsp;новому телу
              </h2>
              <ul className="list-disc list-outside pl-7.5 text-black/60 text-lg sm:text-xl md:text-2xl leading-snug md:leading-7">
                <li className="pb-1">проработка всех групп мышц</li>
                <li className="pb-1">тренировка суставов</li>
                <li className="pb-1">улучшение циркуляции крови</li>
                <li className="pb-1">упражнения заряжают бодростью</li>
                <li className="pb-1">помогают противостоять стрессам</li>
              </ul>
              <Button className="text-base! md:text-lg">
                Войдите, чтобы добавить курс
              </Button>
            </div>

            <img
              src="/images/new-way-line.svg"
              className="hidden lg:block absolute top-0 right-0 z-10 h-133 pointer-events-none rounded-md max-w-none"
            />

            <img
              src="/images/new-way.png"
              className="hidden lg:block absolute right-7.5 -top-20.5 w-121.75 h-137 z-20 pointer-events-none rounded-md"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default coursePage;
