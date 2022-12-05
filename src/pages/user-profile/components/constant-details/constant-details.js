import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Grid, Typography } from '@mui/material';

const ConstantDetails = () => {
  return (
    <Box bgcolor="white.main" py={2} px={4} mb={6}>
      <Grid container spacing={2}>
        <Grid container item spacing={2}>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              IMR ID
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              8904-2728-4688
            </Typography>
          </Grid>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Work Detail verification status
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
              Male
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
                aarnav.sharma@gmail.com
                <CheckCircleIcon color="success" sx={{ fontSize: '13px', ml: 1 }} />
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Mobile Number
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              9967453678 <CheckCircleIcon color="success" sx={{ fontSize: '13px', ml: 1 }} />
            </Typography>
          </Grid>
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Aadhaar
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              Verified <CheckCircleIcon color="success" sx={{ fontSize: '13px', ml: 1 }} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ConstantDetails;
