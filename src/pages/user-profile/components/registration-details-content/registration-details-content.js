import { Box, Grid, Typography } from '@mui/material';

const RegistrationDetailsContent = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registered with council
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              West Bengal Medical Council
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration Number
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              7991749871719
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration Date
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              30-10-2021
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            permanent
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Due Date of Renewal
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              30-10-2022
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration Certificate
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            Yes
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegistrationDetailsContent;
