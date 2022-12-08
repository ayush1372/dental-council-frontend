import { useState } from 'react';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { verboseLog } from '../../../../config/debug';
import ViewProfile from '../../../../shared/view-profile/view-profile';
import { Button } from '../../../../ui/core';
import UserProfile from '../../../user-profile/index';
import BreadcrumbsCompnent from '../breadcrums';
import DashboardControlledTable from '../dashboard-controlled-table/dashboard-controlled-table';

export default function Dashboard() {
  const theme = useTheme();
  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: '5px !important',
    borderTopWidth: 'thick',
    cursor: 'pointer',
  }));

  const blankDashboard = [
    {
      name: 'Pending',
      id: 1,
      value: 0,
    },
    {
      name: 'Verified',
      id: 2,
      value: 0,
    },
    {
      name: 'Query Raised',
      id: 3,
      value: 0,
    },
    {
      name: 'Rejected',
      id: 4,
      value: 0,
    },
    {
      name: 'Update Request Received',
      id: 5,
      value: 0,
    },
    {
      name: 'Update Request Approved',
      id: 6,
      value: 0,
    },
    {
      name: 'Update Request Raised',
      id: 7,
      value: 0,
    },
    {
      name: 'Update Request Rejected',
      id: 8,
      value: 0,
    },
  ];

  const cardData = blankDashboard;
  if (loggedInUserType === 'NMC' || loggedInUserType === 'SMC') {
    cardData.push(
      {
        name: 'Blacklist Request Received',
        id: 9,
        value: 0,
      },
      {
        name: 'Blacklisted',
        id: 9,
        value: 0,
      },
      {
        name: 'Suspend Request Raised',
        id: 9,
        value: 0,
      },
      {
        name: 'Suspend Request Approved',
        id: 9,
        value: 0,
      }
    );
  }

  const [showDashboard, setShowDashboard] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [showViewProfile, setShowViewPorfile] = useState(false);

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
        <Box>
          <Container>
            <Typography variant="h2" mt={3} mb={5}>
              Dashboard
            </Typography>
            <Grid item xs={12}>
              <Grid>
                <Box sx={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    {cardData.map((item) => {
                      return (
                        <Grid item xs={3} key={item.name}>
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
                                : ''
                            }
                            onClick={() => showTableFun(item)}
                          >
                            <Box
                              color="secondary.contrastText"
                              fontSize={14}
                              sx={{ minHeight: '60px', wordBreak: 'break-word' }}
                            >
                              {item.name}
                            </Box>
                            <Box
                              color="tabHighlightedBackgroundColor.main"
                              fontSize={20}
                              fontWeight={600}
                            >
                              {item.value}
                            </Box>
                          </Item>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
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
      ) : null}
    </>
  );
}
