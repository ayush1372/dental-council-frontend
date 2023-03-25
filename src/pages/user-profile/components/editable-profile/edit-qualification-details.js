import { useEffect, useMemo, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import { Divider, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { monthsData, yearsData } from '../../../../constants/common-data';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { getCollegesList, getUniversitiesList } from '../../../../store/actions/common-actions';
import { selectedQualificationType } from '../../../../store/reducers/doctor-user-profile-reducer';
// import { getUniversities } from '../../../../store/reducers/common-reducers';
import { RadioGroup, Select, TextField } from '../../../../ui/core';
import UploadFile from '../../../../ui/core/fileupload/fileupload';

const EditQualificationDetails = ({
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
  qualification,
  qualificationFilesData,
  handleQualificationFilesData,
}) => {
  const dispatch = useDispatch();
  const [colleges, setColleges] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [degree, setDegree] = useState([
    {
      label: 'MBBS - Bachelor of Medicine and Bachelor of Surgery ',
      value: 'MBBS - Bachelor of Medicine and Bachelor of Surgery ',
      id: 69,
    },
  ]);
  const { countriesList, coursesList, universitiesList, statesList } = useSelector(
    (state) => state?.common
  );

  const handleQualificationFrom = (event) => {
    setValue(event.target.name, event.target.value);
    dispatch(selectedQualificationType(event.target.value));
  };

  //  const selectedCollege = watch(`qualification[${index}].university`);
  const qualificationfrom = watch(`qualification[${index}].qualificationfrom`);
  const watchCollege = watch(`qualification[${index}].college`);
  const selectedState = watch(`qualification[${index}].state`);
  const selectedYear = watch(`qualification[${index}].year`);

  const fetchColleges = (selectedState) => {
    if (selectedState && qualificationfrom !== 'International') {
      dispatch(getCollegesList(selectedState)).then((dataResponse) => {
        setColleges(dataResponse.data);
      });
    }
  };

  useEffect(() => {
    fetchColleges(selectedState);
  }, [selectedState]);

  useEffect(() => {
    if (watchCollege && qualificationfrom !== 'International') {
      const obj = colleges?.find((x) => x.id === watchCollege);
      setValue(`qualification[${index}].collegeObj`, obj);
      dispatch(getUniversitiesList(watchCollege));
    }
  }, [watchCollege]);

  useEffect(() => {
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
      setValue(`qualification[${index}].qualification`, degree[0]);
    } else {
      setValue(`qualification[${index}].qualification`, qualification?.qualification);
    }
    setValue(`qualification[${index}].qualificationfrom`, fields[index].qualificationfrom);
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
          />
        </Grid>
      )}
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography component="div" variant="body1" color="inputTextColor">
            Qualification From
          </Typography>
          <RadioGroup
            onChange={handleQualificationFrom}
            name={`qualification[${index}].qualificationfrom`}
            size="small"
            defaultValue={qualification?.qualificationfrom}
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
          />
        </Grid>
      </Grid>

      {qualificationfrom === 'International' && (
        <Grid container item spacing={2} display="flex" alignItems="center" mb={2}>
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <Typography color="grey2.lighter" variant="body1">
              FMGE QUALIFICATION DETAILS
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={8}>
            <Divider />
          </Grid>
        </Grid>
      )}

      {qualificationfrom === 'International' && (
        <Grid container item spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              variant="outlined"
              name="RollNo"
              label="Roll No."
              required={true}
              fullWidth
              error={errors?.qualification?.[index]?.rollno?.message}
              defaultValue={getValues()[`qualification[${index}].rollno`]}
              {...register(`qualification[${index}].rollno`, {
                required: 'awarding is Required',
              })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              variant="outlined"
              name="PassportNumber"
              label="Passport Number."
              placeholder="Enter Passport Number"
              required={true}
              fullWidth
              error={errors?.qualification?.[index]?.passportNumber?.message}
              defaultValue={getValues()[`qualification[${index}].passportNumber`]}
              {...register(`qualification[${index}].passportNumber`, {
                required: 'Passport Number is Required',
              })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              variant="outlined"
              name="MarksObtained"
              label="Marks Obtained"
              required={true}
              type="number"
              fullWidth
              error={errors?.qualification?.[index]?.marksobtained?.message}
              defaultValue={getValues()[`qualification[${index}].marksobtained`]}
              {...register(`qualification[${index}].marksobtained`, {
                required: 'Marks Obtained is Required',
                pattern: {
                  value: /^([1-9][0-9]?$|^100)$/i,
                  message: 'Enter correct marks obtained',
                },
              })}
              InputProps={{ maxlength: 4 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              error={
                getValues()?.qualification[index]?.result?.length === 0
                  ? errors?.qualification?.[index]?.result?.message
                  : ''
              }
              name="Result"
              label="Result"
              defaultValue={fields[index].result}
              required={true}
              {...register(
                `qualification[${index}].result`,
                getValues()?.qualification[index]?.result?.length === 0
                  ? {
                      required: 'degree is required',
                    }
                  : ''
              )}
              options={[
                {
                  value: 'pass',
                  label: 'Pass',
                },
                {
                  value: 'fail',
                  label: 'Fail',
                },
              ]}
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
              fullWidth
              error={
                getValues()?.qualification[index]?.monthfmge?.length === 0
                  ? errors?.qualification?.[index]?.monthfmge?.message
                  : ''
              }
              name="MonthFMGE"
              label="Month (FMGE qualified)"
              defaultValue={fields[index].monthfmge}
              required={true}
              {...register(
                `qualification[${index}].monthfmge`,
                getValues()?.qualification[index]?.monthfmge?.length === 0
                  ? {
                      required: 'Month-FMGE qualified is required',
                    }
                  : ''
              )}
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
              fullWidth
              error={
                getValues()?.qualification[index]?.yearfmge?.length === 0
                  ? errors?.qualification?.[index]?.yearfmge?.message
                  : ''
              }
              name="YearFMGE"
              label="Year (FMGE qualified)"
              defaultValue={fields[index].yearfmge}
              required={true}
              {...register(
                `qualification[${index}].yearfmge`,
                getValues()?.qualification[index]?.yearfmge?.length === 0
                  ? {
                      required: 'Year-FMGE qualified is required',
                    }
                  : ''
              )}
              options={yearsData}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
        </Grid>
      )}

      <Grid container item spacing={2} display="flex" alignItems="center" mb={2}>
        <Grid item xs={12} sm={4}>
          <Typography color="grey2.lighter" variant="body1">
            BASIC QUALIFICATION
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Divider />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Select
            fullWidth
            error={
              getValues()?.qualification[index]?.qualification?.length === 0
                ? errors?.qualification?.[index]?.qualification?.message
                : ''
            }
            name="Qualification"
            label="Name Of The Degree"
            defaultValue={degree[0]?.label}
            value={
              qualificationfrom === 'International'
                ? getValues()?.qualification[index]?.qualification
                : degree[0]?.label
            }
            required={true}
            {...register(
              `qualification[${index}].qualification`,
              getValues()?.qualification[index]?.qualification?.length === 0
                ? {
                    required: 'Qualification Details is required',
                  }
                : ''
            )}
            disabled={qualificationfrom === 'International' ? false : true}
            options={
              qualificationfrom === 'International'
                ? createSelectFieldData(coursesList.data)
                : degree
            }
            MenuProps={{
              style: {
                maxHeight: 250,
                maxWidth: 130,
              },
            }}
            sx={{
              '.MuiSelect-select':
                qualificationfrom !== 'International'
                  ? {
                      backgroundColor: 'grey2.main',
                    }
                  : '',
            }}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        {qualificationfrom === 'International' && (
          <Grid item xs={12} md={6} lg={4}>
            <Select
              fullWidth
              error={
                getValues()?.qualification[index]?.country?.length === 0
                  ? errors?.qualification?.[index]?.country?.message
                  : ''
              }
              name="country"
              label="Country Name"
              defaultValue={qualification?.country}
              required={true}
              {...register(
                `qualification[${index}].country`,
                getValues()?.qualification[index]?.qualification?.length === 0
                  ? {
                      required: 'Country is required',
                    }
                  : ''
              )}
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
              fullWidth
              error={errors?.qualification?.[index]?.state?.message}
              name="state"
              label="State (in which college is located)"
              defaultValue={fields[index].state}
              required={true}
              {...register(`qualification[${index}].state`, {
                required: 'State is Required',
              })}
            />
          ) : (
            <Select
              fullWidth
              error={
                getValues().qualification[index].state === '' &&
                errors?.qualification?.[index]?.state?.message
              }
              name="state"
              label="State (in which college is located)"
              defaultValue={fields[index].state}
              required={true}
              {...register(
                `qualification[${index}].state`,
                getValues().qualification[index].state === '' && {
                  required: 'State is Required',
                }
              )}
              options={createSelectFieldData(statesList)}
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
              fullWidth
              error={errors?.qualification?.[index]?.college?.message}
              name="college"
              label="Name of the college"
              defaultValue={qualification?.college}
              required={true}
              {...register(`qualification[${index}].college`, {
                required: 'college is required',
              })}
            />
          ) : (
            <Select
              fullWidth
              error={
                getValues().qualification[index].college === '' &&
                errors?.qualification?.[index]?.college?.message
              }
              name="College"
              label="Name of the College"
              defaultValue={fields[index].college}
              required={true}
              {...register(
                `qualification[${index}].college`,
                getValues().qualification[index].college === '' && {
                  required: 'college is required',
                }
              )}
              options={createSelectFieldData(colleges)}
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
              fullWidth
              error={errors?.qualification?.[index]?.university?.message}
              name="University"
              label="University"
              defaultValue={qualification?.university}
              required={true}
              {...register(`qualification[${index}].university`, {
                required: 'University is Required',
              })}
            />
          ) : (
            <Select
              fullWidth
              error={
                getValues().qualification[index].university === '' &&
                errors?.qualification?.[index]?.university?.message
              }
              name="University"
              label="University"
              defaultValue={fields[index].university}
              required={true}
              {...register(
                `qualification[${index}].university`,
                getValues().qualification[index].university === '' && {
                  required: 'University is required',
                }
              )}
              options={createSelectFieldData(universitiesList.data, 'id') || []}
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
            Month & Year Of Awarding Degree
          </Typography>
          <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
            <Select
              fullWidth
              error={
                getValues().qualification[index].month === '' &&
                errors?.qualification?.[index]?.month?.message
              }
              name="Month"
              defaultValue={qualification?.month}
              {...register(
                `qualification[${index}].month`,
                getValues().qualification[index].month === '' && {
                  required: 'awarding is required',
                }
              )}
              options={customMonthsData}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              variant="outlined"
              name="year"
              options={yearsData}
              required={true}
              placeholder={'Year of Awarding'}
              fullWidth
              error={qualification?.year === '' && errors?.qualification?.[index]?.year?.message}
              defaultValue={qualification?.year}
              {...register(
                `qualification[${index}].year`,
                (qualification?.year === '' || getValues()?.qualification[0]?.year) && {
                  required: 'awarding is Required',
                  pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                }
              )}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12}>
          <UploadFile
            uploadFiles="single"
            sizeAllowed={5}
            fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
            fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
                 Maximum size allowed for the attachment is 5MB.`}
            fileData={qualificationFilesData}
            setFileData={handleQualificationFilesData}
            isDigiLockcerVisible={true}
            uploadFileLabel="Upload Qualification Degree "
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EditQualificationDetails;
