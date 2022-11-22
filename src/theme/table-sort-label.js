import { Palette } from './palette';

export const TableSortLabel = {
  styleOverrides: {
    root: {
      '&:hover': {
        color: Palette.white.main,
      },
      '&.Mui-active': {
        color: Palette.white.main,
        '&.MuiButtonBase-root': {
          '.MuiTableSortLabel-icon': {
            color: Palette.white.main,
          },
        },
      },
    },
  },
};
