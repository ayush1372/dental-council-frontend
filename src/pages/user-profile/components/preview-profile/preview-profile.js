import { Box } from '@mui/material';

import ReadWorkProfile from '../read-work-profile/read-work-profile';
import ReviewAllForms from '../review-all-forms/review-all-forms';
const PreviewProfile = ({ isReadMode, setIsReadMode, handleNext, handleBack }) => {
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
        <ReviewAllForms
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
    </Box>
  );
};

export default PreviewProfile;
