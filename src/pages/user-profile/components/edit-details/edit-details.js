import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import SearchableDropdown from '../../../../components/autocomplete/searchable-dropdown';
import { RadioGroup, Select, TextField } from '../../../../ui/core';
import MobileNumber from '../../../../ui/core/mobile-number/mobile-number';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

const EditDetails = ({ handleNext }) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      salutation: 'dr',
      AadhaarNumber: '8904-2728-4688',
      FirstName: 'Aarnav',
      MiddleName: '',
      LastName: 'Sharma',
      FatherName: 'Parveen Sharma',
      MotherName: 'Savita Sharma',
      SpouseName: 'Poonam Bala',
      Nationality: 'indian',
      Day: '18',
      Month: 'september',
      Year: '1998',
      Gender: 'male',
      Schedule: 'schedule1',
      Name: 'Aarnav Sharma',
      Address: 'Hno. 560 Row 3 Sadar Bazar, New Delhi',
      Area: 'new delhi',
      District: 'new delhi',
      SubDistrict: '',
      State: 'new delhi',
      Country: 'india',
      PostalCode: '120018',
      IMRID: '9598237230192838',
      YearOfInfo: '',
      RegistrationNumber: '672929',
      mobileNo: '9988334355',
      EmailAddress: 'aarushi.sharma309@gmail.com',
    },
  });
  const onHandleOptionNext = () => {
    getValues();
    handleNext();
  };
  const handleSalutationChange = (event) => {
    setValue(event.target.name, event.target.value, true);
  };
  const handleGender = (event) => {
    setValue(event.target.name, event.target.value, true);
  };

  return (
    <Box boxShadow="0px 1px 3px #00000029" pl={'41px'} pr={'91px'} pb={'44px'}>
      <Grid container spacing={2} mt={2}>
        {/* layer 1 */}
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="grey1.light" p={1}>
              <Typography color="tabHighlightedBackgroundColor.main" variant="h3">
                *Personal Details
              </Typography>
            </Box>
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
              error={errors.salutation}
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
              })}
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
              })}
              sx={{
                input: {
                  backgroundColor: 'grey2.main',
                },
              }}
              InputProps={{ readOnly: true }}
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
                required: 'Middle Name is Required',
              })}
              sx={{
                input: {
                  backgroundColor: 'grey2.main',
                },
              }}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'LastName'}
              placeholder="Your last name"
              label={'Last Name'}
              required={true}
              fullWidth
              defaultValue={getValues().LastName}
              {...register('LastName', {
                required: 'Last Name is Required',
              })}
              sx={{
                input: {
                  backgroundColor: 'grey2.main',
                },
              }}
              InputProps={{ readOnly: true }}
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
              })}
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
              })}
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
              })}
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
            <SearchableDropdown name="LanguageSpoken" items={[{ id: 1, name: 'first' }]} />
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
                  error={errors.Day}
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
                  error={errors.Month}
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
                  error={errors.Year}
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
              error={errors.Gender}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <Select
              fullWidth
              error={errors.Schedule}
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
              ]}
            />
          </Grid>
        </Grid>
        {/* layer 2 */}
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="grey1.light" p={1}>
              <Typography color="tabHighlightedBackgroundColor.main" variant="h3">
                *Communication Address
              </Typography>
            </Box>
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
              })}
            />
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              variant="outlined"
              name={'Address'}
              placeholder="Your address"
              label={'Your Address*'}
              required={true}
              fullWidth
              defaultValue={getValues().Address}
              {...register('Address', {
                required: 'Address is Required',
              })}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.Area}
              name="Area"
              label="City/Town/Village"
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
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.District}
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
              {...register('SubDistrict', {
                required: 'Sub District is required',
              })}
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
              error={errors.State}
              name="State"
              label="State/Union Territory"
              defaultValue={getValues().State}
              required={true}
              {...register('State', {
                required: 'State/Union Territory is required',
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
              error={errors.Country}
              name="Country"
              label="Country"
              defaultValue={getValues().Country}
              required={true}
              {...register('Country', {
                required: 'Country is required',
              })}
              options={[
                {
                  label: 'India',
                  value: 'india',
                },
              ]}
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
              })}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={4}>
            <Box variant="subtitle2" color="inputTextColor.main">
              <TextField
                sx={{ width: '384px', height: '48px' }}
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
                        {!errors.EmailAddress?.message && getValues().EmailAddress.length !== 0 ? (
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
          </Grid>
          <Grid item xs={8}>
            <MobileNumber
              fullWidth={true}
              register={register}
              getValues={getValues}
              required
              errors={errors}
              data-testid={'Mobile-No'}
              label={'Mobile Number'}
              showhint={false}
              defaultValue={getValues().mobileNo}
              {...register('mobileNo')}
            />
          </Grid>
        </Grid>
        {/* layer 3 */}
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="grey1.light" p={1}>
              <Typography color="tabHighlightedBackgroundColor.main" variant="h3">
                *IMR Details
              </Typography>
            </Box>
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
              error={errors.YearOfInfo}
              name="YearOfInfo"
              label="Year of info"
              placeholder="Select year of info"
              defaultValue={getValues().YearOfInfo}
              required={true}
              {...register('YearOfInfo', {
                required: 'Year Of Info is required',
              })}
              options={[
                {
                  label: '-',
                  value: '-',
                },
              ]}
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
      <Box>
        <ButtonGroupWizard
          handleNext={handleSubmit(onHandleOptionNext)}
          labelNext={t('Save & Next')}
          hidePrevious={true}
        />
      </Box>
    </Box>
  );
};

export default EditDetails;
