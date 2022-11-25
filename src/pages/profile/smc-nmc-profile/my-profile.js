/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useState } from 'react';

import { Box } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, Typography } from '@mui/material';

import { collegeProfileData, nmcProfileDetails, smcProfileDetails } from '../../../constants/utils';
import { Button } from '../../../ui/core';
import NmcEditProfile from '../smc-nmc-editprofiles/nmc-editprofiles';
import SmcEditProfile from '../smc-nmc-editprofiles/smc-editprofile';
const MyProfile = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [myProfileDetails, setmyProfileDetails] = useState([]);
  const [data, setData] = useState(
    props.userType === 'SMC' ? smcProfileDetails : nmcProfileDetails
  );
  const [showSmcEditProfile, setShowSmcEditProfile] = useState(false);
  // function NavigateBack() {
  //   return setShowEdit(false);
  // }

  const sentDetails = () => {
    // data.map((field, i) => {
    //   return myProfileDetails.push(field.value);
    // });
    // if (myProfileDetails.length > 0) {
    setShowSmcEditProfile(true);
    setShowEdit(true);
    // }
    console.log(myProfileDetails);
  };
  console.log(props.userType, data, '==smc, nmc profile');
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
            {data.map((field, key) => {
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
            <SmcEditProfile myProfileDetails={myProfileDetails} sentDetails={sentDetails} />
          ) : (
            <NmcEditProfile />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyProfile;
