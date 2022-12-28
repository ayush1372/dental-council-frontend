import { useEffect, useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BadgeIcon from '@mui/icons-material/Badge';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import TrackStatus from '../../shared/track-status/index';
import { changeUserActiveTab } from '../../store/reducers/common-reducers';
import NewDoctorRegistration from '../profile/new-doctor-registration/new-doctor-registration';
import UserProfile from '../user-profile';
import ActivateLicence from './activate-licence-tab/activate-licence-tab';
import CollegeDean from './college-dean/college-dean';
import CollegeMyProfile from './college-my-profile/college-my-profile';
import CollegeRegistrar from './college-registrar/college-registrar';
import CollegeApproval from './components/college-approval-cards/college-approval-cards';
import Dashboard from './components/dashboard-cards/dashboard-cards';
import MiniDrawer from './components/profile-sidebar/profile-sidebar';
import MyProfile from './smc-nmc-profile/my-profile';
import VoluntarySuspendLicense from './sub-pages/voluntary-suspend-license/voluntary-suspend-license';
import TrackApplication from './track-application/track-application';

export function Profile() {
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { userActiveTab } = useSelector((state) => state.common);

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
      name: 'Voluntary Suspend License',
      tabName: 'voluntary-suspend-license',
      icon: <CreditCardOffIcon />,
      element: <VoluntarySuspendLicense tabName={userActiveTab} />,
    },
    {
      option: 2,
      name: 'Track Application',
      tabName: 'track-application',
      icon: <CreditCardOffIcon />,
      element: <TrackApplication />,
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
    {
      option: 4,
      name: 'Activate Licence',
      tabName: 'Activate Licence',
      icon: <AppRegistrationIcon />,
      element: <ActivateLicence />,
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
    {
      option: 3,
      name: 'Activate Licence',
      tabName: 'Activate Licence',
      icon: <AppRegistrationIcon />,
      element: <ActivateLicence />,
    },
    {
      option: 4,
      name: 'College Approval',
      tabName: 'college-approval',
      icon: <AppRegistrationIcon />,
      element: <CollegeApproval />,
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

  useEffect(() => {
    dispatch(
      changeUserActiveTab(
        loggedInUserType === 'Doctor' ? doctorTabs[0].tabName : colgTabs[0].tabName
      )
    );
  }, []);

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
