import { User } from '@/context/AuthProvider';
import { getWorkoutProgressData } from './getWorkoutProgressData';

const user = {
  courseProgress: [
    {
      courseId: 'course1',
      workoutsProgress: [
        {
          workoutId: 'workout1',
          progressData: [5, 10, 15],
        },
        {
          workoutId: 'workout2',
        },
      ],
    },
  ],
} as User;

describe('getWorkoutProgressData', () => {
  it('возвращает progressData для найденной тренировки', () => {
    expect(getWorkoutProgressData(user, 'course1', 'workout1')).toEqual([
      5, 10, 15,
    ]);
  });

  it('возвращает пустой массив, если пользователь отсутствует', () => {
    expect(getWorkoutProgressData(null, 'course1', 'workout1')).toEqual([]);
    expect(getWorkoutProgressData({} as User, 'course1', 'workout1')).toEqual(
      [],
    );
  });

  it('возвращает пустой массив, если курс не найден', () => {
    expect(getWorkoutProgressData(user, 'course2', 'workout1')).toEqual([]);
  });

  it('возвращает пустой массив, если тренировка не найдена', () => {
    expect(getWorkoutProgressData(user, 'course1', 'unknown')).toEqual([]);
  });

  it('возвращает пустой массив, если progressData отсутствует', () => {
    expect(getWorkoutProgressData(user, 'course1', 'workout2')).toEqual([]);
  });
});
