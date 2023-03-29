import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { monthsData } from '../../../constants/common-data';
import Stepper from '../../../shared/stepper/stepper';
const wizardSteps = [
  'Application Submitted',
  'Pending At SMC',
  'Pending At College',
  'Pending At SMC',
  'Pending At NMC',
];
export function TrackApplicationDetails({
  showViewProfile,
  setShowTrackApplicationTable,
  setShowTrackApplication,
  selectedRowData,
}) {
  const {
    pendency,
    request_id,
    application_type_name,
    created_at,
    smc_status,
    nmc_status,
    collegeVerificationStatus,
    NMCVerificationStatus,
  } = selectedRowData;
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

      <Grid container>
        <Grid item xs={12} md={9}>
          {/* Apllication status bar starts */}
          <Box>
            <Typography varaiant="body1" component="div" color="textPrimary.main">
              Application Approved by NMC
            </Typography>
            <Typography component="div" variant="body1" color="textPrimary.main">
              NMC will review the application and approve it once it match with expected criteria
            </Typography>
          </Box>
          {/* Apllication status bar end */}
          {/* Application stepper starts */}
          <Box>
            stepper
            <Box py={{ xs: 0, sm: 4, lg: 2 }} mt={6} sx={{ overflowX: 'auto' }}>
              <Stepper
                steps={wizardSteps}
                selectedRowData={selectedRowData}
                activeStep={activeStep}
              />
            </Box>{' '}
          </Box>
          {/* Application stepper ends */}
        </Grid>
        <Grid item xs={12} md={3}>
          APP info
          <Grid container xs={6} columnSpacing={{ xs: 1, md: 2, lg: 7, xl: 8 }}>
            <Grid item xs={12} sm={6} md="auto" mb={{ xs: 2, md: 0 }}>
              <Typography variant="body3" color="grey.label">
                Request ID
              </Typography>
              <Typography variant="subtitle2" color="textPrimary.main">
                {request_id?.value}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md="auto" mb={{ xs: 2, md: 0 }}>
              <Typography variant="body3" color="grey.label">
                Type of Application
              </Typography>
              <Typography variant="subtitle2" color="textPrimary.main">
                {application_type_name?.value}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md="auto" mb={{ xs: 2, md: 0 }}>
              <Typography variant="body3" color="grey.label">
                Date of Submission
              </Typography>
              <Typography variant="subtitle2" color="textPrimary.main">
                {getDate(created_at?.value || new Date())}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md="auto" mb={{ xs: 2, md: 0 }}>
              <Typography variant="body3" color="grey.label">
                Current Status
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {/* Pending At SMC */}

                {smc_status?.value === 'PENDING' &&
                NMCVerificationStatus?.value === 'NOT YET RECEIVED' &&
                collegeVerificationStatus?.value === 'NOT YET RECEIVED' &&
                nmc_status?.value === 'NOT YET RECEIVED'
                  ? 'Pending At SMC'
                  : smc_status?.value === 'APPROVED' &&
                    NMCVerificationStatus?.value === 'PENDING' &&
                    collegeVerificationStatus?.value === 'NOT YET RECEIVED' &&
                    nmc_status?.value === 'NOT YET RECEIVED'
                  ? 'Pending At Registrar'
                  : smc_status?.value === 'APPROVED' &&
                    NMCVerificationStatus?.value === 'APPROVED' &&
                    collegeVerificationStatus?.value === 'PENDING' &&
                    nmc_status?.value === 'NOT YET RECEIVED'
                  ? 'Pending At Dean'
                  : 'Pending At NMC'}
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
