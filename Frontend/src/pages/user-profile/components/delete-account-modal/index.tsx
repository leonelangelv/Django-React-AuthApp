import { FC } from 'react';

import styles from './DeleteAccountModal.module.css';

interface Props {
  setDeleteAccount: (value: boolean) => void;
  closeModal: () => void;
}

export const DeleteAccountModal: FC<Props> = ({
  setDeleteAccount,
  closeModal
}) => {
  return (
    <div className={styles['delete-account__container']}>
      <div className={styles['delete-account__container__delete__box']}>
        <p>Do you want to delete your account?</p>
        <button
          onClick={() => {
            setDeleteAccount(true);
            closeModal();
          }}
        >
          Yes
        </button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
};
