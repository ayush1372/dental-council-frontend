import { useState } from 'react';

import { Dialog, Grid, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import IconVerified from '../../../assets/images/ico-verified.svg';
import { logoutUser } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import {
  collegeProfileData,
  sendDeanDetails,
  updateCollegeRegistrarData,
} from '../../../store/actions/college-actions';
import { sendNotificationOtp } from '../../../store/actions/common-actions';
import { logoutAction } from '../../../store/actions/login-action';
import { logout, resetCommonReducer } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
import ConfirmOTP from '../../login-page/components/confirm-otp';

export function CollegeDean({ showPage, updateShowPage, userType }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { collegeData } = useSelector((state) => state.college);
  const { loginData } = useSelector((state) => state?.loginReducer);
  const userData = collegeData?.data;

  // eslint-disable-next-line no-console
  console.log('userData', userData);

  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [emailIDUpdated, setEmailIDUpdated] = useState(false);
  const [showOTPPOPUp, setShowOTPPOPUp] = useState(false);
  const [userRequestData, setUserRequestData] = useState();
  const [mobileValue, setMobileValue] = useState('');
  const [userEditData, setData] = useState({ contact: '', type: '', page: '' });

  const {
    register,
    handleSubmit,
    getValues,

    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: showPage === 'edit' ? userData?.id : null,
      deanName: showPage === 'edit' ? userData?.name : '',
      deanPhoneNumber: showPage === 'edit' ? userData?.mobile_number : '',
      deanEmail: showPage === 'edit' ? userData?.email_id : '',
      deanUserId: showPage === 'edit' ? userData?.user_id : '',
      deanPassword: '',
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

  //  values getting for other and  principle
  const onSubmit = (fieldValues) => {
    let deanData = {
      id: showPage === 'edit' ? userData?.id : null,
      college_id: showPage === 'edit' ? userData?.college_id : null,
      designation: showPage === 'edit' ? userData?.designation : null,
      name: showPage === 'edit' ? fieldValues?.deanName : null,
      mobile_number: showPage === 'edit' ? fieldValues?.deanPhoneNumber : null,
      email_id: showPage === 'edit' ? fieldValues?.deanEmail : null,
    };

    if (showPage === 'edit') {
      dispatch(updateCollegeRegistrarData(deanData, userData?.college_id, userData?.id)).then(
        (response) => {
          if (response?.isError === false) {
            setSuccessModalPopup(true);
          }
          if (
            fieldValues?.deanEmail !== userData?.email_id ||
            fieldValues?.deanPhoneNumber !== userData?.mobile_number
          ) {
            setEmailIDUpdated(true);
          } else {
            dispatch(collegeProfileData(userData?.college_id, userData?.id));
          }
        }
      );
    } else {
      dispatch(sendDeanDetails(deanData));
    }
  };

  const handleClose = () => {
    setShowOTPPOPUp(false);
  };

  const getOtp = (type) => {
    if (type === 'sms') {
      let otpValue = {};
      otpValue = {
        contact: getValues().deanPhoneNumber,
        type: 'sms',
        page: 'editUserDetails',
        handleClose: handleClose,
        reSendOTP: getOtp,
        // setMobileNumberChange: setMobileNumberChange,
      };
      setData(otpValue);
      let sendOTPData = {
        contact: type === 'sms' ? getValues().deanPhoneNumber : '',
        type: type === 'sms' ? 'sms' : '',
        user_type: loginData?.data?.user_type,
        is_registration: true,
      };
      dispatch(sendNotificationOtp(sendOTPData)).then((response) => {
        if (response?.data?.message === 'Success') {
          let deanData = {
            id: showPage === 'edit' ? userData?.id : null,
            college_id: showPage === 'edit' ? userData?.college_id : null,
            designation: showPage === 'edit' ? userData?.designation : null,
            name: showPage === 'edit' ? getValues().deanName : null,
            mobile_number: showPage === 'edit' ? getValues().deanPhoneNumber : null,
            email_id: showPage === 'edit' ? getValues().deanEmail : null,
          };
          setUserRequestData(deanData);
          setShowOTPPOPUp(true);
        } else {
          successToast(response?.data?.message, 'auth-error', 'error', 'top-center');
        }
      });
    }
  };

  return (
    <Grid container item spacing={2} p={2}>
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
                  navigate('/login-page', { state: { loginFormname: 'College' } });
                }
              });
            } else {
              updateShowPage('Profile');
            }
          }}
          text={
            emailIDUpdated
              ? 'Your profile has been updated. Please login again with updated details.'
              : 'Your profile has been updated.'
          }
        />
      )}
      <Grid item xs={12} mt={3}>
        <Typography color="textPrimary.main" variant="h2" mt={2}>
          {userType === 'College Dean'
            ? 'Edit College Dean'
            : userType === 'College Principal'
            ? 'Edit College Principal'
            : 'Edit College Others'}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          {/* <b>{t('College Dean Name')}</b> */}
          <b>{t(' Name')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="deanName"
          required="true"
          placeholder={t('Enter name')}
          margin="dense"
          defaultValue={getValues().deanName}
          error={errors.deanName?.message}
          {...register('deanName', {
            required: 'Please enter a valid name',
            pattern: {
              value: /^(?!^\s)[a-zA-Z\s']*$(?<!\s$)/,
              message: 'Please enter a valid name',
            },
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t(' Designation')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="designation"
          required="true"
          placeholder={t('Enter designation')}
          margin="dense"
          defaultValue={
            userType === 'College Dean'
              ? 'College Dean'
              : userType === 'College Principal'
              ? 'College Principal'
              : userType === 'College Others'
              ? 'College Others'
              : ''
          }
          disabled
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          {/* <b>{t('College Dean Phone Number')}</b> */}
          <b>{t(' Mobile Number')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
          {getValues().deanPhoneNumber !== mobileValue ||
          userData?.mobile_number === mobileValue ? (
            <img width="16px" height="16px" src={IconVerified} alt="verified icon" />
          ) : (
            ' '
          )}
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="deanPhoneNumber"
          required="true"
          placeholder={t('Enter mobile number')}
          margin="dense"
          defaultValue={getValues().deanPhoneNumber}
          onInput={(e) => handleInput(e)}
          error={errors.deanPhoneNumber?.message}
          {...register('deanPhoneNumber', {
            required: 'Please enter mobile number',
            pattern: {
              value: /^(\d{10})$/i,
              message: 'Please enter a valid mobile number',
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  disabled={
                    getValues().deanPhoneNumber !== mobileValue ||
                    getValues().deanPhoneNumber.length !== 10 ||
                    userData?.mobile_number === mobileValue
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
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t(' Email')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          id="outlined-basic"
          variant="outlined"
          type="email"
          name="deanEmail"
          required="true"
          placeholder={t('Enter email')}
          margin="dense"
          defaultValue={getValues().deanEmail}
          error={errors.deanEmail?.message}
          {...register('deanEmail', {
            required: 'Please enter an email ID',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
              message: 'Please enter a valid email',
            },
          })}
        />
      </Grid>
      <Grid container item spacing={2} mt={{ lg: 1 }}>
        <Grid item xs={12} sm="auto">
          <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
            {t('Submit')}
          </Button>
        </Grid>

        <Grid item xs={12} sm="auto">
          <Button
            fullWidth
            variant="contained"
            color="grey"
            onClick={() => {
              updateShowPage('Profile');
            }}
          >
            {t('Cancel')}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        maxWidth="sm"
        scroll="body"
        open={showOTPPOPUp}
        PaperProps={{ sx: { borderRadius: '10px' } }}
      >
        <ConfirmOTP otpData={userEditData} userRequestData={userRequestData} />
      </Dialog>
    </Grid>
  );
}

export default CollegeDean;
