import { useState } from 'react';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

import { Button } from '../../ui/core';
import BreadcrumbsCompnent from './component/breadcrums';
import DashboardControlledTable from './component/dashboard-controlled-table';

import styles from './dashboard.module.scss';

export default function Dashboard() {
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
    // eslint-disable-next-line no-console
    console.log('item', item);
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
        <div className={styles.dashboardContainerComponent}>
          <Container>
            <Grid className="mt-4">
              <Typography variant="h2" sx={{ mt: 4 }}>
                Dashboard
              </Typography>
              <Grid item xs={12} className={styles.itemMainContainer}>
                <Grid>
                  <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2} mt={0.5}>
                      {cardData.map((item) => {
                        return (
                          <Grid item xs={3} key={item.name}>
                            <Item
                              id={item.id}
                              className={
                                item.id === 1 || item.id === 5
                                  ? styles.borderOrange
                                  : item.id === 2 || item.id === 6
                                  ? styles.borderGreen
                                  : item.id === 3 || item.id === 7
                                  ? styles.borderBlue
                                  : styles.borderRed
                              }
                              onClick={() => showTableFun(item)}
                            >
                              <div className={styles.itemHeading}>{item.name}</div>
                              <div className={styles.itemSubHeading}>{item.value}</div>
                            </Item>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : showTable ? (
        <DashboardControlledTable
          setShowViewPorfile={setShowViewPorfile}
          setShowDashboard={setShowDashboard}
          setShowTable={setShowTable}
        />
      ) : showViewProfile ? (
        <Box>View Profile</Box>
      ) : null}
    </>
  );
}
