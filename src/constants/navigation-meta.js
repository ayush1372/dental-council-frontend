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
    path: 'facility',
    title: 'facility',
    component: 'facility-login',
  },
  {
    path: 'facility-generate',
    title: 'facility',
    component: 'facility-login/sub-pages/facility-generate/facility-generate',
  },
  {
    path: 'login',
    title: 'Login',
    component: 'login',
  },
  {
    path: 'login/track',
    title: 'Login',
    component: 'login/sub-pages/login-track/login-track',
  },
  {
    path: 'login/abha-number',
    title: 'Login',
    component: 'login/sub-pages/login-abha-number/login-abha-number',
  },
  {
    path: 'login/recovery',
    title: 'Login',
    component: 'login/sub-pages/login-recovery/login-recovery',
  },
  {
    path: 'login/mobile',
    title: 'Login',
    component: 'login/sub-pages/login-mobile/login-mobile.js',
  },
  {
    path: 'login/abha-number',
    title: 'Login',
    component: 'login/sub-pages/abha-number/abha-number',
  },
  {
    path: 'register',
    title: 'Register',
    component: 'register',
  },
  {
    path: 'register/driving-licence',
    title: 'Register',
    component: 'register/sub-pages/register-driving-licence/register-driving-licence',
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
  // {
  //   path: 'reset-password', ////:request_id',
  //   title: 'Reset Password',
  //   component: 'reset-password',
  // },
  {
    path: 'verifier/reset-password/:request_id', ////:request_id',
    title: 'Reset Password',
    component: 'reset-password',
    isPrivate: 'PUBLIC',
  },
];

export const navbar_routes = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About NMC',
    link: null,
    tree: [
      {
        label: 'Financial',
        link: '/financial',
        branches: null,
      },
      {
        label: 'Agro',
        link: '/agro',
        branches: null,
      },
      {
        label: 'Pricing',
        link: '/pricing',
        branches: null,
      },
    ],
  },

  {
    label: 'Rules & Regulations',
    link: '/rules-regulations',
    tree: null,
  },
  {
    label: 'Information Desk',
    link: '/information-desk',
    tree: null,
  },
  {
    label: 'Media Room',
    link: '/media-room',
    tree: null,
  },
  {
    label: 'E-Gazette',
    link: '/e-gazette',
    tree: null,
  },
  {
    label: 'Photo Gallery',
    link: '/photo-gallery',
    tree: null,
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
