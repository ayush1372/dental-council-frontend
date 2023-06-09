import { Grid, Typography } from '@mui/material';

import { capitalize } from '../../../../helpers/functions/common-functions';

const IMRDetails = ({ personalDetails }) => {
  const { kyc_address } = personalDetails || {};
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
              {kyc_address?.house}
              {kyc_address?.house === undefined ? '' : kyc_address?.house !== '' && ', '}
              {kyc_address?.street}
              {kyc_address?.street === undefined ? '' : kyc_address?.street !== '' && ', '}
              {kyc_address?.landmark}
              {kyc_address?.landmark === undefined ? '' : kyc_address?.landmark !== '' && ', '}
              {villageName}
              {villageName !== '' ? ', ' : ' '}
              {subDistrictName}
              {subDistrictName === undefined ? '' : subDistrictName !== '' && ', '}
              {capitalize(districtName)}
              {capitalize(districtName) === undefined
                ? ''
                : capitalize(districtName) !== '' && ', '}
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
