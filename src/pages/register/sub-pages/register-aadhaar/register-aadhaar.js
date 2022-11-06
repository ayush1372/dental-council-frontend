import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useWizard from '../../../../hooks/use-wizard';
import AadhaarConsentForm from '../../../../shared/consent-form/aadhaar-consent-form.';
import Wizard from '../../../../ui/core/wizard';
// import { LinkGuardian } from '../../components/link-guardian/link-guardian';
// import AadhaarABHARegisterForm from '../../components/register-aadhaar/aadhaar-abha-registration';
import {
  // AadhaarDetails,
  ProfileCompletion,
} from '../../components/register-aadhaar/aadhaar-details';
import AadhaarOtpForm from '../../components/register-aadhaar/aadhaar-otp-form';
import ViewAbhaNumber from '../../components/view-abha-number/view-abha-number';

// import styles from '../register-aadhaar/register-aadhaar.module.scss';

const translatedSteps = (translate, steps) => {
  return steps.map((step) => translate(step));
};
export function AadhaarRegister() {
  const { t } = useTranslation();
  const Age = 19;
  const stepsKeys = [
    'Consent Collection',
    'Aadhaar Authentication',
    `${Age < 18 ? 'Linking Of Guardian' : 'Profile Completion'}`,
    `${Age < 18 ? 'Profile Completion' : 'Process Completed'}`,
    // 'ABHA Number Creation',
    // 'Link ABHA Address',
  ];
  const steps = translatedSteps(t, stepsKeys);
  const { activeStep, completed, handleNext, handleBack, progress } = useWizard(0, steps, [
    0,
    20,
    20,
    Age < 18 ? 40 : 10,
    // Age < 18 ? 20 : 50,
  ]);
  return (
    <Container data-testid="register-aadhaar" sx={{ p: '16px', m: '16px auto' }}>
      <Typography variant="h2" mb={6}>
        {t('create_ABHA_number')}
      </Typography>

      <Wizard
        activeStep={activeStep}
        steps={steps}
        handleBack={handleBack}
        handleNext={handleNext}
        progress={progress}
        completed={completed}
      >
        <Box p={5}>
          {!completed ? (
            <>
              {activeStep === 0 && <AadhaarConsentForm onNext={handleNext} />}
              {activeStep === 1 && <AadhaarOtpForm onNext={handleNext} nextStep={activeStep + 2} />}
              {activeStep === 2 && <ProfileCompletion onNext={handleNext} />}
              {activeStep === 3 && <ViewAbhaNumber />}
              {/* {activeStep === 2 && <AadhaarDetails onNext={handleNext} nextStep={activeStep + 2} />*/}
              {/* {activeStep === 4 && <LinkAbhaAddress onNext={handleNext} />} */}
            </>
          ) : (
            <>No data</>
          )}
        </Box>
      </Wizard>
    </Container>
  );
}

export default AadhaarRegister;
