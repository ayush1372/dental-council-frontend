import { Box } from '@mui/material';

import EditPersonalDetails from '../editable-profile/edit-personal-details';
import ReadPersonalDetails from '../read-personal-details/read-personal-details';
const PersonalDetails = ({
  isReadMode,
  setIsReadMode,
  handleNext,
  handleBack,
  loggedInUserType,
  validDetails,
  setValidDetails,
  selectedDataIndex,
}) => {
  return (
    <Box mt={1} py={4}>
      {isReadMode && loggedInUserType !== 'SMC' && (
        <ReadPersonalDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
          selectedDataIndex={selectedDataIndex}
        />
      )}
      {!isReadMode && (
        <EditPersonalDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
          validDetails={validDetails}
          setValidDetails={setValidDetails}
        />
      )}
      {loggedInUserType === 'SMC' && (
        <EditPersonalDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
          validDetails={validDetails}
          setValidDetails={setValidDetails}
        />
      )}
    </Box>
  );
};

export default PersonalDetails;
