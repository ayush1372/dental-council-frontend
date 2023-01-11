import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appFontSizeActivity from './reducers/app-font-size';
import captchaReducer from './reducers/captcha-reducers';
import commonActivity from './reducers/common-reducers';
import menuListsReducer from './reducers/menu-lists-reducer';
import AadhaarTransactionId from './reducers/user-aadhaar-verify-reducer';

const store = configureStore({
  reducer: {
    common: commonActivity,
    appFontSize: appFontSizeActivity,
    getCaptchaData: captchaReducer,
    menuLists: menuListsReducer,
    AadhaarTransactionId: AadhaarTransactionId,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true,
});

export default store;
