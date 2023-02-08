import { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Container, Grid, Link, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DigitalIndia from '../../../../../assets/images/logo-slider/digital-India.png';
import NmcLogo from '../../../../../assets/images/logo-slider/nmc-logo.png';
import { IdleTimer } from '../../../../../helpers/components/idle-timer';
import { logout, resetCommonReducer } from '../../../../../store/reducers/common-reducers';
import { Button } from '../../../../core';
import { LoginRegisterPopover } from './login-register-popover/login-register-popover';
import { MobileDrawer } from './mobile-drawer';

export const LogoWrapper = ({ menuToggleHandler }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.common.isloggedIn);

  const { t } = useTranslation();

  /** Login Register */

  const [regType, setRegType] = useState('');

  const [anchorLRLoginRgister, setAnchorLRLoginRegister] = useState(null);
  const openLoginRegisterPopover = Boolean(anchorLRLoginRgister);

  const handleClickLoginRegister = (event) => {
    setRegType('');
    setAnchorLRLoginRegister(event.currentTarget);
  };

  const handleClickedLogout = () => {
    dispatch(logout());
    dispatch(resetCommonReducer());
    localStorage.clear();
    navigate('/');
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
      height: '72px',
      [theme.breakpoints.down('md')]: {
        height: '60px',
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

  return (
    <Container sx={{ position: 'relative' }}>
      <MobileDrawer />
      {loggedIn && <IdleTimer />}

      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} my={1} pl={loggedIn && { xs: 7, md: 0 }}>
          <Grid container>
            <Grid item xs="auto">
              <Link onClick={() => navigate('/')}>
                <img
                  className={classes.logoImage}
                  src={NmcLogo}
                  alt="NATIONAL MEDICAL COMMISSION"
                />
              </Link>
            </Grid>
            <Grid item xs="auto">
              <Link onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <img className={classes.logoImage} src={DigitalIndia} alt="Digital logo" />
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
            <Button
              variant="contained"
              color="grey"
              data-testid="logoutbtn"
              size="medium"
              onClick={handleClickedLogout}
            >
              {t('Logout')}
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="grey"
                size="medium"
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
