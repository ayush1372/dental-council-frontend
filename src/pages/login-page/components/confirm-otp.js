import { useState } from 'react';

// import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { encryptData } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { OtpForm } from '../../../shared/otp-form/otp-component';
import { verifyNotificationOtp } from '../../../store/actions/common-actions';
import {
  getPersonalDetailsData,
  updateDoctorContactDetails,
} from '../../../store/actions/doctor-user-profile-actions';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const ConfirmOTP = ({ handleConfirmOTP, otpData, resetStep }) => {
  const { t } = useTranslation();
  const [isOtpValid, setIsOtpValid] = useState(true);
  const dispatch = useDispatch();
  const { sendNotificationOtpData } = useSelector((state) => state?.common);
  const [changeUserData, setChangeUserData] = useState(false);
  const { loginData } = useSelector((state) => state?.loginReducer);

  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
  };

  const { otpform, getOtpValidation, otpValue } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
    otpInvalidError: !isOtpValid,
    otpData: otpData,
  });

  const fetchDoctorUserPersonalDetails = () => {
    dispatch(getPersonalDetailsData(loginData?.data?.profile_id))
      .then(() => {})
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };
  const onHandleVerify = () => {
    if (getOtpValidation()) {
      setIsOtpValid(false);
    } else {
      if (getOtpValidation()) {
        setIsOtpValid(false);
        handleConfirmOTP();
      }
    }

    try {
      dispatch(
        verifyNotificationOtp({
          transaction_id: sendNotificationOtpData.data?.transaction_id,
          contact: otpData?.contact,
          type: otpData?.type,
          otp: encryptData(otpValue, process.env.REACT_APP_PASS_SITE_KEY),
        })
      ).then((response) => {
        if (otpData?.page === 'doctorConstantDetailsPage') {
          let updateDoctorContactDetailsBody = {
            transaction_id: sendNotificationOtpData.data?.transaction_id,
          };
          if (otpData?.type === 'sms') {
            updateDoctorContactDetailsBody.mobile_number = otpData.contact;
          } else {
            updateDoctorContactDetailsBody.email = otpData.contact;
          }
          try {
            dispatch(
              updateDoctorContactDetails(
                updateDoctorContactDetailsBody,
                loginData?.data?.profile_id
              )
            ).then((response) => {
              if (response?.data?.message === 'Success') {
                otpData?.handleClose();
                otpData.setMobileNumberChange(false);
                otpData.setEmailChange(false);
                setChangeUserData(true);
                fetchDoctorUserPersonalDetails();
              }
            });
          } catch (allFailMsg) {
            successToast(
              'ERR_INT: ' + allFailMsg?.data?.message,
              'auth-error',
              'error',
              'top-center'
            );
          }
        }
        if (otpData?.page === 'forgotPasswordPage') {
          if (response?.data?.message?.status === 'Success') {
            handleConfirmOTP();
          }
        }
      });
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg?.data?.message, 'auth-error', 'error', 'top-center');
    }
  };

  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      {otpData.page === 'doctorConstantDetailsPage' ? (
        <>
          <Box display={'flex'} justifyContent="flex-end" mb={3}>
            {/* <Typography variant="h2" component="div" flex-grow={11} align="center">
              <BookOnlineIcon
                sx={{
                  color: 'primary.main',
                  fontSize: '40px',
                }}
              />
            </Typography> */}
            <Box flex-grow={1}>
              <CloseIcon onClick={otpData.handleClose} />
            </Box>
          </Box>
          <Typography variant="h2" display={'flex'} justifyContent="center">
            OTP Authentication
          </Typography>
        </>
      ) : (
        <Typography variant="h2" component="div">
          Confirm OTP
        </Typography>
      )}
      <Box>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: 'fit-content',
            },
          }}
        >
          {otpData?.page === 'doctorConstantDetailsPage' ? (
            <Typography textAlign="center">
              {otpData.page === 'doctorConstantDetailsPage' && otpData?.type === 'sms'
                ? `Please enter the OTP sent on your Mobile Number XXXXXX${otpData?.contact.slice(
                    -4
                  )}.`
                : otpData.page === 'doctorConstantDetailsPage' &&
                  otpData?.type === 'email' &&
                  `Please enter the OTP sent on your Email ID XXXXXX${otpData?.contact.slice(-12)}`}
            </Typography>
          ) : otpData?.page === 'forgotPasswordPage' ? (
            <Typography variant="body" textAlign="center">
              {otpData.page === 'forgotPasswordPage' && otpData?.type === 'sms'
                ? `Please enter OTP sent on your We just sent an OTP on your mobile number XXXXXX${otpData?.contact.slice(
                    -4
                  )}.`
                : otpData.page === 'forgotPasswordPage' &&
                  otpData?.type === 'email' &&
                  `Please enter the OTP sent on your Email ID XXXXXX${otpData?.contact.slice(-12)}`}
            </Typography>
          ) : (
            <Typography variant="body1">
              We have sent an OTP on your registered{' '}
              {otpData?.type === 'sms'
                ? `Mobile Number XXXXXX${otpData?.contact.slice(-4)} linked with your Aadhaar.`
                : `Email ID XXXXXX${otpData?.contact.slice(-12)}`}{' '}
            </Typography>
          )}
          <Box display={'flex'} justifyContent="center">
            {otpform}
          </Box>
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
            size="medium"
            variant="contained"
            sx={{
              backgroundColor: 'secondary.lightOrange',
              '&:hover': {
                backgroundColor: 'secondary.lightOrange',
              },
            }}
            onClick={onHandleVerify}
          >
            {t('Continue')}
          </Button>
        </Box>
      </Box>
      {changeUserData && (
        <SuccessModalPopup
          open={changeUserData}
          setOpen={() => setChangeUserData(false)}
          text={`Your ${
            otpData?.type === 'sms' ? 'Mobile Number' : otpData?.type === 'email' && 'Email Address'
          } has been successfully changed `}
          changeUserData={changeUserData}
          fetchDoctorUserPersonalDetails={fetchDoctorUserPersonalDetails}
        />
      )}
    </Box>
  );
};
export default ConfirmOTP;
