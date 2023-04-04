import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// import { userGroupType } from '../../../helpers/functions/common-functions';
import {
  collegeProfileData,
  // getCollegeAdminProfileData,
  // getCollegeDeanProfileData,
  // getCollegeRegistrarProfileData,
} from '../../../store/actions/college-actions';
import { getCollegeData } from '../../../store/actions/common-actions';
import { Button } from '../../../ui/core';
import CollegeDean from '../college-dean/college-dean';
import CollegeRegistrar from '../college-registrar/college-registrar';
import CollegeEditProfile from './college-edit-profile';

const CollegeMyProfile = () => {
  const [showPage, setShowpage] = useState('Profile');
  const dispatch = useDispatch();

  const { collegeData } = useSelector((state) => state.college);
  const { getCollegeDetail } = useSelector((state) => state.common);

  const userData = collegeData?.data;

  const { loginData } = useSelector((state) => state.loginReducer);

  // const userType = userGroupType(loginData?.data?.user_group_id);
  let userType = loginData?.data?.user_sub_type;
  if (userType === 1) {
    userType = 'College Admin';
  }
  if (userType === 2) {
    userType = 'College Registrar';
  }
  if (userType === 3) {
    userType = 'College Dean';
  }

  useEffect(() => {
    const getCommonData = () => {
      // const userType = userGroupType(loginData?.data?.user_group_id);
      let userType = loginData?.data?.user_sub_type;

      if (userType === 1) {
        userType = 'College Admin';
      } else if (userType === 2) {
        userType = 'College Registrar';
      } else if (userType === 3) {
        userType = 'College Dean';
      }

      if (userType === 'College Dean') {
        dispatch(
          // getCollegeDeanProfileData(loginData?.data?.parent_profile_id, loginData?.data?.profile_id)
          collegeProfileData(loginData?.data?.parent_profile_id, loginData?.data?.profile_id)
        );
      } else if (userType === 'College Registrar') {
        dispatch(
          collegeProfileData(loginData?.data?.parent_profile_id, loginData?.data?.profile_id)
        );
        // dispatch(
        //   getCollegeRegistrarProfileData(
        //     loginData?.data?.parent_profile_id,
        //     loginData?.data?.profile_id
        //   )
        // );
      } else if (userType === 'College Admin') {
        // dispatch(getCollegeAdminProfileData(loginData?.data?.profile_id));
        dispatch(getCollegeData(loginData?.data?.profile_id));
      }
    };
    getCommonData();
  }, [dispatch, loginData?.data?.profile_id, loginData?.data?.user_group_id]);

  return (
    <Grid boxShadow={2} mt={2} p={3}>
      {showPage === 'Profile' && (
        <Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm="auto" sx={{ mr: { xs: 0, sm: 'auto' } }}>
              <Typography variant="h2" color="textPrimary.main">
                My Profile
                {userType === 'College Admin'
                  ? '(Admin)'
                  : userType === 'College Registrar'
                  ? '(Registrar)'
                  : '(Dean)'}
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
                Name
              </Typography>

              <Typography variant="subtitle2" color="primary.main">
                {/* {getCollegeDetail?.data?.name ? getCollegeDetail?.data?.name : ''} */}
                {userData?.name
                  ? userData?.name
                  : loginData?.data?.user_sub_type === 1
                  ? getCollegeDetail?.data?.name
                  : ''}
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
                Phone Number
              </Typography>

              <Typography variant="subtitle2" color="primary.main">
                {/* {getCollegeDetail?.data?.mobile_number ? getCollegeDetail?.data?.mobile_number : ''} */}
                {userData?.mobile_number
                  ? userData?.mobile_number
                  : loginData?.data?.user_sub_type === 1
                  ? getCollegeDetail?.data?.mobile_number
                  : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sm={6}>
              <Typography variant="body3" color="grey.label">
                Email ID
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {/* {getCollegeDetail?.data?.email_id ? getCollegeDetail?.data?.email_id : ''} */}
                {userData?.email_id
                  ? userData?.email_id
                  : loginData?.data?.user_sub_type === 1
                  ? getCollegeDetail?.data?.email_id
                  : ''}
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
      {showPage === 'Edit' && userType === 'College Admin' && <CollegeEditProfile />}
      {showPage === 'Edit' && userType === 'College Dean' && (
        <CollegeDean showPage={'edit'} updateShowPage={setShowpage} />
      )}
      {showPage === 'Edit' && userType === 'College Registrar' && (
        <CollegeRegistrar showPage={'edit'} updateShowPage={setShowpage} />
      )}
    </Grid>
  );
};

export default CollegeMyProfile;
