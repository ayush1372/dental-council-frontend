import { Palette } from './palette';

export const AccordionSummary = {
  styleOverrides: {
    root: {
      minHeight: 'auto',
      padding: '6px 24px',
      cursor: 'pointer',
      '&.Mui-expanded': {
        backgroundColor: '#E9ECF3',
        minHeight: 'auto',
        '.MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          svg: {
            fill: Palette.inputTextColor.main,
          },
        },
      },
    },
    content: {
      paddingTop: '9px',
      paddingBottom: '9px',
      margin: '0',
      '&.Mui-expanded': {
        margin: '0',
        paddingBottom: '0',
        paddingTop: '0',
      },
    },
  },
};
