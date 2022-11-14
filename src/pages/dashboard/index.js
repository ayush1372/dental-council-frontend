import { Box, Container, Grid, Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

import styles from './dashboard.module.scss';

export default function Dashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
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
      name: 'Update Request Approved',
      id: 5,
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
          <Grid xs={12} className={styles.itemMainContainer}>
            <Grid>
              <Box sx={{ width: '100%' }}>
                <Grid container spacing={2} mt={0.5}>
                  {cardData.map((item) => {
                    return (
                      <Grid item xs key={item.name}>
                        <Item
                          className={styles.itemContainer}
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
