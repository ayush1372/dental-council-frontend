import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appFontSizeActivity from './reducers/app-font-size';
import captchaReducer from './reducers/captcha-reducers';
import collegeReducer from './reducers/college-reducer';
import commonActivity from './reducers/common-reducers';
import doctorUserProfileReducer from './reducers/doctor-user-profile-reducer';
import loginReducer from './reducers/login-reducer';
import navMenu from './reducers/nav-menu-reducer';
import nbeReducers from './reducers/nbe-reducers';
import nmcReducer from './reducers/nmc-reducer';
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
    college: collegeReducer,
    smc: smcReducer,
    nmc: nmcReducer,
    nbe: nbeReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true,
});

export default store;
