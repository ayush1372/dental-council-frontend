import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  Typography,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useSelector } from 'react-redux';

import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';
import SuspendLicenseVoluntaryRetirement from '../../../suspend-license-voluntary-retirement';
import CurrentWorkDetails from '../readable-content/current-work-details';
import SpecialDetailsContent from '../readable-content/special-details-content';
import WorkDetails from '../readable-content/work-details';
const ReadWorkProfile = ({
  handleBack,
  showActions = true,
  setShowDashboard,
  setShowTable,
  setShowViewPorfile,
  activeStep,
}) => {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const [selected, setSelected] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);

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
  const handleSubmitDetails = () => {
    setConfirmationModal(false);
    setShowDashboard(false);
    setShowTable(true);
    setShowViewPorfile(false);
  };
  const handleClose = () => {
    setConfirmationModal(false);
  };
  const selectionChangeHandler = (event) => {
    const { myValue } = event.currentTarget.dataset;
    setSelected(myValue);
    setConfirmationModal(true);
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
      {showActions && (
        <Box paddingBottom={'30px'} pl={3} display="flex" justifyContent="space-between">
          <ButtonGroupWizard handlePrevious={handleBack} />
          {showActions && loggedInUserType !== 'Doctor' && (
            <Box mt={2}>
              <PopupState>
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      color="secondary"
                      {...bindTrigger(popupState)}
                      sx={{ mr: 2 }}
                    >
                      Action...
                    </Button>

                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={selectionChangeHandler} data-my-value={'verify'}>
                        Verify
                      </MenuItem>
                      <MenuItem onClick={selectionChangeHandler} data-my-value={'raise'}>
                        Raise a Query
                      </MenuItem>
                      {loggedInUserType === 'SMC' && (
                        <MenuItem onClick={selectionChangeHandler} data-my-value={'forward'}>
                          Forward
                        </MenuItem>
                      )}
                      <MenuItem onClick={selectionChangeHandler} data-my-value={'reject'}>
                        Reject
                      </MenuItem>
                      {loggedInUserType === 'NMC' && (
                        <MenuItem onClick={selectionChangeHandler} data-my-value={'suspend'}>
                          Permanent suspend
                        </MenuItem>
                      )}
                      {loggedInUserType === 'NMC' && (
                        <MenuItem onClick={selectionChangeHandler} data-my-value={'blacklist'}>
                          Temporary suspend
                        </MenuItem>
                      )}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
              <Button color="secondary" variant="contained" onClick={handleSubmitDetails}>
                Submit
              </Button>
            </Box>
          )}
        </Box>
      )}
      <Dialog
        open={confirmationModal}
        onClose={() => {
          setConfirmationModal(false);
        }}
        sx={{
          '.MuiPaper-root': {
            borderRadius: '10px',
          },
        }}
      >
        <Box
          p={2}
          width={selected === 'verify' ? '500px' : selected === 'forward' ? '700px' : '630px'}
          height={
            selected === 'reject'
              ? '500px'
              : selected === 'verify'
              ? '380px'
              : selected === 'forward'
              ? '300px'
              : selected === 'raise'
              ? '650px'
              : '720px'
          }
          borderRadius={'40px'}
        >
          <Box align="right">
            <CloseIcon onClick={handleClose} />
          </Box>
          {loggedInUserType === 'NMC' ||
          loggedInUserType === 'SMC' ||
          loggedInUserType === 'College' ? (
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'flex-start'}
              alignItems={'center'}
            >
              <SuspendLicenseVoluntaryRetirement
                selectedValue={selected}
                handleSubmitDetails={handleSubmitDetails}
                activeStep={activeStep}
              />
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Dialog>
    </Box>
  );
};
export default ReadWorkProfile;
