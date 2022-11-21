import { Palette } from './palette';

export const TableRow = {
  styleOverrides: {
    root: {
      '&:nth-child(even)': {
        backgroundColor: Palette.grey.main,
      },
    },
  },
};
