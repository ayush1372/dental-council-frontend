import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import BannerImage1 from '../../../../assets/images/health_minister.png';
// import { useNavigate } from 'react-router-dom';
import BannerImage2 from '../../../../assets/images/pm_modi.png';

import styles from './hero-banner.module.scss';

export function HeroBanner() {
  const { t } = useTranslation();

  return (
    <Box
      p={{ md: '0', xs: '30px 0' }}
      sx={{ backgroundColor: 'backgroundColor.main' }}
      className={styles.heroBannerBox}
    >
      <Container className={styles.bannerWrapper}>
        <Grid container spacing={3} direction={{ xs: 'column', sm: 'row' }}>
          <Grid item xs={12} sm={2.7} mt={13}>
            <img className={styles.bannerImage1} src={BannerImage1} alt="Hero Banner 1" />
          </Grid>
          <Grid item xs={12} sm={5.5} mt={10}>
            <Typography variant="h1" color="primary" mb={2}>
              {t('National Dental Register')}
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              component="div"
              mb={2}
              sx={{ textAlign: 'justify' }}
            >
              {t(
                `National Dental Register (NDR) is dynamic database of all the dentists in India, which would capture data of dental professionals covering their journey in dentistry. NDR will provide Unique Identifier to all the dentists practicing in India, after verification from respective State Dental Council. Once verified, the professional also gets registered in Healthcare Professional Registry (HPR) and a unique Healthcare Professional Identifier (HPR ID) is generated. It would counter the challenges regarding interstate movement of dentists, duplicate registration across state, complex renewal process etc.The NDR will also help citizens to identify the Dental Professionals verified by the State Dental Councils and will facilitate the improvement in dentalcare delivery across the country.`
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={0.3}></Grid>
          <Grid item xs={12} sm={3.15} mt={3}>
            <img className={styles.bannerImage2} src={BannerImage2} alt="Hero Banner 2" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroBanner;
