import { Box, Grid, Typography } from '@mui/material';

import ApplicationStepper from './application-stepper';

export function ApplicationDetails(props) {
  return (
    <Grid container spacing={2} mt={2}>
      <Typography
        id="2"
        variant="h2"
        mb={3}
        color={props.showViewProfile ? 'primary.main' : 'black.main'}
      >
        Application Details
      </Typography>
      <Box
        sx={{
          boxShadow: '1',
        }}
      >
        <Grid container spacing={2} mt={2} p={3}>
          <Grid container item spacing={6}>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Request ID
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                71-1567-8728-1025
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Type of Application
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                New Registration
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Date of Submission
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                31-Oct-2022
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Current Status
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                Pending At SMC
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Pendency
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                03
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <ApplicationStepper />
      </Box>
    </Grid>
  );
}

export default ApplicationDetails;
