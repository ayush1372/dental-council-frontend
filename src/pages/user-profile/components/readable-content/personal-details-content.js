import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const PersonalDetails = () => {
  const { userActiveTab } = useSelector((state) => state.ui);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Salutation
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Dr.
            </Typography>
            {userActiveTab === 'dashboard' && (
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
          <Typography variant="subtitle2" color="inputTextColor.main">
            Aadhaar Number
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              xxxx-xxxx-4688
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                sx={{ fontSize: '30px' }}
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        {false && (
          <Grid item xs={8} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Salutation
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              Dr.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            First Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              Aarnav
            </Typography>
            {userActiveTab === 'dashboard' && (
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
            Middle Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              Your middle name
            </Typography>
            {userActiveTab === 'dashboard' && (
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
            Last Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              Sharma
            </Typography>
            {userActiveTab === 'dashboard' && (
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
            Father&apos;s Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              Praveen Sharma
            </Typography>
            {userActiveTab === 'dashboard' && (
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
            Mother&apos;s Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              Savita Sharma
            </Typography>
            {userActiveTab === 'dashboard' && (
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
            Spouse Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              Poonam Bala
            </Typography>
            {userActiveTab === 'dashboard' && (
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
            Nationality
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              Indian
            </Typography>
            {userActiveTab === 'dashboard' && (
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
          <Typography variant="subtitle2" color="grey.label">
            Languages
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Hindi,English
            </Typography>
            {userActiveTab === 'dashboard' && (
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
          <Typography variant="subtitle2" color="grey.label">
            Date Of Birth
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              09-18-1989
            </Typography>
            {userActiveTab === 'dashboard' && (
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
          <Typography variant="subtitle2" color="grey.label">
            Gender
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Male
            </Typography>
            {userActiveTab === 'dashboard' && (
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
          <Typography variant="subtitle2" color="grey.label">
            Schedule
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Schedule 1
            </Typography>
            {userActiveTab === 'dashboard' && (
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

export default PersonalDetails;
