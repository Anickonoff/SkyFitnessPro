type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  return (
    <div
      className="w-full h-1.5 bg-progress-bg rounded-full"
      role="progressbar"
      aria-valuenow={normalizedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Прогресс прохождения курса"
    >
      <div
        className="bg-progress-bar h-1.5 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${normalizedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
