import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, TextField } from '../../../ui/core';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

export function CollegeRegistrar() {
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
      registrarName: '',
      registrarPhoneNumber: '',
      registrarEmail: '',
      registrarUserId: '',
      registrarPassword: '',
    },
  });
  const onSubmit = () => {
    navigate(`/NMR/NMR-generate`);
  };
  return (
    <Grid container spacing={2} mt={2} p={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography color="textPrimary.main" variant="h2">
              College Registrar
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item p={2} spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            <b>{t('College Registrar Name')}</b>{' '}
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
        <Grid item xs={8} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            <b>{t('College Registrar Phone Number')}</b>{' '}
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
        <Grid item xs={8} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            <b>{t('College Registrar Email Address')}</b>{' '}
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
      </Grid>
      <Grid container item spacing={2} p={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            <b>{t('College Registrar User ID')}</b>{' '}
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
        <Grid item xs={8} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            <b>{t('College Registrar Password')}</b>{' '}
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
      </Grid>
      <Grid container item spacing={2}>
        <Box display="flex" mt={1} pl={2}>
          <Button
            sx={{ mr: 2 }}
            size="medium"
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
          >
            {t('SUBMIT')}
          </Button>

          <Button
            sx={{ mr: 2 }}
            size="medium"
            variant="contained"
            color="grey"
            onClick={handleSubmit(onSubmit)}
          >
            {t('Cancel')}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CollegeRegistrar;
