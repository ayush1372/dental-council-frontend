import { useState } from 'react';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

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
  // if (data?.length > 0) {
  //   for (let i = 0; i < data.length; i++) {
  //     for (let j = 0; j < blankDashboard.length; j++) {
  //       if (
  //         data[i].name === 'Withdrawn/Rejected' &&
  //         blankDashboard[j].name === 'Withdrawn / Rejected'
  //       ) {
  //         blankDashboard[j].value = data[i].count;
  //       } else if (data[i].name === blankDashboard[j].name) {
  //         blankDashboard[j].value = data[i].count;
  //       }
  //     }
  //   }
  // }

  const cardData = blankDashboard;

  const [showDashboard, setShowDashboard] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [showViewProfile, setShowViewPorfile] = useState(false);

  function handleBreadCrumClick(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.info('You clicked a breadcrumb.', event.target.id);
    if (event.target.id === '1') {
      setShowDashboard(true);
      setShowTable(false);
      setShowViewPorfile(false);
    } else if (event.target.id === '2') {
      setShowDashboard(false);
      setShowTable(true);
      setShowViewPorfile(false);
    } else if (event.target.id === '3') {
      setShowDashboard(false);
      setShowTable(false);
      setShowViewPorfile(true);
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

  return (
    <>
      {!showDashboard && <BreadcrumbsCompnent handleBreadCrumClick={handleBreadCrumClick} />}
      {showDashboard ? (
        <div className={styles.dashboardContainerComponent}>
          <Container>
            <Grid className="mt-4">
              <Grid xs={12} className={styles.itemMainContainer}>
                <Grid>
                  <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2} mt={0.5}>
                      {cardData.map((item) => {
                        return (
                          <Grid item xs key={item.name}>
                            <Item
                              className={styles.itemContainer}
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
                {/* <Grid className="mb-4">            
                <DashboardControlledTable showTable={showTable} />              
            </Grid> */}
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : showTable ? (
        <DashboardControlledTable />
      ) : showViewProfile ? (
        <Typography>View Profile component</Typography>
      ) : null}
    </>
  );
}
