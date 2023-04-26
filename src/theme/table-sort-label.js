export const TableSortLabel = (palette) => ({
  styleOverrides: {
    root: {
      '&:hover': {
        color: palette.white.main,
      },
      '.MuiSvgIcon-root.MuiSvgIcon-root': {
        opacity: 1,
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
