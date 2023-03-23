import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
// import TuneIcon from '@mui/icons-material/Tune';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';

import useWizard from '../../hooks/use-wizard';
import ReactivateLicencePopup from '../../shared/reactivate-licence-popup/re-activate-licence-popup';
import SuccessPopup from '../../shared/reactivate-licence-popup/success-popup';
import { enableUserNotification } from '../../store/actions/common-actions';
import { getCountriesList, getStatesList } from '../../store/actions/common-actions';
import {
  getPersonalDetailsData,
  getRegistrationDetailsData,
  // getWorkProfileDetailsData,
} from '../../store/actions/doctor-user-profile-actions';
import BreadcrumbContainer from '../../ui/core/breadcrumb/breadcrumb';
import { Button } from '../../ui/core/button/button';
import successToast from '../../ui/core/toaster';
import Wizard from '../../ui/core/wizard';
import ProgressBar from '../../ui/core/wizard/progress-bar';
// import ChangePassword from '../profile/change-password/change-password';
import ConstantDetails from './components/constant-details/constant-details';
import PersonalDetails from './components/personal-details/personal-details';
import PreviewProfile from './components/preview-profile/preview-profile';
import ProfileConsent from './components/profile-consent/profile-consent';
import RegisterAndAcademicDetails from './components/register-and-academic-details/register-and-academic-details';
// import WorkProfile from './components/work-profile/work-profile';
const readWizardSteps = ['Personal Details', 'Registration & Academic Details']; //, 'Work Profile'

export const UserProfile = ({ showViewProfile, selectedRowData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isReadMode, setIsReadMode] = useState(true);
  const [showReactivateLicense, setShowReactivateLicense] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [wizardSteps, setWizardSteps] = useState(readWizardSteps);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { loginData } = useSelector((state) => state?.loginReducer);

  const [isApplicationPending, setIsApplicationPending] = useState(true);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const [showStaticFormProgress, setShowStaticFormProgress] = useState(false);

  const [emailNotification, setEmailNotification] = useState();
  const [mobileNotification, setMobileNotification] = useState();

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
    if (personalDetails?.work_flow_status_id === 1) {
      setIsApplicationPending(false);
    }
  }, [personalDetails?.work_flow_status_id]);
  const { activeStep, handleNext, handleBack, resetStep, completed, progress } = useWizard(
    ['Doctor', 'SMC', 'NMC'].includes(loggedInUserType) ? 0 : 1,
    [],
    [0, 25, 25, 25, 25]
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
        showViewProfile ? selectedRowData?.profileID?.value : loginData?.data?.profile_id
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
        showViewProfile ? selectedRowData?.profileID?.value : loginData?.data?.profile_id
      )
    )
      .then()
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };

  // const fetchDoctorUserWorkProfileDetails = () => {
  //   dispatch(
  //     getWorkProfileDetailsData(showViewProfile ? selectedRowData?.profileID?.value : profile_id)
  //   )
  //     .then(() => {})
  //     .catch((allFailMsg) => {
  //       successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
  //     });
  // };

  useEffect(() => {
    fetchDoctorUserPersonalDetails();
    fetchDoctorUserRegistrationDetails();

    //commented work flow details
    // fetchDoctorUserWorkProfileDetails();
  }, []);

  return (
    <>
      {
        // we need to show the suspended flag
        /* <Box display="flex" justifyContent="start">
        {loggedInUserType === 'Doctor' && showUserProfile !== true && (
          // <Alert
          //   severity="error"
          //   sx={{
          //     color: 'suspendAlert.light',
          //     width: '1479px',
          //     height: '56px',
          //   }}
          // >
          //   <Typography width="667px" height="19px" color="suspendAlert.dark">
          //     Your profile is set to suspend mode. You will not be able to perform actions on the
          //     profile.
          //   </Typography>
          //   <TuneIcon
          //     sx={{
          //       color: 'suspendAlert.dark',
          //       width: '18px',
          //       height: '16px',
          //       ml: 3,
          //     }}
          //   />
          //   <Link
          //     color="suspendAlert.secondary"
          //     ml={1}
          //     height="20px"
          //     width="103px"
          //     onClick={() => {
          //       setShowReactivateLicense(true);
          //       setShowSuccessPopup(false);
          //     }}
          //     sx={{
          //       cursor: 'pointer',
          //     }}
          //   >
          //     Change Settings
          //   </Link>
          // </Alert>
        )}
      </Box> */
      }
      {showReactivateLicense && (
        <ReactivateLicencePopup
          renderSuccess={renderSuccess}
          closeReactivateLicense={closeReactivateLicense}
        />
      )}
      {showSuccessPopup && <SuccessPopup />}
      {/* {!showChangepassword ? ( */}
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
                  progress={showStaticFormProgress || personalDetails?.nmr_id ? 75 : progress}
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
            {/* {loggedInUserType === 'Doctor' && (
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  padding: {
                    xs: '5px 0 5px 0',
                    md: '0 10px 0 0 ',
                  },
                }}
              ></Grid>
            )} */}
            {isReadMode && isApplicationPending && (
              <Grid
                item
                xs="auto"
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
                        checked={emailNotification}
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
                        checked={mobileNotification}
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
        {!isReadMode && <ConstantDetails />}
        <Wizard
          activeStep={loggedInUserType === 'College' ? activeStep + 1 : activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={wizardSteps}
          progress={false}
        ></Wizard>

        <Box bgcolor="white.main">
          {activeStep === 0 && (
            <PersonalDetails
              isReadMode={isReadMode}
              setIsReadMode={setIsReadMode}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
          {activeStep === 1 && (
            <RegisterAndAcademicDetails
              isReadMode={isReadMode}
              setIsReadMode={setIsReadMode}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
          {/* {activeStep === 2 && (
              <WorkProfile
                isReadMode={isReadMode}
                setIsReadMode={setIsReadMode}
                handleNext={handleNext}
                handleBack={handleBack}
                setShowDashboard={setShowDashboard}
                setShowTable={setShowTable}
                setShowViewPorfile={setShowViewPorfile}
                activeStep={activeStep}
              />
            )} */}
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
    </>
  );
};

export default UserProfile;
