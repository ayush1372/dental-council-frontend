import { Box, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { sendNotificationOtp } from '../../../store/actions/common-actions';
import { Button, TextField } from '../../../ui/core';
import MobileNumber from '../../../ui/core/mobile-number/mobile-number';
import successToast from '../../../ui/core/toaster';

const ForgotPassword = ({ handleConfirmPassword, otpData, userData, resetStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const doctorTitle = 'Enter Email ID';
  const userTitle = 'Enter User ID/Email ID';
  const { state } = useLocation();
  const { loginFormname } = state;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      Id: '',
      mobileNo: '',
    },
  });

  const watchMobileNum = watch('mobileNo')?.trim();
  const watchId = watch('Id')?.trim();
  const isIdActive = (!watchMobileNum && !watchId) || !watchMobileNum;
  const isMobileNumActive = (!watchMobileNum && !watchId) || !watchId;

  const onSubmit = (reSetPassword) => {
    if (!watchMobileNum && !watchId) {
      handleSubmit()();
      return;
    }
    if (watchMobileNum?.length < 10 && watchId.length < 7) {
      handleSubmit()();
      return;
    }

    let sendNotificationOtpBody = {};
    if (getValues()?.mobileNo) {
      sendNotificationOtpBody = { contact: getValues().mobileNo, type: 'sms' };
    } else if (getValues()?.Id?.includes('@')) {
      sendNotificationOtpBody = { contact: getValues().Id, type: 'email' };
    } else {
      sendNotificationOtpBody = { contact: getValues().Id, type: 'nmr_id' };
    }
    try {
      dispatch(sendNotificationOtp(sendNotificationOtpBody)).then();
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg?.data?.message, 'auth-error', 'error', 'top-center');
    }
    otpData(sendNotificationOtpBody);
    if (userData?.page === 'forgotPasswordPage') {
      let otpValue = {
        contact: getValues()?.mobileNo
          ? getValues().mobileNo
          : getValues()?.Id?.includes('@')
          ? getValues().Id
          : getValues().Id,
        type: getValues().mobileNo ? 'sms' : getValues()?.Id?.includes('@') ? 'email' : 'nmr_id',
        page: userData?.page,
        reSetPasswordOtp: onSubmit,
      };
      otpData(otpValue);
    }
    if (userData?.page === 'forgetUserName') {
      let otpValue = {
        contact: getValues()?.mobileNo
          ? getValues().mobileNo
          : getValues()?.Id?.includes('@')
          ? getValues().Id
          : getValues().Id,
        type: getValues().mobileNo ? 'sms' : getValues()?.Id?.includes('@') ? 'email' : 'nmr_id',
        page: userData?.page,
        reSetPasswordOtp: onSubmit,
        handleClose: () => {
          resetStep(0);
        },
      };
      otpData(otpValue);
    }
    reSetPassword !== 'reSetPassword' && handleConfirmPassword();
  };

  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      <Typography
        variant="h2"
        component="div"
        textAlign={userData?.page === 'forgetUserName' ? 'left' : 'center'}
      >
        {userData?.page === 'forgetUserName' ? 'Forgot Username' : 'Forgot Password'}
      </Typography>
      {userData?.page !== 'forgetUserName' && (
        <>
          <Box mt={2}>
            <Typography variant="body1">
              {loginFormname === 'Doctor' ? doctorTitle : userTitle}
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              inputProps={{ maxLength: 100 }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="Id"
              required="true"
              placeholder={t(loginFormname === 'Doctor' ? doctorTitle : userTitle)}
              margin="dense"
              defaultValue={getValues().Id}
              error={isIdActive && errors.Id?.message}
              {...register('Id', {
                required: 'Provide valid ID',
              })}
              disabled={!isIdActive}
            />
          </Box>
          <Divider
            sx={{
              paddingTop: '15px',
            }}
          >
            <Typography variant="body1" color="inputTextColor.main">
              OR
            </Typography>
          </Divider>
        </>
      )}
      <Box mt={2}>
        <Typography variant="body1">
          Enter Mobile Number
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <MobileNumber
          register={register}
          getValues={getValues}
          errors={isMobileNumActive ? errors : {}}
          showCircleCheckIcon={false}
          showhint={false}
          showVerify={false}
          disabled={!isMobileNumActive}
        />
      </Box>
      <Box align="end" mt={3}>
        <Button
          onClick={() => {
            resetStep(0);
          }}
          variant="contained"
          color="grey"
          sx={{
            mr: 2,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'secondary.lightOrange',
            '&:hover': {
              backgroundColor: 'secondary.lightOrange',
            },
          }}
          onClick={onSubmit}
        >
          {t('Submit')}
        </Button>
      </Box>
    </Box>
  );
};
export default ForgotPassword;
