/* eslint-disable simple-import-sort/imports */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import loginActivity from './reducers/common-reducers';
import appFontSizeActivity from './reducers/app-font-size';
import captchaReducer from './reducers/captcha-reducers';
import uiReducer from './reducers/ui-reducers';
import userProfileReducer from './userProfileSlice/user-profile-slice';

const store = configureStore({
  reducer: {
    login: loginActivity,
    appFontSize: appFontSizeActivity,
    getCaptchaData: captchaReducer,
    ui: uiReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true,
});

export default store;
