import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Dialog, Grid, Typography } from '@mui/material';

import { Button } from '../../../../ui/core';

const CollegeDetails = ({ collegeDetails, setShowTable }) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [type, setType] = useState('');
  const handleClose = () => {
    setConfirmationModal(false);
  };
  const handleSubmitDetails = (type) => {
    setType(type);
    setConfirmationModal(true);
  };
  return (
    <Box boxShadow={2} p="0px 91px 44px 41px" mt={2} data-testid="College Details">
      <Grid>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Typography variant="h2" color="textPrimary.main" data-testid="collegeDetails">
              College Details
            </Typography>
          </Grid>
        </Grid>

        <Grid container item spacing={2} mt={3}>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label" data-testid="CollegeName">
              College Name
            </Typography>

            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.collegeName}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              College ID
            </Typography>

            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.collegeId}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              College Phone Number
            </Typography>

            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.collegePhnNumber}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              College Email ID
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.collegeEmailId}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              Select Council
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.nameofStateCouncil}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              Select University name
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.universityName}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              College Website
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.collegeWebsite}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              State Name
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.state}
            </Typography>
          </Grid>

          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              College Address
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.collegeAddress}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="body3" color="grey.label">
              College Pin Code
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              {collegeDetails?.collegePinCode}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" my={2}>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setShowTable(true);
            }}
          >
            Back
          </Button>
        </Box>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              marginRight: '10px',
            }}
            onClick={() => handleSubmitDetails('reject')}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSubmitDetails('approve')}
          >
            Approve
          </Button>
        </Box>
      </Box>
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
