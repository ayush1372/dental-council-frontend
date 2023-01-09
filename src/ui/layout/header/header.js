import 'react-toastify/dist/ReactToastify.css';

import { Box } from '@mui/material';

import { LogoWrapper } from './components/logo-wrapper/logo-wrapper';
import Navbar from './components/navigation/navbar';
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
