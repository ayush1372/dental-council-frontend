import { Box, Button, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { TextField } from '../../../ui/core';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    onSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
    },
  });
  return (
    <Container>
      <Typography color="primary" variant="h2" textAlign="center" mt={2}>
        Change Password
      </Typography>
      <Container
        sx={{
          width: '70%',
          margin: '10px auto',
          backgroundColor: 'white.main',
          boxShadow: 4,
        }}
      >
        <Box p={4} boxShadow="4">
          <Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body3" color="primary">
                {t('Old Password')}
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                type="Password"
                name="oldPassword"
                required="true"
                placeholder={t('Old password')}
                defaultValue={getValues().oldPassword}
                error={errors.oldPassword?.message}
                {...register('oldPassword', {
                  required: 'Enter old password',
                })}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body3" color="primary" mt={2}>
                {t('New Password')}
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                type="Password"
                name="newPassword"
                required="true"
                placeholder={t('New password')}
                defaultValue={getValues().newPassword}
                error={errors.newPassword?.message}
                {...register('newPassword', {
                  required: 'Enter new password',
                })}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body3" color="primary">
                {t('Confirm password')}
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                type="Password"
                name="confirmPassword"
                required="true"
                placeholder={t('Confirm Password')}
                defaultValue={getValues().confirmPassword}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (val) => {
                    if (watch('newPassword') !== val) {
                      return 'Password does not match';
                    }
                  },
                })}
              />
            </Box>

            <Box align="center" sx={{ mt: 3 }}>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  backgroundColor: 'secondary.lightOrange',
                  '&:hover': {
                    backgroundColor: 'secondary.lightOrange',
                  },
                }}
                onClick={handleSubmit(onSubmit)}
              >
                {t('Submit')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default ChangePassword;
