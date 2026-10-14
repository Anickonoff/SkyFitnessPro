import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CourseActionButton from './CourseActionButton';
import {
  addCourseToUser,
  removeCourseFromUser,
} from '@/services/fitness/coursesApi';
import { toast } from 'sonner';

let mockUser: any = null;

beforeEach(() => {
  jest.clearAllMocks();
  mockUser = null;
});

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockRefreshUserData = jest.fn();
const mockOpenAuthModal = jest.fn();
const mockCloseAuthModal = jest.fn();

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
    refreshUserData: mockRefreshUserData,
  }),
}));

jest.mock('@/services/fitness/coursesApi', () => ({
  addCourseToUser: jest.fn(),
  removeCourseFromUser: jest.fn(),
}));

jest.mock('@/hooks/useAuthModal', () => ({
  useAuthModal: () => ({
    openAuthModal: mockOpenAuthModal,
    closeAuthModal: mockCloseAuthModal,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}));

describe('Кнопка на странице курса', () => {
  it('Неавторизованный пользователь', () => {
    mockUser = null;
    render(<CourseActionButton courseId="1" />);
    const button = screen.getByRole('button', {
      name: 'Войдите, чтобы добавить курс',
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockOpenAuthModal).toHaveBeenCalled();
  });

  it('Авторизованный пользователь, курс не добавлен', async () => {
    mockUser = { selectedCourses: ['other-course'] };
    render(<CourseActionButton courseId="1" />);
    const button = screen.getByRole('button', {
      name: 'Добавить курс',
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(addCourseToUser).toHaveBeenCalledWith('1');
    await waitFor(() => {
      expect(mockRefreshUserData).toHaveBeenCalled();
    });
  });

  it('Авторизованный пользователь, курс добавлен', async () => {
    mockUser = { selectedCourses: ['1'] };
    render(<CourseActionButton courseId="1" />);
    const button = screen.getByRole('button', {
      name: 'Курс добавлен, перейти в профиль',
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(addCourseToUser).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/profile');
    });
  });

  it('Ошибка сервера при добавлении', async () => {
    mockUser = { selectedCourses: [] };
    (addCourseToUser as jest.Mock).mockRejectedValueOnce(new Error('Fail'));
    render(<CourseActionButton courseId="1" />);
    const button = screen.getByRole('button', {
      name: 'Добавить курс',
    });
    fireEvent.click(button);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Не удалось добавить курс. Попробуйте позже.',
      );
    });
  });
});
