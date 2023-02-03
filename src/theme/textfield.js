import { changeAppFontSize } from '../helpers/functions/common-functions';

export const TextField = (palette, appFontType) => ({
  variants: [
    {
      props: { size: 'large' },
      style: {
        fontSize: changeAppFontSize(18, appFontType),
        lineHeight: '28px',
      },
    },
    {
      props: { success: 'success' },
      style: {
        color: palette.success.main,
      },
    },
    {
      props: { messageBlue: 'messageBlue' },
      style: {
        color: palette.messageBlue.main,
      },
    },
  ],
  defaultProps: {
    autoFocus: false,
  },
  styleOverrides: {
    root: {
      fontSize: changeAppFontSize(16, appFontType),
      lineHeight: '24px',
      color: palette.inputTextColor.main,
      borderColor: palette.inputBorderColor.main,
      borderRadius: '5px',
      outline: 'none',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${palette.inputHoverColor.main}`,
      },
      '&:focus .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${palette.inputFocusColor.main}`,
      },
      '&:focus-visible .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${palette.inputFocusColor.main}`,
      },
      '&:focus-within .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${palette.inputFocusColor.main}`,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${palette.error.main}`,
      },
      '&.Mui-error .MuiOutlinedInput-input': {
        color: palette.error.main,
      },
      '&.Mui-disabled': {
        pointerEvents: 'none',
      },
      '&.MuiInputBase-adornedEnd': {
        paddingRight: '0',
      },
    },

    colorSuccess: {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${palette.success.main}`,
      },
      '.MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${palette.success.main}`,
        color: palette.success.main,
      },
      '.MuiOutlinedInput-input': {
        color: palette.success.main,
      },
    },
    inputSizeSmall: {
      fontSize: changeAppFontSize(14, appFontType),
      lineHeight: '22px',
      padding: '9px 16px',
    },
    success: {
      color: palette.success.main,
    },
  },
});
