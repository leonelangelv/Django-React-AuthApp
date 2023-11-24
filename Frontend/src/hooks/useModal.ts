import { useState } from 'react';

type UseModalReturnType = [boolean, () => void, () => void];

export const useModal = (initialValue: boolean = false): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return [isOpen, openModal, closeModal];
};
