import { FC } from 'react';

interface Props {
  message: string;
}

const styles = {
  color: '#f00',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
};

export const InputErrorMessage: FC<Props> = ({ message }) => {
  return <div style={styles}>{message}</div>;
};
