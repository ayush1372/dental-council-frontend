import { Box } from '@mui/material';

import EditWorkProfile from '../editable-profile/edit-work-profile';
import ReadWorkProfile from '../read-work-profile/read-work-profile';
const WorkProfile = ({
  isReadMode,
  setIsReadMode,
  handleNext,
  handleBack,
  loggedInUserType,
  setShowDashboard,
  setShowTable,
  setShowViewPorfile,
  activeStep,
}) => {
  return (
    <Box mt={1}>
      {isReadMode && loggedInUserType !== 'SMC' && (
        <ReadWorkProfile
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
          setShowDashboard={setShowDashboard}
          setShowTable={setShowTable}
          setShowViewPorfile={setShowViewPorfile}
          activeStep={activeStep}
        />
      )}
      {!isReadMode && (
        <EditWorkProfile
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
      {loggedInUserType === 'SMC' && (
        <EditWorkProfile handleNext={handleNext} handleBack={handleBack} />
      )}
    </Box>
  );
};

export default WorkProfile;
