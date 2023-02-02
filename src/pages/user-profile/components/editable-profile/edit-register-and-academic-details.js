import { useEffect, useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { updateRegistrationAndAcademicDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Button, RadioGroup, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';
import EditQualificationDetails from './edit-qualification-details';

const qualificationObjTemplate = [
  {
    qualification: '',
    country: '',
    state: '',
    college: '',
    university: '',
    month: '',
    year: '',
    nameindegree: '',
    files: '',
    qualificationfrom: '',
  },
];

const EditRegisterAndAcademicDetails = ({ handleNext, handleBack, loggedInUserType }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [registrationFileData, setRegistrationFileData] = useState([]);
  const [qualificationFilesData, setQualificationFilesData] = useState({
    'qualification0.files': [],
  });
  const { countriesList, coursesList, universitiesList, statesList } = useSelector(
    (state) => state?.common
  );
  const { registrationAndAcademicDetails } = useSelector(
    (state) => state?.doctorUserProfileReducer
  );
  const { qualification_detail_response_tos } = registrationAndAcademicDetails || {};
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    unregister,
    setValue,
    control,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      RegisteredWithCouncil: loggedInUserType === 'SMC' ? '' : 'West Bengal Medical Council',
      RegistrationNumber: loggedInUserType === 'SMC' ? '' : '7991749871719',
      RegistrationDate: loggedInUserType === 'SMC' ? '' : '30-10-2021',
      registration: loggedInUserType === 'SMC' ? '' : 'permanent',
      RenewalDate: loggedInUserType === 'SMC' ? '' : '30-10-2022',
      registrationCertificate: 'No',
      qualification: [...qualificationObjTemplate],
    },
  });

  const { fields, update } = useFieldArray({
    control,
    name: 'qualification',
  });

  const onHandleOptionNext = () => {
    // this below code is storing qualification details
    const { qualification } = getValues();
    let updatedObj = [];
    if (qualification?.length > 0) {
      updatedObj = qualification?.map((q) => ({
        country: countriesList.find((x) => x.id === q?.country),
        course: coursesList.data?.find((x) => x.id === q?.qualification),
        university: universitiesList.data?.find((x) => x.id === q?.university),
        state: statesList?.find((x) => x.id === q?.state),
        college: q?.collegeObj,
        qualification_year: q?.year,
        is_name_change: q?.nameindegree,
        qualification_month: q?.month,
        qualification_from: q?.qualificationfrom,
      }));
    }

    const cloneObj = { ...registrationAndAcademicDetails };
    cloneObj.qualification_detail_response_tos = updatedObj;
    dispatch(updateRegistrationAndAcademicDetails(JSON.parse(JSON.stringify(cloneObj))));

    handleNext();
  };

  const handleQualificationFilesData = (fileName, files) => {
    qualificationFilesData[fileName] = files;
    setQualificationFilesData({ ...qualificationFilesData });
  };

  const handleBackButton = () => {
    handleBack();
  };

  const handleRegistration = (event) => {
    setValue(event.target.name, event.target.value, true);
  };

  useEffect(() => {
    const details = qualification_detail_response_tos[0];
    const obj = { ...qualificationObjTemplate[0] };
    obj.university = details.university?.id;
    obj.qualification = details.course?.id;
    obj.college = details.college?.id;
    obj.year = details.qualification_year;
    obj.country = details.country?.id;
    obj.state = details.state?.id;
    obj.qualificationfrom = details.qualification_from;
    obj.month = details.qualification_month;
    obj.nameindegree = details.is_name_change;

    update(0, { ...obj });
  }, [qualification_detail_response_tos]);

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
              Registration Details*
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
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
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              InputProps={{ readOnly: loggedInUserType === 'SMC' ? false : true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
              sx={{
                input: {
                  backgroundColor: 'grey2.main',
                },
              }}
              InputProps={{ readOnly: true }}
              error={errors?.RegistrationNumber?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
              sx={{
                input: {
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              InputProps={{ readOnly: loggedInUserType === 'SMC' ? false : true }}
              error={errors?.RegistrationDate?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
                  backgroundColor: loggedInUserType === 'SMC' ? '' : 'grey2.main',
                },
              }}
              InputProps={{ readOnly: loggedInUserType === 'SMC' ? false : true }}
              error={errors.RenewalDate?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} md={4}>
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
              label="Is your name in registration certificate, different from your name in Aadhaar?"
              required={true}
              error={errors.registrationCertificate?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} md={6}>
            <UploadFile
              uploadFiles="single"
              sizeAllowed={1}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png']}
              fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
               Maximum size allowed for the attachment is 5MB.`}
              label={
                <>
                  <Typography color="text.primary">
                    {t('upload_the_registration_certificate')}
                  </Typography>

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
            <Typography
              bgcolor="grey1.light"
              p={1}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Qualification Details*
            </Typography>
          </Grid>
        </Grid>
        {fields.map((qualification, index) => {
          const showDeleteIcon = index > 0;
          return (
            <EditQualificationDetails
              key={qualification.id}
              index={index}
              showDeleteIcon={showDeleteIcon}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              fields={fields}
              watch={watch}
              register={register}
              unregister={unregister}
              qualificationFilesData={qualificationFilesData}
              handleQualificationFilesData={handleQualificationFilesData}
              update={update}
            />
          );
        })}
      </Grid>
      {false && (
        <Box width="100%">
          <Button variant="outlined" color="primary">
            Add Additional Qualification
          </Button>
          <br />
          <Typography variant="body4" color="messageBlue.main" display="flex" alignItems="center">
            <InfoOutlinedIcon fontSize="18px" />
            Add upto 6 qualification
          </Typography>
        </Box>
      )}

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
                height: '52px',
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

export default EditRegisterAndAcademicDetails;
