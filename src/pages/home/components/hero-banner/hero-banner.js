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
            <Typography variant="h1" color="primary" mb={2}>
              {t('National Dental Register')}
            </Typography>
            <Typography variant="body1" color="textPrimary" component="div" mb={2}>
              {t(
                `National Dental Register (NDR) is dynamic database of all the dentist in India, which would capture  data of dental professional covering his journey in dentistry. NDR will provide Unique Identifier (DCI ID) to all the dentists practicing in India after verification from respective State Dental Council. Once verified, the professional also gets registered in Healthcare Professional Registry (HPR) and a unique Healthcare Professional Identifier (HPR ID) is generated. It would counter the challenges regarding interstate movement of dentists, duplicate registration across state, complex renewal process etc.`
              )}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroBanner;
