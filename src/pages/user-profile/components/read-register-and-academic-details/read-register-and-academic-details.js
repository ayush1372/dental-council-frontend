import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import QualificationDetailsContent from '../readable-content/qualification-details-content';
import RegistrationDetailsContent from '../readable-content/registration-details-content';

const ReadRegisterAndAcademicDetails = ({ handleNext, handleBack, showActions = true }) => {
  const [accordionKey, setAccordionKey] = useState('accordion-0');

  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const accordions = [
    {
      title: 'Registration Details',
      body: RegistrationDetailsContent,
    },
    {
      title: 'Qualification Details',
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
              <AccordionSummary expandIcon={accordionKey === key ? <RemoveIcon /> : <AddIcon />}>
                <Typography variant="body1" color="primary.main">
                  {accordion.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Component registrationDetails={registrationDetails} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
      {showActions && (
        <Box
          px={3}
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <ButtonGroupWizard handlePrevious={handleBack} />

          <ButtonGroupWizard handleNext={handleNext} />
        </Box>
      )}
    </Box>
  );
};

export default ReadRegisterAndAcademicDetails;
