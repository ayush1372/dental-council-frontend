import { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ABDMLogo from '../../../../../assets/images/logo-slider/ABDM_logo.svg';
import G20Logo from '../../../../../assets/images/logo-slider/G20.svg';
import NmcLogo from '../../../../../assets/images/logo-slider/NMC_logo.svg';
import { IdleTimer } from '../../../../../helpers/components/idle-timer';
import { colgTabs, doctorTabs } from '../../../../../helpers/components/sidebar-drawer-list-item';
import {
  changeUserActiveTab,
  logout,
  resetCommonReducer,
} from '../../../../../store/reducers/common-reducers';
import { resetDoctorProfileReducer } from '../../../../../store/reducers/doctor-user-profile-reducer';
import { Button } from '../../../../core';
import { LoginRegisterPopover } from './login-register-popover/login-register-popover';
import { MobileDrawer } from './mobile-drawer';

export const LogoWrapper = ({ menuToggleHandler }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = localStorage.getItem('accesstoken');

  const { nbeData } = useSelector((state) => state.nbe);
  const { smcProfileData } = useSelector((state) => state.smc);
  const { nmcProfileData } = useSelector((state) => state.nmc);
  const { collegeData } = useSelector((state) => state.college);
  const userLoggedIn = useSelector((state) => state.common.isloggedIn);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);

  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { personal_details } = personalDetails || {};

  const { profile_photo, full_name } = personal_details || {};

  const [anchorElUser, setAnchorElUser] = useState(null);

  let options = [
    { name: 'Dashboard', url: '/profile' },
    { name: 'Logout', url: '/' },
  ];

  /** Login Register */

  const [regType, setRegType] = useState('');

  const [anchorLRLoginRgister, setAnchorLRLoginRegister] = useState(null);
  const openLoginRegisterPopover = Boolean(anchorLRLoginRgister);

  const handleClickLoginRegister = (event) => {
    setRegType('');
    setAnchorLRLoginRegister(event.currentTarget);
  };

  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    hamburger: {
      display: 'none',
      position: 'absolute',
      width: '42px',
      height: '39px',
      padding: '8px',
      right: '16px',
      top: '12%',
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
    bar: {
      position: 'absolute',
      content: '',
      zIndex: '9',
      width: '26px',
      height: '3px',
      left: '8px',
      backgroundColor: theme.palette.primary.main,

      '&:nth-child(2)': {
        transform: 'translateY(8px)',
      },
      '&:nth-child(3)': {
        transform: 'translateY(16px)',
      },
    },
    logoImage: {
      // height: '72px',
      [theme.breakpoints.down('md')]: {
        height: '60px',
      },
      [theme.breakpoints.down('sm')]: {
        height: '48px',
      },
      [theme.breakpoints.down('xs')]: {
        height: '36px',
      },
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.6)',
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: '9999',
    },
  }));
  const classes = useStyles(theme);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavigation = (optionType) => {
    handleCloseUserMenu();

    if (optionType === 'Logout') {
      dispatch(logout());
      dispatch(resetCommonReducer());
      dispatch(resetDoctorProfileReducer());
      localStorage.clear();
      navigate('/');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else if (optionType === 'Dashboard') {
      loggedInUserType === 'Doctor'
        ? dispatch(changeUserActiveTab(doctorTabs[0].tabName))
        : dispatch(changeUserActiveTab(colgTabs[0].tabName));

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Container maxWidth={userLoggedIn ? '1920px' : '1900px'} sx={{ position: 'relative' }}>
      <MobileDrawer />
      {loggedIn && <IdleTimer />}

      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} my={1} pl={loggedIn && { xs: 7, md: 0 }}>
          <Grid container>
            <Grid item xs="auto" mr={2}>
              <Link onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <img
                  src={NmcLogo}
                  className={classes.logoImage}
                  alt="NATIONAL MEDICAL COMMISSION"
                />
              </Link>
            </Grid>
            <Grid item xs="auto" mr={2}>
              <Link onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <img className={classes.logoImage} src={ABDMLogo} alt="Digital logo" />
              </Link>
            </Grid>
            <Grid item xs="auto">
              <Link onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <img className={classes.logoImage} src={G20Logo} alt="G20 logo" />
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          xs={12}
          md={6}
          item
          alignItems="center"
          textAlign={{ xs: 'left', md: 'right' }}
          my={{ xs: 2, md: 0 }}
        >
          {loggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, cursor: 'pointer', gap: 1 }}
                disableRipple
              >
                <Avatar
                  src={
                    loggedInUserType === 'Doctor'
                      ? profile_photo
                        ? `data:image/jpeg;base64,${profile_photo}`
                        : null
                      : null
                  }
                />
                <Typography variant="subtitle1" color="tabHighlightedBackgroundColor.main">
                  {loggedInUserType === 'Doctor'
                    ? full_name
                    : loggedInUserType === 'College'
                    ? collegeData?.data?.name
                    : loggedInUserType === 'NMC'
                    ? nmcProfileData?.data?.display_name
                    : loggedInUserType === 'SMC'
                    ? smcProfileData?.data?.display_name
                    : loggedInUserType === 'NBE'
                    ? nbeData?.data?.display_name
                    : null}
                </Typography>
                {anchorElUser ? (
                  <KeyboardArrowUp color="primary" />
                ) : (
                  <KeyboardArrowDown color="primary" />
                )}
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {options.map((option) => (
                  <MenuItem key={option.name} onClick={() => handleNavigation(option.name)}>
                    <Typography>
                      {option.name === 'Dashboard'
                        ? loggedInUserType === 'Doctor'
                          ? 'My Profile'
                          : option.name
                        : option.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleClickLoginRegister}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {'Login/Registration'}
              </Button>
              <LoginRegisterPopover
                regType={regType}
                openLoginRegisterPopover={openLoginRegisterPopover}
                anchorLRLoginRgister={anchorLRLoginRgister}
                setAnchorLRLoginRegister={setAnchorLRLoginRegister}
              />
            </>
          )}
        </Grid>
      </Grid>

      <Box className={classes.hamburger} onClick={menuToggleHandler}>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
      </Box>
    </Container>
  );
};
