import { ExerciseProgressType } from '@/types/coursesTypes';
import { useState } from 'react';
import Button from '../Button/Button';
import { parseExerciseQuestion } from '@/utils/parseExerciseName';
import { sendWorkoutProgress } from '@/services/fitness/coursesApi';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import Image from 'next/image';

type ExersiceModalProps = {
  exercises: ExerciseProgressType[];
  courseId: string;
  workoutId: string;
};
type FormData = Record<string, string>;

const ExerciseModal = ({
  exercises,
  courseId,
  workoutId,
}: ExersiceModalProps) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'form' | 'result'>('form');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({});
  const { refreshUserData } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;
    setError('');

    const hasChanges = Object.values(formData).some(
      (value) => value !== undefined && value !== '',
    );

    if (!hasChanges) {
      setError(
        'Введите количество выполненных повторений хотя бы для одного упражнения.',
      );
      toast.warning(
        'Введите количество выполненных повторений хотя бы для одного упражнения.',
        { id: 'exercise-val' },
      );
      setErrors({});
      return false;
    }

    exercises.forEach((exercise) => {
      const value = formData[exercise.id];

      if (value === undefined || value === '') {
        newErrors[exercise.id] = false;
        return;
      }

      const hasError = Number(value) < exercise.current;

      newErrors[exercise.id] = hasError;

      if (hasError) {
        isValid = false;
      }
    });

    if (!isValid) {
      setError(
        'Количество повторений не может быть меньше уже сохранённого значения.',
      );
      toast.warning(
        'Количество повторений не может быть меньше уже сохранённого значения.',
        { id: 'exercise-val' },
      );
    }

    setErrors(newErrors);
    return isValid;
  };

  const getProgressData = () =>
    exercises.map((exercise) => {
      const value = formData[exercise.id];

      if (value === undefined || value === '') {
        return exercise.current;
      }

      return Math.max(exercise.current, Number(value));
    });

  const onInputChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleBtnClick = async () => {
    if (!validateForm()) {
      return;
    }
    setError('');

    try {
      setIsSending(true);
      await sendWorkoutProgress(courseId, workoutId, {
        progressData: getProgressData(),
      });
      await refreshUserData();
      setModalMode('result');
      toast.success('Прогресс тренировки успешно сохранен!', {
        id: 'exercise-save',
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Неизвестная ошибка');
        toast.error('Неизвестная ошибка');
      }
    } finally {
      setIsSending(false);
    }
  };

  if (modalMode === 'form') {
    return (
      <div className="w-full max-w-106.5 p-7.5 flex flex-col gap-8.5 md:p-10 md:gap-12 rounded-[30px] items-start shadow-card bg-white">
        <h2 className=" text-[32px] leading-[1.1] text-black min-w-0 w-full">
          Мой прогресс
        </h2>
        <div className="flex flex-col gap-8.5 items-center  min-w-0 w-full">
          <div className="pr-5 flex flex-col gap-5 max-h-84.25 md:max-h-86.5 w-full overflow-auto scrollbar-thumb-black scrollbar-thin scrollbar-gutter-stable">
            {exercises.map((exercise) => (
              <div className="flex flex-col gap-2.5 w-full" key={exercise.id}>
                <p className="text-base leading-[1.1] text-black min-w-0 w-full md:text-lg">
                  {parseExerciseQuestion(exercise.name)}
                </p>
                <input
                  className={`w-full rounded-lg border ${errors[exercise.id] ? 'border-[#db0030]' : 'border-[#d0cece]'} py-4 px-4.5 text-black text-base leading-[1.1] placeholder:text-[#d0cece]`}
                  type="number"
                  placeholder={exercise.current.toString()}
                  value={formData[exercise.id] ?? ''}
                  onChange={(e) => onInputChange(exercise.id, e)}
                />
              </div>
            ))}
          </div>
          {error && (
            <p className="text-[#db0030] text-base leading-[1.1] text-center">
              {error}
            </p>
          )}
          <Button
            onClick={handleBtnClick}
            disabled={isSending}
            className="w-full"
          >
            Сохранить
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-106.5 p-10 flex flex-col gap-8.5 md:p-10 md:gap-12 rounded-[30px] items-start shadow-card bg-white">
        <h2 className="w-full text-center text-[32px] leading-[1.1] md:font-semibold md:text-[40px]">
          Ваш прогресс засчитан
        </h2>
        <Image
          className="self-center"
          alt=""
          width={68}
          height={68}
          src="/images/check-in-circle-big.svg"
        ></Image>
      </div>
    );
  }
};

export default ExerciseModal;
