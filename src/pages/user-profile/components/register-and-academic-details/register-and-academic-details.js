import { Box } from '@mui/material';

import EditRegisterAndAcademicDetails from '../edit-register-and-academic-details/edit-register-and-academic-details';
import ReadRegisterAndAcademicDetails from '../read-register-and-academic-details/read-register-and-academic-details';
const RegisterAndAcademicDetails = ({ isReadMode, handleNext, handleBack }) => {
  return (
    <Box mt={1}>
      {isReadMode && (
        <ReadRegisterAndAcademicDetails handleNext={handleNext} handleBack={handleBack} />
      )}
      {!isReadMode && (
        <EditRegisterAndAcademicDetails handleNext={handleNext} handleBack={handleBack} />
      )}
    </Box>
  );
};

export default RegisterAndAcademicDetails;
