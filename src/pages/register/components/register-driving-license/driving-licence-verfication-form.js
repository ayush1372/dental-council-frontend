import { useState } from 'react';

import { Box, Divider, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { daysData, monthsData, yearsData } from '../../../../constants/common-data';
import { Button, Checkbox, RadioGroup, Select, TextField } from '../../../../ui/core';
// import DialogBox from '../../../../ui/core/dialog-box/dialog-box';
import UploadFile from '../../../../ui/core/fileupload/fileupload';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

import styles from '../../sub-pages/register-driving-licence/register-driving-licence.module.scss';

export function DrivingLicenceVerfication({ onNext }) {
  const { t } = useTranslation();
  const [isVerified, SetIsVerified] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      DrivingLicenceNumber: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Day: '',
      Month: '',
      Year: '',
      District: '',
      State: '',
      Address: '',
    },
  });

  const onHandleSubmit = () => {
    onNext();
  };

  const onHandleVerify = () => {
    SetIsVerified(true);
  };

  return (
    <div className={styles.main} data-testid="driving-licence-verfication">
      <Box>
        <Box
          sx={{
            p: 2,
            mt: 1,
            borderRadius: 2,
          }}
        >
          <Typography variant="caption">
            <Box sx={{ fontSize: 'large' }}>
              <Typography variant="h6">
                <b>{t('verify_your_driving_licence')}</b>
              </Typography>
            </Box>
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <TextField
                  label={t('Mobile Number')}
                  fullWidth={true}
                  disabled
                  name="MobileNumber"
                  defaultValue={'1234567890'}
                  placeholder={t('Mobile Number')}
                  register={register}
                />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box>
                <TextField
                  required
                  label={t('Driving Licence Number')}
                  fullWidth
                  name={'DrivingLicenceNumber'}
                  placeholder={t('Driving Licence Number')}
                  defaultValue={getValues().DrivingLicenceNumber}
                  error={errors.DrivingLicenceNumber?.message}
                  {...register('DrivingLicenceNumber', {
                    required: 'Driving Licence Number is required',
                  })}
                />
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Grid container spacing={3} sx={{ pt: 2 }}>
              <Grid item xs={4}>
                <Box>
                  <TextField
                    fullWidth
                    required
                    label={t('First Name')}
                    name={'FirstName'}
                    placeholder={t('First Name')}
                    defaultValue={getValues().FirstName}
                    error={errors.FirstName?.message}
                    {...register('FirstName', {
                      required: 'First Name is required',
                    })}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <TextField
                    fullWidth
                    label={t('Middle Name')}
                    name={'MiddleName'}
                    placeholder={t('Middle Name')}
                    defaultValue={getValues().MiddleName}
                    {...register('MiddleName')}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <TextField
                    fullWidth
                    label={t('Last Name')}
                    name={'LastName'}
                    placeholder={t('Last Name')}
                    defaultValue={getValues().LastName}
                    {...register('LastName')}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={3} sx={{ pt: 2 }}>
              <Grid item xs={4}>
                <Box>
                  <Select
                    fullWidth
                    error={errors.Day?.message}
                    defaultValue={getValues().Day}
                    name="Day"
                    {...register('Day', {
                      required: 'Day is required',
                    })}
                    options={daysData}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Select
                    fullWidth
                    error={errors.Month?.message}
                    name="Month"
                    defaultValue={getValues().Month}
                    {...register('Month', {
                      required: 'Month is required',
                    })}
                    options={monthsData}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Select
                    fullWidth
                    error={errors.Year?.message}
                    name="Year"
                    defaultValue={getValues().Year}
                    {...register('Year', {
                      required: 'Year is required',
                    })}
                    options={yearsData}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box>
                  <RadioGroup
                    name={'gender'}
                    row={true}
                    label={'Gender'}
                    defaultValue={getValues().gender}
                    {...register('gender', {
                      required: 'Gender is required',
                    })}
                    items={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ]}
                    error={errors.gender?.message}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* <DialogBox
            isOpen={true}
            title={'Enrollment Number already exists'}
            content={
              'ABHA number linked to this Driving Licence already exists. Login to your ABHA number Account to continue.'
            }
            buttonName={'Go to Homepage'}
          /> */}
          {!isVerified && (
            <Box align="right">
              <Button variant="contained" color="secondary" onClick={handleSubmit(onHandleVerify)}>
                {'Verify'}
              </Button>
            </Box>
          )}
        </Box>

        {isVerified && (
          <Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box>
                    <TextField
                      label={t('Address')}
                      required
                      fullWidth
                      name={'Address'}
                      placeholder={t('Address')}
                      defaultValue={getValues().Address}
                      error={errors.Address?.message}
                      {...register('Address', {
                        required: 'Address is required',
                      })}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="caption">
                      <Box sx={{ fontSize: 'medium' }}>
                        <Typography>
                          Upload your Driving Licence Frontside Photo * (Max upload file size:150
                          KB, Type: jpg/png)
                        </Typography>
                      </Box>
                    </Typography>
                    <UploadFile />
                  </Box>
                  <Box>
                    <Typography variant="caption">
                      <Box>
                        <Box sx={{ fontSize: 'medium', mt: 2 }}>
                          <Typography>
                            Upload your Driving Licence Backside Photo * (Max upload file size:150
                            KB, Type: jpg/png)
                          </Typography>
                        </Box>
                      </Box>
                    </Typography>
                    <UploadFile />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box>
                    <TextField
                      label={t('State')}
                      required
                      fullWidth
                      name={'State'}
                      placeholder={t('State')}
                      defaultValue={getValues().State}
                      error={errors.State?.message}
                      {...register('State', {
                        required: 'State is required',
                      })}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <TextField
                      label={t('District')}
                      fullWidth={true}
                      name={'District'}
                      placeholder={t('District')}
                      defaultValue={getValues().District}
                      {...register('District')}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Checkbox
                    name={'dlVerfiyDeclaration'}
                    {...register('dlVerfiyDeclaration', {
                      required: true,
                    })}
                    label={
                      'I hereby declare that I have not created another ABHA number to the best of my knowledge.'
                    }
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} align="right">
                  <ButtonGroupWizard
                    handleNext={handleSubmit(onHandleSubmit)}
                    labelNext={t('Next')}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default DrivingLicenceVerfication;
