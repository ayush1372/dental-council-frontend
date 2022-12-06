export const TableRow = (palette) => ({
  styleOverrides: {
    root: {
      '&:nth-child(even)': {
        backgroundColor: palette.grey.main,
      },
    },
  },
});
