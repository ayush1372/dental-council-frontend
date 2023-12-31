import { changeAppFontSize } from '../helpers/functions/common-functions';

export const TableCell = (palettes, appFontType) => ({
  styleOverrides: {
    root: {
      fontSize: changeAppFontSize(16, appFontType),
      color: palettes.textPrimary.main,
      '&.MuiTableCell-head': {
        padding: '16px 9px',
      },
    },
  },
});
