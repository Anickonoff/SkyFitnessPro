'use client';

import { CoursesContext } from '@/context/CoursesContext';
import { useContext } from 'react';

export const useCourses = () => {
  const context = useContext(CoursesContext);

  if (!context) {
    throw new Error('useCourses must be used within CoursesProvider');
  }

  return context;
};
