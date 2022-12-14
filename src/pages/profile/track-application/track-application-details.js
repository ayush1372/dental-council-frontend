import { Box, Button, Grid, Typography } from '@mui/material';

import Stepper from '../../../shared/stepper/stepper';
const wizardSteps = [
  'Application Submitted',
  'Pending At SMC',
  'Pending At NMC',
  'Application Approved/Rejected',
];
export function TrackApplicationDetails({
  showViewProfile,
  setShowTrackApplicationTable,
  setShowTrackApplication,
}) {
  const showTrackApplicationTable = () => {
    setShowTrackApplicationTable(true);
    setShowTrackApplication(false);
  };
  return (
    <>
      <Typography
        id="2"
        variant="h2"
        mb={3}
        color={showViewProfile ? 'primary.main' : 'black.main'}
      >
        Application Details
      </Typography>
      <Box bgcolor="backgroundColor.light" p={4} borderRadius="5px">
        <Grid container xs={12} columnSpacing={{ xs: 1, md: 2, lg: 4, xl: 8 }}>
          <Grid item xs={8} md="auto">
            <Typography variant="body3" color="grey.label">
              Request ID
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              71-1567-8728-1025
            </Typography>
          </Grid>
          <Grid item xs={8} md="auto">
            <Typography variant="body3" color="grey.label">
              Type of Application
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              New Registration
            </Typography>
          </Grid>
          <Grid item xs={8} md="auto">
            <Typography variant="body3" color="grey.label">
              Date of Submission
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              31-Oct-2022
            </Typography>
          </Grid>
          <Grid item xs={8} md="auto">
            <Typography variant="body3" color="grey.label">
              Current Status
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              Pending At SMC
            </Typography>
          </Grid>
          <Grid item xs={8} md="auto">
            <Typography variant="body3" color="grey.label">
              Pendency
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              03
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid container item xs={12} mt={8}>
          <Stepper steps={wizardSteps} />
        </Grid>
        <Grid mt={6}>
          <Button color="grey" variant="contained" onClick={showTrackApplicationTable}>
            Back
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default TrackApplicationDetails;
