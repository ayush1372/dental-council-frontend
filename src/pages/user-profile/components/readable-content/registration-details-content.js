import { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';

import AttachmentViewPopup from '../../../../shared/query-modal-popup/attachement-view-popup';
import RaiseQueryPopup from '../../../../shared/query-modal-popup/raise-query-popup';

const RegistrationDetailsContent = ({ registrationDetails }) => {
  const { userActiveTab } = useSelector((state) => state.common);

  const [openModal, setOpenModal] = useState(false);
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);
  const ClosePopup = () => {
    setOpenModal(false);
  };
  const { registration_detail_to } = registrationDetails || {};
  const {
    registration_date,
    registration_number,
    state_medical_council,
    is_renewable,
    renewable_registration_date,
  } = registration_detail_to || {};

  const smcName = state_medical_council?.name || '';

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2} mt={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registered with council
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex" alignItems="center">
            <Typography variant="subtitle2" color="primary.main">
              {smcName ? smcName : ''}
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
            Registration Number
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex">
            <Typography color="primary.main" variant="subtitle2">
              {registration_number ? registration_number : ''}
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
            Registration Date
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex">
            <Typography color="primary.main" variant="subtitle2">
              {registration_date
                ? registration_date?.length > 10
                  ? registration_date?.substring(0, 10)
                  : registration_date
                : ''}
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
            Registration
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex">
            <Typography variant="subtitle2" color="primary.main">
              {is_renewable === '1' ? 'Permanent' : is_renewable === '0' ? 'Renewable' : ''}
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
            Due Date of Renewal
          </Typography>
          <Grid display="flex">
            <Typography color="primary.main" variant="subtitle2">
              {renewable_registration_date
                ? renewable_registration_date?.length > 10
                  ? renewable_registration_date?.substring(0, 10)
                  : renewable_registration_date
                : ''}
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
            Upload the registration certificate
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                setAttachmentViewProfile(true);
              }}
            >
              <AttachFileIcon fontSize="10px" />
            </IconButton>
            View attachment
          </Typography>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Registration Certificate
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Grid display="flex">
            <Typography variant="subtitle2" color="primary.main">
              {is_name_change === '0' ? 'Yes' : is_name_change === '1' ? 'No' : ''}
            </Typography>
            {userActiveTab === 'dashboard' && (
              <ContactSupportOutlinedIcon
                color="primary"
                onClick={() => setOpenModal(true)}
                fontSize="width30"
              />
            )}
          </Grid>
        </Grid> */}
      </Grid>
      {/* <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor"></Typography>
        </Grid>
      </Grid> */}
      {attachmentViewProfile && (
        <AttachmentViewPopup
          certificate={registration_detail_to?.registration_certificate}
          closePopup={CloseAttachmentPopup}
          alt={'Registration Certificate'}
        />
      )}
    </Grid>
  );
};

export default RegistrationDetailsContent;
