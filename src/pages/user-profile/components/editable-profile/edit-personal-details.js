import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { get_year_data } from '../../../../helpers/functions/common-functions';
import { AutoComplete } from '../../../../shared/autocomplete/searchable-autocomplete';
import { ModalOTP } from '../../../../shared/otp-modal/otp-modal';
import { RadioGroup, Select, TextField } from '../../../../ui/core';
import MobileNumber from '../../../../ui/core/mobile-number/mobile-number';

const EditPersonalDetails = ({ handleNext, setIsReadMode }) => {
  const { t } = useTranslation();
  const loggedInUserType = useSelector((state) => state?.login?.loggedInUserType);
  const { statesList } = useSelector((state) => state?.menuLists);
  const { citiesList } = useSelector((state) => state?.cityList);

  const [languages, setLanguages] = useState([]);
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      salutation: loggedInUserType === 'SMC' ? '' : 'dr',
      AadhaarNumber: loggedInUserType === 'SMC' ? '' : '8904-2728-4688',
      FirstName: loggedInUserType === 'SMC' ? '' : 'Aarnav',
      MiddleName: '',
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
      District: loggedInUserType === 'SMC' ? '' : 'new delhi',
      SubDistrict: '',
      State: loggedInUserType === 'SMC' ? '' : '',
      Country: loggedInUserType === 'SMC' ? '' : 'India',
      PostalCode: loggedInUserType === 'SMC' ? '' : '120018',
      IMRID: loggedInUserType === 'SMC' ? '' : '9598237230192838',
      YearOfInfo: '',
      RegistrationNumber: loggedInUserType === 'SMC' ? '' : '672929',
      mobileNo: loggedInUserType === 'SMC' ? '' : '9988334355',
      EmailAddress: loggedInUserType === 'SMC' ? '' : 'aarushi.sharma309@gmail.com',
      LanguageSpoken: [],
    },
  });

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

  return (
    <Box boxShadow={1} padding="0px 91px 44px 41px">
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
          <Grid item xs={8} md={4}>
            <RadioGroup
              onChange={handleSalutationChange}
              name={'salutation'}
              size="small"
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
              label="Salutation"
              required={true}
              error={errors.salutation?.message}
            />
          </Grid>
          <Grid item xs={8} md={4}>
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
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'FirstName'}
              placeholder="Your first name"
              label={'First Name'}
              required={true}
              fullWidth
              defaultValue={getValues().FirstName}
              {...register('FirstName', {
                required: 'First Name is Required',
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
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'MiddleName'}
              placeholder="Your middle name"
              label={'Middle Name'}
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
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'LastName'}
              placeholder="Your last name"
              label={'Last Name'}
              required={false}
              fullWidth
              defaultValue={getValues().LastName}
              {...register('LastName', {
                required: 'Last Name is Required',
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'FatherName'}
              placeholder="Your father name"
              label={'Father Name'}
              fullWidth
              defaultValue={getValues().FatherName}
              {...register('FatherName', {
                required: 'Father Name is Required',
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.FatherName?.message}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'MotherName'}
              placeholder="Your mother name"
              label={'Mother Name'}
              fullWidth
              defaultValue={getValues().MotherName}
              {...register('MotherName', {
                required: 'Mother Name is Required',
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.MotherName?.message}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'SpouseName'}
              placeholder="Your spouse name"
              label={'Spouse Name'}
              fullWidth
              defaultValue={getValues().SpouseName}
              {...register('SpouseName', {
                required: 'Spouse Name is Required',
                maxLength: {
                  value: 100,
                  message: 'Length should be less than 100.',
                },
              })}
              error={errors.SpouseName?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <Select
              fullWidth
              error={errors.Nationality?.message}
              name="Nationality"
              label="Select Nationality"
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
          <Grid item xs={8} md={8}>
            <Typography variant="body1">
              Language Spoken{' '}
              <Typography
                variant="body4"
                sx={{
                  color: 'error.main',
                }}
              >
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
                required: 'Languages Are Required',
              })}
              onChange={(value) => {
                handleLanguageSpokenChange('LanguageSpoken', value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <Typography variant="body1">
              Date of Birth
              <Typography
                variant="body4"
                sx={{
                  color: 'error.main',
                }}
              >
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
          <Grid item xs={8} md={4}>
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
              label="Gender"
              required={true}
              error={errors.Gender?.message}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <Select
              fullWidth
              error={errors.Schedule?.message}
              name="Schedule"
              label="Schedule"
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
        <Grid container item spacing={2}>
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
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'Name'}
              placeholder="Your name"
              label={'Your Name'}
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
          <Grid item xs={8} md={8}>
            <TextField
              variant="outlined"
              name={'Address'}
              placeholder="Your address"
              label={'Your Address'}
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
        <Grid container item spacing={2}>
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.Area?.message}
              name="Area"
              label="City/Town/Village"
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
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.District?.message}
              name="District"
              label="District"
              defaultValue={getValues().District}
              required={true}
              {...register('District', {
                required: 'District is required',
              })}
              options={[
                {
                  label: 'New Delhi',
                  value: 'new delhi',
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.Nationality?.message}
              name="SubDistrict"
              label="Sub District"
              placeholder="Sub District"
              defaultValue={getValues().SubDistrict}
              {...register('SubDistrict')}
              options={[
                {
                  label: '-',
                  value: '-',
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.State?.message}
              name="State"
              label="State/Union Territory"
              defaultValue={getValues().State}
              required={true}
              {...register('State', {
                required: 'State/Union Territory is required',
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
          <Grid item xs={4}>
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
              options={[
                {
                  label: 'India',
                  value: 'India',
                },
              ]}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              name={'PostalCode'}
              placeholder="Your postal code"
              label={'Postal Code'}
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
        <Grid container item spacing={2}>
          <Grid item xs={6}>
            <Box display="flex" alignItems="end">
              <Box width="100%">
                <TextField
                  sx={{ width: '100%' }}
                  label="Email Address"
                  type="text"
                  name="EmailAddress"
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
                <Button onClick={handleClickOpen} variant="contained" color="primary">
                  {t('GetOTP')}{' '}
                </Button>
              </Box>
              {otpPopup}
            </Box>
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={6}>
            <MobileNumber
              register={register}
              getValues={getValues}
              required
              errors={errors}
              data-testid={'Mobile-No'}
              label={'Mobile Number'}
              showhint={false}
              defaultValue={getValues().mobileNo}
              {...register('mobileNo')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" sx={{ marginRight: '-13px', height: '57px' }}>
                      GetOTP
                    </Button>
                  </InputAdornment>
                ),
              }}
              showVerify
              verifyOnClick={handleClickOpen}
            />
          </Grid>
        </Grid>
        {/* layer 3 */}
        <Grid container item spacing={2}>
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
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'IMRID'}
              placeholder="Your IMR ID"
              label={'IMR ID'}
              required={true}
              fullWidth
              defaultValue={getValues().IMRID}
              {...register('IMRID', {
                required: 'IMR ID is Required',
              })}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <Select
              fullWidth
              error={errors.YearOfInfo?.message}
              name="YearOfInfo"
              label="Year of info"
              placeholder="Select year of info"
              defaultValue={getValues().YearOfInfo}
              required={true}
              {...register('YearOfInfo', {
                required: 'Year Of Info is required',
              })}
              options={get_year_data(1930)}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'RegistrationNumber'}
              placeholder="Your registration number"
              label={'Registration Number'}
              required={true}
              fullWidth
              defaultValue={getValues().RegistrationNumber}
              {...register('RegistrationNumber', {
                required: 'Registration Number is Required',
              })}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
        <Box>
          <Button onClick={handleBackButton} color="grey" variant="contained">
            {t('Back')}
          </Button>
        </Box>
        <Box>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            color="secondary"
            sx={{
              marginRight: '10px',
            }}
          >
            {t('Save')}
          </Button>
          <Button onClick={handleSubmit(onHandleOptionNext)} variant="contained" color="secondary">
            {t('Save & Next')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPersonalDetails;
