import { Palette } from './palette';

export const TextField = {
  variants: [
    {
      props: { size: 'large' },
      style: {
        fontSize: '18px',
        lineHeight: '28px',
      },
    },
    {
      props: { success: 'success' },
      style: {
        color: Palette.success.main,
      },
    },
    {
      props: { messageBlue: 'messageBlue' },
      style: {
        color: Palette.messageBlue.main,
      },
    },
  ],
  defaultProps: {
    autoFocus: false,
  },
  styleOverrides: {
    root: {
      fontSize: '16px',
      lineHeight: '24px',
      color: Palette.inputTextColor.main,
      borderColor: Palette.inputBorderColor.main,
      borderRadius: '5px',
      outline: 'none',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${Palette.inputHoverColor.main}`,
      },
      '&:focus .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${Palette.inputFocusColor.main}`,
      },
      '&:focus-visible .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${Palette.inputFocusColor.main}`,
      },
      '&:focus-within .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${Palette.inputFocusColor.main}`,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${Palette.error.main}`,
      },
      '&.Mui-error .MuiOutlinedInput-input': {
        color: Palette.error.main,
      },
      '&.Mui-disabled': {
        opacity: '0.4',
        pointerEvents: 'none',
      },
      '&.MuiInputBase-adornedEnd': {
        paddingRight: '0',
      },
    },

    colorSuccess: {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${Palette.success.main}`,
      },
      '.MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${Palette.success.main}`,
        color: Palette.success.main,
      },
      '.MuiOutlinedInput-input': {
        color: Palette.success.main,
      },
    },
    inputSizeSmall: {
      fontSize: '14px',
      lineHeight: '22px',
      padding: '9px 16px',
    },
    success: {
      color: Palette.success.main,
    },
  },
};
