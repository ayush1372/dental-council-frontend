import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import useWizard from '../../hooks/use-wizard';
import { fetchStates } from '../../store/reducers/menu-lists-reducer';
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

  const [wizardSteps, setWizardSteps] = useState(readWizardSteps);
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  // const countries = useSelector((state) => state.userProfile.countries);
  const statesList = useSelector((state) => state.userProfile.statesList);
  const { activeStep, handleNext, handleBack, resetStep } = useWizard(
    loggedInUserType === 'Doctor' ? 0 : 1,
    []
  );

  useEffect(() => {
    // if (countries.data.length === 0) dispatch(fetchCountries());
    if (statesList.data.length === 0) dispatch(fetchStates());
  }, [statesList]);

  useEffect(() => {
    if (!isReadMode) {
      setWizardSteps([...readWizardSteps, 'Preview Profile']);
    } else {
      setWizardSteps([...readWizardSteps]);
    }
  }, [isReadMode]);

  return (
    <>
      {!showChangepassword ? (
        <Box maxWidth="lg">
          {!showViewProfile ? (
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography component="div" variant="h2" color="primary.main">
                {isReadMode ? 'User Profile' : 'Edit Profile'}
                {!isReadMode && (
                  <Typography component="div" variant="body3" color="inputTextColor.main">
                    Update all your details correctly so that it could be verified by NMR verifiers.
                  </Typography>
                )}
              </Typography>

              <Box display={'flex'}>
                {isReadMode && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShowChangepassword(true);
                    }}
                    size="small"
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
                      size="small"
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
