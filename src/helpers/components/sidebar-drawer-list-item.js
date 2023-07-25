import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BadgeIcon from '@mui/icons-material/Badge';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PasswordIcon from '@mui/icons-material/Password';
import { IconButton, Tooltip } from '@mui/material';
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
    icon: (
      <IconButton>
        <Tooltip title="My Profile" arrow placement="bottom-start">
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <UserProfile tabName={SideDrawerListItem} />,
  },
  {
    option: 1,
    name: 'Track Application',
    tabName: 'track-application',
    icon: (
      <IconButton>
        <Tooltip title="Track Application" arrow placement="bottom-start">
          <CreditCardOffIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <TrackApplication getTableData={getDoctorTrackApplicationData} />,
  },
  {
    option: 2,
    name: 'Voluntary Suspend Licence',
    tabName: 'voluntary-suspend-license',
    icon: (
      <IconButton>
        <Tooltip title="Voluntary Suspend Licence" arrow placement="bottom-start">
          <CreditCardOffIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <VoluntarySuspendLicense tabName={SideDrawerListItem} />,
  },
  {
    option: 4,
    name: 'Additional Qualifications',
    tabName: 'additional-qualifications',
    icon: (
      <IconButton>
        <Tooltip title="Additional Qualifications" arrow placement="bottom-start">
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <AdditionalQualifications />,
  },
  {
    option: 5,
    name: 'Work Details',
    tabName: 'work-details',
    icon: (
      <IconButton>
        <Tooltip title="Work Details" arrow placement="bottom-start">
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    ),
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
    icon: (
      <Tooltip title="Dashboard" arrow placement="bottom-start">
        <IconButton>
          <DashboardIcon />
        </IconButton>
      </Tooltip>
    ),
    element: <Dashboard tabName={SideDrawerListItem} />,
  },
  {
    option: 1,
    name: 'My Profile',
    tabName: 'my-profile',
    icon: (
      <IconButton>
        <Tooltip title="My Profile" arrow placement="bottom-start">
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <MyProfile userType={'SMC'} />,
  },
  {
    option: 2,
    name: 'Track Status',
    tabName: 'track-status',
    icon: (
      <IconButton>
        <Tooltip title="Track Status" arrow placement="bottom-start">
          <BadgeIcon />
        </Tooltip>
      </IconButton>
    ),
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
    icon: (
      <IconButton>
        <Tooltip title="Activate Licence" arrow placement="bottom-start">
          <AppRegistrationIcon />
        </Tooltip>
      </IconButton>
    ),
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
    icon: (
      <IconButton>
        <Tooltip title="Change Password" arrow placement="bottom-start">
          <PasswordIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];

export const nmcTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: (
      <IconButton>
        <Tooltip title="Dashboard" arrow placement="bottom-start">
          <DashboardIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <Dashboard tabName={SideDrawerListItem} />,
  },
  {
    option: 1,
    name: 'My Profile',
    tabName: 'my-profile',
    icon: (
      <IconButton>
        <Tooltip title="My Profile" arrow placement="bottom-start">
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <MyProfile userType={'NMC'} />,
  },
  {
    option: 2,
    name: 'Track Status',
    tabName: 'track-status',
    icon: (
      <IconButton>
        <Tooltip title="Track Status" arrow placement="bottom-start">
          <BadgeIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <TrackStatus tabName={SideDrawerListItem} />,
  },
  {
    option: 3,
    name: 'Activate Licence',
    tabName: 'Activate Licence',
    icon: (
      <IconButton>
        <Tooltip title="Activate Licence" arrow placement="bottom-start">
          <AppRegistrationIcon />
        </Tooltip>
      </IconButton>
    ),
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
    icon: (
      <IconButton>
        <Tooltip title="College Registration" arrow placement="bottom-start">
          <AppRegistrationIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <NMCCollegeRegistration />,
  },
  {
    option: 5,
    name: 'Change Password',
    tabName: 'change-password',
    icon: (
      <IconButton>
        <Tooltip title="Change Password" arrow placement="bottom-start">
          <PasswordIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];

export const colgTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: (
      <IconButton>
        <Tooltip title="Dashboard" arrow placement="bottom-start">
          <DashboardIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <Dashboard tabName={SideDrawerListItem} />,
  },
  {
    option: 1,
    name: 'My Profile',
    tabName: 'my-profile',
    icon: (
      <IconButton title="My Profile" arrow placement="bottom-start">
        <Tooltip>
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <CollegeMyProfile />,
  },
  {
    option: 2,
    name: 'Track Status',
    tabName: 'track-status',
    icon: (
      <IconButton>
        <Tooltip title="Track Status" arrow placement="bottom-start">
          <BadgeIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <TrackStatus tabName={SideDrawerListItem} />,
  },
  {
    option: 3,
    name: 'College Registrar',
    tabName: 'college-registrar',
    icon: (
      <IconButton>
        <Tooltip title="College Registrar" arrow placement="bottom-start">
          <AppRegistrationIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <CollegeRegistrar />,
  },
  {
    option: 4,
    name: 'College Dean',
    tabName: 'college-dean',
    icon: (
      <IconButton>
        <Tooltip title="College Dean" arrow placement="bottom-start">
          <AppRegistrationIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <CollegeDean />,
  },

  {
    option: 5,
    name: 'Change Password',
    tabName: 'change-password',
    icon: (
      <IconButton>
        <Tooltip title="Change Password" arrow placement="bottom-start">
          <PasswordIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];

export const nbeTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: (
      <IconButton>
        <Tooltip title="Dashboard" arrow placement="bottom-start">
          <DashboardIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <Dashboard tabName={SideDrawerListItem} />,
  },
  {
    option: 1,
    name: 'My Profile',
    tabName: 'my-profile',
    icon: (
      <IconButton>
        <Tooltip title="My Profile" arrow placement="bottom-start">
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <MyProfile userType={'NBE'} />,
  },
  {
    option: 2,
    name: 'Track Status',
    tabName: 'track-status',
    icon: (
      <IconButton>
        <Tooltip title="Track Status" arrow placement="bottom-start">
          <BadgeIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <TrackStatus tabName={SideDrawerListItem} />,
  },
  {
    option: 3,
    name: 'Change Password',
    tabName: 'change-password',
    icon: (
      <IconButton>
        <Tooltip title="Change Password" arrow placement="bottom-start">
          <PasswordIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];

export const colgDeanRegTabs = [
  {
    option: 0,
    name: 'Dashboard',
    tabName: 'dashboard',
    icon: (
      <IconButton>
        <Tooltip title="Dashboard" arrow placement="bottom-start">
          <DashboardIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <Dashboard tabName={SideDrawerListItem} />,
  },
  {
    option: 1,
    name: 'My Profile',
    tabName: 'my-profile',
    icon: (
      <IconButton>
        <Tooltip title="My Profile" arrow placement="bottom-start">
          <AccountCircleIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <CollegeMyProfile />,
  },
  {
    option: 2,
    name: 'Create Verifier',
    tabName: 'Create Verifier',
    icon: (
      <IconButton>
        <Tooltip title="Create Verifier" arrow placement="bottom-start">
          <AppRegistrationIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <CollegeVerifier />,
  },
  {
    option: 3,
    name: 'Change Password',
    tabName: 'change-password',
    icon: (
      <IconButton>
        <Tooltip title="Change Password" arrow placement="bottom-start">
          <PasswordIcon />
        </Tooltip>
      </IconButton>
    ),
    element: <ChangePassword tabName={SideDrawerListItem} />,
  },
];
