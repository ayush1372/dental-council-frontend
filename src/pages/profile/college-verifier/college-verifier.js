import { useEffect, useState } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../../../../src/ui/core/form/textfield/textfield';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { getAdminDesignation, getAdminVerifier } from '../../../store/actions/college-actions';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

function CollegeVerifier() {
  const { collegeAdminDesignation } = useSelector((state) => state.college);
  const { loginData } = useSelector((state) => state.loginReducer);

  const [successModalPopup, setSuccessModalPopup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminDesignation());
  }, []);

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
      Designation: '',
      DesignationID: '',
      Name: '',
      Number: '',
      Email: '',
      ID: '',
    },
  });
  const onsubmit = () => {
    const collegeDetailValues = {
      designation: getValues()?.DesignationID,
      name: getValues()?.Name,
      mobile_number: getValues()?.Number,
      email_id: getValues()?.Email,
      id: getValues()?.ID,
      college_id: loginData?.data?.parent_profile_id,
    };

    dispatch(getAdminVerifier(collegeDetailValues))
      .then(() => {
        setSuccessModalPopup(true);
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

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  const onCancel = () => {
    reset();
  };

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Grid container item spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="body3" color="inputTextColor.main">
              Name
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              fullWidth
              name="Name"
              required
              placeholder={t('Enter Name')}
              // onInput={(e) => handleInput(e)}
              error={errors.Name?.message}
              {...register('Name', {
                required: 'Name is required',
              })}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="body3" color="inputTextColor.main">
              Designation
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>

            <SearchableDropdown
              fullWidth
              name="Designation"
              items={createEditFieldData(collegeAdminDesignation.data)}
              placeholder="Select  Designation"
              clearErrors={clearErrors}
              error={errors.Designation?.message}
              {...register('Designation', {
                required: 'Designation is required',
              })}
              onChange={(currentValue) => {
                setValue('DesignationID', currentValue.id);
              }}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="body3" color="inputTextColor.main">
              Phone Number
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              fullWidth
              name="Number"
              required
              placeholder={t('Enter Phone Number')}
              onInput={(e) => handleInput(e)}
              error={errors.Number?.message}
              {...register('Number', {
                required: 'Phone Number is required',
              })}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="body3" color="inputTextColor.main">
              Email Address
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              sx={{
                pr: 0,
              }}
              fullWidth
              type="text"
              name="Email"
              required
              placeholder={t('Enter Email Address')}
              error={errors.Email?.message}
              {...register('Email', {
                required: 'Email Address is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                  message: 'Provide a Valid Email Address',
                },
              })}
            />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            ID
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <TextField
            fullWidth
            name="ID"
            required
            placeholder={t('Enter ID')}
            onInput={(e) => handleInput(e)}
            error={errors.ID?.message}
            {...register('ID', {
              required: 'ID is required',
            })}
          />
        </Grid> */}
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
          <Button variant="contained" color="grey" sx={{ mb: 6 }} onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Container>

      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={
            'Verifier profile has been successfully created. Further details would be sent on verifier registered Email ID'
          }
          fromCollegeRegistration={true}
        />
      )}
    </>
  );
}

export default CollegeVerifier;