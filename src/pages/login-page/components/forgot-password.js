import { Box, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, TextField } from '../../../ui/core';
import MobileNumber from '../../../ui/core/mobile-number/mobile-number';

const ForgotPassword = ({ handleConfirmPassword }) => {
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
      Id: '',
      mobileNo: '',
    },
  });

  const watchMobileNum = watch('mobileNo')?.trim();
  const watchId = watch('Id')?.trim();
  const isIdActive = (!watchMobileNum && !watchId) || !watchMobileNum;
  const isMobileNumActive = (!watchMobileNum && !watchId) || !watchId;

  const onSubmit = () => {
    if (watchMobileNum || watchId) {
      handleConfirmPassword();
    } else {
      handleSubmit()();
    }
  };
  return (
    <Box p={4} bgcolor="white.main" boxShadow="4">
      <Typography variant="h2" component="div" textAlign="center">
        Forgot Password
      </Typography>

      <Box mt={2}>
        <Typography variant="body1">
          Enter NMR ID/Reg ID/Email ID
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <TextField
          inputProps={{ maxLength: 100 }}
          fullWidth
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="Id"
          required="true"
          placeholder={t('Enter NMR ID/Reg ID/Email ID')}
          margin="dense"
          defaultValue={getValues().Id}
          error={isIdActive && errors.Id?.message}
          {...register('Id', {
            required: 'Provide valid ID',
          })}
          disabled={!isIdActive}
        />
      </Box>
      <Divider
        sx={{
          fontSize: '16px',
          paddingTop: '15px',
        }}
      >
        <Typography variant="body1" color="inputTextColor.main">
          OR
        </Typography>
      </Divider>
      <Box mt={2}>
        <Typography variant="body1">
          Enter your Mobile Number
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <MobileNumber
          register={register}
          getValues={getValues}
          errors={isMobileNumActive ? errors : {}}
          showCircleCheckIcon={false}
          showhint={false}
          showVerify={false}
          disabled={!isMobileNumActive}
        />
      </Box>
      <Box align="end" mt={3}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'secondary.lightOrange',
            '&:hover': {
              backgroundColor: 'secondary.lightOrange',
            },
          }}
          onClick={onSubmit}
        >
          {t('Submit')}
        </Button>
      </Box>
    </Box>
  );
};
export default ForgotPassword;
