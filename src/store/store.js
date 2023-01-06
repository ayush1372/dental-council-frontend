/* eslint-disable simple-import-sort/imports */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import commonActivity from './reducers/common-reducers';
import appFontSizeActivity from './reducers/app-font-size';
import captchaReducer from './reducers/captcha-reducers';
import loginReducer from './reducers/login-reducer';

const store = configureStore({
  reducer: {
    common: commonActivity,
    appFontSize: appFontSizeActivity,
    getCaptchaData: captchaReducer,
    loginReducer: loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true,
});

export default store;
