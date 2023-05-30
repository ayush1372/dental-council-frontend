import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { encryptData } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { changePasswordData } from '../../../store/actions/common-actions';
import { TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const ChangePassword = () => {
  const theme = useTheme();
  const { loginData } = useSelector((state) => state.loginReducer);
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
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

  const Submit = () => {
    const data = {
      userId: loginData?.data?.user_id,
      oldPassword: encryptData(getValues().oldPassword, process.env.REACT_APP_PASS_SITE_KEY),
      newPassword: encryptData(getValues().newPassword, process.env.REACT_APP_PASS_SITE_KEY),
    };
    dispatch(changePasswordData(data))
      .then(() => {
        setSuccessModalPopup(true);
      })
      .catch((error) => {
        successToast(error?.data?.response?.data?.message, 'auth-error', 'error', 'top-center');
      });
  };

  return (
    <>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={'Your password has been successfully changed'}
          PasswordChange={true}
        />
      )}
      {/* <Typography color="inputTextColor.main" variant="h2" textAlign="center" mt={3}>
        Change Password
      </Typography> */}
      <Box
        display="flex"
        justifyContent="center"
        pt={4}
        sx={{
          backgroundColor: `${theme.palette.white.main}`,
          boxShadow: 4,
        }}
      >
        <Box
          p={2}
          boxShadow="1"
          sx={{
            width: {
              xs: '100%',
              md: '60%',
            },
          }}
        >
          <Box>
            <Box mt={2}>
              <Typography variant="body1" color="inputTextColor.main">
                {t('Old Password')}
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
                name="oldPassword"
                required="true"
                placeholder={t('Old Password')}
                defaultValue={getValues().oldPassword}
                error={errors.oldPassword?.message}
                {...register('oldPassword', {
                  required: 'Enter old password',
                })}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="body1" color="inputTextColor.main" mt={2}>
                {t('New Password')}
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
                name="newPassword"
                required="true"
                placeholder={t('New Password')}
                defaultValue={getValues().newPassword}
                error={errors.newPassword?.message}
                {...register('newPassword', {
                  required: 'Enter new password',
                })}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="body1" color="inputTextColor.main">
                {t('Confirm Password')}
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
                placeholder={t('Confirm Password')}
                defaultValue={getValues().confirmPassword}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Enter confirm password',
                  validate: (val) => {
                    if (watch('newPassword') !== val) {
                      return 'Password does not match';
                    }
                  },
                })}
              />
            </Box>

            <Box align="center" mt={3}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'secondary.lightOrange',
                  '&:hover': {
                    backgroundColor: 'secondary.lightOrange',
                  },
                  width: {
                    xs: '100%',
                    md: 'fit-content',
                  },
                }}
                onClick={handleSubmit(Submit)}
              >
                {t('Submit')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
