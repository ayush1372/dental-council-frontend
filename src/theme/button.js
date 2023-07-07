import { changeAppFontSize } from '../helpers/functions/common-functions';

export const Button = (palette, appFontType) => ({
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      textTransform: 'none',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
      },
      fieldset: {
        border: 'none',
      },
    },
    endIcon: {
      margin: '0',
    },
    startIcon: {
      margin: '0',
    },
    sizeSmall: {
      borderRadius: '3px',
      fontSize: changeAppFontSize(14, appFontType),
      lineHeight: '22px',
      padding: '8px 16px',
    },
    sizeMedium: {
      borderRadius: '5px',
      fontSize: changeAppFontSize(18, appFontType),
      lineHeight: '28px',
      padding: '12px 24px',
    },
    sizeLarge: {
      borderRadius: '8px',
      fontSize: changeAppFontSize(18, appFontType),
      lineHeight: '28px',
      padding: '16px 32px',
      '@media (max-width: 600px)': {
        fontSize: changeAppFontSize(16, appFontType),
        padding: '12px 24px',
      },
    },
    outlined: {
      borderWidth: '2px',
    },
    outlinedPrimary: {
      color: palette.primary.main,
      '&.Mui-disabled': {
        borderWidth: '2px',
        color: palette.primary.main,
        borderColor: palette.primary.main,
        opacity: '0.4',
      },
      '&:hover': {
        borderWidth: '2px',
        backgroundColor: palette.primary.main,
        color: palette.white.main,
      },
    },
    outlinedSecondary: {
      color: palette.secondary.main,

      '&.Mui-disabled': {
        color: palette.secondary.main,
        borderColor: palette.secondary.main,
        opacity: '0.4',
        borderWidth: '2px',
      },
      '&:hover': {
        backgroundColor: palette.secondary.main,
        color: palette.white.main,
        borderWidth: '2px',
      },
    },
    outlinedGrey: {
      color: palette.black.main,
      '&.Mui-disabled': {
        color: palette.black.main,
        borderColor: palette.grey.light,
        opacity: '0.4',
        borderWidth: '2px',
      },
      '&:hover': {
        borderWidth: '2px',
        borderColor: palette.grey.light,
        backgroundColor: palette.grey.light,
        color: palette.black.main,
      },
    },
    containedPrimary: {
      color: palette.white.main,
      '&.Mui-disabled': {
        color: palette.white.main,
        opacity: '0.4',
        backgroundColor: palette.primary.main,
      },
    },
    containedSecondary: {
      color: 'white',
      backgroundColor: palette.secondary.main,

      '&.Mui-disabled': {
        color: palette.white.main,
        opacity: '0.4',
        backgroundColor: palette.secondary.main,
      },
    },
    containedGrey: {
      color: palette.black.main,
      '&.Mui-disabled': {
        opacity: '0.4',
        color: palette.black.main,
        backgroundColor: palette.grey.light,
      },
    },
    textPrimary: {
      color: palette.primary.main,
      backgroundColor: 'transparent',
      '&:focus': {
        backgroundColor: palette.grey.dark,
      },
    },
  },
});
