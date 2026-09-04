import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('Компонент ProgressBar', () => {
  it('Обычный рендер 45%', () => {
    render(<ProgressBar progress={45} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuenow', '45');
    expect(bar.firstElementChild).toHaveStyle({ width: '45%' });
  });

  it('Рендер с отрицательным значением прогресса', () => {
    render(<ProgressBar progress={-10} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
    expect(bar.firstElementChild).toHaveStyle({ width: '0%' });
  });

  it('Рендер с значением прогресса более 100', () => {
    render(<ProgressBar progress={150} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
    expect(bar.firstElementChild).toHaveStyle({ width: '100%' });
  });

  it('Проверка атрибутов доступности', () => {
    render(<ProgressBar progress={50} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(bar).toHaveAttribute('aria-label', 'Прогресс прохождения курса');
  });
});
