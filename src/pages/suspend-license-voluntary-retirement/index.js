import { useState } from 'react';

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';
import { Box, Dialog, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getInitiateWorkFlow, raiseQuery, suspendDoctor } from '../../store/actions/common-actions';
import { Button, Checkbox, RadioGroup, TextField } from '../../ui/core';
import successToast from '../../ui/core/toaster';

export function SuspendLicenseVoluntaryRetirement({
  tabName,
  selectedValue,
  handleClose,
  closeActionModal,
  showSuccessPopup,
  setActionVerified,
  selectedAcademicStatus,
  setSuccessPopupMessage,
  selectedSuspendLicenseProfile,
}) {
  const dispatch = useDispatch();

  const { userActiveTab } = useSelector((state) => state.common);
  const { loginData } = useSelector((state) => state?.loginReducer);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { queryRaisedFor } = useSelector((state) => state?.raiseQuery?.raiseQueryData);
  const user_group_id = useSelector((state) => state.loginReducer?.loginData?.data);

  const [selectedSuspension, setSelectedSuspension] = useState('voluntary-suspension-check');
  const [selectedFromDate, setSelectedFromDate] = useState();
  const [conformSuspend, setConformSuspend] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [queries, setQueries] = useState([]);

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
  const { activateLicenseList } = useSelector((state) => state?.common);

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
        action_id = 7;
        setSuccessPopupMessage('Temporarily Suspended');
        break;
      case 'blacklist':
        action_id = 6;
        setSuccessPopupMessage('Permanently Suspended');
        break;
      default:
        action_id = 1;
        setSuccessPopupMessage('User ID suspended successfully');
        break;
    }
    let temp_application_type_id;
    if (userActiveTab === 'track-status') {
      temp_application_type_id =
        selectedValue === 'suspend' ? 4 : selectedValue === 'blacklist' ? 3 : 1;
    } else {
      temp_application_type_id =
        selectedSuspension === 'voluntary-suspension-check'
          ? 3
          : selectedSuspension === 'permanent-suspension-check'
          ? 4
          : 1;
    }

    let suspendDoctorBody = {
      hp_profile_id:
        userActiveTab === 'voluntary-suspend-license'
          ? loginData?.data?.profile_id
          : userActiveTab === 'track-status'
          ? selectedSuspendLicenseProfile?.view?.value
          : '',
      application_type_id: temp_application_type_id,
      action_id:
        selectedValue === 'suspend'
          ? 7
          : selectedValue === 'blacklist'
          ? 6
          : userActiveTab === 'voluntary-suspend-license'
          ? 1
          : '',
      from_date: getValues()?.fromDate ? getValues()?.fromDate : '',
      to_date: getValues()?.toDate ? getValues()?.toDate : '',
      remarks: getValues()?.remark ? getValues()?.remark : '',
    };

    let workFlowData = {
      request_id: personalDetails?.request_id,
      application_type_id: personalDetails?.application_type_id
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
        : activateLicenseList?.data.health_professional_details[
            selectedSuspendLicenseProfile?.SNo?.value - 1
          ]?.health_professional_id
        ? activateLicenseList?.data.health_professional_details[
            selectedSuspendLicenseProfile?.SNo?.value - 1
          ]?.health_professional_id
        : '',
      start_date: getValues()?.fromDate ? getValues()?.fromDate : '',
      to_date: getValues()?.toDate ? getValues()?.toDate : '',
      remarks: getValues()?.remark ? getValues()?.remark : '',
    };
    let raiseQueryBody = {
      queries: queries,
      hpProfileId: personalDetails?.hp_profile_id ? personalDetails?.hp_profile_id : '',
      commonComment: getValues().remark,

      groupId: user_group_id?.user_group_id,
      requestId: personalDetails?.request_id ? personalDetails?.request_id : '',
      applicationTypeId: personalDetails?.application_type_id
        ? personalDetails?.application_type_id
        : 1,
    };

    try {
      if (
        ((confirmationModal && userActiveTab === 'voluntary-suspend-license') ||
          userActiveTab === 'track-status' ||
          selectedValue === 'suspend' ||
          selectedValue === 'blacklist') &&
        selectedAcademicStatus !== 'Temporary Suspension Requests Received' &&
        selectedAcademicStatus !== 'Permanent Suspension Requests Received'
      ) {
        dispatch(suspendDoctor(suspendDoctorBody))
          .then((response) => {
            if (response) {
              if (
                getValues()?.voluntarySuspendLicense === 'permanent-suspension-check' ||
                selectedValue === 'suspend'
              ) {
                setSuccessPopupMessage('Permanently Suspended');
              } else if (getValues()?.voluntarySuspendLicense === 'voluntary-suspension-check') {
                setSuccessPopupMessage('Temporarily Suspended');
              }
              showSuccessPopup(true);
              setConfirmationModal(false);
            }
          })
          .catch(() => {
            closeActionModal(false);
          });
      } else {
        if (selectedValue === 'raise') {
          dispatch(raiseQuery(raiseQueryBody))
            .then((response) => {
              if (response) {
                showSuccessPopup(true);
                setActionVerified(true);
                closeActionModal(false);
              }
            })
            .catch(() => {
              closeActionModal(false);
            });
        } else {
          dispatch(getInitiateWorkFlow(workFlowData))
            .then((response) => {
              if (response) {
                showSuccessPopup(true);
                setActionVerified(true);
                closeActionModal(false);
              }
            })
            .catch(() => {
              closeActionModal(false);
            });
        }
      }
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
    if (selectedSuspension === 'permanent-suspension-check' || selectedValue === 'suspend') {
      setValue('toDate', temp2);
    }
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
        <Box align={'center'}>
          <Box>
            <ErrorIcon color="error" sx={{ fontSize: '50px' }} />
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
            : ''}
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
                    color: 'black',
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
              {((tabName === 'voluntary-suspend-license' &&
                selectedSuspension !== 'permanent-suspension-check') ||
                selectedValue === 'blacklist') && (
                <>
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
                        color: 'black',
                        textTransform: 'uppercase',
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: { height: '40px' },
                    }}
                    disabled={
                      selectedSuspension === 'permanent-suspension-check' ||
                      selectedValue === 'suspend'
                        ? true
                        : false
                    }
                    inputProps={{
                      min: new Date().toISOString().split('T')[0],
                    }}
                    required={true}
                    defaultValue={getValues().toDate}
                    error={errors.toDate?.message}
                    {...register('toDate', {
                      required: 'Enter To Date',
                    })}
                  />
                </>
              )}
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
                required: 'Enter Remarks',

                pattern: {
                  value: /^(?:\b\w+\b[\s\r\n]*){1,300}$/,
                  message: 'Maximum word limit exceeded',
                },
              })}
            />
          </Grid>
          <Box align="right" mt={1}>
            <Typography color="grey2.light">300 words only</Typography>
          </Box>
        </Box>
      ) : (
        ''
      )}
      <Box align={selectedValue === 'verify' ? 'center' : ''}>
        <Typography
          mt={2}
          color="grey.context"
          textAlign={selectedValue === 'verify' || selectedValue === 'forward' ? 'center' : ''}
          variant="h3"
        >
          {selectedValue === 'verify' &&
          (selectedAcademicStatus !== 'Temporary Suspension Requests Received' ||
            selectedAcademicStatus !== 'Permanent Suspension Requests Received')
            ? 'Are you sure you want to approve the details of the doctor?'
            : selectedValue === 'verify' &&
              (selectedAcademicStatus === 'Temporary Suspension Requests Received' ||
                selectedAcademicStatus === 'Permanent Suspension Requests Received')
            ? 'Are you sure you want to approve suspension request of the doctor.'
            : selectedValue === 'forward'
            ? 'Are you sure you want to forward the doctor details to College/NBE?'
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
                ? 'I understand that during the period of my suspension, I will not be able to practice, and my NMR profile will be deactivated.'
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
            <Box my={4} color="inputTextColor.main">
              {queryRaisedFor?.map((fieldData, index) => {
                return (
                  <Checkbox
                    key={index}
                    sx={{ padding: '0 8px 0 0' }}
                    name={fieldData?.filedName}
                    value={fieldData?.value}
                    onChange={(e) => {
                      let updatedQuery = queries;
                      if (e.target.checked) {
                        updatedQuery?.push({
                          fieldName: e?.target?.name,
                          queryComment: e?.target.value,
                        });
                      } else {
                        updatedQuery?.splice(index, 1);
                      }

                      setQueries(updatedQuery);
                    }}
                    label={fieldData?.filedName}
                    error={errors.notification?.message}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
      {tabName && (
        <Box align="left" my={5}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              if (tabName === 'voluntary-suspend-license') {
                setConformSuspend(true);
                setConfirmationModal(true);
              } else {
                handleSubmit(onSubmit);
              }
            }}
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
        <Box align="right" my={2}>
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
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          ) : (
            ''
          )}
          {selectedValue === 'verify' || selectedValue === 'forward' ? (
            <Box align="center">
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
              <CloseIcon
                onClick={() => {
                  setConformSuspend(false);
                  setConfirmationModal(false);
                }}
              />
            </Box>
            <Box mt={2}>
              <Typography color="textPrimary.main">
                {`Are you sure you want to ${
                  selectedSuspension === 'voluntary-suspension-check'
                    ? 'voluntary suspend'
                    : 'permanent suspend'
                } this license?`}
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
