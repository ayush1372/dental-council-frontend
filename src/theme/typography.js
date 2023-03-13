import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

import { changeAppFontSize } from '../helpers/functions/common-functions';

export const Typography = (palette, appFontType) => ({
  fontSize: changeAppFontSize(16, appFontType),
  color: palette.textPrimary.main,
  fontWeight: '400',

  defaultProps: {
    variantMapping: {
      body1: 'span',
      body2: 'span',
    },
  },
  body3: {
    fontWeight: '500',
  },
  styleOverrides: {
    root: {
      borderRadius: '5px',
      width: '100%',
    },

    h1: {
      fontSize: changeAppFontSize(36, appFontType),
      lineHeight: '44px',
      fontWeight: '700',
    },
    h2: {
      fontSize: changeAppFontSize(24, appFontType),
      lineHeight: '32px',
      fontWeight: '700',
    },
    h3: {
      fontSize: changeAppFontSize(18, appFontType),
      lineHeight: '28px',
      fontWeight: '700',
    },
    subtitle1: {
      fontSize: changeAppFontSize(18, appFontType),
      lineHeight: '28px',
      fontWeight: '500',
    },
    subtitle2: {
      fontSize: changeAppFontSize(16, appFontType),
      lineHeight: '24px',
      fontWeight: '600',
    },
    body1: {
      fontSize: changeAppFontSize(16, appFontType),
      lineHeight: '24px',
      fontWeight: '500',
    },
    body2: {
      fontSize: changeAppFontSize(12, appFontType),
      lineHeight: '22px',
      fontWeight: '600',
    },
    body3: {
      fontSize: changeAppFontSize(14, appFontType),
      lineHeight: '22px',
      fontWeight: '500',
    },
    body4: {
      fontSize: changeAppFontSize(12, appFontType),
      lineHeight: '22px',
      fontWeight: '500',
    },
    body5: {
      fontSize: changeAppFontSize(14, appFontType),
      lineHeight: '17px',
      fontWeight: '400',
    },
    body6: {
      fontSize: changeAppFontSize(30, appFontType),
      lineHeight: '26px',
      fontWeight: '500',
    },
    body7: {
      fontSize: changeAppFontSize(16, appFontType),
      lineHeight: '21px',
      fontWeight: '400',
    },
    body8: {
      fontSize: changeAppFontSize(12, appFontType),
      lineHeight: '20px',
      fontWeight: '400',
    },
  },
});
