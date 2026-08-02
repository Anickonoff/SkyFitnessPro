import ProgressBar from '../ProgressBar/ProgressBar';

type ExecuteProps = {
  title?: string;
  progress?: number;
};

const Execute = ({ title = 'Наклоны вперед', progress = 40 }: ExecuteProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[18px] font-normal leading-[1.1]">
        {title + ' ' + progress + '%'}
      </p>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default Execute;
