// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ConstantDetails = () => {
  // const { imr_details } = ConstantDetails || {};
  // const { nmrIdData } = imr_details || {};
  // const { personal_details } = ConstantDetails || {};
  // // const { gender } = personal_details || {};
  // const { communication_address } = ConstantDetails || {};
  // const { email, mobile } = communication_address || {};
  const nmrIdData = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.imr_details?.nmr_id
  );
  const personGender = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.personal_details?.gender
  );
  const emailId = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.communication_address?.email
  );
  const mobileNumber = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.communication_address?.mobile
  );

  return (
    <Box bgcolor="white.main" py={2} px={4} mb={6}>
      <Grid container spacing={2}>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              IMR ID
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {nmrIdData ? nmrIdData : ''}
            </Typography>
          </Grid>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Work Detail Verification Status
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              Submitted
            </Typography>
          </Grid>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Gender
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {personGender ? personGender : ''}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Email
            </Typography>
            <Grid>
              <Typography variant="subtitle2" color="primary.main">
                {emailId ? emailId : ''}
                {/* <CheckCircleIcon color="success" fontSize="width12" sx={{ ml: 1 }} /> */}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Mobile Number
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {mobileNumber ? mobileNumber : ''}
              {/* <CheckCircleIcon color="success" fontSize="width12" sx={{ ml: 1 }} /> */}
            </Typography>
          </Grid>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Aadhaar
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              Verified
              {/* <CheckCircleIcon color="success" fontSize="width12" sx={{ ml: 1 }} /> */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ConstantDetails;
