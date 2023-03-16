import { useEffect, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import { Divider, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { yearsData } from '../../../../constants/common-data';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { getCollegesList } from '../../../../store/actions/common-actions';
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
  qualificationFilesData,
  handleQualificationFilesData,
}) => {
  const dispatch = useDispatch();
  const [colleges, setColleges] = useState([]);
  const { countriesList, coursesList, universitiesList, statesList } = useSelector(
    (state) => state?.common
  );

  const handleQualificationFrom = (event) => {
    setValue(event.target.name, event.target.value);
  };

  const selectedCollege = watch(`qualification[${index}].university`);
  const qualificationfrom = watch(`qualification[${index}].qualificationfrom`);
  const watchCollege = watch(`qualification[${index}].college`);
  const fetchColleges = (collegeId) => {
    if (collegeId) {
      dispatch(getCollegesList(collegeId)).then((dataResponse) => {
        setColleges(dataResponse.data);
      });
    }
  };

  useEffect(() => {
    fetchColleges(selectedCollege);
  }, [selectedCollege]);

  useEffect(() => {
    if (watchCollege) {
      const obj = colleges?.find((x) => x.id === watchCollege);
      setValue(`qualification[${index}].collegeObj`, obj);
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
            defaultValue={fields[index].qualificationfrom}
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
            <Select
              fullWidth
              error={errors?.qualification?.[index]?.result?.message}
              name="Result"
              label="Result"
              defaultValue={getValues()[`qualification[${index}].result`]}
              required={true}
              {...register(`qualification[${index}].result`, {
                required: 'degree is required',
              })}
              options={[]}
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
              error={errors?.qualification?.[index]?.yearfmge?.message}
              name="YearFMGE"
              label="Year (FMGE qualified)"
              defaultValue={getValues()[`qualification[${index}].yearfmge`]}
              required={true}
              {...register(`qualification[${index}].yearfmge`, {
                required: 'degree is required',
              })}
              options={[]}
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
              error={errors?.qualification?.[index]?.monthfmge?.message}
              name="MonthFMGE"
              label="Month (FMGE qualified)"
              defaultValue={getValues()[`qualification[${index}].monthfmge`]}
              required={true}
              {...register(`qualification[${index}].monthfmge`, {
                required: 'degree is required',
              })}
              options={[]}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              variant="outlined"
              name="MarksObtained"
              label="Marks Obtained"
              required={true}
              fullWidth
              error={errors?.qualification?.[index]?.marksobtained?.message}
              defaultValue={getValues()[`qualification[${index}].marksobtained`]}
              {...register(`qualification[${index}].marksobtained`, {
                required: 'awarding is Required',
              })}
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
            error={errors?.qualification?.[index]?.qualification?.message}
            name="Qualification"
            label="Name of the Degree"
            defaultValue={'MBBS - Bachelor of Medicine and Bachelor of Surgery '}
            required={true}
            {...register(`qualification[${index}].qualification`, {
              required: 'degree is required',
            })}
            disabled={qualificationfrom === 'International' ? false : true}
            options={
              qualificationfrom === 'International'
                ? createSelectFieldData(coursesList.data)
                : [
                    {
                      label: 'MBBS - Bachelor of Medicine and Bachelor of Surgery ',
                      value: 'MBBS - Bachelor of Medicine and Bachelor of Surgery ',
                      id: '69',
                    },
                  ]
            }
            MenuProps={{
              style: {
                maxHeight: 250,
                maxWidth: 130,
              },
            }}
            sx={{
              '.MuiSelect-select': {
                backgroundColor: 'grey2.main',
              },
            }}
            InputProps={{ readOnly: true }}
          />
          {/* )} */}
        </Grid>
        {qualificationfrom === 'International' && (
          <Grid item xs={12} md={6} lg={4}>
            <Select
              fullWidth
              error={errors?.qualification?.[index]?.country?.message}
              name="country"
              label="Country name"
              defaultValue={fields[index].country}
              required={true}
              {...register(`qualification[${index}].country`, {
                required: 'country is Required',
              })}
              options={
                countriesList?.length > 0
                  ? createSelectFieldData(
                      countriesList?.filter(function (item) {
                        return item.name === 'India';
                      }, 'id')
                    )
                  : []
              }
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
          <Select
            fullWidth
            error={errors?.qualification?.[index]?.state?.message}
            name="state"
            label="State (in which college is located)"
            defaultValue={fields[index].state}
            required={true}
            {...register(`qualification[${index}].state`, {
              required: 'State is Required',
            })}
            options={createSelectFieldData(statesList)}
            MenuProps={{
              style: {
                maxHeight: 250,
                maxWidth: 130,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Select
            fullWidth
            error={errors?.qualification?.[index]?.university?.message}
            name="University"
            label="University"
            defaultValue={fields[index].university}
            required={true}
            {...register(`qualification[${index}].university`, {
              required: 'University is required',
            })}
            options={createSelectFieldData(universitiesList.data, 'id') || []}
            MenuProps={{
              style: {
                maxHeight: 250,
                maxWidth: 130,
              },
            }}
          />
          {/* )} */}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Select
            fullWidth
            error={errors?.qualification?.[index]?.college?.message}
            name="College"
            label="Name of the college"
            defaultValue={fields[index].college}
            required={true}
            {...register(`qualification[${index}].college`, {
              required: 'college is required',
            })}
            options={createSelectFieldData(colleges)}
            MenuProps={{
              style: {
                maxHeight: 250,
                maxWidth: 130,
              },
            }}
          />
          {/* )} */}
        </Grid>
        <Grid container item xs={12} md={6} lg={4} columnSpacing={2}>
          <Typography pl={2}>Month & Year of awarding Degree</Typography>
          <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
            <Select
              fullWidth
              error={errors?.qualification?.[index]?.month?.message}
              name="Month"
              defaultValue={fields[index].month}
              {...register(`qualification[${index}].month`, {
                required: 'awarding is required',
              })}
              options={yearsData}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              variant="outlined"
              name="year"
              options={yearsData}
              required={true}
              placeholder={'Year of awarding'}
              fullWidth
              error={errors?.qualification?.[index]?.year?.message}
              defaultValue={fields[index].year}
              {...register(`qualification[${index}].year`, {
                required: 'awarding is Required',
                pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
              })}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={8}>
          <UploadFile
            uploadFiles="single"
            sizeAllowed={1}
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
