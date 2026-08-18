import api from '../apiClient';
import { CourseType, WorkoutType } from '../../types/coursesTypes';
import { BASE_URL } from '@/constants/constants';

// export const getAllCourses = async (): Promise<CourseType[]> => {
//   return api.get('/courses').then((response) => response.data);
// };

export const getAllCourses = async (): Promise<CourseType[]> => {
  const res = await fetch(`${BASE_URL}/courses`, {
    next: { revalidate: 3600 }, // ISR: ревалидация раз в час
  });
  if (!res.ok) throw new Error('Ошибка загрузки курсов');
  return res.json();
};

// export const getCourseById = async (id: string): Promise<CourseType> => {
//   return api.get(`/courses/${id}`).then((response) => response.data);
// };

export const getCourseById = async (id: string): Promise<CourseType> => {
  const res = await fetch(`${BASE_URL}/courses/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Ошибка загрузки курса');
  return res.json();
};

export const getAllWorkoutsByCourseId = async (
  id: string,
): Promise<WorkoutType[]> => {
  return api.get(`/courses/${id}/workouts`).then((response) => response.data);
};

export const getWorkoutById = async (id: string): Promise<WorkoutType> => {
  return api.get(`/workouts/${id}`).then((response) => response.data);
};

export const addCourseToUser = async (courseId: string): Promise<void> => {
  return api
    .post(`/users/me/courses`, { courseId })
    .then((response) => response.data);
};

export const removeCourseFromUser = async (courseId: string): Promise<void> => {
  return api
    .delete(`/users/me/courses/${courseId}`)
    .then((response) => response.data);
};

export const resetCourseProgress = async (courseId: string): Promise<void> => {
  return api
    .patch(`/courses/${courseId}/reset`)
    .then((response) => response.data);
};

export const resetWorkoutProgress = async (
  courseId: string,
  workoutId: string,
): Promise<void> => {
  return api
    .patch(`/courses/${courseId}/workouts/${workoutId}/reset`)
    .then((response) => response.data);
};

export const sendWorkoutProgress = async (
  courseId: string,
  workoutId: string,
  data: { progressData: number[] },
): Promise<void> => {
  return api
    .patch(`/courses/${courseId}/workouts/${workoutId}`, data)
    .then((response) => response.data);
};
