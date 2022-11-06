import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { Box } from '@mui/material';

export function Accordion({ content = [] }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [content]);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      {content.map((item, index) => {
        const panelValue = `panel${index + 1}`;
        return (
          <MuiAccordion
            square="false"
            key={index}
            expanded={expanded === panelValue}
            onChange={handleChange(panelValue)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${panelValue}bh-content`}
              id={`${panelValue}bh-header`}
            >
              <Typography variant="body1" color="primary">
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textPrimary" variant="body1" fontWeight={400}>
                {item.body}
              </Typography>
            </AccordionDetails>
          </MuiAccordion>
        );
      })}
    </Box>
  );
}
