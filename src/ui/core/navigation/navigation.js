import { useState } from 'react';

import { Box, Container } from '@mui/material';
import CN from 'clsx';
import { useTranslation } from 'react-i18next';

// import { useNavigate } from 'react-router-dom';
// import { Button } from '../../../ui/core/button/button';
import { Menu } from '../menu/menu';

import styles from './navigation.module.scss';

export const Navbar = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  // const aboutUsOptions = [
  //   { title: 'ABDM', url: 'https://abdm.gov.in/abdm', redirect: true },
  //   { title: 'NHA', url: 'https://abdm.gov.in/nha', redirect: true },
  // ];
  const toggleMenu = () => {
    setShow(!show);
  };
  // const navigate = useNavigate();
  return (
    <>
      <Box className={styles.menuBar} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </Box>
      <Box
        className={CN(styles.navBarWrapper, {
          [styles.show]: show,
        })}
      >
        <Container className={styles.menuBlock}>
          <Box className={styles.menuWrapper}>
            <Menu dropdown={false} url="/">
              {t('About NMR')}
            </Menu>
            <Menu dropdown={false} url="/">
              {t('NMR Act')}
            </Menu>
            <Menu dropdown={false} url="/">
              {t('Rules & Regulations')}
            </Menu>
            {/* <Menu dropdown={true} url="" options={aboutUsOptions}>
              {t('About ABDM')}
            </Menu> */}
            <Menu dropdown={false} url="/">
              {t('Information Desk')}
            </Menu>
            <Menu dropdown={false} url="/">
              {t('Media Room')}
            </Menu>
            <Menu dropdown={false} url="/">
              {t('E-Gazette')}
            </Menu>
            <Menu dropdown={false} url="/">
              {t('Photo Gallery')}
            </Menu>
            {/* <Button
              sx={{ p: '8px 24px' }}
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate('/facility');
              }}
            >
              {t('Facility Login')}
            </Button> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};
