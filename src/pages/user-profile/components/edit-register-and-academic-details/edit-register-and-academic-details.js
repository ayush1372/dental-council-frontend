import { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// import SearchableDropdown from '../../../../components/autocomplete/searchable-dropdown';
import { Button, RadioGroup, Select, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

const EditRegisterAndAcademicDetails = ({ handleNext, handleBack }) => {
  const [registrationFileData, setRegistrationFileData] = useState([]);
  const [qualificationFileData, setQualificationFileData] = useState([]);
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
      RegisteredWithCouncil: 'West Bengal Medical Council',
      RegistrationNumber: '7991749871719',
      RegistrationDate: '30-10-2021',
      registration: 'permanent',
      RenewalDate: '30-10-2022',
      registrationCertificate: 'yes',
      Qualification: 'bachelor of dental surgery',
      country: 'India',
      state: 'New Delhi',
      college: 'Care Dental College',
      University: 'Dr. NTR University of Health sciences',
      Month: 'November',
      Year: '2016',
      nameinDegree: 'no',
    },
  });

  const onHandleOptionNext = () => {
    handleNext();
  };
  const onHandleOptionBack = () => {
    handleBack();
  };
  const handleRegistration = (event) => {
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
                *Registration Details
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'RegisteredWithCouncil'}
              label={'Registered with council'}
              required={true}
              fullWidth
              defaultValue={getValues().RegisteredWithCouncil}
              {...register('RegisteredWithCouncil', {
                required: 'Registered with council is Required',
              })}
              error={errors?.RegisteredWithCouncil?.message}
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
              name={'RegistrationNumber'}
              label={'Registration Number'}
              required={true}
              fullWidth
              defaultValue={getValues().RegistrationNumber}
              {...register('RegistrationNumber', {
                required: 'Registration Number is Required',
              })}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'RegistrationDate'}
              label={'Registration Date(if available)'}
              required={true}
              fullWidth
              defaultValue={getValues().RegistrationDate}
              {...register('RegistrationDate', {
                required: 'Registration Date is Required',
              })}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <RadioGroup
              onChange={handleRegistration}
              name={'registration'}
              size="small"
              defaultValue={getValues().registration}
              items={[
                {
                  value: 'permanent',
                  label: 'Permanent',
                },
                {
                  value: 'renewable',
                  label: 'Renewable',
                },
              ]}
              label="Is this registration permanent for renewable?"
              required={true}
              error={errors.registration?.message}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'RenewalDate'}
              label={'Due Date of Renewal'}
              required={true}
              fullWidth
              defaultValue={getValues().RenewalDate}
              {...register('RenewalDate', {
                required: 'Registration Date is Required',
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
            <RadioGroup
              onChange={handleRegistration}
              name={'registrationCertificate'}
              size="small"
              defaultValue={getValues().registrationCertificate}
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
              label="Is your name in registration certificate, different from your name in Aadhaar?*"
              required={true}
              error={errors.registrationCertificate?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={6}>
            <UploadFile
              uploadFiles="single"
              sizeAllowed={1}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png']}
              fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
               Maximum size allowed for the attachment is 5MB.`}
              label={
                <>
                  <Typography color="text.primary">{t('upload_proof_of_relationship')}</Typography>
                  <Typography color="error"> *</Typography>
                </>
              }
              fileData={registrationFileData}
              setFileData={setRegistrationFileData}
            />
          </Grid>
        </Grid>
        {/*layer 2*/}
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="grey1.light" p={1}>
              <Typography color="tabHighlightedBackgroundColor.main" variant="h3">
                *Qualification Details
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.Qualification?.message}
              name="Qualification"
              label="Name of the degree or diploma obtained*"
              defaultValue={getValues().Qualification}
              required={true}
              {...register('Qualification', {
                required: 'degree or diploma is required',
              })}
              options={[
                {
                  label: 'Bachelor of Dental surgery',
                  value: 'bachelor of dental surgery',
                },
              ]}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'country'}
              label={'Country name'}
              required={true}
              fullWidth
              error={errors.country?.message}
              defaultValue={getValues().country}
              {...register('country', {
                required: 'country is Required',
              })}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'state'}
              // placeholder="Your state"
              label={'State (in which college is located)'}
              fullWidth
              required={true}
              defaultValue={getValues().state}
              {...register('state')}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.college?.message}
              name="college"
              label="Name of the college"
              defaultValue={getValues().college}
              required={true}
              {...register('college', {
                required: 'college is required',
              })}
              options={[
                {
                  label: 'Care Dental Collegey',
                  value: 'care Dental College',
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.University?.message}
              name="University"
              label="University"
              defaultValue={getValues().University}
              required={true}
              {...register('University', {
                required: 'University is required',
              })}
              options={[
                {
                  label: 'Dr. NTR University of Health sciences',
                  value: 'Dr. NTR University of Health sciences',
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              error={errors.Month?.message}
              name="Month"
              label="Month of awarding Degree/Diploma"
              defaultValue={getValues().Month}
              {...register('Month', {
                required: 'awarding is required',
              })}
              options={[
                {
                  label: 'november',
                  value: 'November',
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <TextField
              variant="outlined"
              name={'Year'}
              label={'Year of awarding Degree/Diploma*'}
              required={true}
              placeHolder={'Year of awarding'}
              fullWidth
              error={errors.Year?.message}
              defaultValue={getValues().Year}
              {...register('Year', {
                required: 'awarding is Required',
              })}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={6}>
            <UploadFile
              uploadFiles="single"
              sizeAllowed={1}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png']}
              fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
               Maximum size allowed for the attachment is 5MB.`}
              label={
                <>
                  <Typography color="text.primary">{t('Upload the Degree')}</Typography>
                  <Typography color="error"> *</Typography>
                </>
              }
              fileData={qualificationFileData}
              setFileData={setQualificationFileData}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <RadioGroup
              onChange={handleRegistration}
              name={'nameinDegree'}
              size="small"
              defaultValue={getValues().nameinDegree}
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
              label="Is your name in degree, different from your name in Aadhaar?"
              required={true}
              error={errors.nameinDegree?.message}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <Button variant="outlined" color="primary">
          Add Additional Qualification
        </Button>
        <br />
        <Typography variant="body4" color="messageBlue.main" display="flex" alignItems="center">
          <InfoOutlinedIcon fontSize="18px" />
          Add upto 6 qualification
        </Typography>
      </Box>
      <Box>
        <ButtonGroupWizard
          handleNext={handleSubmit(onHandleOptionNext)}
          handlePrevious={onHandleOptionBack}
          labelNext={t('Save & Next')}
          labelPrevious={t('Back')}
          // hidePrevious={false}
        />
      </Box>
    </Box>
  );
};

export default EditRegisterAndAcademicDetails;
