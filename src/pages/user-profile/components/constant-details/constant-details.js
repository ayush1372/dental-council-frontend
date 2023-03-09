// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import IconVerified from '../../../../assets/images/ico-verified.svg';

const ConstantDetails = () => {
  const nmrIdData = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.imr_details?.nmr_id
  );
  // const personGender = useSelector(
  //   (state) => state?.doctorUserProfileReducer?.personalDetails?.personal_details?.gender
  // );
  const emailId = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.communication_address?.email
  );
  const mobileNumber = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.communication_address?.mobile
  );

  const theme = useTheme();

  return (
    <Box bgcolor="white.main" py={3} mb={2} boxShadow="1">
      <Grid container>
        <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          xl={2}
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            IMR/Registration Number
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            {nmrIdData ? nmrIdData : ''}
          </Typography>
        </Grid>
        <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          xl={2}
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            NMR ID
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            {nmrIdData ? nmrIdData : ''}
          </Typography>
        </Grid>
        {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            Work Detail Verification Status
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            Submitted
          </Typography>
        </Grid> */}
        {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg={1}
          pl={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            Gender
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            {personGender ? personGender : ''}
          </Typography>
        </Grid> */}
        {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            Aadhaar
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            Verified
            <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
          </Typography>
        </Grid> */}
        <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          xl={2}
          px={2}
        >
          <Typography variant="body3" color="grey.label">
            Mobile Number
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            {mobileNumber ? mobileNumber : ''}
            <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
            <Typography component="span" variant="subtitle2" color="primary.main" ml={1}>
              Change
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md="auto" lg="auto" pl={2}>
          <Typography variant="body3" color="grey.label">
            Email
          </Typography>
          <Grid>
            <Typography
              variant="subtitle2"
              color="textPrimary.main"
              sx={{ wordBreak: 'break-word' }}
            >
              {emailId ? emailId : ''}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ConstantDetails;
