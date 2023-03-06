import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Button } from '../../../../ui/core/button/button';
import WorkProfileComp from './work-profile';

const WorkProfile = () => {
  const [isEditWorkProfileOpen, setIsEditWorkProfileOpen] = useState(false);
  const { workProfileDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { current_work_details } = workProfileDetails || {};
  const { work_organization } = current_work_details?.[0] || {};

  const handleEdit = () => {
    setIsEditWorkProfileOpen(true);
  };
  return (
    <Container>
      {!isEditWorkProfileOpen && (
        <>
          {/* <Box>
            <Typography variant="h2">Work Details</Typography>
          </Box> */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography variant="h2" component="div">
              {work_organization}
            </Typography>
            <Button
              startIcon={<EditIcon sx={{ mr: 1 }} />}
              variant="contained"
              color="secondary"
              onClick={handleEdit}
              //   sx={{
              //     width: '100%',
              //   }}
            >
              Edit
            </Button>
          </Box>
        </>
      )}
      <WorkProfileComp
        isReadMode={!isEditWorkProfileOpen}
        showActions={false}
        showSuccessModal={true}
      />
    </Container>
  );
};

export default WorkProfile;
