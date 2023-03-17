import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import CommunicationAddressContent from '../readable-content/communication-details-content';
import IMRDetailsContent from '../readable-content/imr-details-content';
import PersonalDetailsContent from '../readable-content/personal-details-content';
const ReadPersonalDetails = ({ handleNext, showActions = true }) => {
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { t } = useTranslation();
  const [accordionKeys, setAccordionKeys] = useState(['accordion-0', 'accordion-1', 'accordion-2']);
  const accordions = [
    {
      title: 'Personal Details',
      body: PersonalDetailsContent,
    },
    {
      title: 'Address as per KYC',
      body: IMRDetailsContent,
    },
    {
      title: 'Communication Address',
      body: CommunicationAddressContent,
    },
  ];
  const handleChange = (accordionValue) => () => {
    if (accordionKeys.includes(accordionValue)) {
      setAccordionKeys(accordionKeys.filter((a) => a !== accordionValue));
    } else {
      setAccordionKeys([...accordionKeys, accordionValue]);
    }
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
              key={key}
              defaultExpanded
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
                expandIcon={accordionKeys.includes(key) ? <RemoveIcon /> : <AddIcon />}
              >
                <Typography variant="body1" color="primary">
                  {accordion.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Component personalDetails={personalDetails} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
      {showActions && (
        <Box px={3} display="flex" justifyContent="flex-end">
          <ButtonGroupWizard handleNext={handleNext} labelNext={t('Next')} hidePrevious={true} />
        </Box>
      )}
    </Box>
  );
};

export default ReadPersonalDetails;
