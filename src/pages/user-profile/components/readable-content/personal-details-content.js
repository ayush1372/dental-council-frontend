import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const PersonalDetails = ({ personalDetails }) => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  const { personal_details } = personalDetails || {};
  const {
    full_name,
    // last_name,
    aadhaar_token,
    date_of_birth,
    father_name,
    gender,
    language,
    // middle_name,
    mother_name,
    country_nationality,
    // salutation,
    schedule,
    spouse_name,
  } = personal_details || {};

  const nationality = country_nationality?.name || '';
  const nameSchedule = schedule?.name || '';

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        {/* <Grid item xs={12} md={4}>
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
        </Grid> */}
        {/* {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />} */}

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
              {/* {salutation ? salutation : ''} */}
            </Typography>
          </Grid>
        )}
      </Grid>
      {/* //firstname */}
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {full_name ? full_name : ''}
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
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Father&apos;s Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
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
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Mother&apos;s Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
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
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Spouse Name
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
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

      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Date of Birth
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
            )}
          </Grid>
        </Grid>
        {openModal && <RaiseQueryPopup ClosePopup={ClosePopup} />}

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle2" color="grey.label">
            Nationality
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {nationality}
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

        <Grid item xs={12} md={3}>
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
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Schedule
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {nameSchedule}
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
