export interface PasswordRecovery {
  onNext: () => void;
  username: string;
  setUsername?: (value: string) => void;
}
