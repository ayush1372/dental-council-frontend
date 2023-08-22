import { Fragment, useState } from 'react';

import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import { Box, Drawer, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { colgTabs, doctorTabs } from '../../../../../helpers/components/sidebar-drawer-list-item';
import { sideBarTabs, userGroupType } from '../../../../../helpers/functions/common-functions';
import ProfileImage from '../../../../../pages/profile/components/profile-image/profile-image';
import SideDrawerList from '../../../../../shared/sidebar-drawer/sidebar-drawer-list';
import { changeUserActiveTab } from '../../../../../store/reducers/common-reducers';

import styles from './logo-wrapper.module.scss';

export const MobileDrawer = () => {
  const { nmcProfileData } = useSelector((state) => state.nmc);
  const { collegeData } = useSelector((state) => state.college);
  const { smcProfileData } = useSelector((state) => state.smc);
  const { nbeData } = useSelector((state) => state.nbe);
  const { personalDetails } = useSelector((state) => state.doctorUserProfileReducer);

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.common.isloggedIn);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { loginData } = useSelector((state) => state.loginReducer);
  const userType = userGroupType(loginData?.data?.user_group_id);

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
                // bgcolor={{ md: 'none', lg: 'none' }}
                display={{ xs: 'flex', md: 'none', lg: 'none' }}
              >
                {/* <span></span>
                <span></span>
                <span></span> */}
                <MenuOpenOutlinedIcon sx={{ fontSize: '34px', color: 'primary.main' }} />
              </Box>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                disableBackdropTransition={{ xs: true, md: false, lg: false }}
              >
                {/* commented onClick and onKeyDown as child components are not working/rendering on UI  from left panel for mobile view */}
                <Box
                  sx={{
                    width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
                    display: { md: 'none', lg: 'none' },
                  }}
                  role="presentation"
                  // onClick={toggleDrawer(anchor, false)}
                  // onKeyDown={toggleDrawer(anchor, false)}
                >
                  <Grid container mb={3}>
                    <ProfileImage
                      name={
                        loggedInUserType === 'Doctor'
                          ? personalDetails?.personal_details?.full_name
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
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};
