import { Grid, Typography } from '@mui/material';

import { capitalize } from '../../../../helpers/functions/common-functions';

const IMRDetails = ({ personalDetails }) => {
  const { communication_address, kyc_address } = personalDetails || {};
  const { country, state, district, sub_district, pincode, village } = kyc_address || {};

  const countryName = country?.name || '';
  const stateName = state?.name || '';
  const districtName = district?.name || '';
  const subDistrictName = sub_district?.name || '';
  const villageName = village?.name || '';
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
              {communication_address?.house}
              {communication_address?.house !== '' ? ', ' : ' '}
              {communication_address?.street}
              {communication_address?.street !== '' ? ', ' : ' '}
              {communication_address?.landmark}
              {communication_address?.landmark !== '' ? ', ' : ' '}
              {villageName}
              {villageName !== '' ? ', ' : ' '}
              {capitalize(districtName)}
              {capitalize(districtName) !== '' ? ', ' : ' '}
              {subDistrictName}
              {subDistrictName !== '' ? ', ' : ' '}
              {capitalize(stateName)}
              {capitalize(stateName) !== '' ? ', ' : ' '}
              {countryName}
              {countryName !== '' ? ', ' : ' '}
              {pincode}
              {pincode !== '' ? '. ' : ' '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IMRDetails;
