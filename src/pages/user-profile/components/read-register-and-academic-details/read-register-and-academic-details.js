import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';

import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import QualificationDetailsContent from '../qualification-details-content/qualification-details-content';
import RegistrationDetailsContent from '../registration-details-content/registration-details-content';

const ReadRegisterAndAcademicDetails = ({ handleNext, handleBack }) => {
  const [accordionKey, setAccordionKey] = useState('accordion-0');
  const accordions = [
    {
      title: '*Registration Details',
      body: RegistrationDetailsContent,
    },
    {
      title: '*Qualification Details',
      body: QualificationDetailsContent,
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
      <Box>
        <ButtonGroupWizard handleNext={handleNext} handlePrevious={handleBack} />
      </Box>
    </Box>
  );
};

export default ReadRegisterAndAcademicDetails;
