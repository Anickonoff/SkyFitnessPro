import { act, renderHook } from '@testing-library/react';
import { useAuthModal } from './useAuthModal';
import { AuthModalContext } from '@/context/AuthModalContext';

describe('Хук useAuthModal', () => {
  it('Ошибка при вызове вне провайдера', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => renderHook(() => useAuthModal())).toThrow(
      'useAuthModal должен использоваться внутри AuthModalProvider',
    );

    consoleErrorSpy.mockRestore();
  });

  it('Успешно возвращает контекст при вызове внутри провайдера', () => {
    const mockContextValue = {
      openAuthModal: jest.fn(),
      closeAuthModal: jest.fn(),
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <AuthModalContext.Provider value={mockContextValue}>
          {children}
        </AuthModalContext.Provider>
      );
    };

    const { result } = renderHook(() => useAuthModal(), { wrapper });

    expect(result.current).toEqual(mockContextValue);

    act(() => {
      result.current.openAuthModal();
    });
    expect(mockContextValue.openAuthModal).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.closeAuthModal();
    });
    expect(mockContextValue.closeAuthModal).toHaveBeenCalledTimes(1);
  });
});
