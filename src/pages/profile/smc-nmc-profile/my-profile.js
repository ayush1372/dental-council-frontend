import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Typography } from '@mui/material';

import { verboseLog } from '../../../config/debug';
import { nmcProfileDetails, smcProfileDetails } from '../../../constants/utils';
import { Button } from '../../../ui/core';
import NmcEditProfile from '../smc-nmc-editprofiles/nmc-editprofiles';
import SmcEditProfile from '../smc-nmc-editprofiles/smc-editprofile';

const MyProfile = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState(
    props.userType === 'SMC' ? smcProfileDetails : nmcProfileDetails
  );
  const [showSmcEditProfile, setShowSmcEditProfile] = useState(false);

  const sentDetails = () => {
    setShowSmcEditProfile(true);
    setShowEdit(true);
  };
  verboseLog(props.userType, data, '==smc, nmc profile');
  verboseLog(showSmcEditProfile);
  verboseLog(setData);
  return (
    <Box p={'0px 91px 44px 41px'}>
      {!showEdit ? (
        <Grid>
          <Grid container spacing={2} mt={2}>
            <Grid container item spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h2" color="textPrimary.main">
                    My Profile
                  </Typography>
                  <Button
                    sx={{ width: '165px', padding: '10px', height: '48px' }}
                    startIcon={<EditIcon />}
                    variant="contained"
                    color="secondary"
                    onClick={sentDetails}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item spacing={2} mt={3}>
            {data.map((field) => {
              return (
                <Grid item xs={4} md={3} key={field.id}>
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
      ) : (
        <Box>
          {props.userType === 'SMC' ? (
            <SmcEditProfile sentDetails={sentDetails} />
          ) : (
            <NmcEditProfile />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyProfile;
