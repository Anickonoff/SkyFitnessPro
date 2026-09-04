import { render, screen, fireEvent } from '@testing-library/react';
import ModalWrapper from './ModalWrapper';
describe('Компонент ModalWrapper', () => {
  it('Рендер содержимого', () => {
    render(
      <ModalWrapper>
        <div>Контент</div>
      </ModalWrapper>,
    );
    expect(screen.getByText('Контент')).toBeInTheDocument();
  });
  it('Блокировка и восстановление скролла body', () => {
    const { unmount } = render(
      <ModalWrapper>
        <div>Контент</div>
      </ModalWrapper>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
  it('Закрытие по нажатию Escape', () => {
    const handleClose = jest.fn();
    render(
      <ModalWrapper onClose={handleClose}>
        <div>Контент</div>
      </ModalWrapper>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('Игнорирование других клавиш', () => {
    const handleClose = jest.fn();
    render(
      <ModalWrapper onClose={handleClose}>
        <div>Контент</div>
      </ModalWrapper>,
    );
    fireEvent.keyDown(document, { key: 'A' });
    expect(handleClose).not.toHaveBeenCalled();
  });
});
