import { useEffect, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../../../config/debug';
import { monthsData } from '../../../../constants/common-data';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import {
  getCollegesList,
  getCoursesList,
  getUniversitiesList,
} from '../../../../store/actions/menu-list-actions';
import { getDoctorUserProfile } from '../../../../store/reducers/doctor-user-profile-reducer';
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [registrationFileData, setRegistrationFileData] = useState([]);
  const [qualificationFilesData, setQualificationFilesData] = useState({
    'qualification.1.files': [],
  });
  const [qualificationCount, setQualificationCount] = useState(1);
  const [qualificationArray, setQualificationArray] = useState([
    createQualificationObject(qualificationCount),
  ]);
  const [collegeByIndex, setCollegeByIndex] = useState([[]]);
  const { coursesList, universitiesList } = useSelector((state) => state?.menuLists);
  const { doctorUserProfile } = useSelector((state) => state?.doctorUserProfileReducer);
  const { qualification_detail } = doctorUserProfile || {};
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
    const inputValues = getValues();
    const qualificationObj = qualificationArray[0];
    const courseId = inputValues[qualificationObj[0]];
    const collegeId = inputValues[qualificationObj[3]];
    const universityId = inputValues[qualificationObj[4]];
    const qualificationYear = inputValues[qualificationObj[6]];
    const isNameChange = inputValues[qualificationObj[7]];

    const updatedObj = {
      ...qualification_detail[3],
      course: coursesList.data?.find((x) => x.id === courseId),
      university: universitiesList.data?.find((x) => x.id === universityId),
      college: collegeByIndex[0]?.find((x) => x.id === collegeId),
      qualification_year: qualificationYear,
      is_name_change: isNameChange,
    };
    const copy_qualification_detail = [...qualification_detail];

    copy_qualification_detail[3] = { ...updatedObj };
    const stateObj = {
      qualification_detail: [...copy_qualification_detail],
    };

    const updatedDoctorProfile = { ...doctorUserProfile, ...stateObj };
    dispatch(getDoctorUserProfile(JSON.parse(JSON.stringify(updatedDoctorProfile))));

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
    setCollegeByIndex([...collegeByIndex, []]);
    setQualificationCount(count);
  };

  const handleRemoveQualification = (index) => {
    if (qualificationCount === 0) return;
    const newQualificationArray = [...qualificationArray];
    const newCollegeByIndexArray = [...collegeByIndex];
    newQualificationArray.splice(index, 1);
    newCollegeByIndexArray.splice(index, 1);
    setQualificationArray([...newQualificationArray]);
    setCollegeByIndex([...newCollegeByIndexArray]);
  };

  const fetchCourses = () => {
    dispatch(getCoursesList())
      .then((dataResponse) => {
        verboseLog('dataResponse', dataResponse);
      })
      .catch((error) => {
        verboseLog('error occured', error);
      });
  };
  const fetchUniversities = () => {
    dispatch(getUniversitiesList())
      .then((dataResponse) => {
        verboseLog('dataResponse', dataResponse);
      })
      .catch((error) => {
        verboseLog('error occured', error);
      });
  };

  const fetchColleges = (collegeId, index) => {
    if (collegeId) {
      dispatch(getCollegesList(collegeId))
        .then((dataResponse) => {
          collegeByIndex[index] = dataResponse.data;
          setCollegeByIndex([...collegeByIndex]);
          verboseLog('dataResponse', dataResponse);
        })
        .catch((error) => {
          verboseLog('error occured', error);
        });
    }
  };

  // const selectedCollege = watch('college');

  // useEffect(() => {
  //   fetchColleges(selectedCollege);
  // }, [selectedCollege]);

  useEffect(() => {
    fetchCourses();
    fetchUniversities();
  }, []);

  useEffect(() => {
    const { qualification_year, university, course, college, is_name_change } =
      qualification_detail[3];
    const qualificationObj = qualificationArray[0];

    setValue(qualificationObj[0], course?.id);
    setValue(qualificationObj[3], college?.id);
    setValue(qualificationObj[4], university?.id);
    setValue(qualificationObj[6], qualification_year);
    setValue(qualificationObj[7], is_name_change);
    fetchColleges(university?.id, 0);
  }, [qualification_detail]);

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
              <Grid container item spacing={2}>
                <Grid item xs={12} md={4}>
                  {getValues()[qualification[0]] !== undefined && (
                    <Select
                      fullWidth
                      error={errors[qualification[0]]?.message}
                      name="Qualification"
                      label="Name of the degree or diploma obtained"
                      defaultValue={getValues()[qualification[0]]}
                      required={true}
                      {...register(qualification[0], {
                        required: 'degree or diploma is required',
                      })}
                      options={createSelectFieldData(coursesList.data)}
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
                  <TextField
                    variant="outlined"
                    name={'country'}
                    label={'Country name'}
                    required={true}
                    fullWidth
                    error={errors[qualification[1]]?.message}
                    defaultValue={getValues()[qualification[1]]}
                    {...register(qualification[1], {
                      required: 'country is Required',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    variant="outlined"
                    name={'state'}
                    // placeholder="Your state"
                    label={'State (in which college is located)'}
                    fullWidth
                    required={true}
                    defaultValue={getValues()[qualification[2]]}
                    {...register(qualification[2], {
                      required: 'State is Required',
                    })}
                    error={errors[qualification[2]]?.message}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={12} md={4}>
                  {getValues()[qualification[3]] !== undefined && (
                    <Select
                      fullWidth
                      error={errors[qualification[3]]?.message}
                      name="College"
                      label="Name of the college"
                      defaultValue={getValues()[qualification[3]]}
                      required={true}
                      {...register(qualification[3], {
                        required: 'college is required',
                      })}
                      options={createSelectFieldData(collegeByIndex[index])}
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
                  {getValues()[qualification[4]] !== undefined && (
                    <Select
                      fullWidth
                      error={errors[qualification[4]]?.message}
                      name="University"
                      label="University"
                      defaultValue={getValues()[qualification[4]]}
                      required={true}
                      {...register(qualification[4], {
                        required: 'University is required',
                        onChange: (e) => {
                          fetchColleges(e.target.value, index);
                        },
                      })}
                      options={createSelectFieldData(universitiesList.data)}
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
                  <Select
                    fullWidth
                    error={errors[qualification[5]]?.message}
                    name="Month"
                    label="Month of awarding Degree/Diploma"
                    defaultValue={getValues()[qualification[5]]}
                    {...register(qualification[5], {
                      required: 'awarding is required',
                    })}
                    options={monthsData}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    variant="outlined"
                    name={'Year'}
                    label={'Year of awarding Degree/Diploma'}
                    required={true}
                    placeHolder={'Year of awarding'}
                    fullWidth
                    error={errors[qualification[6]]?.message}
                    defaultValue={getValues()[qualification[6]]}
                    {...register(qualification[6], {
                      required: 'awarding is Required',
                    })}
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
                        <Typography color="text.primary">{t('Upload the Degree')}</Typography>
                        <Typography color="error"> *</Typography>
                      </>
                    }
                    fileData={qualificationFilesData[qualification[8]] || []}
                    setFileData={(files) => {
                      handleQualificationFilesData(qualification[8], files);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {getValues()[qualification[7]] !== undefined && (
                    <RadioGroup
                      onChange={handleRegistration}
                      name={qualification[7]}
                      size="small"
                      defaultValue={getValues()[qualification[7]]}
                      items={[
                        {
                          value: 1,
                          label: 'Yes',
                        },
                        {
                          value: 0,
                          label: 'No',
                        },
                      ]}
                      label="Is your name in degree, different from your name in Aadhaar?"
                      required={true}
                      error={errors[qualification[7]]?.message}
                    />
                  )}
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
