import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Container, Modal, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { reActivateLicenseStatus } from '../../store/actions/common-actions';
import { Button, TextField } from '../../ui/core';
// import successToast from '../../ui/core/toaster';

export default function RejectLicenseModal({
  ClosePopup,
  reactiveLicenseRequestHPApplicationData,
}) {
  const [open, setOpen] = useState(true);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    ClosePopup();
  };

  const handleReactivate = () => {
    const { reason } = getValues();
    let reActivateLicenseHealthProfessionalIdBody = {
      request_id: reactiveLicenseRequestHPApplicationData?.Action.value,
      application_type_id: 5,
      actor_id: loggedInUserType === 'SMC' ? 2 : loggedInUserType === 'NMC' ? 3 : 0,
      action_id: 5,
      hp_profile_id: reactiveLicenseRequestHPApplicationData?.registrationNo?.value,
      start_date: reactiveLicenseRequestHPApplicationData?.dateOfSubmission?.value,
      end_date: reactiveLicenseRequestHPApplicationData?.reactivationFromDate?.value,
      remarks: reason,
    };

    dispatch(reActivateLicenseStatus(reActivateLicenseHealthProfessionalIdBody)).then(
      (response) => {
        if (response) {
          ClosePopup();
        }
      }
    );
    // .catch((allFailMsg) => {
    //   successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    // });
  };

  const theme = useTheme();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      reason: '',
    },
  });

  return (
    <Box>
      <Modal open={open} onClose={handleClose} sx={{ mt: 5 }}>
        <Container
          maxWidth="sm"
          sx={{ backgroundColor: theme.palette.white.main, borderRadius: '10px', height: '454px' }}
        >
          <Box py={3}>
            <Box display="flex" justifyContent="flex-end">
              <CloseIcon color="grey.context" onClick={handleClose} />
            </Box>
            <Box mb={1} width="100%" textAlign="center">
              <ErrorIcon fontSize="width48" color="warning" />
            </Box>
            <Typography
              variant="h2"
              mt="18px"
              color={'primary.main'}
              fontSize={'24px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              Reason to Reject Application
            </Typography>
            <Box>
              <Box>
                <Typography variant="body3" color="inputTextColor.main" component="span">
                  Add Reason
                </Typography>
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Box>
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Add your reason here . . ."
                sx={{
                  textarea: {
                    '::placeholder': {
                      color: '#BFBFBF',
                    },
                  },
                }}
                name="reason"
                required
                defaultValue={getValues().reason}
                error={errors.reason?.message}
                {...register('reason', {
                  required: 'This field is required',
                })}
              />
            </Box>
            <Box display="flex" textAlign="right">
              <Typography color="inputFocusColor.main">150 words only</Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={5}>
              <Button
                variant="contained"
                color="grey"
                sx={{
                  mr: 1,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit(handleReactivate)}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}
