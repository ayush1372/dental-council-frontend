import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createEditFieldData, logoutUser } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { logoutAction } from '../../../store/actions/login-action';
import { getUpdatedsmcProfileData } from '../../../store/actions/smc-actions';
import { logout, resetCommonReducer } from '../../../store/reducers/common-reducers';
import { Button, TextField } from '../../../ui/core';
import { EmailRegexValidation } from '../../../utilities/common-validations';

const SmcEditProfile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.smc?.smcProfileData?.data);
  const { councilNames } = useSelector((state) => state.common);

  const [emailIDUpdated, setEmailIDUpdated] = useState(false);
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

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

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
          <Typography variant="body1" color="inputTextColor.main">
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
            error={errors.mobile_no?.message}
            onInput={(e) => handleInput(e)}
            {...register('mobile_no', {
              required: 'Please enter mobile number',
              pattern: {
                value: /^[0-9]{10}$/i,
                message: 'Please enter a valid 10 digit mobile number',
              },
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
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

      <Grid container item spacing={2} mt={3}>
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
            placeholder="Select council"
            clearErrors={clearErrors}
            error={errors.RegistrationCouncil?.message}
            disabled={true}
            {...register('RegistrationCouncil', {
              required: 'Please select council',
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
            props?.sentDetails('Profile');
          }}
        >
          Cancel
        </Button>
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
    </Grid>
  );
};

export default SmcEditProfile;
