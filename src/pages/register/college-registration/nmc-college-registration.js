import { useEffect, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
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
// import successToast from '../../../ui/core/toaster';
import {
  AddressLineValidation1,
  AddressLineValidation2,
  EmailRegexValidation,
  MobileNumberRegexValidation,
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
    mode: 'onChange',
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
  const onReset = () => {
    collegesList = [];
    setValue('CollegeName', '');
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
    setValue('UniversityName', '');
    setValue('UniversityID', '');
    setValue('StateName', '');
    setValue('StateID', '');
    setValue('District', '');
    setValue('DistrictID', '');
    setValue('Town', '');
    setValue('TownID', '');
  };

  const onsubmit = () => {
    if (showCollegeName === true) {
      const collegeDetailValues = {
        id: getValues().CollegeNameID,
        name: getValues().Name,
        state_to: statesList?.find((obj) => obj?.id === Number(getValues()?.StateID)),
        course_to: null,
        college_code: getValues().CollegeCode,
        website: getValues().Website,
        address_line1: getValues().AddressLine1,
        address_line2: getValues().AddressLine2,
        district_to: districtsList?.find((x) => x.iso_code === getValues()?.DistrictID),
        villages_to: subDistrictList?.find((x) => x.iso_code === getValues()?.TownID),
        pin_code: getValues().Pincode,
        state_medical_council_to: councilNames?.find((x) => x.id === Number(getValues().CouncilID)),
        university_to: universitiesList?.data?.find(
          (x) => x.id === Number(getValues().UniversityID)
        ),
        email_id: getValues().Email,
        mobile_number: getValues().MobileNumber,
      };

      dispatch(registerCollegeDetail(collegeDetailValues)).then(() => {
        setSuccessModalPopup(true);
        onReset();
        reset();
        reset({ UniversityName: '' });
        reset({ UniversityID: '' });
      });
      // .catch((error) => {
      //   successToast(
      //     error?.data?.response?.data?.message,
      //     'RegistrationError',
      //     'error',
      //     'top-center'
      //   );
      // });
    } else {
      const collegeDetailValues = {
        id: getValues().CollegeNameID,
        name: getValues().CollegeName,
        state_to: statesList?.find((obj) => obj?.id === Number(getValues()?.StateID)),
        course_to: null,
        college_code: getValues().CollegeCode,
        website: getValues().Website,
        address_line1: getValues().AddressLine1,
        address_line2: getValues().AddressLine2,
        district_to: districtsList?.find((x) => x.iso_code === getValues()?.DistrictID),
        village_to: subDistrictList?.find((x) => x.iso_code === getValues()?.TownID),
        pin_code: getValues().Pincode,
        state_medical_council_to: councilNames?.find((x) => x.id === Number(getValues().CouncilID)),
        university_to: universitiesList?.data?.find(
          (x) => x.id === Number(getValues().UniversityID)
        ),
        email_id: getValues().Email,
        mobile_number: getValues().MobileNumber,
      };

      dispatch(updateCollegeDetail(collegeDetailValues)).then(() => {
        setSuccessModalPopup(true);
        reset();
        onReset();
      });
      // .catch((error) => {
      //   successToast(
      //     error?.data?.response?.data?.error,
      //     'RegistrationError',
      //     'error',
      //     'top-center'
      //   );
      // });
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };
  const handleInputPostalCode = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 6);
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
    } else {
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

          if (response?.data?.state_medical_council_to?.id) {
            setValue('CouncilID', response?.data?.state_medical_council_to?.id);
            setValue(
              'CouncilName',
              getSelecetedName(response?.data?.state_medical_council_to?.id, 'councilData')
            );
          }
          if (response?.data?.district_to?.id) {
            setValue('DistrictID', response?.data?.district_to?.id);
          }
          if (response?.data?.state_to?.id) {
            setValue('StateID', response?.data?.state_to?.id);
            // setValue('StateName', getSelecetedName(response?.data?.state_id, 'stateData'));
            setValue('StateName', getSelecetedName(response?.data?.state_to?.id, 'stateData'));
          }
          if (response?.data?.university_to?.id) {
            setValue('UniversityID', response?.data?.university_to?.id);
            // setValue(
            //   'UniversityName',
            //   getSelecetedName(response?.data?.university_id, 'universityData')
            // );
            setValue(
              'UniversityName',
              getSelecetedName(response?.data?.university_to?.id, 'universityData')
            );
          }
        });
    }
  };
  const onStateChange = (currentValue) => {
    if (currentValue !== null) {
      setValue('StateID', currentValue.id);
      dispatch(getDistrictList(currentValue.id));
    }
  };
  const onDistrictChange = (currentValue) => {
    if (currentValue !== null) {
      setValue('DistrictID', currentValue.id);
      dispatch(getSubDistrictsList(currentValue.id));
    }
  };

  return (
    <Grid p={2}>
      <Grid item xs={12} sm="auto" sx={{ mr: { xs: 0, sm: 'auto' } }}>
        <Typography variant="h2" color="textPrimary.main">
          College Registration
        </Typography>
      </Grid>
      <Grid container item spacing={2} id="collegeRegistrationId" mt={1}>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>

          <SearchableDropdown
            fullWidth
            name="CollegeName"
            items={createEditFieldData(collegesList)}
            placeholder="Select college name"
            clearErrors={clearErrors}
            error={errors.CollegeName?.message}
            {...register('CollegeName', {
              required: 'Please select college name',
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
                required: 'Please enter college name',
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
            placeholder={t('Enter college code')}
            inputProps={{ maxLength: 300 }}
            error={errors.CollegeCode?.message}
            {...register('CollegeCode')}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Mobile Number
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <TextField
            fullWidth
            name="MobileNumber"
            required
            placeholder={t('Enter mobile number')}
            onInput={(e) => handleInput(e)}
            error={errors.MobileNumber?.message}
            {...register('MobileNumber', MobileNumberRegexValidation)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="textSecondary.main">
            Council Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Box>
            <SearchableDropdown
              fullWidth
              name="CouncilName"
              items={createEditFieldData(councilNames)}
              placeholder="Select council name"
              clearErrors={clearErrors}
              error={errors.CouncilName?.message}
              {...register('CouncilName', {
                required: 'Please select council name',
              })}
              onChange={(currentValue) => {
                setValue('CouncilID', currentValue?.id);
              }}
            />
          </Box>
          <Grid />
          <Grid />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            University
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <SearchableDropdown
            fullWidth
            name="UniversityName"
            clearErrors={clearErrors}
            items={createEditFieldData(universitiesList.data)}
            placeholder="Select university"
            error={errors.UniversityName?.message}
            {...register('UniversityName', {
              required: 'Please select university',
            })}
            onChange={(currentValue) => {
              setValue('UniversityID', currentValue?.id);
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
            placeholder={'Enter college website'}
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
            placeholder="Enter address line 1"
            inputProps={{ maxLength: 300 }}
            error={errors.AddressLine1?.message}
            {...register('AddressLine1', AddressLineValidation1)}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Address line 2
          </Typography>
          <TextField
            fullWidth
            name="AddressLine2"
            placeholder={'Enter address line 2'}
            error={errors.AddressLine2?.message}
            {...register('AddressLine2', AddressLineValidation2)}
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
            placeholder={'Select state '}
            error={errors.StateName?.message}
            {...register('StateName', {
              required: 'Please select state',
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
              items={createEditFieldData(districtsList, 'iso_code')}
              placeholder="Select district"
              clearErrors={clearErrors}
              error={errors.District?.message}
              {...register('District', {
                required: 'Please select district',
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
            placeholder="Select area"
            error={errors.Town?.message}
            {...register('Town')}
            onChange={(currentValue) => {
              if (currentValue !== null) {
                setValue('TownID', currentValue?.id);
              }
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="body3" color="inputTextColor.main">
            Pincode
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            type="number"
            name="Pincode"
            required="true"
            onInput={(e) => handleInputPostalCode(e)}
            defaultValue={getValues().Pincode}
            placeholder={'Enter pincode'}
            error={errors.Pincode?.message}
            {...register('Pincode', {
              required: 'Please enter a valid pincode',
              pattern: {
                value: /^(\d{6})$/i,
                message: 'Should contains only 6 digits',
              },
            })}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
            inputProps={{ maxLength: 100 }}
            error={errors.Email?.message}
            {...register('Email', EmailRegexValidation)}
          />
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" color="grey" sx={{ mr: 2, mb: 6 }} onClick={onReset}>
          Reset
        </Button>
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
          text={'We have shared the password link with you via both email and mobile number'}
          fromCollegeRegistration={true}
        />
      )}
    </Grid>
  );
}

export default NMCCollegeRegistration;
