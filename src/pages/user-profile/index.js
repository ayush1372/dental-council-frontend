import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { doctorTabs } from '../../helpers/components/sidebar-drawer-list-item';
import { capitalizeFirstLetter } from '../../helpers/functions/common-functions';
import useWizard from '../../hooks/use-wizard';
import ErrorModalPopup from '../../shared/common-modals/error-modal-popup';
import ReactivateLicencePopup from '../../shared/reactivate-licence-popup/re-activate-licence-popup';
import SuccessPopup from '../../shared/reactivate-licence-popup/success-popup';
import {
  enableUserNotification,
  getCountriesList,
  getStatesList,
} from '../../store/actions/common-actions';
import {
  getEsignFormDetails,
  getPersonalDetailsData,
  getRegistrationDetailsData,
  updateDoctorContactDetails,
} from '../../store/actions/doctor-user-profile-actions';
import { changeUserActiveTab } from '../../store/reducers/common-reducers';
import { getEsignDetails } from '../../store/reducers/doctor-user-profile-reducer';
import { Loader } from '../../ui/core';
import BreadcrumbContainer from '../../ui/core/breadcrumb/breadcrumb';
import { Button } from '../../ui/core/button/button';
import successToast from '../../ui/core/toaster';
import Wizard from '../../ui/core/wizard';
import ProgressBar from '../../ui/core/wizard/progress-bar';
import ConstantDetails from './components/constant-details/constant-details';
import PersonalDetails from './components/personal-details/personal-details';
import PreviewProfile from './components/preview-profile/preview-profile';
import ProfileConsent from './components/profile-consent/profile-consent';
import RegisterAndAcademicDetails from './components/register-and-academic-details/register-and-academic-details';

const readWizardSteps = ['Personal Details', 'Registration & Academic Details']; //, 'Work Profile'

