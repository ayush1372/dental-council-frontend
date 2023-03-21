// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import IconVerified from '../../../../assets/images/ico-verified.svg';

const ConstantDetails = () => {
  const nmrIdData = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.nmr_id
  );
  const registration_number = useSelector(
    (state) =>
      state?.doctorUserProfileReducer?.registrationDetails?.registration_detail_to
        ?.registration_number
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
            {registration_number ? registration_number : ''}
          </Typography>
        </Grid>
        {nmrIdData && (
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
            </Typography>{' '}
          </Grid>
        )}

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
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
          <Typography variant="body3" color="grey.label">
            Mobile Number
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main" width="auto" mr={0.5}>
              {mobileNumber ? mobileNumber : ''}
            </Typography>
            <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
            <Typography component="span" variant="subtitle2" color="primary.main" ml={0.5}>
              Change
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} px={2}>
          <Typography component="div" variant="body3" color="grey.label">
            Email
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main" width="auto" mr={0.5}>
              {emailId ? emailId : ''}
            </Typography>
            <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
            <Typography component="span" variant="subtitle2" color="primary.main" ml={0.5}>
              Change
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ConstantDetails;
