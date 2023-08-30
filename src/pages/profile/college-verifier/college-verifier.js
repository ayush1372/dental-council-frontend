import { useEffect, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../../../../src/ui/core/form/textfield/textfield';
import { colgTabs } from '../../../helpers/components/sidebar-drawer-list-item';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { getAdminDesignation, getAdminVerifier } from '../../../store/actions/college-actions';
import { changeUserActiveTab } from '../../../store/reducers/common-reducers';
import { Button } from '../../../ui/core';
import {
  EmailRegexValidation,
  MobileNumberRegexValidation,
} from '../../../utilities/common-validations';
// import successToast from '../../../ui/core/toaster';

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
      college_id: loginData?.data?.college_id,
    };

    dispatch(getAdminVerifier(collegeDetailValues)).then(() => {
      setSuccessModalPopup(true);
      reset();
    });
    // .catch((error) => {
    //   successToast(
    //     error?.data?.response?.data?.message,
    //     'RegistrationError',
    //     'error',
    //     'top-center'
    //   );
    // });
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
    dispatch(changeUserActiveTab(colgTabs[0].tabName));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    reset();
  };

  return (
    <>
      <Grid container spacing={2} pl={3} pr={3}>
        <Grid item xs={12} sm="auto" sx={{ mr: { xs: 0, sm: 'auto' } }}>
          <Typography variant="h2" color="textPrimary.main">
            Create Verifier
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={2} pl={3} pr={3}>
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
            placeholder={t('Enter name')}
            // onInput={(e) => handleInput(e)}
            error={errors.Name?.message}
            {...register('Name', {
              required: 'Please enter name',
              pattern: {
                value: /^(?!^\s)[a-zA-Z\s']*$(?<!\s$)/,
                message: 'Please enter a valid name',
              },
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
            placeholder="Select  designation"
            clearErrors={clearErrors}
            error={errors.Designation?.message}
            {...register('Designation', {
              required: 'Please select designation',
            })}
            onChange={(currentValue) => {
              setValue('DesignationID', currentValue?.id);
            }}
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Mobile Number
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <TextField
            fullWidth
            name="Number"
            required
            placeholder={t('Enter mobile number')}
            onInput={(e) => handleInput(e)}
            error={errors.Number?.message}
            {...register('Number', MobileNumberRegexValidation)}
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Email
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
            placeholder={t('Enter email')}
            error={errors.Email?.message}
            {...register('Email', EmailRegexValidation)}
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end" mt={3} pl={3} pr={3}>
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

      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={`Verifier profile has been created. Further details would be sent on verifier's registered Email ID`}
          fromCollegeRegistration={true}
        />
      )}
    </>
  );
}

export default CollegeVerifier;
