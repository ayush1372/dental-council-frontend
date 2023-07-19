import { Grid, Typography } from '@mui/material';
import moment from 'moment';

import { convertGender } from '../../../../utilities/common-validations';

const PersonalDetails = ({ personalDetails }) => {
  const { personal_details } = personalDetails || {};
  const {
    full_name,
    aadhaar_token,
    date_of_birth,
    father_name,
    gender,
    mother_name,
    country_nationality,
    spouse_name,
  } = personal_details || {};

  const nationality = country_nationality?.name || '';

  return (
    <Grid container spacing={1} mt={1}>
      <Grid container item spacing={1}>
        {false && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Aadhaar Number
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid display="flex" alignItems="center">
              <Typography p={1} variant="subtitle2" color="inputTextColor.light">
                xxxx-xxxx-{aadhaar_token ? aadhaar_token : 'XXXX'}
              </Typography>
            </Grid>
          </Grid>
        )}

        {false && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Salutation
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container item spacing={1}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Full Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              Dr. {full_name ? full_name : ''}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Father Name
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {father_name === '' || father_name === undefined ? '-' : father_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Mother Name
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {mother_name === '' || mother_name === undefined ? '-' : mother_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Spouse Name
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {spouse_name === '' || spouse_name === undefined ? '-' : spouse_name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={1}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Gender
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {gender && convertGender(gender)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Date of Birth
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {date_of_birth ? moment(date_of_birth).format('DD-MM-YYYY') : ''}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Nationality
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {nationality}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={1}></Grid>
    </Grid>
  );
};

export default PersonalDetails;
