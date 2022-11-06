import { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../../../config/debug';
import { Button, RadioGroup, TextField } from '../../../../ui/core';
import { PasswordRegexValidation } from '../../../../utilities/common-validations';
import { ModalOTP } from '../../../login/components/modal-otp/modal-otp';

export function LoginSetPassword() {
  const { otpPopup, handleClickOpen, isOtpVerified } = ModalOTP();
  const handleChange = (event) => {
    setValue(event.target.name, event.target.value, true);
    handleClickOpen();
    verboseLog(isOtpVerified);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      SetPassword: '',
      ConfirmPassword: '',
    },
  });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const onSubmit = () => {
    setIsDialogOpen(true);
  };

  return (
    <Box mt={8}>
      <Typography variant="h1" mb={2}>
        Set Password
      </Typography>
      <Typography variant="body1">Here you can set password for your Account.</Typography>
      <Box
        border="1px solid "
        borderColor="inputBorderColor.main"
        borderRadius="3px"
        mt={8}
        p="24px 48px"
      >
        <Box mt={2}>
          <TextField
            fullWidth={true}
            data-testid="passwordtxt"
            variant="outlined"
            label=" Set Password"
            type="Password"
            name="SetPassword"
            required="true"
            placeholder="Set Password"
            margin="dense"
            defaultValue={getValues().SetPassword}
            error={errors.SetPassword?.message}
            {...register('SetPassword', PasswordRegexValidation)}
          />
        </Box>
        <Typography variant="caption" color="messageBlue.main">
          <InfoOutlinedIcon
            sx={{ fontSize: '15px', verticalAlign: 'middle', marginRight: '5px' }}
          />
          Your Password should contains Numbers(0-9)/Letters(a-z) and special characters.
        </Typography>
        <Box mt={2}>
          <TextField
            fullWidth={true}
            data-testid="confirmpasswordtxt"
            variant="outlined"
            type="Password"
            label="Confirm Password"
            name="ConfirmPassword"
            required="true"
            placeholder="Confirm Password"
            margin="dense"
            defaultValue={getValues().ConfirmPassword}
            error={errors.ConfirmPassword?.message}
            {...register('ConfirmPassword', {
              required: true,
              validate: (val = '') => {
                if (watch('SetPassword') !== val) {
                  return 'Your passwords do no match';
                }
              },
            })}
          />
        </Box>
        <Box>
          <Typography variant="body1" sx={{ mt: 4 }} component="div">
            Validate Using
          </Typography>
          <Box
            borderRadius="3px"
            border="1px solid"
            borderColor="inputBorderColor.main"
            p="14px 20px"
            mb="25px"
          >
            <RadioGroup
              value={getValues().verifyOption}
              onChange={handleChange}
              name={'verifyOption'}
              data-testid="linkguardian"
              disabled={isOtpVerified}
              items={[
                {
                  value: 'OTP on Mobile number linked with Aadhaar',
                  label: 'OTP on Mobile number linked with Aadhaar',
                },
                {
                  value: 'OTP on Mobile number linked with ABHA Number',
                  label: 'OTP on Mobile number linked with ABHA Number',
                },
              ]}
            />
          </Box>
          {otpPopup}
          {isOtpVerified}
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Button
              data-testid="save"
              color="secondary"
              variant="contained"
              disabled={!isOtpVerified}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
          <Dialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent
              sx={{
                width: '500px',
                padding: '0px',
              }}
            >
              <Box
                sx={{
                  marginTop: '48px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <TaskAltOutlinedIcon
                    sx={{
                      color: 'success.dark',
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h1" color="success.dark">
                    Success!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Typography color="grey.context" variant="subtitle1">
                    Your Password has been <br /> successfully created.
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                padding: '32px 48px 48px 48px',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleDialogClose}
                autoFocus
              >
                View My Profile
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginSetPassword;
