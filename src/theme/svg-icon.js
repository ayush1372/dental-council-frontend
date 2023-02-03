import { changeAppFontSize } from '../helpers/functions/common-functions';

export const SvgIcon = (appFontType) => ({
  styleOverrides: {
    fontSizeWidth30: {
      fontSize: changeAppFontSize(30, appFontType),
    },
    fontSizeWidth80: {
      fontSize: changeAppFontSize(80, appFontType),
    },
    fontSizeWidth40: {
      fontSize: changeAppFontSize(40, appFontType),
    },
    fontSizeWidth48: {
      fontSize: changeAppFontSize(48, appFontType),
    },
    fontSizeWidth24: {
      fontSize: changeAppFontSize(24, appFontType),
    },

    fontSizeWidth12: {
      fontSize: changeAppFontSize(12, appFontType),
    },
  },
});
