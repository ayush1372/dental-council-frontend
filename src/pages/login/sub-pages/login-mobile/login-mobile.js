import { Box, Container } from '@mui/material';

import useWizard from '../../../../hooks/use-wizard';
import Wizard from '../../../../ui/core/wizard';
import LoginMobileOtpForm from '../../components/login-via-mobile/mobile-otp-form';
import SelectAbhaId from '../../components/login-via-mobile/select-abha-id';

export function LoginMobile() {
  const { activeStep, completed, handleNext, handleBack } = useWizard(0, []);
  return (
    <Container maxWidth="md" sx={{ boxShadow: '0px 3px 6px #00000014;' }}>
      <Box mt={4}>
        <Wizard
          activeStep={activeStep}
          steps={[]}
          handleBack={handleBack}
          handleNext={handleNext}
          progress={false}
        >
          <Box>
            {!completed ? (
              <>
                {activeStep === 0 && <LoginMobileOtpForm onNext={handleNext} />}
                {activeStep === 1 && <SelectAbhaId onNext={handleNext} />}
              </>
            ) : (
              <>No data</>
            )}
          </Box>
        </Wizard>
      </Box>
      {/* <Box p="32px 0" textAlign="center">
        <Typography variant="body3" textAlign="center">
          {`Don't have a ABHA Number? `}
          <Link>Click here</Link>
        </Typography>
      </Box> */}
    </Container>
  );
}

export default LoginMobile;
