import { useState } from 'react';
import { useEffect } from 'react';

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { getCollegesList } from '../../../../store/actions/common-actions';
import { Button, Select, TextField, UploadFile } from '../../../../ui/core';

const AdditionalQualifications = () => {
  const {
    //  countriesList,
    coursesList,
    // universitiesList,
    statesList,
    //  specialitiesList
  } = useSelector((state) => state?.common);
  const [qualificationFrom, setQualificationFrom] = useState('india');
  const [qualificationFilesData, setQualificationFilesData] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [colleges, setColleges] = useState([]);

  const handleChange = (event) => {
    setQualificationFrom(event.target.value);
  };

  const {
    register,
    getValues,
    watch,
    setValue,
    // handleSubmit
    handleSubmit,
    onSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      degree: '',
      state: '',
      collegeName: '',
      countryName: '',
      university: '',
      monthOfDegree: '',
      yearOfDegree: '',
      superSpeciality: '',
      broadSpeciality: '',
      selectDegree: '',
      selectState: '',
    },
  });
  const selectedState = watch(`selectState`);
  const dispatch = useDispatch();
  const handleDegreeSelect = (e) => {
    setSelectedDegree(e.target.value);
  };
  const handleSelectedState = (e) => {
    setValue('selectState', e.target.value);
  };

  const fetchColleges = (selectedState) => {
    if (selectedState && selectedState !== '' && qualificationFrom !== 'International') {
      dispatch(getCollegesList(selectedState)).then((dataResponse) => {
        setColleges(dataResponse.data);
      });
    }
  };
  useEffect(() => {
    fetchColleges(selectedState);
  }, [selectedState]);
  useEffect(() => {}, []);

  return (
    <Box p={4}>
      <Box mb={2}>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Qualification Degree Completed From
          </FormLabel>
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={qualificationFrom}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="india" control={<Radio />} label="India" />
            <FormControlLabel value="international" control={<Radio />} label="International" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={4}>
          <Select
            fullWidth
            error={errors.degree?.message}
            name="degree"
            placeholder={'Select degree'}
            label="Degree Name"
            required={true}
            // defaultValue={getValues()?.degree}
            {...register(`degree`, {
              required: 'Degree is required',
            })}
            onChange={(e) => handleDegreeSelect(e)}
            options={createSelectFieldData(coursesList?.data)}
            value={selectedDegree}
            MenuProps={{
              style: {
                maxHeight: 250,
                maxWidth: 130,
              },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          {qualificationFrom === 'india' ? (
            <Select
              fullWidth
              error={errors.state?.message}
              name="state"
              placeholder={'Select state'}
              label="State (in which college is located)"
              required={true}
              defaultValue={getValues().state}
              {...register(`state`, {
                required: 'State is required',
              })}
              onChange={(e) => handleSelectedState(e)}
              options={createSelectFieldData(statesList)}
              // value={qualificationID}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          ) : (
            <Select
              fullWidth
              error={errors.countryName?.message}
              name="country"
              placeholder={'Select country'}
              label="Country Name"
              required={true}
              defaultValue={getValues().countryName}
              {...register(`countryName`, {
                required: 'Country is required',
              })}
              onChange={() => {
                // setQualificationID(e?.target?.value);
                // setValue(`qualification[${index}].qualification`, e?.target?.value);
              }}
              // options={createSelectFieldData(coursesList.data)}
              // value={qualificationID}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {qualificationFrom === 'india' ? (
            <Select
              fullWidth
              error={errors.collegeName?.message}
              name="collegeName"
              placeholder={'Select college'}
              label="College Name"
              required={true}
              defaultValue={getValues().collegeName}
              {...register(`collegeName`, {
                required: 'College is required',
              })}
              onChange={() => {
                // setQualificationID(e?.target?.value);
                // setValue(`qualification[${index}].qualification`, e?.target?.value);
              }}
              options={createSelectFieldData(colleges)}
              // value={qualificationID}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          ) : (
            <TextField
              fullWidth
              name="state"
              label="State (in which college is located)"
              placeholder={'Enter state'}
              required={true}
              value={''}
              {...register(`state`, {
                required: 'state is required',
              })}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {qualificationFrom === 'india' ? (
            <Select
              fullWidth
              error={errors.university?.message}
              name="university"
              placeholder={'Select university'}
              label="University"
              required={true}
              defaultValue={getValues().university}
              {...register(`university`, {
                required: 'university is required',
              })}
              onChange={() => {
                // setQualificationID(e?.target?.value);
                // setValue(`qualification[${index}].qualification`, e?.target?.value);
              }}
              // options={createSelectFieldData(coursesList.data)}
              // value={qualificationID}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          ) : (
            <TextField
              fullWidth
              name="collegeName"
              label="College Name"
              placeholder={'Enter college'}
              required={true}
              value={'MIT'}
              {...register(`state`, {
                required: 'university is required',
              })}
            />
          )}
        </Grid>
        {qualificationFrom === 'india' ? (
          <Grid container item xs={12} md={6} lg={4} columnSpacing={2}>
            <Typography pl={2} fontWeight="500" color="inputTextColor.main">
              Month & Year of Awarding Degree
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
              <Select
                // fullWidth
                error={errors?.month?.message}
                // name="Month"
                // placeholder={'Select month of awarding'}
                // defaultValue={getValues().qualification[index].month}
                // {...register(`qualification[${index}].month`, {
                //   required: 'Awarding month is required',
                // })}
                // style={{
                //   backgroundColor:
                //     work_flow_status_id === 3 && getQueryRaised('Month')
                //       ? 'grey2.main'
                //       : isVerified === 1
                //       ? 'grey2.main'
                //       : '',
                // }}
                // disabled={
                //   work_flow_status_id === 3
                //     ? getQueryRaised('Month')
                //     : isVerified === 1
                //     ? true
                //     : false
                // }
                // options={customMonthsData}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
                // value={getValues().qualification[index].month}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                variant="outlined"
                name="year"
                // options={yearsData}
                required={true}
                placeholder={'Select year of awarding'}
                fullWidth
                error={
                  // (getValues().qualification[index].year === '' ||
                  //   getValues().qualification[index].year === undefined) &&
                  errors.year?.message
                }
                // defaultValue={qualification?.year}
                // {...register(`qualification[${index}].year`, {
                //   required: 'Awarding year is required',
                //   pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                // })}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
                // disabled={
                //   work_flow_status_id === 3 ? getQueryRaised('year') : isVerified === 1 ? true : false
                // }
                // value={getValues().qualification[index].year}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid item lg={4}>
            <Select
              fullWidth
              error={errors.collegeName?.message}
              name="university"
              placeholder={'Select university'}
              label="University"
              required={true}
              defaultValue={getValues().university}
              {...register(`state`, {
                required: 'Degree is required',
              })}
              onChange={() => {
                // setQualificationID(e?.target?.value);
                // setValue(`qualification[${index}].qualification`, e?.target?.value);
              }}
              // options={createSelectFieldData(coursesList.data)}
              // value={qualificationID}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
            />
          </Grid>
        )}

        {qualificationFrom === 'international' ? (
          <Grid container item xs={12} md={6} lg={4} columnSpacing={2}>
            <Typography pl={2} fontWeight="500" color="inputTextColor.main">
              Month & Year of Awarding Degree
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
              <Select
                // fullWidth
                // error={errors?.qualification?.[index]?.month?.message}
                // name="Month"
                // placeholder={'Select month of awarding'}
                // defaultValue={getValues().qualification[index].month}
                // {...register(`qualification[${index}].month`, {
                //   required: 'Awarding month is required',
                // })}
                // style={{
                //   backgroundColor:
                //     work_flow_status_id === 3 && getQueryRaised('Month')
                //       ? 'grey2.main'
                //       : isVerified === 1
                //       ? 'grey2.main'
                //       : '',
                // }}
                // disabled={
                //   work_flow_status_id === 3
                //     ? getQueryRaised('Month')
                //     : isVerified === 1
                //     ? true
                //     : false
                // }
                // options={customMonthsData}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
                // value={getValues().qualification[index].month}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                variant="outlined"
                name="year"
                // options={yearsData}
                required={true}
                placeholder={'Select year of awarding'}
                fullWidth
                error={
                  // (getValues().qualification[index].year === '' ||
                  //   getValues().qualification[index].year === undefined) &&
                  errors.year?.message
                }
                // defaultValue={qualification?.year}
                // {...register(`qualification[${index}].year`, {
                //   required: 'Awarding year is required',
                //   pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                // })}
                MenuProps={{
                  style: {
                    maxHeight: 250,
                    maxWidth: 130,
                  },
                }}
                // disabled={
                //   work_flow_status_id === 3 ? getQueryRaised('year') : isVerified === 1 ? true : false
                // }
                // value={getValues().qualification[index].year}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} md={6} lg={4}>
            <Select
              label="Broad speciality"
              variant="outlined"
              name="year"
              // options={yearsData}
              required={true}
              placeholder={'Select year of awarding'}
              fullWidth
              error={
                // (getValues().qualification[index].year === '' ||
                //   getValues().qualification[index].year === undefined) &&
                errors.year?.message
              }
              // defaultValue={qualification?.year}
              // {...register(`qualification[${index}].year`, {
              //   required: 'Awarding year is required',
              //   pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
              // })}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
              // disabled={
              //   work_flow_status_id === 3 ? getQueryRaised('year') : isVerified === 1 ? true : false
              // }
              // value={getValues().qualification[index].year}
            />{' '}
          </Grid>
        )}

        <Grid item xs={4}>
          {qualificationFrom === 'india' ? (
            <TextField
              fullWidth
              name="state"
              label="Super Speciality"
              placeholder={'Enter state'}
              // required={true}
              value={'MIT'}
            />
          ) : (
            <Select
              label="Broad speciality"
              variant="outlined"
              name="year"
              // options={yearsData}
              required={true}
              placeholder={'Select year of awarding'}
              fullWidth
              error={
                // (getValues().qualification[index].year === '' ||
                //   getValues().qualification[index].year === undefined) &&
                errors.year?.message
              }
              // defaultValue={qualification?.year}
              // {...register(`qualification[${index}].year`, {
              //   required: 'Awarding year is required',
              //   pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
              // })}
              MenuProps={{
                style: {
                  maxHeight: 250,
                  maxWidth: 130,
                },
              }}
              // disabled={
              //   work_flow_status_id === 3 ? getQueryRaised('year') : isVerified === 1 ? true : false
              // }
              // value={getValues().qualification[index].year}
            />
          )}
        </Grid>

        {qualificationFrom === 'international' && (
          <Grid item lg={4}>
            <TextField
              fullWidth
              name="superSpeciality"
              label="Super Speciality"
              placeholder={'Enter super speciality'}
              required={true}
              value={''}
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
        uploadFileLabel="Upload qualification degree"
        setFileData={setQualificationFilesData}
      />

      <Box mt={3} display={'flex'} justifyContent={'space-between'}>
        <Box>
          <Button
            variant={'contained'}
            color={'secondary'}
            sx={{ mr: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Button variant={'contained'} color={'grey'}>
            Cancel
          </Button>
        </Box>
        <Box>
          <Button variant={'outlined'} color={'primary'}>
            Add Additional Qualification
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default AdditionalQualifications;
