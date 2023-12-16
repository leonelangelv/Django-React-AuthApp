import { useContext, useEffect, useState } from 'react';
import {
  GetUserFlagResponse,
  getUserFlagRequest
} from '@services/getUserFlagRequest';
import { UserContext } from '@contexts/UserContext';
import { UpdateProfileImg } from '../update-profile-img';
import { useModal } from '@hooks/useModal';
import { DEFAULT_USER_IMG } from '@constant/index';

import styles from './UserProfileImg.module.css';

export const UserProfileImg = () => {
  const { userData } = useContext(UserContext);

  const [userFlag, setUserFlag] = useState<GetUserFlagResponse>(
    {} as GetUserFlagResponse
  );

  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    (async () => {
      const userCountry = userData.user.country;
      if (userCountry) {
        const res = await getUserFlagRequest(userCountry);
        if (res.ok) {
          setUserFlag(res);
        }
      } else {
      }
    })();
  }, [userData.user]);

  const personalData = userData.user;

  const [isOpenUpdateImg, openUpdateImg, closeUpdateImg] = useModal(false);

  return (
    <section className={styles.userProfile__contianer__user__profile}>
      {isOpenUpdateImg && (
        <UpdateProfileImg
          closeModal={closeUpdateImg}
          setUserImage={setUserImage}
        />
      )}

      <div className={styles.userProfile__contianer__user__profile__img__box}>
        <img
          src={userImage || DEFAULT_USER_IMG}
          alt={personalData.name.concat(' ', personalData.lastname)}
          title={personalData.name.concat(' ', personalData.lastname)}
          className={styles.userProfile__contianer__user__profile__img}
        />
        <button
          title='Edit image'
          className={styles.userProfile__contianer__user__profile__editImg}
          onClick={openUpdateImg}
        >
          🖊
        </button>
      </div>
      <div
        className={styles.userProfile__contianer__user__profile__flagCountry}
      >
        {userData.user.country && (
          <img
            src={userFlag.flag}
            alt={`${userFlag.name} flag`}
            title={`${userFlag.name} flag`}
            className={
              styles.userProfile__contianer__user__profile__flagCountry
            }
          />
        )}
      </div>
    </section>
  );
};
