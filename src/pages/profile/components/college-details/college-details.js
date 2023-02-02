import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Dialog, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { userActionType } from '../../../../helpers/functions/common-functions';
import { initiateCollegeWorkFlow } from '../../../../store/actions/college-actions';
import { Button } from '../../../../ui/core';

const CollegeDetails = ({ collegeDetails, setShowTable }) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const { collegeData } = useSelector((state) => state.college);
  const { loginData } = useSelector((state) => state.loginReducer);
  const userData = collegeData?.data;
  const [type, setType] = useState('');
  const dispatch = useDispatch();
  const handleClose = () => {
    setConfirmationModal(false);
  };
  const handleSubmitDetails = (type) => {
    setType(type);
    setConfirmationModal(true);
  };

  const initiateCollegeFlow = () => {
    const actionID = userActionType(type);
    const requestObj = {
      request_id: userData?.request_id,
      application_type_id: 6, //application_type_id will be always 6
      actor_id: loginData?.data?.user_group_id,
      action_id: actionID,
    };
    dispatch(initiateCollegeWorkFlow(requestObj));
  };

  return (
    <Box boxShadow={2} p={5} data-testid="College Details">
      <Grid container>
        <Grid container item xs={12}>
          <Typography variant="h2" color="textPrimary.main" data-testid="collegeDetails">
            College Details
          </Typography>
        </Grid>

        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label" data-testid="CollegeName">
              College Name
            </Typography>

            <Typography variant="body1" color="primary.main">
              {userData?.name ? userData?.name : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College ID
            </Typography>

            <Typography variant="body1" color="primary.main">
              {userData?.college_code}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Phone Number
            </Typography>

            <Typography variant="body1" color="primary.main">
              {userData?.phone_number ? userData?.phone_number : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Email ID
            </Typography>
            <Typography variant="body1" color="primary.main">
              {userData?.email_id ? userData?.email_id : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Select Council
            </Typography>
            <Typography variant="body1" color="primary.main">
              {collegeDetails?.nameofStateCouncil}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Select University name
            </Typography>
            <Typography variant="body1" color="primary.main">
              {collegeDetails?.universityName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Website
            </Typography>
            <Typography variant="body1" color="primary.main">
              {userData?.website}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              State Name
            </Typography>
            <Typography variant="body1" color="primary.main">
              {userData?.state_name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Address
            </Typography>
            <Typography variant="body1" color="primary.main">
              {userData?.address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Pin Code
            </Typography>
            <Typography variant="body1" color="primary.main">
              {userData?.pin_code}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container display="flex" justifyContent="space-between" alignItems="center" mt={5}>
        <Grid item xs={12} md={9}>
          <Button
            onClick={() => {
              setShowTable(true);
            }}
            color="secondary"
            variant="outlined"
            sx={{
              margin: {
                xs: '5px 0',
                md: '0',
              },
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} md="auto" display="flex" justifyContent="end">
          <Button
            onClick={() => handleSubmitDetails('Rejected')}
            variant="outlined"
            color="secondary"
            sx={{
              margin: {
                xs: '5px 0',
                md: '0',
              },
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
          >
            Reject
          </Button>
        </Grid>
        <Grid item xs={12} md="auto" display="flex" justifyContent="end">
          <Button
            onClick={() => handleSubmitDetails('Approved')}
            variant="contained"
            color="secondary"
            sx={{
              margin: {
                xs: '5px 0',
                md: '0',
              },
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
          >
            Approve
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={confirmationModal}
        onClose={() => {
          setConfirmationModal(false);
        }}
      >
        <Box p={2} width="410px" height="200">
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            data-testid="Alert"
          >
            <WarningIcon color="secondary" />
            <Typography color="textPrimary.main" variant="h3">
              Alert!
            </Typography>
            <CloseIcon onClick={handleClose} />
          </Box>
          <Box mt={4}>
            <Typography color="textPrimary.main">
              {`Are you sure you want to ${
                type === 'reject' ? 'reject' : 'approve'
              } this application`}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'} mt={1}>
            <Button
              onClick={() => {
                setConfirmationModal(false);
              }}
              color="grey"
              variant="contained"
              sx={{
                margin: '0 4px',
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                setConfirmationModal(false);
                setShowTable(true);
                initiateCollegeFlow();
              }}
              color="secondary"
              variant="contained"
              sx={{
                margin: '0 4px',
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CollegeDetails;
