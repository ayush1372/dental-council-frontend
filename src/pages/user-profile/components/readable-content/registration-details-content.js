import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const RegistrationDetailsContent = () => {
  const userType = useSelector((state) => state.login.loggedInUserType);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registered with council
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              West Bengal Medical Council
            </Typography>

            {userType !== 'Doctor' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration Number
          </Typography>
          <Grid display="flex">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              7991749871719
            </Typography>
            {userType !== 'Doctor' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration Date
          </Typography>
          <Grid display="flex">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              30-10-2021
            </Typography>
            {userType !== 'Doctor' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration
          </Typography>
          <Grid display="flex">
            <Typography variant="subtitle2" color="primary.main">
              permanent
            </Typography>
            {userType !== 'Doctor' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Due Date of Renewal
          </Typography>
          <Grid display="flex">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              30-10-2022
            </Typography>
            {userType !== 'Doctor' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Registration Certificate
          </Typography>
          <Grid display="flex">
            <Typography variant="subtitle2" color="primary.main">
              Yes
            </Typography>
            {userType !== 'Doctor' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor"></Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            upload proof of relationship
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            <AttachFileIcon fontSize="10px" />
            View attachment
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegistrationDetailsContent;
