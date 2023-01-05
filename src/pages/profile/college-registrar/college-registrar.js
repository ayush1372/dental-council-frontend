/* eslint-disable no-console */
import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// import { useNavigate } from 'react-router-dom';
import { verboseLog } from '../../../config/debug';
import { sendRegistrarDetails } from '../../../store/actions/college-actions/registrar-actions';
import { detailsOfRegistrar } from '../../../store/reducers/college-reducer/registrar-reducer';
import { Button, TextField } from '../../../ui/core';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export function CollegeRegistrar() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = useSelector((state) => state?.collegeData?.registrarDetails);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      registrarName: '',
      registrarPhoneNumber: '',
      registrarEmail: '',
      registrarUserId: '',
      registrarPassword: '',
    },
  });

  const onSubmit = (dataValue) => {
    dispatch(detailsOfRegistrar(dataValue));

    console.log('clicked');
    // navigate(`/NMR/NMR-generate`);
    sendRegistrarDetails(dataValue);
  };
  verboseLog('details==>', details);
  return (
    <Grid container item spacing={2} p={2}>
      <Grid item xs={12}>
        <Box>
          <Typography color="textPrimary.main" variant="h2">
            College Registrar
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar Name')}</b>
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
            required: 'Provide Registrar Name',
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar Phone Number')}</b>
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
            required: 'Provide Phone Number',
            pattern: {
              value: /^(\d{13})$/i,
              message: 'Provide Phone Number',
            },
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
        <Typography variant="body1" color="inputTextColor.main">
          <b>{t('College Registrar Email Address')}</b>
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
            required: 'Provide Email ID',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
              message: 'Provide Email ID',
            },
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
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
            required: 'Provide Registrar User ID',
          })}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} lg={4}>
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
          type="password"
          name="registrarPassword"
          required="true"
          placeholder={t('College Registrar Password')}
          margin="dense"
          defaultValue={getValues().registrarPassword}
          error={errors.registrarPassword?.message}
          {...register('registrarPassword', PasswordRegexValidation, {
            required: 'Provide registrar Password',
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
          <Button fullWidth variant="contained" color="grey">
            {t('Cancel')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CollegeRegistrar;
