import 'react-toastify/dist/ReactToastify.css';

import { Box } from '@mui/material';

import { Navbar } from '../../core/navigation/navigation';
import { LogoWrapper } from './components/logo-wrapper/logo-wrapper';
import { TopBar } from './components/top-bar/top-bar';

export const Header = () => {
  return (
    <Box>
      <TopBar />
      <LogoWrapper />
      <Navbar />
    </Box>
  );
};
