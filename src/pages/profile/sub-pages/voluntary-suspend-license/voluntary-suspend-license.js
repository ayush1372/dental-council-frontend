import { useState } from 'react';

import { Box, useTheme } from '@mui/material';

import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import SuspendLicenseVoluntaryRetirement from '../../../suspend-license-voluntary-retirement';

export function VoluntarySuspendLicense() {
  const theme = useTheme();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState('Hello');

  return (
    <Box bgcolor={`${theme.palette.white.main}`} px={3} py={2}>
      <Box
        data-testid="voluntary-suspend-license"
        bgcolor={`${theme.palette.white.main}`}
        px={3}
        py={2}
      >
        <SuspendLicenseVoluntaryRetirement
          tabName={'voluntary-suspend-license'}
          showSuccessPopup={setShowSuccessPopup}
          setSuccessPopupMessage={setSuccessPopupMessage}
        />
      </Box>
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
}

export default VoluntarySuspendLicense;
