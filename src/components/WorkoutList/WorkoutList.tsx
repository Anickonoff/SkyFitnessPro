import Button from '../Button/Button';

const WorkoutList = () => {
  return (
    <div className="w-full max-w-115 p-7.5 flex flex-col gap-8.5 md:p-10 md:gap-12 radius-[30px] items-start shadow=[0_4px_67px_-12px_rgba(0,0,0,0.13]">
      <h1 className="self-stretch text-[32px] leading-[1.1] text-black">
        Выберите тренировку
      </h1>
      <div className="flex flex-col gap-8.5 items-center self-stretch">
        <div className="pr-5 flex flex-col gap-2.5 max-h-84 overflow-auto">
          <div className="flex flex-row gap-2.5 pb-2.5 border-b-[#C4c4c4] items-center">
            <img src="/images/Check-in-Circle.svg" />
            <div className="flex flex-col gap-2.5 justify-center items-start">
              <p className="text-lg leading-[1.1]">Утренняя практика</p>
              <p className="text-sm leading-[1.1]">
                Йога на каждый день / 1 день{' '}
              </p>
            </div>
          </div>
        </div>
        <Button>Начать</Button>
      </div>
    </div>
  );
};
