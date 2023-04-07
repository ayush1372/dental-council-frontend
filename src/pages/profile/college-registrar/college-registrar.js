import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import {
  collegeProfileData,
  // collegeProfileData,
  sendRegistrarDetails,
  updateCollegeRegistrarData,
} from '../../../store/actions/college-actions';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
// import { PasswordRegexValidation } from '../../../utilities/common-validations';

export function CollegeRegistrar({ showPage, updateShowPage }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { collegeData } = useSelector((state) => state.college);
  const userData = collegeData?.data;
  const [successModalPopup, setSuccessModalPopup] = useState(false);

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

  const onSubmit = (fieldData) => {
    let registrarData = {
      // name: showPage === 'edit' ? fieldData.registrarName : null,
      // phone_number: showPage === 'edit' ? fieldData.registrarPhoneNumber : null,
      // email_id: showPage === 'edit' ? fieldData.registrarPhoneNumber : null,
      // user_id: showPage === 'edit' ? fieldData?.registrarUserId : null,
      // password: showPage === 'edit' ? fieldData.registrarPassword : null,
      id: showPage === 'edit' ? userData?.id : null,
      college_id: showPage === 'edit' ? userData?.college_id : null,
      designation: showPage === 'edit' ? userData?.designation : null,
      name: showPage === 'edit' ? fieldData?.registrarName : null,
      mobile_number: showPage === 'edit' ? fieldData?.registrarPhoneNumber : null,
      email_id: showPage === 'edit' ? fieldData?.registrarEmail : null,
    };
    if (showPage === 'edit') {
      dispatch(updateCollegeRegistrarData(registrarData, userData?.college_id, userData?.id))
        .then((response) => {
          dispatch(collegeProfileData(userData?.college_id, userData?.id));
          if (response?.isError === false) {
            setSuccessModalPopup(true);
          }
        })
        .catch((error) => {
          successToast(error?.data?.response?.data?.message, 'UpdateError', 'error', 'top-center');
        });
    } else {
      dispatch(sendRegistrarDetails(registrarData, userData?.id));
    }
  };

  return (
    <Grid container item spacing={2} p={2}>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => {
            updateShowPage('Profile');
            setSuccessModalPopup(false);
          }}
          text={'College Registrar Data has been Updated Successfully.'}
        />
      )}
      <Grid item xs={12} mt={5}>
        <Box>
          <Typography color="textPrimary.main" variant="h2">
            {showPage === 'edit' ? 'Edit College Registrar' : 'College Registrar'}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          {/* <b>{t('College Registrar Name')}</b> */}
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
          placeholder={t('College Registrar Name')}
          margin="dense"
          defaultValue={getValues().registrarName}
          error={errors.registrarName?.message}
          {...register('registrarName', {
            required: 'Enter valid name',
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          {/* <b>{t('College Registrar Phone Number')}</b> */}
          <b>{t(' Phone Number')}</b>
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
          placeholder={t('College Registrar Phone Number')}
          margin="dense"
          defaultValue={getValues().registrarPhoneNumber}
          error={errors.registrarPhoneNumber?.message}
          {...register('registrarPhoneNumber', {
            required: 'Enter valid phone number',
            pattern: {
              value: /^(\d{10})$/i,
              message: 'Enter valid phone number',
            },
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          {/* <b>{t('College Registrar Email Address')}</b> */}
          <b>{t(' Email Address')}</b>
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
          placeholder={t('College Registrar Email Address')}
          margin="dense"
          defaultValue={getValues().registrarEmail}
          error={errors.registrarEmail?.message}
          {...register('registrarEmail', {
            required: 'Enter valid email address',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
              message: 'Enter valid email address',
            },
          })}
        />
      </Grid>
      {/* <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar User ID')}</b>
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
          name="registrarUserId"
          required="true"
          placeholder={t('College Registrar User ID')}
          margin="dense"
          defaultValue={getValues().registrarUserId}
          error={errors.registrarUserId?.message}
          {...register('registrarUserId', {
            required: 'Enter valid user ID',
          })}
        />
      </Grid> */}
      {/* <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar Password')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          variant="outlined"
          type="Password"
          name="registrarPassword"
          required="true"
          placeholder={t('College Registrar Password')}
          margin="dense"
          defaultValue={getValues().registrarPassword}
          error={errors.registrarPassword?.message}
          {...register('registrarPassword', PasswordRegexValidation, {
            required: 'Enter valid password',
          })}
        />
      </Grid> */}
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
              setOpen={() => setSuccessModalPopup(false)}
              text={
                'You have successfully registered your College Registrar. Defined credentials have been sent on the Email ID and Phone number you registered'
              }
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CollegeRegistrar;
