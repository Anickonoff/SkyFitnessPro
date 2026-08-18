import ProfileContent from '@/components/ProfileContent/ProfileContent';
import { getAllCourses } from '@/services/fitness/coursesApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профиль - SkyFitnessPro',
  description: 'Личный кабинет пользователя SkyFitnessPro',
};

const Main = async () => {
  const courses = await getAllCourses();
  return <ProfileContent courses={courses} />;
};

export default Main;
