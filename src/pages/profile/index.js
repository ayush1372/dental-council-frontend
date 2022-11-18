import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import TrackStatus from '../../shared/track-status/index';
import { changeUserActiveTab } from '../../store/reducers/ui-reducers';
import Dashboard from '../dashboard';
import UserProfile from '../user-profile';
import ProfileImage from './profileImage';
import { VerticalTab } from './vertical-tab';

import styles from './profile.module.scss';

const dataTabs = [
  {
    title: 'Dashboard',
    tabName: 'dashboard',
  },
  // {
  //   title: 'My Profile',
  //   tabName: 'my-profile',
  // },
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
    title: 'TrackStatus',
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
const doctorTabs = [
  {
    title: 'My Profile',
    tabName: 'my-profile',
  },
];

export function Profile() {
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  const [isActiveTab, setIsActiveTab] = useState(
    loggedInUserType === 'Doctor' ? { ...doctorTabs[0] } : { ...dataTabs[0] }
  );
  const setActiveTab = (activeTab) => {
    setIsActiveTab(activeTab);
    dispatch(changeUserActiveTab(activeTab.tabName));
  };
  useEffect(() => {
    if (loggedInUserType === 'Doctor') {
      dispatch(changeUserActiveTab(doctorTabs[0].tabName));
    } else {
      dispatch(changeUserActiveTab(dataTabs[0].tabName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-console
  console.log('loggedInUserType', loggedInUserType);
  return (
    <section className={styles.profilePage}>
      <Grid container className={styles.profilePageContainer} justifyContent={'space-between'}>
        <Grid item className={styles.profileContainer}>
          <Grid item xs={12} className={styles.profileImgBackground}>
            <Grid item xs={12}>
              <ProfileImage
                name={
                  loggedInUserType === 'Doctor'
                    ? 'Dr. ABC'
                    : loggedInUserType === 'College'
                    ? 'All India Institute of Medical Sciences'
                    : loggedInUserType === 'NMC'
                    ? 'National Medical Commission'
                    : 'Maharashtra Medical Council'
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {loggedInUserType === 'Doctor' ? (
              <VerticalTab dataTabs={doctorTabs} activeTab={isActiveTab} changeTab={setActiveTab} />
            ) : loggedInUserType === 'NMC' ? (
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
        <Grid item className={styles.tabDetailsContainer}>
          {isActiveTab.tabName === 'dashboard' ? (
            <Dashboard tabName={isActiveTab.tabName} />
          ) : isActiveTab.tabName === 'track-status' ? (
            <TrackStatus tabName={isActiveTab.tabName} />
          ) : isActiveTab.tabName === 'my-profile' && loggedInUserType === 'College' ? (
            <UserProfile tabName={isActiveTab.tabName} />
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
