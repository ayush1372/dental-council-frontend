import { useState } from 'react';

import { Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

// import { useDispatch } from 'react-redux';
// import { getProfileId } from '../../../../helpers/functions/common-functions';
// import { getWorkProfileDetailsData } from '../../../../store/actions/doctor-user-profile-actions';
// import successToast from '../../../../ui/core/toaster';
// import ReadWorkProfile from './read-profile';
import { RadioGroup } from '../../../../ui/core';
import NonWorkDetails from './non-work-details';
import WorkDetails from './work-details';

const WorkProfile = () => {
  const [currentlyWorking, setCurrentlyWorking] = useState('yes');
  // const dispatch = useDispatch();

  // const profile_id = useMemo(() => getProfileId(), []);

  // useEffect(() => {
  //   dispatch(getWorkProfileDetailsData(profile_id)).catch((allFailMsg) => {
  //     successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
  //   });
  // }, [profile_id]);

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
            defaultValue={currentlyWorking}
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
