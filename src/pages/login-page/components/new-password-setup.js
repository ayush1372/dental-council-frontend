import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { encryptData } from '../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { setUserPassword } from '../../../store/actions/doctor-registration-actions';
import { Button, TextField } from '../../../ui/core';
import { PasswordRegexValidation } from '../../../utilities/common-validations';

const NewPasswordSetup = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const registrationNumber = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.registration_number
  );
  const uniqueHpId = useSelector((state) =>
    state?.doctorRegistration?.hpIdExistsDetailsData?.data?.hprId.replace('@hpr.abdm', '')
  );
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
    const reqObj = {
      username: uniqueHpId,
      registration_number: registrationNumber,
      password: encryptData(getValues()?.password, process.env.REACT_APP_PASS_SITE_KEY),
    };
    dispatch(setUserPassword(reqObj)).then(() => {
      setShowSuccess(true);
    });
  };

  return (
    <Box data-testid="new-password-setup" p={4} bgcolor="white.main" boxShadow="4" width="40%">
      <Typography mt={2} variant="h4" component="div" textAlign="center" data-testid="Password">
        {`Welcome  ${uniqueHpId} ! `}
      </Typography>
      <Typography
        mt={2}
        variant="body1"
        component="div"
        textAlign="center"
        data-testid="Password"
        pb={1}
      >
        {`please set your password `}
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
                  return 'Entered passwords does not match';
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
      {showSuccess && (
        <SuccessModalPopup
          open={showSuccess}
          setOpen={() => setShowSuccess(false)}
          text={`Your password for ${uniqueHpId} has been successfully created `}
          successRegistration={true}
        />
      )}
    </Box>
  );
};
export default NewPasswordSetup;
