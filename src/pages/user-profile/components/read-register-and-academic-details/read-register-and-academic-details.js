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
import { useDispatch, useSelector } from 'react-redux';

import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import { getRegistrationDetailsData } from '../../../../store/actions/doctor-user-profile-actions';
import successToast from '../../../../ui/core/toaster';
import SuspendLicenseVoluntaryRetirement from '../../../suspend-license-voluntary-retirement';
import QualificationDetailsContent from '../readable-content/qualification-details-content';
import RegistrationDetailsContent from '../readable-content/registration-details-content';

const ReadRegisterAndAcademicDetails = ({
  handleBack,
  showActions = true,
  activeStep,
  setShowDashboard,
  setShowViewPorfile,
  setShowTable,
}) => {
  const [accordionKey, setAccordionKey] = useState('accordion-0');
  const [selected, setSelected] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState('');
  const { userActiveTab } = useSelector((state) => state.common);
  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  const dispatch = useDispatch();

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
  const selectionChangeHandler = (event) => {
    const { myValue } = event.currentTarget.dataset;
    setSelected(myValue);
    setConfirmationModal(true);
  };

  const handleClose = () => {
    setConfirmationModal(false);
  };

  const handleBackAction = () => {
    dispatch(getRegistrationDetailsData(personalDetails?.hp_profile_id))
      .then(() => {
        handleBack();
      })
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };

  const handleSubmitDetails = () => {
    setConfirmationModal(false);
    setShowDashboard(false);
    setShowTable(true);
    setShowViewPorfile(false);
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
      {/* {showActions && (
        <Box
          px={3}
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <ButtonGroupWizard handlePrevious={handleBack} />

          <ButtonGroupWizard handleNext={handleNext} />
        </Box>
      )} */}
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
            onClick={handleBackAction()}
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
                handleClose={handleClose}
                closeActionModal={setConfirmationModal}
                showSuccessPopup={setShowSuccessPopup}
                setSuccessPopupMessage={setSuccessPopupMessage}
              />
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Dialog>
      {showSuccessPopup && (
        <SuccessModalPopup
          open={true}
          setOpen={() => setShowSuccessPopup(false)}
          text={successPopupMessage}
          SuspensionCall={true}
        />
      )}
    </Box>
  );
};

export default ReadRegisterAndAcademicDetails;
