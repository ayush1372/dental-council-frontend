import { Box } from '@mui/material';

import EditPersonalDetails from '../edit-personal-details/edit-personal-details';
import ReadPersonalDetails from '../read-personal-details/read-personal-details';
const PersonalDetails = ({ isReadMode, handleNext }) => {
  return (
    <Box mt={1}>
      {isReadMode && <ReadPersonalDetails handleNext={handleNext} />}
      {!isReadMode && <EditPersonalDetails handleNext={handleNext} />}
    </Box>
  );
};

export default PersonalDetails;
