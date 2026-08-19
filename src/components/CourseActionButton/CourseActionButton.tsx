'use client';

import { useAuth } from '@/hooks/useAuth';
import { useAuthModal } from '@/hooks/useAuthModal';
import { addCourseToUser } from '@/services/fitness/coursesApi';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { toast } from 'sonner';

type CourseActionButtonProps = {
  courseId: string;
};

const CourseActionButton = ({ courseId }: CourseActionButtonProps) => {
  const { user, refreshUserData } = useAuth();
  const { openAuthModal } = useAuthModal();
  const router = useRouter();

  const isAdded = user?.selectedCourses.includes(courseId);

  const handleClick = async () => {
    if (!user) {
      toast.warning('Для добавления курса необходимо авторизоваться');
      openAuthModal();
      return;
    }
    if (isAdded) {
      router.push('/profile');
    } else {
      try {
        await addCourseToUser(courseId);
        await refreshUserData();
        toast.success('Курс успешно добавлен в профиль!');
      } catch (error) {
        toast.error('Не удалось добавить курс. Попробуйте позже.');
      }
    }
  };

  const buttonText = !user
    ? 'Войдите, чтобы добавить курс'
    : isAdded
      ? 'Курс добавлен, перейти в профиль'
      : 'Добавить курс';

  return (
    <Button className="text-base! md:text-lg" onClick={handleClick}>
      {buttonText}
    </Button>
  );
};

export default CourseActionButton;
