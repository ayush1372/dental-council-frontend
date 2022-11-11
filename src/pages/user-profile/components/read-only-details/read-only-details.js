import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';

import PersonalDetails from '../personal-details/personal-details';
const ReadOnlyDetails = () => {
  const [accordionKey, setAccordionKey] = useState(null);
  const accordions = [
    {
      title: 'Personal Details',
      body: PersonalDetails,
    },
    {
      title: 'Communication Address',
      body: () => <div>something</div>,
    },
    {
      title: 'IMR Details',
      body: () => <div>something</div>,
    },
  ];
  const handleChange = (accordionValue) => (_event, isExpanded) => {
    setAccordionKey(isExpanded ? accordionValue : null);
  };
  return (
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
  );
};

export default ReadOnlyDetails;
