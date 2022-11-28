import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, Typography } from '@mui/material';

import useWizard from '../../hooks/use-wizard';
import { Button } from '../../ui/core/button/button';
import Wizard from '../../ui/core/wizard';
import PersonalDetails from './components/personal-details/personal-details';
import RegisterAndAcademicDetails from './components/register-and-academic-details/register-and-academic-details';
import WorkProfile from './components/work-profile/work-profile';

export const UserProfile = (props) => {
  const [isReadMode, setIsReadMode] = useState(true);
  const { activeStep, handleNext, handleBack } = useWizard(0, []);
  const wizardSteps = ['Personal Details', 'Registration & Academic Details', 'Work Profile'];

  return (
    <Container maxWidth="lg" sx={{ marginTop: '30px' }}>
      {!props.showViewProfile ? (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography component="div" variant="h2" color="primary.main" py={2}>
            {isReadMode ? 'User Profile' : 'Edit User Profile'}
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
      <Wizard
        activeStep={activeStep}
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
          />
        )}
      </Wizard>
    </Container>
  );
};

export default UserProfile;
