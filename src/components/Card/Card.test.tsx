import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Card from './Card';
import {
  addCourseToUser,
  removeCourseFromUser,
} from '@/services/fitness/coursesApi';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('@/services/fitness/coursesApi', () => ({
  addCourseToUser: jest.fn(),
  removeCourseFromUser: jest.fn(),
}));

const mockRefreshUserData = jest.fn();
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    refreshUserData: mockRefreshUserData,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const baseProps = {
  id: 'course-123',
  nameRU: 'Йога для начинающих',
  durationInDays: '25',
  dailyDurationInMinutes: { from: 20, to: 40 },
  order: 1,
  difficulty: 'Легкий',
};

describe('Компонент Card', () => {
  it('Режим каталога', () => {
    render(
      <Card
        {...baseProps}
        variant="catalog"
        courseActionState="unauthorized"
      />,
    );

    expect(screen.getByText('Йога для начинающих')).toBeInTheDocument();
    expect(screen.getByText('25 дней')).toBeInTheDocument();
    expect(screen.getByText('20 - 40 мин/день')).toBeInTheDocument();
    expect(screen.getByText('Легкий')).toBeInTheDocument();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/courses/course-123');
  });
  it('Рендер в режиме профиля с прогрессом 40%', () => {
    render(
      <Card
        {...baseProps}
        variant="profile"
        courseActionState="added"
        progress={40}
        courseButton={jest.fn()}
      />,
    );
    expect(screen.getByText('Прогресс 40%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '40',
    );
    expect(screen.getByText('Продолжить тренировки')).toBeInTheDocument();
  });
  it('Рендер в режиме профиля с прогрессом 100%', () => {
    render(
      <Card
        {...baseProps}
        variant="profile"
        courseActionState="added"
        progress={100}
        courseButton={jest.fn()}
      />,
    );
    expect(screen.getByText('Прогресс 100%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
    expect(screen.getByText('Начать заново')).toBeInTheDocument();
  });
  it('Рендер в режиме профиля с прогрессом 0%', () => {
    render(
      <Card
        {...baseProps}
        variant="profile"
        courseActionState="added"
        progress={0}
        courseButton={jest.fn()}
      />,
    );
    expect(screen.getByText('Прогресс 0%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
    expect(screen.getByText('Начать тренировки')).toBeInTheDocument();
  });
  it('Клик по кнопке действия в профиле', () => {
    const handleCourseButton = jest.fn();
    render(
      <Card
        {...baseProps}
        variant="profile"
        courseActionState="added"
        progress={40}
        courseButton={handleCourseButton}
      />,
    );
    fireEvent.click(screen.getByText('Продолжить тренировки'));
    expect(handleCourseButton).toHaveBeenCalledTimes(1);
  });
  it('Добавление курса в профиль', async () => {
    render(
      <Card
        {...baseProps}
        variant="profile"
        progress={0}
        courseActionState="notAdded"
        courseButton={jest.fn()}
      />,
    );
    const btn = screen.getByRole('button', { name: 'Добавить курс' });
    fireEvent.click(btn);
    expect(addCourseToUser).toHaveBeenCalledWith('course-123');
    await waitFor(() => {
      expect(mockRefreshUserData).toHaveBeenCalled();
    });
  });
  it('Удаление курса из профиля', async () => {
    render(
      <Card
        {...baseProps}
        variant="profile"
        progress={0}
        courseActionState="added"
        courseButton={jest.fn()}
      />,
    );
    const btn = screen.getByRole('button', { name: 'Удалить курс' });
    fireEvent.click(btn);
    expect(removeCourseFromUser).toHaveBeenCalledWith('course-123');
    await waitFor(() => {
      expect(mockRefreshUserData).toHaveBeenCalled();
    });
  });
  it('Попытка добавить курс неавторизованным пользователем', async () => {
    render(
      <Card
        {...baseProps}
        variant="profile"
        progress={0}
        courseActionState="unauthorized"
        courseButton={jest.fn()}
      />,
    );
    const btn = screen.getByRole('button', {
      name: 'Войдите, чтобы добавить курс',
    });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(addCourseToUser).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(mockRefreshUserData).not.toHaveBeenCalled();
    });
  });
});
