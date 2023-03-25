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

function NMCCollegeRegistration() {
  const { statesList, councilNames, universitiesList } = useSelector((state) => state.common);
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
      CollegeName: '',
      CollegeNameID: '',
      CollegeCode: '',
      CollegeID: '',
      MobileNumber: '',
      CouncilName: '',
      CouncilID: '',
      UniversityName: '',
      UniversityID: '',
      Website: '',
      AddressLine1: '',
      AddressLine2: '',
      StateName: '',
      StateID: '',
      District: '',
      DistrictID: '',
      Town: '',
      TownID: '',
      Pincode: '',
      Email: '',
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
      name: getValues().CollegeNameID,
      college_code: getValues().CollegeCode,
      phone_number: getValues().MobileNumber,
      council_id: getValues().CouncilID,
      university_id: getValues().UniversityID,
      website: getValues().Website,
      address1: getValues().AddressLine1,
      address2: getValues().AddressLine2,
      state_id: getValues().StateID,
      district: getValues().DistrictID,
      town: getValues().TownID,
      pin_code: getValues().Pincode,
      email_id: getValues().Email,
      // request_id: '3',
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

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>

          <SearchableDropdown
            fullWidth
            name="CollegeName"
            items={createEditFieldData(councilNames)}
            placeholder="Select  CollegeName"
            clearErrors={clearErrors}
            error={errors.CollegeName?.message}
            {...register('CollegeName', {
              required: 'CollegeName is required',
            })}
            onChange={(currentValue) => {
              setValue('CollegeNameID', currentValue.id);
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Code
          </Typography>

          <SearchableDropdown
            fullWidth
            name="CollegeCode"
            items={createEditFieldData(councilNames)}
            placeholder="Select  CollegeCode"
            clearErrors={clearErrors}
            error={errors.CollegeCode?.message}
            {...register('CollegeCode', {
              required: 'CollegeCode is required',
            })}
            onChange={(currentValue) => {
              setValue('CollegeID', currentValue.id);
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Mobile
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <TextField
            fullWidth
            name="MobileNumber"
            required
            placeholder={t('MobileNumber')}
            onInput={(e) => handleInput(e)}
            error={errors.MobileNumber?.message}
            {...register('MobileNumber', {
              required: 'MobileNumber is required',
              pattern: {
                value: /^\d{10}$/i,
                message: 'Provide a Valid MobileNumber',
              },
            })}
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
              name="CouncilName"
              items={createEditFieldData(councilNames)}
              placeholder="Select   Council"
              clearErrors={clearErrors}
              error={errors.CouncilName?.message}
              {...register('CouncilName', {
                required: ' CouncilName is required',
              })}
              onChange={(currentValue) => {
                setValue('CouncilID', currentValue.id);
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
              setValue('UniversityID', currentValue.id);
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Website
          </Typography>

          <TextField
            fullWidth
            name={'Website'}
            placeholder={'Enter College Website'}
            {...register('Website', {
              // required: 'Website  is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Address line 1
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            multiline
            rows={1}
            fullWidth
            name={'AddressLine1'}
            placeholder="Enter  Address line1"
            {...register('AddressLine1', {
              required: 'AddressLine1  is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Address line 2
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'AddressLine2'}
            placeholder={'Enter Address Line 2'}
            {...register('AddressLine2', {
              required: 'Address Line 2  is required',
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
              setValue('StateID', currentValue.id);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="textSecondary.main">
            District
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Box>
            <SearchableDropdown
              fullWidth
              name="District"
              items={createEditFieldData(councilNames)}
              placeholder="Select  District"
              clearErrors={clearErrors}
              error={errors.District?.message}
              {...register('District', {
                required: 'District  is required',
              })}
              onChange={(currentValue) => {
                setValue('DistrictID', currentValue.id);
              }}
            />
          </Box>
          <Grid />
          <Grid />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            City/Town/Village
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <SearchableDropdown
            fullWidth
            name="Town"
            clearErrors={clearErrors}
            items={createEditFieldData(universitiesList.data)}
            placeholder="Select Town Name"
            error={errors.Town?.message}
            {...register('Town', {
              required: 'Town Name is required',
            })}
            onChange={(currentValue) => {
              setValue('TownID', currentValue.id);
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Postal Code
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'Pincode'}
            placeholder={'Enter  Pin Code'}
            {...register('Pincode', {
              required: 'PinCode  is required',
              pattern: {
                value: /^[0-9]{6}$/i,
                message: 'Please Enter Valid Pincode',
              },
            })}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Email ID
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

export default NMCCollegeRegistration;
