import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import { updateDoctorWorkDetails } from '../../../../store/actions/doctor-user-profile-actions';
import { Button, Select, TextField } from '../../../../ui/core';

const reasonOptions = [
  {
    label: 'Retired',
    value: 'retired',
  },
  {
    label: 'Voluntary Opt-Out',
    value: 'optOut',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
  {
    label: 'Any Other',
    value: 'anyOther',
  },
];

const NonWorkDetails = ({
  watch,
  errors,
  register,
  setValue,
  getValues,
  handleSubmit,
  workingDetails,
}) => {
  const dispatch = useDispatch();
  const reasonWatch = watch('reason');

  const [successModalPopup, setSuccessModalPopup] = useState(false);

  const { loginData } = useSelector((state) => state?.loginReducer);
  const { work_details } = useSelector(
    (state) => state?.doctorUserProfileReducer?.workProfileDetails
  );

  useEffect(() => {
    setValue('reason', workingDetails?.reason);
  }, [workingDetails]);

  const handleSave = () => {
    const workDetails = {
      current_work_details: [],
      work_details: {
        is_user_currently_working: 1,
        reason: getValues()?.reason || '',
        remark: getValues()?.otherReason || '',
      },
      hp_profile_id: loginData.data.profile_id,
    };

    dispatch(updateDoctorWorkDetails(workDetails, loginData.data.profile_id)).then(() => {
      setSuccessModalPopup(true);
    });
  };

  return (
    <>
      <Grid item xs={12} md={4}>
        <Select
          fullWidth
          error={errors.reason?.message}
          name="reason"
          label="Please select the reason"
          defaultValue={work_details?.reason}
          value={getValues()?.reason}
          required={true}
          {...register('reason', {
            required: 'Reason is required',
          })}
          options={reasonOptions}
        />
      </Grid>
      {reasonWatch === 'anyOther' && (
        <Grid item xs={12} md={4}>
          <TextField
            name="otherReason"
            label="Other reason"
            multiline
            rows={4}
            fullWidth
            defaultValue={work_details?.remark}
            error={errors.otherReason?.message}
            {...register('otherReason')}
            placeholder="Write a reason here . . ."
          />
        </Grid>
      )}
      <Grid item xs={12} md={8} lg={6}>
        <Button
          onClick={handleSubmit(handleSave)}
          variant="contained"
          color="secondary"
          sx={{
            margin: {
              xs: '5px 0',
              md: '0',
            },
            width: {
              xs: '100%',
              md: 'fit-content',
              height: '52px',
            },
          }}
        >
          Submit
        </Button>
      </Grid>
      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          workDetails={true}
          setOpen={() => setSuccessModalPopup(false)}
          text={'Work detail have been updated'}
        />
      )}
    </>
  );
};

export default NonWorkDetails;
