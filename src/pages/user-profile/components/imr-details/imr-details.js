import { Box, Grid, Typography } from '@mui/material';

const IMRDetails = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            IMR ID
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              9598237230192838
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Year of info
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Select Year of info
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration Number*
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              672929
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IMRDetails;
