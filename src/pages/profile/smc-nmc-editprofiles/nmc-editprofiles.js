import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createEditFieldData, logoutUser } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { logoutAction } from '../../../store/actions/login-action';
import { getUpdatedNmcProfileData } from '../../../store/actions/nmc-actions';
import { logout, resetCommonReducer } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import {
  EmailRegexValidation,
  MobileNumberRegexValidation,
} from '../../../utilities/common-validations';

const NmcEditProfile = (props) => {
  const navigate = useNavigate();

  const { councilNames } = useSelector((state) => state.common);
  const userData = useSelector((state) => state?.nmc?.nmcProfileData?.data);
  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);

  const [emailIDUpdated, setEmailIDUpdated] = useState(false);
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: userData?.id,
      user_id: 10,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_name: userData?.middle_name,
      state_medical_council: {
        id: userData?.state_medical_council?.id,
        code: 'TEST',
        name: userData?.state_medical_council?.name,
      },
      RegistrationCouncil: userData?.state_medical_council?.name,
      RegistrationCouncilId: userData?.state_medical_council?.id,
      ndhm_enrollment: userData?.ndhm_enrollment,
      enrolled_number: userData?.enrolled_number,
      display_name: userData?.display_name,
      email_id: userData?.email_id,
      mobile_no: userData?.mobile_no,
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

  const dispatch = useDispatch();
  const onsubmit = () => {
    let nmcUpdatedData = {
      id: userData?.id,
      user_id: getValues().user_id,
      first_name: getValues().first_name,
      last_name: getValues().last_name,
      middle_name: getValues().middle_name,
      state_medical_council: {
        id: getValues().state_medical_council?.id,
        code: getValues().state_medical_council?.code,
        name: getValues().state_medical_council?.name,
      },
      ndhm_enrollment: getValues().ndhm_enrollment,
      enrolled_number: getValues().enrolled_number,
      display_name: getValues().first_name,
      email_id: getValues().email_id,
      mobile_no: getValues().mobile_no,
    };
    dispatch(getUpdatedNmcProfileData(nmcUpdatedData)).then((response) => {
      if (response?.data?.email_id.length > 0) {
        setSuccessModalPopup(true);
        if (
          getValues().email_id !== userData?.email_id ||
          getValues().mobile_no !== userData?.mobile_no
        ) {
          setEmailIDUpdated(true);
        } else {
          props?.sentDetails('Profile');
        }
      }
    });
  };

  return (
    <Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h2" color="textPrimary.main">
              Edit Profile
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'first_name'}
            placeholder={'Enter name'}
            defaultValue={getValues().first_name}
            error={errors.first_name?.message}
            {...register('first_name', {
              required: 'Please enter name',
              pattern: {
                value: /^(?!^\s)[a-zA-Z\s']*$(?<!\s$)/,
                message: 'Please enter a valid name',
              },
            })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Mobile Number
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'mobile_no'}
            placeholder={'Enter mobile number '}
            defaultValue={getValues().mobile_no}
            onInput={(e) => handleInput(e)}
            error={errors.mobile_no?.message}
            {...register('mobile_no', MobileNumberRegexValidation)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Email
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            type="text"
            fullWidth
            required
            name={'email_id'}
            placeholder={'Enter email'}
            defaultValue={getValues().email_id}
            error={errors.email_id?.message}
            {...register('email_id', EmailRegexValidation)}
          />
        </Grid>
      </Grid>
      {loggedInUserType !== 'NMC' && (
        <Grid container item spacing={2} mt={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="body3" color="grey.label">
              User ID
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>
            <TextField
              fullWidth
              required
              name={'user_id'}
              placeholder={'Enter user ID'}
              defaultValue={getValues().user_id}
              error={errors.user_id?.message}
              {...register('user_id', {
                required: 'Please enter user ID',

                pattern: {
                  value: /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                  message: 'Please enter a valid user ID',
                },
              })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body3" color="grey.label">
              Council
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>
            <SearchableDropdown
              name="RegistrationCouncil"
              items={createEditFieldData(councilNames)}
              defaultValue={userData?.state_medical_council}
              placeholder="Select council"
              clearErrors={clearErrors}
              error={errors.RegistrationCouncil?.message}
              {...register('RegistrationCouncil', {
                required: 'Please select council',
              })}
              onChange={(currentValue) => {
                setValue('RegistrationCouncilId', currentValue?.name);
              }}
            />
          </Grid>
        </Grid>
      )}

      <Box display="flex" mt={10} md="auto" justifyContent={'flex-end'}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mr: 2,
            width: {
              xs: '100%',
              md: 'fit-content',
            },
          }}
          onClick={handleSubmit(onsubmit)}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="grey"
          sx={{
            width: {
              xs: '100%',
              md: 'fit-content',
            },
          }}
          onClick={() => {
            props?.sentDetails('Profile');
          }}
        >
          Cancel
        </Button>
      </Box>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => {
            setSuccessModalPopup(false);
            if (emailIDUpdated)
              dispatch(logoutAction()).then((response) => {
                if (response) {
                  logoutUser();
                  dispatch(logout());
                  dispatch(resetCommonReducer());
                  navigate('/');
                }
              });
          }}
          text={
            emailIDUpdated
              ? 'Your profile has been updated. Please login again with updated details.'
              : 'Your profile has been updated.'
          }
        />
      )}
    </Box>
  );
};

export default NmcEditProfile;
