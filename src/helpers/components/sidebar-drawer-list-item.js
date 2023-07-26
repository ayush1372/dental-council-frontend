import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BadgeIcon from '@mui/icons-material/Badge';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PasswordIcon from '@mui/icons-material/Password';
import { useSelector } from 'react-redux';

import ActivateLicence from '../../pages/profile/activate-licence-tab/activate-licence-tab';
import ChangePassword from '../../pages/profile/change-password/change-password';
import CollegeDean from '../../pages/profile/college-dean/college-dean';
import CollegeMyProfile from '../../pages/profile/college-my-profile/college-my-profile';
import CollegeRegistrar from '../../pages/profile/college-registrar/college-registrar';
import CollegeVerifier from '../../pages/profile/college-verifier/college-verifier';
// import CollegeApproval from '../../pages/profile/components/college-approval-cards/college-approval-cards';
import Dashboard from '../../pages/profile/components/dashboard-cards/dashboard-cards';
// import NewDoctorRegistration from '../../pages/profile/new-doctor-registration/new-doctor-registration';
import MyProfile from '../../pages/profile/smc-nmc-profile/my-profile';
import VoluntarySuspendLicense from '../../pages/profile/sub-pages/voluntary-suspend-license/voluntary-suspend-license';
import TrackApplication from '../../pages/profile/track-application/track-application';
// import CollegeRegistration from '../../pages/register/college-registration/college-registration';
import NMCCollegeRegistration from '../../pages/register/college-registration/nmc-college-registration';
import UserProfile from '../../pages/user-profile';
import AdditionalQualifications from '../../pages/user-profile/components/additional-qualifications/additional-qualifications';
import WorkProfile from '../../pages/user-profile/components/work-profile';
import TrackStatus from '../../shared/track-status';
import { getDoctorTrackApplicationData } from '../../store/actions/doctor-user-profile-actions';

function SideDrawerListItem() {
  const { userActiveTab } = useSelector((state) => state.common);

  return userActiveTab;
}

export const doctorTabs = [
  {
    option: 0,
    name: 'My Profile',
    tabName: 'my-profile',
    icon: <AccountCircleIcon />,
    element: <UserProfile tabName={SideDrawerListItem} />,
  },
  {
    option: 1,
    name: 'Track Application',
    tabName: 'track-application',
    icon: <CreditCardOffIcon />,
    element: <TrackApplication getTableData={getDoctorTrackApplicationData} />,
  },
  {
    option: 2,
    name: 'Voluntary Suspend Licence',
    tabName: 'voluntary-suspend-license',
    icon: <CreditCardOffIcon />,
    element: <VoluntarySuspendLicense tabName={SideDrawerListItem} />,
  },
  {
    option: 4,
    name: 'Additional Qualifications',
    tabName: 'additional-qualifications',
    icon: <AccountCircleIcon />,
    element: <AdditionalQualifications />,
  },
  {
    option: 5,
    name: 'Work Details',
    tabName: 'work-details',
    icon: <AccountCircleIcon />,
    element: <WorkProfile />,
  },
  // {
  //   option: 3,
  //   name: 'Change Password',
  //   tabName: 'change-password',
  //   icon: <PasswordIcon />,
  //   element: <ChangePassword tabName={SideDrawerListItem} />,
  // },
];

export const smcTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: <DashboardIcon />,
    element: <Dashboard tabName={SideDrawerListItem} />,
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
    element: <TrackStatus tabName={SideDrawerListItem} />,
  },
  // {
  //   option: 3,
  //   name: 'New Doctor Registration',
  //   tabName: 'New-doctor-registration',
  //   icon: <AppRegistrationIcon />,
  //   element: <NewDoctorRegistration userType={'SMC'} />,
  // },
  {
    option: 3,
    name: 'Activate Licence',
    tabName: 'Activate Licence',
    icon: <AppRegistrationIcon />,
    element: <ActivateLicence />,
  },
  // {
  //   option: 5,
  //   name: 'College Approval',
  //   tabName: 'college-approval',
  //   icon: <AppRegistrationIcon />,
  //   element: <CollegeApproval />,
  // },
  {
    option: 4,
    name: 'Change Password',
    tabName: 'change-password',
    icon: <PasswordIcon />,
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];

export const nmcTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: <DashboardIcon />,
    element: <Dashboard tabName={SideDrawerListItem} />,
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
    element: <TrackStatus tabName={SideDrawerListItem} />,
  },
  {
    option: 3,
    name: 'Activate Licence',
    tabName: 'Activate Licence',
    icon: <AppRegistrationIcon />,
    element: <ActivateLicence />,
  },
  // {
  //   option: 4,
  //   name: 'College Approval',
  //   tabName: 'college-approval',
  //   icon: <AppRegistrationIcon />,
  //   element: <CollegeApproval />,
  // },
  {
    option: 4,
    name: 'College Registration',
    tabName: 'college-registration',
    icon: <AppRegistrationIcon />,
    element: <NMCCollegeRegistration />,
  },
  {
    option: 5,
    name: 'Change Password',
    tabName: 'change-password',
    icon: <PasswordIcon />,
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];

export const colgTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: <DashboardIcon />,
    element: <Dashboard tabName={SideDrawerListItem} />,
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
    element: <TrackStatus tabName={SideDrawerListItem} />,
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

  {
    option: 5,
    name: 'Change Password',
    tabName: 'change-password',
    icon: <PasswordIcon />,
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];

export const nbeTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: <DashboardIcon />,
    element: <Dashboard tabName={SideDrawerListItem} />,
  },
  {
    option: 1,
    name: 'My Profile',
    tabName: 'my-profile',
    icon: <AccountCircleIcon />,
    element: <MyProfile userType={'NBE'} />,
  },
  {
    option: 2,
    name: 'Track Status',
    tabName: 'track-status',
    icon: <BadgeIcon />,
    element: <TrackStatus tabName={SideDrawerListItem} />,
  },
  {
    option: 3,
    name: 'Change Password',
    tabName: 'change-password',
    icon: <PasswordIcon />,
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];

export const colgDeanRegTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: <DashboardIcon />,
    element: <Dashboard tabName={SideDrawerListItem} />,
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
    name: 'Create Verifier',
    tabName: 'Create Verifier',
    icon: <AppRegistrationIcon />,
    element: <CollegeVerifier />,
  },
  {
    option: 3,
    name: 'Change Password',
    tabName: 'change-password',
    icon: <PasswordIcon />,
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];
