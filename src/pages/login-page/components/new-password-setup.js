import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { encryptData, usersType } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { createHealthProfessional } from '../../../store/actions/doctor-registration-actions';
import { forgotPassword, setPassword } from '../../../store/actions/forgot-password-actions';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

const NewPasswordSetup = ({ otpData, setShowSuccessPopUp, resetStep, loginName }) => {
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
    state?.doctorRegistration?.hpIdExistsDetailsData?.data?.hprId
      ?.replace('@hpr.abdm', '')
      ?.replace('@dr.abdm', '')
  );
  const hrp_id = useSelector(
    (state) => state?.doctorRegistration?.hpIdExistsDetailsData?.data?.hprId
  );
  const hprIdData = useSelector((state) => state?.doctorRegistration?.hpIdExistsDetailsData?.data);
  const demographicAuthMobileVerify = useSelector(
    (state) => state?.AadhaarTransactionId?.demographicAuthMobileDetailsData
  );

  const councilName = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.council_name
  );

  const imrUserNotFounddata = useSelector(
    (state) => state?.doctorRegistration?.UserNotFoundDetailsData?.aadhaarFormValues
  );
  const userKycData = useSelector(
    (state) => state?.AadhaarTransactionId?.aadhaarOtpDetailsData?.data
  );
  const mobilenumber = useSelector((state) => state?.doctorRegistration?.storeMobileDetailsData);
  const { sendNotificationOtpData, councilNames, verifyNotificationOtpData } = useSelector(
    (state) => state?.common
  );
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

  const getCouncilID = (name) => {
    let councilData = [];
    Array.isArray(councilNames) &&
      councilNames?.map((elementData) => {
        if (elementData.name === name) {
          councilData.push(elementData);
        }
      });
    return councilData[0]?.id;
  };
  useEffect(() => {
    if (otpData?.page === 'forgotPasswordPage') {
      setShowSuccessPopUp(false);
    }
  }, []);
  const onSubmit = () => {
    if (otpData?.page === 'forgotPasswordPage') {
      const userTypeId = usersType(loginName);
      const reSetPasswordBody = {
        username: otpData?.contact,
        password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
        transaction_id: sendNotificationOtpData?.data?.transaction_id,
        user_type: userTypeId,
      };
      dispatch(forgotPassword(reSetPasswordBody)).then((response) => {
        if (response?.data?.message === 'Success') {
          setShowSuccessPopUp(true);
          resetStep(0);
        }
      });
      // .catch((error) => {
      //   successToast(error?.data?.response?.data?.message, 'auth-error', 'error', 'top-center');
      // });

      return;
    } else {
      if (params?.request_id) {
        const newPasswordData = {
          token: params?.request_id,
          password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
        };

        dispatch(setPassword(newPasswordData)).then((response) => {
          if (response?.data?.message === 'Success') {
            setCollegeRegisterSuccess(true);
            setShowSuccess(true);
          } else {
            successToast(response?.data?.message, response?.data?.message, 'error', 'top-center');
          }
        });
        // .catch((error) => {
        //   successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
        // });
        return;
      }
      let councilID = getCouncilID(councilName);
      const isNewFlag = hprIdData?.new;

      let reqObj = {
        mobile_number: demographicAuthMobileVerify?.data?.verified
          ? mobilenumber
          : mobilenumber?.mobile,
        username: uniqueHpId,
        password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
        registration_number: imrUserNotFounddata?.RegistrationNumber || registrationNumber,
        smc_id: imrUserNotFounddata?.RegistrationCouncilId || councilID,
        hpr_id: hrp_id,
        hpr_id_number: hprIdData?.hprIdNumber,

        photo: userKycData?.photo,
        gender: userKycData?.gender,
        name: userKycData?.name,
        pincode: userKycData?.pincode,
        birthdate: userKycData?.birthdate,
        house: userKycData?.house,
        street: userKycData?.street,
        landmark: userKycData?.landmark,
        locality: userKycData?.locality,
        village_town_city: userKycData?.villageTownCity,

        district: userKycData?.district,
        state: userKycData?.state,
        address: userKycData?.address,
        new: isNewFlag,
      };

      dispatch(createHealthProfessional(reqObj)).then(() => {
        setShowSuccess(true);
      });
      // .catch((error) => {
      //   successToast(
      //     'ERROR: ' + error?.data?.response?.data?.message,
      //     'auth-error',
      //     'error',
      //     'top-center'
      //   );
      // });
    }
  };

  const onCancel = () => {
    navigate('/');
  };
  return (
    <Box
      data-testid="new-password-setup"
      p={3}
      sx={{ bgcolor: 'white.main', boxShadow: '1', borderRadius: '8px' }}
      width={otpData?.page === 'forgotPasswordPage' ? '100%' : '40%'}
    >
      <Typography variant="h4" component="div" textAlign="center" data-testid="Password">
        {uniqueHpId
          ? `Welcome ${uniqueHpId}`
          : verifyNotificationOtpData?.data?.message?.display_name !== undefined
          ? `Welcome ${verifyNotificationOtpData?.data?.message?.display_name} `
          : 'Welcome'}
      </Typography>
      {/* <Typography variant="body1" component="div" textAlign="center" data-testid="Password">
          {`Please set your password `}
        </Typography> */}

      <Box>
        <Box mt={1}>
          <Typography variant="body1">
            Set Password
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
            placeholder={t('Enter password')}
            margin="dense"
            defaultValue={getValues().password}
            error={errors.password?.message}
            {...register('password', PasswordRegexValidation, {
              required: 'Please enter a valid password',
            })}
            newPassword={true}
          />
        </Box>
        <Box mt={3}>
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
            placeholder={t('Enter password')}
            margin="dense"
            defaultValue={getValues().confirmPassword}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please enter a valid password',
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Password does not match';
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
              ? 'Password has been set'
              : uniqueHpId === undefined
              ? 'Password has been set'
              : `Password has been set for "${uniqueHpId}"`
          }
          successRegistration={true}
          loginName={loginName}
        />
      )}
    </Box>
  );
};
export default NewPasswordSetup;
