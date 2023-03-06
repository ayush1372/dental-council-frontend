import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import BannerImage from '../../../../assets/images/hero-banner.png';
import { Button } from '../../../../ui/core';

import styles from './hero-banner.module.scss';

export function HeroBanner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      p={{ md: '70px 0', xs: '30px 0' }}
      sx={{ backgroundColor: 'backgroundColor.main' }}
      className={styles.heroBannerBox}
    >
      <Container className={styles.bannerWrapper}>
        <Grid container spacing={3} direction={{ xs: 'column', sm: 'row-reverse' }}>
          <Grid item xs={12} sm={6}>
            <img className={styles.bannerImage} src={BannerImage} alt="Hero Banner" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" color="black" mb={2}>
              {t(`Ayushmaan Bharat Digital Mission`)}
            </Typography>
            <Typography variant="h1" color="primary" mb={2}>
              {t('National Medical Commission (Nmc)')}
            </Typography>
            <Typography variant="body1" color="textPrimary" component="div">
              {t(
                'The National Medical Commission (NMC) has been constituted by an act of Parliament known as National Medical Commission Act, 2019 which came into force on 25.9.2020 by gazette notification dated 24.9.2020. The Board of Governors in supersession of Medical Council of India constituted under section 3A of the Indian Medical Council Act, 1956 stands dissolved thereafter.'
              )}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/register')}
              sx={{ margin: '16px 0 32px' }}
            >
              {t('Click here to Login or Register')}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroBanner;
