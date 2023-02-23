import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { getUpdatedNBEProfileData } from '../../../store/actions/nbe-actions';
import { Button, TextField } from '../../../ui/core';

const NbeEditProfile = (props) => {
  const userData = useSelector((state) => state?.nbe?.nbeData?.data);
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: userData?.id,
      user_id: userData?.id,
      first_name: userData?.display_name,
      email_id: userData?.email_id,
      mobile_no: userData?.mobile_no,
    },
  });

  let nbeUpdatedData = {
    id: userData?.id,
    user_id: getValues().user_id,
    display_name: getValues().first_name,
    email_id: getValues().email_id,
    mobile_no: getValues().mobile_no,
  };
  const dispatch = useDispatch();
  const onsubmit = () => {
    dispatch(getUpdatedNBEProfileData(nbeUpdatedData)).then((response) => {
      if (response?.data?.email_id.length > 0) {
        setSuccessModalPopup(true);
      }
    });
    props.sentDetails('Profile');
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
                message: 'Provide a Valid User ID',
              },
            })}
            disabled
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
      <Grid container item spacing={2} mt={3}></Grid>

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
        >
          Cancel
        </Button>
      </Box>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={'Your NBE Profile has been successfully updated'}
        />
      )}
    </Box>
  );
};

export default NbeEditProfile;
