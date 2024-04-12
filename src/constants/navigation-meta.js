const NAV_META = [
  {
    path: 'contact',
    title: 'Contact Us',
    component: 'contact',
  },
  {
    path: 'support',
    title: 'Support',
    component: 'support',
  },
  {
    path: 'profile',
    title: 'Profile',
    component: 'profile',
    isPrivate: true,
  },
  {
    path: '*',
    title: 'PageNotFound',
    component: 'page-not-found/index.js',
  },

  {
    path: 'about',
    title: 'About',
    component: 'about/index.js',
    isPrivate: 'PUBLIC',
  },

  {
    path: 'login',
    title: 'Login',
    component: 'login',
  },
  {
    path: 'register/aadhaar',
    title: 'register/aadhaar',
    component: 'register/sub-pages/register-aadhaar/register-aadhaar',
  },
  {
    path: 'register/college-registration',
    title: 'collegeRegistration',
    component: 'register/college-registration/college-registration',
    isPrivate: true,
  },
  {
    path: 'register/doctor-registration',
    title: 'DoctorRegistration',
    component: 'register/doctor-registration/doctor-registration',
  },
  {
    path: 'register/doctor-registration-verification',
    title: 'Doctor-Registration',
    component: 'register/doctor-registration/form-verification',
  },
  {
    path: 'login-page',
    title: 'Login',
    component: 'login-page',
  },
  {
    path: 'user-profile',
    title: 'user-profile',
    component: 'user-profile',
  },
  {
    path: 'pages/track-status',
    title: 'track-status',
    component: 'pages/track-status/TrackStatus',
  },
  {
    path: 'search-doctor',
    title: 'search-doctor',
    component: 'search-doctor',
    isPrivate: 'PUBLIC',
  },
  {
    path: 'screen-reader',
    title: 'ScreenReader',
    component: 'screen-reader',
  },
  {
    path: 'reset-password', ////:request_id',
    title: 'Reset Password',
    component: 'reset-password',
  },
  {
    path: 'verifier/reset-password/:request_id', ////:request_id',
    title: 'Reset Password',
    component: 'reset-password',
    isPrivate: 'PUBLIC',
  },
  {
    path: 'user/verify-email/:id', ////:request_id',
    title: 'User Verify Email',
    component: 'user-verify-email',
  },
];

export const navbar_routes = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About DCI',
    link: '/about',
  },
  {
    label: 'User Manual',
    link: 'https://ndr.abdm.gov.in/api/v1/abdm/nmr/userManual',
  },

  {
    label: 'Search Doctor',
    link: '/search-doctor',
    tree: null,
    search: true,
  },
];

export const LOGGED_IN = true;

export const getNavMeta = (isLoggedIn) =>
  NAV_META.filter((nav) => (nav.isPrivate && isLoggedIn) || !nav.isPrivate);
