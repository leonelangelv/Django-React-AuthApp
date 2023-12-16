import { useState } from 'react';
import { RecoveryDataCard } from './components/recovery-data-card';
import { EnterCodeCard } from './components/enter-code-card';
import { NewPasswordCard } from './components/new-password-card';
import { PasswordSavedCard } from './components/password-saved-card';

import styles from './PasswordRecovery.module.css';

type Stage = 'recoveryData' | 'enterCode' | 'newPassword' | 'passwordSaved';

export const PasswordRecovery = () => {
  const [username, setUsername] = useState('');
  const [stage, setStage] = useState<Stage>('recoveryData');

  const stages: Record<Stage, JSX.Element> = {
    recoveryData: (
      <RecoveryDataCard
        onNext={() => setStage('enterCode')}
        username={username}
        setUsername={setUsername}
      />
    ),
    enterCode: (
      <EnterCodeCard
        onNext={() => setStage('newPassword')}
        username={username}
      />
    ),
    newPassword: (
      <NewPasswordCard
        onNext={() => setStage('passwordSaved')}
        username={username}
      />
    ),
    passwordSaved: <PasswordSavedCard />
  };

  return (
    <div className={styles['poassword-recovery__container']}>
      {stages[stage]}
    </div>
  );
};
