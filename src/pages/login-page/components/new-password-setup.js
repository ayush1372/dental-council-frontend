import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { encryptData } from '../../../helpers/functions/common-functions';
import { forgotPassword } from '../../../store/actions/forgot-password-actions';
import { Button, TextField } from '../../../ui/core';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

const NewPasswordSetup = ({ handlePasswordSetup }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { verifyNotificationOtpData } = useSelector((state) => state?.common);

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
    const data = {
      token: verifyNotificationOtpData.data?.message?.transaction_id,
      password: encryptData(getValues().password, process.env.REACT_APP_PASS_SITE_KEY),
    };
    dispatch(forgotPassword(data));
  };

  return (
    <Box data-testid="new-password-setup" p={4} bgcolor="white.main" boxShadow="4">
      <Typography mt={2} variant="h2" component="div" textAlign="center" data-testid="Password">
        Enter New Password
      </Typography>
      <Box>
        <Box mt={2}>
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
        <Box mt={2}>
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

        <Box align="end" mt={3}>
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
