import React, { useState } from 'react';

import { Box, Container, Drawer, Grid } from '@mui/material';
import CN from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { colgTabs, doctorTabs } from '../../../helpers/components/sidebar-drawer-list-item.js';
import { sideBarTabs, userGroupType } from '../../../helpers/functions/common-functions.js';
import ProfileImage from '../../../pages/profile/components/profile-image/profile-image';
import SideDrawerList from '../../../shared/sidebar-drawer/sidebar-drawer-list';
import { changeUserActiveTab } from '../../../store/reducers/common-reducers';
import { Menu } from '../menu/menu';

import styles from './navigation.module.scss';

export const Navbar = () => {
  const { nmcProfileData } = useSelector((state) => state.nmc);
  const { collegeData } = useSelector((state) => state.college);
  const { smcProfileData } = useSelector((state) => state.smc);
  const { nbeData } = useSelector((state) => state.nbe);
  const { doctorUserProfile } = useSelector((state) => state.doctorUserProfileReducer);
  const { loginData } = useSelector((state) => state.loginReducer);
  const userType = userGroupType(loginData?.data?.user_group_id);

  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleMenu = () => {
    setShow(!show);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const loggedIn = useSelector((state) => state.common.isloggedIn);
  const dispatch = useDispatch();

  const [isActiveTab, setIsActiveTab] = useState(
    loggedInUserType === 'Doctor'
      ? doctorTabs[0].tabName
      : loggedInUserType === 'College' ||
        loggedInUserType === 'SMC' ||
        loggedInUserType === 'NMC' ||
        loggedInUserType === 'NBE'
      ? colgTabs[0].tabName
      : ''
  );

  const setActiveTab = (activeTab) => {
    setIsActiveTab(activeTab);
    dispatch(changeUserActiveTab(activeTab));
  };

  return (
    <>
      {loggedIn && (
        <div>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor} display={{ xs: 'flex', md: 'none', lg: 'none' }}>
              <Box
                className={styles.menuLeftBar}
                onClick={toggleDrawer(anchor, true)}
                bgcolor={{ md: 'none', lg: 'none' }}
                display={{ xs: 'flex', md: 'none', lg: 'none' }}
              >
                <span></span>
                <span></span>
                <span></span>
              </Box>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                disableBackdropTransition={{ xs: true, md: false, lg: false }}
              >
                <Box
                  sx={{
                    width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
                    display: { md: 'none', lg: 'none' },
                  }}
                  role="presentation"
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                >
                  <Grid container mb={3}>
                    <ProfileImage
                      name={
                        loggedInUserType === 'Doctor'
                          ? doctorUserProfile?.data?.name
                          : loggedInUserType === 'College'
                          ? collegeData?.data?.name
                          : loggedInUserType === 'NMC'
                          ? nmcProfileData?.data?.display_name
                          : loggedInUserType === 'SMC'
                          ? smcProfileData?.data?.display_name
                          : loggedInUserType === 'NBE'
                          ? nbeData?.data?.display_name
                          : null
                      }
                    />
                  </Grid>

                  <SideDrawerList
                    open={anchor}
                    DrawerOptions={sideBarTabs(userType)}
                    handleSwitch={setActiveTab}
                    ActiveOption={isActiveTab}
                  />
                </Box>
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      )}

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
            <Menu dropdown={false} url="/search-doctor">
              {t('Search Doctor')}
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
