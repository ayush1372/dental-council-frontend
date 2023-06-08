import { useEffect, useState } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../../../../src/ui/core';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { registerCollegeDetail, updateCollegeDetail } from '../../../store/actions/college-actions';
import {
  getAllCollegesList,
  getCollegeData,
  getDistrictList,
  getRegistrationCouncilList,
  getStatesList,
  getSubDistrictsList,
  getUniversitiesList,
} from '../../../store/actions/common-actions';
import { Button } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';
import {
  EmailRegexValidation,
  MobileNumberRegexValidation,
  PostalCodeRegexValidation,
} from '../../../utilities/common-validations';

function NMCCollegeRegistration() {
  const {
    allcollegesList,
    statesList,
    councilNames,
    districtsList,
    subDistrictList,
    universitiesList,
  } = useSelector((state) => state.common);
  const { updateCollegeDetails, collegeRegisterDetails } = useSelector((state) => state.college);

  useEffect(() => {
    if (updateCollegeDetails?.data.length !== 0) {
      setSuccessModalPopup(true);
    }
  }, [updateCollegeDetails?.data]);
  useEffect(() => {
    if (collegeRegisterDetails?.data.length !== 0) {
      setSuccessModalPopup(true);
    }
  }, [collegeRegisterDetails?.data]);

  let collegesList = [];
  collegesList.push(...allcollegesList.data, { id: 'other', name: 'other' });

  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [showCollegeName, setShowCollegeName] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [collegeResponse, setCollegeResponse] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUniversitiesList());
    dispatch(getAllCollegesList());
    dispatch(getStatesList());
    dispatch(getRegistrationCouncilList());
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      CollegeName: '',
      Name: '',
      CollegeNameID: '',
      CollegeCode: '',
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

  const onsubmit = () => {
    if (showCollegeName === true) {
      const collegeDetailValues = {
        id: getValues().CollegeNameID,
        name: getValues().Name,
        state_id: getValues().StateID,
        course_id: null,
        college_code: getValues().CollegeCode,
        website: getValues().Website,
        address_line1: getValues().AddressLine1,
        address_line2: getValues().AddressLine2,
        district_id: getValues().DistrictID,
        village_id: getValues().TownID,
        pin_code: getValues().Pincode,
        state_medical_council_id: getValues().CouncilID,
        university_id: getValues().UniversityID,
        email_id: getValues().Email,
        mobile_number: getValues().MobileNumber,
      };

      dispatch(registerCollegeDetail(collegeDetailValues))
        .then(() => {
          setSuccessModalPopup(true);
          setValue('CouncilName', '');
          setValue('CouncilID', '');
          setValue('Name', '');
          setValue('CollegeCode', '');
          setValue('MobileNumber', '');
          setValue('Website', '');
          setValue('AddressLine1', '');
          setValue('AddressLine2', '');
          setValue('Pincode', '');
          setValue('Email', '');
        })
        .catch((error) => {
          successToast(
            error?.data?.response?.data?.error,
            'RegistrationError',
            'error',
            'top-center'
          );
        });
      reset();
    } else {
      const collegeDetailValues = {
        id: getValues().CollegeNameID,
        name: getValues().CollegeName,
        state_id: getValues().StateID,
        course_id: null,
        college_code: getValues().CollegeCode,
        website: getValues().Website,
        address_line1: getValues().AddressLine1,
        address_line2: getValues().AddressLine2,
        district_id: getValues().DistrictID,
        village_id: getValues().TownID,
        pin_code: getValues().Pincode,
        state_medical_council_id: getValues().CouncilID,
        university_id: getValues().UniversityID,
        email_id: getValues().Email,
        mobile_number: getValues().MobileNumber,
      };

      dispatch(updateCollegeDetail(collegeDetailValues))
        .then(() => {
          setSuccessModalPopup(true);
          reset();
          setValue('CouncilName', '');
          setValue('CouncilID', '');
          setValue('Name', '');
          setValue('CollegeCode', '');
          setValue('MobileNumber', '');
          setValue('Website', '');
          setValue('AddressLine1', '');
          setValue('AddressLine2', '');
          setValue('Pincode', '');
          setValue('Email', '');
        })
        .catch((error) => {
          successToast(
            error?.data?.response?.data?.error,
            'RegistrationError',
            'error',
            'top-center'
          );
        });
    }
    reset();
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };

  const getSelecetedName = (fieldId, data) => {
    if (data === 'councilData') {
      let selectedName = councilNames?.find((obj) => obj.id === fieldId);
      return selectedName?.name;
    }
    if (data === 'stateData') {
      let selectedName = statesList?.find((obj) => obj.id === fieldId);
      return selectedName?.name;
    }
    if (data === 'universityData') {
      let selectedName = universitiesList?.data?.find((obj) => obj.id === fieldId);
      return selectedName?.name;
    }
  };

  const onNameChange = (currentValue) => {
    if (currentValue?.id === 'other') {
      setShowCollegeName(true);
      // reset();
    } else {
      setShowCollegeName(false);
      setValue('CollegeNameID', currentValue?.id);
      if (currentValue?.id !== undefined)
        dispatch(getCollegeData(currentValue?.id)).then((response) => {
          setCollegeResponse(response);
          response?.data?.college_code && setValue('CollegeCode', response?.data?.college_code);

          response?.data?.mobile_number && setValue('MobileNumber', response?.data?.mobile_number);

          response?.data?.website && setValue('Website', response?.data?.website);

          if (response?.data?.address_line1) {
            setValue('AddressLine1', response?.data?.address_line1);
          }
          if (response?.data?.address_line2) {
            setValue('AddressLine2', response?.data?.address_line2);
          }
          if (response?.data?.pin_code) {
            setValue('Pincode', response?.data?.pin_code);
          }
          if (response?.data?.email_id) {
            setValue('Email', response?.data?.email_id);
          }

          if (response?.data?.state_medical_council_id) {
            setValue('CouncilID', response?.data?.state_medical_council_id);
            setValue(
              'CouncilName',
              getSelecetedName(response?.data?.state_medical_council_id, 'councilData')
            );
          }
          if (response?.data?.district_id) {
            setValue('DistrictID', response?.data?.district_id);
          }
          if (response?.data?.state_id) {
            setValue('StateID', response?.data?.state_id);
            setValue('StateName', getSelecetedName(response?.data?.state_id, 'stateData'));
          }
          if (response?.data?.university_id) {
            setValue('UniversityID', response?.data?.university_id);
            setValue(
              'UniversityName',
              getSelecetedName(response?.data?.university_id, 'universityData')
            );
          }
        });
    }
  };
  const onStateChange = (currentValue) => {
    setValue('StateID', currentValue.id);
    dispatch(getDistrictList(currentValue.id));
  };
  const onDistrictChange = (currentValue) => {
    setValue('DistrictID', currentValue.id);
    dispatch(getSubDistrictsList(currentValue.id));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container item spacing={2} id="collegeRegistrationId">
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
            items={createEditFieldData(collegesList)}
            placeholder="Select College"
            clearErrors={clearErrors}
            error={errors.CollegeName?.message}
            {...register('CollegeName', {
              required: 'College name is required',
            })}
            onChange={(currentValue) => {
              onNameChange(currentValue);
            }}
          />
        </Grid>
        {showCollegeName && (
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="body3" color="inputTextColor.main">
              College Name
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              fullWidth
              name="Name"
              required
              placeholder={t('Enter college name')}
              inputProps={{ maxLength: 300 }}
              error={errors.Name?.message}
              {...register('Name', {
                required: 'College name is required',
              })}
            />
          </Grid>
        )}

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Code
          </Typography>

          <TextField
            fullWidth
            name="CollegeCode"
            placeholder={t('Enter College Code')}
            inputProps={{ maxLength: 300 }}
            error={errors.CollegeCode?.message}
            {...register('CollegeCode')}
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
            placeholder={t('Enter Mobile Number')}
            onInput={(e) => handleInput(e)}
            error={errors.MobileNumber?.message}
            {...register('MobileNumber', MobileNumberRegexValidation)}
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
              placeholder="Select Council"
              clearErrors={clearErrors}
              error={errors.CouncilName?.message}
              {...register('CouncilName', {
                required: ' Council name is required',
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
            placeholder="Select University"
            error={errors.UniversityName?.message}
            {...register('UniversityName', {
              required: 'University name is required',
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
            inputProps={{ maxLength: 300 }}
            {...register('Website', {})}
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
            name="AddressLine1"
            placeholder="Enter Address line1"
            inputProps={{ maxLength: 300 }}
            error={errors.AddressLine1?.message}
            {...register('AddressLine1', {
              required: 'Address line1 is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Address line 2
          </Typography>
          <TextField
            fullWidth
            name="AddressLine2"
            placeholder={'Enter Address Line 2'}
            error={errors.AddressLine2?.message}
            {...register('AddressLine2', {})}
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
            placeholder={'Select State '}
            error={errors.StateName?.message}
            {...register('StateName', {
              required: 'State name is required',
            })}
            onChange={(currentValue) => {
              onStateChange(currentValue);
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
              items={createEditFieldData(districtsList)}
              placeholder="Select  District"
              clearErrors={clearErrors}
              error={errors.District?.message}
              {...register('District', {
                required: 'District name is required',
              })}
              onChange={(currentValue) => {
                onDistrictChange(currentValue);
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
          <SearchableDropdown
            fullWidth
            name="Town"
            clearErrors={clearErrors}
            items={createEditFieldData(subDistrictList)}
            placeholder="Select Town "
            error={errors.Town?.message}
            {...register('Town', {
              // required: 'Town name is required',
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
            type="number"
            name="Pincode"
            required
            placeholder={'Enter  Pin Code'}
            error={errors.Pincode?.message}
            {...register('Pincode', PostalCodeRegexValidation)}
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
            {...register('Email', EmailRegexValidation)}
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
      </Box>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={'We have Shared the Password link on given Email Id and Mobile No.'}
          fromCollegeRegistration={true}
        />
      )}
    </Container>
  );
}

export default NMCCollegeRegistration;
