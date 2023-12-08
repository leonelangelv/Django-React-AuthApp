import { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { UserContext } from '@contexts/UserContext';
import {
  CountryWithProvinces,
  GeodataWithProvinces,
  GeodataWithoutProvinces,
  geodataRequest
} from '@services/geodataRequest';
import { userUpdateRequest } from '@services/userUpdateRequest';
import { InputForm } from '@components/InputForm';
import { useModal } from '@hooks/useModal';
import { HeaderUserProfile } from './components/header-userProfile';
import { LoaderBar } from '@components/loaders/loader-bar';
import { DeleteAccountModal } from './components/delete-account-modal';

import styles from './UserProfile.module.css';
import { formUserProfileValidation } from '@helpers/formsValidations';

export const UserProfile = () => {
  const { userData, updateUser } = useContext(UserContext);

  const [dataEdit, setDataEdit] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [geodata, setGeodata] = useState<GeodataWithoutProvinces>(
    {} as GeodataWithoutProvinces
  );
  const [countrySelected, setCountrySelected] = useState('');
  const [provinces, setProvinces] = useState<CountryWithProvinces>(
    {} as CountryWithProvinces
  );

  const { name, lastname, username, country, province } = userData.user;
  const initialValues = {
    name,
    lastname,
    username,
    password: '',
    repetPassword: '',
    country,
    province
  };
  const { handleSubmit, getFieldProps, resetForm, touched, errors, isValid } =
    useFormik({
      initialValues,
      validationSchema: formUserProfileValidation,
      onSubmit: async (values) => {
        try {
          const { username, password, repetPassword, ...valueProcess } = values;
          const finalValues = {
            user_id: userData.userId,
            password,
            repeat_password: repetPassword,
            ...valueProcess
          };
          const res = await userUpdateRequest(
            userData.access_token,
            finalValues
          );

          const valuesForStorage = {
            ...userData,
            user: {
              username,
              ...valueProcess
            }
          };
          updateUser(valuesForStorage);
        } catch (error) {
          console.error('Error in onSubmit in user-profile:', error);
        }
      }
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData.access_token) {
          const res = (await geodataRequest(
            userData.access_token
          )) as GeodataWithoutProvinces;
          setGeodata(res);
        }
      } catch (error) {
        console.error('Error fetching geodata:', error);
      }
    };

    fetchData();
  }, [userData]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        if (userData.access_token && countrySelected) {
          const provincesRes = (await geodataRequest(
            userData.access_token,
            countrySelected
          )) as GeodataWithProvinces;
          setProvinces(provincesRes.countries);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, [countrySelected]);

  const handleClick = () => {
    setDataEdit(!dataEdit);
  };

  const [isOpenDelete, openDeleteModal, closeDeleteModal] = useModal(false);

  const personalData = userData.user;

  return (
    <section className={styles.userProfile__contianer}>
      {deleteAccount && (
        <div className={styles.loaderBar__box}>
          <LoaderBar message='Deleting' />
        </div>
      )}
      {isOpenDelete && (
        <DeleteAccountModal
          setDeleteAccount={setDeleteAccount}
          closeModal={closeDeleteModal}
        />
      )}

      <HeaderUserProfile />

      <article className={styles.userProfile__contianer__user}>
        <section className={styles.userProfile__contianer__user__profile}>
          <div
            className={styles.userProfile__contianer__user__profile__img__box}
          >
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
            className={
              styles.userProfile__contianer__user__profile__flagCountry
            }
          />
        </section>

        <section className={styles.userProfile__contianer__user__userData}>
          <article
            className={styles.userProfile__contianer__user__userData__data}
          >
            <h3>Personal data</h3>
            <form
              className={styles.userProfile__contianer__user__userData__form}
            >
              <div>
                <label htmlFor=''>Name</label>
                <InputForm
                  type='text'
                  placeholder='Name'
                  disabled={!dataEdit}
                  hasError={touched.name && !!errors.name}
                  errorMessage={errors.name}
                  {...getFieldProps('name')}
                />
              </div>
              <div>
                <label htmlFor=''>Last name</label>
                <InputForm
                  type='text'
                  placeholder='Lastname'
                  disabled={!dataEdit}
                  hasError={touched.lastname && !!errors.lastname}
                  errorMessage={errors.lastname}
                  {...getFieldProps('lastname')}
                />
              </div>
              <div>
                <label htmlFor=''>Username</label>
                <InputForm
                  type='text'
                  placeholder='Username'
                  disabled
                  {...getFieldProps('username')}
                />
              </div>
              <div>
                <label htmlFor=''>Password</label>
                <InputForm
                  type='password'
                  placeholder='New password'
                  disabled={!dataEdit}
                  hasError={touched.password && !!errors.password}
                  errorMessage={errors.password}
                  {...getFieldProps('password')}
                />
                {dataEdit && (
                  <div>
                    <label htmlFor='' style={{ width: '1rem' }}>
                      Repet password
                    </label>
                    <InputForm
                      type='password'
                      placeholder='Repeat Password'
                      hasError={touched.repetPassword && !!errors.repetPassword}
                      errorMessage={errors.repetPassword}
                      {...getFieldProps('repetPassword')}
                    />
                  </div>
                )}
              </div>
              <div
                className={
                  styles.userProfile__contianer__user__userData__form__select__box
                }
              >
                <label htmlFor='country'>Country</label>
                <select
                  disabled={!dataEdit}
                  {...getFieldProps('country')}
                  onChange={(e) => {
                    setCountrySelected(e.target.value);
                    getFieldProps('country').onChange(e);
                  }}
                >
                  <option selected disabled>
                    {personalData.country}
                  </option>
                  {geodata.countries?.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={
                  styles.userProfile__contianer__user__userData__form__select__box
                }
              >
                <label htmlFor='province'>Province</label>
                <select disabled={!dataEdit} {...getFieldProps('province')}>
                  <option value='' selected disabled>
                    {personalData.province}
                  </option>
                  {provinces.provinces?.map((province, index) => (
                    <option key={index} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <div>
              <button
                onClick={() => {
                  if (!dataEdit) handleClick();
                  if (dataEdit && isValid) {
                    handleClick();
                    handleSubmit();
                  }
                }}
                className={
                  styles.userProfile__contianer__user__userData__data__buttonEdit
                }
              >
                {!dataEdit ? 'Edit 🖊' : 'Save 💾'}
              </button>
              {dataEdit && (
                <button
                  onClick={() => {
                    handleClick();
                    resetForm();
                  }}
                  className={
                    styles.userProfile__contianer__user__userData__data__buttonEdit
                  }
                >
                  Cancel
                </button>
              )}
            </div>
          </article>
          <button
            onClick={openDeleteModal}
            className={
              styles.userProfile__contianer__user__userData__buttonDelete
            }
          >
            Delete account
          </button>
        </section>
      </article>
    </section>
  );
};
