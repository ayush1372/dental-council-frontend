import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const QualificationDetailsContent = ({ registrationDetails }) => {
  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  const { userActiveTab } = useSelector((state) => state.common);
  const [
    {
      country: { name: countryName },
      state: { name: stateName },
      college: { name: collegeName },
      university: { name: universityName },
      course: { course_name: courseName },
      qualification_month,
      qualification_year,
      is_name_change,
    },
  ] =
    registrationDetails &&
    Object.values(registrationDetails).length > 3 &&
    registrationDetails?.qualification_detail_response_tos.length > 0
      ? registrationDetails.qualification_detail_response_tos
      : [{ country: {}, state: {}, college: {}, university: {}, course: {} }];
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Name of the Degree or Diploma Obtained
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography color="primary.main" variant="subtitle2">
              {courseName ? courseName : ''}
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

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Country Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {countryName ? countryName : ''}
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

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            State
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography color="primary.main" variant="subtitle2">
              {stateName ? stateName : ''}
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
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Name of the college
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {collegeName ? collegeName : ''}
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

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            University
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {universityName ? universityName : ''}
            </Typography>{' '}
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Month of Awarding Degree/Diploma
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {qualification_month ? qualification_month : ''}
            </Typography>{' '}
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Year of awarding Degree/Diploma
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {qualification_year ? qualification_year : ''}
            </Typography>{' '}
            {userActiveTab === 'dashboard' && (
              <EditOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="grey.label">
            Is your name in registration certificate, different from your name in Aadhaar?
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {is_name_change === 0 ? 'Yes' : is_name_change === 1 ? 'No' : ''}
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
      </Grid>
    </Grid>
  );
};

export default QualificationDetailsContent;
