import { useEffect, useState } from 'react';

import { Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

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
  const [workingDetails, setWorkingDetails] = useState('');
  const [defaultFacilityData, setDefaultFacilityData] = useState([]);

  useEffect(() => {
    dispatch(getWorkProfileDetailsData(loginData?.data?.profile_id))
      .then((response) => {
        if (response?.data) {
          setCurrentlyWorking(
            response?.data?.work_details?.is_user_currently_working === 1 ? 'no' : 'yes'
          );
          setWorkingDetails(response?.data?.current_work_details);
          setDefaultFacilityData(response?.data);
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
            setDefaultFacilityData={setDefaultFacilityData}
            setCurrentlyWorking={setCurrentlyWorking}
          />
        )}
        {defaultFacilityData?.current_work_details?.length > 0 && (
          <Grid container>
            <Grid item xs={12}>
              <Typography
                bgcolor="grey1.light"
                p={1}
                component="div"
                color="tabHighlightedBackgroundColor.main"
                variant="h3"
              >
                Declared Place Of Work
              </Typography>
            </Grid>
            {(workProfileDetails?.current_work_details?.work_details?.is_user_currently_working ===
              1 ||
              workProfileDetails?.current_work_details?.work_details?.is_user_currently_working ===
                '1') && (
              // eslint-disable-next-line react/jsx-indent
              <Grid item xs={12} padding="10px 0 !important" ml={1}>
                <Typography p={1} component="div" color="error.main" variant="h3">
                  Currently not working
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
    </Container>
  );
};

export default WorkProfile;
