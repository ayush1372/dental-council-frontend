import { useEffect, useState } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';
// import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import {
  getCitiesList,
  getDistrictList,
  // getPostalAddress,
  getSubDistrictsList,
} from '../../../../store/actions/common-actions';
import {
  getRegistrationDetailsData,
  updateDoctorPersonalDetails,
} from '../../../../store/actions/doctor-user-profile-actions';
import { getPersonalDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Checkbox } from '../../../../ui/core';
import { RadioGroup, Select, TextField } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';

const EditPersonalDetails = ({ handleNext, setIsReadMode }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);

  // eslint-disable-next-line no-unused-vars
  const { statesList, countriesList, districtsList, subDistrictList, citiesList } = useSelector(
    (state) => state?.common
  );
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  // eslint-disable-next-line no-unused-vars
  // const [languages, setLanguages] = useState([]);
  const [isSameAddress, setIsSameAddress] = useState(
    personalDetails?.communication_address?.is_same_address || false
  );
  const { personal_details, communication_address, imr_details } = personalDetails || {};
  const {
    salutation,
    aadhaar_token,
    first_name,
    last_name,
    middle_name,
    father_name,
    mother_name,
    spouse_name,
    country_nationality,
    date_of_birth,
    gender,
    // schedule,
    full_name,
    language,
  } = personal_details || {};
  const {
    country,
    state,
    district,
    sub_district,
    village,
    pincode,
    //address_line1,
    email,
    mobile,
    landmark,
    locality,
    street,
    house,
  } = communication_address || {};
  const { registration_number, nmr_id, year_of_info } = imr_details || {};

  const countryNationalityId = country_nationality?.id;
  // const scheduleId = schedule?.id;
  const countryId = country?.id;
  const stateId = isSameAddress ? personalDetails?.kyc_address?.state?.id : state?.id;
  const districtId = isSameAddress ? personalDetails?.kyc_address?.district?.id : district?.id;
  const subdistrictId = isSameAddress
    ? personalDetails?.kyc_address?.sub_district?.id
    : sub_district?.id;
  const citiesId = isSameAddress ? personalDetails?.kyc_address?.village?.id : village?.id;

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      Salutation:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? salutation === 'Dr.'
            ? 'Dr.'
            : salutation === 'Mr.'
            ? 'Mr.'
            : salutation === 'Mrs.'
            ? 'Mrs.'
            : salutation === 'Do not specify'
            ? 'Do not specify'
            : ''
          : '',

      AadhaarNumber:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? 8904 + '-' + 2728 + '-' + aadhaar_token
          : '8904-2728-4688',
      FirstName: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? first_name : '',
      MiddleName:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? middle_name : '',
      LastName: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? last_name : '',
      FatherName:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? father_name : '',
      MotherName:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? mother_name : '',
      SpouseName:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? spouse_name : '',
      Nationality:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? countryNationalityId : '',
      dateOfBirth:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? date_of_birth : '',
      Gender:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? gender === 'female'
            ? 'female'
            : 'male'
          : '',
      // Schedule: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? scheduleId : '',
      Name: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? full_name : '',
      Address:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? personalDetails?.kyc_address?.address_line1
          : '',
      IMRID: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? nmr_id : '',
      YearOfInfo:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? year_of_info : '',
      RegistrationNumber:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? registration_number : '',
      mobileNo: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? mobile : '',
      EmailAddress: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? email : '',
      LanguageSpoken: language || [],
      House:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? isSameAddress
            ? personalDetails?.kyc_address?.house
            : house
          : '',
      Street:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? isSameAddress
            ? personalDetails?.kyc_address?.street
            : street
          : '',
      Landmark:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? isSameAddress
            ? personalDetails?.kyc_address?.landmark
            : landmark
          : '',
      Locality:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? isSameAddress
            ? personalDetails?.kyc_address?.locality
            : locality
          : '',
      State: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? stateId : '',
      District: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? districtId : '',
      SubDistrict:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? subdistrictId : '',
      Country: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? countryId : '',
      Area: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? citiesId : '',
      PostalCode:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? isSameAddress
            ? personalDetails?.kyc_address?.pincode
            : pincode
          : '',
    },
  });

  const fetchDistricts = (stateId) => {
    if (stateId) {
      dispatch(getDistrictList(stateId))
        .then(() => {})
        .catch((allFailMsg) => {
          successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
        });
    }
  };
  const fetchSubDistricts = (districtId) => {
    if (districtId) {
      dispatch(getSubDistrictsList(districtId))
        .then(() => {})
        .catch((allFailMsg) => {
          successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
        });
    }
  };

  const fetchCities = (subDistrictId) => {
    try {
      dispatch(getCitiesList(subDistrictId)).then(() => {});
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  };

  const selectedState = watch('State');
  const selectedDistrict = watch('District');
  const selectedSubDistrict = watch('SubDistrict');

  useEffect(() => {
    fetchDistricts(selectedState);
  }, [selectedState]);

  useEffect(() => {
    fetchSubDistricts(selectedDistrict);
  }, [selectedDistrict]);

  useEffect(() => {
    fetchCities(selectedSubDistrict);
  }, [selectedSubDistrict]);

  useEffect(() => {
    if (isSameAddress) {
      setValue('State', personalDetails?.kyc_address?.state?.id);
      setValue('District', personalDetails?.kyc_address?.district?.id);
      setValue('SubDistrict', personalDetails?.kyc_address?.sub_district?.id);
      setValue('Area', personalDetails?.kyc_address?.village?.id);
      setValue('House', personalDetails?.kyc_address?.house);
      setValue('Street', personalDetails?.kyc_address?.street);
      setValue('Landmark', personalDetails?.kyc_address?.landmark);
      setValue('Locality', personalDetails?.kyc_address?.locality);
      setValue('PostalCode', personalDetails?.kyc_address?.pincode);
    } else {
      setValue('State', personalDetails?.communication_address?.state?.id);
      setValue('District', personalDetails?.communication_address?.District?.id);
      setValue('SubDistrict', personalDetails?.communication_address?.sub_district?.id);
      setValue('Area', personalDetails?.communication_address?.village?.id);
      setValue('House', personalDetails?.communication_address?.house);
      setValue('Street', personalDetails?.communication_address?.street);
      setValue('Landmark', personalDetails?.communication_address?.landmark);
      setValue('Locality', personalDetails?.communication_address?.locality);
      setValue('PostalCode', personalDetails?.kyc_address?.pincode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSameAddress]);

  // useEffect(() => {
  //   if (getValues().PostalCode?.length === 6) {
  //     dispatch(getPostalAddress(getValues().PostalCode))
  //       .then(() => {})
  //       .catch((allFailMsg) => {
  //         successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getValues().PostalCode]);

  const fetchUpdatedDoctorUserProfileData = (personalDetails) => {
    dispatch(updateDoctorPersonalDetails(personalDetails, personalDetails?.hp_profile_id))
      .then(() => {
        dispatch(getRegistrationDetailsData(personalDetails?.hp_profile_id))
          .then(() => {
            handleNext();
          })
          .catch((allFailMsg) => {
            successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
          });
      })
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };

  const handleBackButton = () => {
    setIsReadMode(true);
  };

  const nationalities = [
    {
      id: 356,
      name: 'Indian',
    },
  ];

  async function onHandleSave() {
    const {
      MiddleName,
      LastName,
      FatherName,
      MotherName,
      SpouseName,
      Gender,
      // Schedule,
      Nationality,
      PostalCode,
      Address,
      EmailAddress,
      mobileNo,
      Name,
      Country,
      State,
      District,
      SubDistrict,
      Area,
      DateOfBirth,
      Landmark,
      Locality,
      Street,
    } = getValues();

    const doctorProfileValues = JSON.parse(JSON.stringify(personalDetails));
    doctorProfileValues.personal_details.middle_name = MiddleName;
    doctorProfileValues.personal_details.last_name = LastName;
    doctorProfileValues.personal_details.father_name = FatherName;
    doctorProfileValues.personal_details.mother_name = MotherName;
    doctorProfileValues.personal_details.spouse_name = SpouseName;
    // doctorProfileValues.personal_details.schedule.name = Schedule;
    doctorProfileValues.personal_details.date_of_birth = DateOfBirth;
    doctorProfileValues.personal_details.full_name = Name;
    doctorProfileValues.personal_details.country_nationality =
      nationalities.find((x) => x.id === Nationality) || {};
    doctorProfileValues.personal_details.gender = Gender;
    // doctorProfileValues.personal_details.schedule = schedules.find((x) => x.id === Schedule) || {};

    doctorProfileValues.communication_address.pincode = PostalCode;
    doctorProfileValues.communication_address.address_line1 = Address;
    doctorProfileValues.communication_address.email = EmailAddress;
    doctorProfileValues.communication_address.mobile = mobileNo !== undefined ? mobileNo : '';
    doctorProfileValues.communication_address.country.id = Country;
    doctorProfileValues.communication_address.state.id = State;
    doctorProfileValues.communication_address.district.id = District;
    doctorProfileValues.communication_address.sub_district.id = SubDistrict;
    doctorProfileValues.communication_address.village.id = Area;
    doctorProfileValues.communication_address.landmark = Landmark;
    doctorProfileValues.communication_address.locality = Locality;
    doctorProfileValues.communication_address.street = Street;
    doctorProfileValues.communication_address.is_same_address = isSameAddress;
    doctorProfileValues.communication_address.address_type = { id: 4, name: 'communication' };

    dispatch(getPersonalDetails({ ...JSON.parse(JSON.stringify(doctorProfileValues)) }));

    delete doctorProfileValues['nmr_id'];
    delete doctorProfileValues['request_id'];
    delete doctorProfileValues['application_type_id'];
    delete doctorProfileValues['kyc_address'];

    return doctorProfileValues;
  }
  async function onHandleOptionNext() {
    await onHandleSave().then((response) => {
      fetchUpdatedDoctorUserProfileData(response);
    });
  }

  const handleGender = (event) => {
    setValue(event.target.name, event.target.value, true);
  };
  return (
    <Box
      sx={{
        padding: {
          xs: '0 16px 16px 16px',
          md: '0 24px 0 24px',
        },
      }}
    >
      <ToastContainer></ToastContainer>
      <Grid container spacing={2}>
        {/* layer 1 */}
        <Grid container item>
          <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Personal Details*
            </Typography>
          </Grid>
          {false && (
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                name={'AadhaarNumber'}
                label={'Aadhaar Number'}
                required={true}
                fullWidth
                defaultValue={getValues().AadhaarNumber}
                {...register('AadhaarNumber', {
                  required: 'Aadhaar Number is Required',
                  pattern: {
                    value: /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                    message: 'Should only contain hyphen and numbers',
                  },
                })}
                error={errors.AadhaarNumber?.message}
              />
            </Grid>
          )}
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Name
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={`Dr. ${'Name'}`}
              placeholder="First name"
              //required={true}
              fullWidth
              defaultValue={getValues().Name}
              {...register('Name', {
                // required: 'Missing field',
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              sx={{
                input: {
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              InputProps={{ readOnly: loggedInUserType === 'SMC' ? false : true }}
              // error={errors.Name?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Father&apos;s Name
            </Typography>
            <TextField
              variant="outlined"
              name={'FatherName'}
              placeholder="Father's name"
              fullWidth
              defaultValue={getValues().FatherName}
              {...register('FatherName', {
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.FatherName?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Mother&apos;s Name
            </Typography>
            <TextField
              variant="outlined"
              name={'MotherName'}
              placeholder="Mother's name"
              fullWidth
              defaultValue={getValues().MotherName}
              {...register('MotherName', {
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.MotherName?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Spouse Name
            </Typography>
            <TextField
              variant="outlined"
              name={'SpouseName'}
              placeholder="Spouse name"
              fullWidth
              defaultValue={getValues().SpouseName}
              {...register('SpouseName', {
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.SpouseName?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Select Nationality
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Select
              fullWidth
              error={errors.Nationality?.message}
              name="Nationality"
              defaultValue={getValues().Nationality}
              disabled
              required={true}
              sx={{
                input: {
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              {...register('Nationality', {
                required: 'Nationality is required',
              })}
              InputProps={{
                readOnly: loggedInUserType === 'SMC' ? false : true,
              }}
              options={createSelectFieldData(nationalities)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Gender
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid container item mt={1}>
              <RadioGroup
                onChange={handleGender}
                disabled
                name={'Gender'}
                size="small"
                defaultValue={getValues().Gender}
                items={[
                  {
                    value: 'male',
                    label: 'Male',
                  },
                  {
                    value: 'female',
                    label: 'Female',
                  },
                  {
                    value: 'other',
                    label: 'Others',
                  },
                ]}
                required={true}
                error={errors.Gender?.message}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Date of Birth (MM/DD/YYYY)
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              fullWidth
              data-testid="Date of Birth"
              id="Date of Birth"
              type="date"
              name="DateOfBirth"
              sx={{
                height: '48px',
                input: {
                  color: 'black.main',
                  textTransform: 'uppercase',
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: loggedInUserType === 'SMC' ? false : true,
              }}
              required={true}
              defaultValue={getValues().dateOfBirth}
              error={errors.DateOfBirth?.message}
              {...register('DateOfBirth', {
                required: 'Enter Date of Birth',
              })}
            />
          </Grid>

          {/*Author: Mahalingam V S
            Reason: As suggestion given in CEO meeting.
            Date:09/03/2023
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Language Spoken
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <AutoComplete
              name="LanguageSpoken"
              options={languagesList?.data || []}
              value={getValues().LanguageSpoken}
              error={languages?.length === 0 && errors.LanguageSpoken?.message}
              multiple={true}
              {...register('LanguageSpoken')}
              onChange={(value) => {
                handleLanguageSpokenChange('LanguageSpoken', value);
              }}
            />
          </Grid>
          {false && (
            <Grid item xs={12} md={4}>
              <Typography color="inputTextColor.main" variant="body1">
                Schedule
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Select
                fullWidth
                error={errors.Schedule?.message}
                name="Schedule"
                defaultValue={getValues().Schedule}
                required={true}
                {...register('Schedule', {
                  required: 'Schedule is required',
                })}
                options={createSelectFieldData(schedules)}
              />
            </Grid>
          )} */}
        </Grid>

        {/*Layer 2*/}

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Address as per KYC
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" color="inputTextColor.main">
              Aadhaar verified Address
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'Address'}
              placeholder="Address"
              required={false}
              fullWidth
              disabled
              defaultValue={getValues().Address}
              {...register('Address', {
                maxLength: {
                  value: 300,
                  message: 'Length should be less than 300.',
                },
              })}
              sx={{
                input: {
                  backgroundColor: 'grey2.main',
                },
              }}
            />
          </Grid>

          {/* layer 3 */}
          <Grid container item spacing={2} mt={1}>
            <Grid item xs={12}>
              <Typography
                bgcolor="grey1.light"
                p={1}
                component="div"
                color="tabHighlightedBackgroundColor.main"
                variant="h3"
              >
                Communication Address*
              </Typography>
            </Grid>
            <Box p={2} display="flex">
              <Checkbox
                defaultChecked={personalDetails?.communication_address?.is_same_address || false}
                // error={errors.Address?.message}
                onChange={(e) => {
                  setIsSameAddress(e.target.checked);
                }}
              />
              <Typography component="div" mt={1} variant="body7" color="textPrimary.main">
                Is the communication address same as your address as per your KYC?
              </Typography>
            </Box>
            <Grid container item columnSpacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  House
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <TextField
                  variant="outlined"
                  name={'House'}
                  placeholder="House address"
                  disabled={isSameAddress ? true : false}
                  sx={{
                    input: {
                      backgroundColor: isSameAddress ? 'grey2.main' : '',
                    },
                  }}
                  required={isSameAddress ? false : true}
                  fullWidth
                  defaultValue={
                    isSameAddress
                      ? personalDetails?.kyc_address?.house
                      : personalDetails?.communication_address?.house
                  }
                  value={isSameAddress ? personalDetails?.kyc_address?.house : getValues().Address}
                  {...register('House', {
                    required: 'House is Required',
                    maxLength: {
                      value: 300,
                      message: 'Length should be less than 300.',
                    },
                  })}
                  error={errors.House?.message}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  Street
                </Typography>
                <TextField
                  variant="outlined"
                  name={'Street'}
                  placeholder="Enter Street"
                  disabled={isSameAddress}
                  // required={false}
                  fullWidth
                  sx={{
                    input: {
                      backgroundColor: isSameAddress ? 'grey2.main' : '',
                    },
                  }}
                  defaultValue={
                    isSameAddress
                      ? personalDetails?.kyc_address?.street
                      : personalDetails?.communication_address?.street
                  }
                  // value={isSameAddress ? personalDetails?.kyc_address?.street : getValues().street}
                  {...register('Street', {
                    // required: 'Street is Required',
                    maxLength: {
                      value: 300,
                      message: 'Length should be less than 300.',
                    },
                  })}
                  error={errors.Street?.message}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  Landmark
                </Typography>
                <TextField
                  variant="outlined"
                  name={'Landmark'}
                  placeholder="Landmark"
                  disabled={isSameAddress}
                  sx={{
                    input: {
                      backgroundColor: isSameAddress ? 'grey2.main' : '',
                    },
                  }}
                  required={false}
                  fullWidth
                  defaultValue={
                    isSameAddress
                      ? personalDetails?.kyc_address?.landmark
                      : personalDetails?.communication_address?.landmark
                  }
                  value={
                    isSameAddress ? personalDetails?.kyc_address?.landmark : getValues().landmark
                  }
                  {...register('Landmark', {
                    maxLength: {
                      value: 300,
                      message: 'Length should be less than 300.',
                    },
                  })}
                  error={errors.Landmark?.message}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Locality
              </Typography>
              <TextField
                variant="outlined"
                name={'Locality'}
                placeholder="Locality"
                disabled={isSameAddress}
                sx={{
                  input: {
                    backgroundColor: isSameAddress ? 'grey2.main' : '',
                  },
                }}
                // required={false}
                fullWidth
                defaultValue={
                  isSameAddress
                    ? personalDetails?.kyc_address?.locality
                    : personalDetails?.communication_address?.locality
                }
                value={
                  isSameAddress ? personalDetails?.kyc_address?.locality : getValues().locality
                }
                {...register('Locality', {
                  // required: 'Locality is Required',
                  // maxLength: {
                  //   value: 300,
                  //   message: 'Length should be less than 300.',
                  // },
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                fullWidth
                error={errors.Country?.message}
                name="Country"
                label="Country"
                defaultValue={getValues().Country}
                required={true}
                {...register('Country', {
                  required: 'Country is required',
                })}
                sx={{
                  input: {
                    backgroundColor: isSameAddress ? 'grey2.main' : '',
                  },
                }}
                disabled
                options={
                  countriesList?.length > 0
                    ? createSelectFieldData(
                        countriesList?.filter(function (item) {
                          return item.name === 'India';
                        })
                      )
                    : []
                }
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                State/Union Territory
                {!isSameAddress && (
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                )}
              </Typography>
              <Select
                fullWidth
                error={errors.State?.message}
                name="State"
                defaultValue={getValues().State}
                value={getValues().State}
                required={isSameAddress ? false : true}
                disabled={isSameAddress}
                sx={{
                  input: {
                    backgroundColor: isSameAddress ? 'grey2.main' : '',
                  },
                }}
                {...register(
                  'State',
                  isSameAddress
                    ? ''
                    : {
                        required: 'State/Union territory is required',
                      }
                )}
                options={createSelectFieldData(statesList)}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                District
                {!isSameAddress && (
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                )}
              </Typography>
              <Select
                fullWidth
                error={errors.District?.message}
                name="District"
                defaultValue={getValues().District}
                required={isSameAddress ? false : true}
                disabled={isSameAddress}
                sx={{
                  input: {
                    backgroundColor: isSameAddress ? 'grey2.main' : '',
                  },
                }}
                {...register(
                  'District',
                  !isSameAddress && {
                    required: 'District is required',
                  }
                )}
                options={createSelectFieldData(districtsList, 'id')}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Sub District
              </Typography>
              <Select
                fullWidth
                error={errors.SubDistrict?.message}
                name="SubDistrict"
                placeholder="Sub District"
                disabled={isSameAddress}
                sx={{
                  input: {
                    backgroundColor: isSameAddress ? 'grey2.main' : '',
                  },
                }}
                defaultValue={getValues().SubDistrict}
                value={getValues().SubDistrict}
                {...register('SubDistrict')}
                options={createSelectFieldData(subDistrictList, 'id')}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                City/Town/Village
              </Typography>
              <Select
                fullWidth
                // error={errors.Area?.message}
                sx={{
                  input: {
                    backgroundColor: isSameAddress ? 'grey2.main' : '',
                  },
                }}
                name="Area"
                defaultValue={getValues().Area}
                // value={getValues().Area}
                disabled={isSameAddress}
                required={true}
                {...register('Area')}
                options={createSelectFieldData(citiesList, 'id')}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Pincode
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'PostalCode'}
                placeholder="Postal code"
                required={true}
                fullWidth
                sx={{
                  input: {
                    backgroundColor: isSameAddress ? 'grey2.main' : '',
                  },
                }}
                defaultValue={
                  isSameAddress ? personalDetails?.kyc_address?.pincode : getValues().PostalCode
                }
                // onChange={(e) => {
                //   alert(e.target.value);
                // }}
                disabled={isSameAddress}
                {...register('PostalCode', {
                  required: 'PostalCode is Required',
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'Should only contains 6 digits',
                  },
                })}
                error={errors.PostalCode?.message}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container display="flex" alignItems="center" mt={5}>
          <Grid item xs={12} md="auto">
            <Button
              onClick={handleBackButton}
              color="grey"
              variant="contained"
              sx={{
                margin: {
                  xs: '5px 0',
                  md: '0',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
            >
              {t('Back')}
            </Button>
          </Grid>
          <Grid item xs={12} md="auto" display="flex" ml="auto">
            <Button
              onClick={handleSubmit(onHandleSave)}
              variant="outlined"
              color="secondary"
              sx={{
                margin: {
                  xs: '5px 0',
                  md: '0',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                  height: '52px',
                },
              }}
            >
              {t('Save')}
            </Button>
          </Grid>
          <Grid item xs={12} md="auto" display="flex" ml={{ xs: 0, md: 2 }}>
            <Button
              size="medium"
              onClick={handleSubmit(onHandleOptionNext)}
              variant="contained"
              color="secondary"
              sx={{
                margin: {
                  xs: '5px 0',
                  md: '0',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
            >
              {t('Save & Next')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditPersonalDetails;
