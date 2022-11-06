import { Box, Container, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { verboseLog } from '../../../../config/debug';
import useWizard from '../../../../hooks/use-wizard';
import { Button } from '../../../../ui/core/button/button';
import { RadioGroup } from '../../../../ui/core/form/radio-group/radio-group';
import LoginAbhaNumberRecovery from '../../components/login-recovery/login-recovery-aadhaar-number';
import LoginRecoveryOtpForm from '../../components/login-recovery/login-recovery-aadhaar-otp-form';
import LoginRecoveryMobileOtpForm from '../../components/login-recovery/login-recovery-mobile-otp-form';

export function LoginRecovery() {
  const { t } = useTranslation();
  const { activeStep, completed, handleNext, handleStep } = useWizard();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      recoveryOption: '',
    },
  });

  const onHandleOptionNext = () => {
    getValues().recoveryOption === 'AADHAAR_OTP' && handleStep(1);
    getValues().recoveryOption === 'MOBILE_OTP' && handleStep(3);
  };

  return (
    <Container
      maxWidth="md"
      data-testid="registerpage"
      sx={{ boxShadow: '0px 3px 6px #00000014;' }}
    >
      {verboseLog(activeStep, 'active')}
      <Box
        sx={{
          p: 2,
          mt: 1,
          borderRadius: 2,
        }}
      >
        <Typography align="center" variant="h2">
          {t('ABHA number Retrieval')}
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ p: 2 }}>
          {!completed ? (
            <>
              {activeStep === 0 && (
                <Box>
                  <Typography align="left" variant="subtitle1">
                    <b>
                      {t(
                        'You can recover your account either using Aadhaar number or registered Mobile Number. Recovery using any of the following methods requires filling out your basic details and access to your linked mobile.'
                      )}
                    </b>
                  </Typography>
                  <Box m="25px 0 0 0">
                    <RadioGroup
                      name={'recoveryOption'}
                      row={false}
                      label={'Choose Recovery Option'}
                      defaultValue={getValues().recoveryOption}
                      {...register('recoveryOption', {
                        required: 'Choose Recovery Option is required',
                      })}
                      items={[
                        { value: 'AADHAAR_OTP', label: 'Aadhaar Number' },
                        { value: 'MOBILE_OTP', label: 'Mobile Number' },
                      ]}
                      error={errors.recoveryOption?.message}
                    />
                  </Box>
                  <Box textAlign="end" m="25px 0 0 0">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit(onHandleOptionNext)}
                    >
                      {t('continue')}
                    </Button>
                  </Box>
                </Box>
              )}
              {activeStep === 1 && (
                <LoginAbhaNumberRecovery onNext={handleNext} type={'AADHAAR_OTP'} />
              )}
              {activeStep === 2 && <LoginRecoveryOtpForm />}
              {activeStep === 3 && (
                <LoginAbhaNumberRecovery onNext={handleNext} type={'MOBILE_OTP'} />
              )}
              {activeStep === 4 && <LoginRecoveryMobileOtpForm type={'RECOVERY'} />}
            </>
          ) : (
            <>No data</>
          )}
        </Box>
      </Box>
    </Container>
    //
  );
}

export default LoginRecovery;
