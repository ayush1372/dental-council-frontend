import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getCollegeRegistrarProfileData } from '../../../store/actions/college-actions';
import { Button } from '../../../ui/core';
import CollegeEditProfile from './college-edit-profile';

const CollegeMyProfile = () => {
  const [showPage, setShowpage] = useState('Profile');
  const { collegeData } = useSelector((state) => state.college);
  const userData = collegeData?.data;
  const dispatch = useDispatch();

  const getUserProfile = () => {
    dispatch(getCollegeRegistrarProfileData(1));
  };

  return (
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
                startIcon={<EditIcon sx={{ mr: 1 }} />}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setShowpage('Edit');
                  getUserProfile();
                }}
                size="small"
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={4} sm={6}>
              <Typography variant="body3" color="grey.label">
                College Name
              </Typography>

              <Typography variant="subtitle2" color="primary.main">
                {userData?.name ? userData?.name : ''}
              </Typography>
            </Grid>
            {userData?.college_code ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  College ID
                </Typography>

                <Typography variant="subtitle2" color="primary.main">
                  {userData?.college_code}
                </Typography>
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={12} md={4} sm={6}>
              <Typography variant="body3" color="grey.label">
                College Phone Number
              </Typography>

              <Typography variant="subtitle2" color="primary.main">
                {userData?.phone_number ? userData?.phone_number : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sm={6}>
              <Typography variant="body3" color="grey.label">
                College Email ID
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {userData?.email_id ? userData?.email_id : ''}
              </Typography>
            </Grid>
            {userData?.department_name ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Department Name
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {userData.department_name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}
            {userData?.state_name ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  State Name
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {userData.state_name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}
            {userData?.website ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  College Website
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {userData.website}
                </Typography>
              </Grid>
            ) : (
              ''
            )}
            {userData?.address ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  College Address
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {userData.address}
                </Typography>
              </Grid>
            ) : (
              ''
            )}
            {userData?.pin_code ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  College PIN Code
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {userData.pin_code}
                </Typography>
              </Grid>
            ) : (
              ''
            )}
            {userData?.university_name ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  College University Name
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {userData.university_name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}
            {userData?.council_name ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Council Name
                </Typography>
                <Typography variant="subtitle2" color="primary.main">
                  {userData.council_name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      )}
      {showPage === 'Edit' && <CollegeEditProfile />}
    </Grid>
  );
};

export default CollegeMyProfile;
