/* eslint-disable no-console */
import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Dialog, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getEsignFormDetails } from '../../../../store/actions/doctor-user-profile-actions';
import { Button, Checkbox } from '../../../../ui/core';

const ProfileConsent = ({ handleBack, setIsReadMode, resetStep, loggedInUserType }) => {
  const dispatch = useDispatch();
  const personalDetails = useSelector((state) => state?.doctorUserProfileReducer?.personalDetails);
  const commnicationAddress = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.communication_address
  );
  const eSignResponse = useSelector((state) => state?.doctorUserProfileReducer?.esignDetails?.data);
  const stateData = useSelector((state) => state?.doctorUserProfileReducer);
  const workProfileData = useSelector(
    (state) => state?.doctorUserProfileReducer?.workProfileDetails
  );
  const proofFileData = useSelector((state) => state?.common?.getProofFileData?.data);
  console.log('stateData', stateData);
  console.log('workProfileData', workProfileData);
  console.log('commnicationAddress', commnicationAddress);
  console.log('proof file data', proofFileData);

  // const firstname = personalDetails?.personal_details;
  console.log('personalDetails12', personalDetails);
  console.log('eSignResponse', eSignResponse);

  const [confirmationModal, setConfirmationModal] = useState(false);
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
    if (consent) setConfirmationModal(true);
  };
  function eSignHandler() {
    console.log('clicked e-sign handler');
    let data = {
      signingPlace: personalDetails?.communication_address?.village?.name,
      nmrDetails: {
        nmrPersonalDetail: {
          //frompersonal api?
          firstName: personalDetails?.personal_details?.first_name || '',
          userId: stateData?.personalDetails?.request_id || '', // nmr id or healthPRof id?
          middleName: personalDetails?.personal_details?.middle_name || '',
          lastName: personalDetails?.personal_details?.last_name || '',
          qualification: 'degree', // ?????? in 2nd tab 2nd acccordion ?
          mobileNumber: personalDetails?.personal_details?.email || 'abdm@nha.com',
          emailId: personalDetails?.personal_details?.mobile || '9988775544',
        },
        nmrPersonalCommunication: {
          //personal api
          address: personalDetails?.communication_address?.address_line1 || '',
          country: personalDetails?.communication_address?.country?.name || '',
          stateUT: personalDetails?.communication_address?.state?.name || '',
          district: personalDetails?.communication_address?.district?.name || '',
          city: personalDetails?.communication_address?.village?.name || '',
          pincode: personalDetails?.communication_address?.pincode || '',
        },
        nmrOfficeCommunication: {
          //work profile
          address: workProfileData?.current_work_details[0].address?.address_line1 || '',
          country: 'India',
          stateUT: workProfileData?.current_work_details[0].address?.state?.name || '',
          district: workProfileData?.current_work_details[0].address?.district?.name || '',
          city: workProfileData?.current_work_details[0].address?.district?.name || '', // city/village no data
          subDistrict: 'string', // no data in repsonse
          pincode: workProfileData?.current_work_details[0].address?.pincode || '',
        },
        isRegCerAttached: 'yes', //2nd tab 1st
        isDegreeCardAttached: 'yes', //2nd tab 2nd
        isOtherDocumentAttached: 'yes',
        // proofFileData?.name.length > 0 ? 'Yes' : 'No', //3rd page''',
      },
    };
    console.log('comAddress==>', workProfileData?.current_work_details[0].address?.address_line1);
    dispatch(getEsignFormDetails(data));

    document.getElementById('formid')?.submit();
  }
  // const handleEsign = () => {
  //   document.getElementById('formid')?.submit();
  // };
  // console.log('123',Object.keys(proofFileData).length)

  return (
    <Box bgcolor="white.main" py={2} px={{ xs: 1, md: 4 }} mt={2} boxShadow={1}>
      <Typography component="div" color="primary.main" variant="body1">
        Consent
        <Typography component="span" color="error.main">
          *
        </Typography>
      </Typography>
      <Box bgcolor="backgroundColor.light" p={2} display="flex">
        <Checkbox
          name="consent"
          {...register('consent', {
            required: 'Consent is Required',
          })}
          error={errors.consent?.message}
        />
        <Typography component="div" mt={1} variant="body5">
          I, the applicant of the above facility hereby verify that the details as submitted on the
          portal pertaining to the above facility are true to my personal knowledge and nothing
          material has been concealed or falsely stated. I request you to kindly verify that the
          health facility as stated actually exists and give approval to that effect so that the
          facility can be &aposvalidated for existence&apos on the portal.
          <br /> <br />I am aware that the facility ID and related information can be used and
          shared with the entities working in the National Digital Health Ecosystem (NDHE) which
          inter alia includes stakeholders and entities such as healthcare professionals (e.g.
          doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health
          programmes), which are registered with or linked to the Ayushman Bharat Digital Mission
          (ABDM), and various processes there under. I reserve the right to revoke the given consent
          at any point of time, subject to applicable laws, rules and regulations.
        </Typography>
      </Box>
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
        <Grid item xs={12} md={3} display="flex" justifyContent="flex-end">
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
          <Grid item xs={12} md={2} display="flex" justifyContent="flex-end">
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
        <Grid item xs={12} md={1} ml={{ xs: 0, md: 1 }} display="flex" justifyContent="flex-end">
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
            Submit
          </Button>
        </Grid>
      </Grid>
      <div>
        <form id="formid" target="_blank" method="POST" action={eSignResponse.esp_url}>
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
          {/* <button type="submit" onClick={handleEsign()}>
            Submit
          </button> */}
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
                Your profile details have been updated. Do you want your profile to be submitted for
                Verification ?
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
                Yes
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};
export default ProfileConsent;
