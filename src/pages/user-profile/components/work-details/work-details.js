import { Box } from '@mui/material';

import EditWorkDetails from '../edit-work-details/edit-work-details';
import ReadWorkDetails from '../read-work-details/read-work-details';
const WorkDetails = ({ isReadMode, setIsReadMode, handleNext, handleBack }) => {
  return (
    <Box mt={1}>
      {isReadMode && (
        <ReadWorkDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
      {!isReadMode && (
        <EditWorkDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setIsReadMode={setIsReadMode}
        />
      )}
    </Box>
  );
};

export default WorkDetails;
