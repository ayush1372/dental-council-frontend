import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { sendDeanDetails, updateCollegeDeanData } from '../../../store/actions/college-actions';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export function CollegeDean({ showPage, updateShowPage }) {
  const dispatch = useDispatch();
  const { collegeData } = useSelector((state) => state.college);
  const userData = collegeData?.data;
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    reset,

    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: showPage === 'edit' ? userData?.id : null,
      deanName: showPage === 'edit' ? userData?.name : '',
      deanPhoneNumber: showPage === 'edit' ? userData?.phone_number : '',
      deanEmail: showPage === 'edit' ? userData?.email_id : '',
      deanUserId: showPage === 'edit' ? userData?.user_id : '',
      deanPassword: '',
    },
  });
  const onSubmit = (fieldValues) => {
    let deanData = {
      name: showPage === 'edit' ? fieldValues.deanName : null,
      phone_number: showPage === 'edit' ? fieldValues.deanPhoneNumber : null,
      email_id: showPage === 'edit' ? fieldValues.deanEmail : null,
      user_id: showPage === 'edit' ? fieldValues?.deanUserId : null,
      password: showPage === 'edit' ? fieldValues.deanPassword : null,
    };

    if (showPage === 'edit') {
      dispatch(updateCollegeDeanData(deanData, fieldValues?.id))
        .then((response) => {
          if (response?.isError === false) {
            setSuccessModalPopup(true);
          }
        })
        .catch((error) => {
          successToast(error?.data?.response?.data?.message, 'UpdateError', 'error', 'top-center');
        });
    } else {
      dispatch(sendDeanDetails(deanData));
    }

    reset();
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
          text={'College Dean Data has been Updated Successfully.'}
        />
      )}
      <Grid item xs={12} mt={3}>
        <Typography color="textPrimary.main" variant="h2" mt={2}>
          {showPage === 'edit' ? 'Edit College Dean' : 'College Dean'}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Dean Name')}</b>
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
          placeholder={t('College Dean Name')}
          margin="dense"
          defaultValue={getValues().deanName}
          error={errors.deanName?.message}
          {...register('deanName', {
            required: 'Enter valid name',
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Dean Phone Number')}</b>
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
          placeholder={t('College Dean Phone Number')}
          margin="dense"
          defaultValue={getValues().deanPhoneNumber}
          error={errors.deanPhoneNumber?.message}
          {...register('deanPhoneNumber', {
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
          <b>{t('College Dean Email Address')}</b>
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
          placeholder={t('College Dean Email Address')}
          margin="dense"
          defaultValue={getValues().deanEmail}
          error={errors.deanEmail?.message}
          {...register('deanEmail', {
            required: 'Enter valid email address',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
              message: 'Enter Valid Email Address',
            },
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Dean User ID')}</b>
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
          name="deanUserId"
          required="true"
          placeholder={t('College Dean User ID')}
          margin="dense"
          defaultValue={getValues().deanUserId}
          error={errors.deanUserId?.message}
          {...register('deanUserId', {
            required: 'Enter valid user ID',
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Dean Password')}</b>
        </Typography>
        <Typography component="span" color="error.main">
          *
        </Typography>
        <TextField
          fullWidth
          inputProps={{ maxLength: 100 }}
          variant="outlined"
          type="Password"
          name="deanPassword"
          required="true"
          placeholder={t('College Dean Password')}
          margin="dense"
          defaultValue={getValues().deanPassword}
          error={errors.deanPassword?.message}
          {...register('deanPassword', PasswordRegexValidation, {
            required: 'Enter valid password',
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
