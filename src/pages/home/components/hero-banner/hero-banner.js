import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Container, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import BannerImage from '../../../../assets/images/mainbanner.svg';
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
        <Box display="flex">
          <Box>
            <Typography variant="h1" color="primary" mb={2}>
              {t('Create Ayushman Bharat Health Account -ABHA Number')}
            </Typography>
            <Typography variant="h2" color="primary" mb={2}>
              {t('Creating Indias Digital Health Mission')}
            </Typography>
            <Typography variant="body1" component="div">
              {t('ABHA - Ayushman Bharat Health Account Key To Your Digital Healthcare Journey.')}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/register')}
              sx={{ margin: '16px 0 32px' }}
            >
              {t('Create ABHA Number')}
            </Button>

            <Box display="flex" alignItems="center" justifyContent="flex-start" flexWrap="wrap">
              <Typography width="auto" mr={1}>
                Let&apos;s Know More About ABHA.
              </Typography>
              <Box display="flex" alignItems="center">
                <YouTubeIcon color="youTubeColor" fontSize="large" sx={{ marginRight: '4px' }} />
                <Link underline="always" color="primary" variant="body1" href="#">
                  Click Here to Watch Video
                </Link>
              </Box>
            </Box>
          </Box>
          <img className={styles.bannerImage} src={BannerImage} alt="Hero Banner" />
        </Box>
      </Container>
    </Box>
  );
}

export default HeroBanner;
