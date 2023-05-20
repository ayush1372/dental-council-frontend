import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import ReactivationLogo from '../../../src/assets/images/reactivate-license-icon.png';
import { createReActivateLicense } from '../../store/actions/common-actions';
import { DatePicker, TextField } from '../../ui/core';
import successToast from '../../ui/core/toaster';
export default function ReactivateLicencePopup(props) {
  const [open, setOpen] = useState(true);
  const [showFromDateError, setShowFromDateError] = useState(false);

  const { loginData } = useSelector((state) => state?.loginReducer);
  const dispatch = useDispatch();

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handleClose = () => {
    setOpen(false);
    props.closeReactivateLicense();
  };

  function handleReactivate() {
    const { fromDate, reason } = getValues();

    let reActivateLicensebody = {
      hp_profile_id: loginData?.data?.profile_id,
      application_type_id: 5,
      action_id: 1,
      from_date: fromDate,
      remarks: reason,
    };

    dispatch(createReActivateLicense(reActivateLicensebody))
      .then((response) => {
        if (response?.data?.toString()?.length > 0) {
          props.renderSuccess();
        }
      })
      .catch((allFailMsg) => {
        successToast(
          'ERR_INT: ' + JSON.stringify(allFailMsg?.data?.message),
          'auth-error',
          'error',
          'top-center'
        );
      });
  }

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15, height: '561px' }}>
      <Container
        maxWidth="sm"
        sx={{ backgroundColor: 'white.main', borderRadius: '10px', height: '544px' }}
      >
        <Box py={3}>
          <Box mt={1} p={1} mb={2} width="100%" display="flex">
            <img
              src={ReactivationLogo}
              alt="Reactivation licence logo"
              width="30px"
              height="30px"
            />
            <Typography variant="h2" color="primary" ml={3} data-testid="popup-input-text">
              Reactivate License
            </Typography>
            <CloseIcon color="grey.context" onClick={handleClose} />
          </Box>
          <Box mb={4}>
            <Typography variant="subtitle2" color="inputTextColor.main" component="span">
              Re-activate from
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>

            <DatePicker
              value={getValues()?.fromDate}
              onChangeDate={(newDateValue) => {
                setValue('fromDate', new Date(newDateValue)?.toLocaleDateString('en-GB'));
                setShowFromDateError(false);
              }}
              data-testid="fromDate"
              id="fromDate"
              name="fromDate"
              required={true}
              defaultValue={getValues().fromDate}
              error={showFromDateError ? 'Enter Re-activate from' : false}
            />
          </Box>

          <Box>
            <Box>
              <Typography
                data-testid="fieldName_reason"
                variant="subtitle2"
                color="inputTextColor.main"
                component="span"
              >
                Reason
              </Typography>
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Box>
            <TextField
              data-testid="Reason"
              multiline
              rows={4}
              fullWidth
              name="reason"
              placeholder="Add a reason..."
              required={true}
              defaultValue={getValues().reason}
              error={errors.reason?.message}
              {...register('reason', {
                required: 'This field is required',
              })}
            />
          </Box>
          <Box display="flex" textAlign="right">
            <Typography color="grey1.main">150 words only</Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={5}>
            <Button
              onClick={() => handleClose()}
              variant="contained"
              color="grey"
              sx={{
                mr: 1,
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ ml: 2 }}
              onClick={() => {
                if (getValues().fromDate === undefined) {
                  setShowFromDateError(true);
                }
                handleSubmit(handleReactivate);
              }}
              variant="contained"
              color="secondary"
            >
              Reactivate
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
