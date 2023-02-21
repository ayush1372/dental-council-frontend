import { useState } from 'react';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import ViewProfile from '../../../../shared/view-profile/view-profile';
import { Button } from '../../../../ui/core';
import UserProfile from '../../../user-profile/index';
import BreadcrumbsCompnent from '../breadcrums';
import DashboardControlledTable from '../dashboard-controlled-table/dashboard-controlled-table';

export default function Dashboard() {
  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { count } = useSelector((state) => state.dashboard);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [showViewProfile, setShowViewPorfile] = useState(false);
  const [selectedCardDataData, setSelectedCardDataData] = useState();
  const [selectedRowData, setSelectedRowData] = useState();

  // eslint-disable-next-line no-console
  console.log('count', count);
  // eslint-disable-next-line no-console
  console.log('loggedInUserType', loggedInUserType);

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: '5px !important',
    borderTopWidth: 'thick',
    cursor: 'pointer',
  }));

  // mapping BE keys -> card titles on FE
  let registrationRequestMapper = {
    'Total HP Registration Requests': 'Total Registration request',
    Rejected: 'Rejected',
    Approved: 'Approved',
    'Query Raised': 'Query Raised',
    Suspended: 'Suspended',
    Blacklisted: 'Blacklisted',
    Pending: 'Pending',
  };
  let updationRequestMapper = {
    'Total HP Modification Requests': 'Total Updation request',
    Rejected: 'Update Request Rejected',
    Approved: 'Update Request Approved',
    'Query Raised': 'Query Raised on Update Request',
    Suspended: 'Suspended',
    Blacklisted: 'Blacklisted',
    Pending: 'Update Request Received',
  };

  let suspensionRequestMapper = {
    'Total Consolidated Suspension Requests': 'Total Suspension request',
    Rejected: 'Rejected',
    Approved: 'Temporary Suspension Approved',
    'Query Raised': 'Query Raised',
    Suspended: 'Suspended',
    Blacklisted: 'Blacklisted',
    Pending: 'Temporary Suspension Request Received',
  };

  let registrationRequestData = getDataFromResponse(
    count,
    registrationRequestMapper,
    loggedInUserType === 'NBE' ? 'foreign_hp_registration_requests' : 'hp_registration_requests'
  );

  let updationRequestData = getDataFromResponse(
    count,
    updationRequestMapper,
    'hp_modification_requests'
  );
  let suspensionRequestData = getDataFromResponse(
    count,
    suspensionRequestMapper,
    'consolidated_suspension_requests'
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

  function getDataFromResponse(count, mapper, key) {
    // eslint-disable-next-line no-console
    console.log('1234', count);
    let data = [];
    const newCountArray = count?.data[key]?.filter(
      (item) => item.name !== 'Suspended' && item.name !== 'Blacklisted'
    );
    newCountArray?.forEach((request) => {
      let currObj;
      currObj = {
        name: mapper[request['name']],
        value: request['count'],
        applicationTypeID: request['application_type_id'],
        responseKey: request['name'],
      };
      data.push(currObj);
    });
    return data;
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
    setSelectedCardDataData(item);
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
    }
  };

  const getSelectedRowData = (data) => {
    setSelectedRowData(data);
  };

  // eslint-disable-next-line no-console
  console.log('123 selectedRowData', selectedRowData);

  return (
    <>
      {!showDashboard && (
        <Grid container>
          <Grid item xs={6}>
            <BreadcrumbsCompnent
              showTable={showTable}
              showViewProfile={showViewProfile}
              handleBreadCrumClick={handleBreadCrumClick}
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
                  height: '48px',
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
        <Container>
          <Typography variant="h2" mt={3} mb={4}>
            Dashboard
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {Object.entries(dashboard).map((element) => {
                return (
                  <>
                    <Typography flex="1 0 100%">{element[0]}</Typography>
                    {element[1].map((item) => {
                      return (
                        <Box
                          mb={{ xs: 2, md: 4 }}
                          flex={{ xs: '1 0 100%', sm: '1 0 32%', md: '1 0 19%' }}
                          key={item?.name}
                        >
                          <Item
                            id={item?.id}
                            sx={
                              item?.name?.includes('Pending') || item?.name?.includes('Received')
                                ? {
                                    borderTop: `5px solid ${theme.palette.secondary.warningYellow}`,
                                  }
                                : item?.name?.includes('Verified') ||
                                  item?.name?.includes('Approved')
                                ? { borderTop: `5px solid ${theme.palette.success.main}` }
                                : item?.name.includes('Raised')
                                ? { borderTop: `5px solid ${theme.palette.primary.main}` }
                                : item?.name.includes('Rejected') ||
                                  item?.name.includes('Blacklisted')
                                ? { borderTop: `5px solid ${theme.palette.error.main}` }
                                : item?.name.includes('Total')
                                ? { borderTop: `5px solid ${theme.palette.black.main}` }
                                : ''
                            }
                            onClick={() => showTableFun(item)}
                          >
                            <Box
                              color="black.secondary"
                              fontSize="14px"
                              sx={{ minHeight: '60px', wordBreak: 'break-word' }}
                            >
                              {item.name}
                            </Box>
                            <Box
                              color="tabHighlightedBackgroundColor.main"
                              fontSize="20px"
                              fontWeight={600}
                            >
                              {item.value}
                            </Box>
                          </Item>
                        </Box>
                      );
                    })}
                  </>
                );
              })}
            </Box>
          </Box>
        </Container>
      ) : showTable ? (
        <DashboardControlledTable
          setShowViewPorfile={setShowViewPorfile}
          setShowDashboard={setShowDashboard}
          setShowTable={setShowTable}
          selectedCardDataData={selectedCardDataData}
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
