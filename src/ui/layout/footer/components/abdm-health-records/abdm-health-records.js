import { Box, Grid, Link, Typography } from '@mui/material';

import ABHASCANAPPSTORE from '../../../../../assets/images/abha_scan_appstore.png';
import ABHASCANPLAYSTORE from '../../../../../assets/images/abha_scan_playstore.jpg';
import APPSTORE from '../../../../../assets/images/appstore.png';
import PLAYSTORE from '../../../../../assets/images/playstore.png';

export const AbdmHealthRecords = () => {
  return (
    <>
      <Typography variant="h2" fontWeight={'500'} component="div">
        ABHA App
      </Typography>

      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={12} sm="auto" display={'flex'} flexDirection={'column'} gap={2}>
          <Box
            component={'img'}
            height="auto"
            width={{ xs: '120px', md: '108px', lg: '146px' }}
            src={ABHASCANPLAYSTORE}
            alt="Mobile App Scan"
          />
          <Link href="https://play.google.com/store/apps/details?id=in.ndhm.phr" target="_blank">
            <Box
              component={'img'}
              height="auto"
              width={{ xs: '120px', md: '108px', lg: '146px' }}
              src={PLAYSTORE}
              alt="ios Icon"
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm="auto" display={'flex'} flexDirection={'column'} gap={2}>
          <Box
            component={'img'}
            height="auto"
            width={{ xs: '120px', md: '108px', lg: '146px' }}
            src={ABHASCANAPPSTORE}
            alt="Mobile App Scan"
          />
          <Link href="https://apps.apple.com/in/app/abha-abdm/id1630917266" target="_blank">
            <Box
              component={'img'}
              height="auto"
              width={{ xs: '120px', md: '108px', lg: '146px' }}
              src={APPSTORE}
              alt="Android Icon"
            />
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
