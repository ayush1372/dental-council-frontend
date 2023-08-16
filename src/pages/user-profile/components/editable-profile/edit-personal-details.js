import { useEffect, useRef, useState } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { createSelectFieldData, scrollToTop } from '../../../../helpers/functions/common-functions';
import {
  getCitiesList,
  getDistrictList,
  // getPostalAddress,
  getSubDistrictsList,
} from '../../../../store/actions/common-actions';
import {
  getPersonalDetailsData,
  getRegistrationDetailsData,
  updateDoctorPersonalDetails,
} from '../../../../store/actions/doctor-user-profile-actions';
import { getPersonalDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Checkbox } from '../../../../ui/core';
import { DatePicker, RadioGroup, Select, TextField } from '../../../../ui/core';
// import successToast from '../../../../ui/core/toaster';
import { EmailRegexValidation } from '../../../../utilities/common-validations';

const EditPersonalDetails = ({ handleNext, setIsReadMode, validDetails, setValidDetails }) => {
  let btnRef = useRef();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);

  // eslint-disable-next-line no-unused-vars
  const {
    statesList,
    countriesList,
    districtsList,
    subDistrictList,
    citiesList,
    enteredEmailMobileValues,
  } = useSelector((state) => state?.common);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { raisedQueryData } = useSelector((state) => state?.raiseQuery?.raiseQueryData);

  const [isSameAddress, setIsSameAddress] = useState(
    personalDetails?.communication_address?.is_same_address === 'true' ? true : false
  );
  const { personal_details, communication_address, imr_details, work_flow_status_id } =
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
    full_name,
    language,
    email,
  } = personal_details || {};
  const {
    country,
    state,
    district,
    sub_district,
    village,
    pincode,
    mobile,
    landmark,
    locality,
    street,
    house,
    id,
  } = communication_address || {};
  const { registration_number, nmr_id, year_of_info } = imr_details || {};

  const countryNationalityId = country_nationality?.id;
  const countryId = isSameAddress
    ? personalDetails?.kyc_address?.country?.id
    : country !== undefined
    ? country?.id
    : 356;
  const stateId = isSameAddress ? personalDetails?.kyc_address?.state?.id : state?.id;
  const districtId = isSameAddress
    ? personalDetails?.kyc_address?.district?.iso_code
    : district?.iso_code;
  const subdistrictId = isSameAddress
    ? personalDetails?.kyc_address?.sub_district?.iso_code
    : sub_district?.iso_code;
  const citiesId = isSameAddress ? personalDetails?.kyc_address?.village?.id : village?.id;
  const [districtListData, setDistrictListData] = useState('');
  const [subDistrictListData, setSubDistrictListData] = useState('');

  const countryName = personalDetails?.kyc_address?.country?.name || '';
  const stateName = personalDetails?.kyc_address?.state?.name || '';
  const districtName = personalDetails?.kyc_address?.district?.name || '';
  const subDistrictName = personalDetails?.kyc_address?.sub_district?.name || '';
  const villageName = personalDetails?.kyc_address?.village?.name || '';
  const houseNumber = personalDetails?.kyc_address?.house || '';
  const streetName = personalDetails?.kyc_address?.street || '';
  const addressLandmark = personalDetails?.kyc_address?.landmark || '';
  const userPincode = personalDetails?.kyc_address?.pincode || '';

  const kycAddress =
    (houseNumber && houseNumber + ', ') +
    (streetName && streetName + ', ') +
    (addressLandmark && addressLandmark + ', ') +
    (villageName && villageName + ', ') +
    (subDistrictName && subDistrictName + ', ') +
    (districtName && districtName + ', ') +
    (stateName && stateName + ', ') +
    (countryName && countryName + ', ') +
    (userPincode && userPincode) +
    '.';

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
    clearErrors,
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
          ? gender === 'F'
            ? 'F'
            : 'M'
          : '',
      // Schedule: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? scheduleId : '',
      Name: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? full_name : '',
      Address: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? kycAddress : '',
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
      Country: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? countryId : 356,
      Area: loggedInUserType === 'SMC' ? '' : loggedInUserType === 'Doctor' ? citiesId : '',
      PostalCode:
        loggedInUserType === 'SMC'
          ? ''
          : loggedInUserType === 'Doctor'
          ? isSameAddress
            ? ''
            : pincode !== undefined
            ? pincode
            : ''
          : '',
      CommunicationID: id,
    },
  });

  const fetchDistricts = (stateId) => {
    if (stateId) {
      dispatch(getDistrictList(stateId)).then((response) => {
        setDistrictListData(response?.data);
      });
      // .catch((allFailMsg) => {
      //   successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      // });
    }
  };
  const fetchSubDistricts = (districtId) => {
    if (districtId) {
      dispatch(getSubDistrictsList(districtId)).then((response) => {
        setSubDistrictListData(response?.data);
      });
      // .catch((allFailMsg) => {
      //   successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      // });
    }
  };

  const fetchCities = (subDistrictId) => {
    // try {
    dispatch(getCitiesList(subDistrictId)).then(() => {});
    // } catch (allFailMsg) {
    //   successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    // }
  };

  const selectedState = watch('State');
  const selectedDistrict = watch('District');
  const selectedSubDistrict = watch('SubDistrict');

  useEffect(() => {
    if (selectedState !== undefined) {
      fetchDistricts(selectedState);
      if (
        personalDetails?.kyc_address?.district?.iso_code !== '' ||
        personalDetails?.kyc_address?.district?.iso_code !== undefined ||
        personalDetails?.kyc_address?.district?.iso_code !== null ||
        isSameAddress
      ) {
        clearErrors('District', '');
      }
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict !== undefined) {
      fetchSubDistricts(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedSubDistrict !== undefined) {
      fetchCities(selectedSubDistrict);
    }
  }, [selectedSubDistrict]);

  useEffect(() => {
    if (personalDetails?.hp_profile_id !== undefined) {
      dispatch(getPersonalDetailsData(personalDetails?.hp_profile_id));
    }
    setIsSameAddress(
      personalDetails?.communication_address?.is_same_address === 'true' ? true : false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSameAddress) {
      setValue('State', personalDetails?.kyc_address?.state?.id);
      setValue('District', personalDetails?.kyc_address?.district?.iso_code);
      setValue('SubDistrict', personalDetails?.kyc_address?.sub_district?.iso_code);
      setValue('Area', personalDetails?.kyc_address?.village?.id);
      setValue('House', personalDetails?.kyc_address?.house);
      setValue('Street', personalDetails?.kyc_address?.street);
      setValue('Landmark', personalDetails?.kyc_address?.landmark);
      setValue('Locality', personalDetails?.kyc_address?.locality);
      setValue('PostalCode', personalDetails?.kyc_address?.pincode);
    } else {
      setValue('State', personalDetails?.communication_address?.state?.id);
      setValue('District', personalDetails?.communication_address?.district?.iso_code);
      setValue('SubDistrict', personalDetails?.communication_address?.sub_district?.iso_code);
      setValue('Area', personalDetails?.communication_address?.village?.id);
      setValue('House', personalDetails?.communication_address?.house);
      setValue('Street', personalDetails?.communication_address?.street);
      setValue('Landmark', personalDetails?.communication_address?.landmark);
      setValue('Locality', personalDetails?.communication_address?.locality);
      setValue('PostalCode', personalDetails?.communication_address?.pincode);
    }
    clearErrors('House', '');
    clearErrors('State', '');
    clearErrors('District', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSameAddress]);

  const fetchUpdatedDoctorUserProfileData = (personalDetails, optionNext) => {
    dispatch(updateDoctorPersonalDetails(personalDetails, personalDetails?.hp_profile_id)).then(
      () => {
        if (optionNext) {
          dispatch(getRegistrationDetailsData(personalDetails?.hp_profile_id)).then(() => {
            handleNext();
          });
        }
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    );
  };

  const handleBackButton = () => {
    if (btnRef.current) {
      btnRef.current.setAttribute('disabled', 'disabled');
    }
    setIsReadMode(true);
    setValidDetails({ ...validDetails, email: false });
  };

  const nationalities = [
    {
      id: 356,
      name: 'Indian',
    },
  ];

  const getStateData = (State) => {
    let stateData = [];
    Array.isArray(statesList) &&
      statesList?.map((elementData) => {
        if (elementData.id === State) {
          stateData.push(elementData);
        }
      });
    return stateData[0];
  };

  const getDistrictData = (District) => {
    let DistrictData = [];
    Array.isArray(districtListData) &&
      districtListData?.map((elementData) => {
        if (elementData.iso_code === District) {
          DistrictData.push(elementData);
        }
      });
    return DistrictData[0];
  };

  const getSubDistrictData = (subDistrict) => {
    let subDistrictData = [];
    Array.isArray(subDistrictListData) &&
      subDistrictListData?.map((elementData) => {
        if (elementData.iso_code === subDistrict) {
          subDistrictData.push(elementData);
        }
      });
    return subDistrictData[0];
  };

  const getVillageData = (village) => {
    let villageData = [];
    Array.isArray(citiesList) &&
      citiesList?.map((elementData) => {
        if (elementData.id === village) {
          villageData.push(elementData);
        }
      });
    return villageData[0];
  };

  //Helper Method to get the data of the query raised against the field
  const getQueryRaised = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query === undefined;
  };

  async function onHandleSave() {
    if (document?.getElementsByName('email')[0]?.value !== undefined) {
      if (
        !EmailRegexValidation?.pattern?.value?.test(document.getElementsByName('email')[0]?.value)
      ) {
        setValidDetails({ ...validDetails, email: true });
        scrollToTop();
        return;
      }
    }
    const {
      MiddleName,
      LastName,
      FatherName,
      MotherName,
      SpouseName,
      Gender,
      Nationality,
      PostalCode,
      Address,
      House,
      EmailAddress,
      mobileNo,
      Name,
      Country,
      State,
      District,
      SubDistrict,
      Area,
      // DateOfBirth,
      Landmark,
      Locality,
      Street,
      CommunicationID,
    } = getValues();

    const doctorProfileValues = JSON.parse(JSON.stringify(personalDetails));
    doctorProfileValues.personal_details.middle_name = MiddleName;
    doctorProfileValues.personal_details.last_name = LastName;
    doctorProfileValues.personal_details.father_name = FatherName;
    doctorProfileValues.personal_details.mother_name = MotherName;
    doctorProfileValues.personal_details.spouse_name = SpouseName;
    doctorProfileValues.personal_details.date_of_birth = getValues()
      .dateOfBirth?.split('/')
      ?.reverse()
      ?.join('/');
    doctorProfileValues.personal_details.full_name = Name;
    doctorProfileValues.personal_details.country_nationality =
      nationalities.find((x) => x.id === Nationality) || {};
    doctorProfileValues.personal_details.gender = Gender;
    doctorProfileValues.personal_details.email = document?.getElementsByName('email')[0]?.value
      ? document?.getElementsByName('email')[0]?.value
      : enteredEmailMobileValues?.email
      ? enteredEmailMobileValues?.email
      : EmailAddress;

    doctorProfileValues.communication_address.pincode = PostalCode;
    doctorProfileValues.communication_address.address_line1 = Address;
    doctorProfileValues.communication_address.email = EmailAddress;
    doctorProfileValues.communication_address.mobile = mobileNo !== undefined ? mobileNo : '';

    doctorProfileValues.communication_address.country = { id: Country, name: 'India' };
    doctorProfileValues.communication_address.state = getStateData(State);
    doctorProfileValues.communication_address.district = getDistrictData(District);
    doctorProfileValues.communication_address.sub_district = getSubDistrictData(SubDistrict);
    doctorProfileValues.communication_address.village = getVillageData(Area);

    doctorProfileValues.communication_address.landmark = Landmark;
    doctorProfileValues.communication_address.locality = Locality;
    doctorProfileValues.communication_address.street = Street;
    doctorProfileValues.communication_address.house = House;
    doctorProfileValues.communication_address.is_same_address = isSameAddress;
    doctorProfileValues.communication_address.address_type = { id: 4, name: 'communication' };
    if (doctorProfileValues?.communication_address?.id) {
      doctorProfileValues.communication_address.id = CommunicationID;
    }

    dispatch(getPersonalDetails({ ...JSON.parse(JSON.stringify(doctorProfileValues)) }));

    delete doctorProfileValues['nmr_id'];
    delete doctorProfileValues['request_id'];
    delete doctorProfileValues['application_type_id'];
    delete doctorProfileValues['kyc_address'];

    return doctorProfileValues;
  }
  async function onHandleOptionNext() {
    if (
      btnRef.current &&
      (document?.getElementsByName('email')[0]?.value || personalDetails?.email_verified)
    ) {
      btnRef.current.setAttribute('disabled', 'disabled');
    }
    await onHandleSave().then((response) => {
      response && fetchUpdatedDoctorUserProfileData(response, true);
    });
  }

  async function onHandleOptionSave() {
    await onHandleSave().then((response) => {
      response && fetchUpdatedDoctorUserProfileData(response, false);
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
              Personal Details
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
        <Grid container item spacing={2} mt={0.5}>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Full Name
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={`Dr. ${'Name'}`}
              placeholder="Enter name"
              fullWidth
              defaultValue={getValues().Name}
              {...register('Name', {
                pattern: {
                  value: /^[A-Z\s@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                  message: 'Please enter Name',
                },
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              disabled
              // sx={{
              //   input: {
              //     backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
              //   },
              // }}
              // InputProps={{ readOnly: loggedInUserType === 'SMC' ? false : true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Father&apos;s Name
            </Typography>
            <TextField
              variant="outlined"
              name={'FatherName'}
              placeholder="Enter father's name"
              fullWidth
              defaultValue={getValues().FatherName}
              {...register('FatherName', {
                pattern: {
                  value: /^[A-Z\s@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                  message: `Please enter father's name`,
                },
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.FatherName?.message}
              disabled={work_flow_status_id === 3 ? getQueryRaised('Fathers Name') : false}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       loggedInUserType === 'SMC'
              //         ? ''
              //         : work_flow_status_id === 3 && getQueryRaised('Fathers Name')
              //         ? 'grey2.main'
              //         : '',
              //   },
              // }}
              // InputProps={{
              //   readOnly: work_flow_status_id === 3 ? getQueryRaised('Fathers Name') : false,
              // }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Mother Name
            </Typography>
            <TextField
              variant="outlined"
              name={'MotherName'}
              placeholder="Enter mother name"
              fullWidth
              defaultValue={getValues().MotherName}
              {...register('MotherName', {
                pattern: {
                  value: /^[A-Z\s@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                  message: 'Please enter mother name',
                },
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.MotherName?.message}
              disabled={work_flow_status_id === 3 ? getQueryRaised('Mothers Name') : false}
              // InputProps={{
              //   readOnly: work_flow_status_id === 3 ? getQueryRaised('Mothers Name') : false,
              // }}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       loggedInUserType === 'SMC'
              //         ? ''
              //         : work_flow_status_id === 3 && getQueryRaised('Mothers Name')
              //         ? 'grey2.main'
              //         : '',
              //   },
              // }}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={0.5}>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Spouse Name
            </Typography>
            <TextField
              variant="outlined"
              name={'SpouseName'}
              placeholder="Enter spouse name"
              fullWidth
              defaultValue={getValues().SpouseName}
              {...register('SpouseName', {
                pattern: {
                  value: /^[A-Z\s@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,

                  message: 'Please enter spouse name',
                },
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.SpouseName?.message}
              disabled={work_flow_status_id === 3 ? getQueryRaised('Spouse Name') : false}
              // InputProps={{
              //   readOnly: work_flow_status_id === 3 ? getQueryRaised('Spouse Name') : false,
              // }}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       loggedInUserType === 'SMC'
              //         ? ''
              //         : work_flow_status_id === 3 && getQueryRaised('Spouse Name')
              //         ? 'grey2.main'
              //         : '',
              //   },
              // }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Nationality
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Select
              fullWidth
              // sx={{ backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main' }}
              error={errors.Nationality?.message}
              name="Nationality"
              defaultValue={getValues().Nationality}
              disabled
              required={true}
              {...register('Nationality', {
                required: 'Nationality is required',
              })}
              // InputProps={{
              //   readOnly: loggedInUserType === 'SMC' ? false : true,
              // }}
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
                    value: 'M',
                    label: 'Male',
                  },
                  {
                    value: 'F',
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
        <Grid container item spacing={2} mt={0.5}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Date of Birth (DD-MM-YYYY)
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <DatePicker
              value={getValues()?.DateOfBirth}
              onChangeDate={(newDateValue) => {
                setValue('DateOfBirth', new Date(newDateValue)?.toLocaleDateString('en-GB'));
              }}
              data-testid="Date of Birth"
              id="DateOfBirth"
              name="RenewalDate"
              required={true}
              defaultValue={
                getValues()?.dateOfBirth ? new Date(getValues()?.dateOfBirth) : undefined
              }
              error={errors.DateOfBirth?.message}
              // backgroundColor={loggedInUserType === 'SMC' ? '' : '#F0F0F0'}
              disabled={loggedInUserType === 'SMC' ? false : true}
            />
          </Grid>

          {/*Author: Mahalingam V S
            Reason: As suggestion given in CEO meeting.
            Date:09/03/2023
          <Grid item xs={12} md={4}>
            <Typography variant="body1" color="inputTextColor.main">
              Language spoken
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

        <Grid container item spacing={2} mt={0.5}>
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
          <Grid item xs={12}>
            <Typography variant="body1" color="inputTextColor.main">
              Aadhaar Verified Address
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
                  // backgroundColor: 'grey2.main',
                  whiteSpace: 'nowrap',
                  wordWrap: 'break-word',
                },
              }}
            />
          </Grid>

          {/* layer 3 */}
          <Grid container item spacing={2} mt={0.5}>
            <Grid item xs={12}>
              <Typography
                bgcolor="grey1.light"
                p={1}
                component="div"
                color="tabHighlightedBackgroundColor.main"
                variant="h3"
              >
                Communication Address
              </Typography>
            </Grid>
            <Box p={2} display="flex" justifyContent="center">
              <Checkbox
                value={isSameAddress}
                defaultChecked={
                  personalDetails?.communication_address?.is_same_address === 'true' ? true : false
                }
                checked={isSameAddress}
                onChange={(e) => {
                  setIsSameAddress(e.target.checked);
                }}
                disabled={work_flow_status_id === 3 ? true : false}
              />
              <Typography component="div" mt={1} variant="body7" color="textPrimary.main">
                Click if communication address is same as KYC address
              </Typography>
            </Box>
            <Grid container item columnSpacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  House
                  {!isSameAddress && (
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  )}
                </Typography>
                <TextField
                  variant="outlined"
                  name={'House'}
                  fullWidth
                  placeholder="House"
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('House')
                      : false
                  }
                  required={!isSameAddress ? true : false}
                  defaultValue={
                    isSameAddress ? personalDetails?.kyc_address?.house : getValues()?.House
                  }
                  {...register(
                    'House',
                    !isSameAddress
                      ? {
                          required: 'Please enter house',
                          maxLength: {
                            value: 300,
                            message: 'Length should be less than 300.',
                          },
                        }
                      : {
                          required: false,
                        }
                  )}
                  error={!isSameAddress ? errors?.House?.message : ''}
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
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('Street')
                      : false
                  }
                  fullWidth
                  // sx={{
                  //   input: {
                  //     backgroundColor: isSameAddress
                  //       ? 'grey2.main'
                  //       : work_flow_status_id === 3 && getQueryRaised('Street')
                  //       ? 'grey2.main'
                  //       : '',
                  //   },
                  // }}
                  defaultValue={
                    isSameAddress
                      ? personalDetails?.kyc_address?.street
                      : personalDetails?.communication_address?.street
                  }
                  {...register('Street', {
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
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('Landmark')
                      : false
                  }
                  // sx={{
                  //   input: {
                  //     backgroundColor: isSameAddress
                  //       ? 'grey2.main'
                  //       : work_flow_status_id === 3 && getQueryRaised('Landmark')
                  //       ? 'grey2.main'
                  //       : '',
                  //   },
                  // }}
                  required={false}
                  fullWidth
                  defaultValue={
                    isSameAddress
                      ? personalDetails?.kyc_address?.landmark
                      : personalDetails?.communication_address?.landmark
                  }
                  value={
                    isSameAddress ? personalDetails?.kyc_address?.landmark : getValues()?.landmark
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
                disabled={
                  isSameAddress
                    ? isSameAddress
                    : work_flow_status_id === 3
                    ? getQueryRaised('Locality')
                    : false
                }
                // sx={{
                //   input: {
                //     backgroundColor: isSameAddress
                //       ? 'grey2.main'
                //       : work_flow_status_id === 3 && getQueryRaised('Locality')
                //       ? 'grey2.main'
                //       : '',
                //   },
                // }}
                fullWidth
                defaultValue={
                  isSameAddress
                    ? personalDetails?.kyc_address?.locality
                    : personalDetails?.communication_address?.locality
                }
                value={
                  isSameAddress ? personalDetails?.kyc_address?.locality : getValues()?.locality
                }
                {...register('Locality', {})}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {isSameAddress || (work_flow_status_id === 3 && getQueryRaised('Country')) ? (
                <TextField
                  variant="outlined"
                  name={'Country'}
                  label="Country"
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('Country')
                      : false
                  }
                  // sx={{
                  //   input: {
                  //     backgroundColor: isSameAddress
                  //       ? 'grey2.main'
                  //       : work_flow_status_id === 3 && getQueryRaised('Country')
                  //       ? 'grey2.main'
                  //       : '',
                  //   },
                  // }}
                  fullWidth
                  value={'India'}
                />
              ) : (
                <Select
                  // style={{ backgroundColor: '#F0F0F0' }}
                  fullWidth
                  error={errors.Country?.message}
                  name="Country"
                  label="Country"
                  defaultValue={getValues().Country}
                  value={getValues().Country}
                  required={isSameAddress ? false : true}
                  {...register('Country', {
                    required: 'Please select country',
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
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                State/Union Territory
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              {isSameAddress || (work_flow_status_id === 3 && getQueryRaised('State')) ? (
                <TextField
                  variant="outlined"
                  name={'State'}
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('State')
                      : false
                  }
                  // sx={{
                  //   input: {
                  //     backgroundColor: isSameAddress
                  //       ? 'grey2.main'
                  //       : work_flow_status_id === 3 && getQueryRaised('State')
                  //       ? 'grey2.main'
                  //       : '',
                  //   },
                  // }}
                  fullWidth
                  error={errors.State?.message}
                  value={getStateData(getValues()?.State)?.name}
                  {...register('State', {
                    required: 'Please select state',
                  })}
                />
              ) : (
                <Select
                  placeholder={'Select state/union territory'}
                  // style={{
                  //   backgroundColor: isSameAddress
                  //     ? '#F0F0F0'
                  //     : work_flow_status_id === 3 && getQueryRaised('State')
                  //     ? '#F0F0F0'
                  //     : '',
                  // }}
                  fullWidth
                  error={errors.State?.message}
                  name="State"
                  defaultValue={
                    isSameAddress ? personalDetails?.kyc_address?.state?.id : getValues()?.State
                  }
                  value={
                    isSameAddress ? personalDetails?.kyc_address?.state?.id : getValues()?.State
                  }
                  required={isSameAddress ? false : true}
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('State/Union Territory')
                      : false
                  }
                  {...register(
                    'State',
                    !isSameAddress && {
                      required: 'Please select state/union territory',
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
              )}
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                District
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              {isSameAddress || (work_flow_status_id === 3 && getQueryRaised('District')) ? (
                <TextField
                  variant="outlined"
                  name={'District'}
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('District')
                      : false
                  }
                  // sx={{
                  //   input: {
                  //     backgroundColor: isSameAddress
                  //       ? 'grey2.main'
                  //       : work_flow_status_id === 3 && getQueryRaised('District')
                  //       ? 'grey2.main'
                  //       : '',
                  //   },
                  // }}
                  required={true}
                  error={errors.District?.message}
                  fullWidth
                  value={getDistrictData(getValues()?.District)?.name}
                  {...register('District', {
                    required: 'Please select district',
                  })}
                />
              ) : (
                <Select
                  placeholder={'Select district'}
                  // style={{
                  //   backgroundColor: isSameAddress
                  //     ? '#F0F0F0'
                  //     : work_flow_status_id === 3 && getQueryRaised('District')
                  //     ? '#F0F0F0'
                  //     : '',
                  // }}
                  fullWidth
                  error={errors.District?.message}
                  name="District"
                  defaultValue={
                    isSameAddress
                      ? personalDetails?.kyc_address?.district?.iso_code
                      : getValues()?.District
                  }
                  value={
                    isSameAddress
                      ? personalDetails?.kyc_address?.district?.iso_code
                      : getValues()?.District
                  }
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('District')
                      : false
                  }
                  required={true}
                  {...register('District', {
                    required: 'Please select district',
                  })}
                  options={createSelectFieldData(districtsList, 'iso_code')}
                  MenuProps={{
                    style: {
                      maxHeight: 250,
                      maxWidth: 130,
                    },
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Sub District
              </Typography>
              {isSameAddress || (work_flow_status_id === 3 && getQueryRaised('SubDistrict')) ? (
                <TextField
                  variant="outlined"
                  name={'SubDistrict'}
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('SubDistrict')
                      : false
                  }
                  // sx={{
                  //   input: {
                  //     backgroundColor: isSameAddress
                  //       ? 'grey2.main'
                  //       : work_flow_status_id === 3 && getQueryRaised('SubDistrict')
                  //       ? 'grey2.main'
                  //       : '',
                  //   },
                  // }}
                  fullWidth
                  value={getSubDistrictData(getValues()?.SubDistrict)?.name}
                />
              ) : (
                <Select
                  // style={{
                  //   backgroundColor: isSameAddress
                  //     ? '#F0F0F0'
                  //     : work_flow_status_id === 3 && getQueryRaised('Sub District')
                  //     ? '#F0F0F0'
                  //     : '',
                  // }}
                  fullWidth
                  error={errors.SubDistrict?.message}
                  name="SubDistrict"
                  placeholder="Sub District"
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('Sub District')
                      : false
                  }
                  defaultValue={
                    isSameAddress
                      ? personalDetails?.kyc_address?.sub_district?.iso_code
                      : getValues()?.SubDistrict
                  }
                  value={
                    isSameAddress
                      ? personalDetails?.kyc_address?.sub_district?.iso_code
                      : getValues()?.SubDistrict
                  }
                  {...register('SubDistrict')}
                  options={createSelectFieldData(subDistrictList, 'iso_code')}
                  MenuProps={{
                    style: {
                      maxHeight: 250,
                      maxWidth: 130,
                    },
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                City/Town/Village
              </Typography>
              {isSameAddress ||
              (work_flow_status_id === 3 && getQueryRaised('City/Town/Village')) ? (
                <TextField
                  variant="outlined"
                  name={'Area'}
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('City/Town/Village')
                      : false
                  }
                  // sx={{
                  //   input: {
                  //     backgroundColor: isSameAddress
                  //       ? 'grey2.main'
                  //       : work_flow_status_id === 3 && getQueryRaised('City/Town/Village')
                  //       ? 'grey2.main'
                  //       : '',
                  //   },
                  // }}
                  fullWidth
                  value={getVillageData(getValues()?.Area)?.name}
                />
              ) : (
                <Select
                  placeholder={'Please city/town/village'}
                  // style={{
                  //   backgroundColor: isSameAddress
                  //     ? '#F0F0F0'
                  //     : work_flow_status_id === 3 && getQueryRaised('City/Town/Village')
                  //     ? '#F0F0F0'
                  //     : '',
                  // }}
                  fullWidth
                  name="Area"
                  defaultValue={
                    isSameAddress ? personalDetails?.kyc_address?.village?.id : getValues()?.Area
                  }
                  value={
                    isSameAddress ? personalDetails?.kyc_address?.village?.id : getValues()?.Area
                  }
                  disabled={
                    isSameAddress
                      ? isSameAddress
                      : work_flow_status_id === 3
                      ? getQueryRaised('City/Town/Village')
                      : false
                  }
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
              )}
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="inputTextColor.main">
                Pincode
                {!isSameAddress && (
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                )}
              </Typography>
              <TextField
                variant="outlined"
                name={'PostalCode'}
                placeholder="Pincode"
                required={!isSameAddress ? false : true}
                fullWidth
                // sx={{
                //   backgroundColor: isSameAddress
                //     ? 'grey1.main'
                //     : work_flow_status_id === 3 && getQueryRaised('Pincode')
                //     ? '#F0F0F0'
                //     : '',
                // }}
                defaultValue={
                  isSameAddress ? personalDetails?.kyc_address?.pincode : getValues()?.PostalCode
                }
                disabled={
                  isSameAddress
                    ? isSameAddress
                    : work_flow_status_id === 3
                    ? getQueryRaised('Pincode')
                    : false
                }
                {...register(
                  'PostalCode',
                  !isSameAddress && {
                    required: 'Please enter pincode',
                    onChange: (event) => {
                      const pincode = event.target.value.replace(/[^0-9]/g, '');
                      setValue('PostalCode', pincode);
                    },
                    minLength: {
                      value: 6,
                      message: 'Please enter a valid 6 digit pincode',
                    },
                    maxLength: {
                      value: 6,
                      message: 'Should only contains 6 digits',
                    },
                  }
                )}
                error={!isSameAddress ? errors.PostalCode?.message : ''}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container display="flex" alignItems="center" mt={5}>
          <Grid item xs={12} md="auto">
            <Button
              ref={btnRef}
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
              onClick={handleSubmit(onHandleOptionSave)}
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
                },
              }}
            >
              {t('Save')}
            </Button>
          </Grid>
          <Grid item xs={12} md="auto" display="flex" ml={{ xs: 0, md: 2 }}>
            <Button
              ref={btnRef}
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
