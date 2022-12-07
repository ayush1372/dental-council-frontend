import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, TextField } from '../../../ui/core';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

import styles from '../login-page.module.scss';

const NewPasswordSetup = ({ handlePasswordSetup }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = () => {
    handlePasswordSetup();
  };
  return (
    <Box data-testid="new-password-setup" p={4} className={styles.loginContainerBox}>
      <Typography
        sx={{ mt: 2 }}
        variant="h2"
        component="div"
        textAlign="center"
        data-testid="Password"
      >
        Enter New Password
      </Typography>
      <Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            New Password
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <TextField
            inputProps={{ maxLength: 100 }}
            fullWidth
            id="outlined-basic"
            variant="outlined"
            type="Password"
            name="password"
            required="true"
            placeholder={t('Enter New Password')}
            margin="dense"
            defaultValue={getValues().password}
            error={errors.password?.message}
            {...register('password', PasswordRegexValidation, {
              required: 'Provide Password',
            })}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" data-testid="confirmPassword">
            Confirm Password
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <TextField
            inputProps={{ maxLength: 100 }}
            fullWidth
            id="outlined-basic"
            variant="outlined"
            type="Password"
            name="confirmPassword"
            required="true"
            placeholder={t('Enter Confirm Password')}
            margin="dense"
            defaultValue={getValues().confirmPassword}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Provide Confirm Password',
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Your passwords do no match';
                }
              },
            })}
          />
        </Box>

        <Box align="end" sx={{ mt: 3 }}>
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
  );
};
export default NewPasswordSetup;
