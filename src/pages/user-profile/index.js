import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import TuneIcon from '@mui/icons-material/Tune';
import { Alert, Box, Grid, Link, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../config/debug';
import useWizard from '../../hooks/use-wizard';
import ReactivateLicencePopup from '../../shared/reactivate-licence-popup/re-activate-licence-popup';
import SuccessPopup from '../../shared/reactivate-licence-popup/success-popup';
import { getCountriesList, getStatesList } from '../../store/actions/common-actions';
import {
  getDoctorUserProfileData,
  getRegistrationAndAcademicDetailsData,
  getWorkProfileData,
} from '../../store/actions/doctor-user-profile-actions';
import { Button } from '../../ui/core/button/button';
import Wizard from '../../ui/core/wizard';
// import ChangePassword from '../profile/change-password/change-password';
import ConstantDetails from './components/constant-details/constant-details';
import PersonalDetails from './components/personal-details/personal-details';
import PreviewProfile from './components/preview-profile/preview-profile';
import ProfileConsent from './components/profile-consent/profile-consent';
import RegisterAndAcademicDetails from './components/register-and-academic-details/register-and-academic-details';
import WorkProfile from './components/work-profile/work-profile';
const readWizardSteps = ['Personal Details', 'Registration & Academic Details', 'Work Profile'];

export const UserProfile = ({
  showViewProfile,
  setShowDashboard,
  setShowTable,
  setShowViewPorfile,
  showUserProfile,
}) => {
  const dispatch = useDispatch();
  const [isReadMode, setIsReadMode] = useState(true);
  // const [showChangepassword, setShowChangepassword] = useState(false);
  const [showReactivateLicense, setShowReactivateLicense] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [wizardSteps, setWizardSteps] = useState(readWizardSteps);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);

  const { activeStep, handleNext, handleBack, resetStep } = useWizard(
    loggedInUserType === 'Doctor' ? 0 : 1,
    []
  );

  const renderSuccess = () => {
    setShowReactivateLicense(false);
    setShowSuccessPopup(true);
  };
  const fetchStates = () => {
    try {
      dispatch(getStatesList())
        .then((dataResponse) => {
          verboseLog('dataResponse', dataResponse);
        })
        .catch((error) => {
          verboseLog('error occured', error);
        });
    } catch (err) {
      verboseLog('error', err);
    }
  };

  const fetchCountries = () => {
    try {
      dispatch(getCountriesList())
        .then((dataResponse) => {
          verboseLog('dataResponse', dataResponse);
        })
        .catch((error) => {
          verboseLog('error occured', error);
        });
    } catch (err) {
      verboseLog('error', err);
    }
  };

  const openDoctorEditProfile = () => {
    setIsReadMode(false);
    fetchStates();
    // fetchDistricts(stateId);
    fetchCountries();
  };

  useEffect(() => {
    if (!isReadMode) {
      setWizardSteps([...readWizardSteps, 'Preview Profile']);
    } else {
      setWizardSteps([...readWizardSteps]);
    }
  }, [isReadMode]);

  const fetchDoctorUserProfileData = () => {
    dispatch(getDoctorUserProfileData())
      .then((dataResponse) => {
        verboseLog('dataResponse1', dataResponse);
      })
      .catch((error) => {
        verboseLog('error occured1', error);
      });
  };

  const fetchQualificationDetails = () => {
    dispatch(getRegistrationAndAcademicDetailsData())
      .then((dataResponse) => {
        verboseLog('dataResponse1', dataResponse);
      })
      .catch((error) => {
        verboseLog('error occured1', error);
      });
  };

  const fetchWorkProfileDetails = () => {
    dispatch(getWorkProfileData())
      .then((dataResponse) => {
        verboseLog('dataResponse1', dataResponse);
      })
      .catch((error) => {
        verboseLog('error occured1', error);
      });
  };
  useEffect(() => {
    fetchDoctorUserProfileData();
    fetchQualificationDetails();
    fetchWorkProfileDetails();
  }, []);
  return (
    <>
      <Box display="flex" justifyContent="start">
        {loggedInUserType === 'Doctor' && showUserProfile !== true && (
          <Alert
            severity="error"
            sx={{
              color: 'suspendAlert.light',
              width: '1479px',
              height: '56px',
            }}
          >
            <Typography width="667px" height="19px" color="suspendAlert.dark">
              Your profile is set to suspend mode. You will not be able to perform actions on the
              profile.
            </Typography>
            <TuneIcon
              sx={{
                color: 'suspendAlert.dark',
                width: '18px',
                height: '16px',
                ml: 3,
              }}
            />
            <Link
              color="suspendAlert.secondary"
              ml={1}
              height="20px"
              width="103px"
              onClick={() => setShowReactivateLicense(true)}
              sx={{
                cursor: 'pointer',
              }}
            >
              Change Settings
            </Link>
          </Alert>
        )}
      </Box>
      {showReactivateLicense && <ReactivateLicencePopup renderSuccess={renderSuccess} />}
      {showSuccessPopup && <SuccessPopup />}
      {/* {!showChangepassword ? ( */}
      <Box mt={3}>
        {!showViewProfile ? (
          <Grid container display="flex" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Typography
                component="div"
                variant="h2"
                color="primary.main"
                py={2}
                sx={{
                  textAlign: {
                    xs: 'center',
                    md: 'start',
                  },
                }}
              >
                {isReadMode ? 'User Profile' : 'Edit Profile'}
                {!isReadMode && (
                  <Typography component="div" variant="body3" color="inputTextColor.main">
                    Update all your details correctly so that it could be verified by NMR verifiers.
                  </Typography>
                )}
              </Typography>
            </Grid>
            {loggedInUserType === 'Doctor' && (
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
              >
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShowChangepassword(true);
                    }}
                    sx={{
                      width: '100%',
                    }}
                  >
                    Change Password
                  </Button> */}
              </Grid>
            )}
            {isReadMode && (
              <Grid
                item
                xs={12}
                md={3}
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
          </Grid>
        ) : null}
        {!isReadMode && <ConstantDetails />}
        <Box bgcolor="white.main">
          <Wizard
            activeStep={loggedInUserType === 'College' ? activeStep + 1 : activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={wizardSteps}
            progress={false}
          >
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
            {activeStep === 2 && (
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
            )}
            {activeStep === 3 && (
              <PreviewProfile
                isReadMode={isReadMode}
                setIsReadMode={setIsReadMode}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
          </Wizard>
        </Box>
        {!isReadMode && activeStep === 3 && (
          <ProfileConsent
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
