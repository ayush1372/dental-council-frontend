import { createTheme } from '@mui/material/styles';

import { Accordion } from './accordion';
import { AccordionDetails } from './accordion-details';
import { AccordionSummary } from './accordion-summary';
import { breakpoints } from './break-points';
import { Button } from './button';
import { Card } from './card';
import { CardActions } from './card-actions';
import { CardContent } from './card-content';
import { CardHeader } from './card-header';
import { FormHelperText } from './form-helper-text';
import { InputLabel } from './input-label';
import { palette } from './palette';
import { StepLabel } from './step-label';
import { SvgIcon } from './svg-icon';
import { TableCell } from './table-cell';
import { TableRow } from './table-row';
import { TableSortLabel } from './table-sort-label';
import { TextField } from './textfield';
import { Typography } from './typography';

const themeWrapper = (mode, appFontType) => {
  const palettes = palette(mode);
  return createTheme({
    // STYLE FOR COLOR OVERRIDE
    palette: {
      mode: mode,
      ...palettes,
    },

    breakpoints: breakpoints,
    shadows: {
      0: 'none',
      1: '0 1px 3px #00000029',
      2: '0 3px 6px #00000029',
      3: '0 2px 10px #00000029',
      4: '0 3px 25px #00000029',
      8: '0 1px 3px #00000029',
    },

    components: {
      // STYLE FOR BUTTON COMPONENT
      MuiButton: Button(palettes, appFontType),

      // STYLE FOR CARD COMPONENT
      MuiCard: Card(palettes, appFontType),

      MuiCardHeader: CardHeader(palettes, appFontType),

      MuiCardContent: CardContent(palettes, appFontType),

      MuiCardActions: CardActions(palettes, appFontType),

      // STYLE FOR TYPOGRAPHY COMPONENT
      MuiTypography: Typography(palettes, appFontType),

      // STYLE FOR TEXTFIELD COMPONENT
      MuiOutlinedInput: TextField(palettes, appFontType),

      // STYLE FOR INPUT LABEL COMPONENT
      MuiInputLabel: InputLabel(palettes, appFontType),

      // STYLE FOR INPUT FormHelperText COMPONENT
      MuiFormHelperText: FormHelperText(palettes, appFontType),

      MuiAccordion: Accordion(palettes, appFontType),

      MuiAccordionSummary: AccordionSummary(palettes, appFontType),

      MuiAccordionDetails: AccordionDetails(palettes, appFontType),

      MuiTableSortLabel: TableSortLabel(palettes, appFontType),

      MuiTableRow: TableRow(palettes, appFontType),

      MuiStepLabel: StepLabel(palettes, appFontType),

      MuiTableCell: TableCell(palettes, appFontType),

      MuiSvgIcon: SvgIcon(palettes, appFontType),
      MuiPaper: {
        styleOverrides: {
          root: {
            '.MuiList-root': {
              paddingTop: '0',
              paddingBottom: '0',
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: palette.primary,
            '.MuiSvgIcon-root': {
              color: palette.primary,
              borderColor: palette.primary,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '.MuiButtonBase-root.MuiRadio-colorPrimary': {
              color: palette.primary,
            },
          },
          colorPrimary: {
            color: palette.primary,
          },
        },
      },
    },

    // STYLE FOR BORDER RADIUS
    shape: {
      borderRadius: 0,
    },
  });
};

export default themeWrapper;
