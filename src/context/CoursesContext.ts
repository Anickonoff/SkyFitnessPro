'use client';

import { createContext } from 'react';
import { CourseType } from '@/types/coursesTypes';

type CoursesContextType = {
  isCoursesLoading: boolean;
  courses: CourseType[];
  getCourseById: (id: string) => CourseType | undefined;
};

export const CoursesContext = createContext<CoursesContextType | null>(null);
