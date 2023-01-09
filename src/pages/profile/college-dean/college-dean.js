import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, TextField } from '../../../ui/core';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export function CollegeDean() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      deanName: '',
      deanPhoneNumber: '',
      deanEmail: '',
      deanUserId: '',
      deanPassword: '',
    },
  });
  const onSubmit = () => {
    navigate(`/NMR/NMR-generate`);
  };
  return (
    <Grid container item spacing={2} p={2}>
      <Grid item xs={12}>
        <Typography color="textPrimary.main" variant="h2" mt={2}>
          College Dean
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
            required: 'Enter valid college registrar name',
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
              value: /^(\d{13})$/i,
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
            required: 'Enter valid Email address',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
              message: 'Enter valid Email address',
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
            required: 'Enter valid username',
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
          type="password"
          name="deanPassword"
          required="true"
          placeholder={t('College Dean Password')}
          margin="dense"
          defaultValue={getValues().deanPassword}
          error={errors.deanPassword?.message}
          {...register('deanPassword', PasswordRegexValidation, {
            required: 'Provide Dean Password',
          })}
        />
      </Grid>

      <Grid container item spacing={2} mt={{ lg: 1 }}>
        <Grid item xs={12} sm="auto">
          <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
            {t('SUBMIT')}
          </Button>
        </Grid>

        <Grid item xs={12} sm="auto">
          <Button fullWidth variant="contained" color="grey" onClick={handleSubmit(onSubmit)}>
            {t('Cancel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CollegeDean;
