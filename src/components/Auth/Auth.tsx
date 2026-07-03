import Button from '../Button/Button';

const Auth = () => {
  return (
    <div className="max-w-90 w-full p-10 flex flex-col justify-start items-center gap-12 rounded-[30px] bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)]">
      <img src="/images/logo.png" alt="Logo" className="h-8.75" />
      <div className="flex flex-col gap-8.5">
        <div className="flex flex-col gap-2.5">
          <input
            type="text"
            placeholder="Логин"
            className="w-full rounded-lg border border-[d0cece] py-4 px-4.5 text-black text-[18px] leading-[1.1]"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full rounded-lg border border-[d0cece] py-4 px-4.5 text-black text-[18px] leading-[1.1]"
          />
          <p className="text-center text-[#db0030] text-[14px] leading-[1.1]">
            Пароль введен не верно, попробуйте ещё раз.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <Button onClick={() => alert('Button clicked!')}>Войти</Button>
          <Button onClick={() => alert('Button clicked!')} variant="secondary">
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
