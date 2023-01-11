import { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Grid, IconButton, InputAdornment, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../../../config/debug';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { get_year_data } from '../../../../helpers/functions/common-functions';
import { AutoComplete } from '../../../../shared/autocomplete/searchable-autocomplete';
import { ModalOTP } from '../../../../shared/otp-modal/otp-modal';
import { getDistrictList, getSubDistrictsList } from '../../../../store/actions/menu-list-actions';
import { RadioGroup, Select, TextField } from '../../../../ui/core';
import MobileNumber from '../../../../ui/core/mobile-number/mobile-number';

const EditPersonalDetails = ({ handleNext, setIsReadMode }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state?.login?.loggedInUserType);
  const { statesList, countriesList, districtsList, subDistrictList } = useSelector(
    (state) => state?.menuLists
  );

  const [languages, setLanguages] = useState([]);
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
      salutation: loggedInUserType === 'SMC' ? '' : 'dr',
      AadhaarNumber: loggedInUserType === 'SMC' ? '' : '8904-2728-4688',
      FirstName: loggedInUserType === 'SMC' ? '' : 'Aarnav',
      MiddleName: loggedInUserType === 'SMC' ? '' : 'Your Middle Name',
      LastName: loggedInUserType === 'SMC' ? '' : 'Sharma',
      FatherName: loggedInUserType === 'SMC' ? '' : 'Parveen Sharma',
      MotherName: loggedInUserType === 'SMC' ? '' : 'Savita Sharma',
      SpouseName: loggedInUserType === 'SMC' ? '' : 'Poonam Bala',
      Nationality: loggedInUserType === 'SMC' ? '' : 'indian',
      Day: loggedInUserType === 'SMC' ? '' : '18',
      Month: loggedInUserType === 'SMC' ? '' : 'september',
      Year: loggedInUserType === 'SMC' ? '' : '1998',
      Gender: loggedInUserType === 'SMC' ? '' : 'male',
      Schedule: loggedInUserType === 'SMC' ? '' : 'schedule1',
      Name: loggedInUserType === 'SMC' ? '' : 'Aarnav Sharma',
      Address: loggedInUserType === 'SMC' ? '' : 'Hno. 560 Row 3 Sadar Bazar, New Delhi',
      Area: loggedInUserType === 'SMC' ? '' : 'new delhi',
      District: loggedInUserType === 'SMC' ? '' : '',
      SubDistrict: '',
      State: loggedInUserType === 'SMC' ? '' : '',
      Country: loggedInUserType === 'SMC' ? '' : 356,
      PostalCode: loggedInUserType === 'SMC' ? '' : '120018',
      IMRID: loggedInUserType === 'SMC' ? '' : '9598237230192838',
      YearOfInfo: '1996',
      RegistrationNumber: loggedInUserType === 'SMC' ? '' : '672929',
      mobileNo: loggedInUserType === 'SMC' ? '' : '9988334355',
      EmailAddress: loggedInUserType === 'SMC' ? '' : 'aarushi.sharma309@gmail.com',
      LanguageSpoken: [],
    },
  });

  const fetchDistricts = (stateId) => {
    if (stateId) {
      dispatch(getDistrictList(stateId))
        .then((dataResponse) => {
          verboseLog('dataResponse', dataResponse);
        })
        .catch((error) => {
          verboseLog('error occured', error);
        });
    }
  };

  const selectedState = watch('State');
  useEffect(() => {
    fetchDistricts(selectedState);
  }, [selectedState]);

  const fetchSubDistricts = (districtId) => {
    if (districtId) {
      dispatch(getSubDistrictsList(districtId))
        .then((dataResponse) => {
          verboseLog('dataResponse', dataResponse);
        })
        .catch((error) => {
          verboseLog('error occured', error);
        });
    }
  };

  const selectedDistrict = watch('District');

  useEffect(() => {
    fetchSubDistricts(selectedDistrict);
  }, [selectedDistrict]);

  const { otpPopup, handleClickOpen, otpVerified } = ModalOTP({ afterConfirm: () => {} });

  const handleBackButton = () => {
    setIsReadMode(true);
  };

  const onHandleOptionNext = () => {
    handleNext();
  };
  const handleSalutationChange = (event) => {
    setValue(event.target.name, event.target.value, true);
  };
  const handleGender = (event) => {
    setValue(event.target.name, event.target.value, true);
  };

  const handleLanguageSpokenChange = (name, value) => {
    setValue(name, value, true);
    setLanguages([...value]);
  };

  // if(countriesList) {

  // }
  // const countryIndia = countriesList?.filter(function (item) {
  //   return item.name === 'India';
  // });

  return (
    <Box
      boxShadow={1}
      sx={{
        padding: {
          xs: '0px 10px 10px 10px',
          md: '0px 41px 44px 41px',
        },
      }}
    >
      <Grid container spacing={2} mt={2}>
        {/* layer 1 */}
        <Grid container item spacing={2}>
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
          <Grid item xs={12} md={4} lg={12}>
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
                defaultValue={getValues().salutation}
                items={[
                  {
                    value: 'dr',
                    label: 'Dr.',
                  },
                  {
                    value: 'mr',
                    label: 'Mr.',
                  },
                  {
                    value: 'mrs',
                    label: 'Mrs.',
                  },
                  {
                    value: 'do_not_specify',
                    label: 'Do not specify',
                  },
                ]}
                required={true}
                error={errors.salutation?.message}
              />
            </Grid>
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
              First Name
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'FirstName'}
              placeholder="Your first name"
              required={true}
              fullWidth
              defaultValue={getValues().FirstName}
              {...register('FirstName', {
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
              error={errors.FirstName?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color="inputTextColor.main" variant="body1">
              Middle Name
            </Typography>
            <TextField
              variant="outlined"
              name={'MiddleName'}
              placeholder=""
              fullWidth
              defaultValue={getValues().MiddleName}
              {...register('MiddleName', {
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
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Last Name
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'LastName'}
              placeholder="Your last name"
              fullWidth
              defaultValue={getValues().LastName}
              {...register('LastName', {
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
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
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
        </Grid>
        <Grid container item spacing={2} mt={1}>
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
              options={[
                {
                  label: 'Indian',
                  value: 'indian',
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" color="inputTextColor.main">
              Language Spoken
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <AutoComplete
              name="LanguageSpoken"
              options={[
                { id: 1, name: 'Telugu' },
                { id: 2, name: 'Hindi' },
                { id: 3, name: 'English' },
                { id: 4, name: 'Marathi' },
                { id: 5, name: 'Kannada' },
              ]}
              value={getValues().LanguageSpoken}
              error={languages.length === 0 && errors.LanguageSpoken?.message}
              multiple={true}
              {...register('LanguageSpoken', {
                required: 'Missing field',
              })}
              onChange={(value) => {
                handleLanguageSpokenChange('LanguageSpoken', value);
              }}
            />
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
            <Grid container item spacing={2}>
              <Grid item xs={8} md={3}>
                <Select
                  error={errors.Day?.message}
                  name="Day"
                  defaultValue={getValues().Day}
                  required={true}
                  {...register('Day', {
                    required: 'Day is required',
                  })}
                  options={[
                    {
                      label: '18',
                      value: '18',
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={8} md={5}>
                <Select
                  error={errors.Month?.message}
                  name="Month"
                  defaultValue={getValues().Month}
                  required={true}
                  {...register('Month', {
                    required: 'Month is required',
                  })}
                  options={[
                    {
                      label: 'September',
                      value: 'september',
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={8} md={4}>
                <Select
                  error={errors.Year?.message}
                  name="Year"
                  defaultValue={getValues().Year}
                  required={true}
                  {...register('Year', {
                    required: 'Year is required',
                  })}
                  options={[
                    {
                      label: '1998',
                      value: '1998',
                    },
                  ]}
                />
              </Grid>
            </Grid>
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
              options={[
                {
                  label: 'Schedule 1',
                  value: 'schedule1',
                },
                {
                  label: 'Schedule 2',
                  value: 'schedule2',
                },
                {
                  label: 'Schedule 3',
                  value: 'schedule3',
                },
              ]}
            />
          </Grid>
        </Grid>

        {/* layer 2 */}
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
          <Grid item xs={12} md={4}>
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
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Your Address
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'Address'}
              placeholder="Your address"
              required={true}
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
              options={[
                {
                  label: 'New Delhi',
                  value: 'new delhi',
                },
              ]}
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
              options={createSelectFieldData(districtsList)}
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
              {...register('SubDistrict')}
              options={createSelectFieldData(subDistrictList)}
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
                countriesList.length > 0
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
              Pin Code
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
        <Grid container item spacing={2} mt={1}>
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
                          getValues().EmailAddress.length !== 0 &&
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
        </Grid>
      </Grid>

      <Grid container display="flex" justifyContent="space-between" alignItems="center" mt={5}>
        <Grid item xs={12} md={8} lg={6}>
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
        <Grid item xs={12} md="auto" display="flex" justifyContent="end" lg={4}>
          <Button
            onClick={handleSubmit}
            size="medium"
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
        <Grid item xs={12} md="auto" display="flex" justifyContent="end" lg={2}>
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
    </Box>
  );
};

export default EditPersonalDetails;
