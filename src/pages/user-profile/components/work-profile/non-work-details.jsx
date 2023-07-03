import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import { updateDoctorWorkDetails } from '../../../../store/actions/doctor-user-profile-actions';
import { Button, Select, TextField } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';

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

  const handleSave = () => {
    const workDetails = {
      work_details: {
        is_user_currently_working: 1,
      },
      current_work_details: [
        {
          reason: getValues()?.reason,
          remark: getValues()?.otherReason,
        },
      ],
      hp_profile_id: loginData.data.profile_id,
    };

    dispatch(updateDoctorWorkDetails(workDetails, loginData.data.profile_id))
      .then(() => {
        setSuccessModalPopup(true);
      })
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };

  useEffect(() => {
    setValue('reason', workingDetails[0]?.reason);
  }, [workingDetails]);

  return (
    <>
      <Grid item xs={12} md={4}>
        <Select
          fullWidth
          error={errors.reason?.message}
          name="reason"
          label="Please select the reason for presently not working"
          defaultValue={work_details?.reason}
          value={getValues()?.reason}
          required={true}
          {...register(
            'reason',
            getValues()?.reason?.length <= 0 && {
              required: 'This field is required',
            }
          )}
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
            error={errors.otherReason?.message}
            {...register('otherReason', {})}
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
          setOpen={() => setSuccessModalPopup(false)}
          text={'Your Work Details has been successfully updated'}
        />
      )}
    </>
  );
};

export default NonWorkDetails;
