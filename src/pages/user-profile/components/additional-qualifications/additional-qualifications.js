/* eslint-disable no-console */
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

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

import { verboseLog } from '../../../../config/debug';
import { createSelectFieldData } from '../../../../helpers/functions/common-functions';
import { getCollegesList } from '../../../../store/actions/common-actions';
import { Button, Select, TextField, UploadFile } from '../../../../ui/core';

const AdditionalQualifications = () => {
  const dispatch = useDispatch();

  const {
    coursesList,
    statesList,
    //  countriesList,
    //  universitiesList,
    //  specialitiesList
  } = useSelector((state) => state?.common);

  const [qualificationFrom, setQualificationFrom] = useState('india');
  const [qualificationFilesData, setQualificationFilesData] = useState([]);

  const [collegesData, setCollegesData] = useState([]);

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

  const menuProps = {
    style: {
      maxHeight: 250,
      maxWidth: 130,
    },
  };

  const dummyOptions = [
    { value: 'nihal', label: 'Nihal' },
    { value: 'sanket', label: 'Sanket' },
  ];

  const handleChange = (event) => {
    setQualificationFrom(event.target.value);
    handleResetForm();
  };

  const handleOnSubmit = () => {
    verboseLog('All values -> ', getValues());
    verboseLog('UploadFile -> ', qualificationFilesData);
    console.log('All values -> ', getValues());
    console.log('UploadFile -> ', qualificationFilesData);
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
    fetchColleges(selectedState);
  }, [selectedState, fetchColleges]);

  return (
    <Box p={3}>
      <Box mb={1}>
        <FormControl>
          <FormLabel id="qualification-type-form-label">
            Qualification Degree Completed Froms
          </FormLabel>
          <RadioGroup
            name="qualification-type-radio-group"
            value={qualificationFrom}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="india" control={<Radio />} label="India" />
            <FormControlLabel value="international" control={<Radio />} label="International" />
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
          {qualificationFrom === 'india' ? (
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
              options={dummyOptions}
              // options={createSelectFieldData(coursesList.data)}
              MenuProps={menuProps}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {qualificationFrom === 'india' ? (
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
          {qualificationFrom === 'india' ? (
            <Select
              fullWidth
              required
              name="university"
              label="University"
              placeholder={'Select university'}
              value={getValues()?.university}
              defaultValue={getValues()?.university}
              error={errors.university?.message}
              {...register('university', {
                required: 'University is required',
              })}
              // options={createSelectFieldData(coursesList.data)}
              options={dummyOptions}
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
        {qualificationFrom === 'india' ? (
          <Grid container item xs={12} md={6} lg={4} columnSpacing={2}>
            <Typography pl={2} fontWeight="500" color="inputTextColor.main">
              {`Month & Year of Awarding Degree`}
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
              <Select
                required
                name="month"
                placeholder={'Select month of awarding'}
                value={getValues()?.month}
                defaultValue={getValues()?.month}
                error={errors?.month?.message}
                {...register('month', {
                  required: 'Awarding month is required',
                })}
                // options={customMonthsData}
                MenuProps={menuProps}
                options={dummyOptions}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                fullWidth
                required
                name="year"
                variant="outlined"
                placeholder={'Select year of awarding'}
                value={getValues()?.year}
                defaultValue={getValues()?.year}
                error={errors?.year?.message}
                {...register('year', {
                  required: 'Awarding year is required',
                  pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
                })}
                MenuProps={menuProps}
                options={dummyOptions}
                // options={yearsData}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid item lg={4}>
            <Select
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
              options={dummyOptions}
              // options={createSelectFieldData(coursesList.data)}
            />
          </Grid>
        )}

        {qualificationFrom === 'international' ? (
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
                options={dummyOptions}
                // options={customMonthsData}
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
                options={dummyOptions}
                // options={yearsData}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} md={6} lg={4}>
            <Select
              fullWidth
              required
              name="broadSpeciality"
              label="Broad speciality"
              placeholder={'Select year of awarding'}
              variant="outlined"
              value={getValues()?.broadSpeciality}
              defaultValue={getValues()?.broadSpeciality}
              error={errors?.broadSpeciality?.message}
              {...register('broadSpeciality', {
                required: 'Broad Speciality is required',
                // pattern: { value: /^(\d{4})$/i, message: 'Only numbers are acceptable' },
              })}
              MenuProps={menuProps}
              options={dummyOptions}
              // options={yearsData}
            />
          </Grid>
        )}

        <Grid item xs={4}>
          {qualificationFrom === 'india' ? (
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
              options={dummyOptions}
              // options={yearsData}
            />
          )}
        </Grid>

        {qualificationFrom === 'international' && (
          <Grid item lg={4}>
            <TextField
              fullWidth
              required
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
        uploadFileLabel="Upload qualification degree"
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
    </Box>
  );
};

export default AdditionalQualifications;
