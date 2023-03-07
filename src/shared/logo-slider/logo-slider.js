import { Box, Container, Link } from '@mui/material';

import DIGITALINDIALOGO from '../../assets/images/logo-slider/digital-India.png';
import INDIAGOVLOGO from '../../assets/images/logo-slider/Indiagovin.png';
import MINISTRYOFIT from '../../assets/images/logo-slider/ministry-of-electronics-it.png';
import MINISTRYOFHEALTH from '../../assets/images/logo-slider/ministry-of-health-India-logo.svg';
import NHAENGLISHLOGO from '../../assets/images/logo-slider/nha-english-logo.png';

export function LogoSlider() {
  return (
    <Container>
      <Box my={6} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Link flexBasis="20%" href="https://nha.gov.in/" target="_blank" rel="noreferrer">
          <img src={NHAENGLISHLOGO} alt="NHA English Logo" />
        </Link>
        <Link flexBasis="20%" href="https://www.mohfw.gov.in/" target="_blank" rel="noreferrer">
          <img src={MINISTRYOFHEALTH} alt="NHA English Logo" height="90px" />
        </Link>
        <Link flexBasis="20%" href="https://www.meity.gov.in/" target="_blank" rel="noreferrer">
          <img src={MINISTRYOFIT} alt="NHA English Logo" />
        </Link>
        <Link flexBasis="20%" href="https://www.india.gov.in/" target="_blank" rel="noreferrer">
          <img src={INDIAGOVLOGO} alt="NHA English Logo" height="90px" />
        </Link>
        <Link
          flexBasis="20%"
          href="https://www.digitalindia.gov.in/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={DIGITALINDIALOGO} alt="NHA English Logo" height="90px" />
        </Link>
      </Box>
    </Container>
  );
}

export default LogoSlider;
