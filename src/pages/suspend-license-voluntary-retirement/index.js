import { useState } from 'react';

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';
import { Box, Dialog, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getInitiateWorkFlow } from '../../store/actions/common-actions';
import { changeUserActiveTab } from '../../store/reducers/common-reducers';
import { Button, Checkbox, RadioGroup, TextField } from '../../ui/core';
import successToast from '../../ui/core/toaster';

export function SuspendLicenseVoluntaryRetirement({
  tabName,
  selectedValue,
  handleClose,
  closeActionModal,
  showSuccessPopup,
  setSuccessPopupMessage,
  selectedSuspendLicenseProfile,
}) {
  const dispatch = useDispatch();

  const { loginData } = useSelector((state) => state.loginReducer);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const [selectedSuspension, setSelectedSuspension] = useState('voluntary-suspension-check');
  const [selectedFromDate, setSelectedFromDate] = useState();
  const { userActiveTab } = useSelector((state) => state.common);
  const [conformSuspend, setConformSuspend] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      voluntarySuspendLicense: 'voluntary-suspension-check',
      fromDate: '',
      toDate:
        selectedSuspension === 'permanent-suspension-check' || selectedValue === 'suspend'
          ? selectedFromDate?.length >= 10 && selectedFromDate
          : '',
    },
  });

  const onSubmit = () => {
    setConformSuspend(true);
    setConfirmationModal(true);
    let action_id;
    switch (selectedValue) {
      case 'forward':
        action_id = 2;
        setSuccessPopupMessage('Forwarded Successfully');
        break;
      case 'raise':
        action_id = 3;
        setSuccessPopupMessage('Query Raised Successfully');
        break;
      case 'verify':
        action_id = 4;
        setSuccessPopupMessage('Approved Successfully');
        break;
      case 'reject':
        action_id = 5;
        setSuccessPopupMessage('Rejected Successfully');
        break;
      case 'suspend':
        action_id = 6;
        setSuccessPopupMessage('Temporarily Suspended');
        break;
      case 'blacklist':
        action_id = 7;
        setSuccessPopupMessage('Permanently Suspended');
        break;
      default:
        action_id = 1;
        break;
    }

    let workFlowData = {
      request_id: personalDetails?.request_id,
      application_type_id: personalDetails.application_type_id
        ? personalDetails?.application_type_id
        : 1,
      actor_id: loginData?.data?.user_group_id,
      action_id: action_id,
      hp_profile_id: personalDetails?.hp_profile_id
        ? personalDetails?.hp_profile_id
        : userActiveTab === 'voluntary-suspend-license'
        ? loginData?.data?.profile_id
        : userActiveTab === 'track-status'
        ? selectedSuspendLicenseProfile?.view?.value
        : '',
      start_date: getValues()?.fromDate ? getValues()?.fromDate : '',
      to_date: getValues()?.toDate ? getValues()?.toDate : '',
      remarks: getValues()?.remark ? getValues()?.remark : '',
    };
    try {
      dispatch(getInitiateWorkFlow(workFlowData))
        .then((response) => {
          showSuccessPopup(true);
          if (response) {
            userActiveTab === 'voluntary-suspend-license' &&
              dispatch(changeUserActiveTab('my-profile'));
          }
        })
        .catch((error) => {
          successToast(
            'ERR_INT: ' + error?.data?.response?.data?.error,
            'UpdateError',
            'error',
            'top-center'
          );
          closeActionModal(false);
        });
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  };

  const handlevoluntarySuspendLicenseChange = (event) => {
    setSelectedSuspension(event.target.value);
    reset({ toDate: '', fromDate: '', remark: '' });
  };

  const autoFromDateSelected = (event) => {
    const temp1 = +event.target.value.substring(0, 4) + 99 + '';
    const temp2 = event.target.value.replace(event.target.value.substring(0, 4), temp1);
    selectedSuspension === 'permanent-suspension-check' && setValue('toDate', temp2);
    setSelectedFromDate(temp2);
  };

  return (
    <Box data-testid="suspend-license-voluntary-retirement" width="100%">
      {!tabName && selectedValue !== 'forward' && (
        <Box align={'center'}>
          {selectedValue === 'raise' ? (
            <HelpIcon fontSize="width40" sx={{ color: 'secondary.warningYellow' }} />
          ) : selectedValue === 'reject' ? (
            <ErrorIcon color="error" sx={{ fontSize: '40px' }} />
          ) : selectedValue === 'verify' || selectedValue === 'approve' ? (
            <CheckCircleIcon color="success" sx={{ fontSize: '50px' }} />
          ) : (
            <BlockIcon color="error" fontSize="width40" />
          )}
        </Box>
      )}
      {selectedValue === 'forward' && (
        <Box display={'flex'} alignItems="flex-start">
          <Box>
            <ErrorIcon color="error" fontSize="width24" />
          </Box>
          <Box>
            <Typography variant="h3">ALERT!</Typography>
          </Box>
        </Box>
      )}
      {tabName && (
        <Typography variant="h2">
          {tabName === 'voluntary-retirement'
            ? 'Voluntary Retirement'
            : tabName === 'suspend-license'
            ? 'Suspend License'
            : // : tabName === 'voluntary-suspend-license'
              // ? 'Voluntary Suspend License'
              ''}
        </Typography>
      )}

      <Typography variant="h2" mt={2} mb={4} color="primary" textAlign={'center'}>
        {selectedValue === 'verify'
          ? 'VERIFY!'
          : selectedValue === 'raise'
          ? 'Raise a Query for all'
          : selectedValue === 'approve'
          ? 'Reason to Approve Application'
          : selectedValue === 'reject'
          ? 'Reason to Reject Application'
          : selectedValue === 'suspend'
          ? 'Want to Permanent Suspend?'
          : selectedValue === 'blacklist'
          ? 'Request NMC to Temporary Suspend?'
          : ''}
      </Typography>
      {selectedValue === 'raise' ||
      selectedValue === 'verify' ||
      selectedValue === 'forward' ||
      selectedValue === 'approve' ||
      selectedValue === 'reject' ? (
        ''
      ) : (
        <Box>
          {tabName === 'voluntary-suspend-license' && (
            <Grid item xs={12} md={12} mb={2}>
              <Typography variant="subtitle2" color="textPrimary.main">
                {'Select Suspension'}
                <Typography variant="body4" color="error.main">
                  *
                </Typography>
              </Typography>
              <RadioGroup
                row
                name={'voluntarySuspendLicense'}
                size="small"
                required={true}
                defaultValue={getValues().voluntarySuspendLicense}
                error={errors.voluntarySuspendLicense?.message}
                {...register('voluntarySuspendLicense', {
                  required: 'Select suspend type',
                  onChange: (e) => handlevoluntarySuspendLicenseChange(e),
                })}
                items={[
                  {
                    value: 'voluntary-suspension-check',
                    label: 'Voluntary Suspension',
                  },
                  {
                    value: 'permanent-suspension-check',
                    label: 'Permanent Suspension',
                  },
                ]}
              />
            </Grid>
          )}

          <Typography variant="subtitle2">
            {'Add Timeline'}
            <Typography variant="body4" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid container mt={1} columnSpacing={4}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography component={'p'} variant="body1">
                Select From Date
              </Typography>
              <TextField
                fullWidth
                data-testid="fromDate"
                id="fromDate"
                type="date"
                name="fromDate"
                sx={{
                  height: '48px',
                  input: {
                    color: 'grey1.dark',
                    textTransform: 'uppercase',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                required={true}
                defaultValue={getValues().fromDate}
                error={errors.fromDate?.message}
                {...register('fromDate', {
                  required: 'Enter From Date ',
                  onChange: (e) => autoFromDateSelected(e),
                })}
              />
            </Grid>
            <Grid item xs={12} md={6} my={{ xs: 1, md: 0 }}>
              <Typography component={'p'} variant="body1">
                Select To Date
              </Typography>
              <TextField
                fullWidth
                data-testid="toDate"
                id="toDate"
                type="date"
                name="toDate"
                sx={{
                  input: {
                    color: 'grey1.dark',
                    textTransform: 'uppercase',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  sx: { height: '40px' },
                }}
                disabled={selectedSuspension === 'permanent-suspension-check' ? true : false}
                required={true}
                defaultValue={getValues().toDate}
                error={errors.toDate?.message}
                {...register('toDate', {
                  required: 'Enter to date',
                })}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {tabName === 'voluntary-suspend-license' ||
      selectedValue === 'raise' ||
      selectedValue === 'approve' ||
      selectedValue === 'reject' ||
      selectedValue === 'suspend' ||
      selectedValue === 'blacklist' ? (
        <Box mt={4}>
          <Typography variant="subtitle2">
            {selectedValue === 'raise' || selectedValue === 'reject' || selectedValue === 'approve'
              ? 'Add Reason'
              : 'Remarks'}
            <Typography variant="body4" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid item xs={12}>
            <TextField
              fullWidth
              data-testid="remark"
              id="remark"
              type="text"
              multiline
              minRows={4}
              inputProps={{ maxLength: 150 }}
              name="remark"
              required={true}
              placeholder={
                tabName || selectedValue === 'suspend' || selectedValue === 'blacklist'
                  ? 'Add a reason...'
                  : selectedValue === 'raise'
                  ? 'Write something here . . .'
                  : selectedValue === 'reject' || selectedValue === 'approve'
                  ? 'Add your reason here . . .'
                  : ''
              }
              defaultValue={getValues().remark}
              error={errors.remark?.message}
              {...register('remark', {
                required: 'Enter remarks',
              })}
            />
          </Grid>
          <Box align="right" mt={1}>
            <Typography color={'inputFocusColor.main'}>150 word only</Typography>
          </Box>
        </Box>
      ) : (
        ''
      )}
      <Box align={selectedValue === 'verify' ? 'center' : ''}>
        <Typography
          mt={4}
          color="grey.context"
          textAlign={selectedValue === 'verify' ? 'center' : ''}
          variant="h3"
          width="320px"
        >
          {selectedValue === 'verify'
            ? 'Are you sure you want to approve the details of the doctor?'
            : selectedValue === 'forward'
            ? 'Are you sure you want to forward doctor details to College?'
            : ''}
        </Typography>
      </Box>

      {tabName || selectedValue === 'blacklist' || selectedValue === 'suspend' ? (
        <Box my={4} ml={1}>
          <Checkbox
            name="notification"
            {...register('notification', {
              required: 'Please indicate that you accept the Terms and Conditions',
            })}
            sx={{ padding: '0 8px 0 0' }}
            label={
              tabName
                ? 'You will no longer be able to receive notifications or perform actions on your profile.'
                : selectedValue === 'blacklist' || selectedValue === 'suspend'
                ? 'Doctor will no longer be able to receive notifications or perform actions on his/her profile.'
                : ''
            }
            error={errors.notification?.message}
          />
        </Box>
      ) : (
        ''
      )}
      {selectedValue === 'raise' && (
        <Box>
          <Typography>Raise a Query for the following*</Typography>
          <Box display={'flex'}>
            <Box my={4} color="grey1.dark">
              <Checkbox
                sx={{ padding: '0 8px 0 0' }}
                name="notification"
                {...register('notification', {
                  required: 'This field is required',
                })}
                label={'Country name'}
                error={errors.notification?.message}
              />
              <Checkbox
                sx={{ padding: '0 8px 0 0' }}
                name="notification"
                {...register('notification', {
                  required: 'This field is required',
                })}
                label={'Name of the college'}
                error={errors.notification?.message}
              />
            </Box>
          </Box>
        </Box>
      )}
      {tabName && (
        <Box align="left" my={5}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
            sx={{
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
          >
            {'Submit'}
          </Button>
          <Button
            color="grey"
            variant="contained"
            sx={{
              my: {
                xs: 1,
                md: 0,
              },
              ml: {
                xs: 0,
                md: 2,
              },
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      )}
      {selectedValue && (
        <Box align="right" my={5}>
          {selectedValue === 'raise' ||
          selectedValue === 'reject' ||
          selectedValue === 'suspend' ||
          selectedValue === 'approve' ||
          selectedValue === 'blacklist' ? (
            <Button variant="contained" color="grey" onClick={handleClose}>
              Cancel
            </Button>
          ) : (
            ''
          )}
          {selectedValue === 'blacklist' ? (
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Temporary suspend
            </Button>
          ) : selectedValue === 'suspend' ? (
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              Permanent suspend
            </Button>
          ) : selectedValue === 'reject' ||
            selectedValue === 'approve' ||
            selectedValue === 'raise' ? (
            // eslint-disable-next-line
            <Button
              color="secondary"
              variant="contained"
              sx={{ marginLeft: 2 }}
              // onClick={handleSubmit(onSubmit)}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          ) : (
            ''
          )}
          {selectedValue === 'verify' || selectedValue === 'forward' ? (
            <Box align={selectedValue === 'forward' ? 'right' : 'center'}>
              <Button color="grey" variant="contained" sx={{ marginLeft: 2 }} onClick={handleClose}>
                No
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={{ marginLeft: 2 }}
                onClick={handleSubmit(onSubmit)}
              >
                Yes
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Box>
      )}
      {conformSuspend && (
        <Dialog
          open={confirmationModal && userActiveTab === 'voluntary-suspend-license'}
          onClose={() => {
            setConfirmationModal(false);
          }}
        >
          <Box p={2} width="410px" height="200">
            <Box
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              data-testid="message"
            >
              <ErrorIcon color="error" sx={{ fontSize: '30px' }} />
              <Typography color="textPrimary.main" variant="h3" p={1}>
                Alert!
              </Typography>
              <CloseIcon onClick={handleClose} />
            </Box>
            <Box mt={4}>
              <Typography color="textPrimary.main">
                {`Are you sure you want to ${
                  selectedSuspension === 'voluntary-suspension-check'
                    ? 'voluntary suspend'
                    : 'permanent suspend'
                } this application`}
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'flex-end'} mt={1}>
              <Button
                onClick={() => {
                  setConformSuspend(false);
                  setConfirmationModal(false);
                }}
                data-testid="confirmModal"
                color="grey"
                variant="contained"
                sx={{
                  margin: '0 4px',
                }}
              >
                No
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                color="secondary"
                variant="contained"
                sx={{
                  margin: '0 4px',
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </Box>
  );
}

export default SuspendLicenseVoluntaryRetirement;
