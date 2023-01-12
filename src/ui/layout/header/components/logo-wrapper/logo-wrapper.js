import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Container, Grid, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DigitalIndia from '../../../../../assets/images/logo-slider/digital-India.png';
import { logout, resetCommonReducer } from '../../../../../store/reducers/common-reducers';
// import { uiActions } from '../../../../../store/reducers/nav-menu-reducer';
import { Button } from '../../../../core';
import { LoginRegisterPopover } from './login-register-popover/login-register-popover';

import styles from './logo-wrapper.module.scss';

export const LogoWrapper = () => {
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

  // const { menuOpen } = useSelector((state) => state.ui);

  // const menuToggleHandler = () => {
  //   dispatch(uiActions.menuToggle());
  // };
  // const menuCloseHandler = () => {
  //   if (menuOpen) dispatch(uiActions.menuClose());
  // };

  return (
    <Container>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} my={1}>
          <Grid container>
            <Grid item xs={4}>
              <Grid item xs={12}>
                <Link to="/" onClick={() => navigate('/')}>
                  <Typography variant="subtitle2" sx={{ cursor: 'pointer' }}>
                    {'राष्ट्रीय आयुर्विज्ञान आयोग'}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link onClick={() => navigate('/')}>
                  <Typography variant="subtitle2" sx={{ cursor: 'pointer' }}>
                    {'NATIONAL MEDICAL COMMISSION'}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Link onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <img className={styles.logoImage} src={DigitalIndia} alt="Digital logo" />
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} sm={6} item alignItems="center" textAlign="right">
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
    </Container>
  );
};
