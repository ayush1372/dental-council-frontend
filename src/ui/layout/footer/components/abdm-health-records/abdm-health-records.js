import { Box, Grid, Link, Typography } from '@mui/material';

import appStore from '../../../../../assets/images/app-store-logo.svg';
import gPlayStoreWhite from '../../../../../assets/images/google-play-white-logo.svg';
import MOBILEAAPSCAN from '../../../../../assets/images/mobileAppScan.png';

export const AbdmHealthRecords = () => {
  return (
    <>
      <Typography variant="h2" mb={{ xs: 0, md: 3 }}>
        ABHA App
      </Typography>

      <Grid container spacing={1} justifyContent="flex-start">
        <Grid item xs="auto">
          <Typography variant="subtitle1" component="div" fontWeight="500" mb={0.5}>
            Scan This
          </Typography>
          <img src={MOBILEAAPSCAN} alt="Mobile App Scan" />
        </Grid>
        <Grid item xs="auto">
          <Typography variant="subtitle1" component="div" fontWeight="500" mb={0.5}>
            Download App
          </Typography>
          <Box display="flex" flexDirection="column">
            <Link href="https://apps.apple.com/in/app/abha-abdm/id1630917266" target="_blank">
              <img src={appStore} alt="Android Icon" />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=in.ndhm.phr" target="_blank">
              <img src={gPlayStoreWhite} alt="Android Icon" />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
