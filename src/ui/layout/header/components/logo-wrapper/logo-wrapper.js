import { Container, Grid, Link } from '@mui/material';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import NHALOGO from '../../../../../assets/images/logo-slider/nha-english-logo.png';
import { Button } from '../../../../core';

import styles from './logo-wrapper.module.scss';

export const LogoWrapper = () => {
  const navigate = useNavigate();
  // const { t } = useTranslation();

  return (
    <Container className={styles.logoWrapper}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Link onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            <img className={styles.logoImage} src={NHALOGO} alt="NHA logo" />
          </Link>
        </Grid>

        <Grid xs={12} sm={6} alignItems="center" textAlign="right">
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: '8px' }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/facility')}>
            Facility Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
