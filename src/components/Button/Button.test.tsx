import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Компонент Button', () => {
  it('корректно отображает переданный текст (children)', () => {
    render(<Button>Нажми меня</Button>);
    const buttonElement = screen.getByRole('button', { name: /нажми меня/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('применяет дефолтные стили и атрибут type="button"', () => {
    render(<Button>Тест</Button>);

    const buttonElement = screen.getByRole('button', { name: /тест/i });
    expect(buttonElement).toHaveAttribute('type', 'button');
    expect(buttonElement).toHaveClass('bg-accent');
    expect(buttonElement).toHaveClass('px-6.5');
    expect(buttonElement).toHaveClass('py-4');
  });

  it('применяет классы варианта secondary и размера small', () => {
    render(
      <Button variant="secondary" size="small">
        Второстепенная
      </Button>,
    );

    const buttonElement = screen.getByRole('button', {
      name: /второстепенная/i,
    });

    expect(buttonElement).toHaveClass('bg-white');
    expect(buttonElement).toHaveClass('border');
    expect(buttonElement).toHaveClass('px-4');
    expect(buttonElement).toHaveClass('py-2');
  });

  it('вызывает обработчик onClick при клике пользователем', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Кликни</Button>);

    const buttonElement = screen.getByRole('button', { name: /кликни/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick и имеет атрибут disabled в заблокированном состоянии', () => {
    const handleClick = jest.fn();

    render(
      <Button disabled onClick={handleClick}>
        Заблокировано
      </Button>,
    );

    const buttonElement = screen.getByRole('button', {
      name: /заблокировано/i,
    });

    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('поддерживает кастомный className и атрибут type="submit"', () => {
    render(
      <Button type="submit" className="custom-class">
        Отправить
      </Button>,
    );

    const buttonElement = screen.getByRole('button', { name: /отправить/i });

    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('custom-class');
  });
});
