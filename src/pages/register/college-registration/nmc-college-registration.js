import { useEffect, useState } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '../../../../src/ui/core/form/textfield/textfield';
import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import {
  registerCollegeDetail,
  // registerCollegeDetails,
  updateCollegeDetail,
} from '../../../store/actions/college-actions';
import {
  // getCollegesList,
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

function NMCCollegeRegistration() {
  const {
    // collegesList,
    allcollegesList,
    statesList,
    councilNames,
    districtsList,
    subDistrictList,
    universitiesList,
    // getCollegeDetail,
  } = useSelector((state) => state.common);
  // eslint-disable-next-line no-console
  console.log('universitiesList===', universitiesList);
  // eslint-disable-next-line no-console
  console.log('statesList===', statesList);

  let collegesList = [];
  collegesList.push(...allcollegesList.data, { id: 'other', name: 'other' });

  // const registrationSuccess = useSelector((state) => state.college.registerCollegeDetail.data);
  // const updateregistration = useSelector((state) => state.college.updateCollegeDetails.data);

  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [showCollegeName, setShowCollegeName] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUniversitiesList());
    dispatch(getAllCollegesList());
    // dispatch(getCollegesList());
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

      dispatch(registerCollegeDetail(collegeDetailValues))
        .then(() => {
          setSuccessModalPopup(true);
          document.getElementById('collegeRegistrationId').reset();
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
      document.getElementById('collegeRegistrationId').reset();
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
          document.getElementById('collegeRegistrationId').reset();

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
  };

  // const handleInput = (e) => {
  // e.preventDefault();
  // if (e.target.value.length > 0) {
  //   e.target.value = isNaN(e.target.value)
  //     ? e.target.value.toString().slice(0, -1)
  //     : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
  // }
  // };

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
      // eslint-disable-next-line no-console
      console.log('universitiesList?.data?', universitiesList?.data);
      let selectedName = universitiesList?.data?.find((obj) => obj.id === fieldId);
      return selectedName?.name;
    }
  };

  const onNameChange = (currentValue) => {
    if (currentValue.id === 'other') {
      setShowCollegeName(true);
      // reset();
    } else {
      setShowCollegeName(false);
      setValue('CollegeNameID', currentValue.id);

      dispatch(getCollegeData(currentValue.id)).then((response) => {
        if (response?.data?.college_code) {
          setValue('CollegeCode', response?.data?.college_code);
        }
        if (response?.data?.mobile_number) {
          setValue('MobileNumber', response?.data?.mobile_number);
        }
        if (response?.data?.website) {
          setValue('Website', response?.data?.website);
        }
        if (response?.data?.address_line1) {
          setValue(' AddressLine1', response?.data?.address_line1);
        }
        if (response?.data?.address_line2) {
          setValue(' AddressLine2', response?.data?.address_line2);
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
          // dispatch(getDistrictList(response?.data?.state_id));
          // getDistrict(response?.data?.state_id);
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
  // const getDistrict = (id) => {
  //   dispatch(getDistrictList(id));
  // };

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
        {/* <Grid item xs={12}>
          <Typography variant="h2" color="textPrimary.main">
            College Registration
          </Typography>
        </Grid> */}

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
            // items={createEditFieldData(allcollegesList.data)}
            items={createEditFieldData(collegesList)}
            placeholder="Select College"
            clearErrors={clearErrors}
            error={errors.CollegeName?.message}
            {...register('CollegeName', {
              required: 'College name is required',
            })}
            onChange={(currentValue) => {
              // setClgName(currentValue?.name);
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
              // onInput={(e) => handleInput(e)}
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
            required
            placeholder={t('Enter College Code')}
            // onInput={(e) => handleInput(e)}
            error={errors.CollegeCode?.message}
            {...register('CollegeCode', {
              required: 'College code is required',
            })}
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
            // onInput={(e) => handleInput(e)}
            error={errors.MobileNumber?.message}
            {...register('MobileNumber', {
              required: 'Mobile number is required',
              // pattern: {
              //   value: /^\d{10}$/i,
              //   message: 'Provide a valid mobile number',
              // },
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
            placeholder="Enter Address line1"
            {...register('AddressLine1', {
              required: 'Address line1 is required',
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
              required: 'Address line 2 is required',
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
          <Typography component="span" color="error.main">
            *
          </Typography>
          <SearchableDropdown
            fullWidth
            name="Town"
            clearErrors={clearErrors}
            items={createEditFieldData(subDistrictList)}
            placeholder="Select Town "
            error={errors.Town?.message}
            {...register('Town', {
              required: 'Town name is required',
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
            {...register('Pincode', {
              required: 'Pin code is required',
              // pattern: {
              //   value: /^[0-9]{6}$/i,
              //   message: 'Please enter valid pincode',
              // },
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
              required: 'Email id is required',
              // pattern: {
              //   value:
              //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
              //   message: 'Provide valid email id',
              // },
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
        {/* <Button variant="contained" color="grey" sx={{ mb: 6 }} onClick={onCancelClick}>
          Cancel
        </Button> */}
      </Box>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={'We have Shared the Password on given Email Id and Mobile No.'}
        />
      )}
    </Container>
  );
}

export default NMCCollegeRegistration;
