import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import CommunicationAddressContent from '../readable-content/communication-details-content';
import IMRDetailsContent from '../readable-content/imr-details-content';
import PersonalDetailsContent from '../readable-content/personal-details-content';
const ReadPersonalDetails = ({ handleNext, showActions = true }) => {
  const userType = useSelector((state) => state.common.loggedInUserType);
  const { doctorUserProfile } = useSelector((state) => state?.menuLists);
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
                <Component doctorUserProfile={doctorUserProfile} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
      {showActions && (
        <Box px={3} display="flex" justifyContent="flex-end">
          {userType !== 'Doctor' && (
            <Button
              variant="contained"
              color="secondary"
              disabled
              sx={{ margin: '16px 20px 0px 0px' }}
            >
              Action...
            </Button>
          )}
          <ButtonGroupWizard handleNext={handleNext} labelNext={t('Next')} hidePrevious={true} />
        </Box>
      )}
    </Box>
  );
};

export default ReadPersonalDetails;
