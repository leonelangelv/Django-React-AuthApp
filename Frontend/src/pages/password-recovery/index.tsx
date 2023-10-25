import { useState } from 'react';

import s from './PasswordRecovery.module.css';

import { RecoveryDataCard } from './components/recovery-data-card';
import { EnterCodeCard } from './components/enter-code-card';
import { NewPasswordCard } from './components/new-password-card';
import { PasswordSavedCard } from './components/password-saved-card';

type Stage = 'recoveryData' | 'enterCode' | 'newPassword' | 'passwordSaved';

export const PasswordRecovery = () => {
  const [stage, setStage] = useState<Stage>('recoveryData');

  const stages: Record<Stage, JSX.Element> = {
    recoveryData: <RecoveryDataCard onNext={() => setStage('enterCode')} />,
    enterCode: <EnterCodeCard onNext={() => setStage('newPassword')} />,
    newPassword: <NewPasswordCard onNext={() => setStage('passwordSaved')} />,
    passwordSaved: <PasswordSavedCard />
  };

  return <div className={s.poasswordRecovery__container}>{stages[stage]}</div>;
};
