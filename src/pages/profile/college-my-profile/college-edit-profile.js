import { useEffect, useState } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import { updateCollegeAdminProfileData } from '../../../store/actions/college-actions';
import {
  getDistrictList,
  getStatesList,
  getSubDistrictsList,
  getUniversitiesList,
} from '../../../store/actions/common-actions';
import { Button, TextField } from '../../../ui/core';
import successToast from '../../../ui/core/toaster';

const CollegeEditProfile = (props) => {
  const [districtList, setDistrictList] = useState([]);

  const { statesList, councilNames, universitiesList, subDistrictList, districtsList } =
    useSelector((state) => state.common);
  const registrationSuccess = useSelector((state) => state.college.collegeRegisterDetails.data);
  const { getCollegeDetail } = useSelector((state) => state.common);
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const userData = getCollegeDetail?.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatesList());
  }, []);

  useEffect(() => {
    dispatch(getUniversitiesList());
    if (getCollegeDetail?.data?.state_to?.id !== undefined)
      dispatch(getDistrictList(getCollegeDetail?.data?.state_to?.id)).then((res) => {
        setDistrictList(res?.data);
      });
    if (userData?.district_to?.id !== undefined)
      dispatch(getSubDistrictsList(userData?.district_to?.id));
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      CollegeEmailId: userData?.email_id,
      CollegeName: userData?.name,
      CollegeId: userData?.college_code,
      CollegePhoneNumber: userData?.mobile_number,
      CollegeAddress: userData?.address,
      CollegePincode: userData?.pin_code,
      UniversityName: '',
      UniversityId: userData?.university_to,
      CouncilName: userData?.state_medical_council_to?.name,
      CouncilID: userData?.state_medical_council_to?.id,
      StateName: '',
      StateId: userData?.state_to,
      CollegeWebsite: userData?.website,
      District: userData?.district_to?.id,
      DistrictID: userData?.district_to?.id,
      Area: userData?.villages_to?.id,
    },
  });
  const onSubmitClickHandler = () => {
    const updatedCollegeDetails = {
      id: userData?.id,
      name: getValues()?.CollegeName || '',
      state_id: getValues()?.StateId,
      college_code: getValues()?.CollegeId,
      website: getValues().Website,
      address_line1: getValues()?.AddressLine1 || '',
      address_line2: getValues()?.AddressLine2 || '',
      district_to: districtsList?.find((x) => x.id === getValues()?.DistrictID),
      villages_to:
        subDistrictList?.find((x) => x.name === getValues()?.Area) || userData?.villages_to,
      pin_code: getValues()?.Pincode,
      state_medical_council_to: councilNames?.find((x) => x.id === getValues()?.CouncilID),
      mobile_number: getValues()?.MobileNumber,
      email_id: getValues()?.CollegeEmailId,
      university_id: getValues()?.UniversityId,
    };

    dispatch(updateCollegeAdminProfileData(updatedCollegeDetails))
      .then(() => {
        if (registrationSuccess) {
          setSuccessModalPopup(true);
        }
      })
      .catch((error) => {
        successToast(error?.data?.response?.data?.message, 'OtpError', 'error', 'top-center');
      });
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (e?.target?.value?.length > 0) {
      e.target.value = isNaN(e?.target?.value)
        ? e?.target?.value?.toString()?.slice(0, -1)
        : Math?.max(0, parseInt(e.target.value))?.toString()?.slice(0, 10);
    }
  };

  const onStateChange = (currentValue) => {
    setValue('StateID', currentValue?.id);
    dispatch(getDistrictList(currentValue?.id));
  };

  const onDistrictChange = (currentValue) => {
    setValue('DistrictID', currentValue?.id);
    if (currentValue?.id !== undefined) {
      dispatch(getSubDistrictsList(currentValue?.id));
    }
  };

  const getStateData = (stateId) => {
    return statesList?.find((obj) => obj?.id === stateId?.id);
  };

  const getDistrictNameData = (district_id) => {
    return districtList?.find((obj) => obj?.id === district_id);
  };

  const getUniversityData = (university_id) => {
    return universitiesList?.data?.find((obj) => obj?.id === university_id);
  };

  return (
    <Grid>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={'College Profile Updated  Successfully'}
        />
      )}
      <Grid container spacing={2} mt={1}>
        <Grid container item xs={12}>
          <Typography variant="h2" color="textPrimary.main">
            Edit Profile
          </Typography>
        </Grid>
      </Grid>
      <Container sx={{ mt: 5 }}>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Name
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>
            <TextField
              fullWidth
              disabled
              required
              name={'CollegeName'}
              placeholder={'Enter College Name'}
              defaultValue={getCollegeDetail?.data?.name}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              College Code
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>
            <TextField
              fullWidth
              disabled
              name="CollegeId"
              required
              placeholder={'Enter College Code'}
              defaultValue={getCollegeDetail?.data?.college_code}
              error={errors.CollegePhoneNumber?.message}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Mobile
              <Typography component="span" color="error.main">
                *
              </Typography>
              <Typography component="span"></Typography>
            </Typography>
            <TextField
              fullWidth
              name="MobileNumber"
              required
              placeholder={'Enter Mobile Number'}
              defaultValue={getCollegeDetail?.data?.mobile_number}
              onInput={(e) => handleInput(e)}
              error={errors.MobileNumber?.message}
              {...register('MobileNumber', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^\d{10}$/i,
                  message: 'Provide a valid mobile number',
                },
              })}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Select Council
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>
            <SearchableDropdown
              name="CouncilName"
              items={createEditFieldData(councilNames)}
              placeholder="Select Registered Council"
              clearErrors={clearErrors}
              error={errors.CouncilName?.message}
              {...register('CouncilName', {
                required: 'Council is required',
              })}
              value={{
                id: getValues()?.CouncilID !== undefined ? getValues()?.CouncilID : '',
                name: getValues()?.CouncilName !== undefined ? getValues()?.CouncilName : '',
              }}
              onChange={(currentValue) => {
                setValue('CouncilID', currentValue?.id);
                setValue('CouncilName', currentValue?.name);
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Select University Name
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>
            <SearchableDropdown
              fullWidth
              disabled
              name="UniversityName"
              clearErrors={clearErrors}
              items={createEditFieldData(universitiesList?.data)}
              placeholder="Select University"
              defaultValue={userData?.university_to}
              value={getUniversityData(getCollegeDetail?.data?.university_id)}
              onChange={(currentValue) => {
                setValue('UniversityID', currentValue?.id);
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Website
            </Typography>

            <TextField
              fullWidth
              name={'Website'}
              placeholder={'Enter College Website'}
              defaultValue={getCollegeDetail?.data?.website}
              {...register('Website', {})}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
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
              defaultValue={getCollegeDetail?.data?.address_line1}
              error={errors.AddressLine1?.message}
              {...register('AddressLine1', {
                required: 'Address line1 is required',
              })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Address line 2
            </Typography>

            <TextField
              fullWidth
              name="AddressLine2"
              placeholder={'Enter Address Line 2'}
              defaultValue={getCollegeDetail?.data?.address_line2}
              error={errors.AddressLine2?.message}
              {...register('AddressLine2', {})}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              State Name
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>

            <SearchableDropdown
              fullWidth
              disabled
              name="StateName"
              items={createEditFieldData(statesList)}
              clearErrors={clearErrors}
              placeholder={'Select State '}
              defaultValue={userData?.state_to}
              value={getStateData(getCollegeDetail?.data?.state_to)}
              onChange={(currentValue) => {
                onStateChange(currentValue);
              }}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
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
                placeholder="Select District"
                defaultValue={userData?.district_to}
                value={getDistrictNameData(
                  getCollegeDetail?.data?.district_id || userData?.district_to?.id
                )}
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
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              City/Town/Village
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Box>
              <SearchableDropdown
                fullWidth
                name="Area"
                clearErrors={clearErrors}
                items={createEditFieldData(subDistrictList)}
                placeholder="Select Area"
                defaultValue={userData?.villages_to}
                error={errors.Area?.message}
                {...register('Area', {
                  required: 'Town name is required',
                })}
              />
            </Box>
            <Grid />
            <Grid />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Pin Code
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Box>
              <TextField
                fullWidth
                type="number"
                name="Pincode"
                required
                placeholder={'Enter Pin Code'}
                defaultValue={getCollegeDetail?.data?.pin_code}
                error={errors.Pincode?.message}
                {...register('Pincode', {
                  required: 'Pin Code is required',
                  pattern: {
                    value: /^[0-9]{6}$/i,
                    message: 'Please enter valid pincode',
                  },
                })}
              />
            </Box>
            <Grid />
            <Grid />
          </Grid>
        </Grid>

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              College Email ID
              <Typography component="span" color="error.main">
                *
              </Typography>
              <Typography component="span"></Typography>
            </Typography>
            <TextField
              sx={{
                pr: 0,
              }}
              fullWidth
              type="text"
              name="Email"
              required
              placeholder={'Enter Email ID'}
              defaultValue={getCollegeDetail?.data?.email_id}
              error={errors.Email?.message}
              {...register('Email', {
                required: 'Email id is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                  message: 'Provide valid email id',
                },
              })}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" mt={1}>
          <Grid item xs={12} sm="auto" alignItems="flex-start" mr={{ lg: 2, md: 2, sm: 2 }}>
            <Button
              sx={{
                m: {
                  xs: '5px 0px',
                  md: '0px',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
              variant="contained"
              color="secondary"
              onClick={handleSubmit(onSubmitClickHandler)}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm="auto" alignItems="flex-start">
            <Button
              variant="contained"
              color="grey"
              sx={{
                m: {
                  xs: '5px 0px',
                },
                width: {
                  xs: '100%',
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                props?.setShowpage('Profile');
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default CollegeEditProfile;
