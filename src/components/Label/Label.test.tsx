import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Компонент Label', () => {
  it('Корректный рендер с текстом и картинкой', () => {
    render(
      <Label>
        <svg data-testid="icon" />
        Текст этикетки
      </Label>,
    );

    const label = screen.getByText('Текст этикетки');
    expect(label).toBeInTheDocument();
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });
  it('Проверка базовых стилей', () => {
    render(<Label>Текст этикетки</Label>);
    const label = screen.getByText('Текст этикетки');
    expect(label).toHaveClass('bg-[#f7f7f7]');
    expect(label).toHaveClass('rounded-[50px]');
    expect(label).toHaveClass('flex');
    expect(label).toHaveClass('items-center');
  });
});
