import { useState } from 'react';

import MobileAuthenticationForm from './driving-licence-mobile-authentication-form';
import MobileAuthenticationOTPForm from './driving-licence-mobile-authentication-otp-form';

import styles from '../../sub-pages/register-driving-licence/register-driving-licence.module.scss';

export function MobileAuthentication({ onNext }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = () => {
    setActiveStep(1);
  };

  return (
    <div className={styles.main} data-testid="mobile-authentication-form">
      {activeStep === 0 && <MobileAuthenticationForm onNext={handleStepChange} />}
      {activeStep === 1 && <MobileAuthenticationOTPForm onNext={onNext} />}
    </div>
  );
}

export default MobileAuthentication;
