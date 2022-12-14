import { Box } from '@mui/material';

import SuspendLicenseVoluntaryRetirement from '../../../suspend-license-voluntary-retirement';

export function VoluntarySuspendLicense() {
  return (
    <Box data-testid="voluntary-suspend-license" p={3}>
      <SuspendLicenseVoluntaryRetirement tabName={'voluntary-suspend-license'} />
    </Box>
  );
}

export default VoluntarySuspendLicense;
