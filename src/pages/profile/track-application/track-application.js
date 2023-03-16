import React from 'react';

import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import ViewProfile from '../../../shared/view-profile/view-profile';
import UserProfile from '../../user-profile';
import ApplicationDetails from './track-application-details';
import TrackApplicationTable from './track-application-table';
export function TrackApplication({ getTableData }) {
  const [showTrackApplication, setShowTrackApplication] = React.useState(false);
  const [showTrackApplicationTable, setShowTrackApplicationTable] = React.useState(true);
  const [showUserProfile, setShowUserProfile] = React.useState(false);
  const [selectedRowData, setRowData] = React.useState({});

  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const profileId = useSelector((state) => state.loginReducer.loginData.data.profile_id);
  const tableData = useSelector((state) => state.common.trackApplicationTableData);

  const onClickBackButtonHandler = () => {
    setShowUserProfile(false);
    setShowTrackApplicationTable(true);
  };
  return (
    <Box px={2} py={1}>
      {showUserProfile && (
        <Box>
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
            <UserProfile showUserProfile={showUserProfile} showViewProfile={true} />
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
            profileId={profileId}
            tableData={tableData}
            getTableData={getTableData}
            setRowData={setRowData}
          />
        </Box>
      ) : (
        showTrackApplication && (
          <Box>
            <ApplicationDetails
              selectedRowData={selectedRowData}
              setShowTrackApplication={setShowTrackApplication}
              setShowTrackApplicationTable={setShowTrackApplicationTable}
            />
          </Box>
        )
      )}
    </Box>
  );
}

export default TrackApplication;
