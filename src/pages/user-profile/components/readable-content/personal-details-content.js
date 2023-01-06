import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const PersonalDetails = () => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Salutation
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Dr.
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}

        {false && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Aadhaar Number
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid display="flex" alignItems="center">
              <Typography p={1} variant="subtitle2" color="inputTextColor.light">
                xxxx-xxxx-4688
              </Typography>
              {userActiveTab === 'dashboard' && (
                <EditOutlinedIcon
                  color="primary"
                  onClick={() => setOpenModal(true)}
                  fontSize="width30"
                />
              )}{' '}
            </Grid>
          </Grid>
        )}
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        {false && (
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="grey.label">
              Salutation
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              Dr.
            </Typography>
          </Grid>
        )}
      </Grid>
      {/* //firstname */}
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            First Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Aarnav
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Middle Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Your Middle Name
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Last Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Sharma
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
      {/* fathers name */}
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Father&apos;s Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Praveen Sharma
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Mother&apos;s Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Savita Sharma
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Spouse Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Poonam Bala
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
      {/* nationality */}
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Nationality
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Indian
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4} mt={1}>
          <Typography variant="subtitle2" color="grey.label">
            Languages
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Hindi, English
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4} mt={1}>
          <Typography variant="subtitle2" color="grey.label">
            Date of Birth
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              09-18-1989
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
      </Grid>
      {/* gender */}
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Gender
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Male
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}{' '}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Schedule
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              Schedule 1
            </Typography>
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
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
