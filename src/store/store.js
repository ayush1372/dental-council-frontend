/* eslint-disable simple-import-sort/imports */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import commonActivity from './reducers/common-reducers';
import appFontSizeActivity from './reducers/app-font-size';
import captchaReducer from './reducers/captcha-reducers';
import menuListsReducer from './reducers/menu-lists-reducer';
import doctorUserProfileReducer from './reducers/doctor-user-profile-reducer';

const store = configureStore({
  reducer: {
    common: commonActivity,
    appFontSize: appFontSizeActivity,
    getCaptchaData: captchaReducer,
    menuLists: menuListsReducer,
    doctorUserProfileList: doctorUserProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true,
});

export default store;
