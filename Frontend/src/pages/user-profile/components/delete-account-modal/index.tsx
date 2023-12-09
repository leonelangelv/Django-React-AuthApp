import { FC, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { USER_KEY } from '@constant/index';
import { ErrorMessage } from '@components/Alerts/ErrorMessage';
import { formDeleteAccountValidation } from '@helpers/formsValidations';
import { InputForm } from '@components/InputForm';
import { UserContext } from '@contexts/UserContext';
import { deleteAccountRequest } from '@services/deleteAccountRequest';

import styles from './DeleteAccountModal.module.css';

interface Props {
  closeModal: () => void;
}

export const DeleteAccountModal: FC<Props> = ({ closeModal }) => {
  const { userData } = useContext(UserContext);

  const [confirm, setConfirm] = useState(false);

  const { handleSubmit, getFieldProps, status, setStatus, touched, errors } =
    useFormik({
      initialValues: {
        password: ''
      },
      validationSchema: formDeleteAccountValidation,
      onSubmit: async (values) => {
        try {
          const userDataDelete = {
            userId: userData.userId,
            password: values.password
          };

          const res = await deleteAccountRequest(
            userData.access_token,
            userDataDelete
          );

          if (!res.ok) setStatus(res.message);
          else {
            setStatus('');
            localStorage.removeItem(USER_KEY);
            window.location.reload();
          }
        } catch (error) {
          console.error('Error in deleteAccountRequest: ', error);
          throw new Error('Error during request for delete account');
        }
      }
    });

  return (
    <div className={styles['delete-account__container']}>
      {confirm && (
        <div
          className={styles['delete-account__container__delete__box__confirm']}
        >
          {status && <ErrorMessage message={status} />}
          <p>{userData.user.username}</p>
          <p>Enter your password</p>
          <form
            onSubmit={handleSubmit}
            className={
              styles['delete-account__container__delete__box__confirm__form']
            }
          >
            <InputForm
              type='password'
              placeholder='Password'
              hasError={touched.password && !!errors.password}
              errorMessage={errors.password}
              {...getFieldProps('password')}
            />
            <button
              type='submit'
              className={styles['delete-account__container__button']}
            >
              Delete account
            </button>
          </form>
        </div>
      )}

      {!confirm && (
        <div className={styles['delete-account__container__delete__box']}>
          <p>Do you want to delete your account?</p>
          <button
            onClick={() => {
              setConfirm(true);
            }}
            className={styles['delete-account__container__button']}
          >
            Yes
          </button>
          <button
            onClick={closeModal}
            className={styles['delete-account__container__button']}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};
