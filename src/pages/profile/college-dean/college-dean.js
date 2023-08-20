import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import {
  collegeProfileData,
  sendDeanDetails,
  updateCollegeRegistrarData,
} from '../../../store/actions/college-actions';
import { logoutAction } from '../../../store/actions/login-action';
import { logout, resetCommonReducer } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';

export function CollegeDean({ showPage, updateShowPage, userType }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { collegeData } = useSelector((state) => state.college);
  const userData = collegeData?.data;

  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [emailIDUpdated, setEmailIDUpdated] = useState(false);

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
                  navigate('/');
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
          error={errors.deanPhoneNumber?.message}
          {...register('deanPhoneNumber', {
            required: 'Please enter mobile number',
            pattern: {
              value: /^(\d{10})$/i,
              message: 'Please enter a valid mobile number',
            },
          })}
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
    </Grid>
  );
}

export default CollegeDean;
