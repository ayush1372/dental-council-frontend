/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import TuneIcon from '@mui/icons-material/Tune';
import { Alert, Box, Container, Link, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import useWizard from '../../hooks/use-wizard';
import BasicModal from '../../shared/popup';
import ReactivateLicencePopup from '../../shared/reactivate-licence-popup/reactivate-licence-popup';
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

  useEffect(() => {
    if (!isReadMode) {
      setWizardSteps([...readWizardSteps, 'Preview Profile']);
    } else {
      setWizardSteps([...readWizardSteps]);
    }
  }, [isReadMode]);

  return (
    <Container>
      {loggedInUserType === 'Doctor' && (
        <Alert severity="error" sx={{ color: 'suspendAlert.main' }}>
          Your Profile is set to suspend mode. You will not be able to perform actions on the
          profile.{' '}
          <Typography component="span" sx={{ color: 'suspendAlert.main' }}>
            <TuneIcon
              sx={{
                color: 'suspendAlert.main',
                width: '18px',
                height: '18px',
                ml: 3,
                // mt: 1,
              }}
            />
            <Link
              sx={{
                color: 'suspendAlert.secondary',
              }}
            >
              <Button
                sx={{
                  color: 'suspendAlert.secondary',
                }}
                onClick={() => setShowReactivateLicense(true)}
              >
                Change Settings
              </Button>
            </Link>
          </Typography>
        </Alert>
      )}
      {showReactivateLicense && <ReactivateLicencePopup renderSuccess={renderSuccess} />}
      {showSuccessPopup && <BasicModal />}
      {!showChangepassword ? (
        <Container maxWidth="lg" sx={{ marginTop: '30px' }}>
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
                      onClick={() => {
                        setIsReadMode(false);
                      }}
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
              // enableNaviagation={true}
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
        </Container>
      ) : (
        <Container>
          <ChangePassword />
        </Container>
      )}
    </Container>
  );
};

export default UserProfile;
