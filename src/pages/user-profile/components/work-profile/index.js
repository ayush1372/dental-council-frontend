import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorMessages } from '../../../../constants/error-messages';
import { getWorkProfileDetailsData } from '../../../../store/actions/doctor-user-profile-actions';
import { RadioGroup } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';
import FacilityDetailsTable from './facility-details-table';
import NonWorkDetails from './non-work-details';
import WorkDetails from './work-details';

const WorkProfile = () => {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.loginReducer);
  const { workProfileDetails } = useSelector((state) => state.doctorUserProfileReducer);

  const [currentlyWorking, setCurrentlyWorking] = useState('');
  const [defaultFacilityData, setDefaultFacilityData] = useState([]);

  useEffect(() => {
    dispatch(getWorkProfileDetailsData(loginData?.data?.profile_id))
      .then((response) => {
        if (response?.data) {
          setCurrentlyWorking(
            response?.data?.work_details?.is_user_currently_working === 1 ? 'no' : 'yes'
          );
          setDefaultFacilityData(response?.data);
        }
      })
      .catch(() => {
        successToast(ErrorMessages.noMatchingWork, 'auth-error', 'error', 'top-center');
      });
  }, []);

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
    clearErrors,
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
    
    <Grid container spacing={2} px={3}>
      <Typography variant={'h2'} color={'primary.main'} px={2} pt={3} pb={0}>Work Details</Typography>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" color="inputTextColor.main">
          Are you Currently Working?
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <RadioGroup
          onChange={handleCurrentWorking}
          name={'currentWorkingSelection'}
          size="small"
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
          workingDetails={workProfileDetails?.work_details}
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
          setDefaultFacilityData={setDefaultFacilityData}
          setCurrentlyWorking={setCurrentlyWorking}
          clearErrors={clearErrors}
        />
      )}
      {defaultFacilityData?.current_work_details?.length > 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Typography
              bgcolor="grey1.light"
              p={1}
              mx={2}
              component="div"
              color="tabHighlightedBackgroundColor.main"
              variant="h3"
            >
              Declared Place Of Work
            </Typography>
          </Grid>

          {(workProfileDetails?.work_details?.is_user_currently_working === 1 ||
            workProfileDetails?.work_details?.is_user_currently_working === '1') && (
            <Grid item xs={12} padding="10px 0 !important" ml={1}>
              <Typography p={1} component="div" color="error.main" variant="h3">
                Currently not working - {'  '} {workProfileDetails?.work_details?.reason}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} padding="10px 0 !important">
            <FacilityDetailsTable
              declaredFacilityData={defaultFacilityData}
              currentWorkDetails={workProfileDetails?.current_work_details}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default WorkProfile;
