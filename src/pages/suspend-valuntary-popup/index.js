import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog } from '@mui/material';

import SuspendLicenseVoluntaryRetirement from '../suspend-license-voluntary-retirement';

export function SuspendValuntaryPopup({
  selected,
  confirmationModal,
  handleClose,
  selectedSuspendLicenseProfile,
}) {
  return (
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
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-start'}
          alignItems={'center'}
        >
          <SuspendLicenseVoluntaryRetirement
            selectedValue={selected}
            selectedSuspendLicenseProfile={selectedSuspendLicenseProfile}
          />
        </Box>
      </Box>
    </Dialog>
  );
}

export default SuspendValuntaryPopup;
