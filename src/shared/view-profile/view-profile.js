// import { useState } from 'react';

import { Box, Grid, Typography, useTheme } from '@mui/material';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import { useSelector } from 'react-redux';

import IconVerified from '../../assets/images/ico-verified.svg';
// import { enableUserNotification } from '../../store/actions/common-actions';

export function ViewProfile(props) {
  // const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);

  const registration_number = useSelector(
    (state) =>
      state?.doctorUserProfileReducer?.registrationDetails?.registration_detail_to
        ?.registration_number
  );

  const { nmr_id } = useSelector((state) => state?.doctorUserProfileReducer?.personalDetails);

  const emailId = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.communication_address?.email
  );
  const mobileNumber = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.communication_address?.mobile
  );

  // const [emailNotification, setEmailNotification] = useState();
  // const [mobileNotification, setMobileNotification] = useState();

  // const handleNotification = (eventData, mode) => {
  //   if (mode === 'email') {
  //     setEmailNotification(eventData?.target?.checked);
  //   }
  //   if (mode === 'sms') {
  //     setMobileNotification(eventData?.target?.checked);
  //   }
  //   let updatedNotificationData = {
  //     notification_toggles: [
  //       {
  //         mode: mode,
  //         is_enabled: eventData.target.checked,
  //       },
  //     ],
  //   };
  //   dispatch(enableUserNotification(updatedNotificationData));
  // };

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
        {/* <Box align="right" display={'flex'} flexDirection={{ xs: 'column', md: 'row' }}>
          <FormControlLabel
            sx={{
              width: {
                xs: 'fit-content',
                md: '250px',
              },
            }}
            value="email"
            control={
              <Switch
                color="primary"
                checked={emailNotification}
                onChange={(e) => {
                  handleNotification(e, 'email');
                }}
              />
            }
            label="Email Notifications"
            labelPlacement="start"
          />
          <FormControlLabel
            sx={{
              width: {
                xs: 'fit-content',
                md: '250px',
              },
              marginLeft: 0,
              marginRight: -3,
            }}
            value="sms"
            control={
              <Switch
                color="primary"
                checked={mobileNotification}
                onChange={(e) => {
                  handleNotification(e, 'sms');
                }}
              />
            }
            label="Mobile Notifications"
            labelPlacement="start"
          />
        </Box> */}
      </Box>

      <Box bgcolor="white.main" py={3} mb={2} boxShadow="1">
        <Grid container>
          <Grid
            borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
            item
            xs={12}
            sm={6}
            md={3}
            lg="auto"
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
            lg="auto"
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

          {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          px={2}
          mb={{ xs: 1, lg: 0 }}
         >
            <Typography variant="body3" color="grey.label">
              Work Detail Verification Status
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              Submitted
            </Typography>
          </Grid> */}
          {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg={1}
          pl={2}
          mb={{ xs: 1, lg: 0 }}
        >
            <Typography variant="body3" color="grey.label">
              Gender
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              {personGender ? personGender : ''}
            </Typography>
          </Grid> */}
          {/* <Grid
          borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
          item
          xs={12}
          sm={6}
          md={3}
          lg="auto"
          px={2}
          mb={{ xs: 1, lg: 0 }}
        >
            <Typography variant="body3" color="grey.label">
              Aadhaar
            </Typography>
            <Typography variant="subtitle2" color="textPrimary.main">
              Verified
              <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
            </Typography>
          </Grid> */}
          <Grid
            borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
            item
            xs={12}
            sm={6}
            md={3}
            lg="auto"
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
          <Grid item xs={12} sm={6} md="auto" lg="auto" pl={2}>
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
                  <img width="13px" height="13px" src={IconVerified} alt="verified icon" />
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
