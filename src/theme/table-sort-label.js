export const TableSortLabel = (palette) => ({
  styleOverrides: {
    root: {
      '&:hover': {
        color: palette.white.main,
      },
      '&.Mui-active': {
        color: palette.white.main,
        '&.MuiButtonBase-root': {
          '.MuiTableSortLabel-icon': {
            color: palette.white.main,
          },
        },
      },
    },
  },
});
