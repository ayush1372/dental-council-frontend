import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import useWizard from '../../../hooks/use-wizard';
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

export const NewDoctorRegistration = (props) => {
  const [isReadMode, setIsReadMode] = useState(true);
  const { activeStep, handleNext, handleBack, resetStep } = useWizard(0, []);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const [wizardSteps, setWizardSteps] = useState(readWizardSteps);

  useEffect(() => {
    if (!isReadMode) {
      setWizardSteps([...readWizardSteps, 'Preview Profile']);
    } else {
      setWizardSteps([...readWizardSteps]);
    }
  }, [isReadMode]);
  return (
    <>
      {!props.showViewProfile ? (
        <Box>
          <Box>
            <Typography component="div" variant="h2" color="primary.main" pb={2}>
              New User Registration
            </Typography>
            {loggedInUserType === 'SMC' && <ConstantDetails />}
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
    </>
  );
};

export default NewDoctorRegistration;
