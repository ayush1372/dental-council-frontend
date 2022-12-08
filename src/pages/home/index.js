import Divider from '@mui/material/Divider';
import { ToastContainer } from 'react-toastify';

import LogoSlider from '../../shared/logo-slider/logo-slider';

export function Home() {
  return (
    <div data-testid="homepage">
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
