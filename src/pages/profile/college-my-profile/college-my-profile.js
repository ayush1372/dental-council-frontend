import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, Grid, Typography } from '@mui/material';

import { collegeProfileData } from '../../../constants/utils';
import { Button } from '../../../ui/core';
import CollegeEditProfile from './college-edit-profile';
const CollegeMyProfile = () => {
  const [showEdit, setShowEdit] = useState(false);

  function NavigateBack() {
    return setShowEdit(false);
  }
  return (
    <Container>
      {!showEdit ? (
        <div>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h1" color="textPrimary.main">
              My Profile
            </Typography>
            <Button
              sx={{ width: '165px', padding: '10px', height: '48px' }}
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
          <Grid container spacing={0} mt={2}>
            <Grid container item spacing={2} paddingBottom="42px">
              <Grid item xs={4} md={2}>
                <Typography variant="body3" color="grey.label">
                  College Name
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  Aarnav Sharma
                </Typography>
              </Grid>

              <Grid item xs={8} md={4}>
                <Typography variant="body3" color="grey.label">
                  College ID
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {collegeProfileData.collegeId}
                </Typography>
              </Grid>
              <Grid item xs={4} md={2}>
                <Typography variant="body3" color="grey.label">
                  College Phone number
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {collegeProfileData.collegePhnNumber}
                </Typography>
              </Grid>

              <Grid item xs={8} md={4}>
                <Typography variant="body3" color="grey.label">
                  College Email ID
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {collegeProfileData.collegeEmailId}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={4} md={2}>
                <Typography variant="body3" color="grey.label">
                  Department Name
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {collegeProfileData.DepartmentName}
                </Typography>
              </Grid>

              <Grid item xs={8} md={4}>
                <Typography variant="body3" color="grey.label">
                  State Name
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {collegeProfileData.StateName}
                </Typography>
              </Grid>
              <Grid item xs={4} md={2}>
                <Typography variant="body3" color="grey.label">
                  College Website
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {collegeProfileData.collegeWebsite}
                </Typography>
              </Grid>

              <Grid item xs={8} md={4}>
                <Typography variant="body3" color="grey.label">
                  College Address
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {collegeProfileData.collegeAddress}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={4} md={2}>
                <Typography variant="body3" color="grey.label">
                  College Pincode
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {collegeProfileData.collegePinCode}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <CollegeEditProfile NavigateBack={NavigateBack} />
      )}
    </Container>
  );
};

export default CollegeMyProfile;
