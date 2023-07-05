import { useEffect, useState } from 'react';

import { Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getWorkProfileDetailsData } from '../../../../store/actions/doctor-user-profile-actions';
import { RadioGroup } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';
import NonWorkDetails from './non-work-details';
import WorkDetails from './work-details';

const WorkProfile = () => {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.loginReducer);

  const [currentlyWorking, setCurrentlyWorking] = useState('');
  const [workingDetails, setWorkingDetails] = useState('');
  const { work_details } = useSelector(
    (state) => state?.doctorUserProfileReducer?.workProfileDetails
  );

  useEffect(() => {
    dispatch(getWorkProfileDetailsData(loginData?.data?.profile_id))
      .then((response) => {
        if (response?.data) {
          setCurrentlyWorking(
            response?.data?.work_details?.is_user_currently_working === 1 ? 'no' : 'yes'
          );
          setWorkingDetails(response?.data?.current_work_details);
        }
      })
      .catch(() => {
        successToast(
          'No matching work profile details found for the given hp_profile_id.',
          'auth-error',
          'error',
          'top-center'
        );
      });
  }, []);

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const handleCurrentWorking = (e) => {
    setCurrentlyWorking(e?.target?.value);
    if (e?.target?.value === 'no') {
      setValue('NatureOfWork', '');
      setValue('workingOrganizationName', '');
      setValue('organizationType', '');
      setValue('Address', '');
      setValue('Street', '');
      setValue('Landmark', '');
      setValue('Locality', '');
      setValue('Country', '');
      setValue('state', '');
      setValue('District', '');
      setValue('SubDistrict', '');
      setValue('Area', '');
      setValue('pincode', '');
      setValue('telecommunicationURL', '');
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor.main">
            Are you currently working
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <RadioGroup
            onChange={handleCurrentWorking}
            name={'currentWorkingSelection'}
            size="small"
            defaultValue={work_details?.is_user_currently_working === 1 ? 'no' : ''}
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
            value={currentlyWorking}
          />
        </Grid>
        {currentlyWorking === 'no' && (
          <NonWorkDetails
            errors={errors}
            getValues={getValues}
            register={register}
            setValue={setValue}
            handleSubmit={handleSubmit}
            watch={watch}
            workingDetails={workingDetails}
          />
        )}
        {currentlyWorking === 'yes' && (
          <WorkDetails
            currentWorkingSelection={currentlyWorking}
            errors={errors}
            getValues={getValues}
            register={register}
            setValue={setValue}
            handleSubmit={handleSubmit}
            watch={watch}
          />
        )}
      </Grid>
    </Container>
  );
};

export default WorkProfile;
