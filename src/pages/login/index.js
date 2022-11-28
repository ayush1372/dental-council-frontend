import { useState } from 'react';

import {
  Box,
  Container,
  Divider,
  Grid,
  // InputAdornment,
  Link,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { yearsData } from '../../constants/common-data';
import CaptchaComponent from '../../shared/captcha-component/captcha-component';
import { setMobileNumber } from '../../store/reducers/common-reducers';
import { Button, TextField } from '../../ui/core';
import MobileNumber from '../../ui/core/mobile-number/mobile-number';

import styles from './login.module.scss';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isloginType, setLoginType] = useState('abhaNumber');
  const [isAbhaTabSelected, setAbhaTabSelected] = useState(true);
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      loginUsing: 'abhaNumber',
      ABHANumber: '',
      // YearOfBirth: '',
      mobileNo: '',
    },
  });

  // const onHandleLogin = (e) => {
  //   clearErrors();
  //   setLoginType(e.target.value);
  // };

  const handleNext = () => {
    if (isloginType === 'mobile') {
      navigate('mobile');
      dispatch(setMobileNumber(getValues()?.mobileNo?.toString()));
    } else {
      navigate('abha-number');
    }
  };

  const handleTab = (value, abhaTab) => {
    setAbhaTabSelected(abhaTab);
    clearErrors();
    setLoginType(value);
  };
  return (
    <Container
      maxWidth="md"
      data-testid="registerpage"
      // sx={{ boxShadow: '0px 3px 6px #00000014;', mt: 4 }}
      mt={4}
    >
      <Box pt={4}>
        <Typography variant="h2">Login To Your Account</Typography>
      </Box>
      <Box mb={2}>
        <Tabs aria-label="basic tabs example">
          <Tab
            label={
              <Typography variant="subtitle1" color="textPrimary.main">
                ABHA Number
              </Typography>
            }
            className={isAbhaTabSelected ? styles.optionTabs_selected : styles.optionTabs}
            onClick={() => handleTab('abhaNumber', true)}
            sx={{
              mr: '2px',
              boxShadow: 1,
              width: '256px',
              minWidth: '256px',
              height: '80px',
              minHeight: '80px',
            }}
          />
          <Tab
            label={
              <Typography variant="subtitle1" color="textPrimary.main">
                Mobile
              </Typography>
            }
            className={!isAbhaTabSelected ? styles.optionTabs_selected : styles.optionTabs}
            onClick={() => handleTab('mobile', false)}
            sx={{
              boxShadow: 1,
              width: '256px',
              minWidth: '256px',
              height: '80px',
              minHeight: '80px',
            }}
          />
        </Tabs>
      </Box>
      <Box p={4} boxShadow="1" borderRadius="2px" border="1px solid inputBorderColor.main">
        {isloginType === 'abhaNumber' ? (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box maxWidth={'407px'}>
                  <TextField
                    label={t('ABHA Number')}
                    fullWidth={true}
                    required={true}
                    data-testid={'abha-no-testid'}
                    name={'ABHANumber'}
                    variant="outlined"
                    margin="dense"
                    placeholder={t('ABHA Number')}
                    defaultValue={getValues().ABHANumber}
                    error={errors.ABHANumber?.message}
                    {...register('ABHANumber', {
                      required: 'ABHA Number is required',
                      pattern: {
                        value: /^\d{2}-?\d{4}-?\d{4}-?\d{4}$/i,
                        message: 'ABHA Number required',
                      },
                    })}
                  />
                </Box>
              </Grid>
              {/* <Grid item xs={12}>
                <Box>
                  <Select
                    fullWidth
                    label={'Year Of Birth'}
                    error={errors.YearOfBirth?.message}
                    name="YearOfBirth"
                    dataTestSelectId="login-year-select"
                    dataTestOptionId="login-year-option"
                    defaultValue={getValues().YearOfBirth}
                    {...register('YearOfBirth', {
                      required: 'Year Of Birth is required',
                    })}
                    options={yearsData}
                  />
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        ) : (
          <MobileNumber register={register} getValues={getValues} errors={errors} />
        )}
        <CaptchaComponent />
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            data-testid={'login-btn-testid'}
            variant="contained"
            color="secondary"
            onClick={handleSubmit(handleNext)}
            // loading={isLoading}
          >
            {t('Continue')}
          </Button>
        </Box>
        <Box mt={4}>
          <Divider sx={{ my: 3 }} />
          <Box display="flex" textAlign={'center'}>
            <Typography>
              <Link variant="body1" color={'secondary'} href="recovery">
                Forgot Your ABHA Number?
              </Link>{' '}
              |{' '}
              <Link variant="body1" color={'secondary'} href="track">
                Tack Your Enrolment Number?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
