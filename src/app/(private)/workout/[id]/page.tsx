import Button from '@/components/Button/Button';
import Execute from '@/components/Workout/Execute';

const Workout = () => {
  return (
    <main className="flex flex-col gap-6 mt-10 lg:mt-15 lg:gap-10 max-w-290 mx-auto px-4 md:px-6 lg:px-8 xl:px-0">
      <h1 className="text-2xl font-medium leading-[1.1] lg:text-[60px] lg:leading-none">
        Йога
      </h1>
      <video className="w-full rounded-[9px] md:rounded-[30px]" controls>
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
      </video>
      <div className="flex flex-col gap-10 w-full p-7.5 rounded-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] self-stretch sm:self-start lg:p-10 ">
        <div className="flex flex-col gap-5">
          <h2 className="text-[32px] leading-[1.1]">Упражнения тренировки 2</h2>
          <div className="grid gap-6 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Execute title="Наклоны вперед" progress={40} />
            <Execute title="Наклоны назад" progress={40} />
            <Execute title="Наклоны ног, согнутых в коленях" progress={40} />
            <Execute title="Наклоны вперед" progress={40} />
            <Execute title="Наклоны назад" progress={40} />
            <Execute title="Наклоны ног, согнутых в коленях" progress={40} />
            <Execute title="Наклоны вперед" progress={40} />
            <Execute title="Наклоны назад" progress={40} />
            <Execute title="Наклоны ног, согнутых в коленях" progress={40} />
          </div>
        </div>
        <Button className="max-w-80">Обновить свой прогресс</Button>
      </div>
    </main>
  );
};

export default Workout;
