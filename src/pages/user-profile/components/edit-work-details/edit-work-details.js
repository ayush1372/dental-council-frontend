import { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, RadioGroup, Select, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';

const EditWorkDetails = ({ handleNext, handleBack }) => {
  const { t } = useTranslation();
  const [workProof, setWorkProof] = useState([]);
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  //   const { otpPopup, handleClickOpen, otpVerified } = ModalOTP({ afterConfirm: () => {} });

  const handleBackButton = () => {
    handleBack();
  };

  const onHandleOptionNext = () => {
    handleNext();
  };
  const handleCurrentlyWorking = (event) => {
    setValue(event.target.name, event.target.value, true);
  };

  const handleWorkStatus = (event) => {
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
                Speciality Details*
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} md={4}>
            <Select
              fullWidth
              error={errors.Speciality?.message}
              name="Speciality"
              label="Speciality"
              defaultValue={getValues().Speciality}
              required={true}
              {...register('Speciality', {
                required: 'Speciality is required',
              })}
              options={[
                {
                  label: 'Docter',
                  value: 'docter',
                },
              ]}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'subSpeciality'}
              label={'Sub Speciality'}
              required={true}
              fullWidth
              defaultValue={getValues().subSpeciality}
              {...register('subSpeciality')}
            />
          </Grid>
        </Grid>
        {/* layer 2 */}
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="grey1.light" p={1}>
              <Typography color="tabHighlightedBackgroundColor.main" variant="h3">
                Work Details*
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} md={4}>
            <RadioGroup
              onChange={handleCurrentlyWorking}
              name={'currentlyWorking'}
              size="small"
              defaultValue={getValues().currentlyWorking}
              items={[
                {
                  value: 'yes',
                  label: 'Yes',
                },
                {
                  value: 'no',
                  label: 'No',
                },
              ]}
              label="Are you currently working"
              required={true}
              error={errors.currentlyWorking?.message}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <Select
              fullWidth
              error={errors.NatureOfWork?.message}
              name="NatureOfWork"
              label="Nature of work"
              defaultValue={getValues().NatureOfWork}
              required={true}
              placeholder={'Nature Of Work'}
              {...register('NatureOfWork', {
                required: 'Nature Of Work is required',
              })}
              options={[
                {
                  label: 'NatureOfWork',
                  value: 'NatureOfWork',
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={8}>
            <RadioGroup
              onChange={handleWorkStatus}
              name={'workStatus'}
              size="small"
              defaultValue={getValues().workStatus}
              items={[
                {
                  value: 'government_only',
                  label: 'Government only',
                },
                {
                  value: 'private_practice',
                  label: 'Private Practice only',
                },
                {
                  value: 'both',
                  label: 'Both',
                },
              ]}
              label="Choose work status"
              required={true}
              error={errors.workStatus?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={6}>
            <UploadFile
              uploadFiles="single"
              sizeAllowed={1}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png']}
              fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
               Maximum size allowed for the attachment is 5MB.`}
              label={
                <>
                  <Typography color="text.primary">
                    {t(
                      'Upload the Proof of work for govt. such as Appointment letter, Last pay slip, recent transfer order etc.*'
                    )}
                  </Typography>
                  <Typography color="error"> *</Typography>
                </>
              }
              fileData={workProof}
              setFileData={setWorkProof}
            />
          </Grid>
          <Grid item xs={8} md={2} display="flex" alignItems="center">
            <Typography variant="body1" color="inputTextColor.main" textAlign="center">
              OR
            </Typography>
          </Grid>
          <Grid item xs={8} md={4} display="flex" alignItems="center">
            <Button color="primary" variant="outlined" startIcon={<InfoOutlinedIcon />}>
              Pull from Digilocker
            </Button>
          </Grid>
        </Grid>
        {/* layer 3 */}
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="grey1.light" p={1}>
              <Typography color="tabHighlightedBackgroundColor.main" variant="h3">
                Current Work Details*
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} md={4}>
            <Box>
              <Typography variant="body1" color="primary">
                Choose facility{' '}
                <Typography variant="body1" color="error">
                  *
                </Typography>
              </Typography>
            </Box>
            <Checkbox
              name={'facility'}
              {...register('facility', {
                required: 'Facility is required',
              })}
              label={'Facility'}
              error={errors.facility?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={6} md={4}>
            <TextField
              variant="outlined"
              name={'state'}
              label={'State'}
              fullWidth
              placeholder="Select State"
              defaultValue={getValues().state}
              {...register('state')}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <Select
              fullWidth
              error={errors.District?.message}
              name="District"
              label="District"
              defaultValue={getValues().District}
              required={true}
              {...register('District', {
                required: 'District* is required',
              })}
              options={[
                {
                  label: 'Telangana',
                  value: 'telangana',
                },
              ]}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              variant="outlined"
              name={'workingOrganizationName'}
              label={'Name of the Organization where you work'}
              required={true}
              placeholder="Name of the organization"
              fullWidth
              defaultValue={getValues().workingOrganizationName}
              {...register('workingOrganizationName', {
                maxLength: {
                  value: 300,
                  message: 'Length should be less than 300.',
                },
              })}
              error={errors.workingOrganizationName?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={6} md={4}>
            <TextField
              variant="outlined"
              name={'organizationType'}
              label={'Organization Type'}
              fullWidth
              placeholder="Select Organization Type"
              defaultValue={getValues().organizationType}
              {...register('organizationType', {
                maxLength: {
                  value: 100,
                  message: 'organizationType Is Reuired.',
                },
              })}
              error={errors.organizationType?.message}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              variant="outlined"
              name={'Department'}
              label={'Department'}
              fullWidth
              placeholder="Department"
              defaultValue={getValues().Department}
              {...register('Department', {
                maxLength: {
                  value: 300,
                  message: 'Department Is Reuired.',
                },
              })}
              error={errors.Department?.message}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              variant="outlined"
              name={'telecommunicationURL'}
              label={'Telecommunication URL'}
              required={true}
              placeholder="Telecommunication URL"
              fullWidth
              defaultValue={getValues().telecommunicationURL}
              {...register('telecommunicationURL', {
                required: 'Telecommunication URL is required',
              })}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={6} md={4}>
            <TextField
              variant="outlined"
              name={'Address'}
              label={'Address'}
              required={true}
              fullWidth
              placeholder="Address"
              defaultValue={getValues().Address}
              {...register('Address', {
                maxLength: {
                  value: 300,
                  message: 'Address Is Reuired.',
                },
              })}
              error={errors.Address?.message}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              variant="outlined"
              name={'Pincode'}
              label={'Pincode'}
              required={true}
              placeholder="Pincode"
              fullWidth
              defaultValue={getValues().Pincode}
              {...register('Pincode', {
                required: 'PinCode is Required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Should only contains 6 digits',
                },
              })}
              error={errors.PinCode?.message}
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

export default EditWorkDetails;
