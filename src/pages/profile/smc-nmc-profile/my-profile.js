import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import {
  getNBEProfileDetails,
  getNMCProfileDetails,
  getSMCProfileDetails,
} from '../../../constants/common-data';
import CircularLoader from '../../../shared/circular-loader/circular-loader';
import { Button } from '../../../ui/core';
import NbeEditProfile from '../smc-nmc-editprofiles/nbe-editprofiles';
import NmcEditProfile from '../smc-nmc-editprofiles/nmc-editprofiles';
import SmcEditProfile from '../smc-nmc-editprofiles/smc-editprofile';

const MyProfile = (props) => {
  const [showPage, setShowpage] = useState('Profile');
  const { nmcProfileData } = useSelector((state) => state.nmc);
  const { smcProfileData } = useSelector((state) => state.smc);
  const { nbeData } = useSelector((state) => state.nbe);
  const data =
    props.userType === 'SMC'
      ? getSMCProfileDetails(smcProfileData?.data)
      : props.userType === 'NBE'
      ? getNBEProfileDetails(nbeData?.data)
      : getNMCProfileDetails(nmcProfileData?.data);

  const sentDetails = (value) => {
    setShowpage(value);
  };

  return (
    <>
      {(props.userType === 'SMC' && smcProfileData?.isLoading) ||
      (props.userType === 'NMC' && nmcProfileData?.isLoading) ||
      (props.userType === 'NBE' && nbeData?.isLoading) ? (
        <Box alignItems={'center'}>
          <CircularLoader />
        </Box>
      ) : (
        <Grid boxShadow={2} mt={2} p={3}>
          {showPage === 'Profile' && (
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm="auto" sx={{ mr: { xs: 0, sm: 'auto' } }}>
                  <Typography variant="h2" color="textPrimary.main">
                    My Profile
                  </Typography>
                </Grid>

                <Grid item xs={12} sm="auto">
                  <Button
                    fullWidth
                    size="small"
                    startIcon={<EditIcon sx={{ mr: 1 }} />}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setShowpage('Edit');
                      sentDetails('Edit');
                    }}
                  >
                    Edit Profile
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={3}>
                {data.map((field) => {
                  return (
                    <Grid item xs={12} md={6} sm={6} lg={3} key={field.id}>
                      <Typography variant="body1" color="inputTextColor.main">
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
              ) : props.userType === 'NBE' ? (
                <NbeEditProfile sentDetails={sentDetails} updateShowPage={setShowpage} />
              ) : (
                <NmcEditProfile sentDetails={sentDetails} />
              )}
            </Box>
          )}
        </Grid>
      )}
    </>
  );
};

export default MyProfile;
