import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import TuneIcon from '@mui/icons-material/Tune';
import { Alert, Box, Container, Link, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { verboseLog } from '../../config/debug';
import useWizard from '../../hooks/use-wizard';
import ReactivateLicencePopup from '../../shared/reactivate-licence-popup/re-activate-licence-popup';
import SuccessPopup from '../../shared/reactivate-licence-popup/success-popup';
import { getStatesList } from '../../store/actions/menu-list-actions';
import { Button } from '../../ui/core/button/button';
import Wizard from '../../ui/core/wizard';
import ChangePassword from '../profile/change-password/change-password';
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
}) => {
  const dispatch = useDispatch();
  const [isReadMode, setIsReadMode] = useState(true);
  const [showChangepassword, setShowChangepassword] = useState(false);
  const [showReactivateLicense, setShowReactivateLicense] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [wizardSteps, setWizardSteps] = useState(readWizardSteps);
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);

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

  const openDoctorEditProfile = () => {
    setIsReadMode(false);
    fetchStates();
  };

  useEffect(() => {
    if (!isReadMode) {
      setWizardSteps([...readWizardSteps, 'Preview Profile']);
    } else {
      setWizardSteps([...readWizardSteps]);
    }
  }, [isReadMode]);

  return (
    <>
      <Box display="flex" justifyContent="start">
        {loggedInUserType === 'Doctor' && (
          <Alert
            severity="error"
            sx={{
              color: 'suspendAlert.light',
              width: '1479px',
              height: '56px',
            }}
          >
            <Typography width="667px" height="19px" color="suspendAlert.dark">
              Your Profile is set to suspend mode. You will not be able to perform actions on the
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
      {!showChangepassword ? (
        <Box sx={{ marginTop: '30px' }}>
          {!showViewProfile ? (
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography component="div" variant="h2" color="primary.main" py={2}>
                {isReadMode ? 'User Profile' : 'Edit Profile'}
                {!isReadMode && (
                  <Typography component="div" variant="body3" color="inputTextColor.main">
                    Update all your details correctly so that it could be verified by NMR verifiers.
                  </Typography>
                )}
              </Typography>

              <Box display={'flex'}>
                {loggedInUserType === 'Doctor' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShowChangepassword(true);
                    }}
                    sx={{
                      width: 'max-content',
                    }}
                  >
                    Change password
                  </Button>
                )}
                {isReadMode && (
                  <Box display={'flex'}>
                    <Button
                      startIcon={<EditIcon sx={{ mr: 1 }} />}
                      variant="contained"
                      color="secondary"
                      onClick={openDoctorEditProfile}
                      sx={{
                        width: 'max-content',
                        ml: '25px',
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
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
      ) : (
        <Container>
          <ChangePassword />
        </Container>
      )}
    </>
  );
};

export default UserProfile;
