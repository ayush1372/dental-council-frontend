import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';

import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import CurrentWorkDetails from '../current-work-details/current-work-details';
import SpecialDetailsContent from '../special-details-content/special-details-content';
import WorkDetails from '../work-details/work-details';
const ReadWorkProfile = ({ handleBack }) => {
  const [accordionKey, setAccordionKey] = useState('accordion-0');
  const accordions = [
    {
      title: 'Special Details',
      body: SpecialDetailsContent,
    },
    {
      title: 'Work Details',
      body: WorkDetails,
    },
    {
      title: 'Current Work Details',
      body: CurrentWorkDetails,
    },
  ];
  const handleChange = (accordionValue) => (_event, isExpanded) => {
    setAccordionKey(isExpanded ? accordionValue : null);
  };
  return (
    <Box>
      <Box>
        {accordions.map((accordion, index) => {
          const key = `accordion-${index}`;
          const Component = accordion.body;
          return (
            <Accordion
              square="false"
              key={0}
              expanded={accordionKey === key}
              onChange={handleChange(key)}
              sx={{
                '.Mui-expanded.MuiAccordionSummary-root': {
                  backgroundColor: 'primary.main',
                  height: '48px',
                  '.MuiAccordionSummary-content span': {
                    color: 'white.main',
                  },
                  '.MuiAccordionSummary-expandIconWrapper svg': {
                    fill: '#ffff !important',
                  },
                },
              }}
            >
              <AccordionSummary
                expandIcon={accordionKey === key ? <RemoveIcon /> : <AddIcon />}
                // aria-controls={`${panelValue}bh-content`}
                // id={`${panelValue}bh-header`}
              >
                <Typography variant="body1" color="primary">
                  {accordion.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Component />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
      <Box paddingBottom={'30px'}>
        <ButtonGroupWizard handlePrevious={handleBack} />
      </Box>
    </Box>
  );
};

export default ReadWorkProfile;
