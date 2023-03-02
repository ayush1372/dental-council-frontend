import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';

import { enableUserNotification } from '../../store/actions/common-actions';

export function ViewProfile(props) {
  const dispatch = useDispatch();
  const [emailNotification, setEmailNotification] = useState();
  const [mobileNotification, setMobileNotification] = useState();

  const handleNotification = (eventData, mode) => {
    if (mode === 'email') {
      setEmailNotification(eventData?.target?.checked);
    }
    if (mode === 'sms') {
      setMobileNotification(eventData?.target?.checked);
    }
    let updatedNotificationData = {
      notification_toggles: [
        {
          mode: mode,
          is_enabled: eventData.target.checked,
        },
      ],
    };
    dispatch(enableUserNotification(updatedNotificationData));
  };

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
        <Box align="right" display={'flex'} flexDirection={{ xs: 'column', md: 'row' }}>
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
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: '1',
        }}
        bgcolor="white.main"
      >
        <Grid container spacing={2} mt={2} p={3}>
          <Grid container item spacing={6}>
            <Grid item xs={8} md={4}>
              <Typography variant="body1" color="inputTextColor.main">
                NMR ID
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                71-1567-8728-1025
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body1" color="inputTextColor.main">
                Council verification status
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                Submitted
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body1" color="inputTextColor.main">
                Work Detail Verification Status
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                Submitted
              </Typography>
            </Grid>
          </Grid>

          {/* First row */}

          <Grid container item spacing={6}>
            <Grid item xs={8} md={4}>
              <Typography variant="body1" color="inputTextColor.main">
                Email
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                madhura638@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body1" color="inputTextColor.main">
                Mobile Number
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                9967453678
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ViewProfile;
