/* eslint-disable no-console */
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { monthsData, yearsData } from '../../../../constants/common-data';
import { doctorTabs } from '../../../../helpers/components/sidebar-drawer-list-item';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import GenericTable from '../../../../shared/generic-component/generic-table';
import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import { getCollegesList, getUniversitiesList } from '../../../../store/actions/common-actions';
import {
  additionalQualificationsData,
  getRegistrationDetailsData,
} from '../../../../store/actions/doctor-user-profile-actions';
import { changeUserActiveTab } from '../../../../store/reducers/common-reducers';
import { Button, Select, TextField, UploadFile } from '../../../../ui/core';

const AdditionalQualifications = () => {
  const {
    countriesList,
    coursesList,
    universitiesList,
    collegesList,
    statesList,
    specialitiesList,
  } = useSelector((state) => state?.common);

  const dispatch = useDispatch();

  const [qualificationFrom, setQualificationFrom] = useState('India');
  const [qualificationFilesData, setQualificationFilesData] = useState([]);
  const [universitiesListData, setUniversitiesListData] = useState(universitiesList?.data);

  const [attachmentViewIndex, setAttachmentViewIndex] = useState();
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [collegesData, setCollegesData] = useState([]);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { qualification_detail_response_tos } = registrationDetails || {};

  const {
    register,
    getValues,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      degree: '',
      state: '',
      collegeName: '',
      university: '',
      year: '',
      month: '',
      broadSpeciality: '',
      speciality: '',

      int_degree: '',
      int_countryName: '',
      int_state: '',
      int_collegeName: '',
      int_university: '',
      int_year: '',
      int_month: '',
      int_broadSpeciality: '',
      int_superSpeciality: '',
    },
  });

  const selectedState = watch('state');
  const watchCollege = watch(`collegeName`);
  const selectedYear = watch(`year`);

  useEffect(() => {
    fetchColleges(selectedState);

    setValue(`university`, null);
    setValue(`collegeName`, null);
    setUniversitiesListData([]);
  }, [selectedState]);

  const customMonthsData = useMemo(() => {
    const date = new Date();
    const fullYear = date.getFullYear();
    const monthIndex = date.getMonth();
    if (selectedYear === `${fullYear}`) {
      return monthsData.slice(0, monthIndex + 1);
    }
    return monthsData;
  }, [selectedYear]);
  const fetchUniversities = (selectedUniversity) => {
    if (selectedUniversity && qualificationFrom !== 'International') {
      dispatch(getUniversitiesList(selectedUniversity)).then((dataResponse) => {
        setUniversitiesListData(dataResponse?.data);
      });
    }
  };

  const menuProps = {
    style: {
      maxHeight: 250,
      maxWidth: 130,
    },
  };

  const handleChange = (event) => {
    setQualificationFrom(event.target.value);
    handleResetForm();
  };

  const getStateData = (stateId) => {
    return statesList?.find((obj) => obj?.id === stateId);
  };

  const getCollege = (collegeId) => {
    const data = collegesList?.data?.find((obj) => obj?.id === collegeId);
    return data;
  };

  const getUniverity = (univerityId) => {
    const data = universitiesList?.data?.find((obj) => obj?.id === univerityId);
    return data;
  };

  const getCourseData = (course) => {
    return coursesList?.data?.find((obj) => obj.id === course);
  };

  const broadSpeciality = (broadSpl) => {
    const specialityobject = specialitiesList?.data?.find((obj) => obj?.id === broadSpl);
    return specialityobject?.id;
  };

  //const { qualification } = getValues();

  const handleOnSubmit = () => {
    const formData = new FormData();
    let qualification_detail_response_tos = [],
      updatedQualificationDetailsArray = [];

    const isInternationalQualification = qualificationFrom === 'International';
    const updatedQualificationDetails = {
      country: isInternationalQualification
        ? countriesList.find((obj) => obj.id === getValues()?.int_countryName)
        : { id: 356, name: 'India' },
      state: isInternationalQualification
        ? { name: getValues()?.int_state }
        : getStateData(getValues()?.state),
      college: isInternationalQualification
        ? { name: getValues()?.int_collegeName }
        : getCollege(getValues()?.collegeName),
      university: isInternationalQualification
        ? { name: getValues()?.int_university }
        : getUniverity(getValues()?.university),
      course: getCourseData(getValues()?.degree),
      qualification_year: getValues()?.int_year,
      qualification_month: isInternationalQualification
        ? getValues()?.int_month
        : getValues()?.month,
      is_name_change: 0,
      is_verified: 0,
      request_id: '',
      broad_speciality_id: isInternationalQualification
        ? broadSpeciality(getValues()?.int_broadSpeciality)
        : broadSpeciality(getValues()?.broadSpeciality),
      super_speciality_name: isInternationalQualification
        ? getValues()?.int_superSpeciality
        : getValues()?.speciality,
      qualification_from: qualificationFrom,
    };
    updatedQualificationDetailsArray.push(updatedQualificationDetails);

    qualification_detail_response_tos = {
      qualification_detail_request_tos: updatedQualificationDetailsArray,
    };

    const doctorRegistrationDetailsJson = JSON.stringify(qualification_detail_response_tos);
    const doctorRegistrationDetailsBlob = new Blob([doctorRegistrationDetailsJson], {
      type: 'application/json',
    });

    formData.append('data', doctorRegistrationDetailsBlob);
    formData.append('degreeCertificates', qualificationFilesData[0]?.file);

    dispatch(additionalQualificationsData(formData, personalDetails?.hp_profile_id))
      .then(() => {
        setSuccessModalPopup(true);
        reset();
      })
      .catch(() => {
        // successToast(
        //   'ERROR: ' + error?.data?.response?.data?.message,
        //   'auth-error',
        //   'error',
        //   'top-center'
        // );
        // update({
        //   qualification: [...qualificationObjTemplate],
        // });
      });
  };

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  const navigateToTrackApplication = () => {
    dispatch(changeUserActiveTab(doctorTabs[1].tabName));
  };

  const handleResetForm = () => {
    reset();
    setValue('speciality', '');
    setValue('int_state', '');
    setValue('int_collegeName', '');
    setValue('int_superSpeciality', '');
    setCollegesData([]);
  };

  const fetchColleges = useCallback(
    (selectedState) => {
      if (selectedState && selectedState !== '' && qualificationFrom !== 'International') {
        dispatch(getCollegesList(selectedState)).then((dataResponse) => {
          setCollegesData(dataResponse.data);
        });
      }
    },
    [dispatch, qualificationFrom]
  );
  useEffect(() => {
    fetchUniversities(watchCollege);
  }, [watchCollege]);

  function createData(
    sr_no,
    degree_name,
    country_name,
    university_name,
    state,
    college_name,
    month_year,
    broad_specialty,
    super_specialty,
    attachments
  ) {
    return {
      sr_no,
      degree_name,
      country_name,
      university_name,
      state,
      college_name,
      month_year,
      broad_specialty,
      super_specialty,
      attachments,
    };
  }

  const dataHeader = [
    { title: 'Sr.no.', name: 'sr_no' },
    { title: 'Degree', name: 'degree_name' },
    { title: 'Country', name: 'country_name' },
    { title: 'University', name: 'university_name' },
    { title: 'State', name: 'state' },
    { title: 'College', name: 'college_name' },
    { title: 'Month & Year', name: 'month_year' },
    // { title: 'Broad Specialty', name: 'broad_specialty' },
    // { title: 'Super Specialty', name: 'super_specialty' },
    { title: 'Attachments', name: 'attachments' },
  ];

  const newRowsData = registrationDetails?.qualification_detail_response_tos?.map((data, index) => {
    return createData(
      {
        type: 'sr_no',
        value: index + 1,
      },
      {
        type: 'degree_name',
        value: data?.course?.course_name,
      },
      {
        type: 'country_name',
        value: data?.country?.name,
      },
      {
        type: 'university_name',
        value: data?.university?.name,
      },
      {
        type: 'state',
        value: data?.state?.name,
      },

      {
        type: 'college_name',
        value: data?.college?.name,
      },
      {
        type: 'month_year',
        value: `${data?.qualification_month} ${data?.qualification_year} `,
      },
      {
        type: 'broad_specialty',
        value: '-',
      },
      {
        type: 'super_specialty',
        value: '-',
      },
      {
        type: 'attachments',
        value: (
          <IconButton>
            <AttachFileIcon
              fontSize="10px"
              onClick={(e) => {
                e.preventDefault();
                setAttachmentViewIndex(index);
                setAttachmentViewProfile(true);
              }}
            />
          </IconButton>
        ),
      }
    );
  });

  useEffect(() => {
    fetchColleges(selectedState);
  }, [selectedState, fetchColleges]);

  useEffect(() => {
    dispatch(getRegistrationDetailsData(personalDetails?.hp_profile_id));
  }, [dispatch]);

  return (
    <Box p={3}>
      {isAddForm ? (
        <>
          <Box mb={1}>
            <FormControl>
              <Typography id="qualification-type-form-label" variant="h3">
                Qualification Degree Completed From
              </Typography>
              <RadioGroup
                name="qualification_type_radio_group"
                value={qualificationFrom}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="India" control={<Radio />} label="India" />
                <FormControlLabel value="International" control={<Radio />} label="International" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={4}>
              <Select
                fullWidth
                required
                name="degree"
                label="Degree Name"
                placeholder={'Select degree'}
                value={getValues()?.degree}
                defaultValue={getValues()?.degree}
                error={errors.degree?.message}
                options={createSelectFieldData(coursesList?.data)}
                {...register('degree', {
                  required: 'Degree is required',
                })}
                MenuProps={menuProps}
              />
            </Grid>
            <Grid item xs={4}>
              {qualificationFrom === 'India' ? (
                <Select
                  fullWidth
                  required
                  name="state"
                  label="State (in which college is located)"
                  placeholder={'Select state'}
                  value={getValues()?.state}
                  error={errors?.state?.message}
                  defaultValue={getValues()?.state}
                  {...register('state', {
                    required: 'State is required',
                  })}
                  options={createSelectFieldData(statesList)}
                  MenuProps={menuProps}
                />
              ) : (
                <Select
                  fullWidth
                  required
                  name="int_countryName"
                  label="Country Name"
                  placeholder={'Select country'}
                  value={getValues()?.int_countryName}
                  defaultValue={getValues()?.int_countryName}
                  error={errors?.int_countryName?.message}
                  {...register('int_countryName', {
                    required: 'Country is required',
                  })}
                  options={
                    countriesList?.length > 0 ? createSelectFieldData(countriesList, 'id') : []
                  }
                  // options={createSelectFieldData(coursesList.data)}
                  MenuProps={menuProps}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              {qualificationFrom === 'India' ? (
                <Select
                  fullWidth
                  required
                  name="collegeName"
                  label="College Name"
                  placeholder={'Select college'}
                  value={getValues()?.collegeName}
                  defaultValue={getValues()?.collegeName}
                  error={errors?.collegeName?.message}
                  {...register('collegeName', {
                    required: 'College is required',
                  })}
                  options={createSelectFieldData(collegesData)}
                  // options={createSelectFieldData(collegesData)}
                  MenuProps={menuProps}
                />
              ) : (
                <TextField
                  fullWidth
                  required
                  name="int_state"
                  label="State (in which college is located)"
                  placeholder={'Enter state'}
                  error={errors?.int_state?.message}
                  {...register('int_state', {
                    required: 'State is required',
                  })}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              {qualificationFrom === 'India' ? (
                <Select
                  fullWidth
                  required
                  name="university"
                  label="University Name"
                  placeholder={'Select university'}
                  value={getValues()?.university}
                  defaultValue={getValues()?.university}
                  error={errors.university?.message}
                  {...register('university', {
                    required: 'University is required',
                  })}
                  // options={createSelectFieldData(coursesList.data)}
                  options={createSelectFieldData(universitiesListData, 'id') || []}
                  MenuProps={menuProps}
                />
              ) : (
                <TextField
                  fullWidth
                  required
                  name="int_collegeName"
                  label="College Name"
                  placeholder={'Enter college'}
                  error={errors?.int_collegeName?.message}
                  {...register('int_collegeName', {
                    required: 'College is required',
                  })}
                />
              )}
            </Grid>
            {qualificationFrom === 'India' ? (
              <Grid container item xs={12} md={6} lg={4} columnSpacing={2}>
                <Typography pl={2} fontWeight="500" color="inputTextColor.main">
                  {`Month & Year of Degree Awarded`}
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
                  <Select
                    required
                    name="month"
                    placeholder={'Select month of awarding1'}
                    value={getValues()?.month}
                    defaultValue={getValues()?.month}
                    error={errors?.month?.message}
                    {...register('month', {
                      required: 'Awarding month is required',
                    })}
                    options={customMonthsData}
                    MenuProps={menuProps}
                    // options={dummyOptions}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    fullWidth
                    required
                    name="int_year"
                    placeholder={'Select year of awarding'}
                    variant="outlined"
                    value={getValues()?.int_year}
                    defaultValue={getValues()?.int_year}
                    error={errors?.int_year?.message}
                    {...register('int_year', {
                      required: 'Awarding year is required',
                      pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                    })}
                    MenuProps={menuProps}
                    options={yearsData}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid item lg={4}>
                {/* <Select
              fullWidth
              required
              name="int_university"
              label="University"
              placeholder={'Select university'}
              value={getValues()?.int_university}
              defaultValue={getValues()?.int_university}
              error={errors?.int_university?.message}
              {...register('int_university', {
                required: 'University is required',
              })}
              MenuProps={menuProps}
              // options={dummyOptions}
              // options={createSelectFieldData(coursesList.data)}
            /> */}
                <TextField
                  fullWidth
                  required
                  name="int_university"
                  label="University Name"
                  placeholder={'Enter university'}
                  error={getValues().int_university === '' && errors?.int_university?.message}
                  {...register('int_university', {
                    required: 'University is required',
                  })}
                />
              </Grid>
            )}

            {qualificationFrom === 'International' ? (
              <Grid container item xs={12} md={6} lg={4} columnSpacing={2}>
                <Typography pl={2} fontWeight="500" color="inputTextColor.main">
                  {`Month & Year of Awarding Degree`}
                  <Typography component="span" color="error.main">
                    *
                  </Typography>
                </Typography>
                <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
                  <Select
                    name="int_month"
                    placeholder={'Select month of awarding'}
                    value={getValues().int_month}
                    defaultValue={getValues().int_month}
                    error={errors?.int_month?.message}
                    {...register('int_month', {
                      required: 'Awarding month is required',
                    })}
                    MenuProps={menuProps}
                    options={monthsData}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    fullWidth
                    required
                    name="int_year"
                    placeholder={'Select year of awarding'}
                    variant="outlined"
                    value={getValues()?.int_year}
                    defaultValue={getValues()?.int_year}
                    error={errors?.int_year?.message}
                    {...register('int_year', {
                      required: 'Awarding year is required',
                      pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                    })}
                    MenuProps={menuProps}
                    options={yearsData}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} md={6} lg={4}>
                <Select
                  fullWidth
                  required
                  name="broadSpeciality"
                  label="Broad Speciality"
                  placeholder={'Select broad speciality'}
                  variant="outlined"
                  value={getValues()?.broadSpeciality}
                  defaultValue={getValues()?.broadSpeciality}
                  error={errors?.broadSpeciality?.message}
                  {...register('broadSpeciality', {
                    required: 'Broad Speciality is required',
                  })}
                  MenuProps={menuProps}
                  options={createSelectFieldData(specialitiesList?.data)}
                />
              </Grid>
            )}

            <Grid item xs={4}>
              {qualificationFrom === 'India' ? (
                <TextField
                  fullWidth
                  name="speciality"
                  label="Super Speciality"
                  placeholder={'Enter super speciality'}
                  error={errors?.speciality?.message}
                  {...register('speciality')}
                />
              ) : (
                <Select
                  fullWidth
                  required
                  name="int_broadSpeciality"
                  label="Broad speciality"
                  placeholder={'Select Broad Speciality'}
                  variant="outlined"
                  value={getValues()?.int_broadSpeciality}
                  defaultValue={getValues()?.int_broadSpeciality}
                  error={errors?.int_broadSpeciality?.message}
                  {...register('int_broadSpeciality', {
                    required: 'Broad Speciality is required',
                    // pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                  })}
                  MenuProps={menuProps}
                  // options={dummyOptions}
                  options={createSelectFieldData(specialitiesList?.data)}
                />
              )}
            </Grid>
            {/* 
            <Grid item xs={4}>
              {qualificationFrom === 'India' ? (
                <TextField
                  fullWidth
                  name="speciality"
                  label="Speciality"
                  placeholder={'Enter Speciality'}
                  error={errors?.speciality?.message}
                  {...register('speciality')}
                />
              ) : (
                <Select
                  fullWidth
                  required
                  name="int_broadSpeciality"
                  label="Broad speciality"
                  placeholder={'Select Broad Speciality'}
                  variant="outlined"
                  value={getValues()?.int_broadSpeciality}
                  defaultValue={getValues()?.int_broadSpeciality}
                  error={errors?.int_broadSpeciality?.message}
                  {...register('int_broadSpeciality', {
                    required: 'Broad Speciality is required',
                    // pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                  })}
                  MenuProps={menuProps}
                  //options={dummyOptions}
                  options={yearsData}
                />
              )}
            </Grid> */}

            {qualificationFrom === 'International' && (
              <Grid item lg={4}>
                <TextField
                  fullWidth
                  name="int_superSpeciality"
                  label="Super Speciality"
                  placeholder={'Enter super speciality'}
                  {...register('int_superSpeciality', {
                    required: 'Super Speciality is required',
                    // pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                  })}
                />
              </Grid>
            )}
          </Grid>
          <UploadFile
            fileID={'qualification'}
            name={'UploadFileName'}
            uploadFiles="single"
            sizeAllowed={5}
            fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
            fileMessage={`PDF, PNG, JPG, JPEG file types are supported.
                 Maximum size allowed is 5MB.`}
            fileData={qualificationFilesData}
            isDigiLockcerVisible={true}
            uploadFileLabel="Upload Qualification Degree"
            setFileData={setQualificationFilesData}
          />
          <Box mt={2}>
            <Button
              variant={'contained'}
              color={'secondary'}
              sx={{ mr: 2 }}
              onClick={handleSubmit(handleOnSubmit)}
            >
              Submit
            </Button>
            <Button variant={'contained'} color={'grey'} onClick={handleResetForm}>
              Cancel
            </Button>
          </Box>
          {successModalPopup && (
            <SuccessModalPopup
              open={successModalPopup}
              setOpen={() => setSuccessModalPopup(false)}
              text={
                'The additional qualification details has been sent for verification. You can check the verification status in the Track Application tab.'
              }
              navigateToTrackApplication={navigateToTrackApplication}
            />
          )}
        </>
      ) : (
        <>
          <Box mt={2} display="flex" width="100%">
            {qualification_detail_response_tos?.length < 8 && (
              <Button
                sx={{ ml: 'auto' }}
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setIsAddForm(true);
                }}
              >
                Add Additional Qualification
              </Button>
            )}
          </Box>
          <Box mt={2}>
            <GenericTable tableHeader={dataHeader} data={newRowsData} />
          </Box>
        </>
      )}
      {attachmentViewProfile && (
        <AttachmentViewPopup
          certificate={qualification_detail_response_tos[attachmentViewIndex]?.degree_certificate}
          closePopup={CloseAttachmentPopup}
          alt={'Qualification Certificate'}
          certFileType={qualification_detail_response_tos[attachmentViewIndex]?.file_type}
        />
      )}
    </Box>
  );
};

export default AdditionalQualifications;
