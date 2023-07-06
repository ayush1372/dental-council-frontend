import { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import ApprovedApplication from '../../../../assets/images/application-approved.svg';
import ApplicationForwarded from '../../../../assets/images/application-forwarded.svg';
import RaisedApplication from '../../../../assets/images/application-raised.svg';
import RejectedApplication from '../../../../assets/images/application-rejected.svg';
import PendingApplication from '../../../../assets/images/pending-application.svg';
import RegistrationRequest from '../../../../assets/images/registration-request.svg';
import SuspensionRequest from '../../../../assets/images/suspension-request.svg';
import TotalRegReq from '../../../../assets/images/total-registration-request.svg';
import UpdationRequest from '../../../../assets/images/updation-request.png';
import {
  registrationRequestMapper,
  suspensionRequestMapper,
  updationRequestMapper,
} from '../../../../constants/common-data';
import ViewProfile from '../../../../shared/view-profile/view-profile';
import { getCardCount } from '../../../../store/actions/dashboard-actions';
import {
  navigateDashboard,
  setBreadcrumbsActivetab,
} from '../../../../store/reducers/common-reducers';
import { Button } from '../../../../ui/core';
import UserProfile from '../../../user-profile/index';
import BreadcrumbsCompnent from '../breadcrums';
import DashboardControlledTable from '../dashboard-controlled-table/dashboard-controlled-table';

export default function Dashboard() {
  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const breadcrumbsActive = useSelector((state) => state.common.breadcrumbsActivetab);
  const { count } = useSelector((state) => state.dashboard);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [showViewProfile, setShowViewPorfile] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState();
  const [selectedRowData, setSelectedRowData] = useState();
  const dispatch = useDispatch();
  const { redirectDashboard } = useSelector((state) => state.common);

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: '5px !important',
    borderTopWidth: 'thick',
    cursor: 'pointer',
    height: '100%',
    [theme.breakpoints.down('xl')]: {
      padding: theme.spacing(2),
    },
  }));

  const useStyles = makeStyles(() => ({
    iconImage: {
      [theme.breakpoints.down('xl')]: {
        width: '30px',
        height: '30px',
      },
    },
    requestIcon: {
      width: '40px',
      height: '40px',
    },
  }));
  const classes = useStyles(theme);

  let registrationRequestData = getDataFromResponse(
    count,
    registrationRequestMapper,
    'hp_registration_request'
  );

  let updationRequestData = getDataFromResponse(
    count,
    updationRequestMapper,
    'hp_modification_request'
  );
  let suspensionRequestData = getDataFromResponse(
    count,
    suspensionRequestMapper,
    'consolidated_suspension_request'
  );

  let dashboard = {
    'Registration Request': registrationRequestData,
    'Updation Request': updationRequestData,
  };

  if (loggedInUserType === 'NMC' || loggedInUserType === 'SMC') {
    dashboard = Object.assign(dashboard, {
      'Suspension Request': suspensionRequestData,
    });
  }
  useEffect(() => {
    if (redirectDashboard) {
      setShowTable(false);
      setShowDashboard(true);
      setShowViewPorfile(false);
      setSelectedRowData();
      dispatch(navigateDashboard(false));
    }
  }, [redirectDashboard]);

  function getDataFromResponse(count, mapper, key) {
    let dataArr = [];
    if (count?.data[key]?.status_wise_count !== undefined) {
      const newCountArray = count?.data[key]?.status_wise_count?.filter(
        (item) => item.name !== 'Suspended' && item.name !== 'Blacklisted'
      );
      newCountArray?.forEach((request) => {
        let currObj;
        currObj = {
          name: mapper[request['name']],
          value: request['count'],
          applicationTypeID: count?.data[key].application_type_ids,
          responseKey: request['name'],
        };
        dataArr.push(currObj);
      });
    }

    return dataArr;
  }
  function handleBreadCrumClick(event) {
    event.preventDefault();
    if (event.target.id === '1') {
      setShowDashboard(true);
      setShowTable(false);
      setShowViewPorfile(false);
      setSelectedRowData();
    } else if (event.target.id === '2') {
      setShowDashboard(false);
      setShowTable(true);
      setShowViewPorfile(false);
      setSelectedRowData();
    }
  }

  const showTableFun = (item) => {
    setShowDashboard(false);
    setShowTable(true);
    setShowViewPorfile(false);
    setSelectedCardData(item);
    setSelectedRowData();
  };

  const onClickBackButtonHandler = () => {
    if (showViewProfile) {
      setShowDashboard(false);
      setShowTable(true);
      setShowViewPorfile(false);
      setSelectedRowData();
    } else if (showTable) {
      setShowDashboard(true);
      setShowTable(false);
      setShowViewPorfile(false);
      setSelectedRowData();
      dispatch(getCardCount());
    }
  };

  const getSelectedRowData = (data) => {
    setSelectedRowData(data);
  };

  useEffect(() => {
    dispatch(getCardCount());
  }, []);

  const getCardIcons = (item) => {
    if (item?.name?.includes('Pending') || item?.name?.includes('Received')) {
      return PendingApplication;
    } else if (item?.name === 'College Verified') {
      return PendingApplication;
    } else if (item?.name?.includes('Verified') || item?.name?.includes('Approved')) {
      return ApprovedApplication;
    } else if (item?.name?.includes('Raised')) {
      return RaisedApplication;
    } else if (item?.name?.includes('Rejected') || item?.name?.includes('Blacklisted')) {
      return RejectedApplication;
    } else if (item?.name?.includes('Forwarded')) {
      return ApplicationForwarded;
    } else if (item?.name?.includes('Total')) {
      return TotalRegReq;
    }
  };

  const getTextLabelIcons = (item) => {
    if (item?.name?.includes('Pending') || item?.name?.includes('Received')) {
      return 'Total number of pending applications';
    } else if (item?.name === 'College Verified') {
      return 'Total number of college verified applications';
    } else if (item?.name?.includes('Approved')) {
      return 'Total number of approved applications';
    } else if (item?.name?.includes('Verified') || item?.name?.includes('Approved')) {
      return 'Total number of verified applications';
    } else if (item?.name?.includes('Raised')) {
      return 'Total number of query raised on applications';
    } else if (item?.name?.includes('Forwarded')) {
      return 'Total number of forwarded applications';
    } else if (item?.name?.includes('Rejected') || item?.name?.includes('Blacklisted')) {
      return 'Total number of rejected applications';
    } else if (item?.name?.includes('Total')) {
      return 'Total number of applications';
    }
  };

  useEffect(() => {
    if (breadcrumbsActive === 'DASHBOARD') {
      setShowDashboard(true);
      dispatch(setBreadcrumbsActivetab(''));
    }
  }, [breadcrumbsActive, dispatch]);

  return (
    <>
      {!showDashboard && (
        <Grid container>
          <Grid item xs={6}>
            <BreadcrumbsCompnent
              selectedCardData={selectedCardData}
              showTable={showTable}
              showViewProfile={showViewProfile}
              handleBreadCrumClick={handleBreadCrumClick}
              levelOneText="Dashboard"
              levelTwoText={selectedCardData?.name}
              levelthreeText="View Profile"
            />
          </Grid>
          <Grid item xs={6}>
            <Box align="right" mt={2} mr={2}>
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
                onClick={onClickBackButtonHandler}
              >
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
      {showDashboard ? (
        <Box display="flex" flexWrap="wrap" gap={{ xs: 1, xl: 2 }} p={3} pb={0}>
          {Object.entries(dashboard).map((element) => {
            return (
              <>
                <Typography
                  mb={3}
                  variant="h2"
                  component="div"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  flex="1 0 100%"
                >
                  <img
                    className={classes.requestIcon}
                    src={
                      element[0].includes('Registration')
                        ? RegistrationRequest
                        : element[0].includes('Updation')
                        ? UpdationRequest
                        : element[0].includes('Suspension')
                        ? SuspensionRequest
                        : ''
                    }
                    alt="requestIcon"
                  />
                  {element[0]}
                </Typography>
                {element[1].map((item) => {
                  return (
                    <Box
                      mb={{ xs: 2, md: 4 }}
                      flex={{ xs: '1 0 100%', sm: '1 0 32%', md: '1 0 13%', lg: '1 0 13%' }}
                      key={item?.name}
                    >
                      <Item id={item?.id} onClick={() => showTableFun(item)}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                        >
                          <Typography color="inputFocusColor.main" variant="h2">
                            {item.value}
                          </Typography>
                          <img className={classes.iconImage} src={getCardIcons(item)} alt="icon" />
                        </Box>
                        <Typography
                          color="primary"
                          component="div"
                          fontSize={{ xs: '12px', sm: '12px', md: '14px', lg: '16px' }}
                          lineHeight={{ xs: '14px', sm: '16px', md: '18px', lg: '24px' }}
                          mb={1}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          color="primary"
                          component="div"
                          fontWeight="400"
                          fontSize={{ xs: '12px', sm: '12px', md: '12px', lg: '16px' }}
                          lineHeight={{ xs: '14px', sm: '16px', md: '16px', lg: '24px' }}
                        >
                          {getTextLabelIcons(item)}
                        </Typography>
                      </Item>
                    </Box>
                  );
                })}
              </>
            );
          })}
        </Box>
      ) : showTable ? (
        <DashboardControlledTable
          setShowViewPorfile={setShowViewPorfile}
          setShowDashboard={setShowDashboard}
          setShowTable={setShowTable}
          selectedCardData={selectedCardData}
          getSelectedRowData={getSelectedRowData}
        />
      ) : showViewProfile ? (
        <Box>
          <Container sx={{ marginTop: 2 }}>
            <ViewProfile />
            <UserProfile
              setShowDashboard={setShowDashboard}
              setShowTable={setShowTable}
              setShowViewPorfile={setShowViewPorfile}
              showViewProfile={showViewProfile}
              selectedRowData={selectedRowData}
            />
          </Container>
        </Box>
      ) : (
        ''
      )}
    </>
  );
}
