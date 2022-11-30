import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import useWizard from '../../../hooks/use-wizard';
import { Button } from '../../../ui/core/button/button';
import Wizard from '../../../ui/core/wizard';
import ConstantDetails from '../../user-profile/components/constant-details/constant-details';
import PersonalDetails from '../../user-profile/components/personal-details/personal-details';
import PreviewProfile from '../../user-profile/components/preview-profile/preview-profile';
import ProfileConsent from '../../user-profile/components/profile-consent/profile-consent';
import RegisterAndAcademicDetails from '../../user-profile/components/register-and-academic-details/register-and-academic-details';
import WorkProfile from '../../user-profile/components/work-profile/work-profile';

const readWizardSteps = [
  'Personal Details',
  'Registration & Academic Details',
  'Work Profile',
  'Preview Profile',
];

export const UserProfile = (props) => {
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
      {!props.showViewProfile ? (
        <Box>
          <Box>
            <Typography component="div" variant="h2" color="primary.main" py={2}>
              {isReadMode && loggedInUserType !== 'SMC'
                ? 'User Profile'
                : loggedInUserType === 'SMC'
                ? 'New User Registration'
                : 'Edit Profile'}
              {!isReadMode && loggedInUserType !== 'SMC' && (
                <Typography component="div" variant="body3" color="inputTextColor.main">
                  Update all your details correctly so that it could be verified by NMR verifiers.
                </Typography>
              )}
            </Typography>
            {loggedInUserType === 'SMC' && <ConstantDetails />}
          </Box>
          <Box>
            {isReadMode && loggedInUserType !== 'SMC' && (
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
          activeStep={loggedInUserType === 'SMC' ? activeStep : activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={wizardSteps}
          progress={activeStep === 0 ? 0 : activeStep === 1 ? 30 : activeStep === 2 ? 60 : 90}
          // enableNaviagation={true}
        >
          {activeStep === 0 && (
            <PersonalDetails
              isReadMode={isReadMode}
              setIsReadMode={setIsReadMode}
              handleNext={handleNext}
              handleBack={handleBack}
              loggedInUserType={loggedInUserType}
            />
          )}
          {activeStep === 1 && (
            <RegisterAndAcademicDetails
              isReadMode={isReadMode}
              setIsReadMode={setIsReadMode}
              handleNext={handleNext}
              handleBack={handleBack}
              loggedInUserType={loggedInUserType}
            />
          )}
          {activeStep === 2 && (
            <WorkProfile
              isReadMode={isReadMode}
              setIsReadMode={setIsReadMode}
              handleNext={handleNext}
              handleBack={handleBack}
              loggedInUserType={loggedInUserType}
            />
          )}
          {activeStep === 3 && (
            <PreviewProfile
              isReadMode={isReadMode}
              setIsReadMode={setIsReadMode}
              handleNext={handleNext}
              handleBack={handleBack}
              loggedInUserType={loggedInUserType}
            />
          )}
        </Wizard>
      </Box>
      {isReadMode && activeStep === 3 && (
        <ProfileConsent
          handleBack={handleBack}
          resetStep={resetStep}
          setIsReadMode={setIsReadMode}
          loggedInUserType={loggedInUserType}
        />
      )}
    </Container>
  );
};

export default UserProfile;
