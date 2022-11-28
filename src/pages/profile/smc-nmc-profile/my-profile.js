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
    <Box p={3}>
      {!showEdit ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h2" color="textPrimary.main">
                My Profile
              </Typography>
            </Grid>
            <Grid item xs={4} textAlign="right">
              <Button
                sx={{ width: 'auto' }}
                startIcon={<EditIcon sx={{ mr: 1 }} />}
                variant="contained"
                color="secondary"
                onClick={sentDetails}
              >
                Edit Profile
              </Button>
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
        </>
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
