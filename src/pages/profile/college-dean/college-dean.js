import { Box, Grid, Typography } from '@mui/material';
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
    <Grid container spacing={2} mt={2} p={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography color="textPrimary.main" variant="h2">
              College Dean
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item p={2} spacing={2}>
        <Grid item xs={8} md={4}>
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
              required: 'Provide Dean Name',
            })}
          />
        </Grid>
        <Grid item xs={8} md={4}>
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
              required: 'Provide Dean User ID',
            })}
          />
        </Grid>
        <Grid item xs={8} md={4}>
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

export default CollegeDean;
