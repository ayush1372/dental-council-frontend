import { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Container, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../../../../src/ui/core/form/textfield/textfield';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import ModalOTP from '../../../shared/otp-modal/otp-modal';
import { registerCollegeDetails } from '../../../store/actions/college-actions';
import {
  getRegistrationCouncilList,
  getStatesList,
  getUniversitiesList,
  sendNotificationOtp,
  verifyNotificationOtp,
} from '../../../store/actions/common-actions';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

export function CollegeRegistration() {
  const { statesList, councilNames, universitiesList } = useSelector((state) => state.common);
  const registrationSuccess = useSelector((state) => state.college.collegeRegisterDetails.data);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyMobile, setVerifyMobile] = useState(false);
  const [type, setType] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [transactionID, setTransactionID] = useState('');
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (collegeRegisterDetails?.data.length !== 0) {
  //     setSuccessModalPopup(true);
  //   }
  // }, [collegeRegisterDetails?.data]);
  useEffect(() => {
    dispatch(getStatesList());
    dispatch(getRegistrationCouncilList());
    dispatch(getUniversitiesList());
  }, []);

  const onContinue = (otpNumber) => {
    if (type === 'sms') {
      dispatch(
        verifyNotificationOtp({
          transaction_id: transactionID,
          contact: getValues().CollegePhoneNumber,
          type: type,
          otp: otpNumber,
        })
      )
        .then(() => {
          setVerifyMobile(true);
          handleClose();
        })
        .catch((error) => {
          setVerifyMobile(false);
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
    } else {
      dispatch(
        verifyNotificationOtp({
          transaction_id: transactionID,
          contact: getValues().email,
          type: type,
          otp: otpNumber,
        })
      )
        .then(() => {
          setVerifyEmail(true);
          handleClose();
        })
        .catch((error) => {
          setVerifyEmail(false);
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
    }
  };

  const onOtpResendClick = () => {
    if (type === 'sms' && otpMobileVerify) {
      setHeaderText(`Mobile Number${getValues().CollegePhoneNumber}`);
      dispatch(sendNotificationOtp({ contact: getValues().CollegePhoneNumber, type: type }))
        .then((response) => {
          setTransactionID(response?.data?.transaction_id);
          handleClickOpen();
        })
        .catch((error) => {
          handleClose();
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
    } else if (type === 'email' && otpEmailVerify) {
      setHeaderText(`Email Id ${getValues().email}`);
      dispatch(sendNotificationOtp({ contact: getValues().email, type: type }))
        .then((response) => {
          setTransactionID(response?.data?.transaction_id);
          handleClickOpen();
        })
        .catch((error) => {
          handleClose();
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
    }
  };

  const { otpPopup, handleClickOpen, otpMobileVerify, otpEmailVerify, handleClose } = ModalOTP({
    afterConfirm: onContinue,
    reSentOtp: onOtpResendClick,
    headerText: `Please enter the OTP sent on your registered  ${headerText} linked with your Aadhaar.`,
  });

  const getOtp = (type) => {
    setType(type);

    if (type === 'sms' && otpMobileVerify) {
      setHeaderText(
        `Mobile NumberXXXXX${getValues().CollegePhoneNumber.substr(
          getValues().CollegePhoneNumber.length - 4
        )}`
      );
      dispatch(sendNotificationOtp({ contact: getValues().CollegePhoneNumber, type: type }))
        .then((response) => {
          setTransactionID(response?.data?.transaction_id);
          handleClickOpen();
        })
        .catch((error) => {
          handleClose();
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
    } else if (type === 'email' && otpEmailVerify) {
      setHeaderText(`Email Id ******${getValues().email.substr(getValues().email.length - 15)}.`);
      dispatch(sendNotificationOtp({ contact: getValues().email, type: type }))
        .then((response) => {
          setTransactionID(response?.data?.transaction_id);
          handleClickOpen();
        })
        .catch((error) => {
          handleClose();
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    reset,
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
    },
  });

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  const onsubmit = () => {
    const collegeDetailValues = {
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
      request_id: '3',
      pin_code: getValues().CollegePincode,
      state_id: getValues().StateId,
    };

    dispatch(registerCollegeDetails(collegeDetailValues))
      .then(() => {
        if (registrationSuccess) {
          setSuccessModalPopup(true);
        }
        reset();
      })
      .catch((error) => {
        successToast(
          error?.data?.response?.data?.error,
          'RegistrationError',
          'error',
          'top-center'
        );
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
              items={createEditFieldData(councilNames)}
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
            clearErrors={clearErrors}
            items={createEditFieldData(universitiesList.data)}
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
            placeholder={'select state name'}
            error={errors.StateName?.message}
            {...register('StateName', {
              required: 'State Name is required',
            })}
            onChange={(currentValue) => {
              setValue('StateId', currentValue.id);
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
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={
            'Your profile has been successfully registered.Further details would be sent on your registered Email ID'
          }
        />
      )}
    </Container>
  );
}
export default CollegeRegistration;
