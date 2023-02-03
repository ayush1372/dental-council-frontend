import { useEffect, useState } from 'react';

import { Box, CssBaseline, Grid, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { colgTabs, doctorTabs } from '../../helpers/components/sidebar-drawer-list-item';
import { sideBarTabs } from '../../helpers/functions/common-functions';
import { changeUserActiveTab } from '../../store/reducers/common-reducers';
import MiniDrawer from './components/profile-sidebar/profile-sidebar';
import ProfileTabContainer from './components/profile-sidebar/profile-tab-container';

export function Profile() {
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);

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

  useEffect(() => {
    //dispatch(changeUserActiveTab(isActiveTab));
  }, [isActiveTab]);

  useEffect(() => {
    dispatch(
      changeUserActiveTab(
        loggedInUserType === 'Doctor' ? doctorTabs[0].tabName : colgTabs[0].tabName
      )
    );
  }, []);

  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          display="flex"
          width="100%"
          borderRadius="8px"
          p={4}
          bgcolor={theme.palette.grey1.lighter}
          gap={4}
          justifyContent="space-between"
          minHeight={'550px'}
        >
          <Box
            bgcolor={theme.palette.white.main}
            borderRadius="8px"
            display={{ xs: 'none', md: 'flex', lg: 'flex' }}
          >
            <CssBaseline />
            <MiniDrawer
              DrawerOptions={sideBarTabs(loggedInUserType)}
              handleSwitch={setActiveTab}
              ActiveOption={isActiveTab}
            />
          </Box>
          <ProfileTabContainer
            DrawerOptions={sideBarTabs(loggedInUserType)}
            ActiveOption={isActiveTab}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Profile;
