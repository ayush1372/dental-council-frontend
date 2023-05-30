import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { getUpdatedNmcProfileData } from '../../../store/actions/nmc-actions';
import { Button, TextField } from '../../../ui/core';
const NmcEditProfile = (props) => {
  const userData = useSelector((state) => state?.nmc?.nmcProfileData?.data);
  const { councilNames } = useSelector((state) => state.common);
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
  const dispatch = useDispatch();
  const onsubmit = () => {
    dispatch(getUpdatedNmcProfileData(nmcUpdatedData)).then((response) => {
      if (response?.data?.email_id.length > 0) {
        setSuccessModalPopup(true);
      }
    });
    props?.sentDetails('Profile');
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
            placeholder={'Enter Name'}
            defaultValue={getValues().first_name}
            error={errors.first_name?.message}
            {...register('first_name', {
              required: ' Name is required',
              pattern: {
                value: /^[A-Z\s@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                message: 'Enter Valid Name',
              },
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Phone Number
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'mobile_no'}
            placeholder={'Enter Phone Number '}
            defaultValue={getValues().mobile_no}
            error={errors.mobile_no?.message}
            {...register('mobile_no', {
              required: 'Phone Number is required',
              pattern: {
                value: /^[0-9]{10}$/i,
                message: 'Enter  Valid Phone Number',
              },
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Email ID
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            type="text"
            fullWidth
            required
            name={'email_id'}
            placeholder={'Enter Email ID'}
            defaultValue={getValues().email_id}
            error={errors.email_id?.message}
            {...register('email_id', {
              required: 'Email ID is required',

              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                message: 'Provide a Valid Email Id',
              },
            })}
          />
        </Grid>
      </Grid>
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
              required: 'User ID is required',

              pattern: {
                value: /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                message: 'Provide a Valid User ID',
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
            placeholder="Select Your Registration Council"
            clearErrors={clearErrors}
            error={errors.RegistrationCouncil?.message}
            {...register('RegistrationCouncil', {
              required: 'Registration Council is required',
            })}
            onChange={(currentValue) => {
              setValue('RegistrationCouncilId', currentValue?.name);
            }}
          />
        </Grid>
      </Grid>

      <Box display="flex" mt={5} md="auto">
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
          setOpen={() => setSuccessModalPopup(false)}
          text={'Your NMC Profile has been successfully updated'}
        />
      )}
    </Box>
  );
};

export default NmcEditProfile;
