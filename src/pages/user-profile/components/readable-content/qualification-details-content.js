import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { Grid, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const QualificationDetailsContent = ({ registrationDetails }) => {
  const [openModal, setOpenModal] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);
  const { userActiveTab } = useSelector((state) => state.common);
  const { qualification_detail_response_tos } = registrationDetails || {};
  const {
    country,
    state,
    college,
    university,
    course,
    qualification_month,
    qualification_year,
    degree_certificate,
  } = qualification_detail_response_tos?.[0] || {};

  const countryName = country?.name || '';
  const stateName = state?.name || '';
  const collegeName = college?.name || '';
  const universityName = university?.name || '';
  const courseName = course?.course_name || '';

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Name of the Degree Obtained
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography color="primary.main" variant="subtitle2">
              {courseName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
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
              {countryName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
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
              {stateName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
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
              {collegeName}
            </Typography>

            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
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
              {universityName}
            </Typography>{' '}
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Month & Year of awarding Degree
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {qualification_month ? qualification_month : ''} ,{' '}
              {qualification_year ? qualification_year : ''}
            </Typography>{' '}
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
          <Grid display="flex" alignItems="center">
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
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
            Upload Qualification Degree
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary.main"
            onClick={(e) => {
              e.preventDefault();
              setAttachmentViewProfile(true);
            }}
          >
            <IconButton>
              <AttachFileIcon fontSize="10px" />
            </IconButton>
            View attachment
          </Typography>
        </Grid>
      </Grid>
      {attachmentViewProfile && (
        <AttachmentViewPopup
          certificate={degree_certificate}
          closePopup={CloseAttachmentPopup}
          alt={'Qualification Certificate'}
        />
      )}
    </Grid>
  );
};

export default QualificationDetailsContent;
