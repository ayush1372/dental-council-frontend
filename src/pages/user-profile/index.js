import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import useWizard from '../../hooks/use-wizard';
import { Button } from '../../ui/core/button/button';
import Wizard from '../../ui/core/wizard';
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
  const { activeStep, handleNext, handleBack, resetStep } = useWizard(0, []);
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  const [wizardSteps, setWizardSteps] = useState(readWizardSteps);

  useEffect(() => {
    if (!isReadMode) {
      setWizardSteps([...readWizardSteps, 'Preview Profile']);
    } else {
      setWizardSteps([...readWizardSteps]);
    }
  }, [isReadMode]);
  return (
    <Container maxWidth="lg" sx={{ marginTop: '30px' }}>
      {!showViewProfile ? (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography component="div" variant="h2" color="primary.main" py={2}>
            {isReadMode ? 'User Profile' : 'Edit Profile'}
            {!isReadMode && (
              <Typography component="div" variant="body3" color="inputTextColor.main">
                Update all your details correctly so that it could be verified by NMR verifiers.
              </Typography>
            )}
          </Typography>

          <Box>
            {isReadMode && (
              <Button
                endIcon={<EditIcon />}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsReadMode(false);
                }}
                sx={{
                  width: 'max-content',
                }}
              >
                Edit Profile
              </Button>
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
  );
};

export default UserProfile;
