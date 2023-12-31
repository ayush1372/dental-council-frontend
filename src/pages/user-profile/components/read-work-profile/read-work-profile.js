import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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

import SuspendLicenseVoluntaryRetirement from '../../../suspend-license-voluntary-retirement';
import CurrentWorkDetails from '../readable-content/current-work-details';
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
  const { workProfileDetails, personalDetails } = useSelector(
    (state) => state?.doctorUserProfileReducer
  );
  const [selected, setSelected] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const { userActiveTab } = useSelector((state) => state.common);
  const [accordionKey, setAccordionKey] = useState('accordion-0');

  const accordions = [
    // {
    //   title: 'Special Details',
    //   body: SpecialDetailsContent,
    // },
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
                <Component workProfileDetails={workProfileDetails} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
      {showActions && (
        <Box
          paddingBottom={'30px'}
          pl={3}
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <Button
            color="grey"
            variant="contained"
            onClick={handleBack}
            sx={{
              width: {
                xs: '100%',
                md: 'fit-content',
              },
              margin: {
                xs: '10px 0',
              },
            }}
          >
            Back
          </Button>
          {userActiveTab === 'dashboard' && (
            <Box mt={2}>
              <PopupState>
                {(popupState) => (
                  <React.Fragment>
                    {loggedInUserType === 'SMC' ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        {...bindTrigger(popupState)}
                        sx={{
                          mr: 2,
                          mb: {
                            xs: 1,
                            md: 0,
                          },
                          width: {
                            xs: '100%',
                            md: 'fit-content',
                          },
                        }}
                      >
                        Action <MoreHorizIcon />
                      </Button>
                    ) : null}

                    <Menu {...bindMenu(popupState)}>
                      {loggedInUserType !== 'NMC' && personalDetails.application_type_id !== 2 && (
                        <MenuItem onClick={selectionChangeHandler} data-my-value={'verify'}>
                          Verify
                        </MenuItem>
                      )}
                      {loggedInUserType !== 'NMC' && personalDetails.application_type_id !== 2 && (
                        <MenuItem onClick={selectionChangeHandler} data-my-value={'raise'}>
                          Raise a Query
                        </MenuItem>
                      )}
                      {loggedInUserType === 'SMC' &&
                        loggedInUserType !== 'NMC' &&
                        personalDetails.application_type_id !== 2 && (
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
          width={
            selected === 'verify'
              ? '500px'
              : selected === 'forward'
              ? '700px'
              : { md: '630px', sm: '100%' }
          }
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
                handleClose={handleClose}
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
