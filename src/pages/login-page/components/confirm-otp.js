import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import IconVerified from '../../../assets/images/ico-verified.svg';
import OtpIcon from '../../../assets/images/otp-popup.png';
import { ErrorMessages } from '../../../constants/error-messages';
import { encryptData, usersType } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { OtpForm } from '../../../shared/otp-form/otp-component';
import { updateCollegeRegistrarData } from '../../../store/actions/college-actions';
import { verifyNotificationOtp } from '../../../store/actions/common-actions';
import {
  getPersonalDetailsData,
  updateDoctorContactDetails,
} from '../../../store/actions/doctor-user-profile-actions';
import { retrieveUserName } from '../../../store/actions/forgot-username-actions';
import { getUpdatedNBEProfileData } from '../../../store/actions/nbe-actions';
import { getUpdatedNmcProfileData } from '../../../store/actions/nmc-actions';
import { getUpdatedsmcProfileData } from '../../../store/actions/smc-actions';
import { loginActiveState } from '../../../store/reducers/login-reducer';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
const ConfirmOTP = ({
  handleConfirmOTP,
  otpData,
  userRequestData,
  resetStep,
  handlePasswordSetup,
  loginName,
}) => {
  const { t } = useTranslation();
  const [isOtpValid, setIsOtpValid] = useState(false);
  const dispatch = useDispatch();
  const { sendNotificationOtpData } = useSelector((state) => state?.common);
  const [changeUserData, setChangeUserData] = useState(false);
  const { loginData } = useSelector((state) => state?.loginReducer);
  const userData = useSelector((state) => state?.nbe?.nbeData?.data);
  const { collegeData } = useSelector((state) => state.college);

  const userTypeId = usersType(loginName);

  const otpResend = () => {
    successToast(ErrorMessages.otpResend, 'otp-resent', 'success', 'top-center');
  };

  const { otpform, getOtpValidation, otpValue } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
    otpInvalidError: isOtpValid,
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
              user_type: userTypeId,
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
        if (otpData?.page === 'editUserDetails') {
          if (response?.data?.message?.status === 'Success') {
            const requestObj = {
              ...userRequestData,
              transaction_id: response?.data?.message?.transaction_id,
            };
            // for put api according to userType and its subtype
            dispatch(
              loginData?.data?.user_type === 3
                ? getUpdatedsmcProfileData(requestObj)
                : loginData?.data?.user_type === 4
                ? getUpdatedNmcProfileData(requestObj)
                : loginData?.data?.user_type === 5
                ? getUpdatedNBEProfileData(requestObj, userData?.id)
                : loginData?.data?.user_sub_type === 2 ||
                  loginData?.data?.user_sub_type === 3 ||
                  loginData?.data?.user_sub_type === 4 ||
                  loginData?.data?.user_sub_type === 5
                ? updateCollegeRegistrarData(
                    requestObj,
                    collegeData?.data?.college_id,
                    collegeData?.data?.id
                  )
                : ''
            ).then((response) => {
              if (response?.data?.email_id.length > 0) {
                setChangeUserData(true);
              }
            });

            // otpData?.handleClose();
          }
        }
      });
    } catch (allFailMsg) {
      successToast(allFailMsg?.data?.message, 'auth-error', 'error', 'top-center');
    }
  };

  return (
    <Box p={3} sx={{ bgcolor: 'white.main', boxShadow: '1', borderRadius: '8px' }}>
      {(otpData.page === 'doctorConstantDetailsPage' && otpData.type === 'sms') ||
      otpData.page === 'forgetUserName' ||
      otpData.page === 'forgotPasswordPage' ? (
        <>
          <Box display={'flex'} justifyContent="flex-end" lineHeight={'1'}>
            {otpData.page === 'doctorConstantDetailsPage' ? (
              <Box flex-grow={1}>
                <CloseIcon onClick={otpData.handleClose} sx={{ cursor: 'pointer' }} />
              </Box>
            ) : (
              <Box flex-grow={1}>
                <CloseIcon
                  onClick={() => {
                    resetStep(0);
                    dispatch(loginActiveState({ activeIndex: 0 }));
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            )}
          </Box>
          <Box textAlign={'center'}>
            <img src={OtpIcon} alt="OTP" width={'46px'} />
            <Typography variant="h2">OTP Authentication</Typography>
          </Box>
        </>
      ) : otpData.page === 'doctorConstantDetailsPage' && otpData.type === 'email' ? (
        <>
          <Box flex-grow={1} textAlign="right">
            <CloseIcon onClick={otpData.handleClose} sx={{ cursor: 'pointer' }} />
          </Box>

          <Box display={'flex'} mb={3} justifyContent="space-between">
            <Box display={'flex'} alignItems="center">
              <Box textAlign={'center'}>
                <img src={IconVerified} alt="verified icon" width={'46px'} />
                <Typography variant="h2">Verification link has been sent to the email </Typography>
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
            <Typography component={'div'} textAlign="center">
              {otpData.page === 'doctorConstantDetailsPage' && otpData?.type === 'sms'
                ? `Please enter the OTP sent on your mobile number ******${otpData?.contact?.slice(
                    -4
                  )}.`
                : otpData.page === 'doctorConstantDetailsPage' &&
                  otpData?.type === 'email' && (
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                      <CircularProgress color="secondary" />
                      <Typography textAlign="center" mt={2}>
                        Awaiting confirmation
                      </Typography>
                    </Box>
                  )}
            </Typography>
          ) : otpData?.page === 'forgotPasswordPage' ? (
            <Typography component={'div'} variant="body" textAlign="center">
              {otpData.page === 'forgotPasswordPage' && otpData?.type === 'sms'
                ? `OTP sent to mobile number ending with ******${otpData?.contact?.slice(-4)}.`
                : otpData.page === 'forgotPasswordPage' &&
                  otpData?.type === 'email' &&
                  `Please enter the OTP sent on your Email ID ******${otpData?.contact?.slice(
                    -12
                  )}`}
            </Typography>
          ) : otpData?.page === 'forgetUserName' ? (
            <Typography variant="body" display={'flex'} justifyContent="center">
              {otpData.page === 'forgetUserName' && otpData?.type === 'sms'
                ? `OTP sent to mobile number ending with ******${otpData?.contact?.slice(-4)}.`
                : ''}
            </Typography>
          ) : otpData?.page === 'editUserDetails' && otpData?.type === 'sms' ? (
            <Typography variant="body" display={'flex'} justifyContent="center">
              {`OTP sent to mobile number ending with ******${otpData?.contact?.slice(-4)}.`}
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
        {otpData?.page === 'forgetUserName' || otpData?.page === 'forgotPasswordPage' ? (
          <Box display={'flex'} justifyContent="center" pt={2}>
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
            <Button size="medium" variant="contained" color="secondary" onClick={onHandleVerify}>
              {t('Continue')}
            </Button>
          </Box>
        ) : (
          ((otpData?.page === 'doctorConstantDetailsPage' && otpData?.type !== 'email') ||
            otpData?.type === 'sms') && (
            <Box mt={2} textAlign="center">
              <Button
                onClick={otpData.handleClose}
                variant="contained"
                color="grey"
                sx={{
                  mr: 2,
                }}
              >
                Cancel
              </Button>
              <Button size="medium" variant="contained" color="secondary" onClick={onHandleVerify}>
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
          text={
            otpData?.page === 'editUserDetails'
              ? `Your mobile number has been updated. Please login again with updated details.`
              : `Your ${
                  otpData?.page === 'forgetUserName'
                    ? `username is "Anand". Please use this username to login.`
                    : otpData?.type === 'sms'
                    ? 'Mobile Number'
                    : otpData?.type === 'email' && 'Email Address'
                } has been successfully changed `
          }
          changeUserData={changeUserData}
          userLogout={userRequestData ? true : false}
          fetchDoctorUserPersonalDetails={fetchDoctorUserPersonalDetails}
        />
      )}
    </Box>
  );
};
export default ConfirmOTP;
