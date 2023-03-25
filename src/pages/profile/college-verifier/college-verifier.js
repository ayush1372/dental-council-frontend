import { useEffect, useState } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../../../../src/ui/core/form/textfield/textfield';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { registerCollegeDetails } from '../../../store/actions/college-actions';
import { getRegistrationCouncilList, getStatesList } from '../../../store/actions/common-actions';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

function CollegeVerifier() {
  const { councilNames } = useSelector((state) => state.common);

  const registrationSuccess = useSelector((state) => state.college.collegeRegisterDetails.data);

  const [successModalPopup, setSuccessModalPopup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatesList());
    dispatch(getRegistrationCouncilList());
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
      designation_id: getValues().DesignationID,
      name: getValues().Name,
      number: getValues().Number,
      email: getValues().Email,
      id: getValues().ID,
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

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="textPrimary.main">
            Create Verifier
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Designation
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>

          <SearchableDropdown
            fullWidth
            name="Designation"
            items={createEditFieldData(councilNames)}
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

        <Grid item xs={12} md={6} lg={4}>
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
            onInput={(e) => handleInput(e)}
            error={errors.Name?.message}
            {...register('Name', {
              required: 'Name is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Number
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <TextField
            fullWidth
            name="Number"
            required
            placeholder={t('Enter Number')}
            onInput={(e) => handleInput(e)}
            error={errors.Number?.message}
            {...register('Number', {
              required: 'Number is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
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
            placeholder={t('Enter Email ID')}
            error={errors.Email?.message}
            {...register('Email', {
              required: 'Email ID is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                message: 'Provide a Valid Email ID',
              },
            })}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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

export default CollegeVerifier;
