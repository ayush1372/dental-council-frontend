import { Fragment, useState } from 'react';

import { Box, Drawer, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import ProfileImage from '../../../../../pages/profile/components/profile-image/profile-image';
import SideDrawerList from '../../../../../shared/sidebar-drawer/sidebar-drawer-list';
import {
  colgTabs,
  doctorTabs,
  nmcTabs,
  smcTabs,
} from '../../../../../shared/sidebar-drawer/sidebar-drawer-list-item';
import { changeUserActiveTab } from '../../../../../store/reducers/common-reducers';

import styles from './logo-wrapper.module.scss';

export const MobileDrawer = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.common.isloggedIn);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);

  const [state, setState] = useState({
    left: false,
  });
  const [isActiveTab, setIsActiveTab] = useState(
    loggedInUserType === 'Doctor'
      ? doctorTabs[0].tabName
      : loggedInUserType === 'College' || loggedInUserType === 'SMC' || loggedInUserType === 'NMC'
      ? colgTabs[0].tabName
      : ''
  );

  const setActiveTab = (activeTab) => {
    setIsActiveTab(activeTab);
    dispatch(changeUserActiveTab(activeTab));
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      {loggedIn && (
        <div>
          {['left'].map((anchor) => (
            <Fragment key={anchor} display={{ xs: 'flex', md: 'none', lg: 'none' }}>
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
                          ? 'Dr. ABC'
                          : loggedInUserType === 'College'
                          ? 'IP University'
                          : loggedInUserType === 'NMC'
                          ? 'National Medical Commission'
                          : loggedInUserType === 'SMC'
                          ? 'Maharashtra Medical Council'
                          : loggedInUserType !== 'Doctor' &&
                            loggedInUserType !== 'College' &&
                            loggedInUserType !== 'SMC' &&
                            loggedInUserType !== 'NMC'
                          ? 'Dr. ABC'
                          : null
                      }
                    />
                  </Grid>

                  <SideDrawerList
                    open={anchor}
                    DrawerOptions={
                      loggedInUserType === 'Doctor'
                        ? doctorTabs
                        : loggedInUserType === 'NMC'
                        ? nmcTabs
                        : loggedInUserType === 'SMC'
                        ? smcTabs
                        : loggedInUserType === 'College'
                        ? colgTabs
                        : ''
                    }
                    handleSwitch={setActiveTab}
                    ActiveOption={isActiveTab}
                  />
                </Box>
              </Drawer>
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};
