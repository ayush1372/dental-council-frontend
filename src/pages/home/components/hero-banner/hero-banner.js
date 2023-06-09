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
              {t('National Medical Register (NMR)')}
            </Typography>
            <Typography variant="body1" color="textPrimary" component="div" mb={2}>
              {t(
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.`
              )}
            </Typography>
            <Typography component="div">(This data is for sample purposes only.)</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroBanner;
