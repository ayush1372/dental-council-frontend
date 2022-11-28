import { useState } from 'react';

import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

import { verboseLog } from '../../../../config/debug';
import ViewProfile from '../../../../shared/view-profile/view-profile';
import { Palette } from '../../../../theme/palette';
import { Button } from '../../../../ui/core';
import UserProfile from '../../../user-profile/index';
import BreadcrumbsCompnent from '../breadcrums';
import DashboardControlledTable from '../dashboard-controlled-table/dashboard-controlled-table';

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
                              item.id === 1 || item.id === 5
                                ? { borderTop: `5px solid ${Palette.secondary.warningYellow}` }
                                : item.id === 2 || item.id === 6
                                ? { borderTop: `5px solid ${Palette.success.main}` }
                                : item.id === 3 || item.id === 7
                                ? { borderTop: `5px solid ${Palette.primary.main}` }
                                : { borderTop: `5px solid ${Palette.error.main}` }
                            }
                            onClick={() => showTableFun(item)}
                          >
                            <Box
                              color={Palette.secondary.contrastText}
                              fontSize={14}
                              sx={{ minHeight: '60px', wordBreak: 'break-word' }}
                            >
                              {item.name}
                            </Box>
                            <Box
                              color={Palette.tabHighlightedBackgroundColor.main}
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
          <UserProfile showViewProfile={showViewProfile} />
        </Box>
      ) : null}
    </>
  );
}
