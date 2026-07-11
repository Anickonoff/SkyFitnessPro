'use client';

import { getAllCourses } from '@/services/fitness/coursesApi';
import { CourseType } from '@/types/coursesTypes';
import { ReactNode, useEffect, useState } from 'react';
import { CoursesContext } from './CoursesContext';

const CoursesProvider = ({ children }: { children: ReactNode }) => {
  const [isCoursesLoading, setIsCoursesLoading] = useState(true);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const loadCourses = async () => {
    try {
      const courses = await getAllCourses();
      setCourses(courses);
    } finally {
      setIsCoursesLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const getCourseById = (id: string): CourseType | undefined => {
    return courses.find((course) => course._id === id);
  };

  return (
    <CoursesContext.Provider
      value={{ isCoursesLoading, courses, getCourseById }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesProvider;
