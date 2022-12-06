import { useState } from 'react';

import BadgeIcon from '@mui/icons-material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import TrackStatus from '../../shared/track-status/index';
import { changeUserActiveTab } from '../../store/reducers/ui-reducers';
import NewDoctorRegistration from '../profile/new-doctor-registration/new-doctor-registration';
import SuspendLicenseVoluntaryRetirement from '../suspend-license-voluntary-retirement';
import UserProfile from '../user-profile';
import CollegeDean from './college-dean/college-dean';
import CollegeMyProfile from './college-my-profile/college-my-profile';
import CollegeRegistrar from './college-registrar/college-registrar';
import Dashboard from './components/dashboard-cards/dashboard-cards';
// import ProfileImage from './components/profile-image/profile-image';
import MiniDrawer from './components/profile-sidebar/profile-sidebar';
import { VerticalTab } from './components/vertical-tab/vertical-tab';
import MyProfile from './smc-nmc-profile/my-profile';

import styles from './profile.module.scss';
const dataTabs = [
  {
    title: 'My Profile',
    tabName: 'my-profile',
  },
];
const nmcTabs = [
  {
    title: 'Dashboard',
    tabName: 'dashboard',
  },
  {
    title: 'My Profile',
    tabName: 'my-profile',
  },
  {
    title: 'Track Status',
    tabName: 'track-status',
  },
];
const colgTabs = [
  {
    title: 'Dashboard',
    tabName: 'dashboard',
  },
  {
    title: 'My Profile',
    tabName: 'my-profile',
  },
  {
    title: 'Track Status',
    tabName: 'track-status',
  },
  {
    title: 'College Registrar',
    tabName: 'college-registrar',
  },
  {
    title: 'College Dean',
    tabName: 'college-dean',
  },
];
const smcTabs = [
  {
    title: 'Dashboard',
    tabName: 'dashboard',
  },
  {
    title: 'My Profile',
    tabName: 'my-profile',
  },
  {
    title: 'Track Status',
    tabName: 'track-status',
  },
  {
    title: 'New Doctor Registration',
    tabName: 'New-doctor-registration',
  },
];
// const doctorTabs = [
//   {
//     title: 'My Profile',
//     tabName: 'my-profile',
//   },
//   {
//     title: 'Suspend License',
//     tabName: 'suspend-license',
//   },
//   {
//     title: 'Voluntary Retirement',
//     tabName: 'voluntary-retirement',
//   },
// ];

const doctorTabs = [
  {
    option: 0,
    name: 'My Profile',
    icon: <BadgeIcon />,
    element: <UserProfile />,
  },
  {
    option: 1,
    name: 'Suspend License',
    icon: <EditIcon />,
    element: <SuspendLicenseVoluntaryRetirement />,
  },
  {
    option: 2,
    name: 'Voluntary Retirement',
    icon: <KeyIcon />,
    element: <SuspendLicenseVoluntaryRetirement />,
  },
];
export function Profile() {
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  const [isActiveTab, setIsActiveTab] = useState(
    loggedInUserType === 'Doctor'
      ? { ...doctorTabs[0] }
      : loggedInUserType === 'College' || loggedInUserType === 'SMC' || loggedInUserType === 'NMC'
      ? { ...colgTabs[0] }
      : { ...dataTabs[0] }
  );
  const setActiveTab = (activeTab) => {
    setIsActiveTab(activeTab);
    dispatch(changeUserActiveTab(activeTab.tabName));
  };
  const theme = useTheme();

  return (
    <section className={styles.profilePage}>
      <Grid container className={styles.profilePageContainer} justifyContent={'space-between'}>
        <Grid item className={styles.profileContainer}>
          <Grid item xs={12}>
            {loggedInUserType === 'Doctor' ? (
              <Box sx={{ backgroundColor: theme.palette.grey.main }}>
                <MiniDrawer
                  DrawerOptions={doctorTabs}
                  handleSwitch={setActiveTab}
                  ActiveOption={isActiveTab}
                />
              </Box>
            ) : // <VerticalTab dataTabs={doctorTabs} activeTab={isActiveTab} changeTab={setActiveTab} />
            loggedInUserType === 'NMC' ? (
              <VerticalTab dataTabs={nmcTabs} activeTab={isActiveTab} changeTab={setActiveTab} />
            ) : loggedInUserType === 'SMC' ? (
              <VerticalTab dataTabs={smcTabs} activeTab={isActiveTab} changeTab={setActiveTab} />
            ) : loggedInUserType === 'College' ? (
              <VerticalTab dataTabs={colgTabs} activeTab={isActiveTab} changeTab={setActiveTab} />
            ) : (
              <VerticalTab dataTabs={dataTabs} activeTab={isActiveTab} changeTab={setActiveTab} />
            )}
          </Grid>
        </Grid>
        <Grid
          item
          className={styles.tabDetailsContainer}
          sx={{
            backgroundColor:
              (isActiveTab.tabName === 'my-profile' && loggedInUserType === 'Doctor') ||
              (isActiveTab.tabName === 'New-doctor-registration' && loggedInUserType === 'SMC')
                ? 'none'
                : 'white.main',
          }}
        >
          {isActiveTab.tabName === 'dashboard' ? (
            <Dashboard tabName={isActiveTab.tabName} />
          ) : isActiveTab.tabName === 'track-status' &&
            (loggedInUserType === 'College' ||
              loggedInUserType === 'NMC' ||
              loggedInUserType === 'SMC') ? (
            // eslint-disable-next-line react/jsx-indent
            <TrackStatus tabName={isActiveTab.tabName} />
          ) : isActiveTab.tabName === 'my-profile' && loggedInUserType === 'Doctor' ? (
            <UserProfile tabName={isActiveTab.tabName} />
          ) : isActiveTab.tabName === 'my-profile' && loggedInUserType === 'College' ? (
            <CollegeMyProfile />
          ) : isActiveTab.tabName === 'my-profile' && loggedInUserType === 'SMC' ? (
            <MyProfile userType={'SMC'} />
          ) : isActiveTab.tabName === 'my-profile' && loggedInUserType === 'NMC' ? (
            <MyProfile userType={'NMC'} />
          ) : isActiveTab.tabName === 'my-profile' &&
            loggedInUserType !== 'Doctor' &&
            loggedInUserType !== 'College' &&
            loggedInUserType !== 'SMC' &&
            loggedInUserType !== 'NMC' ? (
            ''
          ) : isActiveTab.tabName === 'college-registrar' ? (
            <CollegeRegistrar />
          ) : isActiveTab.tabName === 'college-dean' ? (
            <CollegeDean />
          ) : (isActiveTab.tabName === 'suspend-license' ||
              isActiveTab.tabName === 'voluntary-retirement') &&
            loggedInUserType === 'Doctor' ? (
            // eslint-disable-next-line react/jsx-indent
            <SuspendLicenseVoluntaryRetirement tabName={isActiveTab.tabName} />
          ) : isActiveTab.tabName === 'New-doctor-registration' && loggedInUserType === 'SMC' ? (
            <NewDoctorRegistration userType={'SMC'} />
          ) : (
            <Grid
              item
              xs={12}
              minHeight={500}
              display="flex"
              alignItems="center"
              justifyContent={'center'}
            >
              <Typography variant="h4" component={'p'}>
                {isActiveTab.title}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </section>
  );
}

export default Profile;
