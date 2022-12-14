import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog } from '@mui/material';

import SuspendLicenseVoluntaryRetirement from '../suspend-license-voluntary-retirement';

export function SuspendValuntaryPopup(props) {
  return (
    <Dialog
      open={props.confirmationModal}
      onClose={props.handleClose}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '10px',
        },
      }}
    >
      <Box
        p={2}
        width={
          props.selected === 'verify' ? '500px' : props.selected === 'forward' ? '700px' : '630px'
        }
        height={
          props.selected === 'reject'
            ? '500px'
            : props.selected === 'verify'
            ? '380px'
            : props.selected === 'forward'
            ? '300px'
            : props.selected === 'raise'
            ? '650px'
            : '720px'
        }
        borderRadius={'40px'}
      >
        <Box align="right">
          <CloseIcon onClick={props.handleClose} />
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-start'}
          alignItems={'center'}
        >
          <SuspendLicenseVoluntaryRetirement selectedValue={props.selected} />
        </Box>
      </Box>
    </Dialog>
  );
}

export default SuspendValuntaryPopup;