export const UserProfile = ({ showViewProfile, selectedRowData, tabName }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const eSignResponse = useSelector((state) => state?.doctorUserProfileReducer?.esignDetails?.data);
  const { loginData } = useSelector((state) => state?.loginReducer);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const emailNotify = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.email_notification_enabled
  );
  const mobileNotify = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.sms_notification_enabled
  );
  const doctorEsignStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.esign_status
  );
  const doctorRegDetails = useSelector(
    (state) => state?.doctorUserProfileReducer?.registrationDetails
  );
  const logInDoctorStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.blacklisted
  );

  const [isReadMode, setIsReadMode] = useState(true);
  const [emailNotification, setEmailNotification] = useState(emailNotify);
  const [mobileNotification, setMobileNotification] = useState(mobileNotify);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [wizardSteps, setWizardSteps] = useState(readWizardSteps);
  const [isApplicationPending, setIsApplicationPending] = useState(true);
  const [showReactivateLicense, setShowReactivateLicense] = useState(false);
  const [showStaticFormProgress, setShowStaticFormProgress] = useState(false);

  const [registrationFile, setRegistrationFile] = useState(false);
  const [degreeCertificate, setDegreeCertificate] = useState(false);
  const [validDetails, setValidDetails] = useState({ mobileNo: false, email: false });
  const [eSignLoader, setESignLoader] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);

  const handleNotification = (eventData, mode) => {
    if (mode === 'email') {
      setEmailNotification(eventData?.target?.checked);
    }
    if (mode === 'sms') {
      setMobileNotification(eventData?.target?.checked);
    }
    let updatedNotificationData = {
      notification_toggles: [
        {
          mode: mode,
          is_enabled: eventData.target.checked,
        },
      ],
    };
    dispatch(enableUserNotification(updatedNotificationData));
  };

  useEffect(() => {
    if (loginData?.data?.work_flow_status_id === 1 || personalDetails?.work_flow_status_id === 1) {
      setIsApplicationPending(false);
    }
  }, [loginData?.data?.work_flow_status_id, personalDetails?.work_flow_status_id]);
  const { activeStep, handleNext, handleBack, resetStep, completed, progress, handleStep } =
    useWizard(
      ['Doctor', 'SMC', 'NMC'].includes(loggedInUserType) ? 0 : 1,
      [],
      [0, 25, 25, 25, 25],
      isReadMode
    );

  const renderSuccess = () => {
    setShowReactivateLicense(false);
    setShowSuccessPopup(true);
  };

  const closeReactivateLicense = () => {
    setShowReactivateLicense(false);
  };
  const fetchStates = () => {
    try {
      dispatch(getStatesList()).then(() => {});
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  };
  const fetchCountries = () => {
    try {
      dispatch(getCountriesList()).then(() => {});
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  };

  const openDoctorEditProfile = () => {
    setIsReadMode(false);
    resetStep();
    fetchCountries();
    fetchStates();
  };

  useEffect(() => {
    if (!isReadMode) {
      setWizardSteps([...readWizardSteps, 'Preview Profile']);
    } else {
      setWizardSteps([...readWizardSteps]);
    }
  }, [isReadMode]);

  const fetchDoctorUserPersonalDetails = () => {
    dispatch(
      getPersonalDetailsData(
        showViewProfile && tabName === 'Activate License'
          ? selectedRowData?.health_professional_id
          : showViewProfile
          ? selectedRowData?.profileID?.value || selectedRowData?.view?.value
          : loginData?.data?.profile_id
      )
    )
      .then(() => {})
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };

  const fetchDoctorUserRegistrationDetails = () => {
    dispatch(
      getRegistrationDetailsData(
        showViewProfile && tabName === 'Activate License'
          ? selectedRowData?.health_professional_id
          : showViewProfile
          ? selectedRowData?.profileID?.value || selectedRowData?.view?.value
          : loginData?.data?.profile_id
      )
    )
      .then()
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };

  useEffect(() => {
    fetchDoctorUserPersonalDetails();
    fetchDoctorUserRegistrationDetails();
    if (loginData?.data?.work_flow_status_id === 1 || personalDetails?.work_flow_status_id === 1) {
      setIsApplicationPending(false);
    }
    if (loginData?.data?.hp_profile_status_id === 7) {
      setIsReadMode(false);
    } else {
      setIsReadMode(true);
    }
    if (personalDetails?.hp_profile_id !== undefined) {
      dispatch(getRegistrationDetailsData(personalDetails?.hp_profile_id)).then((response) => {
        if (response?.data?.registration_detail_to?.registration_certificate) {
          setRegistrationFile(true);
        }
        if (response?.data?.qualification_detail_response_tos[0]?.degree_certificate) {
          setDegreeCertificate(true);
        }
      });
    }
    if (
      personalDetails?.work_flow_status_id === undefined &&
      personalDetails?.hp_profile_status_id === 2
    ) {
      setIsApplicationPending(true);
    }
  }, []);

  useEffect(() => {
    fetchDoctorUserPersonalDetails();
  }, [emailNotification, mobileNotification, !isReadMode]);

  const handleEsign = () => {
    document.getElementById('formid')?.submit();
  };

  function eSignHandler() {
    let data = {
      templateId: 'TEMPLATE_1',
      signingPlace:
        personalDetails?.communication_address?.village?.name ||
        personalDetails?.communication_address?.district?.name ||
        personalDetails?.communication_address?.state?.name,
      nmrDetails: {
        nmrPersonalDetail: {
          fullName: personalDetails?.personal_details?.full_name || '',
          fatherName: personalDetails?.personal_details?.father_name || '',
          motherName: personalDetails?.personal_details?.mother_name || '',
          spouseName: personalDetails?.personal_details?.spouse_name || '',
          gender: personalDetails?.personal_details?.gender || '',
          dob: moment(personalDetails?.personal_details?.date_of_birth).format('DD-MM-YYYY') || '',
          nationality: 'Indian',
          qualification:
            doctorRegDetails?.qualification_detail_response_tos[0]?.course.course_name || '',
          mobileNumber: personalDetails?.personal_details?.mobile || '',
          emailId: personalDetails?.personal_details?.email || '',
        },
        nmrKycAddressTO: {
          address: personalDetails?.kyc_address?.address_line1 || '',
        },
        nmrPersonalCommunication: {
          house: personalDetails?.communication_address?.house,
          street: personalDetails?.communication_address?.street,
          landmark: personalDetails?.communication_address?.landmark,
          locality: personalDetails?.communication_address?.locality,
          subDistrict: personalDetails?.communication_address?.sub_district?.name,
          country: personalDetails?.communication_address?.country?.name || '',
          state: personalDetails?.communication_address?.state?.name || '',
          district: personalDetails?.communication_address?.district?.name || '',
          city: personalDetails?.communication_address?.village?.name || '',
          postalCode: personalDetails?.communication_address?.pincode || '',
        },
        nmrRegistrationDetailsTO: {
          councilName: doctorRegDetails?.registration_detail_to?.state_medical_council?.name || '',
          registrationNumber: doctorRegDetails?.registration_detail_to?.registration_number,
          registrationDate: moment(
            doctorRegDetails?.registration_detail_to?.registration_date
          ).format('DD-MM-YYYY'),
          registrationType:
            doctorRegDetails?.registration_detail_to?.is_renewable === '0'
              ? 'Permanent'
              : 'Renewable',
          dueDate: moment(
            doctorRegDetails?.registration_detail_to?.renewable_registration_date
          ).format('DD-MM-YYYY'),
        },
        nmrQualificationDetailsTO: {
          qualificationFrom:
            doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_from || '',
          nameOfDegree:
            doctorRegDetails?.qualification_detail_response_tos[0]?.course.course_name || '',
          country: doctorRegDetails?.qualification_detail_response_tos[0]?.country.name || '',
          state:
            capitalizeFirstLetter(
              doctorRegDetails?.qualification_detail_response_tos[0]?.state.name
            ) || '',
          college: doctorRegDetails?.qualification_detail_response_tos[0]?.college.name || '',
          university:
            doctorRegDetails?.qualification_detail_response_tos[0]?.university?.name || '',
          monthAndYearOfAwarding:
            doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_month +
              ' ' +
              doctorRegDetails?.qualification_detail_response_tos[0]?.qualification_year || '',
        },
        isRegCerAttached: registrationFile ? 'Yes' : 'No',
        isDegreeCardAttached: degreeCertificate ? 'Yes' : 'No',
        isOtherDocumentAttached: 'No', //cs-1013:needs to changed when workdetails API integrated*
      },
    };
    dispatch(getEsignFormDetails(data))
      .then((response) => {
        const payload = {
          transaction_id: response?.data?.asp_txn_id,
          e_sign_transaction_id: response?.data?.asp_txn_id,
        };
        eSignStatusHandler();
        dispatch(updateDoctorContactDetails(payload, personalDetails?.hp_profile_id))
          .then(() => {
            document.getElementById('formid')?.submit();
            setIsReadMode(true);
            resetStep(0);
            handleEsign();
            dispatch(getEsignDetails());
          })
          .catch((error) => {
            dispatch(getEsignDetails([]));
            successToast(
              'ERROR: ' + error.data.response.data.error,
              'auth-error',
              'error',
              'top-center'
            );
          });
      })
      .catch(() => {
        successToast('Server Error', 'auth-error', 'error', 'top-center');
      });
  }

  //Helper Function to capture the e-sign status from personal API call within 2 mins with interval of 5 times.
  const eSignStatusHandler = () => {
    let retry = 0;
    setESignLoader(true);
    let interval = setInterval(() => {
      retry = retry + 1;

      if (retry === 5) {
        clearInterval(interval);
        setESignLoader(false);
        setRejectPopup(true);
      }
      try {
        dispatch(getPersonalDetailsData(personalDetails?.hp_profile_id)).then((response) => {
          if (response?.data?.esign_status === 1) {
            clearInterval(interval);
            setESignLoader(false);
            dispatch(changeUserActiveTab(doctorTabs[1].tabName));
          }
        });
      } catch (allFailMsg) {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      }
    }, 24000);
  };

  return eSignResponse?.asp_txn_id ? (
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
        <button type="submit" hidden onClick={handleEsign()}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    <>
      {showReactivateLicense && (
        <ReactivateLicencePopup
          renderSuccess={renderSuccess}
          closeReactivateLicense={closeReactivateLicense}
        />
      )}
      {showSuccessPopup && <SuccessPopup />}
      {(personalDetails?.hp_profile_status_id === undefined || eSignLoader) && <Loader />}
      {personalDetails?.hp_profile_status_id !== undefined && (
        <Box>
          {!showViewProfile ? (
            <Grid
              container
              display="flex"
              justifyContent="space-between"
              sx={{ alignItems: 'center' }}
              bgcolor={`${theme.palette.white.main}`}
              mb={2}
              px={3}
              py={2}
            >
              <Grid item xs={12} sm="auto">
                <Box display="flex" gap={1.5} alignItems={'center'} width="100%">
                  <Typography variant="h2" component="span" flexBasis="0" flexGrow="1">
                    {isReadMode ? 'My Profile' : 'Edit Profile'}
                  </Typography>
                  <ProgressBar
                    width="302px"
                    progress={
                      showStaticFormProgress ||
                      personalDetails?.nmr_id ||
                      personalDetails?.work_flow_status_id === 1 ||
                      personalDetails?.work_flow_status_id === 3
                        ? 75
                        : progress
                    }
                    completed={completed}
                  />
                </Box>
                {!isReadMode && (
                  <BreadcrumbContainer
                    primary="My Profile"
                    primaryLink={'/profile'}
                    secondary={'Edit Profile'}
                  />
                )}
              </Grid>
              {doctorEsignStatus === 1 ||
              personalDetails?.esign_status === 1 ||
              loginData?.data?.hp_profile_status_id === 7 ? (
                isReadMode &&
                isApplicationPending &&
                !logInDoctorStatus && (
                  <Grid
                    item
                    xs="auto"
                    ml="auto"
                    sx={{
                      marginBottom: {
                        xs: '10px',
                        md: '0',
                      },
                    }}
                  >
                    <Button
                      startIcon={<EditIcon sx={{ mr: 1 }} />}
                      variant="contained"
                      color="secondary"
                      onClick={openDoctorEditProfile}
                      sx={{
                        width: '100%',
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                )
              ) : (
                <Grid
                  item
                  xs="auto"
                  ml="auto"
                  sx={{
                    marginBottom: {
                      xs: '10px',
                      md: '0',
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={eSignHandler}
                    sx={{
                      width: '100%',
                    }}
                  >
                    E-sign Profile
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} lg="auto">
                {!isReadMode && (
                  <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    mt={{ xs: 2, lg: 0 }}
                  >
                    <FormControlLabel
                      sx={{
                        width: {
                          xs: 'auto',
                        },
                        ml: 0,
                        mr: { xs: 0, sm: 2 },
                      }}
                      value="email"
                      control={
                        <Switch
                          color="primary"
                          checked={emailNotify}
                          onChange={(e) => {
                            handleNotification(e, 'email');
                          }}
                        />
                      }
                      label="Email Notifications"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      sx={{
                        width: {
                          xs: 'auto',
                        },
                        ml: 0,
                      }}
                      value="sms"
                      control={
                        <Switch
                          color="primary"
                          checked={mobileNotify}
                          onChange={(e) => {
                            handleNotification(e, 'sms');
                          }}
                        />
                      }
                      label="Mobile Notifications"
                      labelPlacement="start"
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          ) : null}
          {!isReadMode && (
            <ConstantDetails validDetails={validDetails} setValidDetails={setValidDetails} />
          )}
          <Wizard
            activeStep={loggedInUserType === 'College' ? activeStep + 1 : activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={wizardSteps}
            progress={false}
            isStepClickEnable={['SMC', 'NMC', 'College'].includes(loggedInUserType)}
            showCheckCirlce={loggedInUserType === 'Doctor'}
            handleStep={handleStep}
          ></Wizard>

          <Box bgcolor="white.main">
            {activeStep === 0 && (
              <PersonalDetails
                isReadMode={isReadMode}
                setIsReadMode={setIsReadMode}
                handleNext={handleNext}
                handleBack={handleBack}
                validDetails={validDetails}
                setValidDetails={setValidDetails}
                selectedDataIndex={selectedRowData?.SNo?.value - 1}
              />
            )}
            {activeStep === 1 && (
              <RegisterAndAcademicDetails
                isReadMode={isReadMode}
                setIsReadMode={setIsReadMode}
                handleNext={handleNext}
                handleBack={handleBack}
                selectedDataIndex={selectedRowData?.SNo?.value - 1}
              />
            )}
            {activeStep === 2 && (
              <PreviewProfile
                isReadMode={isReadMode}
                setIsReadMode={setIsReadMode}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
          </Box>
          {!isReadMode && activeStep === 2 && (
            <ProfileConsent
              setShowStaticFormProgress={setShowStaticFormProgress}
              handleBack={handleBack}
              resetStep={resetStep}
              setIsReadMode={setIsReadMode}
            />
          )}
        </Box>
      )}
      {rejectPopup && (
        <ErrorModalPopup
          open={setRejectPopup}
          text={`Your E-sign Process has not been completed! 
              Please Logout and complete the E-sign to access further. `}
          handleClose={() => {
            setRejectPopup(false);
          }}
        />
      )}
    </>
  );
};

export default UserProfile;
