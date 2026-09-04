import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from './ScrollToTop';

describe('Компонент ScrollToTop', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендер кнопки с классами по умолчанию', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { name: /наверх/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('mt-6');
  });

  it('Вызов функцииscrollTo при клике на кнопку', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { name: /наверх/i });
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('Проверка кастомного className', () => {
    render(<ScrollToTop className="custom" />);
    const button = screen.getByRole('button', { name: /наверх/i });
    expect(button).toHaveClass('custom');
  });
});
