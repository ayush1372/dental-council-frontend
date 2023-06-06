import { Grid, Typography } from '@mui/material';

import { capitalize } from '../../../../helpers/functions/common-functions';

const IMRDetails = ({ personalDetails }) => {
  const { kyc_address } = personalDetails || {};
  const { country, state, pincode } = kyc_address || {};

  const countryName = country?.name || '';
  const stateName = state?.name || '';
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
              {kyc_address?.address_line1}
              {kyc_address?.address_line1 === undefined
                ? ''
                : kyc_address?.address_line1 !== '' && ', '}
              {capitalize(stateName)}
              {capitalize(stateName) === undefined ? '' : capitalize(stateName) !== '' && ', '}
              {countryName}
              {countryName === undefined ? '' : countryName !== '' && ', '}
              {pincode}
              {pincode === undefined ? '' : pincode !== '' && '. '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IMRDetails;
