/* eslint-disable no-console */
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReportIcon from '@mui/icons-material/Report';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { verboseLog } from '../../../../config/debug';
import { field_names, monthsData, yearsData } from '../../../../constants/common-data';
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
  const theme = useTheme();

  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  const [universitiesListData, setUniversitiesListData] = useState(universitiesList?.data);
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);
  const [qualificationFilesData, setQualificationFilesData] = useState([]);
  const [qualificationFrom, setQualificationFrom] = useState('India');
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  const [attachmentViewIndex, setAttachmentViewIndex] = useState();
  const [collegesData, setCollegesData] = useState([]);
  const [queryfields, setQueryFields] = useState([]);
  const [fieldComments, setFieldComments] = useState([]);
  const [isAddForm, setIsAddForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [deleteUploadedFile, setDeleteUploadedFile] = useState(false);
  const [editData, setEditData] = useState({});

  const { qualification_detail_response_tos } = registrationDetails || {};

  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
    handleSubmit,
    watch,
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

      int_countryName: '',
      int_state: '',
      int_collegeName: '',
      int_university: '',
      int_year: '',
      int_month: '',
      int_broadSpeciality: '',
      int_superSpeciality: '',

      registrationCertificate: [],
    },
  });

  const selectedDegree = watch('degree');
  const selectedState = watch('state');
  const watchCollege = watch('collegeName');
  const selectedYear = watch('year');

  watch([
    'degree',
    'university',
    'month',
    'broadSpeciality',
    'speciality',
    'int_countryName',
    'int_state',
    'int_collegeName',
    'int_university',
    'int_year',
    'int_month',
    'int_broadSpeciality',
    'int_superSpeciality',
  ]);

  const menuProps = {
    style: {
      maxHeight: 250,
      maxWidth: 130,
    },
  };

  const customMonthsData = useMemo(() => {
    const date = new Date();
    const fullYear = date.getFullYear();
    const monthIndex = date.getMonth();
    if (selectedYear === `${fullYear}` || editData?.qualification_year === `${fullYear}`) {
      return monthsData.slice(0, monthIndex + 1);
    }
    return monthsData;
  }, [selectedYear, editData]);

  const getStateData = (stateId) => {
    return statesList?.find((obj) => obj?.id === stateId);
  };

  const getCollege = (collegeId) => {
    const data = collegesList?.data?.find((obj) => obj?.id === collegeId);
    return data;
  };

  const getUniversity = (univerityId) => {
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

  const handleChange = (event) => {
    setQualificationFrom(event.target.value);
    handleResetForm();
  };

  const handleOnSubmit = () => {
    const formData = new FormData();
    let qualification_detail_response_tos = [],
      updatedQualificationDetailsArray = [];

    const isInternationalQualification = qualificationFrom === 'International';
    const updatedQualificationDetails = {
      id: isEditForm ? editData?.id : null,
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
        : getUniversity(getValues()?.university),
      course: getCourseData(getValues()?.degree),
      qualification_year: getValues()?.year || getValues()?.int_year,
      qualification_month: isInternationalQualification
        ? getValues()?.int_month
        : getValues()?.month,
      is_name_change: 0,
      is_verified: 0,
      request_id: isEditForm && editData?.request_id,
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
    formData.append(
      'degreeCertificates',
      qualificationFilesData[0]?.file
        ? qualificationFilesData[0]?.file
        : !deleteUploadedFile && editData?.degree_certificate
    );

    dispatch(
      additionalQualificationsData(formData, personalDetails?.hp_profile_id, isEditForm)
    ).then(() => {
      setSuccessModalPopup(true);
      reset();
    });
    return true;
  };

  const handleResetForm = () => {
    reset();
    setValue('speciality', '');
    setValue('int_state', '');
    setValue('int_collegeName', '');
    setValue('int_superSpeciality', '');
    setCollegesData([]);

    setQualificationFilesData([]);
  };

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  const navigateToTrackApplication = () => {
    dispatch(changeUserActiveTab(doctorTabs[1].tabName));
  };

  // Table Methods
  function createData(
    sr_no,
    requestID,
    degree_name,
    country_name,
    university_name,
    state,
    college_name,
    month_year,
    // broad_specialty,
    // super_specialty,
    attachments,
    // isEditable
    status
  ) {
    return {
      sr_no,
      requestID,
      degree_name,
      country_name,
      university_name,
      state,
      college_name,
      month_year,
      // broad_specialty,
      // super_specialty,
      attachments,
      // isEditable,
      status,
    };
  }

  const dataHeader = [
    { title: 'Sr.no.', name: 'sr_no' },
    { title: 'Request ID', name: 'requestID' },
    { title: 'Degree', name: 'degree_name' },
    { title: 'Country', name: 'country_name' },
    { title: 'University', name: 'university_name' },
    { title: 'State', name: 'state' },
    { title: 'College', name: 'college_name' },
    { title: 'Month & Year', name: 'month_year' },
    // { title: 'Broad Specialty', name: 'broad_specialty' },
    // { title: 'Super Specialty', name: 'super_specialty' },
    { title: 'Attachments', name: 'attachments' },
    { title: 'Status', name: 'status' },
    // { title: 'Action', name: 'isEditable' },
  ];

  const newRowsData = registrationDetails?.qualification_detail_response_tos
    ?.slice(1)
    .map((data, index) => {
      return createData(
        {
          type: 'sr_no',
          value: index + 1,
        },
        {
          type: 'requestId',
          value:
            data?.queries?.length > 0 ? (
              <Link
                color={'secondary.main'}
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
                onClick={() => {
                  console.log(data);
                  setEditFormValues(data);

                  setEditData(data);
                  console.log(editData);
                }}
              >
                {data?.request_id}
              </Link>
            ) : (
              data?.request_id
            ),
          tooltipText: data?.request_id,
        },
        {
          type: 'degree_name',
          value:
            data?.queries?.length > 0 ? (
              <Box>
                {data?.course?.course_name}
                {data?.queries?.map((item) => {
                  return (
                    item?.field_name?.toUpperCase().toString() === field_names.degree && (
                      <Typography>
                        <ReportOutlinedIcon
                          fontSize="inherit"
                          sx={{ ml: 2, color: theme.palette.secondary.main }}
                        />
                      </Typography>
                      // item?.common_comment
                    )
                  );
                })}
              </Box>
            ) : (
              data?.course?.course_name
            ),
          tooltipText: data?.course?.course_name,
        },
        {
          type: 'country_name',
          value:
            data?.queries?.length > 0 ? (
              <Box>
                {data?.country?.name}
                {data?.queries?.map((item) => {
                  return (
                    item?.field_name?.toUpperCase().toString() === field_names.country && (
                      <Typography>
                        <ReportOutlinedIcon
                          fontSize="inherit"
                          sx={{ ml: 2, color: theme.palette.secondary.main }}
                        />
                      </Typography>
                      // item?.common_comment
                    )
                  );
                })}
              </Box>
            ) : (
              data?.country?.name
            ),
          tooltipText: data?.country?.name,

          // (
          //   <Box>
          //     <Link
          //   color={'secondary.main'}
          //   sx={{ textDecoration: 'none', cursor: 'pointer' }}
          //   onClick={() => {
          //     console.log(data);
          //     setEditFormValues(data);
          //     setIsEditForm(true);
          //     setEditData(setEditData);
          //     console.log(editData);
          //   }}
          // >
          //   {data?.course?.course_name}
          // </Link>
          //     {data?.queries?.length > 0 &&
          //       data?.queries?.map((item) => {
          //         return (
          //           item?.field_name?.toUpperCase().toString() === field_names.degree && (
          //             <Typography>
          //               <ReportOutlinedIcon
          //                 fontSize="inherit"
          //                 sx={{ ml: 2, color: theme.palette.secondary.main }}
          //               />
          //             </Typography>
          //             // item?.common_comment
          //           )
          //         );
          //       })}
          //   </Box>
          // ),
        },
        {
          type: 'university_name',
          value: (
            <Box>
              <Typography>{data?.university?.name}</Typography>
              {data?.queries?.length > 0 &&
                data?.queries?.map((item) => {
                  return (
                    item?.field_name?.toUpperCase().toString() === field_names.university && (
                      <Typography>
                        <ReportOutlinedIcon
                          fontSize="inherit"
                          sx={{ ml: 1, color: theme.palette.secondary.main }}
                        />
                      </Typography>
                      // item?.common_comment
                    )
                  );
                })}
            </Box>
          ),
          // (),
        },
        {
          type: 'state',
          value: (
            <Box>
              <Typography mr={1}>{data?.state?.name}</Typography>
              {data?.queries?.length > 0 &&
                data?.queries?.map((item) => {
                  return (
                    item?.field_name?.toUpperCase().toString() === field_names.state && (
                      <Typography component={'span'}>
                        {' '}
                        <ReportOutlinedIcon
                          fontSize="inherit"
                          sx={{ color: theme.palette.secondary.main }}
                        />
                      </Typography>
                      // item?.common_comment
                    )
                  );
                })}
            </Box>
          ),
        },

        {
          type: 'college_name',
          value: (
            <Box>
              <Typography mr={1}>{data?.college?.name}</Typography>
              {data?.queries?.length > 0 &&
                data?.queries?.map((item) => {
                  return (
                    item?.field_name?.toUpperCase().toString() === field_names.college && (
                      <Typography component={'span'}>
                        {' '}
                        <ReportOutlinedIcon
                          fontSize="inherit"
                          sx={{ color: theme.palette.secondary.main }}
                        />
                      </Typography>
                      // item?.common_comment
                    )
                  );
                })}
            </Box>
          ),
        },
        {
          type: 'month_year',
          value:
            data?.queries?.length > 0 ? (
              <Box>
                {`${data?.qualification_month} ${data?.qualification_year} `}
                {data?.queries?.map((item) => {
                  return (
                    item?.field_name?.toUpperCase().toString() === field_names.monthAwarded && (
                      <Typography>
                        <ReportOutlinedIcon
                          fontSize="inherit"
                          sx={{ ml: 2, color: theme.palette.secondary.main }}
                        />
                      </Typography>
                      // item?.common_comment
                    )
                  );
                })}
              </Box>
            ) : (
              `${data?.qualification_month} ${data?.qualification_year} `
            ),
          tooltipText: `${data?.qualification_month} ${data?.qualification_year} `,
        },
        // {
        //   type: 'broad_specialty',
        //   value: '-',
        // },
        // {
        //   type: 'super_specialty',
        //   value: '-',
        // },
        {
          type: 'attachments',
          isIcon: true,
          iconToolTip: 'View Attachment',
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
        },
        {
          type: 'status',

          value:
            data?.queries?.length <= 0 && data?.is_verified === 1 ? (
              <Typography varaint={'body1'} color={'success.main'}>
                {'Approved'}
              </Typography>
            ) : data?.queries?.length > 0 && data?.is_verified === 0 ? (
              <Typography varaint={'body1'} color={'secondary.main'}>
                {'Query Raised'}
              </Typography>
            ) : (
              <Typography varaint={'body1'} color={'primary.main'}>
                {'Pending'}
              </Typography>
            ),
        }
        // {
        //   type: 'isEditable',
        //   isIcon: true,
        //   iconToolTip: 'Edit Qualification',
        //   value: (
        //     <IconButton>
        //       <EditOutlinedIcon
        //         fontSize="10px"
        //         color={'secondary'}
        //         onClick={() => {
        //           console.log(data);
        //           setEditFormValues(data);
        //           setIsEditForm(true);
        //           setEditData(setEditData);
        //           console.log(editData);
        //         }}
        //       />
        //     </IconButton>
        //   ),
        // }
      );
    });

  const setQueryFieldNames = (fields) => {
    let result = fields.map((item) => {
      verboseLog('fieldComments', item);

      return Object.keys(item)[0].toUpperCase();
    });
    setQueryFields(result);
  };

  const setEditFormValues = (editData) => {
    verboseLog('EditData->', editData);

    let fieldData = editData?.queries?.map((item) => {
      return { [item?.field_name]: item?.query_comment };
    });

    setQueryFieldNames(fieldData);
    setFieldComments(fieldData);

    setValue('degree', editData?.course?.id);

    if (editData?.qualification_from.toUpperCase() === 'INDIA') {
      setQualificationFrom('India');
      setValue('state', getStateData(editData?.state?.id)?.id);
      setValue('collegeName', editData?.college?.id);
      setValue('university', editData?.university?.id);
      setValue('year', editData?.qualification_year);
      setValue('month', editData?.qualification_month);
      setValue('broadSpeciality', editData?.brod_speciality?.id);
      setValue('speciality', editData?.super_speciality);
    } else if (editData?.qualification_from.toUpperCase() === 'INTERNATIONAL') {
      setQualificationFrom('International');

      setValue('int_countryName', editData?.country?.id);
      setValue('int_state', editData?.state?.name);
      setValue('int_collegeName', editData?.college?.name);
      setValue('int_university', editData?.university?.name);
      setValue('int_year', editData?.qualification_year);
      setValue('int_month', editData?.qualification_month);
      setValue('int_broadSpeciality', editData?.brod_speciality?.id);
      setValue('int_superSpeciality', editData?.super_speciality);

      // setQualificationFilesData(editData?.degree_certificate);
    } else {
      setQualificationFrom('India');
    }
    setIsEditForm(true);
  };

  // Table Methods Ends

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

  const fetchUniversities = (selectedUniversity) => {
    if (selectedUniversity && qualificationFrom !== 'International') {
      dispatch(getUniversitiesList(selectedUniversity)).then((dataResponse) => {
        setUniversitiesListData(dataResponse?.data);
      });
    }
  };

  const getQueryTooltip = (queryfieldName) => {
    let result = fieldComments?.find((item) => {
      return Object.keys(item)[0].toUpperCase() === queryfieldName && Object.values(item)[0];
    });
    return result !== undefined ? Object.values(result) : '';
  };

  useEffect(() => {
    !isAddForm && dispatch(getRegistrationDetailsData(personalDetails?.hp_profile_id));
  }, [dispatch, isAddForm, personalDetails]);

  useEffect(() => {
    fetchColleges(selectedState);
    setValue('degree', isEditForm ? getValues()?.degree : selectedDegree);
    setValue('university', isEditForm ? getValues()?.university : null);
    setValue('collegeName', isEditForm ? getValues()?.collegeName : null);
    setUniversitiesListData([]);
  }, [fetchColleges, selectedDegree, selectedState, setValue]);

  useEffect(() => {
    fetchColleges(selectedState);
  }, [selectedState, fetchColleges]);

  useEffect(() => {
    fetchUniversities(watchCollege);
    // isEditForm && setEditFormValues(editData);
  }, [watchCollege]);

  return (
    <Box p={3}>
      {isAddForm || isEditForm ? (
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
                <FormControlLabel
                  disabled={isEditForm}
                  value="India"
                  control={<Radio />}
                  label="India"
                />
                <FormControlLabel
                  disabled={isEditForm}
                  value="International"
                  control={<Radio />}
                  label="International"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} lg={4}>
              <Select
                fullWidth
                required
                name="degree"
                label={'Degree Name'}
                queryRaiseIcon={isEditForm && queryfields.includes(field_names.degree)}
                toolTipData={isEditForm && getQueryTooltip(field_names?.degree)}
                placeholder={'Select degree'}
                value={getValues()?.degree}
                defaultValue={getValues()?.degree}
                disabled={isEditForm && !queryfields.includes(field_names.degree)}
                error={errors.degree?.message}
                options={createSelectFieldData(coursesList?.data)}
                {...register('degree', {
                  required: 'Please select the Degree.',
                })}
                MenuProps={menuProps}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              {qualificationFrom === 'India' ? (
                <Select
                  fullWidth
                  required
                  name="state"
                  label="State (in which college is located)"
                  placeholder={'Select state'}
                  queryRaiseIcon={isEditForm && queryfields.includes(field_names.state)}
                  toolTipData={isEditForm && getQueryTooltip(field_names.state)}
                  disabled={isEditForm && !queryfields.includes(field_names.state)}
                  value={getValues()?.state}
                  error={errors?.state?.message}
                  defaultValue={getValues()?.state}
                  {...register('state', {
                    required: 'Please select the State.',
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
                  queryRaiseIcon={isEditForm && queryfields.includes(field_names.country)}
                  toolTipData={isEditForm && getQueryTooltip(field_names.country)}
                  disabled={isEditForm && !queryfields.includes(field_names.country)}
                  value={getValues()?.int_countryName}
                  defaultValue={getValues()?.int_countryName}
                  error={errors?.int_countryName?.message}
                  {...register('int_countryName', {
                    required: 'Please select the Country.',
                  })}
                  options={
                    countriesList?.length > 0 ? createSelectFieldData(countriesList, 'id') : []
                  }
                  // options={createSelectFieldData(coursesList.data)}
                  MenuProps={menuProps}
                />
              )}
            </Grid>
            <Grid item xs={12} lg={4}>
              {qualificationFrom === 'India' ? (
                <Select
                  fullWidth
                  required
                  name="collegeName"
                  label="College Name"
                  placeholder={'Select college'}
                  disabled={
                    isEditForm &&
                    !queryfields.includes(field_names.college) &&
                    !queryfields.includes(field_names.state)
                  }
                  queryRaiseIcon={isEditForm && queryfields.includes(field_names.college)}
                  toolTipData={isEditForm && getQueryTooltip(field_names.college)}
                  value={getValues()?.collegeName}
                  defaultValue={getValues()?.collegeName}
                  error={errors?.collegeName?.message}
                  {...register('collegeName', {
                    required: 'Please select the College.',
                  })}
                  options={createSelectFieldData(collegesData)}
                  MenuProps={menuProps}
                />
              ) : (
                <TextField
                  fullWidth
                  required
                  name="int_state"
                  label="State (in which college is located)"
                  placeholder={'Enter state'}
                  queryRaiseIcon={isEditForm && queryfields.includes(field_names.state)}
                  disabled={isEditForm && !queryfields.includes(field_names.state)}
                  toolTipData={isEditForm && getQueryTooltip(field_names.state)}
                  error={errors?.int_state?.message}
                  {...register('int_state', {
                    required: 'Please enter the State.',
                  })}
                />
              )}
            </Grid>
            <Grid item xs={12} lg={4}>
              {qualificationFrom === 'India' ? (
                <Select
                  fullWidth
                  required
                  name="university"
                  label="University Name"
                  placeholder={'Select university'}
                  disabled={
                    isEditForm &&
                    !queryfields.includes(field_names.college) &&
                    !queryfields.includes(field_names.state) &&
                    !queryfields.includes(field_names.university)
                  }
                  queryRaiseIcon={isEditForm && queryfields.includes(field_names.university)}
                  toolTipData={isEditForm && getQueryTooltip(field_names.university)}
                  // disabled={isEditForm && queryfields.includes(field_names.university)}
                  value={getValues()?.university}
                  defaultValue={getValues()?.university}
                  error={errors?.university?.message}
                  {...register('university', {
                    required: 'Please select the University.',
                  })}
                  options={createSelectFieldData(universitiesListData, 'id')}
                  MenuProps={menuProps}
                />
              ) : (
                <TextField
                  fullWidth
                  required
                  name="int_collegeName"
                  label="College Name"
                  placeholder={'Enter college'}
                  queryRaiseIcon={isEditForm && queryfields.includes(field_names.college)}
                  disabled={isEditForm && !queryfields.includes(field_names.college)}
                  toolTipData={isEditForm && getQueryTooltip(field_names.college)}
                  error={errors?.int_collegeName?.message}
                  {...register('int_collegeName', {
                    required: 'Please enter the College.',
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
                  {isEditForm && queryfields.includes(field_names.monthAwarded) && (
                    <Tooltip title={isEditForm && getQueryTooltip(field_names.monthAwarded)}>
                      <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
                    </Tooltip>
                  )}
                </Typography>
                <Grid item xs={12} sm={6} mb={{ xs: 2, md: 0 }}>
                  <Select
                    required
                    name="month"
                    placeholder={'Select month of awarding1'}
                    queryRaiseIcon={isEditForm && queryfields.includes(field_names.monthAwarded)}
                    disabled={isEditForm && !queryfields.includes(field_names.monthAwarded)}
                    value={getValues()?.month}
                    defaultValue={getValues()?.month}
                    error={errors?.month?.message}
                    {...register('month', {
                      required: 'Please select the Awarding month.',
                    })}
                    options={customMonthsData}
                    MenuProps={menuProps}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    required
                    name="year"
                    placeholder={'Select year of awarding'}
                    queryRaiseIcon={isEditForm && queryfields.includes(field_names.monthAwarded)}
                    disabled={isEditForm && !queryfields.includes(field_names.monthAwarded)}
                    variant="outlined"
                    value={getValues()?.year}
                    defaultValue={getValues()?.year}
                    error={errors?.year?.message}
                    {...register('year', {
                      required: 'Please select the Awarding year.',
                      pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                    })}
                    MenuProps={menuProps}
                    options={yearsData}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} lg={4}>
                <TextField
                  fullWidth
                  required
                  name="int_university"
                  label="University Name"
                  placeholder={'Enter university'}
                  disabled={isEditForm && !queryfields.includes(field_names.university)}
                  queryRaiseIcon={isEditForm && queryfields.includes(field_names.university)}
                  toolTipData={isEditForm && getQueryTooltip(field_names.university)}
                  error={getValues().int_university === '' && errors?.int_university?.message}
                  {...register('int_university', {
                    required: 'Please enter the University.',
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
                  {isEditForm && queryfields.includes(field_names.monthAwarded) && (
                    <Tooltip title={isEditForm && getQueryTooltip(field_names.monthAwarded)}>
                      <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
                    </Tooltip>
                  )}
                </Typography>
                <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
                  <Select
                    name="int_month"
                    placeholder={'Select month of awarding'}
                    value={getValues().int_month}
                    disabled={isEditForm && !queryfields.includes(field_names.monthAwarded)}
                    defaultValue={getValues().int_month}
                    error={errors?.int_month?.message}
                    {...register('int_month', {
                      required: 'Please select the Awarding month.',
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
                    disabled={isEditForm && !queryfields.includes(field_names.monthAwarded)}
                    defaultValue={getValues()?.int_year}
                    error={errors?.int_year?.message}
                    {...register('int_year', {
                      required: 'Please select the Awarding year.',
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
                  // queryRaiseIcon={isEditForm && queryfields.includes(field_names.)}
                  variant="outlined"
                  value={getValues()?.broadSpeciality}
                  defaultValue={getValues()?.broadSpeciality}
                  error={errors?.broadSpeciality?.message}
                  {...register('broadSpeciality', {
                    required: 'Please select the Broad Speciality.',
                  })}
                  MenuProps={menuProps}
                  options={createSelectFieldData(specialitiesList?.data)}
                />
              </Grid>
            )}

            <Grid item xs={12} lg={4}>
              {qualificationFrom === 'India' ? (
                <TextField
                  fullWidth
                  name="speciality"
                  label="Super Speciality"
                  placeholder={'Enter super speciality'}
                  // queryRaiseIcon={isEditForm && queryfields.includes(field_names.degree)}
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
                  // queryRaiseIcon={isEditForm && queryfields.includes(field_names.degree)}
                  error={errors?.int_broadSpeciality?.message}
                  {...register('int_broadSpeciality', {
                    required: 'Please select the Broad Speciality.',
                    // pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                  })}
                  MenuProps={menuProps}
                  // options={dummyOptions}
                  options={createSelectFieldData(specialitiesList?.data)}
                />
              )}
            </Grid>
            {qualificationFrom === 'International' && (
              <Grid item xs={12} lg={4}>
                <TextField
                  fullWidth
                  name="int_superSpeciality"
                  label="Super Speciality"
                  placeholder={'Enter super speciality'}
                  // queryRaiseIcon={isEditForm && queryfields.includes(field_names.degree)}
                  {...register('int_superSpeciality', {})}
                />
              </Grid>
            )}
          </Grid>
          {isEditForm && !deleteUploadedFile && (
            <Box my={2} display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
              <Typography mr={1} width={'auto'}>
                View Attachment -
              </Typography>
              <Typography
                variant={'body1'}
                mr={1}
                width={'auto'}
                onClick={(e) => {
                  e.preventDefault();
                  setAttachmentViewProfile(true);
                }}
              >
                <Link sx={{ cursor: 'pointer', textDecoration: 'none', font: 'inherit' }}>
                  {`${editData?.file_name}.${editData?.file_type}`}
                </Link>
              </Typography>
              <DeleteOutlineOutlinedIcon
                fontSize="10px"
                onClick={(e) => {
                  e.preventDefault();
                  // setAttachmentViewProfile(true);
                  setDeleteUploadedFile(true);
                }}
                sx={{ color: theme.palette.primary.main }}
              />
              <VisibilityOutlinedIcon
                fontSize="10px"
                onClick={(e) => {
                  e.preventDefault();
                  setAttachmentViewProfile(true);
                }}
                sx={{ color: theme.palette.primary.main }}
              />
              {queryfields.includes(field_names.regCertificate) ? (
                <Tooltip title={isEditForm && getQueryTooltip(field_names.regCertificate)}>
                  <ReportIcon color="secondary" sx={{ ml: 1, fontSize: 'large' }} />
                </Tooltip>
              ) : (
                queryfields?.includes(field_names.qualificationDegree) && (
                  <Tooltip title={isEditForm && getQueryTooltip(field_names.qualificationDegree)}>
                    <ReportIcon color="secondary" sx={{ ml: 1, fontSize: 'large' }} />
                  </Tooltip>
                )
              )}
            </Box>
          )}
          <UploadFile
            // fileID={'qualification'}
            // name={'UploadFileName'}
            // uploadFiles="single"
            // sizeAllowed={5}
            // fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
            // fileMessage={`PDF, PNG, JPG, JPEG file types are supported.
            //      Maximum size allowed is 5MB.`}
            // fileData={qualificationFilesData}
            // isDigiLockcerVisible={true}
            // uploadFileLabel="Upload Qualification Degree"
            // setFileData={setQualificationFilesData}
            queryRaiseIcon={
              queryfields.includes(field_names.regCertificate) ||
              queryfields?.includes(field_names.qualificationDegree)
            }
            fileID={'qualificationFilesData'}
            uploadFiles="single"
            sizeAllowed={5}
            fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
            fileMessage={`PDF, PNG, JPG, JPEG file types are supported.
               Maximum size allowed is 5MB.`}
            fileData={qualificationFilesData}
            clearErrors={clearErrors}
            setError={setError}
            name={'registrationCertificate'}
            isError={errors.registrationCertificate?.message}
            setFileData={setQualificationFilesData}
            uploadFileLabel="Upload Registration Certificate"
            // fileName={file_name + '.' + file_type}
            // fileDisabled={
            //   getQueryRaised('Upload the registration certificate') === false
            //     ? false
            //     : work_flow_status_id === 3
            //     ? getQueryRaised('Upload the registration certificate')
            //     : false
            // }
            toolTipData={
              queryfields.includes(field_names.regCertificate)
                ? getQueryTooltip(field_names.regCertificate)
                : queryfields?.includes(field_names.qualificationDegree) &&
                  getQueryTooltip(field_names.qualificationDegree)
            }
            {...register(
              'registrationCertificate',
              (isEditForm ? !deleteUploadedFile : qualificationFilesData[0]?.file === 0) && {
                required: 'Please upload the registration certificate.',
              }
            )}
          />
          <Box mt={2}>
            <Button
              variant={'contained'}
              color={'secondary'}
              sx={{ mr: 2 }}
              onClick={handleSubmit(handleOnSubmit)}
              // onClick={handleOnSubmit}
            >
              Submit
            </Button>
            <Button
              variant={'contained'}
              color={'grey'}
              onClick={() => {
                handleResetForm();
                setIsAddForm(false);
                setIsEditForm(false);
                setQualificationFrom('India');
              }}
            >
              Cancel
            </Button>
            {/* <Button
              variant={'contained'}
              sx={{ ml: 2 }}
              color={'primary'}
              onClick={() => {
                verboseLog('Form Values -> ', getValues());
                verboseLog('Attachment Values -> ', qualificationFilesData);
                verboseLog('fieldComments', fieldComments);
                verboseLog('QueryFields', queryfields);
                verboseLog('QueryFields degree', queryfields.includes(field_names.degree));
              }}
            >
              Form Values
            </Button> */}
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
          <Box
            mt={2}
            display="flex"
            width="100%"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant={'h2'} color="primary.main" width={'auto'}>
              Additional Qualification Details
            </Typography>
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
          certificate={
            isEditForm
              ? editData?.degree_certificate
              : qualification_detail_response_tos[attachmentViewIndex]?.degree_certificate
          }
          closePopup={CloseAttachmentPopup}
          alt={'Qualification Certificate'}
          certFileType={
            isEditForm
              ? editData?.file_type
              : qualification_detail_response_tos[attachmentViewIndex]?.file_type
          }
        />
      )}
    </Box>
  );
};

export default AdditionalQualifications;
