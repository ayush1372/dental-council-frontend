import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appFontSizeActivity from './reducers/app-font-size';
import captchaReducer from './reducers/captcha-reducers';
import collegeReducer from './reducers/college-reducer';
import commonActivity from './reducers/common-reducers';
import dashboardReducer from './reducers/dashboard-reducers';
import doctorRegistration from './reducers/doctor-registration-reducer';
import searchDoctorReducer from './reducers/doctor-search-reducer';
import doctorUserProfileReducer from './reducers/doctor-user-profile-reducer';
import forgotPasswordReducer from './reducers/forgot-password-reducer';
import forgotUserName from './reducers/forgot-username-reducer';
import loginReducer from './reducers/login-reducer';
import navMenu from './reducers/nav-menu-reducer';
import nbeReducers from './reducers/nbe-reducers';
import nmcReducer from './reducers/nmc-reducer';
import raiseQueryReducer from './reducers/raise-query-reducer';
import smcReducer from './reducers/smc-reducer';
import AadhaarTransactionId from './reducers/user-aadhaar-verify-reducer';

const store = configureStore({
  reducer: {
    common: commonActivity,
    appFontSize: appFontSizeActivity,
    getCaptchaData: captchaReducer,
    navMenu: navMenu.reducer,
    AadhaarTransactionId: AadhaarTransactionId,
    loginReducer: loginReducer,
    doctorUserProfileReducer: doctorUserProfileReducer,
    doctorRegistration: doctorRegistration,
    college: collegeReducer,
    dashboard: dashboardReducer,
    smc: smcReducer,
    nmc: nmcReducer,
    nbe: nbeReducers,
    raiseQuery: raiseQueryReducer,
    forgotpassword: forgotPasswordReducer,
    forgotUserName: forgotUserName,
    searchDoctor: searchDoctorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true,
});

export default store;
