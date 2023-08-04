import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { collegeProfileData } from '../../../store/actions/college-actions';
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

  let userType = loginData?.data?.user_sub_type;
  // eslint-disable-next-line no-console
  console.log('userType', userType);
  // eslint-disable-next-line no-console
  console.log('showPage', showPage);

  if (userType === 1) {
    userType = 'College Admin';
  }
  if (userType === 2) {
    userType = 'College Registrar';
  }
  if (userType === (3 || 4 || 5)) {
    userType = 'College Dean';
  }

  useEffect(() => {
    const getCommonData = () => {
      let userType = loginData?.data?.user_sub_type;

      if (userType === 1) {
        userType = 'College Admin';
      } else if (userType === 2) {
        userType = 'College Registrar';
      } else if (userType === (3 || 4 || 5)) {
        userType = 'College Dean';
      }

      if (userType === 'College Dean') {
        dispatch(collegeProfileData(loginData?.data?.college_id, loginData?.data?.profile_id));
      } else if (userType === 'College Registrar') {
        dispatch(collegeProfileData(loginData?.data?.college_id, loginData?.data?.profile_id));
      } else if (userType === 'College Admin') {
        dispatch(getCollegeData(loginData?.data?.college_id));
      }
    };
    getCommonData();
  }, [dispatch, loginData?.data?.profile_id, loginData?.data?.user_group_id]);

  return (
    <Grid boxShadow={2} p={3}>
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
            {loginData?.data?.user_sub_type === 1 || userData?.name ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  College Name
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.name || userData?.name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {(loginData?.data?.user_sub_type === 1 || userData?.college_id) &&
            userType !== 'College Registrar' ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  College Code
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.college_code || userData?.college_id}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {userType === 'College Registrar' && (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Designation
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {'College Registrar'}
                </Typography>
              </Grid>
            )}

            {loginData?.data?.user_sub_type === 1 || userData?.mobile_number ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Mobile Number
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.mobile_number || userData?.mobile_number}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Council
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.state_medical_council_to?.name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  University
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.university_to?.name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Website
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.website ? getCollegeDetail?.data?.website : '-'}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Address line 1
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data.address_line1}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Address line 2
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data.address_line2
                    ? getCollegeDetail?.data.address_line2
                    : '-'}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  State
                </Typography>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.state_to?.name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  District
                </Typography>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.district_to?.name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  City/Town/Village
                </Typography>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.villages_to?.name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Pincode
                </Typography>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data.pin_code}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            <Grid item xs={12} md={4} sm={6}>
              <Typography variant="body3" color="grey.label">
                Email
              </Typography>
              <Typography variant="subtitle2" color="inputTextColor.main">
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
                  College Pincode
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
      {showPage === 'Edit' && userType === 'College Admin' && (
        <CollegeEditProfile setShowpage={setShowpage} />
      )}
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
