import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';

const Main = () => {
  return (
    <main className="px-4 md:px-6 lg:px-8">
      <div className="flex flex-row items-start gap-7 mt-5 mx-auto max-w-290 md:mt-10 lg:mt-15">
        <h1 className="text-black text-[32px] font-medium leading-[1.1] lg:text-6xl lg:leading-none">
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <div className="hidden md:flex relative self-start w-72 px-5 py-4 justify-center items-center bg-accent text-text-secondary text-[32px] font-normal leading-[1.1] shrink-0 ">
          Измени своё тело за полгода!
          <svg
            className="absolute -bottom-4 right-35"
            width="31"
            height="36"
            viewBox="0 0 31 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.25285 34.7255C1.65097 35.9972 -0.601266 34.3288 0.148526 32.4259L12.4256 1.26757C12.9078 0.043736 14.4198 -0.389332 15.4768 0.393651L29.4288 10.7288C30.4858 11.5118 30.5121 13.0844 29.4819 13.9023L3.25285 34.7255Z"
              fill="#BCEC30"
            />
          </svg>
        </div>
      </div>
      <div className="mt-8.5 max-w-290 mx-auto flex gap-6 md:gap-10 md:mt-12.5 flex-wrap justify-start">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Button className="mt-6 ml-auto md:mt-8.5 md:mx-auto ">Наверх ↑</Button>
    </main>
  );
};

export default Main;
