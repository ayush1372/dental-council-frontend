import { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
//import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Dialog, Grid, Typography } from '@mui/material';
//import { Box, Dialog, Grid, Link, Typography } from '@mui/material';
// import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// import { ErrorMessages } from '../../../../constants/error-messages';
import { doctorTabs, smcTabs } from '../../../../helpers/components/sidebar-drawer-list-item';
// import { capitalizeFirstLetter } from '../../../../helpers/functions/common-functions';
import {
  // getEsignFormDetails,
  // getPersonalDetailsData,
  getRegistrationDetailsData,
  updateProfileConsent,
} from '../../../../store/actions/doctor-user-profile-actions';
import { changeUserActiveTab } from '../../../../store/reducers/common-reducers';
// import { getEsignDetails } from '../../../../store/reducers/doctor-user-profile-reducer';
import { Button, Checkbox } from '../../../../ui/core';
// import successToast from '../../../../ui/core/toaster';

const ProfileConsent = ({
  handleBack,
  setIsReadMode,
  resetStep,
  loggedInUserType,
  // setRejectPopup,
  // setESignLoader,
  setShowStaticFormProgress,
}) => {
  const dispatch = useDispatch();
  const [degreeCertificate, setDegreeCertificate] = useState(false);
  const [registrationFile, setRegistrationFile] = useState(false);
  const doctorRegDetails = useSelector(
    (state) => state?.doctorUserProfileReducer?.registrationDetails
  );
  const eSignResponse = useSelector((state) => state?.doctorUserProfileReducer?.esignDetails?.data);
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    dispatch(getRegistrationDetailsData(personalDetails?.hp_profile_id)).then((response) => {
      if (response?.data?.qualification_detail_response_tos[0]?.degree_certificate) {
        setDegreeCertificate(true);
      }
      if (response?.data?.registration_detail_to?.registration_certificate) {
        setRegistrationFile(true);
      }
    });
  }, []);
  // const { loginData } = useSelector((state) => state?.loginReducer);
  const { personalDetails, updatedPersonalDetails, selectedQualificationTypeValue } = useSelector(
    (state) => state?.doctorUserProfileReducer
  );

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
  // const handleSubmitDetails = () => {
  //   const { consent } = getValues();
  //   if (consent) {
  //     setConfirmationModal(true);
  //   }
  // };
  const handleYesClick = () => {
    const payload = {
      hp_profile_id: updatedPersonalDetails?.hp_profile_id,
      application_type_id: personalDetails?.nmr_id
        ? 2
        : selectedQualificationTypeValue === 'International'
        ? 7
        : doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_from ===
          'International'
        ? 7
        : 1,
    };

    dispatch(updateProfileConsent(payload))
      .then(() => {
        setShowStaticFormProgress(true);
        setConfirmationModal(false);
        setIsReadMode(true);
        resetStep(0);
        dispatch(changeUserActiveTab(doctorTabs[1].tabName));
      })
      .catch(() => {
        setConfirmationModal(false);
        // successToast(
        //   'ERROR: ' + error.data.response.data.error,
        //   'auth-error',
        //   'error',
        //   'top-center'
        // );
      });
  };


  function eSignHandler(){
    const payload = {
          hp_profile_id: updatedPersonalDetails?.hp_profile_id,
          application_type_id: personalDetails?.nmr_id
            ? 2
            : selectedQualificationTypeValue === 'International'
            ? 7
            : doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_from ===
              'International'
            ? 7
            : 1,
          transaction_id: 'transaction_id',
          hpr_share_acknowledgement: getValues()?.HPR ? 1 : 0,
        };

    dispatch(updateProfileConsent(payload))
          .then((response) => {
            if(response.data.status===200||response.data.status===201){
              dispatch(changeUserActiveTab(doctorTabs[1].tabName));
            }
          });
  }

  // function eSignHandler() {
  //   let data = {
  //     templateId: 'TEMPLATE_1',
  //     signingPlace:
  //       personalDetails?.communication_address?.village?.name ||
  //       personalDetails?.communication_address?.district?.name ||
  //       personalDetails?.communication_address?.state?.name,
  //     nmrDetails: {
  //       nmrPersonalDetail: {
  //         fullName: personalDetails?.personal_details?.full_name || '',
  //         fatherName: personalDetails?.personal_details?.father_name || '',
  //         motherName: personalDetails?.personal_details?.mother_name || '',
  //         spouseName: personalDetails?.personal_details?.spouse_name || '',
  //         gender: personalDetails?.personal_details?.gender || '',
  //         dob: moment(personalDetails?.personal_details?.date_of_birth).format('DD-MM-YYYY') || '',
  //         nationality: 'Indian',
  //         qualification:
  //           doctorRegDetails?.qualification_detail_response_tos[0]?.course.course_name || '',
  //         mobileNumber: personalDetails?.personal_details?.mobile || '',
  //         emailId: personalDetails?.personal_details?.email || '',
  //       },
  //       nmrKycAddressTO: {
  //         address: personalDetails?.kyc_address?.address_line1 || '',
  //       },
  //       nmrPersonalCommunication: {
  //         house: personalDetails?.communication_address?.house,
  //         street: personalDetails?.communication_address?.street,
  //         landmark: personalDetails?.communication_address?.landmark,
  //         locality: personalDetails?.communication_address?.locality,
  //         subDistrict: personalDetails?.communication_address?.sub_district?.name,
  //         country: personalDetails?.communication_address?.country?.name || '',
  //         state: personalDetails?.communication_address?.state?.name || '',
  //         district: personalDetails?.communication_address?.district?.name || '',
  //         city: personalDetails?.communication_address?.village?.name || '',
  //         postalCode: personalDetails?.communication_address?.pincode || '',
  //       },
  //       nmrRegistrationDetailsTO: {
  //         councilName: doctorRegDetails?.registration_detail_to?.state_medical_council?.name || '',
  //         registrationNumber: doctorRegDetails?.registration_detail_to?.registration_number,
  //         registrationDate: moment(
  //           doctorRegDetails?.registration_detail_to?.registration_date
  //         ).format('DD-MM-YYYY'),
  //         registrationType:
  //           doctorRegDetails?.registration_detail_to?.is_renewable === '0'
  //             ? 'Permanent'
  //             : 'Renewable',
  //         dueDate: moment(
  //           doctorRegDetails?.registration_detail_to?.renewable_registration_date
  //         ).format('DD-MM-YYYY'),
  //       },
  //       nmrQualificationDetailsTO: {
  //         qualificationFrom:
  //           doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_from || '',
  //         nameOfDegree:
  //           doctorRegDetails?.qualification_detail_response_tos[0]?.course.course_name || '',
  //         country: doctorRegDetails?.qualification_detail_response_tos[0]?.country.name || '',
  //         state:
  //           capitalizeFirstLetter(
  //             doctorRegDetails?.qualification_detail_response_tos[0]?.state.name
  //           ) || '',
  //         college: doctorRegDetails?.qualification_detail_response_tos[0]?.college.name || '',
  //         university:
  //           doctorRegDetails?.qualification_detail_response_tos[0]?.university?.name || '',
  //         monthAndYearOfAwarding:
  //           doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_month +
  //             ' ' +
  //             doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_year || '',
  //       },
  //       isRegCerAttached: registrationFile ? 'Yes' : 'No',
  //       isDegreeCardAttached: degreeCertificate ? 'Yes' : 'No',
  //       isOtherDocumentAttached: 'No', //cs-1013:needs to changed when workdetails API integrated*
  //     },
  //   };
  //   dispatch(getEsignFormDetails(data))
  //     .then((response) => {
  //       const payload = {
  //         hp_profile_id: updatedPersonalDetails?.hp_profile_id,
  //         application_type_id: personalDetails?.nmr_id
  //           ? 2
  //           : selectedQualificationTypeValue === 'International'
  //           ? 7
  //           : doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_from ===
  //             'International'
  //           ? 7
  //           : 1,
  //         transaction_id: response?.data?.asp_txn_id,
  //         hpr_share_acknowledgement: getValues()?.HPR ? 1 : 0,
  //       };
  //       eSignStatusHandler();
  //       dispatch(updateProfileConsent(payload))
  //         .then(() => {
  //           document.getElementById('formid')?.submit();
  //           setIsReadMode(true);
  //           resetStep(0);
  //           handleEsign();
  //           dispatch(getEsignDetails());
  //         })
  //         .catch(() => {
  //           setConfirmationModal(false);
  //           dispatch(getEsignDetails([]));
  //         });
  //     })
  //     .catch(() => {
  //       successToast(ErrorMessages.serverError, 'auth-error', 'error', 'top-center');
  //     });
  // }



  // const handleEsign = () => {
  //   document.getElementById('formid')?.submit();
  // };





  //Helper Function to capture the e-sign status from personal API call within 3.2 mins with interval of 8 times.
  // const eSignStatusHandler = () => {
  //   let retry = 0;
  //   setESignLoader(true);
  //   let interval = setInterval(() => {
  //     retry = retry + 1;

  //     if (retry === 4) {
  //       clearInterval(interval);
  //       setESignLoader(false);
  //       setRejectPopup(true);
  //     }
  //     dispatch(getPersonalDetailsData(personalDetails?.hp_profile_id))
  //       .then((response) => {
  //         if (
  //           response?.data?.esign_status === 1 ||
  //           response?.data?.esign_status === 2 ||
  //           response?.data?.esign_status === 4
  //         ) {
  //           clearInterval(interval);
  //           setESignLoader(false);
  //           if (response?.data?.esign_status === 1) {
  //             dispatch(changeUserActiveTab(doctorTabs[1].tabName));
  //           }
  //           if (response?.data?.esign_status === 2) {
  //             setRejectPopup(true);
  //           }
  //         }
  //       })
  //       .catch(() => {
  //         setESignLoader(false);
  //       });
  //   }, 1000);
  // };

  useEffect(() => {}, [eSignResponse, getValues().consent, getValues()?.HPR]);
  return eSignResponse?.asp_txn_id ? (
    <div></div>
  ) : (
    <Box bgcolor="white.main" py={2} px={{ xs: 1, md: 4 }} mt={2} boxShadow={1}>
      <Typography
        // id="name"
        // value="123"
        component="div"
        color="primary.main"
        variant="body1"
        mb={2}
      >
        Declaration
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
        height={{ lg: '90px' }}
      >
        <Grid item xs={12} display="flex">
          <Checkbox
            sx={{ width: '18px', height: '18px', marginLeft: 1 }}
            name="consent"
            {...register('consent', {
              required: 'Please indicate that you accept the terms and conditions',
            })}
            defaultChecked={personalDetails?.hp_profile_status_id === 3}
          />
          <Typography component="div" variant="body7">
            I, hereby declare that I am voluntarily sharing above mentioned particulars and
            information. I certify that the above information furnished by me is true, complete, and
            correct to the best of my knowledge. I understand that in the event of my information
            being found false or incorrect at any stage, I shall be held liable for the same.
          </Typography>
        </Grid>
        <Typography variant="body2" component="div" color="error">
          {errors.consent?.message}
        </Typography>
      </Grid>
      <Grid
        container
        alignItems="center"
        columnGap={1}
        bgcolor="success.background"
        p={3}
        mb={2}
        display="flex"
        border="1px solid"
        borderColor="inputBorderColor.main"
        borderRadius="5px"
      />
      {/* <Grid item sx="auto" display="flex" alignItems="center">
          <Checkbox
            sx={{ width: '18px', height: '18px', marginLeft: 1 }}
            name="HPR"
            {...register('HPR')}
            error={errors.HPR?.message}
            defaultChecked={personalDetails?.hpr_consent_status === 1}
          />
          <Typography component="div" variant="body7">
            Save my time and share my details with HPR
          </Typography>
         </Grid>
         <Grid item sx="auto" display="flex" alignItems="center">
          <InfoOutlinedIcon
            sx={{ height: '14px', width: '14px', color: 'messageBlue.main', mr: 1 }}
          />
          <Link
            href={process.env.REACT_APP_HPR_CONCENT_API}
            target="_blank"
            component="a"
            variant="body8"
            color="messageBlue.main"
            fontWeight="500"
            underline="none"
          >
            Know more about HPR
          </Link>
         </Grid> */}

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
              onClick={handleSubmit(eSignHandler)}
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
              Submit
            </Button>
          </Grid>
        )}
      </Grid>
      {/* <Grid item xs={12} md="auto" ml={{ xs: 0, md: 1 }} display="flex" justifyContent="flex-end">
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
        </Grid> */}

      {/* <div>
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
        </div> */}

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
                SUCCESS
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
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmationModal(false);
                  setIsReadMode(true);
                  resetStep(0);
                  dispatch(changeUserActiveTab(smcTabs[2].tabName));
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
                Success
              </Typography>
              <CloseIcon onClick={handleClose} />
            </Box>
            <Box mt={4}>
              <Typography color="textPrimary.main">
                Your Application has been updated and will be submitted for verification.
                <br /> For more details, you will be redirected to Track Application Tab on clicking
                <b> Ok</b> button.
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
                Cancel
              </Button>
              <Button
                onClick={handleYesClick}
                color="secondary"
                variant="contained"
                sx={{
                  margin: '0 4px',
                }}
              >
                Ok
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};
export default ProfileConsent;
