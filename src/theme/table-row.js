import { palette } from './palette';

export const TableRow = {
  styleOverrides: {
    root: {
      '&:nth-child(even)': {
        backgroundColor: palette.grey.main,
      },
    },
  },
};
