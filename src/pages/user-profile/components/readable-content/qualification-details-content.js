import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const QualificationDetailsContent = () => {
  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  const userType = useSelector((state) => state.login.loggedInUserType);

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Name of the degree or diploma obtained
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              bachelor of dental surgery
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

        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Country Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              India
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

        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            State
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              New Delhi
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
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Name of the college
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              Care Dental College
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

        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            University
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              Dr. NTR University of Health sciences
            </Typography>{' '}
            {userType !== 'Doctor' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}
          </Grid>
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Month of awarding Degree/Diploma
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              November
            </Typography>{' '}
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
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Year of awarding Degree/Diploma
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
              2016
            </Typography>{' '}
            {userType !== 'Doctor' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant="subtitle2" color="inputTextColor">
            Is your name in degree, different from your name in Aadhaar?
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              No
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
    </Grid>
  );
};

export default QualificationDetailsContent;
