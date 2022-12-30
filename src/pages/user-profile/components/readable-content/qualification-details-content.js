import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const QualificationDetailsContent = ({ doctorUserProfile }) => {
  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  const { userActiveTab } = useSelector((state) => state.common);
  const {
    country: { name: countryName },
    state: { name: stateName },
    college: { name: collegeName },
    university: { name: universityName },
    course: { name: courseName },
    qualification_year,
    is_name_change,
  } = doctorUserProfile.qualification_detail[3];
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Name of the degree or diploma obtained
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
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
          <Typography variant="subtitle2" color="inputTextColor">
            Country Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
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
          <Typography variant="subtitle2" color="inputTextColor">
            State
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
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
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Name of the college
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
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
          <Typography variant="subtitle2" color="inputTextColor">
            University
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
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
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Year of awarding Degree/Diploma
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>

          <Grid display="flex" alignItems="center">
            <Typography
              bgcolor="grey2.main"
              padding="10px"
              variant="subtitle2"
              color="inputTextColor.light"
            >
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
          <Typography variant="subtitle2" color="inputTextColor">
            Is your name in degree, different from your name in Aadhaar?
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
