import Divider from '@mui/material/Divider';
import { ToastContainer } from 'react-toastify';

import LogoSlider from '../../shared/logo-slider/logo-slider';
import BenefitsOfAbha from './components/benefits-of-abha/benefits-of-abha';
import FundamentalsOfAbha from './components/fundamentals-of-abha/fundamentals-of-abha';
import HeroBanner from './components/hero-banner/hero-banner';

import styles from './home.module.scss';
// import { useTranslation } from 'react-i18next';

export function Home() {
  // const { data } = useGet(ApiUrl.contactUs);
  // const { t } = useTranslation();

  return (
    <div className={styles.main} data-testid="homepage">
      <HeroBanner />
      <BenefitsOfAbha />
      <FundamentalsOfAbha />
      <Divider
        variant="fullWidth"
        component="div"
        sx={{ boxShadow: '0 1px 3px #00000054', margin: { xs: '30px 0', md: '80px 0' } }}
      />
      <LogoSlider />
      <ToastContainer></ToastContainer>
    </div>
  );
}

// export default Home;
