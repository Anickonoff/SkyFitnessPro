'use client';

import { useAuth } from '@/hooks/useAuth';
import Card from '../Card/Card';
import { СourseActionStateType } from '@/types/otherTypes';
import { CourseType } from '@/types/coursesTypes';

type CourseListProps = {
  courses: CourseType[];
};

const CoursesList = ({ courses }: CourseListProps) => {
  const { user } = useAuth();
  const defineCourseActionState = (id: string): СourseActionStateType =>
    !user
      ? 'unauthorized'
      : user.selectedCourses.includes(id)
        ? 'added'
        : 'notAdded';

  return (
    <div className="mt-8.5 max-w-290 mx-auto flex gap-6 md:gap-10 md:mt-12.5 flex-wrap justify-start">
      {courses
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((course) => (
          <Card
            key={course._id}
            variant="catalog"
            nameRU={course.nameRU}
            durationInDays={course.durationInDays.toString()}
            difficulty={course.difficulty}
            dailyDurationInMinutes={course.dailyDurationInMinutes}
            order={course.order}
            id={course._id}
            courseActionState={defineCourseActionState(course._id)}
          />
        ))}
    </div>
  );
};

export default CoursesList;
