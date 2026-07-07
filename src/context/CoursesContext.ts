'use client';

import { createContext } from 'react';
import { CourseType } from '@/services/fitness/coursesTypes';

type CoursesContextType = {
  isCoursesLoading: boolean;
  courses: CourseType[];
  getCourseById: (id: string) => CourseType | undefined;
};

export const CoursesContext = createContext<CoursesContextType | null>(null);
