import { Box, useTheme } from '@mui/material';

import SuspendLicenseVoluntaryRetirement from '../../../suspend-license-voluntary-retirement';

export function VoluntarySuspendLicense() {
  const theme = useTheme();
  return (
    <Box
      data-testid="voluntary-suspend-license"
      bgcolor={`${theme.palette.white.main}`}
      px={3}
      py={2}
    >
      <SuspendLicenseVoluntaryRetirement tabName={'voluntary-suspend-license'} />
    </Box>
  );
}

export default VoluntarySuspendLicense;
