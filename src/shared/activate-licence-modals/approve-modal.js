import { useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Grid, Modal, Typography } from '@mui/material';

// import { collegeProfileData } from '../../constants/common-data';
import { Button } from '../../ui/core';

export default function ApproveLicenseModal() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{ backgroundColor: 'white.main', borderRadius: '10px', height: '450px', p: '30px' }}
      >
        <Box mb={1} display="flex" justifyContent="center">
          <TaskAltOutlinedIcon
            sx={{
              color: 'success.dark',
              width: '80px',
              height: '80px',
            }}
          />
        </Box>

        <Box>
          <Typography
            data-testid="popup-input-success-text"
            variant="h2"
            color="success.dark"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            SUCCESS!
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            textAlign="center"
            mt={2}
            ml={10}
            data-testid="popup-input-text"
          >
            Application Approved Successfully
          </Typography>
          <Grid container>
            <Grid container item spacing={1}>
              <Grid item xs={6} md={4}>
                <Typography variant="" color="grey.label">
                  IMG/ Reg No.
                </Typography>

                <Typography variant="" color="primary.main">
                  {/* {collegeProfileData.collegename.name} */}177255
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="" color="grey.label">
                  Applicant Name
                </Typography>

                <Typography variant="" color="primary.main">
                  {/* {collegeProfileData.collegeId.name} */}Basavaraj Harihar
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography variant="" color="grey.label">
                  Suspension Type
                </Typography>

                <Typography variant="" color="primary.main">
                  {/* {collegeProfileData.collegePhnNumber.name} */}Temporary
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Button
            sx={{ width: '408px', mt: 5 }}
            variant="contained"
            color="warning"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
