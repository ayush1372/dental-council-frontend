import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import styles from './copyright.module.scss';

export const Copyright = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={{ xs: 2 }}>
      <Grid item xs={12} p="12px 0" className={styles.copyright}>
        <Typography variant="body1">{t('copyright')}</Typography>
      </Grid>
    </Grid>
  );
};
