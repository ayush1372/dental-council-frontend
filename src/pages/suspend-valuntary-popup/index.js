import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog } from '@mui/material';

import SuccessModalPopup from '../../shared/common-modals/success-modal-popup';
import SuspendLicenseVoluntaryRetirement from '../suspend-license-voluntary-retirement';

export function SuspendValuntaryPopup({
  selected,
  confirmationModal,
  handleClose,
  selectedSuspendLicenseProfile,
}) {
  const [successPopupMessage, setSuccessPopupMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  return (
    <>
      {' '}
      <Dialog
        open={confirmationModal}
        onClose={handleClose}
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
              ? '500px'
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
              : '650px'
          }
          borderRadius={'40px'}
        >
          <Box align="right">
            <CloseIcon onClick={handleClose} />
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-start'}
            alignItems={'center'}
          >
            <SuspendLicenseVoluntaryRetirement
              selectedValue={selected}
              handleClose={handleClose}
              selectedSuspendLicenseProfile={selectedSuspendLicenseProfile}
              setSuccessPopupMessage={setSuccessPopupMessage}
              showSuccessPopup={setShowSuccessPopup}
              closeActionModal={handleClose}
            />
          </Box>
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
    </>
  );
}

export default SuspendValuntaryPopup;
