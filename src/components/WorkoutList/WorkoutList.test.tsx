import { getAllWorkoutsByCourseId } from '@/services/fitness/coursesApi';
import { fireEvent, render, screen } from '@testing-library/react';
import WorkoutList from './WorkoutList';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

let mockUser: any = null;
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
  }),
}));

jest.mock('@/services/fitness/coursesApi', () => ({
  getAllWorkoutsByCourseId: jest.fn(),
}));

const mockWorkouts = [
  { _id: 'w1', name: 'Урок 1. Разминка' },
  { _id: 'w2', name: 'Урок 2. Основная часть' },
  { _id: 'w3', name: 'Урок 3. Заминка' },
];
describe('Список упражнений', () => {
  it('Состояние загрузки', () => {
    (getAllWorkoutsByCourseId as jest.Mock).mockReturnValue(
      new Promise(() => {}),
    );
    render(<WorkoutList courseId="test" />);
    expect(screen.getByText('Загрузка списка уроков')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Успешный рендеринг', async () => {
    mockUser = null;
    (getAllWorkoutsByCourseId as jest.Mock).mockResolvedValue(mockWorkouts);
    render(<WorkoutList courseId="c1" workoutIds={['w3', 'w1', 'w2']} />);
    await screen.findByText(/урок 1/i);
    expect(screen.getByText('Урок 1. Разминка')).toBeInTheDocument();
    expect(screen.getByText('Урок 2. Основная часть')).toBeInTheDocument();
    expect(screen.getByText('Урок 3. Заминка')).toBeInTheDocument();
  });
  it('Статусы тренировок', async () => {
    mockUser = {
      courseProgress: [
        {
          courseId: 'c1',
          workoutsProgress: [
            { workoutId: 'w1', workoutCompleted: true },
            { workoutId: 'w2', workoutCompleted: false },
          ],
        },
      ],
    };
    (getAllWorkoutsByCourseId as jest.Mock).mockResolvedValue(mockWorkouts);
    render(<WorkoutList courseId="c1" />);
    await screen.findByText(/урок 1/i);
    const workout1Icon = screen.getByAltText('Тренировка пройдена');
    const workout2Icon = screen.getAllByAltText('Тренировка не пройдена');
    expect(workout1Icon).toBeInTheDocument();
    expect(workout2Icon.length).toBe(2);
  });
  it('Переход на незавершённую тренировку по клику на кнопку', async () => {
    mockUser = {
      courseProgress: [
        {
          courseId: 'c1',
          workoutsProgress: [
            { workoutId: 'w1', workoutCompleted: true },
            { workoutId: 'w2', workoutCompleted: false },
          ],
        },
      ],
    };
    (getAllWorkoutsByCourseId as jest.Mock).mockResolvedValue(mockWorkouts);
    render(<WorkoutList courseId="c1" />);
    await screen.findByText(/урок 1/i);
    const button = screen.getByRole('button', { name: 'Начать' });
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/courses/c1/workout/w2');
  });
  it('Ошибка при загрузке по API', async () => {
    (getAllWorkoutsByCourseId as jest.Mock).mockRejectedValue(
      new Error('Сбой сети'),
    );
    render(<WorkoutList courseId="c1" />);
    await screen.findByText(/Ошибка загрузки списка уроков: Сбой сети/i);
    expect(
      screen.getByText('Ошибка загрузки списка уроков: Сбой сети'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
