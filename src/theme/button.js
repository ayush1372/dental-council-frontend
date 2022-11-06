import { Palette } from './palette';

export const Button = {
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
      fontSize: '14px',
      lineHeight: '22px',
      padding: '8px 16px',
    },
    sizeMedium: {
      borderRadius: '5px',
      fontSize: '18px',
      lineHeight: '28px',
      padding: '12px 24px',
    },
    sizeLarge: {
      borderRadius: '8px',
      fontSize: '18px',
      lineHeight: '28px',
      padding: '16px 32px',
      '@media (max-width: 600px)': {
        fontSize: '16px',
        padding: '12px 24px',
      },
    },
    outlined: {
      borderWidth: '2px',
    },
    outlinedPrimary: {
      color: Palette.primary.main,
      '&.Mui-disabled': {
        borderWidth: '2px',
        color: Palette.primary.main,
        borderColor: Palette.primary.main,
        opacity: '0.4',
      },
      '&:hover': {
        borderWidth: '2px',
        backgroundColor: Palette.primary.main,
        color: Palette.white.main,
      },
    },
    outlinedSecondary: {
      color: Palette.secondary.main,

      '&.Mui-disabled': {
        color: Palette.secondary.main,
        borderColor: Palette.secondary.main,
        opacity: '0.4',
        borderWidth: '2px',
      },
      '&:hover': {
        backgroundColor: Palette.secondary.main,
        color: Palette.white.main,
        borderWidth: '2px',
      },
    },
    outlinedGrey: {
      color: Palette.black.main,
      '&.Mui-disabled': {
        color: Palette.black.main,
        borderColor: Palette.grey.light,
        opacity: '0.4',
        borderWidth: '2px',
      },
      '&:hover': {
        borderWidth: '2px',
        borderColor: Palette.grey.light,
        backgroundColor: Palette.grey.light,
        color: Palette.black.main,
      },
    },
    containedPrimary: {
      color: Palette.white.main,
      '&.Mui-disabled': {
        color: Palette.white.main,
        opacity: '0.4',
        backgroundColor: Palette.primary.main,
      },
    },
    containedSecondary: {
      color: 'white',
      backgroundColor: Palette.secondary.main,

      '&.Mui-disabled': {
        color: Palette.white.main,
        opacity: '0.4',
        backgroundColor: Palette.secondary.main,
      },
    },
    containedGrey: {
      color: Palette.black.main,
      '&.Mui-disabled': {
        opacity: '0.4',
        color: Palette.black.main,
        backgroundColor: Palette.grey.light,
      },
    },
    textPrimary: {
      color: Palette.primary.main,
      backgroundColor: 'transparent',
      '&:focus': {
        backgroundColor: Palette.grey.dark,
      },
    },
  },
};
