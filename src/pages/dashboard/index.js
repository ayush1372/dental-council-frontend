import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

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

  return (
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
                          // onClick={() =>
                          //   setShowTable({ show: true, value: item.id, count: item.value })
                          // }
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
  );
}
