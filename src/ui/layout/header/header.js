import 'react-toastify/dist/ReactToastify.css';

import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { menuToggle } from '../../../store/reducers/nav-menu-reducer';
import { LogoWrapper } from './components/logo-wrapper/logo-wrapper';
import Navbar from './components/navigation/navbar';
import { TopBar } from './components/top-bar/top-bar';

export const Header = () => {
  const dispatch = useDispatch();
  const { menuOpen } = useSelector((state) => state.navMenu);
  const menuToggleHandler = () => {
    dispatch(menuToggle(!menuOpen));
  };
  return (
    <Box>
      <TopBar />
      <LogoWrapper menuToggleHandler={menuToggleHandler} />
      <Navbar />
    </Box>
  );
};
