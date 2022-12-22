import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Typography } from '@mui/material';

import { verboseLog } from '../../../config/debug';
import { nmcProfileDetails, smcProfileDetails } from '../../../constants/common-data';
import { Button } from '../../../ui/core';
import ChangePassword from '../change-password/change-password';
import NmcEditProfile from '../smc-nmc-editprofiles/nmc-editprofiles';
import SmcEditProfile from '../smc-nmc-editprofiles/smc-editprofile';

const MyProfile = (props) => {
  const [showPage, setShowpage] = useState('Profile');

  const [data, setData] = useState(
    props.userType === 'SMC' ? smcProfileDetails : nmcProfileDetails
  );
  const [showSmcEditProfile, setShowSmcEditProfile] = useState(false);

  const sentDetails = () => {
    setShowSmcEditProfile(true);
    setShowpage('Edit');
  };
  verboseLog(props.userType, data, '==smc, nmc profile');
  verboseLog(showSmcEditProfile);
  verboseLog(setData);
  return (
    <Box p={3}>
      {showPage === 'Profile' && (
        <Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2" color="textPrimary.main">
                My Profile
              </Typography>
            </Grid>

            <Grid item xs={6} md={3} sm={3}>
              <Button size="small" variant="contained" onClick={() => setShowpage('Password')}>
                Change Password
              </Button>
            </Grid>
            <Grid item xs={6} md={3} sm={3}>
              <Button
                size="small"
                startIcon={<EditIcon sx={{ mr: 1 }} />}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setShowpage('Edit');
                  sentDetails();
                }}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>

          <Grid container item spacing={2} mt={3}>
            {data.map((field) => {
              return (
                <Grid item xs={12} md={6} sm={6} key={field.id}>
                  <Typography variant="body3" color="grey.label">
                    {field.label}
                  </Typography>
                  <Grid>
                    <Typography variant="body3" color="primary.main">
                      {field.value}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
      {showPage === 'Edit' && (
        <Box>
          {props.userType === 'SMC' ? (
            <SmcEditProfile sentDetails={sentDetails} />
          ) : (
            <NmcEditProfile />
          )}
        </Box>
      )}
      {showPage === 'Password' && <ChangePassword />}
    </Box>
  );
};

export default MyProfile;
