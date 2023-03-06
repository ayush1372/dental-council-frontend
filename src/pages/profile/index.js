import { useEffect, useState } from 'react';

import { Box, CssBaseline, Grid, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { colgTabs, doctorTabs } from '../../helpers/components/sidebar-drawer-list-item';
import { sideBarTabs, userGroupTypeForSession } from '../../helpers/functions/common-functions';
import {
  getCountriesList,
  getCoursesList,
  getLanguagesList,
  getRegistrationCouncilList,
  getSpecialitiesList,
  getStatesList,
  getUniversitiesList,
} from '../../store/actions/common-actions';
import { changeUserActiveTab, userLoggedInType } from '../../store/reducers/common-reducers';
import MiniDrawer from './components/profile-sidebar/profile-sidebar';
import ProfileTabContainer from './components/profile-sidebar/profile-tab-container';

export function Profile() {
  const dispatch = useDispatch();
  // const loggedInUserType = 'Doctor';
  // const { loginData } = useSelector((state) => state.loginReducer);

  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  // const { loginData } = useSelector((state) => state.loginReducer);
  let userType;

  if (localStorage.getItem('accesstoken')) {
    let base64Url = localStorage.getItem('accesstoken')?.split('.')[1];
    let base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload;
    if (base64) {
      jsonPayload = decodeURIComponent(
        window
          ?.atob(base64)
          ?.split('')
          ?.map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          ?.join('')
      );
    }

    userType = userGroupTypeForSession(JSON.parse(jsonPayload)?.authorities[0]);

    let type = '';

    if (JSON.parse(jsonPayload)?.authorities[0] === 'ROLE_HEALTH_PROFESSIONAL') type = 'Doctor';
    if (
      JSON.parse(jsonPayload)?.authorities[0] === 'ROLE_COLLEGE_ADMIN' ||
      JSON.parse(jsonPayload)?.authorities[0] === 'ROLE_COLLEGE_DEAN' ||
      JSON.parse(jsonPayload)?.authorities[0] === 'ROLE_COLLEGE_REGISTRAR'
    )
      type = 'College';
    if (JSON.parse(jsonPayload)?.authorities[0] === 'ROLE_SMC') type = 'SMC';
    if (JSON.parse(jsonPayload)?.authorities[0] === 'ROLE_NMC') type = 'NMC';

    dispatch(userLoggedInType(type));
  }

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

  useEffect(() => {
    // making api calls which are independent of dependencies.

    dispatch(getLanguagesList());
    dispatch(getCoursesList());
    dispatch(getUniversitiesList());
    dispatch(getSpecialitiesList());
    dispatch(getStatesList());
    dispatch(getCountriesList());
    dispatch(getRegistrationCouncilList());
  }, [loggedInUserType]);
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
              DrawerOptions={sideBarTabs(userType)}
              handleSwitch={setActiveTab}
              ActiveOption={isActiveTab}
            />
          </Box>
          <ProfileTabContainer DrawerOptions={sideBarTabs(userType)} ActiveOption={isActiveTab} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Profile;
