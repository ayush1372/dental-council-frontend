import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Typography } from '@mui/material';

import { collegeProfileData } from '../../../constants/common-data';
import { Button } from '../../../ui/core';
import ChangePassword from '../change-password/change-password';
// import ChangePassword from '../../change-password/change-password';
import CollegeEditProfile from './college-edit-profile';
const CollegeMyProfile = () => {
  const [showPage, setShowpage] = useState('Profile');

  return (
    <Box boxShadow={2} p="0px 91px 44px 41px" mt={2}>
      {showPage === 'Profile' && (
        <Grid>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Typography variant="h2" color="textPrimary.main">
                My Profile
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                onClick={() => setShowpage('ChangePassword')}
                size="small"
                sx={{
                  width: 'max-content',
                }}
              >
                Change Password
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                startIcon={<EditIcon sx={{ mr: 1 }} />}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setShowpage('Edit');
                }}
                size="small"
                sx={{
                  width: 'max-content',
                }}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>

          <Grid container item spacing={2} mt={3}>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                College Name
              </Typography>

              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.collegename.name}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                College ID{' '}
              </Typography>

              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.collegeId.name}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                College Phone Number
              </Typography>

              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.collegePhnNumber.name}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                College Email ID
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.collegeEmailId.name}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item spacing={2} mt={3}>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                Department Name
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.DepartmentName.name}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                State Name
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.StateName.name}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                College Website
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.collegeWebsite.name}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                College Address
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.collegeAddress.name}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item spacing={2} mt={3}>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                College PIN Code
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.collegePinCode.name}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography variant="body3" color="grey.label">
                College University Name
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {collegeProfileData.collegeUniversityName.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      {showPage === 'Edit' && <CollegeEditProfile />}
      {showPage === 'ChangePassword' && <ChangePassword />}
    </Box>
  );
};

export default CollegeMyProfile;
