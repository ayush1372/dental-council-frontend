import { Grid, Typography } from '@mui/material';

const IMRDetails = ({ personalDetails }) => {
  const { kyc_address } = personalDetails || {};

  return (
    <Grid container spacing={2} mt={1}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body5" color="grey.label">
            Aadhaar Verified Address
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {kyc_address?.address_line1 ? kyc_address?.address_line1 : ''}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IMRDetails;
