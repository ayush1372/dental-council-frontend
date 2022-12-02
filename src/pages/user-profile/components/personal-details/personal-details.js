import { Box } from '@mui/material';

import EditPersonalDetails from '../editable-profile/edit-personal-details';
import ReadPersonalDetails from '../read-personal-details/read-personal-details';
const PersonalDetails = ({
  isReadMode,
  setIsReadMode,
  handleNext,
  handleBack,
  loggedInUserType,
}) => {
  return (
    <Box mt={1} py={4}>
      {isReadMode && loggedInUserType !== 'SMC' && (
        <ReadPersonalDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
      {!isReadMode && (
        <EditPersonalDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
      {loggedInUserType === 'SMC' && (
        <EditPersonalDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
    </Box>
  );
};

export default PersonalDetails;
