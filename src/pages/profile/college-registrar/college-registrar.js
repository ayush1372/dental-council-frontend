import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import {
  collegeProfileData,
  sendRegistrarDetails,
  updateCollegeRegistrarData,
} from '../../../store/actions/college-actions';
import { logoutAction } from '../../../store/actions/login-action';
import { logout, resetCommonReducer } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import { EmailRegexValidation } from '../../../utilities/common-validations';

export function CollegeRegistrar({ showPage, updateShowPage }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
      registrarName: showPage === 'edit' ? userData?.name : '',
      registrarPhoneNumber: showPage === 'edit' ? userData?.mobile_number : '',
      registrarEmail: showPage === 'edit' ? userData?.email_id : '',
      registrarUserId: showPage === 'edit' ? userData?.user_id : '',
      registrarPassword: '',
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
  const onSubmit = (fieldData) => {
    let registrarData = {
      id: showPage === 'edit' ? userData?.id : null,
      college_id: showPage === 'edit' ? userData?.college_id : null,
      designation: showPage === 'edit' ? userData?.designation : null,
      name: showPage === 'edit' ? fieldData?.registrarName : null,
      mobile_number: showPage === 'edit' ? fieldData?.registrarPhoneNumber : null,
      email_id: showPage === 'edit' ? fieldData?.registrarEmail : null,
    };
    if (showPage === 'edit') {
      dispatch(updateCollegeRegistrarData(registrarData, userData?.college_id, userData?.id)).then(
        (response) => {
          dispatch(collegeProfileData(userData?.college_id, userData?.id));
          if (response?.isError === false) {
            setSuccessModalPopup(true);
          }
          if (
            fieldData?.registrarEmail !== userData?.email_id ||
            fieldData?.registrarPhoneNumber !== userData?.mobile_number
          ) {
            setEmailIDUpdated(true);
          }
        }
      );
    } else {
      dispatch(sendRegistrarDetails(registrarData, userData?.id));
    }
  };

  return (
    <Grid container item spacing={2} p={2}>
      <Grid item xs={12}>
        <Box>
          <Typography color="textPrimary.main" variant="h2">
            {showPage === 'edit' ? 'Edit College Registrar' : 'College Registrar'}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
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
          name="registrarName"
          required="true"
          placeholder={t('Enter name')}
          margin="dense"
          defaultValue={getValues().registrarName}
          error={errors.registrarName?.message}
          {...register('registrarName', {
            required: 'Please enter name',

            pattern: {
              value: /^[A-Z\s@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
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
          defaultValue={'College Registrar'}
          value={'College Registrar'}
          disabled
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
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
          name="registrarPhoneNumber"
          required="true"
          placeholder={t('Enter mobile number')}
          margin="dense"
          defaultValue={getValues().registrarPhoneNumber}
          onInput={(e) => handleInput(e)}
          error={errors.registrarPhoneNumber?.message}
          {...register('registrarPhoneNumber', {
            required: 'Please enter mobile number',
            pattern: {
              value: /^(\d{10})$/i,
              message: 'Please enter a valid 10 digit mobile number',
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
          name="registrarEmail"
          required="true"
          placeholder={t('Enter email')}
          margin="dense"
          defaultValue={getValues().registrarEmail}
          error={errors.registrarEmail?.message}
          {...register('registrarEmail', EmailRegexValidation)}
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
                showPage === 'edit'
                  ? emailIDUpdated
                    ? 'Your profile has been updated. Please login again with updated details.'
                    : 'Your profile has been updated.'
                  : `Registrar profile has been created. Further details would be sent on registrar's registered Email ID`
              }
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CollegeRegistrar;
