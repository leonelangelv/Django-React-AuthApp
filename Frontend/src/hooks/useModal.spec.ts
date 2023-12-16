import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';
import { useModal } from './useModal';

describe('Given the useModal hook', () => {
  test('Should init whit initial values', () => {
    const { result } = renderHook(() => useModal());
    const [isOpen, , ] = result.current;

    expect(isOpen).toBe(false);
  });

  test('Should change state of isOpen when openModal and closeModal are called', () => {
    const { result } = renderHook(() => useModal());
    const [, openModal, closeModal ] = result.current;

    act(() => {
      openModal();
    });
    const resultOpenModal = result.current[0];
    act(() => {
      closeModal();
    });
    const resultCloseModal = result.current[0];

    expect(resultOpenModal).toBe(true);
    expect(resultCloseModal).toBe(false);
  });
});
