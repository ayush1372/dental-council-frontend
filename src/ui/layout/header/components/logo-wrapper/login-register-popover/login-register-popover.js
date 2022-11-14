/* eslint-disable no-console */
import { useState } from 'react';

import { Box, Checkbox, Container, FormControlLabel, Grid, Popover } from '@mui/material';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../../core';

import styles from '../login-register-popover/login-register-popover.module.scss';

console.log('syle', styles);

export const LoginRegisterPopover = ({
  openLoginRegisterPopover,
  anchorLRLoginRgister,
  setAnchorLRLoginRegister,
}) => {
  const navigate = useNavigate();
  // const { t } = useTranslation();

  /** Login Register */

  const [regType, setRegType] = useState('');
  const [regTypeError, setRegTypeError] = useState(false);
  const [anchorLR, setAnchorLR] = useState(null);

  const open = Boolean(anchorLR);

  const id = open ? 'simple-popover' : undefined;

  const handleClose = () => {
    setAnchorLR(null);
    setAnchorLRLoginRegister(null);
    // handleCloseNavMenu();
  };

  const onClickRecruitingAgentHandler = () => {
    if (regType !== '') {
      setRegTypeError(false);
      if (regType === 'Doctor') {
        navigate('/register/doctor-registration');
      } else if (regType === 'College') {
        navigate('/register/college-registration');
      }
      // else if (regType === 'SMC') {
      //   navigate('/register/smc');
      // } else if (regType === 'NMC') {
      //   navigate('/register/nmc');
      // }
      setAnchorLRLoginRegister(null);
      setRegType('');
    } else {
      setRegTypeError(true);
    }
  };

  const onClickLoginHandler = () => {
    if (regType !== '') {
      if (regType === 'Doctor') {
        navigate('/login-page', { state: { loginFormname: 'Doctor' } });
      } else if (regType === 'College') {
        navigate('/login-page', { state: { loginFormname: 'College' } });
      } else if (regType === 'SMC') {
        navigate('/login-page', { state: { loginFormname: 'SMC' } });
      } else if (regType === 'NMC') {
        navigate('/login-page', { state: { loginFormname: 'NMC' } });
      }
      setAnchorLRLoginRegister(null);
      setRegType('');
    } else {
      setRegTypeError(true);
    }
  };

  return (
    <Container>
      <Popover
        id={id}
        open={openLoginRegisterPopover}
        keepMounted
        anchorEl={anchorLRLoginRgister}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={styles.loginRegWrapper}
      >
        <Box className={styles.lrPopover}>
          <Grid container>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<RiCheckboxBlankCircleLine />}
                      checkedIcon={<RiCheckboxCircleFill />}
                      checked={regType === 'Doctor'}
                      onChange={() => {
                        setRegType('Doctor');
                        setRegTypeError(false);
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Doctor"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<RiCheckboxBlankCircleLine />}
                      checkedIcon={<RiCheckboxCircleFill />}
                      checked={regType === 'College'}
                      onChange={() => {
                        setRegType('College');
                        setRegTypeError(false);
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="College"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<RiCheckboxBlankCircleLine />}
                      checkedIcon={<RiCheckboxCircleFill />}
                      checked={regType === 'SMC'}
                      onChange={() => {
                        setRegType('SMC');
                        setRegTypeError(false);
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="SMC"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<RiCheckboxBlankCircleLine />}
                      checkedIcon={<RiCheckboxCircleFill />}
                      checked={regType === 'NMC'}
                      onChange={() => {
                        setRegType('NMC');
                        setRegTypeError(false);
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="NMC"
                />
              </Grid>
            </Grid>
            <Grid item container>
              {regTypeError && (
                <Box color="error.main" fontSize={'small'}>
                  {'Please select one option'}
                </Box>
              )}
            </Grid>
            <Grid item container className={styles.rlButttonContainer}>
              {/* //  recruiter-Reg-Log-Btn"> */}
              <Grid item xs={12}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: 'orangeBackgroundColor.main',
                    '&:hover': {
                      backgroundColor: 'orangeBackgroundColor.main',
                    },
                  }}
                  // className={styles.registerButton}
                  onClick={() => onClickRecruitingAgentHandler()}
                  disabled={regType === 'SMC' || regType === 'NMC'}
                >
                  Register
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: 'white.main',
                    ml: 2,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'white.main',
                    },
                  }}
                  onClick={() => {
                    onClickLoginHandler();
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </Container>
  );
};
