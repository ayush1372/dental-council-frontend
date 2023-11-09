import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// import { useNavigate } from 'react-router-dom';
import BannerImage from '../../../../assets/images/hero-banner-image.png';

import styles from './hero-banner.module.scss';

export function HeroBanner() {
  const { t } = useTranslation();

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
              {t(`Ayushman Bharat Digital Mission`)}
            </Typography>
            <Typography variant="h1" color="primary" mb={2}>
              {t('DENTAL COUNCIL OF INDIA (DCI)')}
            </Typography>
            <Typography variant="body1" color="textPrimary" component="div" mb={2}>
              {t(
                `Dental Council of India is a Statutory Body incorporated under an Act of Parliament viz. The Dentists Act, 1948 (XVI of 1948) to regulate the Dental Education and the profession of Dentistry throughout India and it is financed by the Govt. of India in the Ministry of Health & Family Welfare (Department of Health) through Grant-in-aid. The General Body of the Dental Council of India representing various State Governments, Universities, Dental Colleges, Central Government, etc.`
              )}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroBanner;
