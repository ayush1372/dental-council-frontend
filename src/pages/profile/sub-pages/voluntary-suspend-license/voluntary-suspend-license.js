import { useState } from 'react';

import { Box, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';

import { doctorTabs } from '../../../../helpers/components/sidebar-drawer-list-item';
import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import { changeUserActiveTab } from '../../../../store/reducers/common-reducers';
import SuspendLicenseVoluntaryRetirement from '../../../suspend-license-voluntary-retirement';

export function VoluntarySuspendLicense() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState('Hello');

  return (
    <Box bgcolor={`${theme.palette.white.main}`} p={3}>
      <Box
        data-testid="voluntary-suspend-license"
        bgcolor={`${theme.palette.white.main}`}
      >
        <SuspendLicenseVoluntaryRetirement
          tabName={'voluntary-suspend-license'}
          handleClose={() => {
            dispatch(changeUserActiveTab(doctorTabs[0].tabName));
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
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
