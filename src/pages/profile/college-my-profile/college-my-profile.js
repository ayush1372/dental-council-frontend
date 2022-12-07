import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Typography } from '@mui/material';

import { collegeProfileData } from '../../../constants/common-data';
import { Button } from '../../../ui/core';
import CollegeEditProfile from './college-edit-profile';
const CollegeMyProfile = () => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Box boxShadow={2} p="0px 91px 44px 41px" pt={2}>
      {!showEdit ? (
        <Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h2" color="textPrimary.main">
                  My Profile
                </Typography>
                <Button
                  sx={{ width: '165px', p: '10px', height: '48px' }}
                  startIcon={<EditIcon />}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setShowEdit(true);
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
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
      ) : (
        <CollegeEditProfile />
      )}
    </Box>
  );
};

export default CollegeMyProfile;
