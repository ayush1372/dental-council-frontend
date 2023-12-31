import { changeAppFontSize } from '../helpers/functions/common-functions';

export const Button = (palette, appFontType, mode) => ({
  variants: [
    {
      props: { variant: 'iconButtonLink' },
      style: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: changeAppFontSize(16, appFontType),
        lineHeight: '24px',
        '&:hover': {
          backgroundColor: palette.transparent.main,
        },
      },
    },
  ],
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
      '&.MuiButtonBase-root': {
        borderColor: mode === 'dark' && palette.contrastLink.main,
        '&:hover': {
          backgroundColor: mode === 'dark' && palette.contrastLink.main,
          borderColor: mode === 'dark' && palette.contrastLink.main,
        },
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
      padding: '7px 16px',
    },
    sizeMedium: {
      borderRadius: '5px',
      fontSize: changeAppFontSize(16, appFontType),
      lineHeight: '24px',
      padding: '11px 24px',
    },
    sizeLarge: {
      borderRadius: '8px',
      fontSize: changeAppFontSize(18, appFontType),
      lineHeight: '28px',
      padding: '14px 32px',
      '@media (max-width: 600px)': {
        fontSize: changeAppFontSize(16, appFontType),
        padding: '10px 24px',
      },
    },
    outlined: {
      borderWidth: '2px',
    },
    outlinedSizeSmall: {
      padding: '5px 16px',
    },
    outlinedSizeMedium: {
      padding: '9px 24px',
    },
    outlinedSizeLarge: {
      padding: '12px 32px',
    },
    outlinedPrimary: {
      color: palette.primary.main,
      backgroundColor: mode === 'dark' && palette.contrastLink.main,

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
      color: mode === 'dark' ? palette.black.main : palette.secondary.main,
      backgroundColor: mode === 'dark' && palette.contrastLink.main,

      '&.Mui-disabled': {
        color: palette.secondary.main,
        borderColor: mode === 'dark' ? palette.contrastLink.main : palette.secondary.main,
        opacity: '0.4',
        borderWidth: '2px',
      },
      '&:hover': {
        backgroundColor: palette.secondary.main,
        color: mode === 'dark' ? palette.black.main : palette.white.main,
        borderWidth: '2px',
      },
    },
    outlinedGrey: {
      color: palette.black.main,
      backgroundColor: mode === 'dark' && palette.contrastLink.main,

      '&.Mui-disabled': {
        color: palette.black.main,
        borderColor: palette.grey.light,
        opacity: '0.4',
        borderWidth: '2px',
      },
      '&:hover': {
        borderWidth: '2px',
        borderColor: mode === 'dark' ? palette.contrastLink.main : palette.grey.light,
        backgroundColor: palette.grey.light,
        color: palette.black.main,
      },
    },
    containedPrimary: {
      color: mode === 'dark' ? palette.black.main : palette.white.main,
      backgroundColor: mode === 'dark' ? palette.contrastLink.main : palette.primary.main,

      '&.Mui-disabled': {
        color: mode === 'dark' ? palette.black.main : palette.white.main,
        opacity: '0.4',
        backgroundColor: mode === 'dark' ? palette.contrastLink.main : palette.primary.main,
      },
    },
    containedSecondary: {
      color: mode === 'dark' ? palette.black.main : palette.white.main,
      backgroundColor: mode === 'dark' ? palette.contrastLink.main : palette.secondary.main,

      '&.Mui-disabled': {
        color: mode === 'dark' ? palette.black.main : palette.white.main,
        opacity: '0.4',
        backgroundColor: mode === 'dark' ? palette.contrastLink.main : palette.secondary.main,
      },
      '&:hover': {
        backgroundColor: palette.secondary.dark,
      },
      '&:focus': {
        backgroundColor: palette.secondary.dark,
      },
    },
    containedGrey: {
      color: palette.black.main,
      backgroundColor: mode === 'dark' ? palette.contrastLink.main : palette.grey.main,
      '&.Mui-disabled': {
        opacity: '0.4',
        color: mode === 'dark' ? palette.black.main : palette.black.main,
        backgroundColor: mode === 'dark' ? palette.contrastLink.main : palette.grey.light,
      },
      '&:hover': {
        backgroundColor: palette.grey.dark,
      },
      '&:focus': {
        backgroundColor: palette.grey.dark,
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
