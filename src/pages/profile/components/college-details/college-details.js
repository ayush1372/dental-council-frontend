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
              {collegeDetails?.collegeName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College ID
            </Typography>

            <Typography variant="body1" color="primary.main">
              {collegeDetails?.collegeId}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Phone Number
            </Typography>

            <Typography variant="body1" color="primary.main">
              {collegeDetails?.collegePhnNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Email ID
            </Typography>
            <Typography variant="body1" color="primary.main">
              {collegeDetails?.collegeEmailId}
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
              {collegeDetails?.collegeWebsite}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              State Name
            </Typography>
            <Typography variant="body1" color="primary.main">
              {collegeDetails?.state}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Address
            </Typography>
            <Typography variant="body1" color="primary.main">
              {collegeDetails?.collegeAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              College Pin Code
            </Typography>
            <Typography variant="body1" color="primary.main">
              {collegeDetails?.collegePinCode}
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
            onClick={() => handleSubmitDetails('reject')}
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
            onClick={() => handleSubmitDetails('approve')}
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
