/* eslint-disable simple-import-sort/imports */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import loginActivity from './reducers/common-reducers';
import contactReducer from './reducers/contact-reducer';
import appFontSizeActivity from './reducers/app-font-size';
import RegisterDrivingLicenceReducer from './reducers/register-driving-licence-reducers';
import captchaReducer from './reducers/captcha-reducers';

const store = configureStore({
  reducer: {
    login: loginActivity,
    getUserList: contactReducer,
    appFontSize: appFontSizeActivity,
    getRegisterDrivingLicence: RegisterDrivingLicenceReducer,
    getCaptchaData: captchaReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true,
});

export default store;
