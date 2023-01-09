import { useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, RadioGroup, Select, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

const createQualificationObject = (index) => {
  return [
    `qualification-${index}-Qualification`,
    `qualification-${index}-country`,
    `qualification-${index}-state`,
    `qualification-${index}-college`,
    `qualification-${index}-University`,
    `qualification-${index}-Month`,
    `qualification-${index}-Year`,
    `qualification-${index}-nameinDegree`,
    `qualification-${index}-files`,
  ];
};

const EditRegisterAndAcademicDetails = ({ handleNext, handleBack, loggedInUserType }) => {
  const [registrationFileData, setRegistrationFileData] = useState([]);
  const [qualificationFilesData, setQualificationFilesData] = useState({
    'qualification.1.files': [],
  });
  const [qualificationCount, setQualificationCount] = useState(1);
  const [qualificationArray, setQualificationArray] = useState([
    createQualificationObject(qualificationCount),
  ]);
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
      RegisteredWithCouncil: loggedInUserType === 'SMC' ? '' : 'West Bengal Medical Council',
      RegistrationNumber: loggedInUserType === 'SMC' ? '' : '7991749871719',
      RegistrationDate: loggedInUserType === 'SMC' ? '' : '30-10-2021',
      registration: loggedInUserType === 'SMC' ? '' : 'permanent',
      RenewalDate: loggedInUserType === 'SMC' ? '' : '30-10-2022',
      registrationCertificate: 'No',
      // Qualification: 'bachelor of dental surgery',
      // country: 'India',
      // state: 'New Delhi',
      // college: 'Care Dental College',
      // University: 'Dr. NTR University of Health sciences',
      // Month: 'November',
      // Year: '2016',
      // nameinDegree: 'no',
    },
  });

  const onHandleOptionNext = () => {
    handleNext();
  };
  const handleQualificationFilesData = (fileName, files) => {
    qualificationFilesData[fileName] = files;
    setQualificationFilesData({ ...qualificationFilesData });
  };

  const onHandleOptionBack = () => {
    handleBack();
  };
  const handleRegistration = (event) => {
    setValue(event.target.name, event.target.value, true);
  };
  const handleAddQualification = () => {
    if (qualificationArray.length >= 6) return;
    const count = qualificationCount + 1;
    const newQualificationArray = [...qualificationArray, createQualificationObject(count)];
    setQualificationArray(newQualificationArray);
    setQualificationCount(count);
  };

  const handleRemoveQualification = (index) => {
    if (qualificationCount === 0) return;
    const newQualificationArray = [...qualificationArray];
    newQualificationArray.splice(index, 1);
    setQualificationArray([...newQualificationArray]);
  };

  return (
    <Box
      boxShadow={1}
      sx={{
        padding: {
          xs: '0px 10px 10px 10px',
          md: '0px 91px 44px 41px',
        },
      }}
    >
      <Grid container spacing={2} mt={2}>
        {/* layer 1 */}
        <Grid container item spacing={2} mt={1}>
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
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registered With Council
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'RegisteredWithCouncil'}
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
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registration Number
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              variant="outlined"
              name={'RegistrationNumber'}
              Registration
              Number
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
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Registration Date(if available)
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'RegistrationDate'}
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
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Is registration permanent for renewable?
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
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
              required={true}
              error={errors.registration?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Due Date of Renewal
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <TextField
              variant="outlined"
              name={'RenewalDate'}
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
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Is your name in registration certificate, different from your name in Aadhaar?
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

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
              required={true}
              error={errors.registrationCertificate?.message}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="inputTextColor.main" mb={1}>
              Upload the registration certificate
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>

            <UploadFile
              uploadFiles="single"
              sizeAllowed={1}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png']}
              fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
               Maximum size allowed for the attachment is 5MB.`}
              fileData={registrationFileData}
              setFileData={setRegistrationFileData}
            />
          </Grid>
        </Grid>
        {/*layer 2*/}
        <Grid container item spacing={2} mt={1}>
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
        {qualificationArray.map((qualification, index) => {
          const showDeleteIcon = index > 0;
          return (
            <>
              {showDeleteIcon && (
                <Grid container item spacing={2} display="flex" alignItems="center">
                  <Divider width="97%" />
                  <CancelIcon
                    color="secondary"
                    fontSize="large"
                    onClick={() => {
                      handleRemoveQualification(index);
                    }}
                  />
                </Grid>
              )}
              <Grid container item spacing={2} mt={1}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="inputTextColor.main">
                    Name of the Degree or Diploma Obtained
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>

                  <Select
                    fullWidth
                    error={errors[qualification[0]]?.message}
                    name="Qualification"
                    defaultValue={getValues()[qualification[0]]}
                    required={true}
                    {...register(qualification[0], {
                      required: 'Degree or Diploma is required',
                    })}
                    options={[
                      {
                        label: 'Bachelor of Dental surgery',
                        value: 'bachelor of dental surgery',
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="inputTextColor.main">
                    Country Name
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>

                  <TextField
                    variant="outlined"
                    name={'country'}
                    label={''}
                    required={true}
                    fullWidth
                    error={errors[qualification[1]]?.message}
                    defaultValue={getValues()[qualification[1]]}
                    {...register(qualification[1], {
                      required: 'Country is required',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="inputTextColor.main">
                    State (in which college is located)
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>

                  <TextField
                    variant="outlined"
                    name={'state'}
                    // placeholder="Your state"
                    label={''}
                    fullWidth
                    required={true}
                    defaultValue={getValues()[qualification[2]]}
                    {...register(qualification[2], {
                      required: 'State is required',
                    })}
                    error={errors[qualification[2]]?.message}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={2} mt={1}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="inputTextColor.main">
                    Name of the college
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>

                  <Select
                    fullWidth
                    error={errors[qualification[3]]?.message}
                    name="College"
                    defaultValue={getValues()[qualification[3]]}
                    required={true}
                    {...register(qualification[3], {
                      required: 'College is required',
                    })}
                    options={[
                      {
                        label: 'Care Dental College',
                        value: 'care Dental College',
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="inputTextColor.main">
                    University
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>

                  <Select
                    fullWidth
                    error={errors[qualification[4]]?.message}
                    name="University"
                    defaultValue={getValues()[qualification[4]]}
                    required={true}
                    {...register(qualification[4], {
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
                <Grid item xs={12} md={4}>
                  <Select
                    fullWidth
                    error={errors[qualification[5]]?.message}
                    name="Month"
                    label="Month of awarding Degree/Diploma"
                    defaultValue={getValues()[qualification[5]]}
                    {...register(qualification[5], {
                      required: 'Awarding is required',
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
              <Grid container item spacing={2} mt={1}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="inputTextColor.main">
                    Year of Awarding Degree/Diploma
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>

                  <TextField
                    variant="outlined"
                    name={'Year'}
                    required={true}
                    placeHolder={'Year of awarding'}
                    fullWidth
                    error={errors[qualification[6]]?.message}
                    defaultValue={getValues()[qualification[6]]}
                    {...register(qualification[6], {
                      required: 'Awarding is required',
                    })}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="inputTextColor.main" mb={1}>
                    Upload the Degree
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>

                  <UploadFile
                    uploadFiles="single"
                    sizeAllowed={1}
                    fileTypes={['image/jpg', 'image/jpeg', 'image/png']}
                    fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
                 Maximum size allowed for the attachment is 5MB.`}
                    fileData={qualificationFilesData[qualification[8]] || []}
                    setFileData={(files) => {
                      handleQualificationFilesData(qualification[8], files);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} mt={1}>
                  <Typography variant="subtitle2" color="inputTextColor.main" mb={1}>
                    Is your name in degree, different from your name in Aadhaar?
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>
                  <RadioGroup
                    onChange={handleRegistration}
                    name={qualification[7]}
                    size="small"
                    defaultValue={getValues()[qualification[7]]}
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
                    required={true}
                    error={errors[qualification[7]]?.message}
                  />
                </Grid>
              </Grid>
            </>
          );
        })}
      </Grid>
      {false && (
        <Box width="100%">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddQualification}
            disabled={qualificationArray.length >= 6}
          >
            Add Additional Qualification
          </Button>
          <br />
          <Typography variant="body4" color="messageBlue.main" display="flex" alignItems="center">
            <InfoOutlinedIcon fontSize="18px" />
            Add upto 6 qualification
          </Typography>
        </Box>
      )}
      <Box width="100%">
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
