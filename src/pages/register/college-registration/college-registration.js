import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Container, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { TextField } from '../../../../src/ui/core/form/textfield/textfield';
import { SearchableDropdown } from '../../../components/autocomplete/searchable-dropdown';
import { verboseLog } from '../../../config/debug';
import { StateNames, UniversityNames } from '../../../constants/utils';
import ModalOTP from '../../../shared/otp-modal/otp-modal';
import { Button } from '../../../ui/core';

export function CollegeRegistration() {
  const { otpPopup, handleClickOpen, otpMobileVerify, otpEmailVerify } = ModalOTP({
    afterConfirm: () => {},
    headerText:
      'We just sent an OTP on your registered Mobile Number XXXXXX2182 linked with your Aadhaar.',
  });
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyMobile, setVerifyMobile] = useState(false);
  const getOtp = (type) => {
    if (type === 'phone' && otpMobileVerify) {
      setVerifyMobile(true);
    } else if (type === 'email' && otpEmailVerify) {
      setVerifyEmail(true);
    }
    handleClickOpen();
  };
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      CollegeName: '',
      CollegeId: '',
      CollegePhoneNumber: '',
      CollegeAddress: '',
      CollegePincode: '',
      CollegeWebsite: '',
      DepartmentName: '',
      StateName: '',
      UniversityName: '',
    },
  });
  const onHandleChange = (data) => {
    alert(data);
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  const onsubmit = () => {
    alert(getValues().UniversityName);
  };
  return (
    <Container sx={{ marginTop: '37px' }}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Box display="flex">
            <Typography variant="h2" color="textPrimary.main">
              College Registration
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} marginTop="40px">
          <Box display="flex">
            <Typography variant="h2" color="textPrimary.main">
              College Details
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={1}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Name
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>
          <TextField
            fullWidth={true}
            required
            name={'CollegeName'}
            placeholder={'Enter College Name'}
            defaultValue={getValues().CollegeName}
            error={errors.CollegeName?.message}
            {...register('CollegeName', {
              required: 'College Name is required',
            })}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College ID
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>
          <TextField
            fullWidth={true}
            required
            name={'CollegeId'}
            placeholder={'Enter College Id'}
            error={errors.CollegeId?.message}
            {...register('CollegeId', {
              required: 'College ID is required',
            })}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Phone Number
            <Typography component="span" sx={{ color: 'error.main' }}>
              *
            </Typography>
            <Typography component="span">
              <IconButton aria-label="toggle password visibility" edge="end">
                {verifyMobile && <CheckCircleIcon color="success" />}
              </IconButton>
            </Typography>
          </Typography>

          <TextField
            fullWidth={true}
            name="CollegePhoneNumber"
            required
            placeholder={t('Phone number')}
            onInput={(e) => handleInput(e)}
            error={errors.CollegePhoneNumber?.message}
            {...register('CollegePhoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^\d{10}$/i,
                message: 'Provide a Valid Phone number',
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    sx={{
                      padding: '15px 10px 12px 10px',
                    }}
                    onClick={() => getOtp('phone')}
                  >
                    Get OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {otpPopup}
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Email ID
            <Typography component="span" sx={{ color: 'error.main' }}>
              *
            </Typography>
            <Typography component="span">
              <IconButton aria-label="toggle password visibility" edge="end">
                {verifyEmail && !errors.email?.message && getValues().email.length !== 0 ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  ''
                )}
              </IconButton>
            </Typography>
          </Typography>

          <TextField
            sx={{
              paddingRight: '0px',
            }}
            fullWidth={true}
            type="text"
            name="email"
            required
            placeholder={t('Email')}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email ID is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                message: 'Provide a Valid Email ID',
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={() => getOtp('email')}
                    variant="contained"
                    sx={{
                      padding: '15px 10px 12px 10px',
                    }}
                  >
                    Get OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          {' '}
          <Typography variant="body3" color="inputTextColor.main">
            Select University Name
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>
          <SearchableDropdown
            name="UniversityName"
            onChange={onHandleChange}
            clearErrors={clearErrors}
            // defaultValue={
            //   showEdit
            //     ? collegeData.collegeUniversityName
            //     : { id: '3', name: getValues().UniversityName }
            // }
            items={UniversityNames}
            // onChange={(newValue) => {
            //   verboseLog(newValue);
            // }}
            placeholder="Select University Name"
            error={errors.UniversityName?.message}
            {...register('UniversityName', {
              required: 'University Name is required',
            })}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Website
          </Typography>

          <TextField
            fullWidth={true}
            name={'CollegeWebsite'}
            placeholder={'Enter College Website'}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Address
          </Typography>

          <TextField
            fullWidth={true}
            name={'CollegeAddress'}
            placeholder={'Enter College Address'}
            error={errors.CollegeAddress?.message}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Pin Code
          </Typography>
          <TextField
            fullWidth={true}
            required
            name={'CollegePincode'}
            placeholder={'Enter College Pin Code'}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            State Name
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>

          <SearchableDropdown
            name="StateName"
            items={StateNames}
            clearErrors={clearErrors}
            onChange={(newValue) => {
              verboseLog(newValue);
            }}
            placeholder={'West Bengal'}
            error={errors.StateName?.message}
            {...register('StateName', {
              required: 'State Name is required',
            })}
          />
        </Grid>
      </Grid>

      <Box display="flex" marginTop="57px">
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginRight: '16px', marginBottom: '48px' }}
          onClick={handleSubmit(onsubmit)}
        >
          Submit
        </Button>
        <Button variant="contained" color="grey" sx={{ marginBottom: '48px' }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
export default CollegeRegistration;
