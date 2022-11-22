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
import { Palette } from './palette';
import { TableRow } from './table-row';
import { TableSortLabel } from './table-sort-label';
import { TextField } from './textfield';
import { Typography } from './typography';

const themeWrapper = (mode) => {
  return createTheme({
    // STYLE FOR COLOR OVERRIDE
    palette: {
      mode: mode,
      ...Palette,
    },

    breakpoints: breakpoints,
    shadows: {
      0: 'none',
      1: '0px 1px 3px #26262666',
      2: '0px 3px 5px #26262666',
      3: '0px 2px 10px #26262666',
    },

    components: {
      // STYLE FOR BUTTON COMPONENT
      MuiButton: Button,

      // STYLE FOR CARD COMPONENT
      MuiCard: Card,

      MuiCardHeader: CardHeader,

      MuiCardContent: CardContent,

      MuiCardActions: CardActions,

      // STYLE FOR TYPOGRAPHY COMPONENT
      MuiTypography: Typography,

      // STYLE FOR TEXTFIELD COMPONENT
      MuiOutlinedInput: TextField,

      // STYLE FOR INPUT LABEL COMPONENT
      MuiInputLabel: InputLabel,

      // STYLE FOR INPUT FormHelperText COMPONENT
      MuiFormHelperText: FormHelperText,

      MuiAccordion: Accordion,

      MuiAccordionSummary: AccordionSummary,

      MuiAccordionDetails: AccordionDetails,

      MuiTableSortLabel: TableSortLabel,

      MuiTableRow: TableRow,
    },

    // STYLE FOR BORDER RADIUS
    shape: {
      borderRadius: 0,
    },
  });
};

export default themeWrapper;
