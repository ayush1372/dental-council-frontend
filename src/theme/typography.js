import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

import { palette } from './palette';

export const Typography = {
  fontSize: '16px',
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
      fontSize: '36px',
      lineHeight: '44px',
      fontWeight: '700',
    },
    h2: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: '700',
    },
    h3: {
      fontSize: '18px',
      lineHeight: '28px',
      fontWeight: '700',
    },
    subtitle1: {
      fontSize: '18px',
      lineHeight: '28px',
      fontWeight: '500',
    },
    subtitle2: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '600',
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '500',
    },
    body2: {
      fontSize: '12px',
      lineHeight: '22px',
      fontWeight: '600',
    },
    body3: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: '500',
    },
    body4: {
      fontSize: '12px',
      lineHeight: '22px',
      fontWeight: '500',
    },
    body5: {
      fontSize: '14px',
      lineHeight: '17px',
      fontWeight: '400',
    },
  },
};
