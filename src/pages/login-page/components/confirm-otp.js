import { useState } from 'react';

import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import IconVerified from '../../../assets/images/ico-verified.svg';
import { ErrorMessages } from '../../../constants/error-messages';
import { encryptData } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { OtpForm } from '../../../shared/otp-form/otp-component';
import { verifyNotificationOtp } from '../../../store/actions/common-actions';
import {
  getPersonalDetailsData,
  updateDoctorContactDetails,
} from '../../../store/actions/doctor-user-profile-actions';
import { retrieveUserName } from '../../../store/actions/forgot-username-actions';
import { loginActiveState } from '../../../store/reducers/login-reducer';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
const ConfirmOTP = ({ handleConfirmOTP, otpData, resetStep, handlePasswordSetup }) => {
  const { t } = useTranslation();
  const [isOtpValid, setIsOtpValid] = useState(true);
  const dispatch = useDispatch();
  const { sendNotificationOtpData } = useSelector((state) => state?.common);
  const [changeUserData, setChangeUserData] = useState(false);
  const { loginData } = useSelector((state) => state?.loginReducer);

  const otpResend = () => {
    successToast(ErrorMessages.otpResend, 'otp-resent', 'success', 'top-center');
  };

  const { otpform, getOtpValidation, otpValue } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
    otpInvalidError: !isOtpValid,
    otpData: otpData,
  });

  const fetchDoctorUserPersonalDetails = () => {
    dispatch(getPersonalDetailsData(loginData?.data?.profile_id)).then(() => {});
    // .catch((allFailMsg) => {
    //   successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    // });
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
        if (otpData?.page === 'forgetUserName') {
          if (response?.data?.message?.status === 'Success') {
            let retrieveUserNameBody = {
              transaction_id: sendNotificationOtpData.data?.transaction_id,
              contact: otpData?.contact,
            };
            try {
              dispatch(retrieveUserName(retrieveUserNameBody)).then((response) => {
                if (response) {
                  handlePasswordSetup();
                  handleConfirmOTP();
                }
              });
            } catch (allFailMsg) {
              successToast(allFailMsg?.data?.message, 'auth-error', 'error', 'top-center');
            }
          }
        }
      });
    } catch (allFailMsg) {
      successToast(allFailMsg?.data?.message, 'auth-error', 'error', 'top-center');
    }
  };

  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      {(otpData.page === 'doctorConstantDetailsPage' && otpData.type === 'sms') ||
      otpData.page === 'forgetUserName' ? (
        <>
          <Box display={'flex'} justifyContent="flex-end" mb={3}>
            {otpData.page === 'forgetUserName' && (
              <Typography variant="h2" component="div" flex-grow={11} align="center">
                <BookOnlineIcon
                  sx={{
                    color: 'primary.main',
                    fontSize: '40px',
                  }}
                />
              </Typography>
            )}
            <Box flex-grow={1}>
              <CloseIcon onClick={otpData.handleClose} sx={{ cursor: 'pointer' }} />
            </Box>
          </Box>
          <Typography variant="h2" display={'flex'} justifyContent="center">
            OTP Authentication
          </Typography>
        </>
      ) : otpData.page === 'doctorConstantDetailsPage' && otpData.type === 'email' ? (
        <>
          <Box flex-grow={1} textAlign="right">
            <CloseIcon onClick={otpData.handleClose} sx={{ cursor: 'pointer' }} />
          </Box>

          <Box display={'flex'} mb={3} justifyContent="space-between">
            <Box display={'flex'} alignItems="center">
              <Box mr={1}>
                <img width="20px" height="20px" src={IconVerified} alt="verified icon" />
              </Box>
              <Box display="flex">
                <Typography variant="h2">Email has been Sent</Typography>
              </Box>
            </Box>
          </Box>
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
              display: 'contents',
            },
          }}
        >
          {otpData?.page === 'doctorConstantDetailsPage' ? (
            <Typography textAlign="center">
              {otpData.page === 'doctorConstantDetailsPage' && otpData?.type === 'sms'
                ? `Please enter the OTP sent on your mobile number ******${otpData?.contact.slice(
                    -4
                  )}.`
                : otpData.page === 'doctorConstantDetailsPage' &&
                  otpData?.type === 'email' && (
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                      <CircularProgress color="secondary" />
                      <Typography textAlign="center" mt={2}>
                        Awaiting Confirmation
                      </Typography>
                    </Box>
                  )}
            </Typography>
          ) : otpData?.page === 'forgotPasswordPage' ? (
            <Typography variant="body" textAlign="center">
              {otpData.page === 'forgotPasswordPage' && otpData?.type === 'sms'
                ? `We just sent an OTP on your mobile number XXXXXX${otpData?.contact?.slice(-4)}.`
                : otpData.page === 'forgotPasswordPage' &&
                  otpData?.type === 'email' &&
                  `Please enter the OTP sent on your Email ID XXXXXX${otpData?.contact?.slice(
                    -12
                  )}`}
            </Typography>
          ) : otpData?.page === 'forgetUserName' ? (
            <Typography variant="body" display={'flex'} justifyContent="center">
              {otpData.page === 'forgetUserName' && otpData?.type === 'sms'
                ? `We have just sent an OTP on given Mobile No. XXXXXX${otpData?.contact?.slice(
                    -4
                  )}.`
                : ''}
            </Typography>
          ) : (
            <Typography variant="body1">
              We have sent an OTP on your registered{' '}
              {otpData?.type === 'sms'
                ? `Mobile Number XXXXXX${otpData?.contact?.slice(-4)} linked with your Aadhaar.`
                : `Email ID XXXXXX${otpData?.contact?.slice(-12)}`}{' '}
            </Typography>
          )}
        </Box>

        <Box display={'flex'} justifyContent="center" flexDirection="column" alignItems="center">
          {otpData?.page === 'forgetUserName' && (
            <Typography variant="body1" ml="14vw" mt="1vw">
              Verification code
            </Typography>
          )}
          {((otpData.page === 'doctorConstantDetailsPage' && otpData?.type !== 'email') ||
            otpData.page === 'forgotPasswordPage' ||
            otpData?.page === 'forgetUserName' ||
            otpData?.type === 'sms') && (
            <Box display={'flex'} justifyContent="center">
              {otpform}
            </Box>
          )}
        </Box>
        {otpData?.page === 'forgetUserName' ? (
          <Box display={'flex'} justifyContent="center">
            <Button
              size="medium"
              variant="contained"
              sx={{
                backgroundColor: 'secondary.lightOrange',
                '&:hover': {
                  backgroundColor: 'secondary.lightOrange',
                },
                width: '100%',
              }}
              onClick={onHandleVerify}
            >
              {t('Continue')}
            </Button>
          </Box>
        ) : (
          ((otpData.page === 'doctorConstantDetailsPage' && otpData?.type !== 'email') ||
            otpData.page === 'forgotPasswordPage' ||
            otpData?.type === 'sms') && (
            <Box mt={3} textAlign="center">
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
                size="medium"
                variant="contained"
                color="secondary"
                sx={
                  {
                    // backgroundColor: 'secondary.lightOrange',
                    // '&:hover': {
                    //   backgroundColor: 'secondary.lightOrange',
                    // },
                  }
                }
                onClick={onHandleVerify}
              >
                {t('Submit')}
              </Button>
            </Box>
          )
        )}
      </Box>
      {changeUserData && (
        <SuccessModalPopup
          open={changeUserData}
          setOpen={() => setChangeUserData(false)}
          text={`Your ${
            otpData?.page === 'forgetUserName'
              ? `UserName is "Anand"  Please use this User Name to Log In`
              : otpData?.type === 'sms'
              ? 'Mobile Number'
              : otpData?.type === 'email' && 'Email Address'
          } has been successfully changed `}
          changeUserData={changeUserData}
          fetchDoctorUserPersonalDetails={fetchDoctorUserPersonalDetails}
        />
      )}
    </Box>
  );
};
export default ConfirmOTP;
