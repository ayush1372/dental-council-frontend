import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, Container, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import OtpForm from '../../../shared/otp-form/otp-component';
import { Button } from '../../../ui/core';
// import MobileNumber from '../../../ui/core/mobile-number/mobile-number';

function Formverification() {
  const [open, setOpen] = useState(true);
  const [showOtp, setShowOtp] = useState(false);

  //   const showOtpForm = () => {
  //     setShowOtp(true);
  //   };
  const {
    register,
    // handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      MobileNumber: '',
      EmailId: '',
    },
  });
  const handleVerify = () => {
    setShowOtp(true);
  };

  return (
    <Container sx={{ width: '712px' }}>
      <Box>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon color="inputBorderSuccessColor.main" fontSize="inherit" />
              </IconButton>
            }
            sx={{ m: 2, marginLeft: '0px', borderRadius: '5px' }}
          >
            Record fetched successfully.
          </Alert>
        </Collapse>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="body3" component="div">
            Name
          </Typography>
          <Typography variant="subtitle2" component="div" color="primary">
            Akshath Saxena
          </Typography>
        </Box>
        <Box>
          <Typography variant="body3" component="div">
            Registration Number
          </Typography>
          <Typography variant="subtitle2" component="div" color="primary">
            9876543210
          </Typography>
        </Box>
      </Box>
      <Box pt="34px" pb="51px">
        <Typography variant="body3" component="div">
          Council
        </Typography>
        <Typography variant="subtitle2" component="div" color="primary">
          West Bengal Medical Council
        </Typography>
      </Box>
      <Box display="flex">
        <Typography variant="body3">
          College Name
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>
        </Typography>
        <TextField
          sx={{ width: '536px', paddingRight: '16px' }}
          required
          name={'MobileNumber'}
          placeholder={t('Enter MObile Number')}
          defaultValue={getValues().MobileNumber}
          error={errors.MobileNumber?.message}
          {...register('MobileNumber', {
            required: 'Mobile number is required',
          })}
        />
        <Button variant="contained" color="primary" width="95px" onclick={handleVerify}>
          verify
        </Button>
      </Box>
      {showOtp && (
        <Box>
          <Box>
            <Typography variant="h3">Confirm OTP</Typography>
          </Box>
          <Box>
            <Typography variant="body1">
              We just sent an OTP on your Mobile Number XXXXXX0000.
            </Typography>
          </Box>
          {OtpForm}
        </Box>
      )}
    </Container>
  );
}

export default Formverification;
