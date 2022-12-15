import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const WorkDetails = () => {
  const userType = useSelector((state) => state.login.loggedInUserType);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Are you currently working
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              No
            </Typography>
            {userType !== 'Doctor' && userType !== 'College' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Nature of work
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              Nature of work
            </Typography>
            {userType !== 'Doctor' && userType !== 'College' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Choose work status
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              Government only
            </Typography>
            {userType !== 'Doctor' && userType !== 'College' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Upload the Proof of work for govt. such as Appointment letter, Last pay slip, recent
            transfer order etc.
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              <AttachFileIcon fontSize="10px" />
              View attachment
            </Typography>
            {userType !== 'Doctor' && userType !== 'College' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
    </Grid>
  );
};

export default WorkDetails;
