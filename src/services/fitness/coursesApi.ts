import axios from 'axios';
import { BASE_URL } from '../constants';
import { courseType, workoutType } from './coursesTypes';

export const getAllCourses = async (): Promise<courseType[]> => {
  return axios.get(`${BASE_URL}/courses`).then((response) => response.data);
};

export const getCourseById = async (id: string): Promise<courseType> => {
  return axios
    .get(`${BASE_URL}/courses/${id}`)
    .then((response) => response.data);
};

export const getAllWorkoutsByCourseId = async (
  id: string,
): Promise<workoutType[]> => {
  return axios
    .get(`${BASE_URL}/courses/${id}/workouts`)
    .then((response) => response.data);
};

export const getWorkoutById = async (id: string): Promise<workoutType> => {
  return axios
    .get(`${BASE_URL}/workouts/${id}`)
    .then((response) => response.data);
};
