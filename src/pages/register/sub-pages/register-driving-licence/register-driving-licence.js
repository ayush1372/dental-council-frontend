import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useWizard from '../../../../hooks/use-wizard';
import Wizard from '../../../../ui/core/wizard';
import RegisterAbhaCreation from '../../components/register-driving-license/driving-licence-abha-creation';
import RegisterConsent from '../../components/register-driving-license/driving-licence-consent-form';
import MobileAuthentication from '../../components/register-driving-license/driving-licence-mobile-authentication';
import DrivingLicenceVerfication from '../../components/register-driving-license/driving-licence-verfication-form';

import styles from '../../sub-pages/register-driving-licence/register-driving-licence.module.scss';

const translatedSteps = (translate, steps) => {
  return steps.map((step) => translate(step));
};

export function RegisterDrivingLicence() {
  // const { data } = useGet(ApiUrl.contactUs);
  const { t } = useTranslation();

  const stepsKeys = [
    'consent_collection',
    'mobile_authentication',
    'driving_licence_verification',
    'profile_completion',
    'abha_number_creation',
  ];

  const steps = translatedSteps(t, stepsKeys);

  const { activeStep, completed, handleNext, handleBack } = useWizard(0, steps);

  return (
    <div className={styles.main} data-testid="homepage">
      <Container
        maxWidth="md"
        data-testid="registerpage"
        sx={{ boxShadow: '0px 3px 6px #00000014;' }}
      >
        <Typography align="center" variant="h2">
          {t('create_ABHA_number')}
        </Typography>
        <Wizard
          activeStep={activeStep}
          steps={steps}
          handleBack={handleBack}
          handleNext={handleNext}
        >
          <Box sx={{ p: 4 }}>
            {!completed ? (
              <>
                {activeStep === 0 && <RegisterConsent onNext={handleNext} />}
                {activeStep === 1 && <MobileAuthentication onNext={handleNext} />}
                {activeStep === 2 && <DrivingLicenceVerfication onNext={handleNext} />}
                {activeStep === 3 && handleNext()}
                {activeStep === 4 && <RegisterAbhaCreation />}
              </>
            ) : (
              <>No data</>
            )}
          </Box>
        </Wizard>
      </Container>
    </div>
  );
}

export default RegisterDrivingLicence;
