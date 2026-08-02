const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-text-secondary text-base font-normal leading-[1.1] bg-[#f7f7f7] p-2.5 rounded-[50px] flex gap-1.5 items-center">
      {children}
    </div>
  );
};

export default Label;
