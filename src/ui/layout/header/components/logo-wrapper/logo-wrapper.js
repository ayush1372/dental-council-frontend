import { useState } from 'react';

import { Container, Grid, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import NHALOGO from '../../../../../assets/images/logo-slider/nha-english-logo.png';
import DigitalIndia from '../../../../../assets/images/logo-slider/digital-India.png';
import { logout, resetLoginReducer } from '../../../../../store/reducers/common-reducers';
import { Button } from '../../../../core';
import { LoginRegisterPopover } from './login-register-popover/login-register-popover';

import styles from './logo-wrapper.module.scss';

export const LogoWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login.isloggedIn);
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
    dispatch(resetLoginReducer());
    navigate('/');
  };

  return (
    <Container className={styles.logoWrapper}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid item xs={4}>
              <Grid item xs={12}>
                <Link onClick={() => navigate('/')} className={styles.logoHeaderText}>
                  {'राष्ट्रीय आयुर्विज्ञान आयोग'}
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link onClick={() => navigate('/')} className={styles.logoHeaderText}>
                  {'NATIONAL MEDICAL COMMISSION'}
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Link onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
                <img className={styles.logoImage} src={DigitalIndia} alt="NHA logo" />
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
              sx={{ fontSize: 'small' }}
              onClick={handleClickedLogout}
            >
              {t('Logout')}
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="grey"
                sx={{ fontSize: 'small' }}
                onClick={handleClickLoginRegister}
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
