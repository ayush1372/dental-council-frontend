import { Grid, Typography } from '@mui/material';

import { capitalize } from '../../../../helpers/functions/common-functions';

const CommunicationAddress = ({ personalDetails }) => {
  const { communication_address } = personalDetails || {};
  const { country, state, district, sub_district, pincode, village, is_same_address } =
    communication_address || {};

  const countryName =
    is_same_address === 'true'
      ? personalDetails?.kyc_address?.country?.name || ''
      : country?.name || '';
  const stateName =
    is_same_address === 'true'
      ? personalDetails?.kyc_address?.state?.name || ''
      : state?.name || '';
  const districtName =
    is_same_address === 'true'
      ? personalDetails?.kyc_address?.district?.name || ''
      : district?.name || '';
  const subDistrictName =
    is_same_address === 'true'
      ? personalDetails?.kyc_address?.sub_district?.name || ''
      : sub_district?.name || '';
  const villageName =
    is_same_address === 'true'
      ? personalDetails?.kyc_address?.village?.name || ''
      : village?.name || '';

  return (
    <Grid container spacing={1} mt={1}>
      <Grid container item spacing={1}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            House
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.house === '' || communication_address?.house === undefined
                ? '-'
                : communication_address?.house}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Street
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.street === '' || communication_address?.street === undefined
                ? '-'
                : communication_address?.street}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Landmark
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {communication_address?.landmark === '' ||
              communication_address?.landmark === undefined
                ? '-'
                : communication_address?.landmark}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            City/Town/Village
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {villageName === '' || villageName === undefined ? '-' : villageName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={1}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            District
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {capitalize(districtName)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Sub District
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {subDistrictName === '' || subDistrictName === undefined ? '-' : subDistrictName}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            State/Union Territory
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {capitalize(stateName)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Country
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {countryName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item spacing={1}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Pincode
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {pincode === '' || pincode === undefined ? '-' : pincode}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommunicationAddress;
