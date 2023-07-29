import { Grid, Link, Typography } from '@mui/material';

import ABHASCANAPPSTORE from '../../../../../assets/images/abha_scan_appstore.png';
import ABHASCANPLAYSTORE from '../../../../../assets/images/abha_scan_playstore.jpg';
import APPSTORE from '../../../../../assets/images/appstore.png';
import PLAYSTORE from '../../../../../assets/images/playstore.png';

export const AbdmHealthRecords = () => {
  return (
    <>
      <Typography variant="h2" mb={{ xs: 0, md: 3 }}>
        ABHA App
      </Typography>

      <Grid container spacing={1} justifyContent="flex-start">
        <Grid item xs="6">
          <img width={'120px'} src={ABHASCANPLAYSTORE} alt="Mobile app scan for playstore" />
          <Link href="https://play.google.com/store/apps/details?id=in.ndhm.phr">
            <img width={'120px'} src={PLAYSTORE} alt="Playstore link" />
          </Link>
        </Grid>
        <Grid item xs="6">
          <img width={'120px'} src={ABHASCANAPPSTORE} alt="Mobile app scan for playstore" />
          <Link href="https://apps.apple.com/in/app/abha-abdm/id1630917266">
            <img width={'120px'} src={APPSTORE} alt="Playstore link" />
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
