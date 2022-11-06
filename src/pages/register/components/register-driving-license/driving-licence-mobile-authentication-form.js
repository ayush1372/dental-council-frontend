import { Box, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { verboseLog } from '../../../../config/debug';
import { generateMobileOTP } from '../../../../store/actions/register-driving-licence-actions';
import { TextField } from '../../../../ui/core';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

import styles from '../../sub-pages/register-driving-licence/register-driving-licence.module.scss';

export function MobileAuthenticationForm({ onNext }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let mobileOtpData = useSelector((state) => state.getRegisterDrivingLicence.generateMobileOTP);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      MobileNumber: '',
    },
  });

  const onSubmit = (data) => {
    try {
      let req = { mobile: data.MobileNumber };
      dispatch(generateMobileOTP(req));
      verboseLog('mobileOtpData', mobileOtpData);
      onNext();
    } catch (err) {
      verboseLog('usersListData', err);
    }
  };

  return (
    <div className={styles.main} data-testid="mobile-authentication">
      <Box>
        <Box>
          <Box
            sx={{
              backgroundColor: 'background.default',
              p: 2,
              mt: 1,
              borderRadius: 2,
            }}
          >
            <Typography variant="caption">
              <Box>
                <Box sx={{ fontSize: 'large' }}>
                  {t('mobile_Number_to_used_with_your_ABHA_number')}
                </Box>
                <Divider sx={{ my: 3 }} />
              </Box>
              <Box>
                <TextField
                  label={t('Enter Mobile Number')}
                  fullWidth
                  type={'number'}
                  name={'MobileNumber'}
                  placeholder={t('Enter Mobile Number')}
                  defaultValue={getValues().MobileNumber}
                  error={errors.MobileNumber?.message}
                  // inputProps={{
                  //   maxLength:
                  // }}
                  {...register('MobileNumber', {
                    required: 'Mobile Number is not valid',
                    pattern: {
                      value: /^(\d{10})$/i,
                      message: 'Mobile Number is not valid',
                    },
                    maxLength: 10,
                  })}
                />
              </Box>

              <Box sx={{ fontSize: 'medium' }}>
                <i>{t('authenticate_your_abha_number')}</i>
              </Box>
            </Typography>
          </Box>
        </Box>
        <ButtonGroupWizard handleNext={handleSubmit(onSubmit)} labelNext={t('Next')} />
      </Box>
    </div>
  );
}

export default MobileAuthenticationForm;
