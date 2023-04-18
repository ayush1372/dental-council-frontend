import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { collegeProfileData } from '../../../store/actions/college-actions';
import {
  getCollegeData,
  getDistrictList,
  getUniversitiesList,
} from '../../../store/actions/common-actions';
import { Button } from '../../../ui/core';
import CollegeDean from '../college-dean/college-dean';
import CollegeRegistrar from '../college-registrar/college-registrar';
import CollegeEditProfile from './college-edit-profile';

const CollegeMyProfile = () => {
  const [showPage, setShowpage] = useState('Profile');
  const [districtList, setDistrictList] = useState([]);
  const dispatch = useDispatch();

  const { collegeData } = useSelector((state) => state.college);
  const { getCollegeDetail, statesList, universitiesList, councilNames } = useSelector(
    (state) => state.common
  );

  const userData = collegeData?.data;

  const { loginData } = useSelector((state) => state.loginReducer);

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

  const getStateData = (stateId) => {
    const userState = statesList?.find((obj) => obj?.id === stateId);
    return userState?.name;
  };

  const getUniversityData = (university_id) => {
    const userUniversity = universitiesList?.data?.find((obj) => obj.id === university_id);
    return userUniversity?.name;
  };

  const getCouncilNameData = (state_medical_council_id) => {
    const userCouncilName = councilNames?.find((obj) => obj.id === state_medical_council_id);
    return userCouncilName?.name;
  };

  const getDistrictNameData = (district_id) => {
    const userDistrictName = districtList?.find((obj) => obj.id === district_id);
    return userDistrictName?.name;
  };

  useEffect(() => {
    dispatch(getUniversitiesList());
    dispatch(getDistrictList(getCollegeDetail?.data?.state_id)).then((res) => {
      setDistrictList(res?.data);
    });
  }, []);

  useEffect(() => {
    const getCommonData = () => {
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
          collegeProfileData(loginData?.data?.parent_profile_id, loginData?.data?.profile_id)
        );
      } else if (userType === 'College Registrar') {
        dispatch(
          collegeProfileData(loginData?.data?.parent_profile_id, loginData?.data?.profile_id)
        );
      } else if (userType === 'College Admin') {
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
            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Name
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.name}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  College Code
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.college_code}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Mobile
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCollegeDetail?.data?.mobile_number}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Council Name
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getCouncilNameData(getCollegeDetail?.data?.state_medical_council_id)}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Select University Name
                </Typography>

                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getUniversityData(getCollegeDetail?.data?.university_id)}
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
                  {getCollegeDetail?.data.website}
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
                  {getCollegeDetail?.data.address_line2}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  State Name
                </Typography>
                <Typography variant="subtitle2" color="inputTextColor.main">
                  {getStateData(getCollegeDetail?.data.state_id)}
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
                  {getDistrictNameData(getCollegeDetail?.data.district_id)}
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
                  {getCollegeDetail?.data.state_id}
                </Typography>
              </Grid>
            ) : (
              ''
            )}

            {loginData?.data?.user_sub_type === 1 ? (
              <Grid item xs={12} md={4} sm={6}>
                <Typography variant="body3" color="grey.label">
                  Postal Code
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
                Email ID
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
                <Typography variant="subtitle2" color="primary.main"></Typography>
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
