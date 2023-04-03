/* eslint-disable no-console */
import { Chip } from '@material-ui/core';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

import APPLICATIONICONBW from '../../../assets/images/application-approved-icon-BW.svg';
// import APPLICATIONICONCOLOR from '../../../assets/images/application-approved-icon-color.svg';
import { monthsData } from '../../../constants/common-data';
import { typeOfApplication, workflowStatusId } from '../../../helpers/functions/common-functions';
import VerticalLinearStepper from '../../../shared/stepper/vertical-stepper';
// import Stepper from '../../../shared/stepper/stepper';
// import VerticalStepper from '../../../shared/stepper/stepper';
// const wizardSteps = [
//   'Application Submitted',
//   'Pending At SMC',
//   'Pending At College',
//   'Pending At SMC',
//   'Pending At NMC',
// ];
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
  // eslint-disable-next-line no-empty-pattern
  const {
    // pendency,
    // request_id,
    // application_type_name,
    // created_at,
    // smc_status,
    // nmc_status,
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
  // const stepperArray = [smc_status?.value, nmc_status?.value];
  // let activeStep = stepperArray.findIndex((value) => value === 'PENDING');
  // activeStep = activeStep > -1 ? activeStep + 1 : 4;
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
        <Grid item xs={12} md={9}>
          <Box
            boxShadow="1"
            p={2}
            borderRadius="5px"
            mb={2}
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex">
              <img src={APPLICATIONICONBW} alt="application icon" />
              <Box ml={2}>
                <Typography
                  varaiant="body1"
                  fontWeight="600"
                  component="div"
                  color="textPrimary.main"
                >
                  Application Approved by NMC
                </Typography>

                <Typography component="div" variant="body1" color="textPrimary.main">
                  NMC will review the application and approve it once it match with expected
                  criteria
                </Typography>
              </Box>
            </Box>
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
          <Box boxShadow="1" p={2} borderRadius="5px">
            <Box>
              {/* stepper */}
              <Box>
                {/* <Stepper
                steps={wizardSteps}
                selectedRowData={selectedRowData}
                activeStep={activeStep}
              /> */}
                <VerticalLinearStepper />
              </Box>{' '}
            </Box>
          </Box>
          {/* Application stepper ends */}
        </Grid>
        <Grid item xs={12} md={3}>
          <Box boxShadow="1" p={2} borderRadius="5px">
            <Typography variant="body1" fontWeight="600">
              Application information
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" color="grey.label">
                  Request ID
                </Typography>
                <Typography variant="subtitle2" color="textPrimary.main">
                  {ApplicationStatus?.request_id}
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" color="grey.label">
                  Type of Application
                </Typography>
                <Typography variant="subtitle2" color="textPrimary.main">
                  {typeOfApplication(ApplicationStatus?.application_type)}
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" color="grey.label">
                  Date of Submission
                </Typography>
                <Typography variant="subtitle2" color="textPrimary.main">
                  {getDate(ApplicationStatus?.submission_date)}
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" color="grey.label">
                  Pendency (days)
                </Typography>
                <Typography variant="subtitle2" color="textPrimary.main">
                  {ApplicationStatus?.pendency}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={3}>
                <Typography variant="body3" color="grey.label">
                  Current Status
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {workflowStatusId(currentStatus)}
                </Typography>
              </Grid>
            </Grid>
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
