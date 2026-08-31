type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div
      className="w-full h-1.5 bg-progress-bg rounded-full"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Прогресс прохождения курса"
    >
      <div
        className="bg-progress-bar h-1.5 rounded-full"
        style={{ width: `${progress > 100 ? 100 : progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
