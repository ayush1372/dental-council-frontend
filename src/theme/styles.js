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
import { Chip } from './chip';
import { FormHelperText } from './form-helper-text';
import { InputLabel } from './input-label';
import { palette } from './palette';
import { StepLabel } from './step-label';
import { TableRow } from './table-row';
import { TableSortLabel } from './table-sort-label';
import { TextField } from './textfield';
import { Typography } from './typography';

const themeWrapper = (mode) => {
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
      1: '0px 1px 3px #26262666',
      2: '0px 3px 5px #26262666',
      3: '0px 2px 10px #26262666',
      4: '0px 3px 25px #00000038',
    },

    components: {
      // STYLE FOR BUTTON COMPONENT
      MuiButton: Button(palettes),

      // STYLE FOR CARD COMPONENT
      MuiCard: Card(palettes),

      MuiCardHeader: CardHeader(palettes),

      MuiCardContent: CardContent(palettes),

      MuiCardActions: CardActions(palettes),

      // STYLE FOR TYPOGRAPHY COMPONENT
      MuiTypography: Typography(palettes),

      // STYLE FOR TEXTFIELD COMPONENT
      MuiOutlinedInput: TextField(palettes),

      // STYLE FOR INPUT LABEL COMPONENT
      MuiInputLabel: InputLabel(palettes),

      // STYLE FOR INPUT FormHelperText COMPONENT
      MuiFormHelperText: FormHelperText(palettes),

      MuiAccordion: Accordion(palettes),

      MuiAccordionSummary: AccordionSummary(palettes),

      MuiAccordionDetails: AccordionDetails(palettes),

      MuiTableSortLabel: TableSortLabel(palettes),

      MuiTableRow: TableRow,

      MuiStepLabel: StepLabel,

      MuiChip: Chip,
    },

    // STYLE FOR BORDER RADIUS
    shape: {
      borderRadius: 0,
    },
  });
};

export default themeWrapper;
