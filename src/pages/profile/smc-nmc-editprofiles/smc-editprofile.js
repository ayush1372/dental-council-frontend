import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { getUpdatedsmcProfileData } from '../../../store/actions/smc-actions';
import { Button, TextField } from '../../../ui/core';

const SmcEditProfile = (props) => {
  const userData = useSelector((state) => state?.smc?.smcProfileData?.data);
  const { councilNames } = useSelector((state) => state.common);

  const [successModalPopup, setSuccessModalPopup] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: userData?.id,
      user_id: 10,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_name: userData?.middle_name,
      RegistrationCouncil: {
        id: userData?.state_medical_council?.id,
        code: 'MAHA',
        name: userData?.state_medical_council?.name,
      },
      // RegistrationCouncil: { name: userData?.state_medical_council?.name },
      ndhm_enrollment: userData?.ndhm_enrollment,
      enrolled_number: userData?.enrolled_number,
      display_name: userData?.display_name,
      email_id: userData?.email_id,
      mobile_no: userData?.mobile_no,
    },
  });
  const dispatch = useDispatch();

  const onsubmit = () => {
    let smcUpdatedData = {
      id: userData?.id,
      user_id: getValues().user_id,
      first_name: getValues().first_name,
      last_name: getValues().last_name,
      middle_name: getValues().middle_name,
      state_medical_council: {
        id: getValues().RegistrationCouncil?.id,
        code: getValues().RegistrationCouncil?.code,
        name: getValues().RegistrationCouncil?.name,
      },
      ndhm_enrollment: getValues().ndhm_enrollment,
      enrolled_number: getValues().enrolled_number,
      display_name: getValues().first_name,
      email_id: getValues().email_id,
      mobile_no: getValues().mobile_no,
    };
    dispatch(getUpdatedsmcProfileData(smcUpdatedData)).then((response) => {
      if (response?.data?.email_id.length > 0) {
        setSuccessModalPopup(true);
      }
    });
    props.sentDetails('Profile');
  };

  return (
    <Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="textPrimary.main">
            Edit Profile
          </Typography>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
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
          <Typography variant="body1" color="inputTextColor.main">
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
          <Typography variant="body1" color="inputTextColor.main">
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
          <Typography variant="body1" color="inputTextColor.main">
            User ID
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'user_id'}
            placeholder={'Enter User ID'}
            defaultValue={getValues().user_id}
            error={errors.user_id?.message}
            {...register('user_id', {
              required: 'User ID is required',
              pattern: {
                value: /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                message: 'Provide a Valid User ID',
              },
            })}
          />{' '}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Council
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <SearchableDropdown
            name="RegistrationCouncil"
            items={createEditFieldData(councilNames)}
            value={getValues().RegistrationCouncil}
            defaultValue={getValues().RegistrationCouncil}
            placeholder="Select Your Registration Council"
            clearErrors={clearErrors}
            error={errors.RegistrationCouncil?.message}
            disabled={true}
            {...register('RegistrationCouncil', {
              required: 'Registration Council is required',
            })}
            onChange={(currentValue) => {
              setValue('RegistrationCouncil', {
                id: currentValue.id,
                name: currentValue.name,
                code: 'MAHA',
              });
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
            props.sentDetails('Profile');
          }}
        >
          Cancel
        </Button>
        {successModalPopup && (
          <SuccessModalPopup
            open={successModalPopup}
            setOpen={() => setSuccessModalPopup(false)}
            text={'Your Profile has been successfully updated'}
          />
        )}
      </Box>
    </Grid>
  );
};

export default SmcEditProfile;
