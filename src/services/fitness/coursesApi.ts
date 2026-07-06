import api from '../apiClient';
import { CourseType, WorkoutType } from './coursesTypes';

export const getAllCourses = async (): Promise<CourseType[]> => {
  return api.get('/courses').then((response) => response.data);
};

export const getCourseById = async (id: string): Promise<CourseType> => {
  return api.get(`/courses/${id}`).then((response) => response.data);
};

export const getAllWorkoutsByCourseId = async (
  id: string,
): Promise<WorkoutType[]> => {
  return api.get(`/courses/${id}/workouts`).then((response) => response.data);
};

export const getWorkoutById = async (id: string): Promise<WorkoutType> => {
  return api.get(`/workouts/${id}`).then((response) => response.data);
};
