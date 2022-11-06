import { Grid, Typography } from '@mui/material';

import ANDROIDICON from '../../../../../assets/images/androidIcon.png';
import MOBILEAAPSCAN from '../../../../../assets/images/mobileAppScan.png';

import styles from './abdm-health-records.module.scss';

export const AbdmHealthRecords = () => {
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="subtitle1" component="div" className={styles.footerTitle}>
        Important Links
      </Typography>

      <Grid container spacing={1} justifyContent="flex-start">
        <Grid item xs="auto">
          <img src={MOBILEAAPSCAN} alt="Mobile App Scan" />
        </Grid>
        <Grid item xs="auto">
          <img src={ANDROIDICON} alt="Android Icon" />
          <Typography
            sx={{ lineHeight: 'normal', paddingLeft: '10px' }}
            variant="body1"
            component="div"
          >
            App for Android
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
