import { useState } from 'react';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { verboseLog } from '../../../../config/debug';
import { dashboardCountData } from '../../../../constants/common-data';
import ViewProfile from '../../../../shared/view-profile/view-profile';
import { Button } from '../../../../ui/core';
import UserProfile from '../../../user-profile/index';
import BreadcrumbsCompnent from '../breadcrums';
import DashboardControlledTable from '../dashboard-controlled-table/dashboard-controlled-table';

export default function Dashboard() {
  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: '5px !important',
    borderTopWidth: 'thick',
    cursor: 'pointer',
  }));

  let blankDashboard = {
    'Registration Request': [
      {
        name: 'Total Registration Request',
        value: 0,
      },
      {
        name: 'Pending',
        value: 0,
      },
      {
        name: 'Verified',
        value: 0,
      },
      {
        name: 'Query Raised',
        value: 0,
      },
      {
        name: 'Rejected',
        value: 0,
      },
    ],
    'Updation Request': [
      {
        name: 'Total Updation Request',
        value: 0,
      },
      {
        name: 'Update Request Received',
        value: 0,
      },
      {
        name: 'Update Request Approved',
        value: 0,
      },
      {
        name: 'Query Raised on Update Request',
        value: 0,
      },
      {
        name: 'Update Request Rejected',
        value: 0,
      },
    ],
  };

  if (loggedInUserType === 'NMC' || loggedInUserType === 'SMC') {
    blankDashboard = Object.assign(blankDashboard, {
      'Suspension Request': [
        {
          name: 'Total Suspension Request',
          value: 0,
        },
        {
          name: 'Temporary Suspension Request Received',
          value: 0,
        },
        {
          name: 'Temporary Suspension Approved',
          value: 0,
        },
        {
          name: 'Permanent Suspension Request Received',
          value: 0,
        },
        {
          name: 'Permanent Suspension Request Approved',
          value: 0,
        },
      ],
    });
  }

  const [showDashboard, setShowDashboard] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [showViewProfile, setShowViewPorfile] = useState(false);

  const countResp = Object.values(dashboardCountData);
  const blankResp = Object.values(blankDashboard);

  const resultCountResp =
    loggedInUserType === 'NMC' || loggedInUserType === 'SMC'
      ? countResp[0].concat(countResp[1]).concat(countResp[2])
      : countResp[0].concat(countResp[1]);
  const resultblankResp =
    loggedInUserType === 'NMC' || loggedInUserType === 'SMC'
      ? blankResp[0].concat(blankResp[1]).concat(blankResp[2])
      : blankResp[0].concat(blankResp[1]);

  if (resultCountResp?.length > 0) {
    for (let i = 0; i < resultCountResp?.length; i++) {
      for (let j = 0; j < resultblankResp?.length; j++) {
        if (resultCountResp[i].name === resultblankResp[j].name) {
          resultblankResp[j].value = resultCountResp[i].count;
        }
      }
    }
  }

  function handleBreadCrumClick(event) {
    event.preventDefault();
    if (event.target.id === '1') {
      setShowDashboard(true);
      setShowTable(false);
      setShowViewPorfile(false);
    } else if (event.target.id === '2') {
      setShowDashboard(false);
      setShowTable(true);
      setShowViewPorfile(false);
    }
  }

  const showTableFun = (item) => {
    setShowDashboard(false);
    setShowTable(true);
    setShowViewPorfile(false);
    verboseLog('item', item);
    // setShowTable({ show: true, value: item.id, count: item.value })
  };

  const onClickBackButtonHandler = () => {
    if (showViewProfile) {
      setShowDashboard(false);
      setShowTable(true);
      setShowViewPorfile(false);
    } else if (showTable) {
      setShowDashboard(true);
      setShowTable(false);
      setShowViewPorfile(false);
    }
  };

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
              {Object.entries(blankDashboard).map((element) => {
                return (
                  <>
                    <Typography flex="1 0 100%">{element[0]}</Typography>
                    {element[1].map((item) => {
                      return (
                        <Box
                          mb={{ xs: 2, md: 4 }}
                          flex={{ xs: '1 0 100%', sm: '1 0 32%', md: '1 0 19%' }}
                          key={item.name}
                        >
                          <Item
                            id={item.id}
                            sx={
                              item.name.includes('Pending') || item.name.includes('Received')
                                ? {
                                    borderTop: `5px solid ${theme.palette.secondary.warningYellow}`,
                                  }
                                : item.name.includes('Verified') || item.name.includes('Approved')
                                ? { borderTop: `5px solid ${theme.palette.success.main}` }
                                : item.name.includes('Raised')
                                ? { borderTop: `5px solid ${theme.palette.primary.main}` }
                                : item.name.includes('Rejected') ||
                                  item.name.includes('Blacklisted')
                                ? { borderTop: `5px solid ${theme.palette.error.main}` }
                                : item.name.includes('Total')
                                ? { borderTop: `5px solid ${theme.palette.black.main}` }
                                : ''
                            }
                            onClick={() => showTableFun(item)}
                          >
                            <Box
                              color="secondary.contrastText"
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
        />
      ) : showViewProfile ? (
        <Box>
          <ViewProfile />
          <Container sx={{ marginTop: 2 }}>
            <UserProfile
              setShowDashboard={setShowDashboard}
              setShowTable={setShowTable}
              setShowViewPorfile={setShowViewPorfile}
              showViewProfile={showViewProfile}
            />
          </Container>
        </Box>
      ) : (
        ''
      )}
    </>
  );
}
