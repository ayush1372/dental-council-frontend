import { Box, Button, Divider, Grid, Typography } from '@mui/material';

import { monthsData } from '../../../constants/common-data';
import Stepper from '../../../shared/stepper/stepper';
const wizardSteps = ['Application Submitted', 'At SMC', 'At NMC', 'Application Approved/Rejected'];
export function TrackApplicationDetails({
  showViewProfile,
  setShowTrackApplicationTable,
  setShowTrackApplication,
  selectedRowData,
}) {
  const { pendency, request_id, application_type_id, created_at, smc_status, nmc_status } =
    selectedRowData;
  const showTrackApplicationTable = () => {
    setShowTrackApplicationTable(true);
    setShowTrackApplication(false);
  };

  const getDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}-${monthsData[dateObj.getMonth()].value}-${dateObj.getFullYear()}`;
  };
  const stepperArray = [smc_status?.value, nmc_status?.value];
  let activeStep = stepperArray.findIndex((value) => value === 'PENDING');
  activeStep = activeStep > -1 ? activeStep + 1 : 4;
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
              {request_id?.value}
            </Typography>
          </Grid>
          <Grid item xs={8} md="auto">
            <Typography variant="body3" color="grey.label">
              Type of Application
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {application_type_id?.value}
            </Typography>
          </Grid>
          <Grid item xs={8} md="auto">
            <Typography variant="body3" color="grey.label">
              Date of Submission
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {getDate(created_at?.value || new Date())}
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
              Pendency (days)
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {pendency?.value}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Grid container>
        <Grid container item xs={12} mt={8}>
          <Stepper steps={wizardSteps} selectedRowData={selectedRowData} activeStep={activeStep} />
        </Grid>
      </Grid>
      <Divider fullWidth sx={{ mt: 6 }} />
      <Grid mt={2}>
        <Button color="grey" variant="contained" onClick={showTrackApplicationTable}>
          Back
        </Button>
      </Grid>
    </>
  );
}

export default TrackApplicationDetails;
