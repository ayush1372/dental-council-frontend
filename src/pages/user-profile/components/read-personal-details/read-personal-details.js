import { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getPersonalDetailsData } from '../../../../store/actions/doctor-user-profile-actions';
import successToast from '../../../../ui/core/toaster';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import CommunicationAddressContent from '../readable-content/communication-details-content';
import IMRDetailsContent from '../readable-content/imr-details-content';
import PersonalDetailsContent from '../readable-content/personal-details-content';
const ReadPersonalDetails = ({ handleNext, showActions = true }) => {
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { loginData } = useSelector((state) => state?.loginReducer);
  const dispatch = useDispatch();
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
  const fetchDoctorUserProfileData = () => {
    dispatch(getPersonalDetailsData(loginData.data.profile_id))
      .then(() => {})
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };
  useEffect(() => {
    fetchDoctorUserProfileData();
  }, []);
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
