import { palette } from './palette';

export const CardHeader = {
  styleOverrides: {
    root: {
      padding: '0',
    },
    title: {
      color: palette.primary.main,
      fontSize: '18px',
      fontWeight: 'bold',
      lineHeight: '28px',
    },
    subheader: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    content: {
      color: palette.textPrimary.main,
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
};
