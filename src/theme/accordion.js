export const Accordion = {
  styleOverrides: {
    root: {
      '&.MuiPaper-root': {
        boxShadow: '0 0 0 1px #EDEDF6',
        '&:first-child': {
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        },
        '&:last-child': {
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
        },
        '&.Mui-expanded': {
          marginBottom: '4px',
          borderBottomLeftRadius: '3px',
          borderBottomRightRadius: '3px',
          margin: '0 0 4px',
        },
      },
    },
  },
};
