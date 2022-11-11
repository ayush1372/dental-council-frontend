import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, Typography } from '@mui/material';

import useWizard from '../../hooks/use-wizard';
import { Button } from '../../ui/core/button/button';
import Wizard from '../../ui/core/wizard';
import Details from './components/user-details/details';
export const UserProfile = () => {
  const [isReadMode, setIsReadMode] = useState(true);
  const { activeStep, handleNext, handleBack } = useWizard(0, []);
  const wizardSteps = ['Personal Details', 'Registartion & Academic Details', 'Work Details'];
  return (
    <Container maxWidth="lg" sx={{ marginTop: '30px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h2" color="primary.main" py={2}>
            {isReadMode ? 'User Profile' : 'Edit User Profile'}
          </Typography>
        </Box>
        <Box>
          {isReadMode && (
            <Button
              endIcon={<EditIcon />}
              variant="contained"
              color="secondary"
              onClick={() => {
                setIsReadMode(false);
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>
      <Wizard
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        steps={wizardSteps}
        progress={false}
        // enableNaviagation={true}
      >
        <Details isReadMode={isReadMode} />
      </Wizard>
    </Container>
  );
};

export default UserProfile;
