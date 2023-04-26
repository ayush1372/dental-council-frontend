import { Box } from '@mui/material';

import ReviewAllForms from '../review-all-forms/review-all-forms';
const PreviewProfile = ({
  isReadMode,
  setIsReadMode,
  handleNext,
  handleBack,
  loggedInUserType,
}) => {
  return (
    <Box mt={1}>
      {!isReadMode && (
        <ReviewAllForms
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
      {loggedInUserType === 'SMC' && (
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
