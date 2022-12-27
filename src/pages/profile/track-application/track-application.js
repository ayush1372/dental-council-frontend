import React from 'react';

import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import ViewProfile from '../../../shared/view-profile/view-profile';
import UserProfile from '../../user-profile';
import ApplicationDetails from './track-application-details';
import TrackApplicationTable from './track-application-table';
export function TrackApplication() {
  const [showTrackApplication, setShowTrackApplication] = React.useState(false);
  const [showTrackApplicationTable, setShowTrackApplicationTable] = React.useState(true);
  const [showUserProfile, setShowUserProfile] = React.useState(false);

  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  const onClickBackButtonHandler = () => {
    setShowUserProfile(false);
    setShowTrackApplicationTable(true);
  };
  return (
    <Box p={3}>
      {showUserProfile && (
        <Box bgcolor="grey1.lighter">
          <Box align="right" pt={2} pr={2}>
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
          <Box>
            <ViewProfile />
            <UserProfile showUserProfile={showUserProfile} />
          </Box>
        </Box>
      )}
      {showTrackApplicationTable ? (
        <Box>
          <TrackApplicationTable
            userType={loggedInUserType === 'Doctor' ? true : false}
            setShowTrackApplication={setShowTrackApplication}
            setShowTrackApplicationTable={setShowTrackApplicationTable}
            setShowUserProfile={setShowUserProfile}
          />
        </Box>
      ) : (
        showTrackApplication && (
          <ApplicationDetails
            setShowTrackApplication={setShowTrackApplication}
            setShowTrackApplicationTable={setShowTrackApplicationTable}
          />
        )
      )}
    </Box>
  );
}

export default TrackApplication;
