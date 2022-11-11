import { Box } from '@mui/material';

import EditDetails from '../edit-details/edit-details';
import ReadOnlyDetails from '../read-only-details/read-only-details';
const Details = ({ isReadMode }) => {
  return (
    <Box mt={1}>
      {isReadMode && <ReadOnlyDetails />}
      {!isReadMode && <EditDetails />}
    </Box>
  );
};

export default Details;
