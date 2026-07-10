import { ChangeEvent, useState } from 'react';
import Button from '../Button/Button';
import { useAuth } from '@/hooks/useAuth';
import authApi from '@/services/auth/authApi';

type AuthProps = {
  closeform: () => void;
};

const Auth = ({ closeform }: AuthProps) => {
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    password2: false,
  });

  const hanldeChangeAuthMode = () => {
    setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const validateForm = () => {
    const newErrors = { email: false, password: false, password2: false };
    let isValid = true;
    const errorMessages: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email.trim() === '') {
      newErrors.email = true;
      isValid = false;
      errorMessages.push('Введите логин. ');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = true;
      isValid = false;
      errorMessages.push('Введите корректный email. ');
    }
    if (formData.password.trim() === '') {
      newErrors.password = true;
      isValid = false;
      errorMessages.push('Введите пароль. ');
    }

    if (authMode === 'register') {
      const password = formData.password;
      if (formData.password2.trim() === '') {
        newErrors.password2 = true;
        isValid = false;
        errorMessages.push('Введите пароль ещё раз. ');
      }
      if (formData.password !== formData.password2) {
        newErrors.password2 = true;
        newErrors.password = true;
        isValid = false;
        errorMessages.push('Пароли не совпадают. ');
      }
      const isTooShort = password.length < 6;
      const hasUppercase = /[A-Z]/.test(password);

      const specialChars =
        password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/g) || [];
      const hasTwoSpecialChars = specialChars.length >= 2;

      if (isTooShort || !hasUppercase || !hasTwoSpecialChars) {
        newErrors.password = true;
        isValid = false;

        if (isTooShort) {
          errorMessages.push('Пароль должен быть не менее 6 символов. ');
        }
        if (!hasUppercase) {
          errorMessages.push(
            'Пароль должен содержать минимум одну заглавную букву (A-Z). ',
          );
        }
        if (!hasTwoSpecialChars) {
          errorMessages.push(
            'Пароль должен содержать минимум два спецсимвола (например: !, @, #, $, %, ^, &, *). ',
          );
        }
      }
    }
    if (errorMessages.length > 0) {
      setError(errorMessages.join('\n'));
    } else {
      setError('');
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  //TODO отправка запроса и обработка ошибок
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (authMode === 'login') {
        await login({ email: formData.email, password: formData.password });
        closeform();
      } else {
        await authApi.register({
          email: formData.email,
          password: formData.password,
        });

        setAuthMode('login');
        setInfoMsg('Регистрация завершена. Войдите в систему');
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="max-w-90 w-full p-10 flex flex-col justify-start items-center gap-12 rounded-[30px] bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)]">
      <img src="/images/logo.png" alt="Logo" className="h-8.75" />
      <div className="flex flex-col gap-8.5 w-full">
        <div className="flex flex-col gap-2.5">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder={authMode === 'login' ? 'Логин' : 'Эл. почта'}
            className={`w-full rounded-lg border ${errors.email ? 'border-[#db0030]' : 'border-[#d0cece]'} py-4 px-4.5 text-black text-[18px] leading-[1.1]`}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Пароль"
            className={`w-full rounded-lg border ${errors.password ? 'border-[#db0030]' : 'border-[#d0cece]'} py-4 px-4.5 text-black text-[18px] leading-[1.1]`}
          />
          {authMode === 'register' && (
            <input
              type="password"
              name="password2"
              onChange={handleChange}
              value={formData.password2}
              placeholder="Повторите пароль"
              className={`w-full rounded-lg border ${errors.password2 ? 'border-[#db0030]' : 'border-[#d0cece]'} py-4 px-4.5 text-black text-[18px] leading-[1.1]`}
            />
          )}
          {error && (
            <p className="text-center whitespace-pre-line text-[#db0030] text-[14px] leading-[1.1]">
              {error}
            </p>
          )}
          {infoMsg && (
            <p className="text-center whitespace-pre-line text-[#00db25] text-[14px] leading-[1.1]">
              {infoMsg}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2.5">
          <Button onClick={() => handleSubmit()} disabled={hasErrors}>
            {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Button onClick={hanldeChangeAuthMode} variant="secondary">
            {authMode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
