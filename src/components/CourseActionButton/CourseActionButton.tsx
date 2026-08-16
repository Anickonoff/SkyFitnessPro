'use client';

import { useAuth } from '@/hooks/useAuth';
import { useAuthModal } from '@/hooks/useAuthModal';
import { addCourseToUser } from '@/services/fitness/coursesApi';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';

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
      openAuthModal();
      return;
    }
    if (isAdded) {
      router.push('/profile');
    } else {
      await addCourseToUser(courseId);
      await refreshUserData();
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
