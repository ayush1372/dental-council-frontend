import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

//import { useLocation } from 'react-router-dom';
import { usersType } from '../../../helpers/functions/common-functions';
import { sendNotificationOtp } from '../../../store/actions/common-actions';
import { loginActiveState } from '../../../store/reducers/login-reducer';
import { Button } from '../../../ui/core';
import MobileNumber from '../../../ui/core/mobile-number/mobile-number';
import successToast from '../../../ui/core/toaster';

//import { EmailRegexValidation } from '../../../utilities/common-validations';

const ForgotPassword = ({ handleConfirmPassword, otpData, userData, resetStep, loginName }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //const doctorTitle = 'Enter Email ID';
  //const userTitle = 'Enter User ID/Email ID';
  // const { state } = useLocation();
  //const { loginFormname } = state;
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
  // const isIdActive = (!watchMobileNum && !watchId) || !watchMobileNum;
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
    const userTypeId = usersType(loginName);
    let sendNotificationOtpBody = {};
    if (getValues()?.mobileNo) {
      sendNotificationOtpBody = {
        contact: getValues().mobileNo,
        type: 'sms',
        user_type: userTypeId,
      };
    } else if (getValues()?.Id?.includes('@')) {
      sendNotificationOtpBody = { contact: getValues().Id, type: 'email', user_type: userTypeId };
    } else {
      sendNotificationOtpBody = { contact: getValues().Id, type: 'nmr_id', user_type: userTypeId };
    }

    dispatch(sendNotificationOtp(sendNotificationOtpBody))
      .then((response) => {
        if (response) {
          otpData(sendNotificationOtpBody);
          if (userData?.page === 'forgotPasswordPage') {
            let otpValue = {
              contact: getValues()?.mobileNo
                ? getValues().mobileNo
                : getValues()?.Id?.includes('@')
                ? getValues().Id
                : getValues().Id,
              type: getValues().mobileNo
                ? 'sms'
                : getValues()?.Id?.includes('@')
                ? 'email'
                : 'nmr_id',
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
              type: getValues().mobileNo
                ? 'sms'
                : getValues()?.Id?.includes('@')
                ? 'email'
                : 'nmr_id',
              page: userData?.page,
              reSetPasswordOtp: onSubmit,
              handleClose: () => {
                resetStep(0);
              },
            };
            otpData(otpValue);
          }
          reSetPassword !== 'reSetPassword' && handleConfirmPassword();
        }
      })
      .catch((allFailMsg) => {
        successToast(
          'ERR_INT: ' + allFailMsg?.data?.response?.data?.message,
          'auth-error',
          'error',
          'top-center'
        );
      });
  };

  return (
    <Box p={3} bgcolor="white.main" boxShadow="4">
      <Typography variant="h2" component="div" textAlign={'left'}>
        {userData?.page === 'forgetUserName' ? 'Recover Your Username' : 'Recover Your Password'}
      </Typography>

      {userData?.page !== 'forgetUserName' && (
        <>
          <Box mt={2}>
            {/* <Typography variant="body1">
              {loginFormname === 'Doctor' ? doctorTitle : userTitle}
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography> */}
            {/* <TextField
              inputProps={{ maxLength: 100 }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="Id"
              required="true"
              placeholder={t(loginFormname === 'Doctor' ? doctorTitle : 'Enter user ID/email ID')}
              margin="dense"
              defaultValue={getValues().Id}
              error={isIdActive && errors.Id?.message}
              {...register('Id', EmailRegexValidation)}
              disabled={!isIdActive}
            /> */}
          </Box>
          {/* <Divider
            sx={{
              paddingTop: '15px',
            }}
          >
            <Typography variant="body1" color="inputTextColor.main">
              OR
            </Typography>
          </Divider> */}
        </>
      )}
      <Box mt={2}>
        <Typography variant="body1">
          Mobile number
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <MobileNumber
          register={register}
          getValues={getValues}
          placeholder="Enter mobile number"
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
            dispatch(loginActiveState({ activeIndex: 0 }));
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
          color="secondary"
          sx={
            {
              // '&:hover': {
              //   backgroundColor: 'secondary.lightOrange',
              // },
            }
          }
          onClick={onSubmit}
        >
          {t('Submit')}
        </Button>
      </Box>
    </Box>
  );
};
export default ForgotPassword;
