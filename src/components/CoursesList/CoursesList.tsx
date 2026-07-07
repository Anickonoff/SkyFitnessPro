'use client';

import { useEffect } from 'react';
import Card from '../Card/Card';
import { useCourses } from '@/hooks/useCourses';

const CoursesList = () => {
  const { courses, isCoursesLoading } = useCourses();
  useEffect(() => {
    console.log('CoursesList: courses', courses);
  }, [courses]);

  return (
    <div className="mt-8.5 max-w-290 mx-auto flex gap-6 md:gap-10 md:mt-12.5 flex-wrap justify-start">
      {isCoursesLoading ? (
        <p>Загрузка списка курсов...</p>
      ) : (
        courses
          .sort((a, b) => a.order - b.order)
          .map((course) => (
            <Card
              key={course._id}
              nameRU={course.nameRU}
              durationInDays={course.durationInDays.toString()}
              difficulty={course.difficulty}
              dailyDurationInMinutes={course.dailyDurationInMinutes}
              order={course.order}
              id={course._id}
            />
          ))
      )}
    </div>
  );
};

export default CoursesList;
