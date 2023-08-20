import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { logoutAction } from '../../../store/actions/login-action';
import { getUpdatedNBEProfileData } from '../../../store/actions/nbe-actions';
import { logout, resetCommonReducer } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import { EmailRegexValidation } from '../../../utilities/common-validations';

const NbeEditProfile = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.nbe?.nbeData?.data);

  const [emailIDUpdated, setEmailIDUpdated] = useState(false);

  const [successModalPopup, setSuccessModalPopup] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: userData?.id,
      user_id: userData?.id,
      first_name: userData?.display_name,
      email_id: userData?.email_id,
      mobile_no: userData?.mobile_no,
    },
  });

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  let nbeUpdatedData = {
    id: userData?.id,
    user_id: getValues().user_id,
    display_name: getValues().first_name,
    email_id: getValues().email_id,
    mobile_no: getValues().mobile_no,
  };

  const onsubmit = () => {
    let updatedNbeData = {
      email_id: getValues().email_id,
      mobile_no: getValues().mobile_no,
      display_name: getValues().first_name,
    };

    dispatch(getUpdatedNBEProfileData(updatedNbeData, nbeUpdatedData?.id)).then((response) => {
      if (response?.isError === false) {
        setSuccessModalPopup(true);
        if (getValues().email_id !== userData?.email_id) {
          setEmailIDUpdated(true);
        }
      }
    });
  };

  return (
    <Box>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => {
            props?.sentDetails('Profile');
            setSuccessModalPopup(false);
            if (emailIDUpdated)
              dispatch(logoutAction()).then((response) => {
                if (response) {
                  logoutUser();
                  dispatch(logout());
                  dispatch(resetCommonReducer());
                  navigate('/');
                }
              });
          }}
          text={'NBE profile data has been updated.'}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h2" color="textPrimary.main">
              {t('Edit Profile')}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={3}>
          <Typography variant="body3" color="grey.label">
            {t('Name')}
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
                value: /^(?!^\s)[a-zA-Z\s']*$(?<!\s$)/,
                message: 'Please enter a valid name',
              },
            })}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body3" color="grey.label">
            {t('Mobile Number')}
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'mobile_no'}
            placeholder={'Enter mobile number '}
            defaultValue={getValues().mobile_no}
            onInput={(e) => handleInput(e)}
            error={errors.mobile_no?.message}
            {...register('mobile_no', {
              required: 'Please enter mobile number',
              pattern: {
                value: /^(\d{10})$/i,
                message: 'Please enter a valid 10 digit mobile number',
              },
            })}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="body3" color="grey.label">
            {t('Email')}
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
      <Grid container item spacing={2} mt={3}></Grid>

      <Box display="flex" mt={5} md="auto">
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
          {t('Submit')}
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
          {t('Cancel')}
        </Button>
      </Box>
    </Box>
  );
};

export default NbeEditProfile;
