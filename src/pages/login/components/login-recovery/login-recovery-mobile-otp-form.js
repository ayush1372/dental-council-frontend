import { useState } from 'react';

import { Box, Divider, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

import { verboseLog } from '../../../../config/debug';
import { daysData, monthsData, yearsData } from '../../../../constants/common-data';
// import useCountdown from '../../../../shared/InputOtp/use-countdown';
import { Button, RadioGroup, Select, TextField } from '../../../../ui/core';

import styles from '../../login.module.scss';

export function LoginRecoveryMobileOtpForm({ type, onNext }) {
  const { t } = useTranslation();

  const [otp, setOtp] = useState('');
  const [otpValid, setOtpValid] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Day: '',
      Month: '',
      Year: '',
    },
  });

  const onHandleFormSubmit = () => {
    if (type === 'RECOVERY' && otp.length >= 6) {
      setOtpValid(false);
      navigate('/profile');
    } else {
      if (otp.length >= 6) {
        setOtpValid(false);
        onNext(true);
      } else {
        setOtpValid(true);
      }
    }

    verboseLog('getValues', getValues());
  };

  const onChange = (value) => setOtp(value);

  return (
    <Box>
      <Box>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={4}>
            <Box>
              <TextField
                fullWidth
                required
                data-testid={'login-recovery-firstname-id'}
                label={t('First Name')}
                name={'FirstName'}
                placeholder={t('First Name')}
                defaultValue={getValues().FirstName}
                error={errors.FirstName?.message}
                {...register('FirstName', {
                  required: 'First Name is required',
                })}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <TextField
                fullWidth
                label={t('Middle Name')}
                name={'MiddleName'}
                data-testid={'login-recovery-middlename-id'}
                placeholder={t('Middle Name')}
                defaultValue={getValues().MiddleName}
                {...register('MiddleName')}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <TextField
                fullWidth
                label={t('Last Name')}
                name={'LastName'}
                data-testid={'login-recovery-lastname-id'}
                placeholder={t('Last Name')}
                defaultValue={getValues().LastName}
                {...register('LastName')}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={4}>
            <Box>
              <Select
                defaultValue={getValues().Day}
                name="Day"
                label={'Day'}
                {...register('Day')}
                options={daysData}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Select
                defaultValue={getValues().Month}
                name="Month"
                label={'Month'}
                {...register('Month')}
                options={monthsData}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Select
                fullWidth
                label={'Year'}
                required={true}
                error={errors.Year?.message}
                name="Year"
                defaultValue={getValues().Year}
                {...register('Year', {
                  required: 'Year is required',
                })}
                options={yearsData}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box>
              <RadioGroup
                name={'gender'}
                row={true}
                dataTestid={'login-track-otp-gender'}
                label={'Gender'}
                defaultValue={''}
                {...register('gender', {
                  required: 'Gender is required',
                })}
                items={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
                error={errors.gender?.message}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography sx={{ mb: 1, fontSize: 'medium' }}>
              <b>{t('Mobile OTP')}</b>
            </Typography>
            <Box>
              <OtpInput
                inputStyle={{
                  width: '3rem',
                  height: '3rem',
                  marginRight: '0.8em',
                  fontSize: '2rem',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.3)',
                }}
                isInputNum={true}
                value={otp}
                numInputs={6}
                onChange={onChange}
              />
              {otpValid && (
                <Typography variant="body2" className={styles.invalid}>
                  {'Invalid OTP'}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box align="right">
        <Button
          variant="contained"
          color="secondary"
          data-testid={'loginRecovery-otp-btn-id'}
          onClick={handleSubmit(onHandleFormSubmit)}
        >
          {'Next'}
        </Button>
      </Box>
    </Box>
  );
}
export default LoginRecoveryMobileOtpForm;
