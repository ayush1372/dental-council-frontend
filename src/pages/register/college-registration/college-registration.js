import { useState } from 'react';
import { useEffect } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Container, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../../../../src/ui/core/form/textfield/textfield';
import { verboseLog } from '../../../config/debug';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import ModalOTP from '../../../shared/otp-modal/otp-modal';
import { registerCollegeDetails } from '../../../store/actions/college-actions';
import {
  getRegistrationCouncilList,
  getStatesList,
  getUniversityList,
  sendNotificationOtp,
  verifyNotificationOtp,
} from '../../../store/actions/common-actions';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

export function CollegeRegistration() {
  const { statesList, registrationCouncilList, universitiesList } = useSelector(
    (state) => state.common
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatesList());
    dispatch(getRegistrationCouncilList());
    dispatch(getUniversityList());
  }, []);

  const onContinue = (otpNumber) => {
    // eslint-disable-next-line no-console
    console.log('inside comp', getValues().CollegePhoneNumber, getValues().email, type, otpNumber);
    verboseLog('inside comp.', getValues().CollegePhoneNumber, getValues().email, type, otpNumber);
    if (type === 'sms') {
      dispatch(
        verifyNotificationOtp({
          contact: getValues().CollegePhoneNumber,
          type: type,
          otp: otpNumber,
        })
      )
        .then((response) => {
          // handleClickOpen();
          // eslint-disable-next-line no-console
          console.log('response is ', response);
          verboseLog('response is ', response);
          handleClose();
        })
        .catch((error) => {
          // handleClickOpen();
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
      // } else {
      //   alert('inside email');
      //   dispatch(
      //     verifyNotificationOtp({
      //       contact: getValues().email,
      //       type: type,
      //       otp: otpNumber,
      //     })
      //   )
      // .then((response) => {
      //   // onHandleClick();
      //   verboseLog('otpverify reponse is', response);
      // })
      // .catch((error) => {
      //   successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
      // });
    }
  };

  const {
    otpPopup,
    handleClickOpen,
    otpMobileVerify,
    otpEmailVerify,
    // handleClickClose,
    handleClose,
  } = ModalOTP({
    afterConfirm: onContinue,
    headerText:
      'We just sent an OTP on your registered Mobile Number XXXXXX21123 linked with your Aadhaar.',
  });
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyMobile, setVerifyMobile] = useState(false);
  const [type, setType] = useState('');
  const getOtp = (type) => {
    setType(type);
    if (type === 'sms' && otpMobileVerify) {
      dispatch(sendNotificationOtp({ contact: getValues().CollegePhoneNumber, type: type }))
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log('resposen of sent otp is ', response);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error is', error);
          // handleClickOpen();
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
      setVerifyMobile(true);
    } else if (type === 'email' && otpEmailVerify) {
      verboseLog('inside email');
      dispatch(sendNotificationOtp({ contact: getValues().email, type: type }));
      verboseLog('after dispatch email');
      setVerifyEmail(true);
    }
    handleClickOpen();
    // handleClickOpen({ contact: getValues().CollegePhoneNumber, type: type });
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      CollegeName: '',
      CollegeId: '',
      CollegePhoneNumber: '',
      email: '',
      CollegeWebsite: '',
      CollegeAddress: '',
      CollegePincode: '',
      UniversityName: '',
      UniversityId: '',
      RegistrationCouncil: '',
      RegistrationCouncilId: '',
      StateName: '',
      StateId: '',
      request_id: '3',
    },
  });
  // const onHandleChange = (data) => {
  //   alert(data);
  // };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  const onsubmit = () => {
    const updatedValues = {
      id: null,
      name: getValues().CollegeName,
      college_code: getValues().CollegeId,
      phone_number: getValues().CollegePhoneNumber,
      email_id: getValues().email,
      user_id: null,
      council_id: getValues().RegistrationCouncilId,
      university_id: getValues().UniversityId,
      website: getValues().CollegeWebsite,
      address: getValues().CollegeAddress,
      pin_code: getValues().CollegePincode,
      state_id: getValues().StateId,
    };
    verboseLog('updatedValues is', updatedValues);

    dispatch(registerCollegeDetails(updatedValues)).then((response) => {
      verboseLog(' college registration response is', response);
    });
  };
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="textPrimary.main">
            College Registration
          </Typography>
        </Grid>

        <Grid item xs={12} mt={{ lg: 1 }}>
          <Typography variant="h2" color="textPrimary.main">
            College Details
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
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

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College ID
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'CollegeId'}
            placeholder={'Enter College ID'}
            error={errors.CollegeId?.message}
            {...register('CollegeId', {
              required: 'College ID is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Phone Number
            <Typography component="span" color="error.main">
              *
            </Typography>
            <Typography component="span">
              <IconButton aria-label="toggle password visibility" edge="end">
                {verifyMobile && <CheckCircleIcon color="success" />}
              </IconButton>
            </Typography>
          </Typography>

          <TextField
            fullWidth
            name="CollegePhoneNumber"
            required
            placeholder={t('Phone Number')}
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
                      p: '15px 10px 12px 10px',
                    }}
                    onClick={() => getOtp('sms')}
                  >
                    Get OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {otpPopup}
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Email ID
            <Typography component="span" color="error.main">
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
              pr: 0,
            }}
            fullWidth
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
                      p: '15px 10px 12px 10px',
                    }}
                  >
                    Get OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="textSecondary.main">
            Select Council
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Box>
            <SearchableDropdown
              fullWidth
              name="RegistrationCouncil"
              items={createEditFieldData(registrationCouncilList)}
              placeholder="Select your Registration Council"
              clearErrors={clearErrors}
              error={errors.RegistrationCouncil?.message}
              {...register('RegistrationCouncil', {
                required: 'Registration Council is required',
              })}
              onChange={(currentValue) => {
                setValue('RegistrationCouncilId', currentValue.id);
              }}
            />
          </Box>
          <Grid />
          <Grid />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Select University Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <SearchableDropdown
            fullWidth
            name="UniversityName"
            // onChange={onHandleChange}
            clearErrors={clearErrors}
            items={createEditFieldData(universitiesList)}
            placeholder="Select University Name"
            error={errors.UniversityName?.message}
            {...register('UniversityName', {
              required: 'University Name is required',
            })}
            onChange={(currentValue) => {
              setValue('UniversityId', currentValue.id);
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Website
          </Typography>

          <TextField
            fullWidth
            name={'CollegeWebsite'}
            placeholder={'Enter College Website'}
            {...register('CollegeWebsite', {
              required: 'CollegeWebsite  is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Address
          </Typography>

          <TextField
            multiline
            rows={1}
            fullWidth
            name={'CollegeAddress'}
            placeholder="Enter College Address"
            {...register('CollegeAddress', {
              required: 'CollegeAddress  is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Pin Code
          </Typography>
          <TextField
            fullWidth
            required
            name={'CollegePincode'}
            placeholder={'Enter College Pin Code'}
            {...register('CollegePincode', {
              required: 'College PinCode  is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            State Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>

          <SearchableDropdown
            fullWidth
            name="StateName"
            items={createEditFieldData(statesList)}
            clearErrors={clearErrors}
            // onChange={(newValue) => {
            //   verboseLog(newValue);
            // }}
            placeholder={'select state name'}
            error={errors.StateName?.message}
            {...register('StateName', {
              required: 'State Name is required',
            })}
            onChange={(currentValue) => {
              setValue('StateId', currentValue.id);
              verboseLog('test verbose', getValues()?.StateId);
            }}
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-start" mt={3}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mr: 2, mb: 6 }}
          onClick={handleSubmit(onsubmit)}
        >
          Submit
        </Button>
        <Button variant="contained" color="grey" sx={{ mb: 6 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}
export default CollegeRegistration;
