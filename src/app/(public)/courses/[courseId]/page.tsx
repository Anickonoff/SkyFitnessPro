import CourseActionButton from '@/components/CourseActionButton/CourseActionButton';
import { courseBgs, courseCovers } from '@/constants/courseCovers';
import { getAllCourses, getCourseById } from '@/services/fitness/coursesApi';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export async function generateStaticParams() {
  try {
    const courses = await getAllCourses();
    return courses.map((course) => ({
      courseId: course._id,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params;
  try {
    const course = await getCourseById(courseId);
    return {
      title: `${course.nameRU} - SkyFitnessPro`,
      description: `Курс ${course.nameRU}: ${course.directions.join(', ')}`,
    };
  } catch {
    return {
      title: 'Курс не найден - SkyFitnessPro',
    };
  }
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { courseId } = await params;

  let course;
  try {
    course = await getCourseById(courseId);
  } catch {
    notFound();
  }

  return (
    <main>
      <div className="px-4 md:px-6 lg:px-8 xl:p-0 flex flex-col gap-15 max-w-290 mx-auto mt-10 md:mt-15">
        <div
          className={`relative w-full h-97.25 md:h-77.5 rounded-[30px] md:p-10 ${courseBgs[course.order]} bg-no-repeat md:bg-right overflow-hidden`}
        >
          <h1 className="text-white text-6xl font-medium leading-[1.1] sr-only md:not-sr-only">
            {course.nameRU}
          </h1>
          <Image
            src={`/images/${courseCovers[course.order]}-card.png`}
            alt="Обложка курса"
            width={360}
            height={325}
            className="md:hidden absolute left-1/2 bottom-0 -translate-x-1/2 max-w-none"
          />
        </div>
        <div>
          <h2 className="text-black text-[40px] font-semibold leading-[1.1]">
            Подойдёт для вас, если:
          </h2>
          <div className="flex flex-col md:flex-row gap-4.25 mt-10">
            {course.fitting.map((fit, index) => (
              <div
                key={index}
                className="flex items-center gap-6.25 p-5 rounded-[28px] bg-[linear-gradient(116deg,#151720_34.98%,#1E212E_91.5%)]"
              >
                <p className="text-[75px] font-medium leading-[101.25px] text-accent lining-nums proportional-nums">
                  {index + 1}
                </p>
                <p className="min-w-0 text-white text-2xl font-normal leading-[1.1] ">
                  {fit}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-black text-[40px] font-semibold leading-[1.1]">
            Направления
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8.5 mt-10 bg-accent rounded-[28px] p-7.5">
            {course.directions.map((direction, index) => (
              <div key={index} className="flex flex-row gap-2 items-center">
                <img
                  src="/images/direction-icon.svg"
                  className="w-6.5 h-6.5"
                  alt=""
                />
                <p className="font-[18px] leading-[1.1] md:text-2xl">
                  {direction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative -mt-25 lg:mt-25.5 mb-8 lg:mb-12 w-full">
        <div className="block relative lg:hidden w-full  h-84 md:h-70">
          <Image
            alt=""
            className="w-93.75 h-auto absolute right-0 top-0"
            src="/images/new-way-mobile.png"
            width={375}
            height={456}
          />
        </div>
        <div className="px-4 md:px-6 lg:px-8">
          <div className="p-7.5 md:p-10 -mt-20 md:mt-0 bg-white rounded-[30px] shadow-card max-w-290 mx-auto md:min-h-121.5 relative overflow-hidden md:overflow-visible">
            <div className="flex flex-col gap-7 w-full max-w-125 md:w-109.25 relative z-30">
              <h2 className="text-[32px] font-medium leading-[1.1] text-black md:text-6xl">
                Начните путь к&nbsp;новому телу
              </h2>
              <ul className="list-disc list-outside pl-7.5 text-black/60 text-lg sm:text-xl md:text-2xl leading-snug md:leading-7">
                <li className="pb-1">проработка всех групп мышц</li>
                <li className="pb-1">тренировка суставов</li>
                <li className="pb-1">улучшение циркуляции крови</li>
                <li className="pb-1">упражнения заряжают бодростью</li>
                <li className="pb-1">помогают противостоять стрессам</li>
              </ul>
              <CourseActionButton courseId={course._id} />
            </div>

            <img
              src="/images/new-way-line.svg"
              className="hidden lg:block absolute top-0 right-0 z-10 h-133 pointer-events-none rounded-md max-w-none"
            />

            <Image
              alt=""
              src="/images/new-way.png"
              width={487}
              height={538}
              className="hidden lg:block absolute right-7.5 -top-20.5 w-121.75 h-134.5 z-20 pointer-events-none rounded-md"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
