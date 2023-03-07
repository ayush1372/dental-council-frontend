import { useEffect, useState } from 'react';

// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
// import { get_year_data } from '../../../../helpers/functions/common-functions';
import { AutoComplete } from '../../../../shared/autocomplete/searchable-autocomplete';
// import { ModalOTP } from '../../../../shared/otp-modal/otp-modal';
import {
  getCitiesList,
  getDistrictList,
  getInitiateWorkFlow,
  getSubDistrictsList,
} from '../../../../store/actions/common-actions';
import {
  getRegistrationDetailsData,
  updateDoctorPersonalDetails,
} from '../../../../store/actions/doctor-user-profile-actions';
import { getPersonalDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Checkbox } from '../../../../ui/core';
import { RadioGroup, Select, TextField } from '../../../../ui/core';
// import MobileNumber from '../../../../ui/core/mobile-number/mobile-number';
import successToast from '../../../../ui/core/toaster';

const EditPersonalDetails = ({ handleNext, setIsReadMode }) => {
  const { t } = useTranslation();
  // const theme = useTheme();
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);
  const { loginData } = useSelector((state) => state?.loginReducer);

  const { statesList, countriesList, districtsList, subDistrictList, citiesList } = useSelector(
    (state) => state?.common
  );
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  const [languages, setLanguages] = useState([]);

  const { personal_details, communication_address, imr_details, request_id } =
    personalDetails || {};
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
    schedule,
    full_name,
  } = personal_details || {};
  const { country, state, district, sub_district, village, pincode, address_line1, email, mobile } =
    communication_address || {};
  const { registration_number, nmr_id, year_of_info } = imr_details || {};

  const countryNationalityId = country_nationality?.id;
  const scheduleId = schedule?.id;
  const countryId = country?.id;
  const stateId = state?.id;
  const districtId = district?.id;
  const subdistrictId = sub_district?.id;
  const citiesId = village?.id;

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
          ? gender === 'M'
            ? 'male'
            : 'female'
          : '',
      Schedule: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? scheduleId : '',
      Name: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? full_name : '',
      Address: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? address_line1 : '',
      Area: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? citiesId : '',
      District: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? districtId : '',
      SubDistrict:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? subdistrictId : '',
      State: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? stateId : '',
      Country: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? countryId : '',
      PostalCode: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? pincode : '',
      IMRID: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? nmr_id : '',
      YearOfInfo:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? year_of_info : '',
      RegistrationNumber:
        loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? registration_number : '',
      mobileNo: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? mobile : '',
      EmailAddress: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? email : '',
      LanguageSpoken: [],
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

  const fetchUpadtedDoctorUserProfileData = (personalDetails) => {
    const getInitiateWorkFlowHeader = {
      application_type_id: 1,
      actor_id: 2,
      action_id: 3,
      hp_profile_id: loginData.data.profile_id,
      profile_status: 1,
      request_id: request_id,
    };
    dispatch(getInitiateWorkFlow(getInitiateWorkFlowHeader))
      .then(() => {
        // handleNext();
        dispatch(updateDoctorPersonalDetails(personalDetails, loginData.data.profile_id))
          .then(() => {
            dispatch(getRegistrationDetailsData(loginData.data.profile_id))
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
      })
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };
  // const { otpPopup,  otpVerified } = ModalOTP({ afterConfirm: () => {} });

  const handleBackButton = () => {
    setIsReadMode(true);
  };

  const nationalities = [
    {
      id: 356,
      name: 'Indian',
    },
  ];
  const schedules = [
    {
      name: 'Schedule 1',
      id: 1,
    },
    {
      name: 'Schedule 2',
      id: 2,
    },
    {
      name: 'Schedule 3',
      id: 3,
    },
  ];

  const onHandleSave = () => {
    const {
      // Salutation,
      MiddleName,
      LastName,
      FatherName,
      MotherName,
      SpouseName,
      Gender,
      Schedule,
      Nationality,
      RegistrationNumber,
      IMRID,
      YearOfInfo,
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
      LanguageSpoken,
    } = getValues();
    const doctorProfileValues = JSON.parse(JSON.stringify(personalDetails));
    // doctorProfileValues.personal_details.salutation = Salutation;
    // doctorProfileValues.personal_details.first_name = FirstName;
    doctorProfileValues.personal_details.middle_name = MiddleName;
    doctorProfileValues.personal_details.last_name = LastName;
    doctorProfileValues.personal_details.father_name = FatherName;
    doctorProfileValues.personal_details.mother_name = MotherName;
    doctorProfileValues.personal_details.spouse_name = SpouseName;
    doctorProfileValues.personal_details.schedule.name = Schedule;
    doctorProfileValues.personal_details.date_of_birth = DateOfBirth;
    doctorProfileValues.imr_details.registration_number = RegistrationNumber;
    doctorProfileValues.imr_details.nmr_id = IMRID;
    doctorProfileValues.imr_details.year_of_info = YearOfInfo;
    doctorProfileValues.communication_address.pincode = PostalCode;
    doctorProfileValues.communication_address.address_line1 = Address;
    doctorProfileValues.communication_address.email = EmailAddress;
    doctorProfileValues.communication_address.mobile = mobileNo;
    doctorProfileValues.personal_details.full_name = Name;
    doctorProfileValues.communication_address.full_name = Name;
    doctorProfileValues.communication_address.country.id = Country;
    doctorProfileValues.communication_address.state.id = State;
    doctorProfileValues.communication_address.district.id = District;
    doctorProfileValues.communication_address.sub_district.id = SubDistrict;
    doctorProfileValues.communication_address.village.id = Area;
    doctorProfileValues.personal_details.language = LanguageSpoken;
    doctorProfileValues.communication_address.address_type = { id: 4, name: 'communication' };
    doctorProfileValues.personal_details.country_nationality =
      nationalities.find((x) => x.id === Nationality) || {};
    doctorProfileValues.personal_details.gender = Gender;

    doctorProfileValues.personal_details.schedule = schedules.find((x) => x.id === Schedule) || {};
    dispatch(getPersonalDetails({ ...JSON.parse(JSON.stringify(doctorProfileValues)) }));
  };
  const onHandleOptionNext = () => {
    onHandleSave();
    fetchUpadtedDoctorUserProfileData(personalDetails);
  };
  // const handleSalutationChange = (event) => {
  //   setValue(event.target.name, event.target.value, true);
  // };
  const handleGender = (event) => {
    setValue(event.target.name, event.target.value, true);
  };

  const handleLanguageSpokenChange = (name, value) => {
    setValue(name, value, true);
    setLanguages([...value]);
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
          {/* <Grid item xs={12} md={4} lg={12}>
            <Grid item>
              <Typography color="inputTextColor.main" variant="body1">
                Salutation
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <RadioGroup
                onChange={handleSalutationChange}
                size="small"
                name={'Salutation'}
                defaultValue={getValues().Salutation}
                items={[
                  {
                    value: 'Dr.',
                    label: 'Dr.',
                  },
                  {
                    value: 'Mr.',
                    label: 'Mr.',
                  },
                  {
                    value: 'Mrs.',
                    label: 'Mrs.',
                  },
                  {
                    value: 'Do not specify',
                    label: 'Do not specify',
                  },
                ]}
                required={true}
                error={errors.Salutation?.message}
              />
            </Grid>
          </Grid> */}
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
              name={'Name'}
              placeholder="Your first name"
              required={true}
              fullWidth
              defaultValue={getValues().Name}
              {...register('Name', {
                required: 'Missing field',
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
              error={errors.Name?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Father&apos;s Name
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'FatherName'}
              placeholder="Your father's name"
              fullWidth
              defaultValue={getValues().FatherName}
              {...register('FatherName', {
                required: 'Missing field',
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
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'MotherName'}
              placeholder="Your mother's name"
              fullWidth
              defaultValue={getValues().MotherName}
              {...register('MotherName', {
                required: 'Missing field',
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
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'SpouseName'}
              placeholder="Your spouse name"
              fullWidth
              defaultValue={getValues().SpouseName}
              {...register('SpouseName', {
                required: 'Missing field',
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
              required={true}
              {...register('Nationality', {
                required: 'Nationality is required',
              })}
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
              Date of Birth
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
                  color: 'grey1.dark',
                  textTransform: 'uppercase',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              required={true}
              defaultValue={getValues().dateOfBirth}
              error={errors.DateOfBirth?.message}
              {...register('DateOfBirth', {
                required: 'Enter Date of Birth',
              })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Language Spoken
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <AutoComplete
              name="LanguageSpoken"
              options={[
                { id: 1, name: 'English' },
                { id: 2, name: 'Hindi' },
                { id: 3, name: 'Bengali' },
                { id: 4, name: 'Marathi' },
                { id: 5, name: 'Telugu' },
              ]}
              value={getValues().LanguageSpoken}
              error={languages?.length === 0 && errors.LanguageSpoken?.message}
              multiple={true}
              {...register('LanguageSpoken')}
              onChange={(value) => {
                handleLanguageSpokenChange('LanguageSpoken', value);
              }}
            />
          </Grid>
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
            <Typography variant="subtitle2" color="grey.main">
              Aadhaar verified Address
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'Address'}
              placeholder="Your address"
              required={false}
              fullWidth
              defaultValue={getValues().Address}
              {...register('Address', {
                required: 'Address is Required',
                maxLength: {
                  value: 300,
                  message: 'Length should be less than 300.',
                },
              })}
              error={errors.Address?.message}
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
            {/* <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Your Name
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'Name'}
                placeholder="Your name"
                required={true}
                fullWidth
                defaultValue={getValues().Name}
                {...register('Name', {
                  required: 'Name is Required',
                  maxLength: {
                    value: 100,
                    message: 'Length should be less than 100.',
                  },
                })}
                error={errors.Name?.message}
              />
            </Grid> */}
            <Box p={2} display="flex">
              <Checkbox
                {...register('Address', {
                  required: 'Address is Required',
                })}
                error={errors.Address?.message}
              />
              <Typography component="div" mt={1} variant="body7" color="textPrimary.main">
                Is the communication address same as your address as per your KYC?
              </Typography>
            </Box>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                House
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'House'}
                placeholder="Your House address"
                required={true}
                fullWidth
                defaultValue={getValues().Address}
                {...register('Address', {
                  required: 'House Address is Required',
                  maxLength: {
                    value: 300,
                    message: 'Length should be less than 300.',
                  },
                })}
                error={errors.Address?.message}
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
                required={false}
                fullWidth
                defaultValue={getValues().Street}
                /*author:krishnakanth, purpose: after getting values from backend we will work onthis */
                // {...register('Street', {
                //  required: 'Street is Required',
                //   maxLength: {
                //     value: 300,
                //     message: 'Length should be less than 300.',
                //   },
                // })}
                // error={errors.Street?.message}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Landmark
              </Typography>
              <TextField
                variant="outlined"
                name={'Landmark'}
                placeholder="Your Landmark"
                required={false}
                fullWidth
                defaultValue={getValues().Landmark}
                /*author:krishnakanth, purpose: after getting values from backend we will work onthis */
                // {...register('Landmark', {
                //  required: 'Landmark is Required',
                //   maxLength: {
                //     value: 300,
                //     message: 'Length should be less than 300.',
                //   },
                // })}
                // error={errors.Landmark?.message}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Locality
              </Typography>
              <TextField
                variant="outlined"
                name={'Locality'}
                placeholder="Your Locality"
                required={false}
                fullWidth
                defaultValue={getValues().Locality}
                /*author:krishnakanth, purpose: after getting values from backend we will work onthis */
                // {...register('Locality', {
                //   required: 'Locality is Required',
                //   maxLength: {
                //     value: 300,
                //     message: 'Length should be less than 300.',
                //   },
                // })}
                // error={errors.Locality?.message}
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
          </Grid>
          <Grid container item spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                State/Union Territory
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Select
                fullWidth
                error={errors.State?.message}
                name="State"
                defaultValue={getValues().State}
                required={true}
                {...register('State', {
                  required: 'State/Union territory is required',
                })}
                options={createSelectFieldData(statesList)}
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
                District
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Select
                fullWidth
                error={errors.District?.message}
                name="District"
                defaultValue={getValues().District}
                required={true}
                {...register('District', {
                  required: 'District is required',
                })}
                options={createSelectFieldData(districtsList, 'iso_code')}
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
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>

              <Select
                fullWidth
                error={errors.SubDistrict?.message}
                name="SubDistrict"
                placeholder="Sub District"
                defaultValue={getValues().SubDistrict}
                {...register('SubDistrict', {
                  required: 'SubDistrict is required',
                })}
                options={createSelectFieldData(subDistrictList, 'iso_code')}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                City/Town/Village
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Select
                fullWidth
                error={errors.Area?.message}
                name="Area"
                defaultValue={getValues().Area}
                required={true}
                {...register('Area', {
                  required: 'City/Town/Village is required',
                })}
                options={createSelectFieldData(citiesList)}
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
                Pincode
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'PostalCode'}
                placeholder="Your postal code"
                required={true}
                fullWidth
                defaultValue={getValues().PostalCode}
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
          {/* <Grid container item spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="end">
                <Box>
                  <Typography variant="subtitle2" color="inputTextColor.main">
                    Email Address
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>
                  <TextField
                    sx={{ minWidth: '265px' }}
                    type="text"
                    name="EmailAddress"
                    variant="outlined"
                    required
                    defaultValue={getValues().EmailAddress}
                    error={errors.EmailAddress?.message}
                    {...register('EmailAddress', {
                      required: {
                        value: true,
                        message: 'Provide a Valid Email ID',
                      },
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                        message: 'Provide a Valid Email ID',
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" edge="end">
                            {!errors.EmailAddress?.message &&
                            getValues()?.EmailAddress?.length !== 0 &&
                            otpVerified ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              ''
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box>
                  <Button
                    onClick={handleClickOpen}
                    variant="contained"
                    color="primary"
                    sx={{ height: '55px' }}
                  >
                    {t('GetOTP')}
                  </Button>
                </Box>
                {otpPopup}
              </Box>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Mobile Number
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <MobileNumber
                register={register}
                getValues={getValues}
                errors={errors}
                data-testid={'Mobile-No'}
                showhint={false}
                defaultValue={getValues().mobileNo}
                {...register('mobileNo')}
                showVerify={true}
                verifyOnClick={handleClickOpen}
              />
            </Grid>
          </Grid> */}
          {/* <Grid container item spacing={2} mt={1}>
            <Grid item xs={12}>
              <Typography
                bgcolor="grey1.light"
                p={1}
                component="div"
                color="tabHighlightedBackgroundColor.main"
                variant="h3"
              >
                IMR Details*
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                IMR ID
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'IMRID'}
                placeholder="Your IMR ID"
                required={true}
                fullWidth
                defaultValue={getValues().IMRID}
                {...register('IMRID', {
                  required: 'IMR ID is Required',
                })}
                sx={{
                  input: {
                    backgroundColor: theme.palette.grey2.main,
                  },
                }}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Year of Info
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Select
                fullWidth
                error={errors.YearOfInfo?.message}
                name="YearOfInfo"
                placeholder="Select year of info"
                defaultValue={getValues().YearOfInfo}
                required={true}
                disabled
                {...register('YearOfInfo', {
                  required: 'Year of info is required',
                })}
                options={get_year_data(1930)}
                sx={{
                  '.MuiSelect-select': {
                    backgroundColor: theme.palette.grey2.main,
                  },
                }}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Registration Number
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <TextField
                variant="outlined"
                name={'RegistrationNumber'}
                placeholder="Your registration number"
                required={true}
                fullWidth
                defaultValue={getValues().RegistrationNumber}
                {...register('RegistrationNumber', {
                  required: 'Registration Number is Required',
                })}
                sx={{
                  input: {
                    backgroundColor: theme.palette.grey2.main,
                  },
                }}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid> */}
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
