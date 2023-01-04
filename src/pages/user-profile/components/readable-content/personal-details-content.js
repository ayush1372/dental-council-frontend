import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const PersonalDetails = ({ doctorUserProfile }) => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  const {
    personal_details: {
      first_name,
      last_name,
      aadhaar_token,
      date_of_birth,
      father_name,
      gender,
      language,
      middle_name,
      mother_name,
      country_nationality: { name: nationality },
      salutation,
      schedule: { name: nameSchedule },
      spouse_name,
    },
  } =
    doctorUserProfile && Object.values(doctorUserProfile).length > 3
      ? doctorUserProfile
      : { personal_details: { country_nationality: {}, schedule: {} } };
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
              {salutation ? salutation : ''}
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
            <Typography variant="subtitle2" color="inputTextColor.main">
              Aadhaar Number
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <Grid display="flex" alignItems="center">
              <Typography
                bgcolor="grey2.main"
                p={1}
                variant="subtitle2"
                color="inputTextColor.light"
              >
                xxxx-xxxx-{aadhaar_token ? aadhaar_token : 'XXXX'}
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
              {salutation ? salutation : ''}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            First Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              {first_name ? first_name : ''}
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
          <Typography variant="subtitle2" color="inputTextColor">
            Middle Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              {middle_name ? middle_name : ''}
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
          <Typography variant="subtitle2" color="inputTextColor">
            Last Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              {last_name ? last_name : ''}
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
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Father&apos;s Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              {father_name ? father_name : ''}
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
          <Typography variant="subtitle2" color="inputTextColor">
            Mother&apos;s Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              {mother_name ? mother_name : ''}
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
          <Typography variant="subtitle2" color="inputTextColor">
            Spouse Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              {spouse_name ? spouse_name : ''}
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
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Nationality
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
              {nationality ? nationality : ''}
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
            Languages
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {language && language[0]?.name ? language[0]?.name : ''}
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
            Date Of Birth
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {date_of_birth ? date_of_birth : ''}
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
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Gender
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {gender ? gender : ''}
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
              {nameSchedule ? nameSchedule : ''}
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
