import React from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import ApplicationDetails from '../../../shared/application-details/application-details';
///import DashboardControlledTable from '../components/dashboard-controlled-table/dashboard-controlled-table';
import TrackApplicationTable from './track-application-table';
export function TrackApplication() {
  const [showTrackApplication, setShowTrackApplication] = React.useState(false);
  const [showTrackApplicationTable, setShowTrackApplicationTable] = React.useState(true);

  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);

  return (
    <Box>
      {showTrackApplicationTable ? (
        <Box>
          <TrackApplicationTable
            userType={loggedInUserType === 'Doctor' ? true : false}
            setShowTrackApplication={setShowTrackApplication}
            setShowTrackApplicationTable={setShowTrackApplicationTable}
          />
        </Box>
      ) : (
        showTrackApplication && <ApplicationDetails />
      )}
    </Box>
  );
}

export default TrackApplication;
