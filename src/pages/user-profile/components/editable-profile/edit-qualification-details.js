import { useEffect, useMemo, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import ReportIcon from '@mui/icons-material/Report';
import { Divider, Grid, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { monthsData, yearsData } from '../../../../constants/common-data';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { getCollegesList, getUniversitiesList } from '../../../../store/actions/common-actions';
import { selectedQualificationType } from '../../../../store/reducers/doctor-user-profile-reducer';
import { RadioGroup, Select, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';

const EditQualificationDetails = ({
  clearErrors,
  setError,
  index,
  showDeleteIcon,
  errors,
  setValue,
  getValues,
  fields,
  register,
  unregister,
  remove,
  watch,
  fileName,
  isVerified,
  qualification,
  qualificationFilesData,
  qualificationFilesNameChangeData,
  isAdditionalQualification,
  handleQualificationFilesData,
  handleQualificationNmeChangeFilesData,
  showBroadSpeciality = false,
}) => {
  const dispatch = useDispatch();
  const [colleges, setColleges] = useState([]);
  // const qualificationObjTemplate = [
  //   {
  //     qualification: null,
  //     country: null,
  //     state: null,
  //     college: null,
  //     university: null,
  //     month: null,
  //     year: null,
  //     nameindegree: null,
  //     files: null,
  //     qualificationfrom: null,
  //     id: null,
  //     FEstate: null,
  //     FEcollege: null,
  //     FEuniversity: null,
  //     Speciality: null,
  //   },
  // ];

  const [degree] = useState([
    {
      name: 'MBBS - Bachelor of Medicine and Bachelor of Surgery',
      id: 4060,
    },
  ]);
  const { countriesList, coursesList, universitiesList, statesList, specialitiesList } =
    useSelector((state) => state?.common);
  const { raisedQueryData } = useSelector((state) => state?.raiseQuery?.raiseQueryData);
  const { work_flow_status_id } = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails
  );

  const [universitiesListData, setUniversitiesListData] = useState(universitiesList?.data);
  const [qualificationID, setQualificationID] = useState('');

  const handleQualificationFrom = (event) => {
    // setValue(`qualification`, [...qualificationObjTemplate]);
    // handleQualificationFilesData(`qualification.${index}.files`, '');
    // clearErrors(`qualification`);
    setValue(event.target.name, event.target.value);
    dispatch(selectedQualificationType(event.target.value));
  };
  const handleQualificationCertificateFrom = (event) => {
    setValue(event.target.name, event.target.value);
  };

  const noPointer = { cursor: 'pointer' };

  const qualificationfrom = watch(`qualification[${index}].qualificationfrom`);
  const diffadharcertificate = watch(`qualification[${index}].diffadharcertificate`);
  const watchCollege = watch(`qualification[${index}].college`);
  const selectedState = watch(`qualification[${index}].state`);
  const selectedYear = watch(`qualification[${index}].year`);

  const fetchColleges = (selectedState) => {
    if (selectedState && selectedState !== '' && qualificationfrom !== 'International') {
      dispatch(getCollegesList(selectedState)).then((dataResponse) => {
        setColleges(dataResponse.data);
      });
    }
  };

  const fetchUniversities = (selectedUniversity) => {
    if (selectedUniversity && selectedUniversity !== '' && qualificationfrom !== 'International') {
      dispatch(getUniversitiesList(selectedUniversity)).then((dataResponse) => {
        setUniversitiesListData(dataResponse?.data);
      });
    }
  };

  //Helper Method to get the data of the query raised against the field
  const getQueryRaised = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query === undefined;
  };
  const getQueryRaisedComment = (fieldName) => {
    let query = raisedQueryData?.find((obj) => obj.field_name === fieldName);
    return query?.query_comment;
  };

  useEffect(() => {
    fetchColleges(selectedState);
    if (getQueryRaised('State') !== false && qualificationfrom === 'International') {
      setValue(`qualification[${index}].university`, null);
      setValue(`qualification[${index}].college`, null);
    }
    setUniversitiesListData([]);
  }, [selectedState]);

  useEffect(() => {
    fetchUniversities(watchCollege);
  }, [watchCollege]);

  useEffect(() => {
    // || !isAdditionalQualification
    if (qualificationfrom !== 'International') {
      const removalArray = [
        `qualification[${index}].rollno`,
        `qualification[${index}].result`,
        `qualification[${index}].monthfmge`,
        `qualification[${index}].yearfmge`,
        `qualification[${index}].marksobtained`,
      ];
      unregister(removalArray);
    }
  }, [qualificationfrom]);

  useEffect(() => {
    if (qualificationfrom !== 'International') {
      setValue(`qualification[${index}].country`, {
        id: 356,
        name: 'India',
        nationality: 'Indian',
      });
      if (!isAdditionalQualification) setValue(`qualification[${index}].qualification`, 4060);
      setValue(`qualification[${index}].qualificationfrom`, 'India');
    }
    if (qualificationfrom === 'International') {
      setValue(`qualification[${index}].qualificationfrom`, 'International');
    }

    setValue(`qualification[${index}].university`, fields[index].university);
    setValue(`qualification[${index}].college`, fields[index].college);
  }, []);

  const customMonthsData = useMemo(() => {
    const date = new Date();
    const fullYear = date.getFullYear();
    const monthIndex = date.getMonth();
    if (selectedYear === `${fullYear}`) {
      return monthsData.slice(0, monthIndex + 1);
    }
    return monthsData;
  }, [selectedYear]);

  const courseData = (courseName) => {
    let degreeName = coursesList.data?.find((x) => x.name === courseName);
    return degreeName?.id;
  };
  useEffect(() => {
    if (qualificationFilesData[`qualification.${index}.files`]?.length > 0) {
      clearErrors('qualificationCertificate', '');
      setValue('qualificationCertificate', qualificationFilesData[`qualification.${index}.files`]);
    }
  }, [qualificationFilesData[`qualification.${index}.files`]]);

  useEffect(() => {
    if (qualificationFilesNameChangeData[`qualification.${index}.diffadharfiles`]?.length > 0) {
      clearErrors('qualificationCertificate', '');
      setValue(
        'qualificationCertificate',
        qualificationFilesNameChangeData[`qualification.${index}.diffadharfiles`]
      );
    }
  }, [qualificationFilesNameChangeData[`qualification.${index}.diffadharfiles`]]);

  return (
    <>
      {showDeleteIcon && (
        <Grid container item spacing={2} display="flex" alignItems="center" mt={2}>
          <Divider width="96%" />
          <CancelIcon
            color="secondary"
            fontSize="large"
            onClick={() => {
              remove(index);
            }}
            style={noPointer}
          />
        </Grid>
      )}
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography component="div" variant="body1" color="inputTextColor">
            Qualification Degree Completed From
          </Typography>
          <RadioGroup
            name={`qualification[${index}].qualificationfrom`}
            size="small"
            defaultValue={
              qualificationfrom !== 'International' ? 'India' : qualification?.qualificationfrom
            }
            {...register(`qualification[${index}].qualificationfrom`)}
            items={[
              {
                value: 'India',
                label: 'India',
              },
              {
                value: 'International',
                label: 'International',
              },
            ]}
            error={errors?.qualification?.[index]?.qualificationfrom?.message}
            onChange={handleQualificationFrom}
            disabled={work_flow_status_id === 3 ? true : isVerified === 1 ? true : false}
          />
        </Grid>
      </Grid>

      {qualificationfrom === 'International' && !isAdditionalQualification ? (
        <Grid container item spacing={2} display="flex" alignItems="center" mb={2}>
          <Grid item xs="auto">
            <Typography color="grey2.lighter" variant="body1">
              FMGE Qualification Details
            </Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>
        </Grid>
      ) : (
        ''
      )}

      {qualificationfrom === 'International' && !isAdditionalQualification ? (
        <Grid container item spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              queryRaiseIcon={getQueryRaised('Roll no.') === false ? true : false}
              toolTipData={getQueryRaisedComment('Roll no.')}
              variant="outlined"
              name="RollNo"
              label="Roll Number"
              placeholder="Enter roll number"
              required={true}
              fullWidth
              error={errors?.qualification?.[index]?.rollno?.message}
              defaultValue={getValues()[`qualification[${index}].rollno`]}
              {...register(`qualification[${index}].rollno`, {
                required: 'Please enter roll number',
              })}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       work_flow_status_id === 3 && getQueryRaised('Roll no.')
              //         ? '#F0F0F0'
              //         : isVerified === 1
              //         ? '#F0F0F0'
              //         : '',
              //   },
              // }}
              disabled={
                getQueryRaised('Roll no.') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('RollNo')
                  : isVerified === 1
                  ? true
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              queryRaiseIcon={getQueryRaised('Passport number') === false ? true : false}
              toolTipData={getQueryRaisedComment('Passport number')}
              variant="outlined"
              name="PassportNumber"
              label="Passport Number"
              placeholder="Enter passport number"
              required={true}
              fullWidth
              error={errors?.qualification?.[index]?.passportNumber?.message}
              defaultValue={getValues()[`qualification[${index}].passportNumber`]}
              {...register(`qualification[${index}].passportNumber`, {
                required: 'Please enter passport number',
                pattern: {
                  value: /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/gi,
                  message: 'Please enter valid 8character Passport Number,Example:P1234567',
                },
              })}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       work_flow_status_id === 3 && getQueryRaised('Passport number')
              //         ? 'grey2.main'
              //         : isVerified === 1
              //         ? 'grey2.main'
              //         : '',
              //   },
              // }}
              disabled={
                getQueryRaised('Passport number') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('PassportNumber')
                  : isVerified === 1
                  ? true
                  : false
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              queryRaiseIcon={getQueryRaised('Marks obtained') === false ? true : false}
              toolTipData={getQueryRaisedComment('Marks obtained')}
              variant="outlined"
              name="MarksObtained"
              label="Marks obtained"
              placeholder="Enter marks obtained"
              // required={true}
              type="number"
              fullWidth
              error={errors?.qualification?.[index]?.marksobtained?.message}
              defaultValue={getValues()[`qualification[${index}].marksobtained`]}
              {...register(`qualification[${index}].marksobtained`, {
                required: 'please enter marks obtained',
                pattern: {
                  value: /^([1-9][0-9]?$|^100)$/i,
                  message: 'Enter correct marks obtained',
                },
              })}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       work_flow_status_id === 3 && getQueryRaised('Marks obtained')
              //         ? 'grey2.main'
              //         : isVerified === 1
              //         ? 'grey2.main'
              //         : '',
              //   },
              // }}
              InputProps={{ maxlength: 4 }}
              disabled={
                getQueryRaised('Marks obtained') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('MarksObtained')
                  : isVerified === 1
                  ? true
                  : false
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Select
              queryRaiseIcon={getQueryRaised('Result') === false ? true : false}
              toolTipData={getQueryRaisedComment('Result')}
              fullWidth
              error={
                getValues()?.qualification[index]?.result?.length === 0
                  ? errors?.qualification?.[index]?.result?.message
                  : ''
              }
              name="Result"
              label="Result"
              placeholder={'Select Result'}
              defaultValue={fields[index].result}
              required={true}
              {...register(
                `qualification[${index}].result`,

                {
                  required: 'Please select result',
                }
              )}
              options={[
                {
                  value: 'Pass',
                  label: 'Pass',
                },
                {
                  value: 'Fail',
                  label: 'Fail',
                },
              ]}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('Result')
              //       ? '#F0F0F0'
              //       : isVerified === 1
              //       ? '#F0F0F0'
              //       : '',
              // }}
              disabled={
                getQueryRaised('Result') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Result')
                  : isVerified === 1
                  ? true
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              queryRaiseIcon={
                getQueryRaised('Month & Year of FMGE qualified') === false ? true : false
              }
              toolTipData={getQueryRaisedComment('Month & Year of FMGE qualified')}
              fullWidth
              error={
                getValues()?.qualification[index]?.monthfmge?.length === 0
                  ? errors?.qualification?.[index]?.monthfmge?.message
                  : ''
              }
              name="MonthFMGE"
              placeholder={'Select FMGE month'}
              label="Month (FMGE Qualified)"
              defaultValue={fields[index].monthfmge}
              required={true}
              {...register(`qualification[${index}].monthfmge`, {
                required: 'Please select month',
              })}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('MonthFMGE')
              //       ? '#F0F0F0'
              //       : isVerified === 1
              //       ? '#F0F0F0'
              //       : '',
              // }}
              disabled={
                getQueryRaised('Month & Year of FMGE qualified') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Month & Year of FMGE qualified')
                  : isVerified === 1
                  ? true
                  : false
              }
              options={monthsData}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              queryRaiseIcon={
                getQueryRaised('Month & Year of FMGE qualified') === false ? true : false
              }
              toolTipData={getQueryRaisedComment('Month & Year of FMGE qualified')}
              fullWidth
              error={
                getValues()?.qualification[index]?.yearfmge?.length === 0
                  ? errors?.qualification?.[index]?.yearfmge?.message
                  : ''
              }
              name="YearFMGE"
              label="Year (FMGE Qualified)"
              placeholder={'Select FMGE year'}
              defaultValue={fields[index].yearfmge}
              required={true}
              {...register(`qualification[${index}].yearfmge`, {
                required: 'Please select year',
              })}
              options={yearsData}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('YearFMGE')
              //       ? '#F0F0F0'
              //       : isVerified === 1
              //       ? '#F0F0F0'
              //       : '',
              // }}
              disabled={
                getQueryRaised('Month & Year of FMGE qualified') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Month & Year of FMGE qualified')
                  : isVerified === 1
                  ? true
                  : false
              }
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}

      <Grid container item spacing={2} display="flex" alignItems="center" mb={2}>
        <Grid item xs="auto">
          <Typography color="grey2.lighter" variant="body1" pt={2}>
            {isAdditionalQualification ? '' : 'Basic'} Qualification
          </Typography>
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          {qualificationfrom === 'International' || isAdditionalQualification ? (
            <Select
              queryRaiseIcon={
                getQueryRaised('Name of the Degree Obtained') === false ? true : false
              }
              toolTipData={getQueryRaisedComment('Name of the Degree Obtained')}
              fullWidth
              error={errors?.qualification?.[index]?.qualification?.message}
              name="Qualification"
              placeholder={'Select degree'}
              label="Degree Name"
              isAdditionalQualification={isAdditionalQualification}
              required={true}
              defaultValue={getValues()[`qualification[${index}].qualification`]}
              disabled={
                getQueryRaised('Name of the Degree Obtained') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Name of the Degree Obtained')
                  : isVerified === 1
                  ? true
                  : false
              }
              {...register(`qualification[${index}].qualification`, {
                required: 'Please select degree',
              })}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('Name of the Degree Obtained')
              //       ? '#F0F0F0'
              //       : isVerified === 1
              //       ? '#F0F0F0'
              //       : '',
              // }}
              onChange={(e) => {
                setQualificationID(e?.target?.value);
                setValue(`qualification[${index}].qualification`, e?.target?.value);
              }}
              options={createSelectFieldData(coursesList.data)}
              value={qualificationID ? qualificationID : courseData(qualification?.qualification)}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          ) : (
            <Select
              queryRaiseIcon={
                getQueryRaised('Name of the Degree Obtained') === false ? true : false
              }
              toolTipData={getQueryRaisedComment('Name of the Degree Obtained')}
              fullWidth
              error={
                getValues()?.qualification[index]?.qualification?.length === 0
                  ? errors?.qualification?.[index]?.qualification?.message
                  : ''
              }
              name="Qualification"
              label="Degree Name"
              placeholder={'Enter degree'}
              defaultValue={degree[0]?.id}
              value={degree[0]?.id}
              required={true}
              {...register(
                `qualification[${index}].qualification`,
                {
                  required: 'Please select degree',
                },

                {
                  onload: (e) => {
                    if (!isAdditionalQualification)
                      setValue(`qualification[${index}].qualification`, e.target.value);
                  },
                }
              )}
              disabled={true}
              options={createSelectFieldData(coursesList.data)}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
              // sx={{
              //   '.MuiSelect-select': {
              //     backgroundColor: 'grey2.main',
              //   },
              // }}
              // InputProps={{ readOnly: true }}
            />
          )}
        </Grid>
        {qualificationfrom === 'International' && (
          <Grid item xs={12} md={6} lg={4}>
            <Select
              queryRaiseIcon={getQueryRaised('Country Name') === false ? true : false}
              toolTipData={getQueryRaisedComment('Country Name')}
              fullWidth
              name="country"
              label="Country Name"
              placeholder={'Select country'}
              defaultValue={qualification?.country}
              required={true}
              error={errors?.qualification?.[index]?.country?.message}
              {...register(`qualification[${index}].country`, {
                required: 'Please select country',
              })}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('Country Name')
              //       ? '#F0F0F0'
              //       : isVerified === 1
              //       ? '#F0F0F0'
              //       : '',
              // }}
              disabled={
                getQueryRaised('Country Name') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Country Name')
                  : isVerified === 1
                  ? true
                  : false
              }
              options={countriesList?.length > 0 ? createSelectFieldData(countriesList, 'id') : []}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
        )}
        <Grid item xs={12} md={6} lg={4}>
          {qualificationfrom === 'International' ? (
            <TextField
              queryRaiseIcon={getQueryRaised('State') === false ? true : false}
              toolTipData={getQueryRaisedComment('State')}
              fullWidth
              error={
                getValues()?.qualification?.[index]?.state === '' &&
                errors?.qualification?.[index]?.state?.message
              }
              name="state"
              label="State (in which college is located)"
              placeholder={'Enter state'}
              defaultValue={fields[index].state}
              required={true}
              {...register(`qualification[${index}].state`, {
                required: 'Please select state',
              })}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       work_flow_status_id === 3 && getQueryRaised('State')
              //         ? 'grey2.main'
              //         : isVerified === 1
              //         ? 'grey2.main'
              //         : '',
              //   },
              // }}
              disabled={
                work_flow_status_id === 3
                  ? getQueryRaised('State')
                  : isVerified === 1
                  ? true
                  : false
              }
            />
          ) : (
            <Select
              queryRaiseIcon={getQueryRaised('State') === false ? true : false}
              toolTipData={getQueryRaisedComment('State')}
              fullWidth
              error={
                getValues().qualification[index].state === '' &&
                errors?.qualification?.[index]?.state?.message
              }
              name="state"
              label="State (in which college is located)"
              placeholder={'Select state'}
              defaultValue={fields[index].state}
              required={true}
              {...register(
                `qualification[${index}].state`,
                getValues().qualification[index].state === '' && {
                  required: 'Please select state',
                }
              )}
              options={createSelectFieldData(statesList)}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('State')
              //       ? 'grey2.main'
              //       : isVerified === 1
              //       ? 'grey2.main'
              //       : '',
              // }}
              disabled={
                work_flow_status_id === 3
                  ? getQueryRaised('State')
                  : isVerified === 1
                  ? true
                  : false
              }
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {qualificationfrom === 'International' ? (
            <TextField
              queryRaiseIcon={getQueryRaised('Name of the College') === false ? true : false}
              toolTipData={getQueryRaisedComment('Name of the College')}
              fullWidth
              name="college"
              label="College Name"
              error={errors?.qualification?.[index]?.college?.message}
              placeholder="Enter college name"
              defaultValue={qualification?.college}
              required={true}
              {...register(`qualification[${index}].college`, {
                required: 'Please enter college name',
              })}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       work_flow_status_id === 3 && getQueryRaised('Name of the College')
              //         ? 'grey2.main'
              //         : isVerified === 1
              //         ? 'grey2.main'
              //         : '',
              //   },
              // }}
              disabled={
                work_flow_status_id === 3
                  ? getQueryRaised('Name of the College')
                  : isVerified === 1
                  ? true
                  : false
              }
            />
          ) : (
            <Select
              queryRaiseIcon={getQueryRaised('Name of the College') === false ? true : false}
              toolTipData={getQueryRaisedComment('Name of the College')}
              fullWidth
              error={errors?.qualification?.[index]?.college?.message}
              name="College"
              label="College Name"
              placeholder={'Select college'}
              defaultValue={fields[index].college}
              required={true}
              {...register(
                `qualification[${index}].college`,
                getValues().qualification[index].college === '' && {
                  required: 'Please select college name',
                }
              )}
              options={createSelectFieldData(colleges)}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('Name of the College')
              //       ? 'grey2.main'
              //       : isVerified === 1
              //       ? 'grey2.main'
              //       : '',
              // }}
              disabled={
                getQueryRaised('State') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Name of the College')
                  : isVerified === 1
                  ? true
                  : false
              }
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {qualificationfrom === 'International' ? (
            <TextField
              queryRaiseIcon={getQueryRaised('University') === false ? true : false}
              toolTipData={getQueryRaisedComment('University')}
              fullWidth
              error={errors?.qualification?.[index]?.university?.message}
              name="University"
              label="University Name"
              placeholder="Enter university"
              defaultValue={qualification?.university}
              required={true}
              // sx={{
              //   input: {
              //     backgroundColor:
              //       work_flow_status_id === 3 && getQueryRaised('University')
              //         ? 'grey2.main'
              //         : isVerified === 1
              //         ? 'grey2.main'
              //         : '',
              //   },
              // }}
              disabled={
                work_flow_status_id === 3
                  ? getQueryRaised('University')
                  : isVerified === 1
                  ? true
                  : false
              }
              {...register(`qualification[${index}].university`, {
                required: 'Please enter university name',
              })}
            />
          ) : (
            <Select
              queryRaiseIcon={getQueryRaised('University') === false ? true : false}
              toolTipData={getQueryRaisedComment('University')}
              fullWidth
              error={errors?.qualification?.[index]?.university?.message}
              placeholder={'Select university'}
              name="University"
              label="University Name"
              defaultValue={fields[index].university}
              required={true}
              {...register(
                `qualification[${index}].university`,
                getValues()?.qualification[index]?.university === '' && {
                  required: 'Please select university',
                }
              )}
              options={createSelectFieldData(universitiesListData, 'id') || []}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('University')
              //       ? 'grey2.main'
              //       : isVerified === 1
              //       ? 'grey2.main'
              //       : '',
              // }}
              disabled={
                getQueryRaised('Name of the College') === false || getQueryRaised('State') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('University')
                  : isVerified === 1
                  ? true
                  : false
              }
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          )}
        </Grid>
        <Grid container item xs={12} md={6} lg={4} columnSpacing={2}>
          <Typography pl={2} fontWeight="500" color="inputTextColor.main">
            Month & Year of Degree Awarded
            <Typography component="span" color="error.main">
              *
            </Typography>
            {getQueryRaised('Month & Year of Degree Awarded') === false && (
              <Tooltip title={getQueryRaisedComment('Month & Year of Degree Awarded')}>
                <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
              </Tooltip>
            )}
          </Typography>
          <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
            <Select
              queryRaiseIcon={getQueryRaised('Month') === false ? true : false}
              toolTipData={getQueryRaisedComment('Month')}
              fullWidth
              error={
                getValues().qualification[index].month === '' &&
                errors?.qualification?.[index]?.month?.message
              }
              name="Month"
              placeholder={'Select month'}
              defaultValue={qualification?.month}
              {...register(
                `qualification[${index}].month`,
                getValues().qualification[index].month?.length <= 0 && {
                  required: 'Please select month',
                }
              )}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('Month')
              //       ? 'grey2.main'
              //       : isVerified === 1
              //       ? 'grey2.main'
              //       : '',
              // }}
              disabled={
                work_flow_status_id === 3
                  ? getQueryRaised('Month & Year of Degree Awarded')
                  : isVerified === 1
                  ? true
                  : false
              }
              options={customMonthsData}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
              value={getValues().qualification[index].month}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              queryRaiseIcon={getQueryRaised('year') === false ? true : false}
              toolTipData={getQueryRaisedComment('year')}
              variant="outlined"
              name="year"
              options={yearsData}
              required={true}
              placeholder={'Select year'}
              fullWidth
              error={
                getValues().qualification[index].year === '' &&
                errors?.qualification?.[index]?.year?.message
              }
              defaultValue={qualification?.year}
              {...register(
                `qualification[${index}].year`,
                getValues().qualification[index].year?.length <= 0 && {
                  required: 'Please select year',
                  pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                }
              )}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
              // style={{
              //   backgroundColor:
              //     work_flow_status_id === 3 && getQueryRaised('year')
              //       ? 'grey2.main'
              //       : isVerified === 1
              //       ? 'grey2.main'
              //       : isVerified === 1
              //       ? 'grey2.main'
              //       : '',
              // }}
              disabled={
                work_flow_status_id === 3
                  ? getQueryRaised('Month & Year of Degree Awarded')
                  : isVerified === 1
                  ? true
                  : false
              }
              value={getValues().qualification[index].year}
            />
          </Grid>
        </Grid>

        {showBroadSpeciality && (
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              error={
                getValues().qualification[index].Speciality === '' &&
                errors?.qualification?.[index]?.Speciality?.message
              }
              placeholder={'Select broad speciality'}
              name="Specialty"
              label="Broad Specialty"
              defaultValue={qualification?.Speciality}
              required={true}
              {...register(
                `qualification[${index}].Speciality`,
                showBroadSpeciality &&
                  getValues().qualification[index].Speciality?.length <= 0 && {
                    required: 'Please select speciality',
                  },
                {
                  onChange: (e) => {
                    setValue(`qualification[${index}].Speciality`, e.target.value);
                  },
                }
              )}
              options={createSelectFieldData(specialitiesList.data)}
              value={getValues().Speciality}
            />
          </Grid>
        )}
        {showBroadSpeciality && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="inputTextColor.main">
              Super Specialty
            </Typography>
            <TextField
              fullWidth
              error={errors.subSpeciality?.message}
              name="subSpeciality"
              placeholder="Enter super specialty"
              defaultValue={qualification?.subSpeciality}
              {...register(`qualification[${index}].subSpeciality`, {})}
            />
          </Grid>
        )}
      </Grid>

      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12}>
          <UploadFile
            uploadDisabled={
              getQueryRaised('Upload Qualification Certificate') === false
                ? false
                : work_flow_status_id === 3
                ? getQueryRaised('Upload Qualification Certificate')
                : isVerified === 1
                ? true
                : false
            }
            queryRaiseIcon={
              getQueryRaised('Upload Qualification Certificate') === false ? true : false
            }
            toolTipData={getQueryRaisedComment('Upload Qualification Certificate')}
            fileID={'qualification'}
            uploadFiles="single"
            sizeAllowed={5}
            fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
            fileMessage={`PDF, PNG, JPG, JPEG file types are supported.
                 Maximum size allowed is 5MB.`}
            fileData={qualificationFilesData[`qualification.${index}.files`] || []}
            setFileData={(files) => {
              handleQualificationFilesData(`qualification.${index}.files`, files);
            }}
            fileName={fileName || ''}
            isDigiLockcerVisible={true}
            uploadFileLabel="Upload Qualification Certificate"
            Upload
            Qualification
            fileDisabled={
              getQueryRaised('Upload Qualification Certificate') === false
                ? false
                : work_flow_status_id === 3
                ? getQueryRaised('Upload Qualification Certificate')
                : isVerified === 1
                ? true
                : false
            }
            {...register(
              'qualificationCertificate',
              (qualificationFilesData[`qualification.${index}.files`]?.length === 0 ||
                qualificationFilesData[`qualification.${index}.files`] === undefined) && {
                required: 'Please upload the qualification certificate.',
              }
            )}
            setError={setError}
            clearErrors={clearErrors}
            name={'qualificationCertificate'}
            isError={errors.qualificationCertificate?.message}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="inputTextColor.main">
            Is your name in degree, different from your name in Aadhaar?
            {getQueryRaised('Registration') === false && (
              <Tooltip title={getQueryRaisedComment('Registration')}>
                <ReportIcon color="secondary" ml={2} sx={{ fontSize: 'large' }} />
              </Tooltip>
            )}
          </Typography>

          <RadioGroup
            name={`qualification[${index}].diffadharcertificate`}
            size="small"
            defaultValue={
              qualificationFilesNameChangeData[`qualification.${index}.diffadharfiles`]?.length > 0
                ? '0'
                : '1'
            }
            items={[
              {
                value: '0',
                label: 'Yes',
              },
              {
                value: '1',
                label: 'No',
              },
            ]}
            onChange={handleQualificationCertificateFrom}
            {...register(`qualification[${index}].diffadharcertificate`)}

            // disabled={work_flow_status_id === 3 ? getQueryRaised('Registration') : false}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12}>
          {diffadharcertificate === '0' && (
            <UploadFile
              uploadDisabled={
                getQueryRaised('Upload qualification name change certificate') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Upload qualification name change certificate')
                  : isVerified === 1
                  ? true
                  : false
              }
              queryRaiseIcon={
                getQueryRaised('Upload qualification name change certificate') === false
                  ? true
                  : false
              }
              toolTipData={getQueryRaisedComment('Upload qualification name change certificate')}
              fileID={'diffDegreeCertificate'}
              uploadFiles="single"
              sizeAllowed={5}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
              fileMessage={`PDF, PNG, JPG, JPEG file types are supported.
                 Maximum size allowed is 5MB.`}
              fileData={
                qualificationFilesNameChangeData[`qualification.${index}.diffadharfiles`] || []
              }
              setFileData={(files) => {
                handleQualificationNmeChangeFilesData(
                  `qualification.${index}.diffadharfiles`,
                  files
                );
              }}
              fileName={fileName || ''}
              uploadFileLabel="Upload qualification name change certificate"
              Upload
              Qualification
              fileDisabled={
                getQueryRaised('Upload qualification name change certificate') === false
                  ? false
                  : work_flow_status_id === 3
                  ? getQueryRaised('Upload qualification name change certificate')
                  : isVerified === 1
                  ? true
                  : false
              }
              {...register('proofOfQualificationNameChange')}
              setError={setError}
              clearErrors={clearErrors}
              name={'proofOfQualificationNameChange'}
              isError={errors.proofOfQualificationNameChange?.message}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default EditQualificationDetails;
