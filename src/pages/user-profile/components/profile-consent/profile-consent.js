import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Dialog, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { getEsignFormDetails } from '../../../../store/actions/doctor-user-profile-actions';
import { updateProfileConsent } from '../../../../store/actions/doctor-user-profile-actions';
import { Button, Checkbox } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';

const ProfileConsent = ({ handleBack, setIsReadMode, resetStep, loggedInUserType }) => {
  const dispatch = useDispatch();
  const personalDetails = useSelector((state) => state?.doctorUserProfileReducer?.personalDetails);
  const eSignResponse = useSelector((state) => state?.doctorUserProfileReducer?.esignDetails?.data);
  const stateData = useSelector((state) => state?.doctorUserProfileReducer);

  const [confirmationModal, setConfirmationModal] = useState(false);

  const { loginData } = useSelector((state) => state?.loginReducer);

  const {
    formState: { errors },
    register,
    getValues,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      consent: false,
    },
  });
  const handleClose = () => {
    setConfirmationModal(false);
  };
  const handleSubmitDetails = () => {
    const { consent } = getValues();
    if (consent) {
      setConfirmationModal(true);
    }
  };
  const handleYesClick = () => {
    const payload = {
      hp_profile_id: loginData?.data?.profile_id,
      application_type_id: 1,
    };

    dispatch(updateProfileConsent(payload))
      .then(() => {
        setConfirmationModal(false);
        setIsReadMode(true);
        resetStep(0);
      })
      .catch((error) => {
        setConfirmationModal(false);
        successToast(
          'ERROR: ' + error.data.response.data.error,
          'auth-error',
          'error',
          'top-center'
        );
      });
  };
  function eSignHandler() {
    let data = {
      signingPlace: personalDetails?.communication_address?.village?.name,
      nmrDetails: {
        nmrPersonalDetail: {
          firstName: personalDetails?.personal_details?.first_name || 'efgh',
          userId: stateData?.personalDetails?.request_id || '747', //cs-1013: need to change this path when backend fixes done
          middleName: personalDetails?.personal_details?.middle_name || 'abcd',
          lastName: personalDetails?.personal_details?.last_name || 'lmnop',
          qualification: personalDetails?.personal_details?.first_name || 'degree', //cs-1013: need to change this path when backend fixes done
          mobileNumber: personalDetails?.personal_details?.mobile || '9999999999',
          emailId: personalDetails?.personal_details?.email || 'mohith2lntinfotech.com',
        },
        nmrPersonalCommunication: {
          address: personalDetails?.communication_address?.address_line1 || 'address',
          country: personalDetails?.communication_address?.country?.name || 'india',
          stateUT: personalDetails?.communication_address?.state?.name || 'delhi',
          district: personalDetails?.communication_address?.district?.name || 'delhi',
          city: personalDetails?.communication_address?.village?.name || 'delhi',
          pincode: personalDetails?.communication_address?.pincode || '383838',
        },
        nmrOfficeCommunication: {
          //this object paylaod need to send exact path later
          address: personalDetails?.communication_address?.address_line1 || 'address',
          country: 'India',
          stateUT: personalDetails?.communication_address?.address_line1 || 'address',
          district: personalDetails?.communication_address?.address_line1 || 'address',
          city: personalDetails?.communication_address?.address_line1 || 'address',
          subDistrict: 'Krishna', //cs-1013:need to change this path when backend fixes done*
          pincode: personalDetails?.communication_address?.address_line1 || '333333',
        },
        isRegCerAttached: 'No', //cs-1013:need to change this path when backend fixes done*
        isDegreeCardAttached: 'No', //cs-1013:need to change this path when backend fixes done*
        isOtherDocumentAttached: 'No', //cs-1013:need to change this path when backend fixes done*
      },
    };
    dispatch(getEsignFormDetails(data));

    document.getElementById('formid')?.submit();
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <Box bgcolor="white.main" py={2} px={{ xs: 1, md: 4 }} mt={2} boxShadow={1}>
        <Typography component="div" color="primary.main" variant="body1" mb={2}>
          Consent
          <Typography component="span" color="error.main">
            *
          </Typography>
        </Typography>
        <Grid
          container
          bgcolor="backgroundColor.light"
          p={3}
          mb={2}
          display="flex"
          border="1px solid"
          borderColor="inputBorderColor.main"
          borderRadius="5px"
        >
          <Grid item xs={12} display="flex">
            <Checkbox
              sx={{ width: '18px', height: '18px', marginLeft: 1 }}
              name="consent"
              {...register('consent', {
                required: 'Consent is Required',
              })}
              error={errors.consent?.message}
            />
            <Typography component="div" variant="body7">
              I hereby declare that I am voluntarily sharing above mentioned particulars and
              information. I certify that the above information furnished by me is true, complete,
              and correct to the best of my knowledge. I understand that in the event of my
              information being found false or incorrect at any stage, I shall be held liable for
              the same.
            </Typography>
          </Grid>
        </Grid>
        {/* <Box
          bgcolor="backgroundColor.light"
          p={3}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        > */}
        <Grid
          container
          alignItems="center"
          columnGap={1}
          bgcolor="success.light"
          p={3}
          borderRadius="5px"
        >
          <Grid item sx="auto" display="flex" alignItems="center">
            <Checkbox
              sx={{ width: '18px', height: '18px' }}
              name="HPR"
              // {...register('consent', {
              //   required: 'Consent is Required',
              // })}
              // error={errors.consent?.message}
            />
            <Typography component="div" variant="body7">
              Save my time,share my details with HPR
            </Typography>
          </Grid>
          <Grid item sx="auto" display="flex" alignItems="center">
            <InfoOutlinedIcon sx={{ height: '14px', width: '14px', color: 'messageBlue.main' }} />
            <Typography component="span" variant="body8" color="messageBlue.main">
              Know more about HPR
            </Typography>
          </Grid>
        </Grid>

        {/* </Box> */}
        <Grid container mt={3}>
          <Grid item xs={12} md>
            <Button
              variant="contained"
              color="grey"
              sx={{
                margin: {
                  xs: '5px 0',
                  md: '0',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
              onClick={handleBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} md="auto" display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                margin: {
                  xs: '5px 0',
                  md: '0',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
            >
              Print & Save as PDF
            </Button>
          </Grid>
          {loggedInUserType !== 'SMC' && (
            <Grid
              item
              xs={12}
              md="auto"
              ml={{ xs: 0, md: 1 }}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                onClick={eSignHandler}
                color="secondary"
                variant="contained"
                sx={{
                  margin: {
                    xs: '5px 0',
                    md: '0',
                  },
                  width: {
                    xs: '100%',
                    md: 'fit-content',
                  },
                }}
              >
                E-sign Profile
              </Button>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md="auto"
            ml={{ xs: 0, md: 1 }}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              color="secondary"
              variant="contained"
              sx={{
                margin: {
                  xs: '5px 0',
                  md: '0',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
              onClick={handleSubmit(handleSubmitDetails)}
            >
              Finalize profile
            </Button>
          </Grid>
        </Grid>

        <div>
          <form
            id="formid"
            target="_blank"
            method="POST"
            action="https://es-staging.cdac.in/esignlevel2/2.1/form/signdoc"
          >
            <input
              type="hidden"
              id="eSignRequest"
              name="eSignRequest"
              value={eSignResponse.esp_request}
            />
            <input type="hidden" id="aspTxnID" name="aspTxnID" value={eSignResponse.asp_txn_id} />
            <input
              type="hidden"
              id="Content-Type"
              name="Content-Type"
              value={eSignResponse.content_type}
            />
          </form>
        </div>

        <Dialog
          open={confirmationModal}
          onClose={() => {
            setConfirmationModal(false);
          }}
        >
          {loggedInUserType === 'SMC' ? (
            <Box
              p={2}
              width="350px"
              height="320px"
              sx={{
                borderRadius: '40px',
              }}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <TaskAltIcon color="success" fontSize="width80" />
                <Typography color="success.dark" variant="h2" textAlign={'center'}>
                  SUCCESS!
                </Typography>
                <Typography
                  mt={4}
                  color="textPrimary.main"
                  textAlign={'center'}
                  variant="h2"
                  width="320px"
                >
                  Your Profile has been successfully created.
                </Typography>
              </Box>
              <Box display={'flex'} justifyContent={'center'} mt={4} alignItems={'center'}>
                <Button
                  onClick={() => {
                    setConfirmationModal(false);
                  }}
                  color="grey"
                  variant="contained"
                  sx={{
                    margin: '0 4px',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setConfirmationModal(false);
                    setIsReadMode(true);
                    resetStep(0);
                  }}
                  color="secondary"
                  variant="contained"
                  sx={{
                    margin: '0 4px',
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          ) : (
            <Box p={2} width="616px" height="200">
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                <CheckCircleIcon color="success" />
                <Typography color="textPrimary.main" variant="h3">
                  Success!
                </Typography>
                <CloseIcon onClick={handleClose} />
              </Box>
              <Box mt={4}>
                <Typography color="textPrimary.main">
                  Your profile details have been updated. Do you want your profile to be submitted
                  for Verification ?
                </Typography>
              </Box>
              <Box display={'flex'} justifyContent={'flex-end'} mt={1}>
                <Button
                  onClick={() => {
                    setConfirmationModal(false);
                  }}
                  color="grey"
                  variant="contained"
                  sx={{
                    margin: '0 4px',
                  }}
                >
                  No
                </Button>
                <Button
                  onClick={handleYesClick}
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
          )}
        </Dialog>
      </Box>
    </>
  );
};
export default ProfileConsent;
