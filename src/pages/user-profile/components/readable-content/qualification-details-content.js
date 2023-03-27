import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { Grid, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const QualificationDetailsContent = ({ registrationDetails }) => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const [queryRaisedField, setQueryRaisedField] = useState('');
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);

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
  const courseName = course?.course_name || course?.name || '';

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };
  const ClosePopup = () => {
    setOpenModal(false);
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
            <Typography color="textPrimary.main" variant="subtitle2">
              {courseName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Name of the Degree Obtained');
                }}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Country Name
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {countryName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Country Name');
                }}
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
            <Typography color="textPrimary.main" variant="subtitle2">
              {stateName}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('State');
                }}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Name of the College
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {collegeName}
            </Typography>

            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Name of the College');
                }}
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
            <Typography variant="subtitle2" color="textPrimary.main">
              {universityName}
            </Typography>{' '}
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('University');
                }}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Month & Year of Awarding Degree
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="textPrimary.main">
              {qualification_month ? qualification_month : ''} ,{' '}
              {qualification_year ? qualification_year : ''}
            </Typography>{' '}
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Month & Year of Awarding Degree');
                }}
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
          <Grid display="flex" alignItems="center">
            <Typography
              variant="subtitle2"
              color="textPrimary.main"
              onClick={(e) => {
                e.preventDefault();
                setAttachmentViewProfile(true);
              }}
            >
              <IconButton>
                <AttachFileIcon fontSize="10px" />
              </IconButton>
              View Attachment
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => {
                  setOpenModal(true);
                  setQueryRaisedField('Upload Qualification Degree');
                }}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      {openModal && (
        <RaiseQueryPopup
          ClosePopup={ClosePopup}
          setOpenModal={setOpenModal}
          queryRaisedField={queryRaisedField}
          setQueryRaisedFor={setQueryRaisedField}
        />
      )}
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
