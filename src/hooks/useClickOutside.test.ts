import { fireEvent, renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('Тестирование хука useClickOutside', () => {
  let targetElement: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  beforeEach(() => {
    targetElement = document.createElement('div');
    outsideElement = document.createElement('div');
    document.body.appendChild(targetElement);
    document.body.appendChild(outsideElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('Должен вызвать колбэк, если клик произошел вне элемента', () => {
    const callback = jest.fn();
    const ref = { current: targetElement };

    renderHook(() => useClickOutside(ref, callback));

    fireEvent.mouseDown(outsideElement);
    fireEvent.mouseUp(outsideElement);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Не должен вызывать колбэк, если клик произошел внутри элемента', () => {
    const callback = jest.fn();
    const ref = { current: targetElement };

    renderHook(() => useClickOutside(ref, callback));

    fireEvent.mouseDown(targetElement);
    fireEvent.mouseUp(targetElement);

    expect(callback).not.toHaveBeenCalled();
  });

  it('Работа с массивом refs - клик по внешнему элементу', () => {
    const callback = jest.fn();
    const ref = { current: targetElement };
    const secondElement = document.createElement('div');
    document.body.appendChild(secondElement);
    const refs = [ref, { current: secondElement }];

    renderHook(() => useClickOutside(refs, callback));

    fireEvent.mouseDown(targetElement);
    fireEvent.mouseUp(targetElement);

    expect(callback).not.toHaveBeenCalled();

    fireEvent.mouseDown(secondElement);
    fireEvent.mouseUp(secondElement);

    expect(callback).not.toHaveBeenCalled();

    fireEvent.mouseDown(outsideElement);
    fireEvent.mouseUp(outsideElement);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Снятие слушателей событий при размонтировании', () => {
    const callback = jest.fn();
    const ref = { current: targetElement };

    const { unmount } = renderHook(() => useClickOutside(ref, callback));

    unmount();

    fireEvent.mouseDown(outsideElement);
    fireEvent.mouseUp(outsideElement);

    expect(callback).not.toHaveBeenCalled();
  });
});
