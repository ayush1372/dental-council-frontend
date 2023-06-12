import CheckCircle from '@mui/icons-material/CheckCircle';
import { Button, Divider, Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import { useSelector } from 'react-redux';

import APPLICATIONICONBW from '../../../assets/images/application-approved-icon-BW.svg';
import { monthsData } from '../../../constants/common-data';
import { typeOfApplication, workflowStatusId } from '../../../helpers/functions/common-functions';
import VerticalLinearStepper from '../../../shared/stepper/vertical-stepper';
import { Chip } from '../../../ui/core';
import { BreadcrumbContainer } from '../../../ui/core/breadcrumb/breadcrumb';
export function TrackApplicationDetails({
  showViewProfile,
  setShowTrackApplicationTable,
  setShowTrackApplication,
  navigateToTab,
}) {
  const applicationStatus = useSelector(
    (state) => state?.common?.doctorTrackApplicationTableData?.data?.data
  );
  const showTrackApplicationTable = () => {
    setShowTrackApplicationTable(true);
    setShowTrackApplication(false);
  };
  const theme = useTheme();
  const currentStatus = useSelector(
    (state) => state?.common?.doctorTrackApplicationTableData?.data?.data?.current_status
  );
  const getDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}-${monthsData[dateObj.getMonth()].value}-${dateObj.getFullYear()}`;
  };
  const nmcApproveStatus = applicationStatus?.application_details?.some((label) => {
    return label?.action_id === 4 && label?.group_id === 3;
  });
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
      <BreadcrumbContainer
        primary={'Track Application'}
        onClick={navigateToTab}
        secondary={'Application Details'}
      />
      <Grid container spacing={2} pt={2}>
        <Grid item xs={12} md={9}>
          <Box
            boxShadow="1"
            p={2}
            borderRadius="5px"
            mb={2}
            display="flex"
            justifyContent="space-between"
            sx={{
              opacity: nmcApproveStatus ? '1' : '0.4',
            }}
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
                  {nmcApproveStatus
                    ? 'Application approved by NMC'
                    : 'Application pending verification by NMC'}
                  <CheckCircle
                    sx={{
                      color: nmcApproveStatus ? `${theme.palette.success.main}` : '',
                      height: '14px',
                      width: '16px',
                      pl: '4px',
                      visibility: !nmcApproveStatus ? 'hidden' : '',
                    }}
                  />
                </Typography>

                <Typography component="div" variant="body1" color="textPrimary.main">
                  {nmcApproveStatus
                    ? 'Your application has been approved by all authorities.'
                    : 'Your application is pending verification by NMC'}
                </Typography>
              </Box>
            </Box>
            <Chip
              type={nmcApproveStatus ? 'approved' : ''}
              label={nmcApproveStatus ? 'APPROVED' : 'NOT APPROVED'}
            />
          </Box>
          <Box boxShadow="1" p={2} borderRadius="5px">
            <Box>
              <Box>
                <VerticalLinearStepper />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box boxShadow="1" p={2} borderRadius="5px">
            <Typography variant="body1" fontWeight="600" color="textPrimary.main">
              Application Information
            </Typography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" color="grey.label">
                  Request ID
                </Typography>
                <Typography variant="subtitle2" color="textPrimary.main">
                  {`${applicationStatus?.request_id ? applicationStatus?.request_id : ''}`}
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" color="grey.label">
                  Type of Application
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textPrimary.main"
                  sx={{ wordBreak: 'break-all' }}
                >
                  {`${
                    typeOfApplication(applicationStatus?.application_type)
                      ? typeOfApplication(applicationStatus?.application_type)
                      : ''
                  }`}
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" component="div" color="grey.label">
                  Date of Submission
                </Typography>
                <Typography variant="subtitle2" color="textPrimary.main">
                  {`${
                    getDate(applicationStatus?.submission_date)
                      ? moment(getDate(applicationStatus?.submission_date)).format('DD-MM-YYYY')
                      : ''
                  }`}
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" color="grey.label">
                  Pendency days
                </Typography>
                <Typography variant="subtitle2" color="textPrimary.main">
                  {`${applicationStatus?.pendency}`}
                </Typography>
              </Grid>
              <Grid item xs={12} xl={6}>
                <Typography variant="body3" color="grey.label">
                  Current Status
                </Typography>
                <Typography variant="subtitle2" component="div" color={`status.${currentStatus}`}>
                  {`${workflowStatusId(currentStatus) ? workflowStatusId(currentStatus) : ''}`}
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
