import { changeAppFontSize } from '../helpers/functions/common-functions';

export const CardHeader = (palette, appFontType) => ({
  styleOverrides: {
    root: {
      padding: '0',
    },
    title: {
      color: palette.primary.main,
      fontSize: changeAppFontSize(18, appFontType),
      fontWeight: 'bold',
      lineHeight: '28px',
    },
    subheader: {
      fontSize: changeAppFontSize(14, appFontType),
      lineHeight: '20px',
    },
    content: {
      color: palette.textPrimary.main,
      fontSize: changeAppFontSize(16, appFontType),
      lineHeight: '24px',
    },
  },
});
