import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appFontSizeActivity from './reducers/app-font-size';
import captchaReducer from './reducers/captcha-reducers';
import collegeReducer from './reducers/college-reducer';
import collegeData from './reducers/college-reducer/registrar-reducer';
import commonActivity from './reducers/common-reducers';
import doctorUserProfileReducer from './reducers/doctor-user-profile-reducer';
import loginReducer from './reducers/login-reducer';
import AadhaarTransactionId from './reducers/user-aadhaar-verify-reducer';

const store = configureStore({
  reducer: {
    common: commonActivity,
    appFontSize: appFontSizeActivity,
    getCaptchaData: captchaReducer,
    AadhaarTransactionId: AadhaarTransactionId,
    loginReducer: loginReducer,
    doctorUserProfileReducer: doctorUserProfileReducer,
    collegeData: collegeData,
    college: collegeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true,
});

export default store;
