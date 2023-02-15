import { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import ModalOTP from '../../../shared/otp-modal/otp-modal';
import { updateCollegeAdminProfileData } from '../../../store/actions/college-actions';
import {
  getStatesList,
  sendNotificationOtp,
  verifyNotificationOtp,
} from '../../../store/actions/common-actions';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const CollegeEditProfile = () => {
  const { collegeData } = useSelector((state) => state.college);
  const { statesList, registrationCouncilList, universitiesList } = useSelector(
    (state) => state.common
  );

  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verifyMobile, setVerifyMobile] = useState(false);
  const [type, setType] = useState('');
  const [headerText, setHeaderText] = useState('');
  const userData = collegeData?.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatesList());
  }, []);

  const onContinue = (otpNumber) => {
    if (type === 'sms') {
      dispatch(
        verifyNotificationOtp({
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
        .then(() => {
          handleClickOpen();
        })
        .catch((error) => {
          handleClose();
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
    } else if (type === 'email' && otpEmailVerify) {
      setHeaderText(`Email Id ${getValues().email}`);
      dispatch(sendNotificationOtp({ contact: getValues().email, type: type }))
        .then(() => {
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
    headerText: `We just sent an OTP on your registered  ${headerText} linked with your Aadhaar.`,
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
        .then(() => {
          handleClickOpen();
        })
        .catch((error) => {
          handleClose();
          successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
        });
    } else if (type === 'email' && otpEmailVerify) {
      setHeaderText(`Email Id ******${getValues().email.substr(getValues().email.length - 15)}.`);
      dispatch(sendNotificationOtp({ contact: getValues().email, type: type }))
        .then(() => {
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
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      CollegeEmailId: userData?.email_id,
      CollegeName: userData?.name,
      CollegeId: userData?.college_code,
      CollegePhoneNumber: userData?.phone_number,
      CollegeAddress: userData?.address,
      CollegePincode: userData?.pin_code,
      UniversityName: '',
      UniversityId: '',
      RegistrationCouncil: '',
      RegistrationCouncilId: '',
      StateName: '',
      StateId: '',
      CollegeWebsite: userData?.website,
    },
  });

  const onhandleSubmitClick = () => {
    const updatedCollegeDetails = {
      id: userData?.id,
      name: getValues().CollegeName,
      college_code: getValues().CollegeId,
      phone_number: getValues().CollegePhoneNumber,
      email_id: getValues().CollegeEmailId,
      user_id: userData?.id,
      council_id: getValues().RegistrationCouncilId,
      university_id: getValues().UniversityId,
      website: getValues().CollegeWebsite,
      address: getValues().CollegeAddress,
      pin_code: getValues().CollegePincode,
      state_id: getValues().StateId,
    };

    dispatch(updateCollegeAdminProfileData(updatedCollegeDetails));
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  return (
    <Grid>
      <Grid container spacing={2} mt={2}>
        <Grid container item xs={12}>
          <Typography variant="h2" color="textPrimary.main">
            Edit Profile
          </Typography>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
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

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College ID
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'CollegeId'}
            placeholder={'Enter College Id'}
            defaultValue={getValues().CollegeId}
            error={errors.CollegeId?.message}
            {...register('CollegeId', {
              required: 'College ID is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
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
            type="number"
            onInput={(e) => handleInput(e)}
            fullWidth
            required
            name={'CollegePhoneNumber'}
            placeholder={'Enter College Phone Number'}
            defaultValue={getValues().CollegePhoneNumber}
            error={errors.CollegePhoneNumber?.message}
            {...register('CollegePhoneNumber', {
              required: 'Mobile Number is required',
              pattern: {
                value: /^\d{10}$/i,
                message: 'Provide a Valid Phone Number',
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
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Email ID
            <Typography component="span" color="error.main">
              *
            </Typography>
            <Typography component="span">
              <IconButton aria-label="toggle password visibility" edge="end">
                {verifyEmail &&
                !errors.CollegeEmailId?.message &&
                getValues().CollegeEmailId.length !== 0
                  ? // <CheckCircleIcon color="success" />
                    ''
                  : ''}
              </IconButton>
            </Typography>
          </Typography>
          <TextField
            fullWidth
            required
            name={'CollegeEmailId'}
            placeholder={'Enter College Email ID'}
            defaultValue={getValues().CollegeEmailId}
            error={errors.CollegeEmailId?.message}
            {...register('CollegeEmailId', {
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

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Select University Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <SearchableDropdown
            name="UniversityName"
            clearErrors={clearErrors}
            defaultValue={getValues().UniversityName}
            items={createEditFieldData(universitiesList.data)}
            // TO DO:UniversityName default value to be shown on UI for future ref
            // value={UniversityNames[0].name}
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

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Website
          </Typography>

          <TextField
            fullWidth
            name={'CollegeWebsite'}
            placeholder={'Enter College Website'}
            defaultValue={getValues().CollegeWebsite}
            {...register('CollegeWebsite', {
              required: 'CollegeWebsite  is required',
            })}
          />
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Address
          </Typography>

          <TextField
            multiline
            rows={1}
            fullWidth
            name={'CollegeAddress'}
            defaultValue={getValues().CollegeAddress}
            error={errors.CollegeAddress?.message}
            {...register('CollegeAddress', {
              required: 'CollegeAddress  is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College PIN Code
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            name={'CollegePincode'}
            placeholder={'Enter PIN Code'}
            defaultValue={getValues().CollegePincode}
            error={errors.CollegePincode?.message}
            {...register('CollegePincode', {
              required: 'College PIN Code is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            State Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>

          <SearchableDropdown
            name="StateName"
            clearErrors={clearErrors}
            items={createEditFieldData(statesList)}
            placeholder="Select State Name"
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

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Select your Registration Council
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Box>
            <SearchableDropdown
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
      </Grid>

      <Grid container alignItems="center" mt={3}>
        <Grid item xs={12} sm="auto" alignItems="flex-start" mr={{ lg: 2, md: 2, sm: 2 }}>
          <Button
            sx={{
              m: {
                xs: '5px 0px',
                md: '0px',
              },
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
            variant="contained"
            color="secondary"
            // onClick={handleSubmit(onsubmit)}
            onClick={handleSubmit(onhandleSubmitClick)}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm="auto" alignItems="flex-start">
          <Button
            variant="contained"
            color="grey"
            sx={{
              m: {
                xs: '5px 0px',
                // md: '0px',
              },
              width: {
                xs: '100%',
                // md: 'fit-content',
              },
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CollegeEditProfile;
