import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import IconVerified from '../../assets/images/ico-verified.svg';

export function ViewProfile(props) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);

  const registration_number = useSelector(
    (state) =>
      state?.doctorUserProfileReducer?.registrationDetails?.registration_detail_to
        ?.registration_number
  );

  const { nmr_id } = useSelector((state) => state?.doctorUserProfileReducer?.personalDetails);

  const emailId = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.personal_details?.email
  );
  const emailIconVerified = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.email_verified
  );

  const mobileNumber = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.personal_details?.mobile
  );

  const theme = useTheme();

  return (
    <>
      <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }}>
        <Typography
          sx={{ marginBottom: '0px' }}
          id="2"
          variant="h2"
          mb={3}
          color={props.showViewProfile ? 'primary.main' : 'black.main'}
        >
          View Profile
        </Typography>
      </Box>

      <Box bgcolor="white.main" py={2} mb={2} boxShadow="1">
        <Grid container>
          <Grid
            borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
            item
            xs={12}
            sm={6}
            md={3}
            xl={2}
            px={2}
            mb={{ xs: 1, lg: 0 }}
          >
            <Typography variant="body3" color="grey.label">
              IMR/Registration Number
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {registration_number ? registration_number : ''}
            </Typography>
          </Grid>

          <Grid
            borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
            item
            xs={12}
            sm={6}
            md={3}
            xl={2}
            px={2}
            mb={{ xs: 1, lg: 0 }}
          >
            <Typography variant="body3" color="grey.label">
              NMR ID
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {nmr_id ? nmr_id : '-'}
            </Typography>{' '}
          </Grid>
          <Grid
            borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
            item
            xs={12}
            sm={6}
            md={3}
            xl={2}
            px={2}
          >
            <Typography variant="body3" color="grey.label">
              Mobile Number
            </Typography>

            {mobileNumber ? (
              <Typography variant="subtitle2" color="textPrimary.main">
                {mobileNumber}
                <img width="13px" height="13px" src={IconVerified} alt="verified icon" />

                {loggedInUserType === 'Doctor' ? (
                  <Typography component="span" variant="subtitle2" color="primary.main" ml={1}>
                    Change
                  </Typography>
                ) : (
                  ''
                )}
              </Typography>
            ) : (
              <Typography variant="subtitle2" color="textPrimary.main">
                -
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3} pl={2}>
            <Typography variant="body3" color="grey.label">
              Email
            </Typography>
            <Box display="flex" alignItems="center">
              {emailId ? (
                <Typography
                  variant="subtitle2"
                  color="textPrimary.main"
                  sx={{ wordBreak: 'break-word' }}
                >
                  {emailId}
                  {emailIconVerified === true && (
                    <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
                  )}
                </Typography>
              ) : (
                <Typography variant="subtitle2" color="textPrimary.main">
                  -
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ViewProfile;
