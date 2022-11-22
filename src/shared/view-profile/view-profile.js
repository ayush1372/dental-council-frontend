import { Grid, Typography } from '@mui/material';

export function MyProfile() {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={6}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Healthcare Professional ID
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            71-1567-8728-1025
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Council verification status
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            Submitted
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
      </Grid>

      {/* First row */}

      <Grid container item spacing={6}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Email
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            madhura638@gmail.com
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Mobile Number
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            9967453678
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MyProfile;
