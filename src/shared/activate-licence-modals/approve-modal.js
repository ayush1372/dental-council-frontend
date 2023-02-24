import { useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Grid, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Button } from '../../ui/core';

export default function ApproveLicenseModal({
  ClosePopup,
  reactiveLicenseRequestHPApplicationData,
}) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    ClosePopup();
  };
  const theme = useTheme();
  return (
    <Modal open={open} onClose={handleClose} sx={{ p: 5 }}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: `${theme.palette.white.main}`,
          borderRadius: '10px',
          height: '450px',
          p: 5,
        }}
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
        </Box>
        <Grid container item spacing={1} mt={3}>
          <Grid item xs={6} md={4}>
            <Typography component="div" color="grey.label">
              IMG/ Reg No.
            </Typography>

            <Typography component="div" color="primary.main">
              {reactiveLicenseRequestHPApplicationData?.registrationNo?.value}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography component="div" color="grey.label">
              Applicant Name
            </Typography>

            <Typography component="div" color="primary.main">
              {reactiveLicenseRequestHPApplicationData?.nameofApplicant?.value}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography component="div" color="grey.label">
              Suspension Type
            </Typography>

            <Typography component="div" color="primary.main">
              {reactiveLicenseRequestHPApplicationData?.typeOfSuspension?.value}
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <Button
            sx={{ width: '408px', mt: 4 }}
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
