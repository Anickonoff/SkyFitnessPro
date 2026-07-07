type ProgressBarProps = {
  progress: string;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-1.5 bg-progress-bg rounded-full">
      <div
        className="bg-progress-bar h-1.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
