import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import CommunicationAddressContent from '../communication-details-content/communication-details-content';
import IMRDetailsContent from '../imr-details-content/imr-details-content';
import PersonalDetailsContent from '../personal-details-content/personal-details-content';
const ReadPersonalDetails = ({ handleNext }) => {
  const { t } = useTranslation();
  const [accordionKey, setAccordionKey] = useState('accordion-0');
  const accordions = [
    {
      title: 'Personal Details',
      body: PersonalDetailsContent,
    },
    {
      title: 'Communication Address',
      body: CommunicationAddressContent,
    },
    {
      title: 'IMR Details',
      body: IMRDetailsContent,
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
              <AccordionSummary expandIcon={accordionKey === key ? <RemoveIcon /> : <AddIcon />}>
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
        <ButtonGroupWizard handleNext={handleNext} labelNext={t('Next')} hidePrevious={true} />
      </Box>
    </Box>
  );
};

export default ReadPersonalDetails;
