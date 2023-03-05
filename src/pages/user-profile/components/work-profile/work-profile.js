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
  showActions = true,
  showSuccessModal = false,
}) => {
  return (
    <Box mt={1}>
      {isReadMode && loggedInUserType !== 'SMC' && (
        <ReadWorkProfile
          handleBack={handleBack}
          setShowDashboard={setShowDashboard}
          setShowTable={setShowTable}
          setShowViewPorfile={setShowViewPorfile}
          activeStep={activeStep}
          showActions={showActions}
        />
      )}
      {!isReadMode && (
        <EditWorkProfile
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
          showSuccessModal={showSuccessModal}
        />
      )}
      {loggedInUserType === 'SMC' && (
        <EditWorkProfile
          handleNext={handleNext}
          handleBack={handleBack}
          showSuccessModal={showSuccessModal}
        />
      )}
    </Box>
  );
};

export default WorkProfile;
