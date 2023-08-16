//import { ArrowUpwardOutlined } from '@material-ui/icons';
import { Box, Container, Link, useTheme } from '@mui/material';

//import { useTranslation } from 'react-i18next';
import DIGITALINDIALOGO from '../../assets/images/logo-slider/digital-india.svg';
import DIGITALINDIALOGOWHITE from '../../assets/images/logo-slider/digital-india-white.svg';
import MINISTRYOFIT from '../../assets/images/logo-slider/eit-black.svg';
import MINISTRYOFITWHITE from '../../assets/images/logo-slider/eit-white.svg';
import MINISTRYOFHEALTH from '../../assets/images/logo-slider/hfw-black.svg';
import MINISTRYOFHEALTHWHITE from '../../assets/images/logo-slider/hfw-white.svg';
import INDIAGOVLOGO from '../../assets/images/logo-slider/ind-gov-in-normal.svg';
import INDIAGOVLOGOWHITE from '../../assets/images/logo-slider/ind-gov-in-white.svg';
import NHAENGLISHLOGO from '../../assets/images/logo-slider/nha-black.svg';
import NHAENGLISHLOGOWHITE from '../../assets/images/logo-slider/nha-white.svg';
//import ScrollTop from '../../helpers/components/scroll-top';
//import { Button } from '../../ui/core';

export function LogoSlider() {
  //const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Container>
      <Box
        display="flex"
        justifyContent={{ xs: 'flex-start', md: 'space-between' }}
        alignItems="center"
        flexWrap="wrap"
        py={1}
      >
        <Link
          flexBasis={{ xs: '33%', md: '20%' }}
          href="https://nha.gov.in/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={theme.palette.mode === 'dark' ? NHAENGLISHLOGOWHITE : NHAENGLISHLOGO}
            alt="NHA English Logo"
          />
        </Link>
        <Link
          flexBasis={{ xs: '33%', md: '20%' }}
          href="https://www.mohfw.gov.in/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={theme.palette.mode === 'dark' ? MINISTRYOFHEALTHWHITE : MINISTRYOFHEALTH}
            alt="NHA English Logo"
            height="90px"
          />
        </Link>
        <Link
          flexBasis={{ xs: '33%', md: '20%' }}
          href="https://www.meity.gov.in/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={theme.palette.mode === 'dark' ? MINISTRYOFITWHITE : MINISTRYOFIT}
            alt="NHA English Logo"
          />
        </Link>
        <Link
          flexBasis={{ xs: '33%', md: '20%' }}
          href="https://www.india.gov.in/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={theme.palette.mode === 'dark' ? INDIAGOVLOGOWHITE : INDIAGOVLOGO}
            alt="NHA English Logo"
            height="90px"
          />
        </Link>
        <Link
          flexBasis={{ xs: '33%', md: '20%' }}
          href="https://www.digitalindia.gov.in/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={theme.palette.mode === 'dark' ? DIGITALINDIALOGOWHITE : DIGITALINDIALOGO}
            alt="NHA English Logo"
            height="90px"
          />
        </Link>
      </Box>
      {/* <Box display="flex" justifyContent={'flex-end'} mb={2} onClick={ScrollTop}>
        <Button variant="contained" color="primary">
          <Typography mr={1}>{t('common.home.btn_back_to_top')}</Typography>
          <ArrowUpwardOutlined />
        </Button>
      </Box> */}
    </Container>
  );
}

export default LogoSlider;
