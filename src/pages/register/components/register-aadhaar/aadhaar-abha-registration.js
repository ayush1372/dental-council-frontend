import { useState } from 'react';

import { Box } from '@mui/material';

import ABHAEmailForm from './aadhaar-abha-email-form';
import AbhaNumberCreation from './aadhaar-mobile-number-form';
export function AadhaarABHARegisterForm({ onNext }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleEmail = async () => {
    setActiveStep(1);
  };
  return (
    <Box>
      {activeStep === 0 && <AbhaNumberCreation handleEmail={handleEmail} />}
      {activeStep === 1 && <ABHAEmailForm handleEmail={handleEmail} onNext={onNext} />}
    </Box>
  );
}
export default AadhaarABHARegisterForm;
