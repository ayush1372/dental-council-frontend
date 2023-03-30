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

import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
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
  const [accordionKeys, setAccordionKeys] = useState(['accordion-0', 'accordion-1', 'accordion-2']);
  const [selected, setSelected] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [actionVerified, setActionVerified] = useState(false);

  const { userActiveTab, selectedAcademicStatus } = useSelector((state) => state.common);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState('');
  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  // const dispatch = useDispatch();

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
  const handleChange = (accordionValue) => () => {
    if (accordionKeys.includes(accordionValue)) {
      setAccordionKeys(accordionKeys.filter((a) => a !== accordionValue));
    } else {
      setAccordionKeys([...accordionKeys, accordionValue]);
    }
  };
  const selectionChangeHandler = (event) => {
    const { myValue } = event.currentTarget.dataset;
    setSelected(myValue);
    setConfirmationModal(true);
  };

  const handleClose = () => {
    setConfirmationModal(false);
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
          {userActiveTab === 'dashboard' &&
            (selectedAcademicStatus?.toUpperCase() === 'PENDING' ||
              selectedAcademicStatus === 'Temporary Suspension Requests Received' ||
              selectedAcademicStatus === 'Permanent Suspension Requests Received') && (
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
                        disabled={actionVerified}
                      >
                        Action <MoreHorizIcon />
                      </Button>

                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={selectionChangeHandler} data-my-value={'verify'}>
                          Verify
                        </MenuItem>
                        {selectedAcademicStatus !== 'Temporary Suspension Requests Received' &&
                          selectedAcademicStatus !== 'Permanent Suspension Requests Received' && (
                            <MenuItem onClick={selectionChangeHandler} data-my-value={'raise'}>
                              Raise a Query
                            </MenuItem>
                          )}
                        {loggedInUserType === 'SMC' && (
                          <MenuItem onClick={selectionChangeHandler} data-my-value={'forward'}>
                            Forward
                          </MenuItem>
                        )}
                        <MenuItem onClick={selectionChangeHandler} data-my-value={'reject'}>
                          Reject
                        </MenuItem>
                        {personalDetails.nmr_id !== undefined &&
                          loggedInUserType === 'NMC' &&
                          selectedAcademicStatus !== 'Temporary Suspension Requests Received' &&
                          selectedAcademicStatus !== 'Permanent Suspension Requests Received' && (
                            <MenuItem onClick={selectionChangeHandler} data-my-value={'suspend'}>
                              Permanent suspend
                            </MenuItem>
                          )}

                        {personalDetails.nmr_id !== undefined &&
                          loggedInUserType === 'NMC' &&
                          selectedAcademicStatus !== 'Temporary Suspension Requests Received' &&
                          selectedAcademicStatus !== 'Permanent Suspension Requests Received' && (
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
        scroll="body"
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
          borderRadius={'40px'}
        >
          <Box align="right">
            <CloseIcon onClick={handleClose} />
          </Box>
          {loggedInUserType === 'NMC' ||
          loggedInUserType === 'SMC' ||
          loggedInUserType === 'NBE' ||
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
                setActionVerified={setActionVerified}
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
          handleClose={() => setShowSuccessPopup(false)}
        />
      )}
    </Box>
  );
};

export default ReadRegisterAndAcademicDetails;
