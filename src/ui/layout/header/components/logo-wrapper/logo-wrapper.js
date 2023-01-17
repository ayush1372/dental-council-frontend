import { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Container, Grid, Link, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DigitalIndia from '../../../../../assets/images/logo-slider/digital-India.png';
import { logout, resetCommonReducer } from '../../../../../store/reducers/common-reducers';
import { Button } from '../../../../core';
import { LoginRegisterPopover } from './login-register-popover/login-register-popover';

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
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: theme.palette.primary.main,
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
    bar: {
      position: 'absolute',
      content: '',
      zIndex: '9',
      width: '25px',
      height: '3px',
      left: '8px',
      backgroundColor: theme.palette.white.main,

      '&:nth-child(2)': {
        transform: 'translateY(10px)',
      },
      '&:nth-child(3)': {
        transform: 'translateY(20px)',
      },
    },
    logoImage: {
      height: '72px',
    },
  }));
  const classes = useStyles(theme);

  return (
    <Container sx={{ position: 'relative' }}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} my={1}>
          <Grid container>
            <Grid item xs={4}>
              <Grid item xs={12}>
                <Link to="/" onClick={() => navigate('/')}>
                  <Typography
                    fontWeight="600"
                    variant={{ xs: 'body3', md: 'subtitle2' }}
                    lineHeight={{ xs: '18px', md: '22px' }}
                    sx={{ cursor: 'pointer' }}
                  >
                    {'राष्ट्रीय आयुर्विज्ञान आयोग'}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link onClick={() => navigate('/')}>
                  <Typography
                    fontWeight="600"
                    variant={{ xs: 'body3', md: 'subtitle2' }}
                    lineHeight={{ xs: '18px', md: '22px' }}
                    sx={{ cursor: 'pointer' }}
                  >
                    {'NATIONAL MEDICAL COMMISSION'}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={8}>
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
