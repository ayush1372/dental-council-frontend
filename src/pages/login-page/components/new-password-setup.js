import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { encryptData } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import {
  createHealthProfessional,
  setUserPassword,
} from '../../../store/actions/doctor-registration-actions';
import { forgotPassword, setPassword } from '../../../store/actions/forgot-password-actions';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

const NewPasswordSetup = ({ otpData, setShowSuccessPopUp, resetStep }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [collegeRegisterSuccess, setCollegeRegisterSuccess] = useState(false);
  let navigate = useNavigate();
  const params = useParams();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const registrationNumber = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.registration_number
  );
  const uniqueHpId = useSelector((state) =>
    state?.doctorRegistration?.hpIdExistsDetailsData?.data?.hprId?.replace('@hpr.abdm', '')
  );
  const hrp_id = useSelector(
    (state) => state?.doctorRegistration?.hpIdExistsDetailsData?.data?.hprId
  );
  const hprIdData = useSelector((state) => state?.doctorRegistration?.hpIdExistsDetailsData?.data);
  const demographicAuthMobileVerify = useSelector(
    (state) => state?.AadhaarTransactionId?.demographicAuthMobileDetailsData
  );

  const kycstatus = useSelector(
    (state) => state?.doctorRegistration?.getkycDetailsData?.data?.kyc_fuzzy_match_status
  );
  const imrDetailsData = useSelector(
    (state) => state?.doctorRegistration?.UserNotFoundDetailsData?.imrDataNotFound
  );
  const imrUserNotFounddata = useSelector(
    (state) => state?.doctorRegistration?.UserNotFoundDetailsData?.aadhaarFormValues
  );
  const userKycData = useSelector(
    (state) => state?.AadhaarTransactionId?.aadhaarOtpDetailsData?.data
  );
  const mobilenumber = useSelector((state) => state?.doctorRegistration?.storeMobileDetailsData);
  const { sendNotificationOtpData } = useSelector((state) => state?.common);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = () => {
    if (otpData?.page === 'forgotPasswordPage') {
      const reSetPasswordBody = {
        username: otpData?.contact,
        password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
        transaction_id: sendNotificationOtpData?.data?.transaction_id,
      };
      // try {
      dispatch(forgotPassword(reSetPasswordBody))
        .then((response) => {
          if (response?.data?.message === 'Success') {
            setShowSuccessPopUp(true);
            resetStep(0);
          }
        })
        .catch((error) => {
          successToast(
            'ERROR: ' + error?.data?.response?.data?.error,
            'auth-error',
            'error',
            'top-center'
          );
        });
      // } catch (error) {
      //   successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
      // }
      return;
    } else {
      if (params?.request_id) {
        const newPasswordData = {
          token: params?.request_id,
          password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
        };

        dispatch(setPassword(newPasswordData))
          .then(() => {
            setCollegeRegisterSuccess(true);
            setShowSuccess(true);
          })
          .catch((error) => {
            successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
          });
        return;
      }
      if (kycstatus !== 'Success' || imrDetailsData) {
        let reqObj = {
          registration_number: imrUserNotFounddata?.RegistrationNumber,
          smc_id: imrUserNotFounddata?.RegistrationCouncilId,
          mobile_number: demographicAuthMobileVerify?.data?.verified
            ? mobilenumber
            : mobilenumber?.mobile,
          gender: userKycData?.gender,
          name: userKycData?.name,
          pincode: userKycData?.pincode,
          birthdate: userKycData?.birthdate,
          village_town_city: userKycData?.villageTownCity,
          district: userKycData?.district,
          state: userKycData?.state,
          address: userKycData?.address,
          house: userKycData?.house,
          locality: userKycData?.locality,
          landmark: userKycData?.landmark,
          photo: userKycData?.photo,
          street: userKycData?.street,
        };

        dispatch(createHealthProfessional(reqObj)) //new api 1st
          .then(() => {
            const isNewFlag = hprIdData?.new;
            const reqPayload = {
              mobile: demographicAuthMobileVerify?.data?.verified
                ? mobilenumber
                : mobilenumber?.mobile,
              username: uniqueHpId,
              registration_number: imrUserNotFounddata?.RegistrationNumber,
              password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
              hpr_id_number: hprIdData?.hprIdNumber,
              new: isNewFlag,
              hpr_id: hrp_id,
            };
            dispatch(setUserPassword(reqPayload)) // user api 2nd
              .then(() => {
                setShowSuccess(true);
              })
              .catch((error) => {
                successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
              });
          })
          .catch((error) => {
            successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
          });
      } else {
        const isNewFlag = hprIdData?.new;
        const reqPayload = {
          mobile: mobilenumber,
          username: uniqueHpId,
          registration_number: registrationNumber,
          password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
          hpr_id_number: hprIdData?.hprIdNumber,
          new: isNewFlag,
          hpr_id: hrp_id,
        };
        dispatch(setUserPassword(reqPayload))
          .then(() => {
            setShowSuccess(true);
          })
          .catch((error) => {
            successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
          });
      }
    }
  };

  const onCancel = () => {
    navigate('/');
  };
  return (
    <>
      {' '}
      <ToastContainer></ToastContainer>
      <Box
        data-testid="new-password-setup"
        p={4}
        bgcolor="white.main"
        boxShadow="4"
        width={otpData?.page === 'forgotPasswordPage' ? '100%' : '40%'}
      >
        <Typography mt={2} variant="h4" component="div" textAlign="center" data-testid="Password">
          {uniqueHpId ? `Welcome ${uniqueHpId} ! ` : 'Welcome !'}
        </Typography>
        <Typography
          mt={2}
          variant="body1"
          component="div"
          textAlign="center"
          data-testid="Password"
          pb={1}
        >
          {`Please set your password `}
        </Typography>

        <Box>
          <Box mt={2}>
            <Typography variant="body1">
              New Password
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              inputProps={{ maxLength: 100 }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="Password"
              name="password"
              required="true"
              placeholder={t('Enter New Password')}
              margin="dense"
              defaultValue={getValues().password}
              error={errors.password?.message}
              {...register('password', PasswordRegexValidation, {
                required: 'Provide Password',
              })}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="body1" data-testid="confirmPassword">
              Confirm Password
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              inputProps={{ maxLength: 100 }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="Password"
              name="confirmPassword"
              required="true"
              placeholder={t('Enter Confirm Password')}
              margin="dense"
              defaultValue={getValues().confirmPassword}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Provide Confirm Password',
                validate: (val) => {
                  if (watch('password') !== val) {
                    return 'Entered passwords does not match';
                  }
                },
              })}
            />
          </Box>

          <Box align="end" mt={3}>
            <Button
              onClick={onCancel}
              variant="contained"
              color="grey"
              sx={{
                mr: 2,
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
              {t('Submit')}
            </Button>
          </Box>
        </Box>
        {showSuccess && (
          <SuccessModalPopup
            open={showSuccess}
            setOpen={() => setShowSuccess(false)}
            text={
              collegeRegisterSuccess
                ? 'Your password has been successfully created.'
                : `Your password for ${uniqueHpId} has been successfully created.`
            }
            successRegistration={true}
          />
        )}
      </Box>
    </>
  );
};
export default NewPasswordSetup;
