import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { saveImageRequest } from '@services/saveImageRequest';
import { UserContext } from '@contexts/UserContext';
import { DEFAULT_USER_IMG } from '@constant/index';

import styles from './UpdateProfileImg.module.css';

interface Props {
  closeModal: () => void;
  setUserImage: Dispatch<SetStateAction<string>>;
}

export const UpdateProfileImg: FC<Props> = ({ closeModal, setUserImage }) => {
  const { userData } = useContext(UserContext);

  const [dragging, setDragging] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [img, setImg] = useState<ArrayBuffer | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    const isImage = files[0].type.startsWith('image');
    if (files.length > 0 && isImage) {
      const file = files[0];
      displayImage(file);
      setSelectedImg(file.name);
    } else {
      setSelectedImg('Select a image');
      setImg(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    const isImage = files?.[0].type.startsWith('image');

    if (files && files.length > 0 && isImage) {
      const file = files[0];
      displayImage(file);
      setSelectedImg(file.name);
    } else {
      setSelectedImg('Select a image');
      setImg(null);
    }
  };

  const displayImage = (file: File) => {
    setImgFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setImg(e.target?.result as ArrayBuffer);
    };

    reader.readAsDataURL(file);
  };

  const handleSaveImg = () => {
    
  }

  useEffect(() => {
    const uploadImage = async () => {
      const user = userData.user.name + ' ' + userData.user.lastname;

      try {
        const res = await saveImageRequest(user, imgFile);
        setUserImage(res.data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    uploadImage();
  }, [imgFile]);

  return (
    <div className={styles['update-profile-img__container']}>
      <div className={`${styles['update-profile-img__modal']}`}>
        <div
          className={styles['update-profile-img__modal__close']}
          onClick={closeModal}
        >
          X
        </div>

        <div className={styles['update-profile-img__modal__selected-img']}>
          <img
            src={
              img?.toString() ||
              DEFAULT_USER_IMG
            }
            alt='nada'
            className={styles['update-profile-img__modal__selected-img__img']}
          />
          <span>{selectedImg || 'No image selected'}</span>
        </div>

        <div
          className={`${styles['update-profile-img__modal__drop-img']} ${
            dragging ? styles['dragging'] : null
          }`}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
        >
          <label
            className={styles['update-profile-img__modal__drop-img__message']}
            htmlFor='input-file'
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
          >
            Drag and drop file here or click to upload
          </label>
          <input
            id='input-file'
            type='file'
            onChange={handleFileInputChange}
            accept='image/*'
            style={{ display: 'none' }}
          />
        </div>

        <div className={styles['update-profile-img__modal__buttons']}>
          <button
            onClick={() => {
              closeModal();
              handleSaveImg();
            }}
            className={styles['update-profile-img__modal__buttons__button']}
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className={styles['update-profile-img__modal__buttons__button']}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
