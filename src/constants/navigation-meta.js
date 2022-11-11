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
    component: 'profile/profile.js',
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
    path: 'login-page',
    title: 'Login',
    component: 'login-page',
  },
];

export const LOGGED_IN = true;

export const getNavMeta = (isLoggedIn) =>
  NAV_META.filter((nav) => (nav.isPrivate && isLoggedIn) || !nav.isPrivate);
