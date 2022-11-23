import { Box } from '@mui/material';

import EditWorkProfile from '../edit-work-profile/edit-work-profile';
import ReadWorkProfile from '../read-work-profile/read-work-profile';
const WorkProfile = ({ isReadMode, setIsReadMode, handleNext, handleBack }) => {
  return (
    <Box mt={1}>
      {isReadMode && (
        <ReadWorkProfile
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
      {!isReadMode && (
        <EditWorkProfile
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
    </Box>
  );
};

export default WorkProfile;
