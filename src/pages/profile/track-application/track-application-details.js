/* eslint-disable no-console */
import { Chip } from '@material-ui/core';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

import { monthsData } from '../../../constants/common-data';
import { typeOfApplication, workflowStatusId } from '../../../helpers/functions/common-functions';
import Stepper from '../../../shared/stepper/stepper';
// import VerticalStepper from '../../../shared/stepper/stepper';
const wizardSteps = [
  'Application Submitted',
  'Pending At SMC',
  'Pending At College',
  'Pending At SMC',
  'Pending At NMC',
];
// const wizardSteps2 = [
//   'Application Approved by NMC',
//   'Application Approved by SMC',
//   'Application Details Updated',
//   'SMC Raised the Query in your Application',
//   'Application Approved by College',
//   'Application Details Updated',
//   'College Rejected Application',
//   'SMC Forwarded To College',
//   'Application Submitted',
// ];
export function TrackApplicationDetails({
  showViewProfile,
  setShowTrackApplicationTable,
  setShowTrackApplication,
  selectedRowData,
}) {
  const {
    // pendency,
    // request_id,
    // application_type_name,
    // created_at,
    smc_status,
    nmc_status,
    // collegeVerificationStatus,
    // NMCVerificationStatus,
  } = selectedRowData;
  const ApplicationStatus = useSelector(
    (state) => state?.common?.doctorTrackApplicationTableData?.data?.data
  );
  const showTrackApplicationTable = () => {
    setShowTrackApplicationTable(true);
    setShowTrackApplication(false);
  };
  const currentStatus = useSelector((state) =>
    state?.common?.doctorTrackApplicationTableData?.data?.data?.application_details.map(
      (label) => label?.workflow_status_id
    )
  );
  // const applicationName = useSelector((state) =>
  //   state.common.trackApplicationTableData?.data?.data?.health_professional_applications.map(
  //     (data) => data?.application_type_name
  //   )
  // );
  // console.log('tabledata123', tableData);
  console.log('stepper selectedRowData', selectedRowData);
  const getDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}-${monthsData[dateObj.getMonth()].value}-${dateObj.getFullYear()}`;
  };
  const stepperArray = [smc_status?.value, nmc_status?.value];
  let activeStep = stepperArray.findIndex((value) => value === 'PENDING');
  activeStep = activeStep > -1 ? activeStep + 1 : 4;
  return (
    <Box>
      <Typography
        id="2"
        variant="h2"
        mb={3}
        color={showViewProfile ? 'primary.main' : 'black.main'}
      >
        Application Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} sx={{ boxShadow: '1' }}>
          {/* Apllication status bar starts */}
          <Box display="flex" justifyContent="space-evenly">
            <Box>
              <Typography varaiant="body1" component="div" color="textPrimary.main">
                Application Approved by NMC
              </Typography>
              <Typography component="div" variant="body1" color="textPrimary.main">
                NMC will review the application and approve it once it match with expected criteria
              </Typography>
            </Box>
            <Box>
              <Chip
                // type={label?.workflow_status_id}
                label={
                  <Typography variant="body4">
                    {/* {workflowStatusId(label?.workflow_status_id)} */}
                    NOT APPROVED
                  </Typography>
                }
              />
            </Box>
          </Box>
          {/* Apllication status bar end */}
          {/* Application stepper starts */}
          <Box>
            {/* stepper */}
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
        <Grid item xs={12} md={3} sx={{ boxShadow: '1' }}>
          Application information
          <Box>
            <Typography variant="body3" color="grey.label">
              Request ID
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {ApplicationStatus?.request_id}
            </Typography>

            <Typography variant="body3" color="grey.label">
              Type of Application
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {typeOfApplication(ApplicationStatus?.application_type)}
            </Typography>

            <Typography variant="body3" color="grey.label">
              Date of Submission
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {getDate(ApplicationStatus?.submission_date)}
            </Typography>

            <Typography variant="body3" color="grey.label">
              Current Status
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {workflowStatusId(currentStatus)}
            </Typography>

            <Typography variant="body3" color="grey.label">
              Pendency (days)
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {ApplicationStatus?.pendency}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider fullWidth sx={{ mt: 6 }} />
      <Box mt={2}>
        <Button color="grey" variant="contained" onClick={showTrackApplicationTable}>
          Back
        </Button>
      </Box>
    </Box>
  );
}

export default TrackApplicationDetails;
