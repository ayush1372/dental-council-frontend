import { useState } from 'react';

import { Box, Dialog, Grid, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import IconVerified from '../../../assets/images/ico-verified.svg';
import { createEditFieldData, logoutUser } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { sendNotificationOtp } from '../../../store/actions/common-actions';
import { logoutAction } from '../../../store/actions/login-action';
import { getUpdatedNmcProfileData } from '../../../store/actions/nmc-actions';
import { logout, resetCommonReducer } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
import {
  EmailRegexValidation,
  MobileNumberRegexValidation,
} from '../../../utilities/common-validations';
import ConfirmOTP from '../../login-page/components/confirm-otp';

const NmcEditProfile = (props) => {
  const navigate = useNavigate();

  const { councilNames } = useSelector((state) => state.common);
  const userData = useSelector((state) => state?.nmc?.nmcProfileData?.data);
  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);
  const { loginData } = useSelector((state) => state?.loginReducer);

  const [emailIDUpdated, setEmailIDUpdated] = useState(false);
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [showOTPPOPUp, setShowOTPPOPUp] = useState(false);
  const [userRequestData, setUserRequestData] = useState();
  const [mobileValue, setMobileValue] = useState('');
  const [userEditData, setData] = useState({ contact: '', type: '', page: '' });
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: userData?.id,
      user_id: 10,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_name: userData?.middle_name,
      state_medical_council: {
        id: userData?.state_medical_council?.id,
        code: 'TEST',
        name: userData?.state_medical_council?.name,
      },
      RegistrationCouncil: userData?.state_medical_council?.name,
      RegistrationCouncilId: userData?.state_medical_council?.id,
      ndhm_enrollment: userData?.ndhm_enrollment,
      enrolled_number: userData?.enrolled_number,
      display_name: userData?.display_name,
      email_id: userData?.email_id,
      mobile_no: userData?.mobile_no,
    },
  });

  const handleInput = (e) => {
    e.preventDefault();
    setMobileValue(e.target.value);
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  const dispatch = useDispatch();
  const onsubmit = () => {
    let nmcUpdatedData = {
      id: userData?.id,
      user_id: getValues().user_id,
      first_name: getValues().first_name,
      last_name: getValues().last_name,
      middle_name: getValues().middle_name,
      state_medical_council: {
        id: getValues().state_medical_council?.id,
        code: getValues().state_medical_council?.code,
        name: getValues().state_medical_council?.name,
      },
      ndhm_enrollment: getValues().ndhm_enrollment,
      enrolled_number: getValues().enrolled_number,
      display_name: getValues().first_name,
      email_id: getValues().email_id,
      mobile_no: getValues().mobile_no,
    };
    dispatch(getUpdatedNmcProfileData(nmcUpdatedData)).then((response) => {
      if (response?.data?.email_id.length > 0) {
        setSuccessModalPopup(true);
        if (
          getValues().email_id !== userData?.email_id ||
          getValues().mobile_no !== userData?.mobile_no
        ) {
          setEmailIDUpdated(true);
        }
      }
    });
  };
  const handleClose = () => {
    setShowOTPPOPUp(false);
  };

  const getOtp = (type) => {
    if (type === 'sms') {
      let otpValue = {};
      otpValue = {
        contact: getValues().mobile_no,
        type: 'sms',
        page: 'editUserDetails',
        handleClose: handleClose,
        reSendOTP: getOtp,
        // setMobileNumberChange: setMobileNumberChange,
      };
      setData(otpValue);
      let sendOTPData = {
        contact: type === 'sms' ? getValues().mobile_no : '',
        type: type === 'sms' ? 'sms' : '',
        user_type: loginData?.data?.user_type,
        is_registration: true,
      };
      dispatch(sendNotificationOtp(sendOTPData)).then((response) => {
        if (response?.data?.message === 'Success') {
          let nmcUpdatedData = {
            id: userData?.id,
            user_id: getValues().user_id,
            first_name: getValues().first_name,
            last_name: getValues().last_name,
            middle_name: getValues().middle_name,
            state_medical_council: {
              id: getValues().state_medical_council?.id,
              code: getValues().state_medical_council?.code,
              name: getValues().state_medical_council?.name,
            },
            ndhm_enrollment: getValues().ndhm_enrollment,
            enrolled_number: getValues().enrolled_number,
            display_name: getValues().first_name,
            email_id: getValues().email_id,
            mobile_no: getValues().mobile_no,
          };
          setUserRequestData(nmcUpdatedData);
          setShowOTPPOPUp(true);
        } else {
          successToast(response?.data?.message, 'auth-error', 'error', 'top-center');
        }
      });
    }
  };

  return (
    <Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h2" color="textPrimary.main">
              Edit Profile
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'first_name'}
            placeholder={'Enter name'}
            defaultValue={getValues().first_name}
            error={errors.first_name?.message}
            {...register('first_name', {
              required: 'Please enter name',
              pattern: {
                value: /^[A-Za-z0-9()-,.' ]*$/,
                message: 'Please enter a valid name',
              },
            })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Mobile Number
          </Typography>
          <Typography component="span" color="error.main">
            *
            {getValues().mobile_no !== mobileValue || userData?.mobile_no === mobileValue ? (
              <img width="16px" height="16px" src={IconVerified} alt="verified icon" />
            ) : (
              ' '
            )}
          </Typography>
          <TextField
            fullWidth
            required
            name={'mobile_no'}
            placeholder={'Enter mobile number '}
            defaultValue={getValues().mobile_no}
            onInput={(e) => handleInput(e)}
            error={errors.mobile_no?.message}
            {...register('mobile_no', MobileNumberRegexValidation)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={
                      getValues().mobile_no !== mobileValue ||
                      getValues().mobile_no.length !== 10 ||
                      userData?.mobile_no === mobileValue
                        ? true
                        : false
                    }
                    onClick={() => getOtp('sms')}
                  >
                    Verify
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Email
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            type="text"
            fullWidth
            required
            name={'email_id'}
            placeholder={'Enter email'}
            defaultValue={getValues().email_id}
            error={errors.email_id?.message}
            {...register('email_id', EmailRegexValidation)}
          />
        </Grid>
      </Grid>
      {loggedInUserType !== 'NMC' && (
        <Grid container item spacing={2} mt={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="body3" color="grey.label">
              User ID
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>
            <TextField
              fullWidth
              required
              name={'user_id'}
              placeholder={'Enter user ID'}
              defaultValue={getValues().user_id}
              error={errors.user_id?.message}
              {...register('user_id', {
                required: 'Please enter user ID',

                pattern: {
                  value: /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                  message: 'Please enter a valid user ID',
                },
              })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body3" color="grey.label">
              Council
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>
            <SearchableDropdown
              name="RegistrationCouncil"
              items={createEditFieldData(councilNames)}
              defaultValue={userData?.state_medical_council}
              placeholder="Select council"
              clearErrors={clearErrors}
              error={errors.RegistrationCouncil?.message}
              {...register('RegistrationCouncil', {
                required: 'Please select council',
              })}
              onChange={(currentValue) => {
                setValue('RegistrationCouncilId', currentValue?.name);
              }}
            />
          </Grid>
        </Grid>
      )}

      <Box display="flex" mt={10} md="auto" justifyContent={'flex-end'}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mr: 2,
            width: {
              xs: '100%',
              md: 'fit-content',
            },
          }}
          onClick={handleSubmit(onsubmit)}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="grey"
          sx={{
            width: {
              xs: '100%',
              md: 'fit-content',
            },
          }}
          onClick={() => {
            props?.sentDetails('Profile');
          }}
        >
          Cancel
        </Button>
      </Box>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => {
            setSuccessModalPopup(false);
            if (emailIDUpdated) {
              dispatch(logoutAction()).then((response) => {
                if (response) {
                  logoutUser();
                  dispatch(logout());
                  dispatch(resetCommonReducer());
                  navigate('/login-page', { state: { loginFormname: 'NMC' } });
                }
              });
            } else {
              props?.sentDetails('Profile');
            }
          }}
          text={
            emailIDUpdated
              ? 'Your profile has been updated. Please login again with updated details.'
              : 'Your profile has been updated.'
          }
        />
      )}
      <Dialog
        maxWidth="sm"
        scroll="body"
        open={showOTPPOPUp}
        PaperProps={{ sx: { borderRadius: '10px' } }}
      >
        <ConfirmOTP otpData={userEditData} userRequestData={userRequestData} />
      </Dialog>
    </Box>
  );
};

export default NmcEditProfile;
