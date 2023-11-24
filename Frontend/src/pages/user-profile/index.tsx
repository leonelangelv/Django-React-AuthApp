import { useState } from 'react';
import { InputForm } from '@components/InputForm';
import { useModal } from '@hooks/useModal';
import { HeaderUserProfile } from './components/header-userProfile';
import { LoaderBar } from '@components/loaders/loader-bar';

import styles from './UserProfile.module.css';

export const UserProfile = () => {
  const [dataEdit, setDataEdit] = useState(true);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const handleClick = () => {
    setDataEdit(!dataEdit);
  };

  const { isOpen, closeModal, openModal } = useModal(false);

  return (
    <section className={styles.userProfile__contianer}>
      {deleteAccount && (
        <div className={styles.loaderBar__box}>
          <LoaderBar message='Deleting' />
        </div>
      )}
      {isOpen && (
        <div className={styles.deleteAccount__container}>
          <div className={styles.deleteAccount__container__delete__box}>
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
      )}

      <HeaderUserProfile />

      <article className={styles.userProfile__contianer__user}>
        <section className={styles.userProfile__contianer__user__profile}>
          <div className={styles.userProfile__contianer__user__profile__img__box}>
            <img
              src='https://th.bing.com/th/id/OIP.qDwy8_W3I3nDq0A89Mmk5QHaHa?w=191&h=191&c=7&r=0&o=5&pid=1.7'
              alt='Don Pepito'
              title='Don Pepito'
              className={styles.userProfile__contianer__user__profile__img}
            />
            <button
              title='Edit image'
              className={styles.userProfile__contianer__user__profile__editImg}
            >
              🖊
            </button>
          </div>
          <img
            src='https://th.bing.com/th?id=OIP.g8nzSYYKVcA4_9Ct31W1LwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
            alt='Flag Argentina'
            title='Flag Argentina'
            className={styles.userProfile__contianer__user__profile__flagCountry}
          />
        </section>

        <section className={styles.userProfile__contianer__user__userData}>
          <article className={styles.userProfile__contianer__user__userData__data}>
            <h3>Personal data</h3>
            <form className={styles.userProfile__contianer__user__userData__form}>
              <div>
                <label htmlFor=''>Name</label>
                <InputForm
                  type='text'
                  placeholder='Name'
                  disabled={dataEdit}
                  value={'Leonel Angel'}
                />
              </div>
              <div>
                <label htmlFor=''>Last name</label>
                <InputForm
                  type='text'
                  placeholder='Last name'
                  disabled={dataEdit}
                  value={'Gudiño'}
                />
              </div>
              <div>
                <label htmlFor=''>Username</label>
                <InputForm
                  type='text'
                  placeholder='Username'
                  disabled={dataEdit}
                  value={'leonelito151'}
                />
              </div>
              <div>
                <label htmlFor=''>Password</label>
                <InputForm
                  type='password'
                  placeholder='Password'
                  disabled={dataEdit}
                  value={234235235}
                />
                {!dataEdit && (
                  <div>
                    <label htmlFor='' style={{ width: '1rem' }}>
                      Repet password
                    </label>
                    <InputForm type='passwor' placeholder='Repeat Passoword' />
                  </div>
                )}
              </div>
              <div
                className={
                  styles.userProfile__contianer__user__userData__form__select__box
                }
              >
                <label htmlFor='country'>Country</label>
                <select name='' id='' disabled={dataEdit}>
                  <option value='' selected disabled>
                    Country
                  </option>
                  <option value=''>Argentina</option>
                  <option value=''>Brasil</option>
                </select>
              </div>
              <div
                className={
                  styles.userProfile__contianer__user__userData__form__select__box
                }
              >
                <label htmlFor='province'>Province</label>
                <select name='' id='' disabled={dataEdit}>
                  <option value='' selected disabled>
                    Province
                  </option>
                  <option value=''>Mendoza</option>
                  <option value=''>Buenos Aires</option>
                </select>
              </div>
            </form>

            {dataEdit ? (
              <button
                onClick={handleClick}
                className={
                  styles.userProfile__contianer__user__userData__data__buttonEdit
                }
              >
                {dataEdit ? 'Edit 🖊' : 'Save 💾'}
              </button>
            ) : (
              <div>
                <button
                  onClick={handleClick}
                  className={
                    styles.userProfile__contianer__user__userData__data__buttonEdit
                  }
                >
                  {dataEdit ? 'Edit 🖊' : 'Save 💾'}
                </button>
                <button
                  onClick={handleClick}
                  className={
                    styles.userProfile__contianer__user__userData__data__buttonEdit
                  }
                >
                  Cancel
                </button>
              </div>
            )}
          </article>
          <button
            onClick={openModal}
            className={styles.userProfile__contianer__user__userData__buttonDelete}
          >
            Delete account
          </button>
        </section>
      </article>
    </section>
  );
};
