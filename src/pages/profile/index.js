import { useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BadgeIcon from '@mui/icons-material/Badge';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Grid } from '@mui/material';
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
import MiniDrawer from './components/profile-sidebar/profile-sidebar';
import MyProfile from './smc-nmc-profile/my-profile';

export function Profile() {
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  const { userActiveTab } = useSelector((state) => state.ui);

  const doctorTabs = [
    {
      option: 0,
      name: 'My Profile',
      tabName: 'my-profile',
      icon: <AccountCircleIcon />,
      element: <UserProfile tabName={userActiveTab} />,
    },
    {
      option: 1,
      name: 'Suspend License',
      tabName: 'suspend-license',
      icon: <CreditCardOffIcon />,
      element: <SuspendLicenseVoluntaryRetirement tabName={userActiveTab} />,
    },
    {
      option: 2,
      name: 'Voluntary Retirement',
      tabName: 'voluntary-retirement',
      icon: <CreditCardOffIcon />,
      element: <SuspendLicenseVoluntaryRetirement tabName={userActiveTab} />,
    },
  ];

  const smcTabs = [
    {
      option: 0,
      name: 'Dashboard',
      tabName: 'dashboard',
      icon: <DashboardIcon />,
      element: <Dashboard tabName={userActiveTab} />,
    },
    {
      option: 1,
      name: 'My Profile',
      tabName: 'my-profile',
      icon: <AccountCircleIcon />,
      element: <MyProfile userType={'SMC'} />,
    },
    {
      option: 2,
      name: 'Track Status',
      tabName: 'track-status',
      icon: <BadgeIcon />,
      element: <TrackStatus tabName={userActiveTab} />,
    },
    {
      option: 3,
      name: 'New Doctor Registration',
      tabName: 'New-doctor-registration',
      icon: <AppRegistrationIcon />,
      element: <NewDoctorRegistration userType={'SMC'} />,
    },
  ];

  const nmcTabs = [
    {
      option: 0,
      name: 'Dashboard',
      tabName: 'dashboard',
      icon: <DashboardIcon />,
      element: <Dashboard tabName={userActiveTab} />,
    },
    {
      option: 1,
      name: 'My Profile',
      tabName: 'my-profile',
      icon: <AccountCircleIcon />,
      element: <MyProfile userType={'NMC'} />,
    },
    {
      option: 2,
      name: 'Track Status',
      tabName: 'track-status',
      icon: <BadgeIcon />,
      element: <TrackStatus tabName={userActiveTab} />,
    },
  ];

  const colgTabs = [
    {
      option: 0,
      name: 'Dashboard',
      tabName: 'dashboard',
      icon: <DashboardIcon />,
      element: <Dashboard tabName={userActiveTab} />,
    },
    {
      option: 1,
      name: 'My Profile',
      tabName: 'my-profile',
      icon: <AccountCircleIcon />,
      element: <CollegeMyProfile />,
    },
    {
      option: 2,
      name: 'Track Status',
      tabName: 'track-status',
      icon: <BadgeIcon />,
      element: <TrackStatus tabName={userActiveTab} />,
    },
    {
      option: 3,
      name: 'College Registrar',
      tabName: 'college-registrar',
      icon: <AppRegistrationIcon />,
      element: <CollegeRegistrar />,
    },
    {
      option: 4,
      name: 'College Dean',
      tabName: 'college-dean',
      icon: <AppRegistrationIcon />,
      element: <CollegeDean />,
    },
  ];

  const [isActiveTab, setIsActiveTab] = useState(
    loggedInUserType === 'Doctor'
      ? doctorTabs[0].tabName
      : loggedInUserType === 'College' || loggedInUserType === 'SMC' || loggedInUserType === 'NMC'
      ? colgTabs[0].tabName
      : ''
  );

  const setActiveTab = (activeTab) => {
    setIsActiveTab(activeTab);
    dispatch(changeUserActiveTab(activeTab));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <MiniDrawer
          DrawerOptions={
            loggedInUserType === 'Doctor'
              ? doctorTabs
              : loggedInUserType === 'NMC'
              ? nmcTabs
              : loggedInUserType === 'SMC'
              ? smcTabs
              : loggedInUserType === 'College'
              ? colgTabs
              : ''
          }
          handleSwitch={setActiveTab}
          ActiveOption={isActiveTab}
        />
      </Grid>
    </Grid>
  );
}

export default Profile;
