import React from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import ApplicationDetails from './track-application-details';
import TrackApplicationTable from './track-application-table';
export function TrackApplication() {
  const [showTrackApplication, setShowTrackApplication] = React.useState(false);
  const [showTrackApplicationTable, setShowTrackApplicationTable] = React.useState(true);

  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);

  return (
    <Box p={3}>
      {showTrackApplicationTable ? (
        <Box>
          <TrackApplicationTable
            userType={loggedInUserType === 'Doctor' ? true : false}
            setShowTrackApplication={setShowTrackApplication}
            setShowTrackApplicationTable={setShowTrackApplicationTable}
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
