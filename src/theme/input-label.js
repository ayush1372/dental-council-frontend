import { spacing } from '@mui/system';

export const InputLabel = {
  defaultProps: {
    shrink: true,
  },

  sizeLarge: {},
  styleOverrides: {
    // Name of the slot
    root: {
      top: spacing(2),
    },
  },
};
