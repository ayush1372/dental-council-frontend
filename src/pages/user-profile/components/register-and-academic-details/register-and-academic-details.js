import { Box } from '@mui/material';

import EditRegisterAndAcademicDetails from '../editable-profile/edit-register-and-academic-details';
import ReadRegisterAndAcademicDetails from '../read-register-and-academic-details/read-register-and-academic-details';
const RegisterAndAcademicDetails = ({ isReadMode, handleNext, handleBack, loggedInUserType }) => {
  return (
    <Box mt={1} py={4}>
      {isReadMode && loggedInUserType !== 'SMC' && (
        <ReadRegisterAndAcademicDetails handleBack={handleBack} isReadMode={isReadMode} />
      )}
      {!isReadMode && (
        <EditRegisterAndAcademicDetails handleNext={handleNext} handleBack={handleBack} />
      )}
      {loggedInUserType === 'SMC' && (
        <EditRegisterAndAcademicDetails
          handleNext={handleNext}
          handleBack={handleBack}
          loggedInUserType={loggedInUserType}
        />
      )}
    </Box>
  );
};

export default RegisterAndAcademicDetails;
